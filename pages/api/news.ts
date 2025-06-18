import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.FINNHUB_API_KEY
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return res.status(response.status).end()
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      return res.status(204).end()
    }

    const articles = data
      .filter((a) => a.headline && a.url)
      .map((a) => ({
        title: a.headline,
        url: a.url,
      }))

    return res.status(200).json(articles)
  } catch {
    return res.status(500).end()
  }
}
