import type { NextApiRequest, NextApiResponse } from "next"

const symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA",
  // S&P 500
  "TSLA", "BRK.B", "JPM", "JNJ", "V", "UNH",
  // Dow Jones
  "INTC", "IBM", "DIS", "BA", "WMT", "KO",
  // Russell 2000
  "PLUG", "BLNK", "FUV", "RRGB", "TNDM", "HROW"
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