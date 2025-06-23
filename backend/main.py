from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from forecast_model import load_and_forecast

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def predict(index: str = Query(...), days: int = Query(30)):
    return {"forecast": load_and_forecast(index, days)}
