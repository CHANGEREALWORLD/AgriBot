# from fastapi import APIRouter
# from pydantic import BaseModel

# router = APIRouter(prefix="/weather", tags=["Weather & Alerts"])

# class WeatherInput(BaseModel):
#     temperature: float
#     humidity: float
#     rainfall: float

# @router.post("/analyze")
# def analyze_weather(data: WeatherInput):

#     alerts = []

#     if data.humidity > 80:
#         alerts.append("High humidity increases fungal disease risk")

#     if data.temperature > 35:
#         alerts.append("High temperature may cause crop heat stress")

#     if data.rainfall < 20:
#         alerts.append("Low rainfall detected, irrigation recommended")

#     if not alerts:
#         alerts.append("Weather conditions are favorable for crops")

#     return {
#         "temperature": data.temperature,
#         "humidity": data.humidity,
#         "rainfall": data.rainfall,
#         "alerts": alerts,
#         "confidence": 85
#     }



from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/weather", tags=["Weather & Crop Suitability"])

CROP_WEATHER_RULES = {
    "rice": {"temp": (20, 35), "rainfall": (100, 300), "humidity": (70, 90)},
    "wheat": {"temp": (10, 25), "rainfall": (30, 100), "humidity": (40, 60)},
    "maize": {"temp": (18, 30), "rainfall": (50, 150), "humidity": (50, 70)},
    "millet": {"temp": (20, 35), "rainfall": (20, 80), "humidity": (30, 60)},
}

class WeatherInput(BaseModel):
    crop: str
    temperature: float
    rainfall: float
    humidity: float

@router.post("/analyze")
def analyze_weather(data: WeatherInput):
    crop = data.crop.lower()

    if crop not in CROP_WEATHER_RULES:
        return {
            "suitable": False,
            "confidence": 30,
            "alerts": ["No weather model available for this crop"],
        }

    rules = CROP_WEATHER_RULES[crop]
    alerts = []
    score = 100

    def check_range(value, low, high, label):
        nonlocal score
        if value < low:
            score -= 20
            alerts.append(f"{label} is below optimal range")
        elif value > high:
            score -= 20
            alerts.append(f"{label} is above optimal range")

    check_range(data.temperature, *rules["temp"], "Temperature")
    check_range(data.rainfall, *rules["rainfall"], "Rainfall")
    check_range(data.humidity, *rules["humidity"], "Humidity")

    if not alerts:
        alerts.append("Weather conditions are ideal for this crop")

    return {
        "crop": crop,
        "suitable": score >= 60,
        "confidence": max(score, 30),
        "alerts": alerts,
    }
