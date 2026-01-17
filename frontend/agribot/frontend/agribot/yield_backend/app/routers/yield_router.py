# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_Temp: float
#     max_Temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     clay: float

# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     result = model.predict(data.dict())
#     return {"predicted_yield": result}


# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_Temp: float
#     max_Temp: float
#     Min_temp: float
#     alkaline: float  # Changed from int to float
#     sandy: float     # Changed from int to float
#     chalky: float    # Changed from int to float
#     clay: float      # Changed from int to float

# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     result = model.predict(data.dict())
    # return {"predicted_yield": result}



# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_temp: float
#     max_temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     millet_yield: float
# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     result = model.predict(data.dict())
#     return {"predicted_yield": result}


# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_temp: float
#     max_temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     # Remove millet_yield - this is what we're predicting!

# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     try:
#         result = model.predict(data.dict())
#         return {"predicted_yield": result}
#     except Exception as e:
#         return {"error": str(e)}




# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_temp: float
#     max_temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     millet_yield: float
# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     result = model.predict(data.dict())
#     return {"predicted_yield": result}




# from fastapi import APIRouter
# from pydantic import BaseModel
# import pickle
# from pathlib import Path
# # from app.models.yield_model import YieldModel


# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# # model = YieldModel()
# # Load the trained model from pickle file
# model_path = Path(__file__).parent.parent /"models"/ "saved" / "yield_model.pkl"
# with open(model_path, "rb") as f:
#     model = pickle.load(f)

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_Temp: float
#     max_Temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     clay: float

# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     features = [
#         data.Moisture,
#         data.rainfall,
#         data.Average_Humidity,
#         data.Mean_Temp,
#         data.max_Temp,
#         data.Min_temp,
#         data.alkaline,
#         data.sandy,
#         data.chalky,
#         data.clay,
#     ]

#     result = model.predict([features])[0]
#     return {"predicted_yield": result}

    # input_data = [list(data.dict().values())]
    # result = model.predict(input_data)[0]
    # return {"predicted_yield": result}




# from fastapi import APIRouter
# from pydantic import BaseModel
# import pandas as pd
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_Temp: float
#     max_Temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     clay: float
    
# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     df = pd.DataFrame([data.dict()])
#     result = model.predict(df)[0]
#     return {"predicted_yield": float(result)}


# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.models.yield_model import YieldModel

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])
# model = YieldModel()

# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_temp: float
#     max_temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float

# @router.post("/predict")
# def predict_yield(data: YieldInput):
#     result = model.predict(data.dict())
#     return {"predicted_yield": result}



# from fastapi import APIRouter

# router = APIRouter(
#     prefix="/yield",
#     tags=["Yield Prediction"]
# )

# @router.get("/test")
# def test_yield():
#     return {"message": "Yield route working"}



# from fastapi import APIRouter
# from pydantic import BaseModel
# import pickle
# from pathlib import Path
# import pandas as pd

# router = APIRouter(prefix="/yield", tags=["Yield Prediction"])

# # Load model
# model_path = Path(__file__).parent.parent / "models" / "saved" / "yield_model.pkl"
# with open(model_path, "rb") as f:
#     model = pickle.load(f)


# # Pydantic input schema
# class YieldInput(BaseModel):
#     Moisture: float
#     rainfall: float
#     Average_Humidity: float
#     Mean_Temp: float
#     max_Temp: float
#     Min_temp: float
#     alkaline: float
#     sandy: float
#     chalky: float
#     clay: float


# @router.post("/predict")
# def predict_yield(data: YieldInput):

#     # The correct column order used during training
#     FEATURE_ORDER = [
#         "Moisture",
#         "rainfall",
#         "Average_Humidity",
#         "Mean_Temp",
#         "max_Temp",
#         "Min_temp",
#         "alkaline",
#         "sandy",
#         "chalky",
#         "clay",
#     ]

#     # Convert input to DataFrame with correct column names
#     input_df = pd.DataFrame([{
#         "Moisture": data.Moisture,
#         "rainfall": data.rainfall,
#         "Average_Humidity": data.Average_Humidity,
#         "Mean_Temp": data.Mean_Temp,
#         "max_Temp": data.max_Temp,
#         "Min_temp": data.Min_temp,
#         "alkaline": data.alkaline,
#         "sandy": data.sandy,
#         "chalky": data.chalky,
#         "clay": data.clay,
#     }])[FEATURE_ORDER]

#     # Make prediction
#     result = model.predict(input_df)[0]

#     return {"predicted_yield": float(result)}



from fastapi import APIRouter
from pydantic import BaseModel
import pickle
from pathlib import Path
import pandas as pd

router = APIRouter(prefix="/yield", tags=["Yield Prediction"])

# Load trained model
model_path = Path(__file__).parent.parent / "models" / "saved" / "yield_model.pkl"
model = pickle.load(open(model_path, "rb"))


# Input schema MUST match the training dataset
class YieldInput(BaseModel):
    crop_type: str
    soil_type: str
    rainfall: float
    humidity: float
    temperature: float
    moisture: float
    nitrogen: float
    phosphorus: float
    potassium: float


@router.post("/predict")
def predict_yield(data: YieldInput):

    # Convert input to DataFrame
    df = pd.DataFrame([data.dict()])

    # Predict using the trained RandomForest pipeline
    result = model.predict(df)[0]

    # Return numeric yield in kg/ha
    return {"predicted_yield_kg_per_ha": float(result)}
