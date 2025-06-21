"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import StockNews from "@/components/StockNews"
import StockTicker from "@/components/StockTicker"

export default function Home() {
  

  return <>
  <StockTicker/>
  </>
}
