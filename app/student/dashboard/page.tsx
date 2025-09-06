"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts"
import {
  User,
  MapPin,
  Calendar,
  Trophy,
  Users,
  BookOpen,
  Star,
  Edit3,
  Save,
  X,
  GraduationCap,
  Target,
  Award,
  Zap,
  TrendingUp,
  Activity,
  Crown,
  Sparkles,
  PieChart as PieChartIcon,
  Clock,
  MessageSquare,
  Bell,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  Settings,
  Gift,
  Globe,
  CheckCircle,
  ArrowUp,
  Briefcase,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Upload,
  FileText,
  MapPin as LocationIcon,
  Building2,
  Users2,
  UserCheck
} from "lucide-react"
import studentsData from "@/data/students.json"

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
  })

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)

      const student = studentsData.find(s => s.id === user.id) || studentsData[1]
      setStudentData(student)
      setEditData({
        bio: student.bio,
        skills: [...student.skills],
        interests: [...student.interests],
      })
    }
  }, [])

  const handleSave = () => {
    setStudentData({
      ...studentData,
      bio: editData.bio,
      skills: editData.skills,
      interests: editData.interests,
    })
    setIsEditing(false)
  }

  const addSkill = (skill: string) => {
    if (skill && !editData.skills.includes(skill)) {
      setEditData({ ...editData, skills: [...editData.skills, skill] })
    }
  }

  const removeSkill = (skill: string) => {
    setEditData({ ...editData, skills: editData.skills.filter(s => s !== skill) })
  }

  const addInterest = (interest: string) => {
    if (interest && !editData.interests.includes(interest)) {
      setEditData({ ...editData, interests: [...editData.interests, interest] })
    }
  }

  const removeInterest = (interest: string) => {
    setEditData({ ...editData, interests: editData.interests.filter(i => i !== interest) })
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#e78a53]"></div>
      </div>
    )
  }

  const activityData = [
    { month: 'Jan', events: 3, projects: 1, clubs: 1 },
    { month: 'Feb', events: 5, projects: 2, clubs: 1 },
    { month: 'Mar', events: 8, projects: 2, clubs: 2 },
    { month: 'Apr', events: 6, projects: 3, clubs: 2 },
    { month: 'May', events: 7, projects: 1, clubs: 2 },
    { month: 'Jun', events: 4, projects: 2, clubs: 2 },
  ]

  const upcomingEvents = [
    { id: 1, title: "Tech Conference 2024", date: "Dec 15, 2024", time: "9:00 AM", type: "Conference", attending: 145 },
    { id: 2, title: "Coding Bootcamp", date: "Dec 18, 2024", time: "2:00 PM", type: "Workshop", attending: 78 },
    { id: 3, title: "AI Study Group", date: "Dec 20, 2024", time: "4:00 PM", type: "Study Group", attending: 23 },
  ]

  const notifications = [
    { id: 1, message: "New project assignment in AI Club", time: "2 hours ago", type: "assignment" },
    { id: 2, message: "Event reminder: Tech Conference tomorrow", time: "4 hours ago", type: "event" },
    { id: 3, message: "You received a skill endorsement for React", time: "1 day ago", type: "skill" },
  ]

  const recentActivities = [
    { id: 1, action: "Completed project", detail: "Machine Learning Portfolio", time: "2 days ago", icon: CheckCircle },
    { id: 2, action: "Joined event", detail: "Web Development Workshop", time: "5 days ago", icon: Calendar },
    { id: 3, action: "Updated profile", detail: "Added new skills", time: "1 week ago", icon: User },
  ]

  return (
    <div className="space-y-8 w-full">
      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Score", value: studentData.participationScore, icon: Zap, color: "#e78a53", suffix: "pts", change: "+12%" },
          { title: "Events Attended", value: studentData.eventsAttended, icon: Calendar, color: "#f59e5b", suffix: "", change: "+8%" },
          { title: "Clubs Joined", value: studentData.clubsJoined, icon: Users, color: "#fdb462", suffix: "", change: "+2%" },
          { title: "Projects", value: studentData.projectsCompleted, icon: BookOpen, color: "#e78a53", suffix: "", change: "+15%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm hover:shadow-lg hover:shadow-[#e78a53]/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}{stat.suffix}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 ring-2 ring-[#e78a53]/20">
                      <AvatarImage src={studentData.avatar} />
                      <AvatarFallback className="bg-[#e78a53] text-white text-xl">
                        {studentData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">{studentData.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{studentData.department} • {studentData.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Target className="h-4 w-4" />
                        <span>GPA: {studentData.gpa}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <Button variant="outline" size="sm" className="h-8">
                          <Mail className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isEditing) {
                        setEditData({
                          bio: studentData.bio,
                          skills: [...studentData.skills],
                          interests: [...studentData.interests],
                        })
                      }
                      setIsEditing(!isEditing)
                    }}
                  >
                    {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground">About Me</Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="mt-2 bg-background/50 border-border/50"
                      rows={3}
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{studentData.bio}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isEditing ? editData.skills : studentData.skills).map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
                      >
                        {skill}
                        {isEditing && (
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          />
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Input
                        placeholder="Add skill..."
                        className="w-32 h-6 text-xs"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isEditing ? editData.interests : studentData.interests).map((interest: string) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="border-border/50 text-foreground"
                      >
                        {interest}
                        {isEditing && (
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => removeInterest(interest)}
                          />
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Input
                        placeholder="Add interest..."
                        className="w-32 h-6 text-xs"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addInterest(e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  <div>
                    <span className="text-foreground">Activity Overview</span>
                    <p className="text-sm text-muted-foreground font-normal">Your engagement over time</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData}>
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        border: '1px solid #e78a53',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="events" fill="#e78a53" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="projects" fill="#f59e5b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="clubs" fill="#fdb462" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                      <Activity className="h-5 w-5 text-[#e78a53]" />
                    </div>
                    <span className="text-foreground">Recent Activity</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-colors">
                      <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                        <activity.icon className="h-4 w-4 text-[#e78a53]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <Zap className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  <span className="text-foreground">Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Join New Club
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Find Events
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Projects
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  <span className="text-foreground">Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-background/30 rounded-lg border border-border/20 hover:bg-background/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground line-clamp-1">{event.title}</h4>
                      <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{event.attending} attending</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-6 text-xs">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                      <Bell className="h-5 w-5 text-[#e78a53]" />
                    </div>
                    <span className="text-foreground">Notifications</span>
                  </div>
                  <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                    {notifications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-background/30 rounded-lg border border-border/20">
                    <p className="text-sm text-foreground mb-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                    <Award className="h-5 w-5 text-[#e78a53]" />
                  </div>
                  <div>
                    <span className="text-foreground">Achievements</span>
                    <p className="text-sm text-muted-foreground font-normal">Your accomplishments</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.achievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/30 rounded-lg border border-border/20">
                      <div className="p-1.5 bg-[#e78a53]/10 rounded-full">
                        <Crown className="w-3 h-3 text-[#e78a53]" />
                      </div>
                      <span className="text-sm font-medium text-foreground flex-1">{achievement}</span>
                      <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] text-xs">
                        {index === 0 ? 'Recent' : 'Earned'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full"
      >
        <Card className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/80 border-[#e78a53]/30 backdrop-blur-xl overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23e78a53' stroke-width='0.5' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
            }}></div>
          </div>

          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative p-3 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-xl border border-[#e78a53]/30"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(231, 138, 83, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <PieChartIcon className="h-7 w-7 text-[#e78a53]" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#e78a53] rounded-full animate-pulse"></div>
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#e78a53] to-[#fdb462] bg-clip-text text-transparent">Analytics Dashboard</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">Real-time engagement metrics</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-[#e78a53]/20 to-[#fdb462]/20 text-white border-[#e78a53]/30 px-4 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Enhanced Pie Chart */}
              <div className="relative flex items-center justify-center min-h-[400px]">
                {/* Decorative Rings */}
                <motion.div
                  className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#e78a53]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <defs>
                      <linearGradient id="eventGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e78a53" stopOpacity={1} />
                        <stop offset="100%" stopColor="#d67a43" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="clubGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f59e5b" stopOpacity={1} />
                        <stop offset="100%" stopColor="#e38e4b" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="projectGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fdb462" stopOpacity={1} />
                        <stop offset="100%" stopColor="#eda452" stopOpacity={0.8} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <Pie
                      data={[
                        { name: 'Events', value: studentData.eventsAttended * 5, actualCount: studentData.eventsAttended },
                        { name: 'Clubs', value: studentData.clubsJoined * 10, actualCount: studentData.clubsJoined },
                        { name: 'Projects', value: studentData.projectsCompleted * 15, actualCount: studentData.projectsCompleted },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={2000}
                      filter="url(#glow)"
                    >
                      <Cell fill="url(#eventGradient)" stroke="#e78a53" strokeWidth={2} />
                      <Cell fill="url(#clubGradient)" stroke="#f59e5b" strokeWidth={2} />
                      <Cell fill="url(#projectGradient)" stroke="#fdb462" strokeWidth={2} />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid #e78a53',
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 10px 40px rgba(231, 138, 83, 0.3)'
                      }}
                      formatter={(value: any, name: any, props: any) => [
                        <div key="value" className="flex flex-col gap-1">
                          <span className="text-[#e78a53] font-bold">{value} points</span>
                          <span className="text-gray-400 text-xs">{props.payload.actualCount} {name.toLowerCase()}</span>
                        </div>,
                        <span key="name" className="text-white font-semibold">{name}</span>
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>


                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#e78a53] rounded-full"
                    style={{
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 140}%`,
                      top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 140}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Futuristic Stats Cards */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      label: 'Events',
                      count: studentData.eventsAttended,
                      points: studentData.eventsAttended * 5,
                      color: '#e78a53',
                      bgGradient: 'from-[#e78a53]/20 to-[#d67a43]/10',
                      icon: Calendar,
                      description: '5 points per event',
                      percentage: (studentData.eventsAttended * 5 / studentData.participationScore * 100).toFixed(1)
                    },
                    {
                      label: 'Clubs',
                      count: studentData.clubsJoined,
                      points: studentData.clubsJoined * 10,
                      color: '#f59e5b',
                      bgGradient: 'from-[#f59e5b]/20 to-[#e38e4b]/10',
                      icon: Users,
                      description: '10 points per club',
                      percentage: (studentData.clubsJoined * 10 / studentData.participationScore * 100).toFixed(1)
                    },
                    {
                      label: 'Projects',
                      count: studentData.projectsCompleted,
                      points: studentData.projectsCompleted * 15,
                      color: '#fdb462',
                      bgGradient: 'from-[#fdb462]/20 to-[#eda452]/10',
                      icon: BookOpen,
                      description: '15 points per project',
                      percentage: (studentData.projectsCompleted * 15 / studentData.participationScore * 100).toFixed(1)
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                      <div className="relative flex items-center justify-between p-5 rounded-2xl bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-[#e78a53]/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="relative p-3 rounded-xl bg-gradient-to-br"
                            style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)` }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <item.icon
                              className="h-6 w-6"
                              style={{ color: item.color }}
                            />
                            <div
                              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            >
                              <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: item.color }}></div>
                            </div>
                          </motion.div>
                          <div>
                            <div className="font-semibold text-white text-lg">{item.label}</div>
                            <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: item.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.percentage}%` }}
                                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                                />
                              </div>
                              <span className="text-xs text-gray-400">{item.percentage}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <motion.div
                            className="text-2xl font-bold"
                            style={{ color: item.color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                          >
                            {item.points}
                          </motion.div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.count} {item.label.toLowerCase()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Futuristic Progress Tracker */}
                <motion.div
                  className="relative mt-6 p-6 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#e78a53]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#e78a53]/10 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-semibold text-white">Achievement Progress</span>
                        <p className="text-xs text-gray-400 mt-1">Next milestone at 150 points</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-gradient-to-r from-[#e78a53]/20 to-[#fdb462]/20 text-white border-[#e78a53]/30 px-3 py-1">
                          <Trophy className="h-3 w-3 mr-1 text-white" />
                          {150 - studentData.participationScore} pts to go
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="relative h-full rounded-full overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: `${(studentData.participationScore / 150) * 100}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#e78a53] via-[#f59e5b] to-[#fdb462]"></div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-400">0</span>
                        <span className="text-xs text-[#e78a53] font-semibold">{studentData.participationScore}</span>
                        <span className="text-xs text-gray-400">150</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
