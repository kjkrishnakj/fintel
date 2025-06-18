import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = "3970e60cc361481785edea02bdebee8b"
  const url = `https://newsapi.org/v2/everything?q=stocks OR stock market OR shares&language=en&sortBy=publishedAt&sources=cnn,bloomberg,business-insider,financial-times,cnbc&apiKey=${apiKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({ error: "NewsAPI error", details: text })
    }

    const data = await response.json()

    if (!data.articles) {
      return res.status(500).json({ error: "No articles found" })
    }

    return res.status(200).json(data.articles)
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to fetch news", message: error.message })
  }
}
