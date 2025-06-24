import type { NextApiRequest, NextApiResponse } from "next"

const symbols = [
    "AAPL", "TSLA", "MSFT", "GOOGL", 
    "AMZN", "META", "NVDA", "INTC", 
    "IBM", "NFLX", "BA", "DIS"
  ]
const API_KEY = process.env.FINNHUB_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
        const data = await response.json()
        return {
          symbol,
          price: data.c, // current price
          change: ((data.c - data.pc) / data.pc) * 100, // % change
        }
      })
    )
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock data" })
  }
}