from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def dashboard_summary():
    return {
        "weather": {
            "temperature": 29,
            "humidity": 62,
            "wind": 6,
            "condition": "Partly Cloudy"
        },
        "soil": {
            "health": "Good",
            "moisture": 23
        },
        "crop": {
            "name": "Tomato",
            "confidence": 78
        },
        "yield_trend": [120, 135, 150, 142, 160, 175, 190]
    }

