"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatInterface from "@/components/chat/chat-interface"
import conversationsData from "@/data/conversations.json"
import {
    MessageCircle,
    Users,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle
} from "lucide-react"

export default function AdminChatPage() {
    const [conversations, setConversations] = useState(conversationsData)
    const currentUserId = "admin_1"

    const adminConversations = conversations.filter(conv =>
        conv.participants.includes(currentUserId)
    )

    const totalMessages = adminConversations.reduce((sum, conv) => sum + conv.messages.length, 0)
    const unreadCount = adminConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
    const activeConversations = adminConversations.filter(conv => conv.status === "active").length

    const stats = [
        {
            title: "Total Conversations",
            value: adminConversations.length,
            icon: MessageCircle,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Active Chats",
            value: activeConversations,
            icon: Users,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Unread Messages",
            value: unreadCount,
            icon: AlertCircle,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Total Messages",
            value: totalMessages,
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ]

    const recentActivity = [
        {
            student: "Alex Johnson",
            subject: "AI Research Project Discussion",
            time: "2 hours ago",
            status: "replied"
        },
        {
            student: "Maya Patel",
            subject: "Internship Opportunities",
            time: "4 hours ago",
            status: "pending"
        },
        {
            student: "James Rodriguez",
            subject: "Thesis Proposal Review",
            time: "1 day ago",
            status: "completed"
        }
    ]

    return (
        <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-2 overflow-hidden">
            <div className="h-full flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 px-2"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">
                                Message Center
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage student communications and provide guidance
                            </p>
                        </div>
                        <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            New Message
                        </Button>
                    </div>
                </motion.div>

                <Tabs defaultValue="messages" className="flex-1 flex flex-col min-h-0">
                    <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg mb-6">
                        <TabsTrigger
                            value="messages"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Messages
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
                        <TabsTrigger
                            value="settings"
                            style={{
                                backgroundColor: 'var(--active-bg, transparent)',
                                color: 'var(--active-color, inherit)',
                            }}
                            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
                        >
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="messages" className="flex-1 min-h-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="h-full"
                        >
                            <ChatInterface
                                conversations={adminConversations}
                                currentUserId={currentUserId}
                                userRole="admin"
                            />
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
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
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-[#e78a53]" />
                                            Recent Activity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                                    <div>
                                                        <p className="font-medium">{activity.student}</p>
                                                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                                    </div>
                                                    <Badge
                                                        variant={activity.status === "completed" ? "default" :
                                                            activity.status === "replied" ? "secondary" : "destructive"}
                                                        className={activity.status === "completed" ? "bg-green-500" :
                                                            activity.status === "replied" ? "bg-blue-500" : ""}
                                                    >
                                                        {activity.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-[#e78a53]" />
                                            Response Time
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Average Response Time</span>
                                                <span className="font-semibold text-green-600">2.4 hours</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Fastest Response</span>
                                                <span className="font-semibold text-blue-600">15 minutes</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Messages Today</span>
                                                <span className="font-semibold text-[#e78a53]">12</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Active Students</span>
                                                <span className="font-semibold text-purple-600">8</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid gap-6 lg:grid-cols-2"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Email Notifications</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive email alerts for new messages
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Configure
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Auto-Reply</p>
                                            <p className="text-sm text-muted-foreground">
                                                Set automatic responses for common queries
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Setup
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Office Hours</p>
                                            <p className="text-sm text-muted-foreground">
                                                Set your availability for student messages
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Message Templates</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="font-medium text-sm">Project Guidelines</p>
                                        <p className="text-xs text-muted-foreground">
                                            Template for project requirement discussions
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="font-medium text-sm">Meeting Scheduling</p>
                                        <p className="text-xs text-muted-foreground">
                                            Template for arranging student meetings
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted/50">
                                        <p className="font-medium text-sm">Feedback Response</p>
                                        <p className="text-xs text-muted-foreground">
                                            Template for providing constructive feedback
                                        </p>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        Manage Templates
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
