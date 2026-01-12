# from fastapi import APIRouter
# from pydantic import BaseModel
# from typing import List

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# class DiseaseInput(BaseModel):
#     crop: str
#     symptoms: List[str]


# @router.post("/detect")
# def detect_disease(data: DiseaseInput):

#     crop = data.crop.lower()
#     symptoms = set(data.symptoms)

#     disease = "Healthy Crop"
#     confidence = 50
#     reasons = []
#     prevention = []

#     # -------- TOMATO --------
#     if crop == "tomato":
#         if {"yellow_leaves", "brown_spots"}.issubset(symptoms):
#             disease = "Early Blight"
#             confidence = 85
#             reasons = [
#                 "Brown spots observed on leaves",
#                 "Yellowing of lower leaves"
#             ]
#             prevention = [
#                 "Use disease-resistant varieties",
#                 "Avoid overhead watering",
#                 "Apply fungicide if necessary"
#             ]

#         elif {"white_powder", "leaf_curl"}.issubset(symptoms):
#             disease = "Powdery Mildew"
#             confidence = 80
#             reasons = [
#                 "White powdery growth on leaves",
#                 "Leaf curling detected"
#             ]
#             prevention = [
#                 "Improve air circulation",
#                 "Remove infected leaves",
#                 "Use sulfur-based fungicides"
#             ]

#     # -------- RICE --------
#     elif crop == "rice":
#         if {"leaf_blast", "brown_spots"}.issubset(symptoms):
#             disease = "Rice Blast"
#             confidence = 88
#             reasons = [
#                 "Diamond-shaped lesions on leaves",
#                 "Brown necrotic spots"
#             ]
#             prevention = [
#                 "Use resistant rice varieties",
#                 "Avoid excess nitrogen",
#                 "Apply recommended fungicide"
#             ]

#     # -------- WHEAT --------
#     elif crop == "wheat":
#         if {"rust_pustules", "yellow_leaves"}.issubset(symptoms):
#             disease = "Wheat Rust"
#             confidence = 82
#             reasons = [
#                 "Rust-colored pustules on leaves",
#                 "Yellowing observed"
#             ]
#             prevention = [
#                 "Use rust-resistant wheat varieties",
#                 "Apply timely fungicide",
#                 "Monitor crop regularly"
#             ]

#     return {
#         "disease": disease,
#         "confidence": confidence,
#         "reasons": reasons,
#         "prevention": prevention
#     }



# from fastapi import APIRouter
# from pydantic import BaseModel
# from typing import List

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# # ---------- INPUT SCHEMA ----------
# class DiseaseInput(BaseModel):
#     crop: str
#     symptoms: List[str]


# # ---------- ROUTE ----------
# @router.post("/detect")
# def detect_disease(data: DiseaseInput):

#     crop = data.crop.lower()
#     symptoms = set(data.symptoms)
#     symptom_count = len(symptoms)

#     # ---------- SEVERITY ----------
#     if symptom_count <= 1:
#         severity = "Mild"
#     elif symptom_count <= 3:
#         severity = "Moderate"
#     else:
#         severity = "Severe"

#     # ---------- ACTION PRIORITY ----------
#     action_priority = {
#         "Mild": "Preventive",
#         "Moderate": "Monitor",
#         "Severe": "Immediate"
#     }[severity]

#     # ---------- DEFAULT RESPONSE ----------
#     disease = "Healthy Crop"
#     confidence = 50
#     reasons = ["No critical symptoms detected"]
#     prevention = ["Continue regular crop monitoring"]
#     treatment_plan = []

#     # ---------- TOMATO ----------
#     if crop == "tomato":
#         if {"yellow_leaves", "brown_spots"}.issubset(symptoms):
#             disease = "Early Blight"
#             confidence = 85
#             reasons = [
#                 "Brown spots observed on leaves",
#                 "Yellowing of lower foliage"
#             ]
#             prevention = [
#                 "Use disease-free seeds",
#                 "Avoid overhead irrigation"
#             ]
#             treatment_plan = [
#                 "Day 1: Remove infected leaves",
#                 "Day 3: Apply recommended fungicide",
#                 "Day 7: Inspect plant again"
#             ]

#         elif {"white_powder", "leaf_curl"}.issubset(symptoms):
#             disease = "Powdery Mildew"
#             confidence = 80
#             reasons = [
#                 "White powdery growth on leaves",
#                 "Leaf curling observed"
#             ]
#             prevention = [
#                 "Improve air circulation",
#                 "Remove infected plant parts"
#             ]
#             treatment_plan = [
#                 "Day 1: Remove infected leaves",
#                 "Day 4: Apply sulfur-based fungicide",
#                 "Day 8: Monitor crop condition"
#             ]

#     # ---------- RICE ----------
#     elif crop == "rice":
#         if {"leaf_blast", "brown_spots"}.issubset(symptoms):
#             disease = "Rice Blast"
#             confidence = 88
#             reasons = [
#                 "Diamond-shaped lesions on leaves",
#                 "Brown necrotic spots detected"
#             ]
#             prevention = [
#                 "Use resistant rice varieties",
#                 "Avoid excessive nitrogen fertilizer"
#             ]
#             treatment_plan = [
#                 "Day 1: Remove infected plants",
#                 "Day 4: Apply fungicide",
#                 "Day 10: Re-evaluate field"
#             ]

#     # ---------- WHEAT ----------
#     elif crop == "wheat":
#         if {"rust_pustules", "yellow_leaves"}.issubset(symptoms):
#             disease = "Wheat Rust"
#             confidence = 82
#             reasons = [
#                 "Rust-colored pustules present",
#                 "Yellowing of leaves detected"
#             ]
#             prevention = [
#                 "Use rust-resistant varieties",
#                 "Apply fungicide early"
#             ]
#             treatment_plan = [
#                 "Day 1: Remove heavily infected plants",
#                 "Day 5: Apply fungicide",
#                 "Day 9: Monitor spread"
#             ]

#     return {
#         "disease": disease,
#         "severity": severity,
#         "action_priority": action_priority,
#         "confidence": confidence,
#         "reasons": reasons,
#         "prevention": prevention,
#         "treatment_plan": treatment_plan
#     }


# from fastapi import APIRouter, UploadFile, File, Form
# from typing import Optional
# import os, uuid, json
# from datetime import datetime

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# UPLOAD_DIR = "app/uploads/disease_images"
# HISTORY_FILE = "app/data/disease_history.json"

# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs("app/data", exist_ok=True)

# def load_history():
#     if not os.path.exists(HISTORY_FILE):
#         return []
#     with open(HISTORY_FILE, "r") as f:
#         return json.load(f)

# def save_history(record):
#     history = load_history()
#     history.insert(0, record)
#     with open(HISTORY_FILE, "w") as f:
#         json.dump(history, f, indent=2)

# @router.post("/detect")
# async def detect_disease(
#     crop: str = Form(...),
#     symptoms: str = Form(...),
#     image: Optional[UploadFile] = File(None)
# ):
#     symptom_list = [s.strip().lower() for s in symptoms.split(",")]

#     # ---------------- REAL DISEASE LOGIC ----------------
#     disease = "Healthy / Unknown"
#     severity = "Low"
#     confidence = 40
#     reasons = []
#     prevention = []
#     treatment = []

#     if crop == "wheat":
#         if "rust" in symptoms:
#             disease = "Wheat Rust"
#             severity = "Severe"
#             confidence = 85
#             reasons = [
#                 "Rust pustules observed",
#                 "Common fungal disease in wheat"
#             ]
#             prevention = [
#                 "Use resistant varieties",
#                 "Avoid excessive irrigation"
#             ]
#             treatment = [
#                 "Apply fungicide immediately",
#                 "Remove infected plants"
#             ]

#     elif crop == "rice":
#         if "blast" in symptoms:
#             disease = "Rice Blast"
#             severity = "Moderate"
#             confidence = 78
#             reasons = ["Blast lesions detected"]
#             prevention = ["Balanced nitrogen use"]
#             treatment = ["Spray recommended fungicide"]

#     elif crop == "tomato":
#         if "leaf curl" in symptoms:
#             disease = "Tomato Leaf Curl Virus"
#             severity = "Severe"
#             confidence = 82
#             reasons = ["Leaf curling observed", "Virus pattern matched"]
#             prevention = ["Control whiteflies"]
#             treatment = ["Remove infected plants"]

#     image_path = None
#     if image:
#         ext = image.filename.split(".")[-1]
#         filename = f"{uuid.uuid4()}.{ext}"
#         image_path = f"{UPLOAD_DIR}/{filename}"
#         with open(image_path, "wb") as f:
#             f.write(await image.read())

#     record = {
#         "id": str(uuid.uuid4()),
#         "crop": crop,
#         "symptoms": symptom_list,
#         "disease": disease,
#         "severity": severity,
#         "confidence": confidence,
#         "reasons": reasons,
#         "prevention": prevention,
#         "treatment": treatment,
#         "image_path": image_path,
#         "timestamp": datetime.now().isoformat()
#     }

#     save_history(record)

#     return record

# @router.get("/history")
# def get_history():
#     return load_history()


# from fastapi import APIRouter, UploadFile, File, Form
# from typing import Optional
# import os, uuid, json
# from datetime import datetime

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# UPLOAD_DIR = "app/uploads/disease_images"
# HISTORY_FILE = "app/data/disease_history.json"
# KNOWN_CROPS = ["wheat", "rice", "tomato"]

# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs("app/data", exist_ok=True)

# def load_history():
#     if not os.path.exists(HISTORY_FILE):
#         return []
#     with open(HISTORY_FILE, "r") as f:
#         return json.load(f)

# def save_history(record):
#     history = load_history()
#     history.insert(0, record)
#     with open(HISTORY_FILE, "w") as f:
#         json.dump(history, f, indent=2)

# @router.post("/detect")
# async def detect_disease(
#     crop: str = Form(...),
#     symptoms: str = Form(...),
#     image: Optional[UploadFile] = File(None)
# ):
#     symptom_list = [s.strip().lower() for s in symptoms.split(",")]

#     disease = "Healthy / Unknown"
#     severity = "Low"
#     confidence = 40
#     reasons = []
#     prevention = []
#     treatment = []

#     if crop.lower() == "wheat" and "rust" in symptoms:
#         disease = "Wheat Rust"
#         severity = "Severe"
#         confidence = 85
#         reasons = ["Rust pustules detected", "Typical wheat fungal infection"]
#         prevention = ["Use resistant varieties", "Avoid excess irrigation"]
#         treatment = [
#             "Day 1: Remove infected plants",
#             "Day 2: Apply fungicide",
#             "Day 7: Monitor spread"
#         ]

#     elif crop.lower() == "rice" and "blast" in symptoms:
#         disease = "Rice Blast"
#         severity = "Moderate"
#         confidence = 78
#         reasons = ["Blast lesions observed"]
#         prevention = ["Balanced nitrogen usage"]
#         treatment = ["Apply recommended fungicide"]

#     elif crop.lower() == "tomato" and "leaf curl" in symptoms:
#         disease = "Tomato Leaf Curl Virus"
#         severity = "Severe"
#         confidence = 82
#         reasons = ["Leaf curling observed", "Virus pattern matched"]
#         prevention = ["Control whiteflies"]
#         treatment = ["Remove infected plants"]

#     confidence_penalty = 0
#     if crop.lower() not in KNOWN_CROPS:
#         confidence_penalty = 20
#         confidence = max(confidence - confidence_penalty, 20)
#         reasons.append("Crop not in predefined knowledge base")

#     image_path = None
#     if image:
#         ext = image.filename.split(".")[-1]
#         filename = f"{uuid.uuid4()}.{ext}"
#         image_path = f"{UPLOAD_DIR}/{filename}"
#         with open(image_path, "wb") as f:
#             f.write(await image.read())

#     record = {
#         "id": str(uuid.uuid4()),
#         "crop": crop,
#         "symptoms": symptom_list,
#         "disease": disease,
#         "severity": severity,
#         "confidence": confidence,
#         "confidence_penalty": confidence_penalty,
#         "reasons": reasons,
#         "prevention": prevention,
#         "treatment": treatment,
#         "image_path": image_path,
#         "timestamp": datetime.now().isoformat()
#     }

#     save_history(record)
#     return record

# @router.get("/history")
# def get_history():
#     return load_history()




# from fastapi import APIRouter, UploadFile, File
# from pydantic import BaseModel
# from typing import List
# import json
# from datetime import datetime
# from pathlib import Path

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# DATA_FILE = Path("app/data/disease_history.json")

# # -------------------------------
# # Request model
# # -------------------------------
# class DiseaseInput(BaseModel):
#     crop: str
#     symptoms: List[str]

# # -------------------------------
# # Rule-based disease engine
# # -------------------------------
# def detect_disease(crop, symptoms):
#     crop = crop.lower()
#     s = set(symptoms)

#     # Default
#     disease = "Unknown Disease"
#     severity = "Low"
#     confidence = 40
#     reasons = []
#     treatment = []
#     prevention = []

#     if {"rust pustules", "yellow leaves"} & s:
#         disease = "Rust Disease"
#         severity = "Severe"
#         confidence = 82
#         reasons = [
#             "Rust-colored pustules detected",
#             "Yellowing of leaves observed",
#             "Common fungal pattern"
#         ]
#         treatment = [
#             "Apply fungicide immediately",
#             "Remove infected plants",
#             "Avoid moisture stress"
#         ]
#         prevention = [
#             "Use resistant crop varieties",
#             "Avoid overcrowding"
#         ]

#     elif {"brown spots", "leaf curl"} & s:
#         disease = "Leaf Blight"
#         severity = "Moderate"
#         confidence = 72
#         reasons = [
#             "Brown lesions on leaves",
#             "Leaf curling observed",
#             "Warm humid conditions favor blight"
#         ]
#         treatment = [
#             "Apply contact fungicide",
#             "Improve air circulation"
#         ]
#         prevention = [
#             "Crop rotation",
#             "Avoid excess nitrogen"
#         ]

#     # Confidence penalty for unknown crop
#     known_crops = {"wheat", "rice", "maize", "tomato"}
#     if crop not in known_crops:
#         confidence -= 15
#         reasons.append("Crop type not in trained reference list")

#     return {
#         "disease": disease,
#         "severity": severity,
#         "confidence": max(confidence, 20),
#         "reasons": reasons,
#         "treatment": treatment,
#         "prevention": prevention
#     }

# # -------------------------------
# # POST: Detect disease
# # -------------------------------
# @router.post("/detect")
# async def detect(
#     crop: str,
#     symptoms: List[str],
#     image: UploadFile = File(None)
# ):
#     result = detect_disease(crop, symptoms)

#     record = {
#         "crop": crop,
#         "disease": result["disease"],
#         "severity": result["severity"],
#         "confidence": result["confidence"],
#         "reasons": result["reasons"],
#         "treatment": result["treatment"],
#         "prevention": result["prevention"],
#         "image_used": image is not None,
#         "timestamp": datetime.now().isoformat(),
#         "disclaimer": (
#             "This result is generated by an AI-based decision support system "
#             "and should not replace professional agricultural advice."
#         )
#     }

#     # Save history
#     history = json.loads(DATA_FILE.read_text())
#     history.insert(0, record)
#     DATA_FILE.write_text(json.dumps(history, indent=2))

#     return record

# # -------------------------------
# # GET: Disease history
# # -------------------------------
# @router.get("/history")
# def history():
#     return json.loads(DATA_FILE.read_text())



# from fastapi import APIRouter, UploadFile, File, Form
# from typing import List

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# @router.post("/detect")
# async def detect_disease(
#     crop: str = Form(...),
#     symptoms: List[str] = Form(...),
#     image: UploadFile = File(None)
# ):
#     crop = crop.lower()
#     symptoms_set = set(symptoms)

#     # ---- DEFAULT RESPONSE ----
#     disease = "Unknown Disease"
#     severity = "Low"
#     confidence = 40
#     reasons = []
#     prevention = []
#     treatment = []

#     # ---- RULE-BASED DIAGNOSIS ----
#     if crop == "wheat" and {"rust pustules", "yellow leaves"} & symptoms_set:
#         disease = "Wheat Rust"
#         severity = "Severe"
#         confidence = 82
#         reasons = [
#             "Rust-colored pustules detected",
#             "Yellowing of leaves observed"
#         ]
#         prevention = [
#             "Use rust-resistant wheat varieties",
#             "Avoid excess nitrogen fertilizer"
#         ]
#         treatment = [
#             "Apply fungicide (propiconazole)",
#             "Remove heavily infected plants"
#         ]

#     elif crop == "rice" and {"brown spots", "wilting"} & symptoms_set:
#         disease = "Rice Brown Spot"
#         severity = "Moderate"
#         confidence = 75
#         reasons = [
#             "Brown lesions on leaves",
#             "Wilting symptoms present"
#         ]
#         prevention = [
#             "Maintain proper field drainage",
#             "Use certified seeds"
#         ]
#         treatment = [
#             "Apply mancozeb fungicide",
#             "Improve soil nutrition"
#         ]

#     elif crop == "tomato" and {"leaf curl", "white powder"} & symptoms_set:
#         disease = "Tomato Leaf Curl / Powdery Mildew"
#         severity = "Moderate"
#         confidence = 70
#         reasons = [
#             "Leaf curling detected",
#             "White powdery fungal growth"
#         ]
#         prevention = [
#             "Ensure good air circulation",
#             "Avoid overhead irrigation"
#         ]
#         treatment = [
#             "Apply sulfur-based fungicide",
#             "Remove infected leaves"
#         ]

#     # ---- UNKNOWN CROP PENALTY ----
#     if crop not in ["wheat", "rice", "tomato"]:
#         confidence = max(confidence - 20, 25)
#         reasons.append("Crop not in trained disease database")

#     return {
#         "crop": crop,
#         "disease": disease,
#         "severity": severity,
#         "confidence": confidence,
#         "reasons": reasons,
#         "prevention": prevention,
#         "treatment": treatment,
#         "disclaimer": "This result is advisory only. Consult an agricultural expert for confirmation."
#     }



# from fastapi import APIRouter, UploadFile, File, Form
# from typing import List

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# # -----------------------------
# # Disease database
# # -----------------------------
# DISEASE_DB = [
#     {
#         "name": "Wheat Rust",
#         "crop": "wheat",
#         "symptoms": {"rust pustules", "yellow leaves"},
#         "severity": "Severe",
#         "treatment": [
#             "Apply propiconazole fungicide",
#             "Remove heavily infected plants"
#         ],
#         "prevention": [
#             "Use rust-resistant varieties",
#             "Avoid excess nitrogen fertilizer"
#         ]
#     },
#     {
#         "name": "Leaf Blight",
#         "crop": None,  # affects many crops
#         "symptoms": {"brown spots", "wilting"},
#         "severity": "Moderate",
#         "treatment": [
#             "Apply broad-spectrum fungicide",
#             "Improve air circulation"
#         ],
#         "prevention": [
#             "Crop rotation",
#             "Avoid water stagnation"
#         ]
#     },
#     {
#         "name": "Powdery Mildew",
#         "crop": "tomato",
#         "symptoms": {"white powder", "leaf curl"},
#         "severity": "Moderate",
#         "treatment": [
#             "Apply sulfur-based fungicide",
#             "Remove infected leaves"
#         ],
#         "prevention": [
#             "Maintain proper spacing",
#             "Avoid overhead irrigation"
#         ]
#     }
# ]

# # -----------------------------
# # Scoring engine
# # -----------------------------
# def score_diseases(crop: str, symptoms: set):
#     results = []

#     for d in DISEASE_DB:
#         # Crop mismatch → skip
#         if d["crop"] and d["crop"] != crop:
#             continue

#         matched = d["symptoms"] & symptoms
#         if not matched:
#             continue

#         score = len(matched) / len(d["symptoms"])
#         confidence = int(score * 100)

#         results.append({
#             "name": d["name"],
#             "confidence": confidence,
#             "severity": d["severity"],
#             "matched_symptoms": list(matched),
#             "treatment": d["treatment"],
#             "prevention": d["prevention"]
#         })

#     return sorted(results, key=lambda x: x["confidence"], reverse=True)

# # -----------------------------
# # API endpoint
# # -----------------------------
# @router.post("/detect")
# async def detect_disease(
#     crop: str = Form(...),
#     symptoms: List[str] = Form(...),
#     image: UploadFile = File(None)
# ):
#     crop = crop.lower()
#     symptom_set = set(symptoms)

#     results = score_diseases(crop, symptom_set)

#     # No disease matched
#     if not results:
#         return {
#             "primary_disease": None,
#             "possible_diseases": [],
#             "confidence": 30,
#             "reasons": [
#                 "Symptoms do not strongly match known disease patterns",
#                 "Crop type may be outside trained dataset"
#             ],
#             "treatment": [
#                 "Monitor crop closely",
#                 "Consult local agricultural expert"
#             ],
#             "prevention": [
#                 "Maintain field hygiene",
#                 "Use healthy planting material"
#             ],
#             "disclaimer": "AI-based advisory only. Not a substitute for expert advice."
#         }

#     primary = results[0]
#     secondary = results[1:3]

#     return {
#         "primary_disease": primary,
#         "possible_diseases": secondary,
#         "image_used": image is not None,
#         "disclaimer": "This analysis is advisory only. Consult an agricultural expert before treatment."
#     }



# from fastapi import APIRouter
# from pydantic import BaseModel
# from typing import List
# from app.data.disease_knowledge import DISEASES

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# class DiseaseInput(BaseModel):
#     crop_name: str
#     symptoms: List[str]
#     severity: str  # mild | moderate | severe


# @router.post("/detect")
# def detect_disease(data: DiseaseInput):

#     crop = data.crop_name.lower()
#     symptoms = data.symptoms
#     severity = data.severity.lower()

#     severity_multiplier = {
#         "mild": 1.0,
#         "moderate": 1.2,
#         "severe": 1.4
#     }.get(severity, 1.0)

#     best_match = None
#     best_score = 0
#     reasons = []

#     for disease in DISEASES:
#         score = 0
#         local_reasons = []

#         # Crop relevance
#         if disease["crops"]:
#             if crop in disease["crops"]:
#                 score += 15
#                 local_reasons.append("Crop is commonly affected by this disease")
#             else:
#                 score -= 10  # penalty, not rejection

#         # Symptom matching
#         for s in symptoms:
#             if s in disease["symptoms"]:
#                 score += disease["symptoms"][s]
#                 local_reasons.append(f"Symptom '{s}' strongly matches")

#         score *= severity_multiplier

#         if score > best_score:
#             best_score = score
#             best_match = disease
#             reasons = local_reasons

#     if not best_match:
#         return {
#             "predicted_disease": "Unknown",
#             "confidence": 20,
#             "reason_points": ["Symptoms do not strongly match known diseases"],
#             "treatment": [],
#             "prevention": [],
#             "disclaimer": "Consult an agricultural expert for accurate diagnosis.",
#         }

#     confidence = min(int(best_score), 95)

#     return {
#         "predicted_disease": best_match["name"],
#         "confidence": confidence,
#         "reason_points": reasons,
#         "treatment": best_match["treatment"],
#         "prevention": best_match["prevention"],
#         "disclaimer": (
#             "This system provides decision support, not a medical diagnosis. "
#             "Consult an agricultural expert before treatment."
#         ),
#     }



# from fastapi import APIRouter
# from pydantic import BaseModel
# from typing import List
# from app.data.disease_db import DISEASES

# router = APIRouter(prefix="/disease", tags=["Disease Detection"])

# class DiseaseInput(BaseModel):
#     crop_name: str
#     symptoms: List[str]
#     severity: str  # mild | moderate | severe


# @router.post("/detect")
# def detect_disease(data: DiseaseInput):

#     crop = data.crop_name.lower()
#     symptoms = data.symptoms
#     severity = data.severity.lower()

#     severity_factor = {
#         "mild": 1.0,
#         "moderate": 1.2,
#         "severe": 1.4
#     }.get(severity, 1.0)

#     best_score = 0
#     best_disease = None
#     best_reasons = []

#     # for disease in DISEASES:
#     #     score = 0
#     #     reasons = []

#     #     # ❗ Core symptom gate (prevents Leaf Blight everywhere)
#     #     core_matches = [s for s in disease["core_symptoms"] if s in symptoms]
#     #     if not core_matches:
#     #         continue

#         # reasons.append(
#         #     f"Core symptom(s) matched: {', '.join(core_matches)}"
#         # )

#         # # Crop relevance
#         # if disease["crops"]:
#         #     if crop in disease["crops"]:
#         #         score += 15
#         #         reasons.append("Crop commonly affected")
#         #     else:
#         #         score -= 10

#         # # Symptom scoring
#         # for s in symptoms:
#         #     if s in disease["symptoms"]:
#         #         score += disease["symptoms"][s]
#         #         reasons.append(f"Symptom '{s}' matched")

#         # score *= severity_factor

#         # if score > best_score:
#         #     best_score = score
#         #     best_disease = disease
#         #     best_reasons = reasons
        
#     for disease in DISEASES:
#         score = 0
#         reasons = []

#     # ❗ Core symptom gate (symptoms decide disease)
#         core_matches = [s for s in disease["core_symptoms"] if s in symptoms]
#         if not core_matches:
#          continue

#     reasons.append(
#         f"Core symptom(s) matched: {', '.join(core_matches)}"
#     )

#     # Symptom scoring (MAIN decision factor)
#     for s in symptoms:
#         if s in disease["symptoms"]:
#             score += disease["symptoms"][s]
#             reasons.append(f"Symptom '{s}' matched")

#     # Severity multiplier
#     score *= severity_factor

#     if score > best_score:
#         best_score = score
#         best_disease = disease
#         best_reasons = reasons


#     if not best_disease:
#         return {
#             "predicted_disease": "Unknown",
#             "confidence": 25,
#             "reason_points": ["Symptoms do not strongly match known diseases"],
#             "treatment": [],
#             "prevention": [],
#             "disclaimer": "Consult an agricultural expert for accurate diagnosis."
#         }

#     # confidence = min(max(int(best_score), 35), 95)
#     confidence = int(best_score)

# # Crop-based confidence adjustment ONLY
#     if best_disease["crops"] and crop not in best_disease["crops"]:
#      confidence -= 10
#     best_reasons.append("Crop is less commonly associated with this disease")

# confidence = min(max(confidence, 30), 95)
# return {
   
#         "predicted_disease": best_disease["name"],
#         "confidence": confidence,
#         "reason_points": best_reasons,
#         "treatment": best_disease["treatment"],
#         "prevention": best_disease["prevention"],
#         "disclaimer": (
#             "This system provides decision support only. "
#             "Consult an agricultural expert before treatment."
#         )
#     }



from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.data.disease_db import DISEASES

router = APIRouter(prefix="/disease", tags=["Disease Detection"])


class DiseaseInput(BaseModel):
    crop_name: str
    symptoms: List[str]
    severity: str  # mild | moderate | severe


@router.post("/detect")
def detect_disease(data: DiseaseInput):

    crop = data.crop_name.lower()
    symptoms = data.symptoms
    severity = data.severity.lower()

    severity_factor = {
        "mild": 1.0,
        "moderate": 1.2,
        "severe": 1.4
    }.get(severity, 1.0)

    best_score = 0
    best_disease = None
    best_reasons = []

    # 🔹 MAIN LOGIC: symptoms decide disease
    for disease in DISEASES:
        score = 0
        reasons = []

        # 1️⃣ Core symptom gate
        core_matches = [
            s for s in disease["core_symptoms"] if s in symptoms
        ]
        if not core_matches:
            continue

        reasons.append(
            f"Core symptom(s) matched: {', '.join(core_matches)}"
        )

        # 2️⃣ Symptom scoring
        for s in symptoms:
            if s in disease["symptoms"]:
                score += disease["symptoms"][s]
                reasons.append(f"Symptom '{s}' matched")

        # 3️⃣ Severity multiplier
        score *= severity_factor

        if score > best_score:
            best_score = score
            best_disease = disease
            best_reasons = reasons

    # ❌ No disease matched
    if not best_disease:
        return {
            "predicted_disease": "Unknown",
            "confidence": 25,
            "reason_points": ["Symptoms do not strongly match known diseases"],
            "treatment": [],
            "prevention": [],
            "disclaimer": "Consult an agricultural expert for accurate diagnosis."
        }

    # 4️⃣ Confidence calculation
    confidence = int(best_score)

    # Crop affects confidence ONLY (not disease)
    if best_disease["crops"] and crop not in best_disease["crops"]:
        confidence -= 10
        best_reasons.append(
            "Crop is less commonly associated with this disease"
        )

    confidence = min(max(confidence, 30), 95)

    return {
        "predicted_disease": best_disease["name"],
        "confidence": confidence,
        "reason_points": best_reasons,
        "treatment": best_disease["treatment"],
        "prevention": best_disease["prevention"],
        "disclaimer": (
            "This system provides decision support only. "
            "Consult an agricultural expert before treatment."
        )
    }
