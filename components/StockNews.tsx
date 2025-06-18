"use client"
import { useEffect, useState } from "react"
import { IconSpeakerphone } from "@tabler/icons-react"

type Article = {
  title: string
  url: string
}

export default function StockNews() {
  const [news, setNews] = useState<Article[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const validArticles = data.filter((a) => a.title && a.url)
          setNews(validArticles.slice(0, 10))
        }
      })
  }, [])

  useEffect(() => {
    if (news.length === 0) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [news])

  const article = news[index]

  return (
    <div className="flex items-center space-x-2 overflow-hidden w-full bg-[#09090b] text-white px-3 py-2 rounded-md">

      <IconSpeakerphone size={18} className="text-yellow-400 flex-shrink-0" />
      {article ? (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm truncate w-full animate-fade"
        >
          {article.title}
        </a>
      ) : (
        <span className="text-xs">Loading news...</span>
      )}
    </div>
  )
}
