import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      {/* Predicted Price */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Predicted Price</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹2,450.75
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Projected closing for next trading day
          </div>
        </CardFooter>
      </Card>

      {/* News Sentiment */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>News Sentiment</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Positive
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Bullish outlook <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Real-time news analysis
          </div>
        </CardFooter>
      </Card>

      {/* Active Stocks Monitored */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stocks Monitored</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            27
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5 this week
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Personalized watchlist <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Updated with preferences</div>
        </CardFooter>
      </Card>

      {/* Volatility Index */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Volatility Index</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3.7%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              −0.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Mild fluctuation <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Last 5 sessions average
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
