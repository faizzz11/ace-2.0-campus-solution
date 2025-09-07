"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Crown, Star, TrendingUp, Calendar, Users, BookOpen, Zap, Award, Target, Sparkles, Search, Filter, ChevronDown, Eye, MessageCircle, UserPlus } from "lucide-react"
import studentsData from "@/data/students.json"

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }

    const sortedStudents = [...studentsData].sort((a, b) => b.participationScore - a.participationScore)
    setLeaderboardData(sortedStudents)
    setFilteredData(sortedStudents)
  }, [])

  useEffect(() => {
    let filtered = leaderboardData.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
      const matchesYear = yearFilter === "all" || student.year === yearFilter

      return matchesSearch && matchesDepartment && matchesYear
    })

    setFilteredData(filtered)
  }, [searchTerm, departmentFilter, yearFilter, leaderboardData])

  const departments = [...new Set(studentsData.map(student => student.department))]
  const years = [...new Set(studentsData.map(student => student.year))]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white"
      case 2:
        return "bg-gray-400 text-white"
      case 3:
        return "bg-orange-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const topThree = filteredData.slice(0, 3)
  const remaining = filteredData.slice(3)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-2xl border border-[#e78a53]/20">
                <Crown className="h-10 w-10 text-[#e78a53]" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
                <p className="text-muted-foreground text-lg">Top performing students by participation score</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                Live Rankings
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-2 text-sm">
                <Target className="h-4 w-4 mr-2" />
                {filteredData.length} Results
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students or departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-48 bg-background/50 border-border/50">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-36 bg-background/50 border-border/50">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full max-w-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="space-y-4">
            {topThree.map((student, index) => {
              const rank = index + 1
              const isCurrentUser = currentUser?.id === student.id

              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${rank === 1
                    ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 shadow-lg shadow-yellow-500/10'
                    : rank === 2
                      ? 'bg-gradient-to-br from-gray-400/10 to-gray-500/5 border-gray-400/30'
                      : 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30'
                    } ${isCurrentUser ? 'ring-2 ring-[#e78a53]' : ''}`}
                >
                  {rank === 1 && (
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl -z-10 opacity-20" />
                  )}


                  <div className="relative z-10">
                    <div className="flex flex-col gap-3">
                      {/* Header with rank and avatar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {getRankIcon(rank)}
                          </div>
                          <Avatar className={`${rank === 1 ? 'h-12 w-12' : 'h-11 w-11'} ring-2 ring-[#e78a53]/20`}>
                            <AvatarImage src={student.avatar} className="object-cover" />
                            <AvatarFallback className="bg-[#e78a53] text-white text-sm">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-foreground text-base truncate">{student.name}</h3>
                            <p className="text-xs text-muted-foreground truncate">{student.department}</p>
                            <p className="text-xs text-muted-foreground">{student.year}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`${rank === 1 ? 'text-2xl' : 'text-xl'} font-bold text-[#e78a53]`}>
                            {student.participationScore}
                          </div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>

                      {/* Badges row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge className={`text-xs ${getRankBadgeColor(rank)}`}>
                            #{rank}
                          </Badge>
                          {rank <= 3 && (
                            <Badge variant="secondary" className={`text-xs ${rank === 1 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                              rank === 2 ? 'bg-gray-400/10 text-gray-400 border-gray-400/20' :
                                'bg-orange-500/10 text-orange-500 border-orange-500/20'
                              }`}>
                              {rank === 1 ? '🥇 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                            </Badge>
                          )}
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-xs bg-[#e78a53]/10 text-[#e78a53]">You</Badge>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                          {!isCurrentUser && (
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                              <UserPlus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/20 pt-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{student.eventsAttended}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{student.clubsJoined}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{student.projectsCompleted}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          GPA: {student.gpa}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#e78a53]" />
                </div>
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="p-4 bg-muted/50 rounded-full mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Try adjusting your search criteria or filters to find more students.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("")
                        setDepartmentFilter("all")
                        setYearFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : remaining.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Only top 3 students match your criteria</p>
                  </div>
                ) : (
                  remaining.map((student, index) => {
                    const rank = index + 4
                    const isCurrentUser = currentUser?.id === student.id

                    return (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`group flex items-center justify-between p-4 mx-4 rounded-xl border transition-all duration-300 hover:bg-background/50 hover:shadow-md hover:scale-[1.02] cursor-pointer ${isCurrentUser
                          ? 'bg-[#e78a53]/10 border-[#e78a53]/30 shadow-md ring-1 ring-[#e78a53]/20'
                          : 'bg-background/30 border-border/30 hover:border-[#e78a53]/20'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${rank <= 10 ? 'bg-[#e78a53]/10 border border-[#e78a53]/20' : 'bg-muted/50'
                            }`}>
                            <span className={`text-sm font-bold ${rank <= 10 ? 'text-[#e78a53]' : 'text-muted-foreground'
                              }`}>#{rank}</span>
                          </div>
                          <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-[#e78a53]/20 transition-all">
                            <AvatarImage src={student.avatar} className="object-cover" />
                            <AvatarFallback className="bg-[#e78a53] text-white">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground truncate">{student.name}</h4>
                              {rank <= 10 && (
                                <Badge variant="secondary" className="text-xs bg-[#e78a53]/10 text-[#e78a53]">
                                  Top 10
                                </Badge>
                              )}
                              {isCurrentUser && (
                                <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-500">You</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{student.department} • {student.year}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{student.eventsAttended} events</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{student.clubsJoined} clubs</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                <span>{student.projectsCompleted} projects</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {/* Action buttons - shown on hover */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                            {!isCurrentUser && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <UserPlus className="h-3 w-3" />
                              </Button>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-[#e78a53]">{student.participationScore}</div>
                            <div className="text-xs text-muted-foreground">points</div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  }))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
