import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load data
df = pd.read_csv("destinations_real.csv")

X = df.drop(columns=["label"])
y = df["label"]

# Columns
num_cols = ["avg_temp","hotel_price","unesco_sites","beach","hiking_score","museum_score","kid_friendly","luxury_hotels"]
cat_cols = ["destination"]

# Preprocess
preprocess = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols)
])

# Pipeline
model = Pipeline([
    ("prep", preprocess),
    ("clf", RandomForestClassifier(n_estimators=250, random_state=42))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train
model.fit(X_train, y_train)

# Evaluate
pred = model.predict(X_test)
print(classification_report(y_test, pred))

# Save trained model
joblib.dump(model, "best_travel_model.joblib")
print("Model saved.")