# from fastapi import APIRouter
# from pydantic import BaseModel

# router = APIRouter(prefix="/crop", tags=["Crop Recommendation"])

# class CropInput(BaseModel):
#     soil_type: str
#     nitrogen: float
#     phosphorus: float
#     potassium: float
#     rainfall: float
#     temperature: float

# @router.post("/recommend")
# def recommend_crop(data: CropInput):

#     soil = data.soil_type.lower()
#     n = data.nitrogen
#     p = data.phosphorus
#     k = data.potassium
#     rain = data.rainfall
#     temp = data.temperature

#     # ---- RULE-BASED LOGIC ----
#     if soil == "sandy" and rain < 50:
#         crop = "Millet"

#     elif soil in ["loamy", "clay"] and rain > 120 and temp > 22:
#         crop = "Rice"

#     elif soil == "loamy" and n > 60 and p > 40:
#         crop = "Wheat"

#     elif soil == "clay" and rain > 80:
#         crop = "Sugarcane"

#     elif soil == "silty" and temp < 25:
#         crop = "Barley"

#     else:
#         crop = "Maize"

#     return {
#         "recommended_crop": crop,
#         "reason": "Based on soil type, rainfall, temperature, and NPK values"
#     }


# from fastapi import APIRouter
# from pydantic import BaseModel

# router = APIRouter(prefix="/crop", tags=["Crop Recommendation"])

# class CropInput(BaseModel):
#     soil_type: str
#     nitrogen: float
#     phosphorus: float
#     potassium: float
#     rainfall: float
#     temperature: float


# @router.post("/recommend")
# def recommend_crop(data: CropInput):

#     soil = data.soil_type.lower()
#     n = data.nitrogen
#     p = data.phosphorus
#     k = data.potassium
#     rain = data.rainfall
#     temp = data.temperature

#     # ---------- INDUSTRY-STYLE RULES ----------

#     # MILLET
#     if soil == "sandy" and rain < 60 and temp > 25:
#         crop = "Millet"
#         reason = (
#             "Sandy soil with low rainfall and high temperature is ideal for "
#             "drought-resistant crops like millet."
#         )

#     # RICE
#     elif soil in ["clay", "loamy"] and rain > 120 and temp >= 22:
#         crop = "Rice"
#         reason = (
#             "High rainfall and water-retentive soil (clay/loamy) "
#             "favors paddy cultivation like rice."
#         )

#     # WHEAT
#     elif soil == "loamy" and 50 <= n <= 120 and p > 40 and 15 <= temp <= 25:
#         crop = "Wheat"
#         reason = (
#             "Loamy soil with balanced nitrogen and moderate temperature "
#             "supports optimal wheat growth."
#         )

#     # SUGARCANE
#     elif soil == "clay" and rain > 100 and n > 80:
#         crop = "Sugarcane"
#         reason = (
#             "High rainfall, clay soil, and nitrogen-rich conditions "
#             "are suitable for long-duration crops like sugarcane."
#         )

#     # BARLEY
#     elif soil == "silty" and temp < 25 and rain < 100:
#         crop = "Barley"
#         reason = (
#             "Cool temperature with silty soil and moderate rainfall "
#             "supports barley cultivation."
#         )

#     # MAIZE (DEFAULT – MOST ADAPTIVE)
#     else:
#         crop = "Maize"
#         reason = (
#             "Maize is adaptable to a wide range of soil, rainfall, "
#             "and nutrient conditions, making it a safe recommendation."
#         )

#     return {
#         "recommended_crop": crop,
#         "reason": reason
#     }



from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/crop", tags=["Crop Recommendation"])

class CropInput(BaseModel):
    soil_type: str
    nitrogen: float
    phosphorus: float
    potassium: float
    rainfall: float
    temperature: float


@router.post("/recommend")
def recommend_crop(data: CropInput):

    soil = data.soil_type.lower()
    n = data.nitrogen
    p = data.phosphorus
    k = data.potassium
    rain = data.rainfall
    temp = data.temperature

    confidence = 0
    reasons = []

    # -------- RULE MATCHING --------

    # Soil contribution
    if soil == "sandy":
        confidence += 20
        reasons.append("Sandy soil provides good drainage")
    elif soil == "loamy":
        confidence += 25
        reasons.append("Loamy soil is nutrient-rich and well balanced")
    elif soil == "clay":
        confidence += 15
        reasons.append("Clay soil retains moisture well")
    elif soil == "silty":
        confidence += 18
        reasons.append("Silty soil supports good root development")

    # Rainfall contribution
    if rain < 60:
        confidence += 20
        reasons.append("Low rainfall favors drought-tolerant crops")
    elif 60 <= rain <= 120:
        confidence += 25
        reasons.append("Moderate rainfall is suitable for many crops")
    else:
        confidence += 15
        reasons.append("High rainfall supports water-intensive crops")

    # Temperature contribution
    if 20 <= temp <= 30:
        confidence += 25
        reasons.append("Temperature is within optimal growth range")
    else:
        confidence += 10
        reasons.append("Temperature is less than optimal but acceptable")

    # Nutrient contribution (NPK)
    if n > 60 and p > 40 and k > 40:
        confidence += 20
        reasons.append("NPK levels are well balanced for crop growth")
    else:
        confidence += 10
        reasons.append("NPK levels are moderately sufficient")

    # -------- FINAL CROP DECISION --------

    if soil == "sandy" and rain < 60:
        crop = "Millet"
    elif soil in ["clay", "loamy"] and rain > 120:
        crop = "Rice"
    elif soil == "loamy" and n > 60:
        crop = "Wheat"
    elif soil == "clay" and rain > 100:
        crop = "Sugarcane"
    elif soil == "silty" and temp < 25:
        crop = "Barley"
    else:
        crop = "Maize"

    confidence = min(confidence, 95)  # cap for realism

    return {
        "recommended_crop": crop,
        "confidence": confidence,
        "reason_points": reasons
    }
