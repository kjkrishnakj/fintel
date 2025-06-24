"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconDashboard,
  IconNews,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const router = useRouter()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center px-3 py-2 text-muted-foreground font-semibold text-base">
              <IconInnerShadowTop className="!size-5 mr-2" />
              Fintel
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/")}
              className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer rounded-md transition-colors"
            >
              <IconDashboard className="mr-2" />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/news")}
              className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer rounded-md transition-colors"
            >
              <IconNews className="mr-2" />
              Live News
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
