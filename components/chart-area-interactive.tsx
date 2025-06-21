"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"
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

const chartConfig: ChartConfig = {
  close: { label: "Close Price", color: "#ef4444" },
  open: { label: "Open Price", color: "#22c55e" },
}

type Props = {
  title: string
  source: string
}

type ChartPoint = {
  date: string
  close: number
  open: number
}

export function ChartAreaInteractive({ title, source }: Props) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("1y")
  const [chartData, setChartData] = React.useState<ChartPoint[]>([])

  const formatDate = (input: string) => {
    const [month, day, year] = input.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

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
          className="aspect-auto h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
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
              
<YAxis
  domain={([min, max]) => {
    const padding = (max - min) * 0.1 // 10% top/bottom padding
    return [min - padding, max + padding]
  }}
  tickFormatter={(value) =>
    `₹${value.toLocaleString("en-IN")}`
  }
  tickLine={false}
  axisLine={false}
/>
              <Legend verticalAlign="top" iconType="circle" />
              <ChartTooltip
  cursor={{ strokeDasharray: "3 3" }}
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

              <Line
                dataKey="open"
                type="monotone"
                stroke="#15803d"
                dot={false}
                strokeWidth={2.5}
              />
              <Line
                dataKey="close"
                type="monotone"
                stroke="#b91c1c"
                dot={false}
                strokeWidth={2.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
