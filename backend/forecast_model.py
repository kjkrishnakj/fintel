import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import timedelta

def load_and_forecast(index: str = "nasdaq", days: int = 30):
    file_map = {
        "nasdaq": "data/nasdaq.csv",
        "snp": "data/snp.csv",
        "dow": "data/downjones.csv",
        "russell": "data/rut.csv"
    }

    if index not in file_map:
        return {"error": "Invalid index name"}

    # Load and prepare data
    df = pd.read_csv(file_map[index])
    df = df.rename(columns={"Date": "ds", "Close/Last": "y"})
    df["ds"] = pd.to_datetime(df["ds"])
    df["y"] = df["y"].replace('[\$,]', '', regex=True).astype(float)
    df = df.sort_values("ds")

    # Convert dates to numeric days since start
    df["days_since_start"] = (df["ds"] - df["ds"].min()).dt.days
    X = df[["days_since_start"]]
    y = df["y"]

    # Train model
    model = LinearRegression()
    model.fit(X, y)

    # Forecast future
    last_day = df["ds"].max()
    last_index = df["days_since_start"].max()

    future_days = np.array([last_index + i for i in range(1, days + 1)]).reshape(-1, 1)
    predictions = model.predict(future_days)
    forecast_dates = [last_day + timedelta(days=i) for i in range(1, days + 1)]

    forecast = [{"ds": date.strftime("%Y-%m-%d"), "yhat": round(float(pred), 2)} for date, pred in zip(forecast_dates, predictions)]
    return forecast
