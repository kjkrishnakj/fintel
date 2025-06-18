import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import StockNews from "./StockNews"

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        {/* News ticker positioned inline to the right of the separator */}
        <div className="flex-1 overflow-hidden">
          <StockNews />
        </div>
      </div>
    </header>
  )
}
