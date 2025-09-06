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
    </div>
  )
}
