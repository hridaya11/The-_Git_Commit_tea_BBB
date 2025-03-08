"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Kanban Board",
    icon: ClipboardList,
    href: "/kanban",
  },
  {
    title: "Staff Management",
    icon: Users,
    href: "/staff",
  },
  {
    title: "Client Management",
    icon: Users,
    href: "/clients",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    title: "Analytics",
    icon: BarChart2,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && <span className="text-xl font-bold">SaaSFlow</span>}
          {collapsed && <span className="text-xl font-bold">SF</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === item.href && "bg-accent text-accent-foreground",
                collapsed && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            A
          </div>
          {!collapsed && (
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

