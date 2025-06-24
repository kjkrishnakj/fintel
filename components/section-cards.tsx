"use client"

import * as React from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function getStandardDeviation(numbers: number[]) {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length
  const variance = numbers.reduce((a, b) => a + (b - mean) ** 2, 0) / numbers.length
  return Math.sqrt(variance)
}

export function SectionCards() {
  const [forecast, setForecast] = React.useState<{ ds: string; yhat: number }[]>([])
  const [index, setIndex] = React.useState(0)
  const [animating, setAnimating] = React.useState(false)

  const indexLabels = ["NASDAQ", "S&P 500", "Dow Jones", "Russell"]

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict?index=nasdaq&days=365`)
      .then((res) => res.json())
      .then((json) => {
        console.log("Forecast data:", json)
        setForecast(Array.isArray(json.forecast) ? json.forecast : [])
      })
      .catch((err) => console.error("Data fetch error:", err))
  }, [])

  React.useEffect(() => {
    if (!forecast.length) return

    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % Math.min(forecast.length, 10))
        setAnimating(false)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [forecast])

  const current = forecast[index]
  const previous = forecast[index + 1] ?? current

  const percentChange =
    current && previous && previous.yhat !== 0
      ? (((current.yhat - previous.yhat) / previous.yhat) * 100).toFixed(1)
      : null
  const trendingUp = percentChange && parseFloat(percentChange) > 0

  const values = forecast.map((f) => f.yhat).filter(Boolean)
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
  const std = values.length ? getStandardDeviation(values) : 0
  const vix = avg > 0 ? ((std / avg) * 100).toFixed(1) : "0.0"
  const volatilityLabel =
    parseFloat(vix) < 2 ? "Stable" : parseFloat(vix) < 4 ? "Mild fluctuation" : "High fluctuation"

  const staticSentiment = {
    value: "+6.8",
    label: "Positive",
    bullish: true,
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 xl:grid-cols-4">
      {/* Predicted Price */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Predicted Price –{" "}
            <span className="font-semibold text-primary dark:text-primary">
              {indexLabels[index % indexLabels.length]}
            </span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>
              {current?.yhat
                ? `₹${current.yhat.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
                : "Loading..."}
            </span>
          </CardTitle>
          <CardAction>
            {percentChange && (
              <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>
                <Badge variant="outline">
                  {trendingUp ? <IconTrendingUp /> : <IconTrendingDown />}
                  {trendingUp ? "+" : ""}
                  {percentChange}%
                </Badge>
              </span>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>
              {trendingUp ? "Trending up" : "Trending down"}
            </span>
            {trendingUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">Forecast point {index + 1}</div>
        </CardFooter>
      </Card>

      {/* Volatility Index */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Volatility Index –{" "}
            <span className="font-semibold text-primary dark:text-primary">
              {indexLabels[index % indexLabels.length]}
            </span>
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>{vix}%</span>
          </CardTitle>
          <CardAction>
            <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>
              <Badge variant="outline">
                {parseFloat(vix) > 3.5 ? <IconTrendingDown /> : <IconTrendingUp />}
                {vix}%
              </Badge>
            </span>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <span className={animating ? "slide-up-fade-out" : "slide-up-fade-in"}>
              {volatilityLabel}
            </span>
            {parseFloat(vix) > 3.5 ? <IconTrendingDown className="size-4" /> : <IconTrendingUp className="size-4" />}
          </div>
          <div className="text-muted-foreground">From standard deviation of forecast</div>
        </CardFooter>
      </Card>

      {/* Static News Sentiment */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>News Sentiment</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {staticSentiment.label}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {staticSentiment.bullish ? <IconTrendingUp /> : <IconTrendingDown />}
              {staticSentiment.value}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {staticSentiment.bullish ? "Bullish outlook" : "Flat/Weak outlook"}
            {staticSentiment.bullish ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Based on recent forecast trend</div>
        </CardFooter>
      </Card>

      {/* Stocks Monitored */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stocks Monitored</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {forecast.length || "0"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +{Math.floor(forecast.length / 20)} this week
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Personalized watchlist <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on forecast dataset</div>
        </CardFooter>
      </Card>
    </div>
  )
}
