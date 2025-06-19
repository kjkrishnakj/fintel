import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import StockNews from "./StockNews"
import StockTicker from "./StockTicker" // make sure the path is correct

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center justify-between px-4 lg:px-6 gap-4">
        
        {/* Left: Sidebar and separator */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
        </div>

        {/* Center: News ticker */}
        <div className="flex-1 overflow-hidden px-2">
          <StockNews />
        </div>

        {/* Right: Stock Ticker Component */}
        <div className="min-w-[200px] max-w-xs">
          <StockTicker />
        </div>

      </div>
    </header>
  )
}
