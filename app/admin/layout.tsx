"use client"

import { usePathname } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't wrap login and signup pages with AdminLayout
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup'

  if (isAuthPage) {
    return <>{children}</>
  }

  return <AdminLayout>{children}</AdminLayout>
}
