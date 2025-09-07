"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    Bot,
    Phone,
    Plus,
    Edit3,
    Trash2,
    Eye,
    PhoneCall,
    Clock,
    Users,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Upload,
    FileText,
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    Settings,
    Brain,
    Zap,
    Target,
    Calendar,
    User,
    MessageSquare,
    Play,
    Pause,
    Download
} from "lucide-react"

export default function AIProjectSummarizerPage() {
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Smart Campus IoT System",
            description: "IoT-based system to monitor and optimize campus resources including energy consumption, air quality, and space utilization.",
            context: "This project involves developing sensors, data collection systems, dashboard creation, and testing protocols. Students will work with Arduino, Python, and cloud technologies.",
            status: "active",
            studentsEnrolled: 8,
            callsReceived: 24,
            avgCallDuration: "4.5 minutes",
            lastUpdated: "2024-01-15",
            aiAgentEnabled: true
        },
        {
            id: 2,
            title: "AI-Powered Study Assistant",
            description: "Intelligent study assistant helping students organize learning materials and provide personalized recommendations.",
            context: "Students will create machine learning models, develop web interfaces, and implement NLP for personalized study recommendations.",
            status: "active",
            studentsEnrolled: 6,
            callsReceived: 18,
            avgCallDuration: "3.8 minutes",
            lastUpdated: "2024-01-14",
            aiAgentEnabled: true
        },
        {
            id: 3,
            title: "Sustainable Energy Monitoring",
            description: "Monitor and analyze renewable energy sources on campus for optimization.",
            context: "Focus on solar panel efficiency, battery storage systems, and energy consumption patterns across different campus buildings.",
            status: "draft",
            studentsEnrolled: 0,
            callsReceived: 0,
            avgCallDuration: "0 minutes",
            lastUpdated: "2024-01-10",
            aiAgentEnabled: false
        }
    ])

    const [callHistory, setCallHistory] = useState([
        {
            id: 1,
            projectId: 1,
            studentName: "Alex Johnson",
            studentAvatar: "/avatars/student-1.jpg",
            duration: "5:23",
            topic: "Arduino sensor integration",
            timestamp: "2024-01-15T14:30:00Z",
            status: "completed",
            satisfaction: "positive",
            aiResponse: "Explained sensor calibration process and provided code examples"
        },
        {
            id: 2,
            projectId: 2,
            studentName: "Maya Patel",
            studentAvatar: "/avatars/student-2.jpg",
            duration: "3:45",
            topic: "ML model training",
            timestamp: "2024-01-15T11:20:00Z",
            status: "completed",
            satisfaction: "positive",
            aiResponse: "Guided through dataset preparation and model selection"
        },
        {
            id: 3,
            projectId: 1,
            studentName: "James Rodriguez",
            studentAvatar: "/avatars/student-3.jpg",
            duration: "6:12",
            topic: "Cloud deployment",
            timestamp: "2024-01-14T16:45:00Z",
            status: "completed",
            satisfaction: "neutral",
            aiResponse: "Discussed AWS configuration and database setup"
        },
        {
            id: 4,
            projectId: 2,
            studentName: "Emily Zhang",
            studentAvatar: "/avatars/student-4.jpg",
            duration: "4:18",
            topic: "API integration",
            timestamp: "2024-01-14T09:15:00Z",
            status: "completed",
            satisfaction: "positive",
            aiResponse: "Provided API documentation and usage examples"
        }
    ])

    const [selectedProject, setSelectedProject] = useState(null)
    const [isEditingProject, setIsEditingProject] = useState(false)
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        context: ""
    })

    const stats = [
        {
            title: "Active Projects",
            value: projects.filter(p => p.status === "active").length,
            icon: Bot,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Total Calls Today",
            value: 12,
            icon: PhoneCall,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Avg Response Time",
            value: "2.3s",
            icon: Zap,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Student Satisfaction",
            value: "94%",
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ]

    const handleCreateProject = () => {
        const project = {
            id: projects.length + 1,
            ...newProject,
            status: "draft",
            studentsEnrolled: 0,
            callsReceived: 0,
            avgCallDuration: "0 minutes",
            lastUpdated: new Date().toISOString().split('T')[0],
            aiAgentEnabled: false
        }
        setProjects([...projects, project])
        setNewProject({ title: "", description: "", context: "" })
        setIsEditingProject(false)
    }

    const toggleAIAgent = (projectId) => {
        setProjects(projects.map(p =>
            p.id === projectId ? { ...p, aiAgentEnabled: !p.aiAgentEnabled } : p
        ))
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getSatisfactionColor = (satisfaction) => {
        switch (satisfaction) {
            case "positive": return "text-green-600 bg-green-50"
            case "neutral": return "text-yellow-600 bg-yellow-50"
            case "negative": return "text-red-600 bg-red-50"
            default: return "text-gray-600 bg-gray-50"
        }
    }

    return (
        <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-hidden">
            <div className="h-full flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 px-2"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">AI Project Summarizer</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage project contexts and AI-powered student support calls
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                <Settings className="h-4 w-4 mr-2" />
                                AI Settings
                            </Button>
                            <Dialog open={isEditingProject} onOpenChange={setIsEditingProject}>
                                <DialogTrigger asChild>
                                    <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Project
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Create New Project</DialogTitle>
                                        <DialogDescription>
                                            Add a new project with AI agent support
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Project Title</Label>
                                            <Input
                                                id="title"
                                                value={newProject.title}
                                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                                placeholder="Enter project title"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={newProject.description}
                                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                                placeholder="Brief project description"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="context">AI Context</Label>
                                            <Textarea
                                                id="context"
                                                value={newProject.context}
                                                onChange={(e) => setNewProject({ ...newProject, context: e.target.value })}
                                                placeholder="Detailed context for AI agent to understand and answer student questions"
                                                rows={6}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsEditingProject(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleCreateProject} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                                            Create Project
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </motion.div>

                <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
                    <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg mb-4">
                        <TabsTrigger
                            value="overview"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="projects"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Projects
                        </TabsTrigger>
                        <TabsTrigger
                            value="calls"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Call History
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="flex-1 min-h-0">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                            {stat.title}
                                                        </p>
                                                        <p className="text-2xl font-bold">{stat.value}</p>
                                                    </div>
                                                    <div className={`${stat.bg} p-3 rounded-full`}>
                                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Brain className="h-5 w-5 text-[#e78a53]" />
                                            Active AI Agents
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {projects.filter(p => p.aiAgentEnabled).map((project) => (
                                                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                                    <div>
                                                        <p className="font-medium">{project.title}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {project.callsReceived} calls • {project.avgCallDuration} avg
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                        <Badge className="bg-green-500">Live</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <PhoneCall className="h-5 w-5 text-[#e78a53]" />
                                            Recent Calls
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {callHistory.slice(0, 4).map((call) => (
                                                <div key={call.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={call.studentAvatar} />
                                                            <AvatarFallback>{call.studentName.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{call.studentName}</p>
                                                            <p className="text-xs text-muted-foreground">{call.topic}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium">{call.duration}</p>
                                                        <Badge className={`text-xs ${getSatisfactionColor(call.satisfaction)}`}>
                                                            {call.satisfaction}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects" className="flex-1 min-h-0 overflow-auto">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-all">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{project.title}</CardTitle>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {project.description}
                                                    </p>
                                                </div>
                                                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                                                    {project.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label className="text-xs font-medium text-muted-foreground">AI Context</Label>
                                                    <p className="text-sm mt-1 line-clamp-3">{project.context}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground">Students</p>
                                                        <p className="font-medium">{project.studentsEnrolled}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Calls</p>
                                                        <p className="font-medium">{project.callsReceived}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant={project.aiAgentEnabled ? "default" : "outline"}
                                                            onClick={() => toggleAIAgent(project.id)}
                                                            className={project.aiAgentEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                                                        >
                                                            <Bot className="h-4 w-4 mr-2" />
                                                            {project.aiAgentEnabled ? "AI On" : "AI Off"}
                                                        </Button>
                                                        {project.aiAgentEnabled && (
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                                <span className="text-xs text-green-600">Live</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="ghost">
                                                            <Edit3 className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="calls" className="flex-1 min-h-0 overflow-auto">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Call History</CardTitle>
                                    <div className="flex gap-2">
                                        <Select>
                                            <SelectTrigger className="w-40">
                                                <SelectValue placeholder="Filter by project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Projects</SelectItem>
                                                {projects.map((project) => (
                                                    <SelectItem key={project.id} value={project.id.toString()}>
                                                        {project.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {callHistory.map((call) => (
                                        <motion.div
                                            key={call.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={call.studentAvatar} />
                                                        <AvatarFallback>{call.studentName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{call.studentName}</p>
                                                            <Badge variant="outline" className="text-xs">
                                                                {projects.find(p => p.id === call.projectId)?.title}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{call.topic}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {formatTimestamp(call.timestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm font-medium">{call.duration}</span>
                                                    </div>
                                                    <Badge className={`text-xs ${getSatisfactionColor(call.satisfaction)}`}>
                                                        {call.satisfaction}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="mt-3 p-3 bg-muted/50 rounded-md">
                                                <p className="text-sm text-muted-foreground mb-1">AI Response:</p>
                                                <p className="text-sm">{call.aiResponse}</p>
                                            </div>
                                            <div className="flex justify-end gap-2 mt-3">
                                                <Button size="sm" variant="ghost">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Replay
                                                </Button>
                                                <Button size="sm" variant="ghost">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Transcript
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="flex-1 min-h-0">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Call Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Call Success Rate</span>
                                                <span className="font-medium">96%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Avg Response Accuracy</span>
                                                <span className="font-medium">94%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>Student Satisfaction</span>
                                                <span className="font-medium">92%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-[#e78a53] h-2 rounded-full" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Most Common Topics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { topic: "Code Implementation", count: 18, percentage: 35 },
                                            { topic: "Technical Concepts", count: 14, percentage: 27 },
                                            { topic: "Project Requirements", count: 12, percentage: 23 },
                                            { topic: "Debugging Help", count: 8, percentage: 15 }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{item.topic}</p>
                                                    <p className="text-sm text-muted-foreground">{item.count} calls</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">{item.percentage}%</p>
                                                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                                        <div
                                                            className="bg-[#e78a53] h-2 rounded-full"
                                                            style={{ width: `${item.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
