import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

# Routers
from app.routers.yield_router import router as yield_router
from app.routers.crop_router import router as crop_router
from app.auth.google_router import router as google_router
from app.auth.profile import router as profile_router
from app.routers.soil_router import router as soil_router
from app.routers.disease_router import router as disease_router
from app.routers.weather_router import router as weather_router
from app.routers.dashboard_router import router as dashboard_router

app = FastAPI(title="AgriBot Backend")

# CORS for React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",
#         "http://127.0.0.1:3000",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)

# Register routers
app.include_router(yield_router)
app.include_router(crop_router)
app.include_router(google_router)
app.include_router(profile_router)
app.include_router(soil_router)
# app.mount("/app/uploads", StaticFiles(directory="app/uploads"), name="uploads")
app.include_router(disease_router)
app.include_router(weather_router)
app.include_router(dashboard_router)


