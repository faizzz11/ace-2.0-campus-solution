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
  MessageCircle,
  Bot,
  Video,
  FileText,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LayoutDashboard,
    description: "Your profile",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Leaderboard",
    url: "/student/leaderboard",
    icon: Crown,
    description: "Top performers",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Recommendations",
    url: "/student/recommendations",
    icon: Sparkles,
    description: "Personalized for you",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Search",
    url: "/student/search",
    icon: Target,
    description: "opportunities",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Join Teams",
    url: "/student/teams",
    icon: Rocket,
    description: "Open projects",
    color: "text-[#e78a53]",
    bgColor: "bg-[#e78a53]/10",
  },
  {
    title: "Messages",
    url: "/student/chat",
    icon: MessageCircle,
    description: "Chat with faculty",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "AI Assistant",
    url: "/student/ai-assistant",
    icon: Bot,
    description: "Smart recommendations",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "AI Interviewer",
    url: "/student/ai-interviewer",
    icon: Video,
    description: "Practice interviews",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    title: "Resume AI",
    url: "/student/ai-resume",
    icon: FileText,
    description: "Analyze & improve",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: Settings,
    description: "Edit your info",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
]

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")

    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('currentUser')

    if (!isLoggedIn || !userData) {
      router.push('/login')
      return
    }

    setCurrentUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#e78a53] border-t-transparent"></div>
          <span className="text-[#e78a53] font-medium">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.08), transparent 60%), #000000",
        }}
      />

      <SidebarProvider>
        <div className="flex min-h-screen relative z-10">
          <Sidebar className="border-r border-border/20 bg-black/50 backdrop-blur-xl">
            <SidebarHeader className="border-b border-border/20 p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#e78a53] to-[#e78a53]/80 rounded-xl shadow-lg">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Renkei</h2>
                  <p className="text-sm text-muted-foreground">Student Portal</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-4 py-6">
              <SidebarGroup>
                <SidebarGroupLabel className="text-sm font-semibold text-foreground mb-4 px-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {sidebarItems.map((item) => {
                      const isActive = pathname === item.url
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={`h-12 px-4 ${isActive
                              ? 'bg-[#e78a53]/10 border border-[#e78a53]/20 text-[#e78a53]'
                              : 'hover:bg-accent/50 text-foreground'
                              } rounded-xl transition-all duration-200`}
                          >
                            <a href={item.url} className="flex items-center gap-4 w-full">
                              <div className={`p-2 rounded-lg ${isActive ? 'bg-[#e78a53]/20' : item.bgColor}`}>
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-[#e78a53]' : item.color}`} />
                              </div>
                              <div className="flex-1 text-left">
                                <div className={`font-medium ${isActive ? 'text-[#e78a53]' : 'text-foreground'}`}>
                                  {item.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {item.description}
                                </div>
                              </div>
                              {isActive && (
                                <ChevronRight className="h-4 w-4 text-[#e78a53]" />
                              )}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/20 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-4 hover:bg-accent/50 rounded-xl">
                    <Avatar className="h-10 w-10 ring-2 ring-[#e78a53]/20">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-[#e78a53] text-white font-semibold">
                        {currentUser?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate max-w-[150px]" title={currentUser?.name}>
                        {currentUser?.name?.length > 11 ? `${currentUser?.name.substring(0, 11)}...` : currentUser?.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]" title={currentUser?.email}>
                        {currentUser?.email?.length > 18 ? `${currentUser?.email.substring(0, 18)}...` : currentUser?.email}
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 mb-5">
                      Pro
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-black/90 backdrop-blur-xl border-border/20">
                  <DropdownMenuItem className="hover:bg-accent/50">
                    <User className="mr-3 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent/50">
                    <Settings className="mr-3 h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/20" />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-500/10 text-red-400">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-black/80 backdrop-blur-xl">
              <div className="flex h-16 items-center px-6">
                <SidebarTrigger className="-ml-1 h-8 w-8 hover:bg-accent/50" />
                <div className="mx-4 h-6 w-px bg-border/60" />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="text-lg font-semibold text-foreground">
                      Welcome back, {currentUser?.name?.split(' ')[0]}
                    </h1>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <Zap className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="relative hover:bg-accent/50 h-9 w-9">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#e78a53] rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">3</span>
                      </span>
                    </Button>
                  </div>
                </div>
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
