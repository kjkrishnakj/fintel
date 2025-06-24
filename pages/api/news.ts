import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.FINNHUB_API_KEY
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch news" })
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      return res.status(204).json({ message: "No content" })
    }

    const articles = data
      .filter((a) => a.headline && a.url)
      .slice(0, 45) // Optional: limit to 15 articles
      .map((a) => ({
        title: a.headline,
        url: a.url,
        image: a.image ?? null, // Optional: include thumbnail
        source: a.source ?? null,
        datetime: a.datetime ?? null,
      }))

    return res.status(200).json(articles)
  } catch (err) {
    console.error("Finnhub news error:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
