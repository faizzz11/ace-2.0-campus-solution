"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  Trophy,
  Sparkles,
  Search,
  Users,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Zap,
  Crown,
  Target,
  Rocket,
  Building2,
  BookOpen,
  GraduationCap,
  Calendar,
  UserCheck,
  ShieldCheck
} from "lucide-react"

const adminSidebarItems = [
  {
    title: "Clubs",
    url: "/admin/clubs",
    icon: Users,
    description: "Manage clubs",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Projects", 
    url: "/admin/projects",
    icon: Rocket,
    description: "Manage projects",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Faculty",
    url: "/admin/faculty",
    icon: GraduationCap,
    description: "Faculty & events",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userData')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r border-border/20 bg-card/50 backdrop-blur-xl">
            <SidebarHeader className="border-b border-border/20 p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#e78a53] to-[#e78a53]/80 rounded-xl shadow-lg">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Reinkei Admin</h2>
                  <p className="text-sm text-muted-foreground">Admin Portal</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="px-4 py-6">
              <SidebarGroup>
                <SidebarGroupLabel className="text-sm font-semibold text-foreground mb-4 px-2">
                  Administration
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {adminSidebarItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`h-12 px-4 hover:bg-accent/50 text-foreground rounded-xl transition-all duration-200 ${
                            pathname === item.url ? 'bg-[#e78a53]/10 border border-[#e78a53]/30' : ''
                          }`}
                        >
                          <a href={item.url} className="flex items-center gap-4 w-full">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                              <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-foreground">
                                {item.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border/20 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback className="bg-[#e78a53] text-white text-sm">
                    {currentUser?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {currentUser?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">Administrator</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#e78a53] text-white text-xs">
                    3
                  </Badge>
                </Button>
              </div>
            </header>
            
            <main className="flex-1 w-full min-h-screen">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 w-full h-full"
              >
                <div className="w-full max-w-none">
                  {children}
                </div>
              </motion.div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
