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
  ShieldCheck,
  MessageCircle,
  Bot,
  UserPlus
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
  {
    title: "Messages",
    url: "/admin/chat",
    icon: MessageCircle,
    description: "Student communications",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "AI Summarizer",
    url: "/admin/ai-summarizer",
    icon: Bot,
    description: "Project AI support",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "AI Recruiter",
    url: "/admin/ai-recruiter",
    icon: UserPlus,
    description: "Student recruitment",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
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
          <Sidebar className="border-r border-border/10 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl shadow-xl">
            <SidebarHeader className="border-b border-border/10 p-8 bg-gradient-to-r from-[#e78a53]/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-2xl shadow-lg shadow-[#e78a53]/20">
                  <span className="text-white font-bold text-2xl">R</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">Reinkei Admin</h2>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-6 py-8">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-bold text-muted-foreground/70 mb-6 px-3 uppercase tracking-wider">
                  Administration
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-3">
                    {adminSidebarItems.map((item, index) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`h-16 px-5 hover:bg-[#e78a53]/8 hover:shadow-lg hover:shadow-[#e78a53]/10 text-foreground rounded-2xl transition-all duration-300 border border-transparent group ${pathname === item.url
                            ? 'bg-gradient-to-r from-[#e78a53]/15 to-[#e78a53]/5 border-[#e78a53]/20 shadow-lg shadow-[#e78a53]/10'
                            : 'hover:border-border/20'
                            }`}
                        >
                          <a href={item.url} className="flex items-center gap-5 w-full">
                            <div className={`relative p-3 rounded-xl transition-all duration-300 ${pathname === item.url
                              ? 'bg-[#e78a53]/20 shadow-sm'
                              : `${item.bgColor} group-hover:shadow-sm`
                              }`}>
                              <item.icon className={`h-6 w-6 transition-all duration-300 ${pathname === item.url
                                ? 'text-[#e78a53]'
                                : `${item.color} group-hover:scale-110`
                                }`} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className={`font-semibold transition-colors duration-300 ${pathname === item.url ? 'text-[#e78a53]' : 'text-foreground'
                                }`}>
                                {item.title}
                              </div>
                              <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                {item.description}
                              </div>
                            </div>
                            <ChevronRight className={`h-5 w-5 transition-all duration-300 ${pathname === item.url
                              ? 'text-[#e78a53] transform rotate-90'
                              : 'text-muted-foreground group-hover:text-[#e78a53] group-hover:translate-x-1'
                              }`} />
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/10 p-6 bg-gradient-to-r from-background/50 to-transparent">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-card/60 to-card/30 border border-border/20 backdrop-blur-sm">
                <Avatar className="h-12 w-12 border-2 border-[#e78a53]/30">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-[#e78a53] to-[#e78a53]/80 text-white text-base font-bold">
                    {currentUser?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {currentUser?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-[#e78a53]" />
                    Administrator
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-[#e78a53]/10 hover:text-[#e78a53] transition-all duration-200">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <DropdownMenuItem className="rounded-lg py-3 px-3">
                      <User className="mr-3 h-4 w-4" />
                      <span className="font-medium">Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg py-3 px-3">
                      <Settings className="mr-3 h-4 w-4" />
                      <span className="font-medium">Admin Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem onClick={handleLogout} className="rounded-lg py-3 px-3 text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-4 bg-background/95 backdrop-blur-md border-b border-border/30 px-8 shadow-sm">
              <SidebarTrigger className="-ml-2 h-10 w-10 rounded-xl hover:bg-[#e78a53]/10 hover:text-[#e78a53] transition-all duration-200" />
              <div className="h-8 w-px bg-border/50 mx-2"></div>
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-xl hover:bg-[#e78a53]/10 hover:text-[#e78a53] transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 bg-gradient-to-r from-[#e78a53] to-[#e78a53]/80 text-white text-xs font-bold shadow-lg">
                    3
                  </Badge>
                </Button>
              </div>
            </header>

            <main className="flex-1 w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 w-full h-full"
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
