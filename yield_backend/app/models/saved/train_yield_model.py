# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# import pickle
# import os

# # Load dataset
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# data_path = os.path.join(BASE_DIR, "yield_data.csv")
# df = pd.read_csv(data_path)
# X = df[["Moisture","rainfall","Average_Humidity","Mean_Temp","max_Temp",
#         "Min_temp","alkaline","sandy","chalky","clay"]]
# y = df["millet_yield"]

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = RandomForestRegressor(n_estimators=200, random_state=42)
# model.fit(X_train, y_train)

# accuracy = model.score(X_test, y_test)
# print("Model accuracy:", accuracy)

# # os.makedirs("app/models/saved", exist_ok=True)
# # with open("app/models/saved/yield_model.pkl", "wb") as f:
# #     pickle.dump(model, f)

# # print("Model saved → app/models/saved/yield_model.pkl")
# # Save in the same directory as this script (app/saved/)
# model_save_path = os.path.join(BASE_DIR, "yield_model.pkl")
# with open(model_save_path, "wb") as f:
#     pickle.dump(model, f)

# print(f"Model saved → {model_save_path}")

# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# import pickle
# import os

# # Load dataset
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# data_path = os.path.join(BASE_DIR, "yield_data.csv")
# df = pd.read_csv(data_path)

# X = df[[
#     "Moisture", "rainfall", "Average_Humidity", "Mean_Temp", "max_Temp",
#     "Min_temp", "alkaline", "sandy", "chalky", "clay"
# ]]
# y = df["millet_yield"]

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = RandomForestRegressor(n_estimators=200, random_state=42)
# model.fit(X_train, y_train)

# accuracy = model.score(X_test, y_test)
# print("Model accuracy:", accuracy)

# save_dir = os.path.join(BASE_DIR, "yield_model.pkl")
# with open(save_dir, "wb") as f:
#     pickle.dump(model, f)

# print(f"Model saved → {save_dir}")



import pandas as pd
import pickle
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load dataset
data_path = Path(__file__).parent / "agri_yield_dataset.csv"
df = pd.read_csv(data_path)

# Features and target
X = df.drop(columns=["yield_kg_per_ha"])
y = df["yield_kg_per_ha"]

# Categorical columns
categorical_cols = ["crop_type", "soil_type"]

# Preprocessing: one-hot encode crop and soil type
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ],
    remainder="passthrough"
)

# Build pipeline
model = Pipeline(steps=[
    ("preprocess", preprocessor),
    ("rf", RandomForestRegressor(n_estimators=200, random_state=42))
])

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# Save model
model_path = Path(__file__).parent / "yield_model.pkl"
with open(model_path, "wb") as f:
    pickle.dump(model, f)

print(f"Model trained and saved to {model_path}")
