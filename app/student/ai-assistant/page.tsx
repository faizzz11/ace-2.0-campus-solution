"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Bot,
    Send,
    User,
    Sparkles,
    Target,
    Users,
    GraduationCap,
    Rocket,
    Star,
    TrendingUp,
    CheckCircle,
    Clock,
    MapPin,
    Calendar,
    Zap,
    Brain,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Share
} from "lucide-react"

interface Message {
    id: number
    type: "user" | "ai"
    content: string
    timestamp: Date
    recommendations?: any[]
    isTyping?: boolean
}

export default function StudentAIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: "ai",
            content: "Hi! I'm your AI Campus Assistant 🤖 I can help you find the perfect projects, teams, and faculty mentors based on your skills and interests. What would you like to explore today?",
            timestamp: new Date(),
        }
    ])
    const [newMessage, setNewMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Mock conversation flow
    const mockConversation = [
        {
            user: "I'm interested in AI and machine learning projects. Can you help me find something suitable?",
            ai: "Great choice! I've analyzed your profile and found some excellent AI/ML opportunities. Let me review the available options...",
            recommendations: [
                {
                    type: "project",
                    title: "AI-Powered Study Assistant",
                    description: "Create an intelligent study assistant using machine learning",
                    match: 95,
                    supervisor: "Prof. Michael Chen",
                    skills: ["Python", "TensorFlow", "NLP"],
                    duration: "4 months",
                    team: "3-6 members",
                    deadline: "2025-02-15"
                },
                {
                    type: "project",
                    title: "Smart Campus IoT System",
                    description: "Develop IoT system with AI analytics for campus optimization",
                    match: 88,
                    supervisor: "Dr. Sarah Wilson",
                    skills: ["Python", "IoT", "Machine Learning"],
                    duration: "6 months",
                    team: "4-8 members",
                    deadline: "2025-03-01"
                },
                {
                    type: "faculty",
                    title: "Dr. Sarah Wilson",
                    description: "AI & Machine Learning Research",
                    match: 92,
                    specialization: "Deep Learning, Computer Vision",
                    availability: "Available for mentorship",
                    officeHours: "Mon & Wed 2-4 PM",
                    researchArea: "AI in Healthcare"
                }
            ]
        },
        {
            user: "The AI-Powered Study Assistant looks interesting! Can you tell me more?",
            ai: "Perfect match! Based on your Python and ML background, you're an ideal candidate for this project. Here's why I recommend it:\n\n✅ **Skills Match**: 95% alignment with your profile\n✅ **Learning Growth**: Opportunity to work with NLP and advanced ML\n✅ **Team Size**: Perfect collaborative environment (3-6 members)\n✅ **Timeline**: 4 months allows for thorough development\n\nWould you like me to help you prepare your application?"
        },
        {
            user: "Yes, help me with the application!",
            ai: "Excellent! I'll guide you through the application process:\n\n🎯 **Application Strategy**:\n1. Highlight your Python & ML experience\n2. Mention your interest in educational technology\n3. Show enthusiasm for NLP applications\n\n📝 **Suggested Focus Areas**:\n• Your previous projects with recommendation systems\n• Understanding of user experience in educational tools\n• Collaborative coding experience\n\n🚀 **Next Steps**:\n1. Draft your application letter\n2. Prepare your technical portfolio\n3. Schedule a meeting with Prof. Michael Chen\n\nShall I help you draft the application letter?"
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
                recommendations: response.recommendations
            }
            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, 2000)
    }

    const getAIResponse = (userInput: string): { content: string, recommendations?: any[] } => {
        const input = userInput.toLowerCase()

        if (input.includes("ai") || input.includes("machine learning") || input.includes("ml")) {
            return {
                content: "Great choice! I've analyzed your profile and found some excellent AI/ML opportunities. Based on your skills in Python and your interest in machine learning, here are my top recommendations:",
                recommendations: mockConversation[0].recommendations
            }
        }

        if (input.includes("study assistant") || input.includes("more")) {
            return {
                content: "Perfect match! Based on your Python and ML background, you're an ideal candidate for this project. Here's why I recommend it:\n\n✅ **Skills Match**: 95% alignment with your profile\n✅ **Learning Growth**: Opportunity to work with NLP and advanced ML\n✅ **Team Size**: Perfect collaborative environment (3-6 members)\n✅ **Timeline**: 4 months allows for thorough development\n\nWould you like me to help you prepare your application?"
            }
        }

        if (input.includes("application") || input.includes("apply")) {
            return {
                content: "Excellent! I'll guide you through the application process:\n\n🎯 **Application Strategy**:\n1. Highlight your Python & ML experience\n2. Mention your interest in educational technology\n3. Show enthusiasm for NLP applications\n\n📝 **Suggested Focus Areas**:\n• Your previous projects with recommendation systems\n• Understanding of user experience in educational tools\n• Collaborative coding experience\n\n🚀 **Next Steps**:\n1. Draft your application letter\n2. Prepare your technical portfolio\n3. Schedule a meeting with Prof. Michael Chen\n\nShall I help you draft the application letter?"
            }
        }

        return {
            content: "I'd be happy to help you explore opportunities! I can assist you with:\n\n🎯 **Project Recommendations** - Find projects matching your skills\n👥 **Team Matching** - Connect with collaborative opportunities\n🎓 **Faculty Mentorship** - Discover research mentors\n📚 **Skill Development** - Suggest learning paths\n\nWhat specific area interests you most?"
        }
    }

    const runMockConversation = () => {
        setMessages([{
            id: 1,
            type: "ai",
            content: "Hi! I'm your AI Campus Assistant 🤖 I can help you find the perfect projects, teams, and faculty mentors based on your skills and interests. What would you like to explore today?",
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
                    recommendations: exchange.recommendations
                }])
                setIsTyping(false)
            }, delay)

            delay += 3000
        })
    }

    const RecommendationCard = ({ recommendation, type }: { recommendation: any, type: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 bg-gradient-to-r from-[#e78a53]/5 to-transparent hover:shadow-md transition-all"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    {type === "project" && <Rocket className="h-5 w-5 text-[#e78a53]" />}
                    {type === "faculty" && <GraduationCap className="h-5 w-5 text-[#e78a53]" />}
                    <h4 className="font-semibold">{recommendation.title}</h4>
                </div>
                <Badge className="bg-[#e78a53] text-white">
                    {recommendation.match}% match
                </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>

            {type === "project" && (
                <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{recommendation.supervisor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{recommendation.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{recommendation.team}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {recommendation.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {type === "faculty" && (
                <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            <span>{recommendation.specialization}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{recommendation.officeHours}</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{recommendation.researchArea}</p>
                </div>
            )}

            <div className="flex justify-end gap-2 mt-3">
                <Button size="sm" variant="outline">
                    Learn More
                </Button>
                <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Apply Now
                </Button>
            </div>
        </motion.div>
    )

    return (
        <div className="h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
            <div className="h-full w-full flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">AI Campus Assistant</h1>
                            <p className="text-sm text-muted-foreground">
                                Get personalized recommendations for projects, teams, and mentors
                            </p>
                        </div>

                    </div>
                </motion.div>

                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader className="border-b pb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-full">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            </div>
                            <div>
                                <CardTitle className="text-lg">AI Assistant</CardTitle>
                                <p className="text-sm text-muted-foreground">Always here to help you find opportunities</p>
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
                                        <div className={`flex items-start gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                {message.type === "ai" ? (
                                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-full">
                                                        <Bot className="h-4 w-4 text-white" />
                                                    </div>
                                                ) : (
                                                    <AvatarFallback>You</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="space-y-2">
                                                <div
                                                    className={`rounded-lg px-4 py-3 ${message.type === "user"
                                                        ? "bg-[#e78a53] text-white"
                                                        : "bg-muted"
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                </div>

                                                {message.recommendations && (
                                                    <div className="space-y-3">
                                                        {message.recommendations.map((rec, index) => (
                                                            <RecommendationCard
                                                                key={index}
                                                                recommendation={rec}
                                                                type={rec.type}
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
                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-full">
                                                <Bot className="h-4 w-4 text-white" />
                                            </div>
                                        </Avatar>
                                        <div className="bg-muted rounded-lg px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-[#e78a53] rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-[#e78a53] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-[#e78a53] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">AI is thinking...</span>
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
                                placeholder="Ask me about projects, teams, or faculty mentors..."
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
                                className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" />
                            <span>Powered by AI • Analyzing your profile and campus opportunities</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
