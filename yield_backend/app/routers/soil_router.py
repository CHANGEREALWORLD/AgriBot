from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/soil", tags=["Soil Health"])

class SoilInput(BaseModel):
    soil_type: str
    nitrogen: float
    phosphorus: float
    potassium: float
    moisture: float
    ph: float


@router.post("/analyze")
def analyze_soil(data: SoilInput):

    score = 0
    reasons = []
    suggestions = []

    # ---- Nitrogen ----
    if 40 <= data.nitrogen <= 80:
        score += 20
        reasons.append("Nitrogen level is in optimal range")
    else:
        suggestions.append("Adjust nitrogen fertilizer usage")

    # ---- Phosphorus ----
    if 30 <= data.phosphorus <= 60:
        score += 20
        reasons.append("Phosphorus level supports root development")
    else:
        suggestions.append("Improve phosphorus balance")

    # ---- Potassium ----
    if 30 <= data.potassium <= 70:
        score += 20
        reasons.append("Potassium level is suitable for crop growth")
    else:
        suggestions.append("Increase potassium for better stress resistance")

    # ---- Moisture ----
    if 20 <= data.moisture <= 40:
        score += 20
        reasons.append("Soil moisture is adequate")
    else:
        suggestions.append("Optimize irrigation schedule")

    # ---- pH ----
    if 6.0 <= data.ph <= 7.5:
        score += 20
        reasons.append("Soil pH is suitable for most crops")
    else:
        suggestions.append("Consider pH correction using lime or sulfur")

    # ---- Health Label ----
    if score >= 80:
        health = "Good"
    elif score >= 50:
        health = "Moderate"
    else:
        health = "Poor"

    return {
        "health": health,
        "confidence": score,
        "reasons": reasons,
        "suggestions": suggestions
    }
