"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Send,
    Paperclip,
    MoreHorizontal,
    Phone,
    Video,
    Info,
    Search,
    Plus,
    Smile
} from "lucide-react"

interface Message {
    id: number
    senderId: string
    content: string
    timestamp: string
    type: "text" | "file" | "image"
}

interface Participant {
    name: string
    role: "student" | "admin"
    avatar: string
    department: string
    year?: string
    position?: string
}

interface Conversation {
    id: number
    participants: string[]
    participantDetails: Record<string, Participant>
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    status: "active" | "archived"
    subject: string
    messages: Message[]
}

interface ChatInterfaceProps {
    conversations: Conversation[]
    currentUserId: string
    userRole: "student" | "admin"
}

export default function ChatInterface({ conversations, currentUserId, userRole }: ChatInterfaceProps) {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [newMessage, setNewMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [selectedConversation?.messages])

    const filteredConversations = conversations.filter(conversation =>
        conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(conversation.participantDetails).some(participant =>
            participant.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return

        const message: Message = {
            id: selectedConversation.messages.length + 1,
            senderId: currentUserId,
            content: newMessage,
            timestamp: new Date().toISOString(),
            type: "text"
        }

        setSelectedConversation({
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
            lastMessage: newMessage,
            lastMessageTime: message.timestamp
        })

        setNewMessage("")
    }

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (diffInHours < 168) {
            return date.toLocaleDateString([], { weekday: 'short' })
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
        }
    }

    const getOtherParticipant = (conversation: Conversation) => {
        const otherParticipantId = conversation.participants.find(id => id !== currentUserId)
        return otherParticipantId ? conversation.participantDetails[otherParticipantId] : null
    }

    return (
        <div className="flex h-[calc(100vh-6rem)] bg-background rounded-lg border overflow-hidden w-full">
            <div className="w-80 border-r bg-muted/30 flex-shrink-0">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Messages</h2>
                        <Button size="sm" variant="ghost">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2">
                        {filteredConversations.map((conversation) => {
                            const otherParticipant = getOtherParticipant(conversation)
                            if (!otherParticipant) return null

                            return (
                                <motion.div
                                    key={conversation.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card
                                        className={`mb-2 cursor-pointer transition-all hover:shadow-md ${selectedConversation?.id === conversation.id
                                            ? "ring-2 ring-[#e78a53] bg-[#e78a53]/5"
                                            : ""
                                            }`}
                                        onClick={() => setSelectedConversation(conversation)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={otherParticipant.avatar} />
                                                        <AvatarFallback>
                                                            {otherParticipant.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-semibold truncate">
                                                            {otherParticipant.name}
                                                        </p>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatTime(conversation.lastMessageTime)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-2">
                                                        {otherParticipant.department} • {otherParticipant.position || otherParticipant.year}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                                                        {conversation.lastMessage}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="secondary" className="text-xs px-2 py-1">
                                                            {conversation.subject}
                                                        </Badge>
                                                        {conversation.unreadCount > 0 && (
                                                            <Badge className="bg-[#e78a53] text-white text-xs px-2">
                                                                {conversation.unreadCount}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b bg-background flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {(() => {
                                        const otherParticipant = getOtherParticipant(selectedConversation)
                                        if (!otherParticipant) return null

                                        return (
                                            <>
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={otherParticipant.avatar} />
                                                    <AvatarFallback>
                                                        {otherParticipant.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold">{otherParticipant.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {otherParticipant.department} • {otherParticipant.position || otherParticipant.year}
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    })()}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="ghost">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <Info className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 overflow-hidden">
                            <ScrollArea className="h-full p-4">
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {selectedConversation.messages.map((message) => {
                                            const isOwnMessage = message.senderId === currentUserId
                                            const sender = selectedConversation.participantDetails[message.senderId]

                                            return (
                                                <motion.div
                                                    key={message.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div className={`flex items-end space-x-2 max-w-[70%] ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}>
                                                        {!isOwnMessage && (
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarImage src={sender?.avatar} />
                                                                <AvatarFallback className="text-xs">
                                                                    {sender?.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div
                                                            className={`rounded-lg px-3 py-2 ${isOwnMessage
                                                                ? "bg-[#e78a53] text-white"
                                                                : "bg-muted"
                                                                }`}
                                                        >
                                                            <p className="text-sm">{message.content}</p>
                                                            <p className={`text-xs mt-1 ${isOwnMessage ? "text-white/70" : "text-muted-foreground"}`}>
                                                                {formatTime(message.timestamp)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </AnimatePresence>
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="p-4 border-t bg-background flex-shrink-0">
                            <div className="flex items-end space-x-2">
                                <Button size="sm" variant="ghost">
                                    <Paperclip className="h-4 w-4" />
                                </Button>
                                <div className="flex-1 relative">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault()
                                                handleSendMessage()
                                            }
                                        }}
                                        className="pr-10"
                                    />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                    >
                                        <Smile className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                            <p className="text-muted-foreground">
                                Choose a conversation from the sidebar to start messaging
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
