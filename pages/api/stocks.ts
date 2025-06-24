import type { NextApiRequest, NextApiResponse } from "next"

const hardcodedData = [
  { symbol: "AAPL", price: 189.25, change: 1.23 },
  { symbol: "MSFT", price: 341.55, change: 0.89 },
  { symbol: "GOOGL", price: 142.75, change: -0.45 },
  { symbol: "AMZN", price: 128.00, change: 1.04 },
  { symbol: "META", price: 318.30, change: -0.33 },
  { symbol: "NVDA", price: 452.00, change: 2.15 },
  { symbol: "TSLA", price: 262.35, change: -0.82 },
  { symbol: "BRK.B", price: 362.90, change: 0.41 },
  { symbol: "JPM", price: 155.70, change: 0.12 },
  { symbol: "JNJ", price: 166.80, change: -0.22 },
  { symbol: "V", price: 239.55, change: 0.75 },
  { symbol: "UNH", price: 504.30, change: -1.01 },
  { symbol: "INTC", price: 35.10, change: -0.15 },
  { symbol: "IBM", price: 133.50, change: 0.61 },
  { symbol: "DIS", price: 92.45, change: -0.37 },
  { symbol: "BA", price: 217.90, change: 0.48 },
  { symbol: "WMT", price: 159.20, change: 0.22 },
  { symbol: "KO", price: 60.85, change: -0.09 },
  { symbol: "PLUG", price: 7.22, change: 3.17 },
  { symbol: "BLNK", price: 3.95, change: 1.55 },
  { symbol: "FUV", price: 1.45, change: 2.80 },
  { symbol: "RRGB", price: 10.70, change: -0.64 },
  { symbol: "TNDM", price: 23.80, change: 1.02 },
  { symbol: "HROW", price: 9.95, change: 0.87 }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(hardcodedData)
}
