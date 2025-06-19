"use client"

import { useEffect, useState } from "react"

type Stock = {
  symbol: string
  price: number
  change: number
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<"in" | "out">("in")

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch("/api/stocks")
        const data = await res.json()
        setStocks(data)
      } catch (err) {
        console.error("Failed to fetch stock data:", err)
      }
    }

    fetchStocks()
    const interval = setInterval(fetchStocks, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("out")
      setTimeout(() => {
        setIndex((prev) => (stocks.length ? (prev + 1) % stocks.length : 0))
        setFade("in")
      }, 300) // matches CSS animation duration
    }, 3500)

    return () => clearInterval(interval)
  }, [stocks])

  if (!stocks.length) return null

  const stock = stocks[index]

  return (
    <div className="h-12 w-full overflow-hidden bg-[#09090b] text-white flex items-center justify-center relative">
      <div
        key={stock.symbol + fade}
        className={`absolute ${
          fade === "in" ? "slide-up-fade-in" : "slide-up-fade-out"
        }`}
      >
        <span className="text-sm font-medium">{stock.symbol}</span>
        <span
          className={`ml-3 ${
            stock.change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          ${stock.price.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
          {stock.change.toFixed(2)}%)
        </span>
      </div>
    </div>
  )
}
