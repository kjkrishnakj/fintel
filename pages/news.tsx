"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type Article = {
  title: string
  url: string
  image?: string
  summary?: string
  source?: string
}

export default function StockNewsPage() {
  const [news, setNews] = useState<Article[]>([])

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const valid = data.filter((a) => a.title && a.url && a.image)
          setNews(valid.slice(0, 45))
        }
      })
      .catch(console.error)
  }, [])

  const featured = news[0]
  const latest = news.slice(1, 7)
  const mustRead = news.slice(7, 25)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />

        <div className="grid lg:grid-cols-3 gap-8 px-6 py-10 min-h-screen bg-background">
          <div className="lg:col-span-2 space-y-8">
            {featured && (
              <a href={featured.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-xl font-semibold mb-4">Featured News</h2>
                <Card className="overflow-hidden rounded-xl">
                  <img
                    src={featured.image || "/placeholder.jpg"}
                    alt={featured.title}
                    className="w-full h-64 object-cover"
                  />
                  <CardHeader className="p-4">
                    <CardTitle className="text-2xl font-bold">
                      {featured.title}
                    </CardTitle>
                    {featured.summary && (
                      <CardDescription className="mt-2 text-muted-foreground line-clamp-2">
                        {featured.summary}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </a>
            )}

            <div>
              <h2 className="text-xl font-semibold m-4">Latest News</h2>
              <div className="grid sm:grid-cols-2 gap-4 auto-rows-fr">
                {latest.map((item, i) => (
                  <a
                    href={item.url}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full">
                      <img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        className="w-full h-36 object-cover"
                      />
                      <CardHeader className="p-3 flex flex-col flex-1 justify-between">
                        <CardTitle className="text-base line-clamp-2 min-h-[48px]">
                          {item.title}
                        </CardTitle>
                        {item.source && (
                          <CardDescription className="text-xs text-muted-foreground mt-2">
                            {item.source}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-2">Must Read</h2>
            <div className="space-y-4">
              {mustRead.map((item, i) => (
                <a
                  href={item.url}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">
                      {item.title}
                    </p>
                    {item.source && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.source}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
