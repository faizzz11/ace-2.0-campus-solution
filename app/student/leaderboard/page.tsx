"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Crown, Star, TrendingUp, Calendar, Users, BookOpen, Zap, Award, Target, Sparkles } from "lucide-react"
import studentsData from "@/data/students.json"

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }

    const sortedStudents = [...studentsData].sort((a, b) => b.participationScore - a.participationScore)
    setLeaderboardData(sortedStudents)
  }, [])

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
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const topThree = leaderboardData.slice(0, 3)
  const remaining = leaderboardData.slice(3)

  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
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
              {leaderboardData.length} Students
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 xl:col-span-1 space-y-6"
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
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    rank === 1 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 shadow-lg shadow-yellow-500/10' 
                      : rank === 2
                      ? 'bg-gradient-to-br from-gray-400/10 to-gray-500/5 border-gray-400/30'
                      : 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30'
                  } ${isCurrentUser ? 'ring-2 ring-[#e78a53]' : ''}`}
                >
                  {rank === 1 && (
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl -z-10" />
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-[#e78a53] text-white text-xl">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-lg truncate">{student.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{student.department}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getRankBadgeColor(rank)}`}>
                          Rank #{rank}
                        </Badge>
                        {isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#e78a53]">
                        {student.participationScore}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
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
          className="lg:col-span-2 xl:col-span-3"
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
                {remaining.map((student, index) => {
                  const rank = index + 4
                  const isCurrentUser = currentUser?.id === student.id
                  
                  return (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 mx-4 rounded-xl border transition-all duration-200 hover:bg-background/50 ${
                        isCurrentUser 
                          ? 'bg-[#e78a53]/10 border-[#e78a53]/30 shadow-md' 
                          : 'bg-background/30 border-border/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-muted/50 rounded-lg">
                          <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-[#e78a53] text-white">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">{student.name}</h4>
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
                        {isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#e78a53]">{student.participationScore}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
