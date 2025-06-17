import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Krishna Jaiswal",
    email: "krishna@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Market Overview",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Predictions",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Portfolio",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Watchlist",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Reports",
      icon: IconReport,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Daily Report",
          url: "#",
        },
        {
          title: "Archived Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Insights",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Stock Insights",
          url: "#",
        },
        {
          title: "Archived Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Models",
          url: "#",
        },
        {
          title: "Archived Models",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Support",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search Stocks",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Feeds",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Financial Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Stock Notes",
      url: "#",
      icon: IconFileWord,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Fintel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
