"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = ["/login", "/signup", "/forgot-password", "/onboarding"].includes(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-200">
        <Header />
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

