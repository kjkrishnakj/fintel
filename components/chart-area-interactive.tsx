"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ForecastPoint = {
  ds: string
  yhat: number
}

type Props = {
  title: string
  index: string
}

const rangeToDays: Record<"1y" | "2y" | "5y" | "10y", number> = {
  "1y": 365,
  "2y": 730,
  "5y": 1825,
  "10y": 3650,
}

export function ChartAreaInteractive({ title, index }: Props) {
  const [data, setData] = React.useState<ForecastPoint[]>([])
  const [range, setRange] = React.useState<"1y" | "2y" | "5y" | "10y">("1y")
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setIsLoading(true)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/predict?index=${index}&days=${rangeToDays[range]}`
    // console.log("Fetching from:", url)

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.forecast)) {
          setData(json.forecast)
        } else {
          console.error("Invalid forecast format:", json)
          setData([])
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("API Error:", err)
        setIsLoading(false)
      })
  }, [index, range])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Forecasted closing prices — {range.toUpperCase()} view
        </CardDescription>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(value) => setRange(value as "1y" | "2y" | "5y" | "10y")}
            variant="outline"
            className="hidden sm:flex"
          >
            <ToggleGroupItem value="1y">1 Year</ToggleGroupItem>
            <ToggleGroupItem value="2y">2 Years</ToggleGroupItem>
            <ToggleGroupItem value="5y">5 Years</ToggleGroupItem>
            <ToggleGroupItem value="10y">10 Years</ToggleGroupItem>
          </ToggleGroup>

          <Select value={range} onValueChange={(value) => setRange(value as "1y" | "2y" | "5y" | "10y")}>
            <SelectTrigger className="w-[150px] sm:hidden">
              <SelectValue placeholder="1 Year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="2y">2 Years</SelectItem>
              <SelectItem value="5y">5 Years</SelectItem>
              <SelectItem value="10y">10 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-4">
        {isLoading ? (
          <div className="text-center text-muted-foreground text-sm">Loading forecast...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="ds"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    year: "2-digit",
                  })
                }
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(value) =>
                  `₹${value.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}`
                }
                tickLine={false}
                axisLine={false}
              />
             <Tooltip
  content={({ active, payload, label }) => {
    if (active && payload && payload.length > 0 && payload[0].value !== undefined) {
      return (
        <div
          style={{
            backgroundColor: "#09090b",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "0.85rem",
          }}
        >
          <div>
            {new Date(label as string).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>
            ₹{(payload[0].value as number).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      )
    }
    return null
  }}
/>


              <Area
                type="monotone"
                dataKey="yhat"
                stroke="#0284c7"
                strokeWidth={2.5}
                fill="url(#fillForecast)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
