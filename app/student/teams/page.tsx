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
  Rocket,
  Sparkles,
  TrendingUp,
  Zap,
  Heart,
  MapPin,
  BookOpen,
  Mail,
  Plus,
  Search
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
    return "bg-[#e78a53] text-white border-[#e78a53]"
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
    if (days < 0) return { status: "expired", color: "text-white", bg: "bg-red-500" }
    if (days <= 3) return { status: "urgent", color: "text-white", bg: "bg-[#e78a53]" }
    if (days <= 7) return { status: "soon", color: "text-white", bg: "bg-[#e78a53]" }
    return { status: "open", color: "text-white", bg: "bg-[#e78a53]" }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-2xl border border-[#e78a53]/20">
              <Rocket className="h-10 w-10 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Join a Team</h1>
              <p className="text-muted-foreground text-lg">Discover exciting projects and collaborate with talented teammates</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Live Opportunities
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 text-sm">
              <Target className="h-4 w-4 mr-2" />
              {openProjects.length} Available
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/15 rounded-xl group-hover:scale-110 transition-transform">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Available Projects</p>
                <p className="text-2xl font-bold text-foreground">{openProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#e78a53]/15 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="h-6 w-6 text-[#e78a53]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Urgent Deadlines</p>
                <p className="text-2xl font-bold text-foreground">
                  {openProjects.filter(p => getDaysUntilDeadline(p.applicationDeadline) <= 3).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/15 rounded-xl group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Applications Sent</p>
                <p className="text-2xl font-bold text-foreground">{appliedProjects.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/15 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
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
              className="group"
            >
              <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full group-hover:shadow-xl group-hover:shadow-[#e78a53]/20 group-hover:border-[#e78a53]/40 group-hover:scale-[1.02] overflow-hidden">
                <div
                  className="h-40 bg-cover bg-center rounded-t-xl relative overflow-hidden"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getProjectTypeBadge(project.type)} font-semibold px-3 py-1.5 shadow-lg`}>
                      {getProjectTypeIcon(project.type)}
                      <span className="ml-2">{project.type}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${deadlineStatus.bg} ${deadlineStatus.color} border-current/30 font-semibold px-3 py-1.5 shadow-lg backdrop-blur-sm`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-black/60 text-white border-white/30 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-[#e78a53] text-white shadow-lg">
                      <Users className="h-3 w-3 mr-1" />
                      {project.teamSize - project.currentMembers} spots
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-[#e78a53] transition-colors duration-300 leading-tight">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <GraduationCap className="h-4 w-4 text-[#e78a53]" />
                    <span className="font-medium">{project.faculty || project.leader}</span>
                    <span>•</span>
                    <span>{project.department}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 flex-1 flex flex-col pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-[#e78a53]" />
                        <span className="font-medium">
                          {project.currentMembers}/{project.teamSize} members
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{project.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.slice(0, 4).map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-[#e78a53]/10 text-[#e78a53]">
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
                    <p className="text-sm font-medium text-muted-foreground mb-2">Benefits:</p>
                    <div className="space-y-1">
                      {project.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#e78a53] rounded-full"></div>
                          <span className="text-xs text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      className={`flex-1 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${isApplied
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-[#e78a53] hover:bg-[#e78a53]/90 text-white'
                        }`}
                      onClick={() => handleApply(project.id)}
                      disabled={isApplied || daysLeft < 0}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Applied Successfully
                        </>
                      ) : daysLeft < 0 ? (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Deadline Passed
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Request to Join
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-[#e78a53]/10 hover:border-[#e78a53]/40 transition-all duration-300">
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
