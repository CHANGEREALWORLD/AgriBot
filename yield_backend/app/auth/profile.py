from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.auth.google_router import get_current_user    # adjust if path differs


router = APIRouter(prefix="/auth", tags=["Authentication - Google"])

class ProfileUpdate(BaseModel):
    name: str | None = None
    avatar: str | None = None

@router.get("/profile")
def get_profile(user: dict = Depends(get_current_user)):
    return {
        "name": user.get("name"),
        "email": user.get("email"),
        "avatar": user.get("picture")
    }

@router.put("/profile")
def update_profile(data: ProfileUpdate, user: dict = Depends(get_current_user)):
    updated = {
        "name": data.name or user.get("name"),
        "email": user.get("email"),
        "avatar": data.avatar or user.get("picture")
    }
    return {"updated_profile": updated}
