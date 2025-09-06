"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Target,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase,
  Award,
  ExternalLink,
  Rocket
} from "lucide-react"
import projectsData from "@/data/projects.json"
import studentsData from "@/data/students.json"

export default function TeamsPage() {
  const [openProjects, setOpenProjects] = useState<any[]>([])
  const [appliedProjects, setAppliedProjects] = useState<Set<number>>(new Set())

  useEffect(() => {
    const recruitingProjects = projectsData.filter(project => project.status === "Recruiting")
    setOpenProjects(recruitingProjects)
  }, [])

  const handleApply = (projectId: number) => {
    const newApplied = new Set(appliedProjects)
    newApplied.add(projectId)
    setAppliedProjects(newApplied)
  }

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "Faculty Project":
        return <GraduationCap className="h-4 w-4" />
      case "Student Project":
        return <Users className="h-4 w-4" />
      case "Research Project":
        return <Target className="h-4 w-4" />
      default:
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getProjectTypeBadge = (type: string) => {
    switch (type) {
      case "Faculty Project":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      case "Student Project":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      case "Research Project":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      default:
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineStatus = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline)
    if (days < 0) return { status: "expired", color: "text-red-500", bg: "bg-red-500/10" }
    if (days <= 3) return { status: "urgent", color: "text-[#e78a53]", bg: "bg-[#e78a53]/10" }
    if (days <= 7) return { status: "soon", color: "text-[#e78a53]/80", bg: "bg-[#e78a53]/8" }
    return { status: "open", color: "text-[#e78a53]/60", bg: "bg-[#e78a53]/6" }
  }

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#e78a53]/10 rounded-xl">
              <Rocket className="h-8 w-8 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Join a Team</h1>
              <p className="text-muted-foreground">Find and apply to open project teams looking for new members</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-3 py-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              {openProjects.length} Open Projects
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-[#e78a53]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-bold text-foreground">{openProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-[#e78a53]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-xl font-bold text-foreground">
                  {openProjects.filter(p => getDaysUntilDeadline(p.applicationDeadline) <= 3).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                <Star className="h-5 w-5 text-[#e78a53]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applied</p>
                <p className="text-xl font-bold text-foreground">{appliedProjects.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                <Award className="h-5 w-5 text-[#e78a53]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Match Rate</p>
                <p className="text-xl font-bold text-foreground">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {openProjects.map((project, index) => {
          const deadlineStatus = getDeadlineStatus(project.applicationDeadline)
          const isApplied = appliedProjects.has(project.id)
          const daysLeft = getDaysUntilDeadline(project.applicationDeadline)
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
                <div
                  className="h-32 bg-cover bg-center rounded-t-lg relative"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg" />
                  <div className="absolute top-3 left-3">
                    <Badge className={getProjectTypeBadge(project.type)}>
                      {getProjectTypeIcon(project.type)}
                      <span className="ml-1">{project.type}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`${deadlineStatus.bg} ${deadlineStatus.color} border-current/20`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-[#e78a53]/20 text-[#e78a53] border-[#e78a53]/30">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{project.faculty || project.leader} • {project.department}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {project.currentMembers}/{project.teamSize} members
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{project.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">Start: {new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.requiredSkills.slice(0, 4).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {project.requiredSkills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.requiredSkills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Benefits:</p>
                    <div className="space-y-1">
                      {project.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#e78a53] rounded-full"></div>
                          <span className="text-xs text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className={`flex-1 ${
                        isApplied 
                          ? 'bg-[#e78a53]/80 hover:bg-[#e78a53]/70' 
                          : 'bg-[#e78a53] hover:bg-[#e78a53]/90'
                      } text-white`}
                      onClick={() => handleApply(project.id)}
                      disabled={isApplied || daysLeft < 0}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : daysLeft < 0 ? (
                        'Deadline Passed'
                      ) : (
                        'Request to Join'
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {appliedProjects.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#e78a53]" />
                Your Applications ({appliedProjects.size})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You have applied to {appliedProjects.size} project{appliedProjects.size !== 1 ? 's' : ''}. 
                You'll receive updates on your application status via email and notifications.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
