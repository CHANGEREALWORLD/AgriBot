from fastapi import FastAPI
from app.routers.yield import router as yield_router

app = FastAPI()
app.include_router(yield_router)
