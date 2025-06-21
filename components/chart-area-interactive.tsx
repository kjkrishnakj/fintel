// components/ChartAreaInteractive.tsx
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { csvParse } from "d3-dsv"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"

const chartConfig = {
  close: { label: "Close Price", color: "var(--primary)" },
  open: { label: "Open Price", color: "var(--primary)" },
}

type Props = {
  title: string
  source: string // e.g., "nasdaq", "snp"
}

export function ChartAreaInteractive({ title, source }: Props) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("1y")
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    fetch(`/data/${source}.csv`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = csvParse(text)
        const cleaned = parsed
          .filter((row) => row.Date && row["Close/Last"])
          .map((row) => ({
            date: formatDate(row.Date),
            close: parseFloat(row["Close/Last"]?.replace(/[^0-9.]/g, "") || "0"),
            open: parseFloat(row["Open"]?.replace(/[^0-9.]/g, "") || "0"),
          }))
        setChartData(cleaned.reverse())
      })
  }, [source])

  const formatDate = (input: string) => {
    const [month, day, year] = input.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const today = new Date()
    const years = { "1y": 1, "2y": 2, "5y": 5 }[timeRange] || 1
    const startDate = new Date(today)
    startDate.setFullYear(today.getFullYear() - years)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            View Open and Close price trends for {title}
          </span>
          <span className="@[540px]/card:hidden">Open vs Close pricing</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="1y">1 Year</ToggleGroupItem>
            <ToggleGroupItem value="2y">2 Years</ToggleGroupItem>
            <ToggleGroupItem value="5y">5 Years</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="2y">2 Years</SelectItem>
              <SelectItem value="5y">5 Years</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#40E0D0" stopOpacity={1.0} />
                <stop offset="95%" stopColor="#40E0D0" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillOpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#40E0D0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#40E0D0" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="open"
              type="natural"
              fill="url(#fillOpen)"
              stroke="#40E0D0"
              stackId="a"
            />
            <Area
              dataKey="close"
              type="natural"
              fill="url(#fillClose)"
              stroke="#40E0D0"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
