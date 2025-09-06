"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Rocket,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Users,
  Star,
  Award,
  Target,
  UserPlus,
  Clock,
  BookOpen,
  Settings,
  AlertCircle,
  CheckCircle,
  Code,
  GitBranch,
  Zap,
  TrendingUp
} from "lucide-react"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Smart Campus IoT System",
      description: "Develop an IoT-based system to monitor and optimize campus resources including energy consumption, air quality, and space utilization.",
      category: "Technology",
      supervisor: "Dr. Sarah Wilson",
      department: "Computer Science",
      currentMembers: 4,
      maxMembers: 8,
      duration: "6 months",
      difficulty: "Advanced",
      status: "active",
      progress: 65,
      skills: ["IoT", "Python", "Arduino", "Data Analysis", "Cloud Computing"],
      requirements: ["Strong programming skills", "Experience with hardware", "Team collaboration"],
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      budget: "$5000",
      deliverables: ["Working prototype", "Technical documentation", "Research paper"],
      technologies: ["Python", "Raspberry Pi", "AWS", "MongoDB"],
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "AI-Powered Study Assistant",
      description: "Create an intelligent study assistant that helps students organize their learning materials and provides personalized study recommendations.",
      category: "AI/ML",
      supervisor: "Prof. Michael Chen",
      department: "Computer Science",
      currentMembers: 3,
      maxMembers: 6,
      duration: "4 months",
      difficulty: "Intermediate",
      status: "recruiting",
      progress: 25,
      skills: ["Machine Learning", "NLP", "React", "Node.js", "Python"],
      requirements: ["Basic ML knowledge", "Web development experience", "Research interest"],
      startDate: "2024-02-01",
      endDate: "2024-06-01",
      budget: "$3000",
      deliverables: ["Web application", "ML model", "User testing report"],
      technologies: ["Python", "TensorFlow", "React", "Node.js"],
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Sustainable Energy Monitoring",
      description: "Design and implement a comprehensive energy monitoring system for the campus with focus on renewable energy integration.",
      category: "Environment",
      supervisor: "Dr. Emily Green",
      department: "Environmental Engineering",
      currentMembers: 5,
      maxMembers: 10,
      duration: "8 months",
      difficulty: "Advanced",
      status: "active",
      progress: 40,
      skills: ["Energy Systems", "Data Analysis", "Hardware Design", "Sustainability"],
      requirements: ["Engineering background", "Data analysis skills", "Environmental awareness"],
      startDate: "2023-12-01",
      endDate: "2024-08-01",
      budget: "$8000",
      deliverables: ["Monitoring system", "Efficiency report", "Implementation guide"],
      technologies: ["MATLAB", "Arduino", "Solar panels", "Data loggers"],
      image: "/placeholder.jpg"
    }
  ])

  const [applications, setApplications] = useState([
    {
      id: 1,
      projectId: 1,
      studentName: "Alex Johnson",
      studentEmail: "alex.j@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      gpa: "3.8",
      skills: ["Python", "IoT", "Arduino"],
      experience: "2 years of programming experience, worked on IoT projects",
      motivation: "Passionate about smart city technologies and IoT applications",
      status: "pending",
      appliedDate: "2024-01-20"
    },
    {
      id: 2,
      projectId: 2,
      studentName: "Maria Garcia",
      studentEmail: "maria.g@university.edu",
      department: "Computer Science",
      year: "4th Year",
      gpa: "3.9",
      skills: ["Machine Learning", "Python", "React"],
      experience: "ML internship at tech company, multiple web development projects",
      motivation: "Interested in educational technology and AI applications",
      status: "approved",
      appliedDate: "2024-01-18"
    }
  ])

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    supervisor: "",
    department: "",
    maxMembers: "",
    duration: "",
    difficulty: "",
    skills: "",
    requirements: "",
    budget: "",
    deliverables: "",
    technologies: ""
  })

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  const handleCreateProject = () => {
    const project = {
      id: projects.length + 1,
      ...newProject,
      currentMembers: 0,
      maxMembers: parseInt(newProject.maxMembers),
      status: "recruiting",
      progress: 0,
      skills: newProject.skills.split(',').map(s => s.trim()),
      requirements: newProject.requirements.split('\n').filter(req => req.trim()),
      deliverables: newProject.deliverables.split('\n').filter(del => del.trim()),
      technologies: newProject.technologies.split(',').map(t => t.trim()),
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      image: "/placeholder.jpg"
    }
    setProjects([...projects, project])
    setNewProject({
      title: "",
      description: "",
      category: "",
      supervisor: "",
      department: "",
      maxMembers: "",
      duration: "",
      difficulty: "",
      skills: "",
      requirements: "",
      budget: "",
      deliverables: "",
      technologies: ""
    })
    setIsCreateProjectOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "recruiting":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500"
      case "Advanced":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getProjectTitle = (projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    return project?.title || "Unknown Project"
  }

  const handleApplicationAction = (applicationId: number, action: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: action } : app
    ))
  }

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
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl border border-green-500/20">
              <Rocket className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Projects Management</h1>
              <p className="text-muted-foreground text-lg">Manage research projects, team requirements, and student applications</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 text-sm">
              <Rocket className="h-4 w-4 mr-2" />
              {projects.length} Projects
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-2 text-sm">
              <UserPlus className="h-4 w-4 mr-2" />
              {applications.length} Applications
            </Badge>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Projects Overview</TabsTrigger>
          <TabsTrigger value="applications">Student Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Active Projects</h2>
            <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new research project for student participation
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Title</Label>
                      <Input
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        placeholder="Enter project title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newProject.category} onValueChange={(value) => setNewProject({...newProject, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Describe the project goals and scope"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Supervisor</Label>
                      <Input
                        value={newProject.supervisor}
                        onChange={(e) => setNewProject({...newProject, supervisor: e.target.value})}
                        placeholder="Project supervisor name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        value={newProject.department}
                        onChange={(e) => setNewProject({...newProject, department: e.target.value})}
                        placeholder="Department name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Max Members</Label>
                      <Input
                        type="number"
                        value={newProject.maxMembers}
                        onChange={(e) => setNewProject({...newProject, maxMembers: e.target.value})}
                        placeholder="Team size"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={newProject.duration}
                        onChange={(e) => setNewProject({...newProject, duration: e.target.value})}
                        placeholder="e.g., 6 months"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select value={newProject.difficulty} onValueChange={(value) => setNewProject({...newProject, difficulty: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Required Skills (comma-separated)</Label>
                      <Input
                        value={newProject.skills}
                        onChange={(e) => setNewProject({...newProject, skills: e.target.value})}
                        placeholder="Python, React, Machine Learning"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                        placeholder="Python, TensorFlow, AWS"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Requirements (one per line)</Label>
                    <Textarea
                      value={newProject.requirements}
                      onChange={(e) => setNewProject({...newProject, requirements: e.target.value})}
                      placeholder="List project requirements"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deliverables (one per line)</Label>
                    <Textarea
                      value={newProject.deliverables}
                      onChange={(e) => setNewProject({...newProject, deliverables: e.target.value})}
                      placeholder="List expected deliverables"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <Input
                      value={newProject.budget}
                      onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                      placeholder="e.g., $5000"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-foreground mb-2">{project.title}</CardTitle>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline">{project.category}</Badge>
                          <Badge className={getDifficultyColor(project.difficulty)} variant="secondary">
                            {project.difficulty}
                          </Badge>
                          <Badge className={getStatusColor(project.status)} variant="secondary">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#e78a53]" />
                        <span>{project.currentMembers}/{project.maxMembers} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                        <span>{project.supervisor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>{project.budget}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Required Skills:</Label>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Technologies:</Label>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Recruit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Student Applications</h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                {applications.filter(app => app.status === 'pending').length} Pending
              </Badge>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                {applications.filter(app => app.status === 'approved').length} Approved
              </Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {applications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-foreground">{application.studentName}</CardTitle>
                        <p className="text-muted-foreground">{getProjectTitle(application.projectId)}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{application.department}</Badge>
                          <Badge variant="secondary">{application.year}</Badge>
                          <Badge className={
                            application.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            application.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                            'bg-red-500/10 text-red-500'
                          }>
                            {application.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                        <p className="text-sm font-medium">GPA: {application.gpa}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Skills:</Label>
                        <div className="flex flex-wrap gap-1">
                          {application.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-500/10 text-blue-500 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Contact:</Label>
                        <p className="text-sm text-muted-foreground">{application.studentEmail}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Experience:</Label>
                      <p className="text-sm text-muted-foreground">{application.experience}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Motivation:</Label>
                      <p className="text-sm text-muted-foreground">{application.motivation}</p>
                    </div>

                    {application.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          onClick={() => handleApplicationAction(application.id, 'approved')}
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleApplicationAction(application.id, 'rejected')}
                          variant="destructive" 
                          size="sm"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Portfolio
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
