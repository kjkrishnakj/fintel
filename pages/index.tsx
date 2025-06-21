"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import StockNews from "@/components/StockNews"
import StockTicker from "@/components/StockTicker"
import NasdaqChart from "@/components/NasdaqChart"

export default function Home() {
  

  return <>
  <StockTicker/>
  <NasdaqChart/>
  </>
}
