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

# os.makedirs("app/models/saved", exist_ok=True)
# with open("app/models/saved/yield_model.pkl", "wb") as f:
#     pickle.dump(model, f)

# print("Model saved → app/models/saved/yield_model.pkl")



import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

# Load dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(BASE_DIR, "yield_data.csv")
df = pd.read_csv(data_path)

X = df[[
    "Moisture", "rainfall", "Average_Humidity", "Mean_Temp", "max_Temp",
    "Min_temp", "alkaline", "sandy", "chalky", "clay"
]]
y = df["millet_yield"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print("Model accuracy:", accuracy)

save_dir = os.path.join(BASE_DIR, "yield_model.pkl")
with open(save_dir, "wb") as f:
    pickle.dump(model, f)

print(f"Model saved → {save_dir}")
