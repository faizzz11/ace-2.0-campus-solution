"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ChatInterface from "@/components/chat/chat-interface"
import conversationsData from "@/data/conversations.json"

export default function StudentChatPage() {
    const [conversations, setConversations] = useState(conversationsData)
    const currentUserId = "student_1"

    const studentConversations = conversations.filter(conv =>
        conv.participants.includes(currentUserId)
    )

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
                            <h1 className="text-2xl font-bold mb-1">Messages</h1>
                            <p className="text-sm text-muted-foreground">
                                Connect with faculty, advisors, and campus resources
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Active Conversations</div>
                            <div className="text-xl font-bold text-[#e78a53]">
                                {studentConversations.length}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 min-h-0"
                >
                    <ChatInterface
                        conversations={studentConversations}
                        currentUserId={currentUserId}
                        userRole="student"
                    />
                </motion.div>
            </div>
        </div>
    )
}
