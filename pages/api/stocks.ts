import type { NextApiRequest, NextApiResponse } from "next"

const symbols = ["INFY:BSE"]
const apiKey = "208705417a2641688389330697fbf38f"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(
      ","
    )}&apikey=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()
    console.log("API stocks data:", data)

    const result: any[] = []

    if (data && data.symbol && data.price && data.percent_change) {
      result.push({
        symbol: data.symbol,
        price: parseFloat(data.price),
        change: parseFloat(data.percent_change),
      })
    }

    res.status(200).json(result)
  } catch (err) {
    console.error("❌ Failed to fetch stocks:", err)
    res.status(500).json({ error: "Failed to fetch stock data" })
  }
}
