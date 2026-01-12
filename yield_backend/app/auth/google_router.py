# yield_backend/app/auth/google_router.py
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests
import sqlite3
import datetime
import jwt

SECRET_KEY = "supersecret"   # change for production
ALGORITHM = "HS256"
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"  # put your client id

router = APIRouter(prefix="/auth", tags=["Authentication - Google"])

# DB (reuse same users.db)
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()
# Ensure columns exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    avatar TEXT
)
""")
conn.commit()


class GoogleToken(BaseModel):
    token: str


def create_jwt(email: str):
    token_data = {
        "sub": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    }
    return jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/google")
def google_login(data: GoogleToken):
    try:
        idinfo = id_token.verify_oauth2_token(
            data.token, requests.Request(), GOOGLE_CLIENT_ID
        )
        email = idinfo["email"]
        name = idinfo.get("name", "Google User")
        picture = idinfo.get("picture", "")
    except Exception:
        raise HTTPException(401, "Invalid Google token")

    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE email=?", (email,))
    user = cursor.fetchone()

    # If not exists → create user (mark password as google_oauth)
    if not user:
        cursor.execute(
            "INSERT INTO users (email, password, name, avatar) VALUES (?, ?, ?, ?)",
            (email, "google_oauth", name, picture),
        )
        conn.commit()
    else:
        # If exists, ensure name/avatar updated
        cursor.execute("UPDATE users SET name=?, avatar=? WHERE email=?", (name, picture, email))
        conn.commit()

    jwt_token = create_jwt(email)

    return {
        "token": jwt_token,
        "user": {
            "email": email,
            "name": name,
            "avatar": picture
        }
    }


# -------------------
# Profile endpoints
# -------------------

# Simple dependency to parse Authorization: Bearer <token>
def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise Exception("Invalid auth scheme")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    cursor.execute("SELECT id, email, name, avatar FROM users WHERE email=?", (email,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")

    user = {"id": row[0], "email": row[1], "name": row[2], "avatar": row[3]}
    return user


@router.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user)):
    # current_user already is dict with id,email,name,avatar
    return {"user": current_user}


class UpdateProfile(BaseModel):
    name: str | None = None
    avatar: str | None = None  # allow client to send URL or base64 (we accept URL here)


@router.put("/profile")
def update_profile(payload: UpdateProfile, current_user: dict = Depends(get_current_user)):
    # Update only provided fields
    if payload.name is not None:
        cursor.execute("UPDATE users SET name=? WHERE email=?", (payload.name, current_user["email"]))
    if payload.avatar is not None:
        cursor.execute("UPDATE users SET avatar=? WHERE email=?", (payload.avatar, current_user["email"]))
    conn.commit()

    cursor.execute("SELECT id, email, name, avatar FROM users WHERE email=?", (current_user["email"],))
    row = cursor.fetchone()
    user = {"id": row[0], "email": row[1], "name": row[2], "avatar": row[3]}
    return {"user": user}
