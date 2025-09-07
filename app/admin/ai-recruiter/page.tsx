"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Bot,
    Send,
    User,
    Sparkles,
    Target,
    Users,
    GraduationCap,
    Star,
    TrendingUp,
    CheckCircle,
    Award,
    MapPin,
    Calendar,
    Zap,
    Brain,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Share,
    FileText,
    Eye,
    Mail,
    Phone,
    Code,
    Trophy,
    UserPlus
} from "lucide-react"

interface Message {
    id: number
    type: "user" | "ai"
    content: string
    timestamp: Date
    candidates?: any[]
    isTyping?: boolean
}

export default function AdminAIRecruiterPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: "ai",
            content: "Hello Professor! I'm your AI Recruitment Assistant 🎯 I can help you find the best student candidates for your projects, research, or courses. I'll analyze student profiles, skills, and performance to recommend the most suitable candidates. What type of candidates are you looking for today?",
            timestamp: new Date(),
        }
    ])
    const [newMessage, setNewMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Mock conversation flow for teacher
    const mockConversation = [
        {
            user: "I need 3 top students for my AI research project on computer vision. They should have strong Python skills and machine learning background.",
            ai: "Excellent! I've analyzed all student profiles for AI/ML expertise and Python proficiency. Based on academic performance, project history, and skill alignment, here are the top 3 candidates for your computer vision research:",
            candidates: [
                {
                    id: 1,
                    name: "Alex Johnson",
                    avatar: "/avatars/student-1.jpg",
                    year: "3rd Year",
                    department: "Computer Science",
                    gpa: 3.9,
                    skills: ["Python", "TensorFlow", "OpenCV", "Deep Learning", "Computer Vision"],
                    projects: ["Image Recognition System", "Object Detection API"],
                    experience: "2 years",
                    match: 96,
                    strengths: ["Strong mathematical foundation", "Research publications", "Open source contributions"],
                    availability: "Full-time",
                    previousMentors: ["Dr. Sarah Wilson", "Prof. Michael Chen"],
                    achievements: ["Dean's List", "Best Project Award 2023"],
                    portfolio: "github.com/alexj/cv-projects"
                },
                {
                    id: 2,
                    name: "Maya Patel",
                    avatar: "/avatars/student-2.jpg",
                    year: "4th Year",
                    department: "Computer Science",
                    gpa: 3.8,
                    skills: ["Python", "PyTorch", "Scikit-learn", "Computer Vision", "Data Analysis"],
                    projects: ["Medical Image Analysis", "Autonomous Vehicle Vision"],
                    experience: "3 years",
                    match: 94,
                    strengths: ["Industry internship experience", "Leadership skills", "Research methodology"],
                    availability: "Part-time",
                    previousMentors: ["Dr. Emily Green"],
                    achievements: ["Research Excellence Award", "Google Summer of Code"],
                    portfolio: "mayapatel.dev"
                },
                {
                    id: 3,
                    name: "James Rodriguez",
                    avatar: "/avatars/student-3.jpg",
                    year: "3rd Year",
                    department: "Computer Engineering",
                    gpa: 3.7,
                    skills: ["Python", "MATLAB", "Computer Vision", "Signal Processing", "Machine Learning"],
                    projects: ["Real-time Face Recognition", "Industrial Quality Control"],
                    experience: "2 years",
                    match: 91,
                    strengths: ["Hardware-software integration", "Algorithm optimization", "Team collaboration"],
                    availability: "Full-time",
                    previousMentors: ["Prof. David Kim"],
                    achievements: ["Hackathon Winner", "Engineering Excellence"],
                    portfolio: "jamesrod.tech"
                }
            ]
        },
        {
            user: "Tell me more about Alex Johnson's research background",
            ai: "Alex Johnson is an exceptional candidate! Here's a detailed analysis:\n\n📊 **Academic Excellence**:\n• GPA: 3.9/4.0 - Top 5% of class\n• Consistent Dean's List recognition\n• Strong performance in advanced ML courses\n\n🔬 **Research Experience**:\n• Published 2 papers in computer vision conferences\n• Active contributor to OpenCV community\n• Led Image Recognition System project with 94% accuracy\n\n💡 **Technical Expertise**:\n• Proficient in TensorFlow, PyTorch, OpenCV\n• Experience with CNN architectures (ResNet, YOLO)\n• Strong mathematical foundation in linear algebra\n\n🏆 **Unique Strengths**:\n• Self-motivated learner with 15+ GitHub projects\n• Excellent documentation and code quality\n• Previous mentors praise problem-solving abilities\n\n**Recommendation**: Alex would be perfect for leading the technical implementation of your computer vision research."
        },
        {
            user: "Great! Can you help me draft an invitation email for Alex?",
            ai: "Absolutely! Here's a personalized invitation email for Alex:\n\n**Subject**: Research Opportunity - Computer Vision Project Invitation\n\n---\n\nDear Alex,\n\nI hope this email finds you well. I've been impressed by your academic performance and your work on image recognition systems, particularly your recent project achieving 94% accuracy.\n\nI'm writing to invite you to join my computer vision research project focusing on [specific research area]. Based on your strong background in Python, TensorFlow, and OpenCV, along with your publications in the field, I believe you would be an excellent addition to our research team.\n\n**Project Details**:\n• Duration: [X months]\n• Research focus: [Specific area]\n• Team size: 3-4 students\n• Potential for publication and conference presentation\n\nGiven your experience with CNN architectures and your demonstrated ability to work independently, you would play a key technical leadership role in the project.\n\nWould you be interested in discussing this opportunity further? I'm available for a meeting next week to discuss the project scope and your potential contributions.\n\nBest regards,\n[Your name]\n\n---\n\n*This email is tailored based on Alex's specific strengths and achievements.*"
        }
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const userMessage: Message = {
            id: messages.length + 1,
            type: "user",
            content: newMessage,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setNewMessage("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(newMessage)
            const aiMessage: Message = {
                id: messages.length + 2,
                type: "ai",
                content: response.content,
                timestamp: new Date(),
                candidates: response.candidates
            }
            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, 2500)
    }

    const getAIResponse = (userInput: string): { content: string, candidates?: any[] } => {
        const input = userInput.toLowerCase()

        if (input.includes("ai") || input.includes("computer vision") || input.includes("python")) {
            return {
                content: "Excellent! I've analyzed all student profiles for AI/ML expertise and Python proficiency. Based on academic performance, project history, and skill alignment, here are the top 3 candidates for your computer vision research:",
                candidates: mockConversation[0].candidates
            }
        }

        if (input.includes("alex") || input.includes("more about")) {
            return {
                content: "Alex Johnson is an exceptional candidate! Here's a detailed analysis:\n\n📊 **Academic Excellence**:\n• GPA: 3.9/4.0 - Top 5% of class\n• Consistent Dean's List recognition\n• Strong performance in advanced ML courses\n\n🔬 **Research Experience**:\n• Published 2 papers in computer vision conferences\n• Active contributor to OpenCV community\n• Led Image Recognition System project with 94% accuracy\n\n💡 **Technical Expertise**:\n• Proficient in TensorFlow, PyTorch, OpenCV\n• Experience with CNN architectures (ResNet, YOLO)\n• Strong mathematical foundation in linear algebra\n\n🏆 **Unique Strengths**:\n• Self-motivated learner with 15+ GitHub projects\n• Excellent documentation and code quality\n• Previous mentors praise problem-solving abilities\n\n**Recommendation**: Alex would be perfect for leading the technical implementation of your computer vision research."
            }
        }

        if (input.includes("email") || input.includes("draft") || input.includes("invitation")) {
            return {
                content: "Absolutely! Here's a personalized invitation email for Alex:\n\n**Subject**: Research Opportunity - Computer Vision Project Invitation\n\n---\n\nDear Alex,\n\nI hope this email finds you well. I've been impressed by your academic performance and your work on image recognition systems, particularly your recent project achieving 94% accuracy.\n\nI'm writing to invite you to join my computer vision research project focusing on [specific research area]. Based on your strong background in Python, TensorFlow, and OpenCV, along with your publications in the field, I believe you would be an excellent addition to our research team.\n\n**Project Details**:\n• Duration: [X months]\n• Research focus: [Specific area]\n• Team size: 3-4 students\n• Potential for publication and conference presentation\n\nGiven your experience with CNN architectures and your demonstrated ability to work independently, you would play a key technical leadership role in the project.\n\nWould you be interested in discussing this opportunity further? I'm available for a meeting next week to discuss the project scope and your potential contributions.\n\nBest regards,\n[Your name]\n\n---\n\n*This email is tailored based on Alex's specific strengths and achievements.*"
            }
        }

        return {
            content: "I can help you find the best student candidates! I can assist with:\n\n🎯 **Candidate Search** - Find students by skills, GPA, experience\n📊 **Profile Analysis** - Detailed student background review\n🏆 **Performance Ranking** - Top candidates based on your criteria\n📧 **Communication** - Draft personalized outreach emails\n📈 **Comparison** - Side-by-side candidate evaluation\n\nWhat type of project or research are you recruiting for? Please share your requirements!"
        }
    }

    const runMockConversation = () => {
        setMessages([{
            id: 1,
            type: "ai",
            content: "Hello Professor! I'm your AI Recruitment Assistant 🎯 I can help you find the best student candidates for your projects, research, or courses. I'll analyze student profiles, skills, and performance to recommend the most suitable candidates. What type of candidates are you looking for today?",
            timestamp: new Date(),
        }])

        let messageId = 2
        let delay = 1000

        mockConversation.forEach((exchange, index) => {
            // Add user message
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: messageId++,
                    type: "user",
                    content: exchange.user,
                    timestamp: new Date()
                }])
                setIsTyping(true)
            }, delay)

            delay += 1500

            // Add AI response
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: messageId++,
                    type: "ai",
                    content: exchange.ai,
                    timestamp: new Date(),
                    candidates: exchange.candidates
                }])
                setIsTyping(false)
            }, delay)

            delay += 4000
        })
    }

    const CandidateCard = ({ candidate }: { candidate: any }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-lg font-semibold">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.year} • {candidate.department}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">GPA: {candidate.gpa}</span>
                        </div>
                    </div>
                </div>
                <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                    {candidate.match}% match
                </Badge>
            </div>

            <div className="space-y-4">
                <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4 text-blue-600" />
                        Technical Skills
                    </h5>
                    <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        Key Projects
                    </h5>
                    <div className="space-y-1">
                        {candidate.projects.map((project: string, index: number) => (
                            <p key={index} className="text-sm text-muted-foreground">• {project}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-purple-600" />
                        Achievements
                    </h5>
                    <div className="flex flex-wrap gap-1">
                        {candidate.achievements.map((achievement: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {achievement}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium">{candidate.experience}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Availability</p>
                        <p className="font-medium">{candidate.availability}</p>
                    </div>
                </div>

                <div>
                    <h5 className="font-medium text-sm mb-1">Strengths</h5>
                    <div className="space-y-1">
                        {candidate.strengths.map((strength: string, index: number) => (
                            <p key={index} className="text-sm text-muted-foreground">✓ {strength}</p>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Portfolio
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    return (
        <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-hidden">
            <div className="h-full flex flex-col max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">AI Recruitment Assistant</h1>
                            <p className="text-sm text-muted-foreground">
                                Find and evaluate the best student candidates for your projects and research
                            </p>
                        </div>

                    </div>
                </motion.div>

                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader className="border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            </div>
                            <div>
                                <CardTitle className="text-lg">Recruitment AI</CardTitle>
                                <p className="text-sm text-muted-foreground">Analyzing student profiles and matching candidates</p>
                            </div>
                        </div>
                    </CardHeader>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex items-start gap-3 max-w-[90%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                {message.type === "ai" ? (
                                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full">
                                                        <Bot className="h-4 w-4 text-white" />
                                                    </div>
                                                ) : (
                                                    <AvatarFallback>Prof</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="space-y-3">
                                                <div
                                                    className={`rounded-lg px-4 py-3 ${message.type === "user"
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-muted"
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                </div>

                                                {message.candidates && (
                                                    <div className="grid gap-4 lg:grid-cols-1">
                                                        {message.candidates.map((candidate, index) => (
                                                            <CandidateCard
                                                                key={index}
                                                                candidate={candidate}
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {message.type === "ai" && (
                                                        <div className="flex gap-1">
                                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                                <ThumbsUp className="h-3 w-3" />
                                                            </Button>
                                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                                <ThumbsDown className="h-3 w-3" />
                                                            </Button>
                                                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                                <Copy className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8">
                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full">
                                                <Bot className="h-4 w-4 text-white" />
                                            </div>
                                        </Avatar>
                                        <div className="bg-muted rounded-lg px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">Analyzing student profiles...</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Describe your ideal candidates or ask for specific student recommendations..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSendMessage()
                                    }
                                }}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim() || isTyping}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Brain className="h-3 w-3" />
                            <span>AI-powered candidate matching • Analyzing 250+ student profiles</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
