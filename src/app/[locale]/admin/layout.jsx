"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sliderbar"
import { SiteHeader } from "./components/site-header"

export default function AdminLayout({ children }) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />
        <div className="flex flex-col flex-1">
          <SiteHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
