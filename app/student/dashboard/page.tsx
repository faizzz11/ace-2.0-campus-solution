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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
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

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 lg:col-span-1 space-y-6"
        >
          <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-[#e78a53]" />
                </div>
                <div>
                  <span className="text-foreground">Participation Stats</span>
                  <p className="text-sm text-muted-foreground font-normal">Your campus engagement</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#e78a53]/5 rounded-lg border border-[#e78a53]/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                      <Zap className="h-4 w-4 text-[#e78a53]" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Total Score</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#e78a53]">{studentData.participationScore}</span>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-[#e78a53]" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Events</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {studentData.eventsAttended}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                        <Users className="h-4 w-4 text-[#e78a53]" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Clubs</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {studentData.clubsJoined}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                        <BookOpen className="h-4 w-4 text-[#e78a53]" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Projects</span>
                    </div>
                    <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {studentData.projectsCompleted}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

      {/* Modern Futuristic Pie Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <Card className="relative bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 border-[#e78a53]/20 backdrop-blur-xl overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23e78a53' stroke-width='0.5' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e78a53]/10 to-transparent opacity-50"></div>
          
          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative p-3 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-xl border border-[#e78a53]/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(231, 138, 83, 0.3)",
                      "0 0 40px rgba(231, 138, 83, 0.5)",
                      "0 0 20px rgba(231, 138, 83, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <PieChartIcon className="h-7 w-7 text-[#e78a53]" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#e78a53] rounded-full animate-pulse"></div>
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#e78a53] to-[#fdb462] bg-clip-text text-transparent">Analytics Dashboard</span>
                  <p className="text-sm text-gray-400 font-normal mt-1">Real-time engagement metrics</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-[#e78a53]/20 to-[#fdb462]/20 text-[#e78a53] border-[#e78a53]/30 px-4 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#e78a53] rounded-full animate-pulse text-black"></div>
                  <span className="text-black">Live</span>
                </div>
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Enhanced Pie Chart with Cyberpunk Style */}
              <div className="relative flex items-center justify-center">
                {/* Outer Rotating Ring */}
                <motion.div 
                  className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-[#e78a53]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Middle Rotating Ring */}
                <motion.div 
                  className="absolute w-[280px] h-[280px] rounded-full border border-[#e78a53]/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner Glow Effect */}
                <div className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-r from-[#e78a53]/5 to-[#fdb462]/5 blur-xl"></div>
                
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <defs>
                      <linearGradient id="eventGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e78a53" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#d67a43" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="clubGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f59e5b" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#e38e4b" stopOpacity={0.8}/>
                      </linearGradient>
                      <linearGradient id="projectGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fdb462" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#eda452" stopOpacity={0.8}/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
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
                      <Cell fill="url(#eventGradient)" stroke="#e78a53" strokeWidth={2}/>
                      <Cell fill="url(#clubGradient)" stroke="#f59e5b" strokeWidth={2}/>
                      <Cell fill="url(#projectGradient)" stroke="#fdb462" strokeWidth={2}/>
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
                
                {/* Futuristic Center Display */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e78a53] to-[#fdb462] blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-black/80 backdrop-blur-sm border border-[#e78a53]/50 rounded-2xl p-4 text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-[#e78a53] to-[#fdb462] bg-clip-text text-transparent">
                        {studentData.participationScore}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                        Total Score
                      </div>
                    </div>
                  </div>
                </motion.div>
                
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
                        <Badge className="bg-gradient-to-r from-[#e78a53]/20 to-[#fdb462]/20 text-[#e78a53] border-[#e78a53]/30 px-3 py-1">
                          <Trophy className="h-3 w-3 mr-1" />
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
