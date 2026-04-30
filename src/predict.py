import joblib
import pandas as pd

model = joblib.load("best_travel_model.joblib")

sample = pd.DataFrame([{
    "destination": "Bali",
    "avg_temp": 29,
    "hotel_price": 120,
    "unesco_sites": 1,
    "beach": 1,
    "hiking_score": 8,
    "museum_score": 3,
    "kid_friendly": 1,
    "luxury_hotels": 0
}])

prediction = model.predict(sample)[0]
print("Predicted Travel Style:", prediction)