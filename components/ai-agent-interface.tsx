"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Bot,
    Phone,
    PhoneCall,
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    Brain,
    Zap,
    CheckCircle,
    AlertCircle,
    Clock,
    User,
    MessageSquare,
    Activity,
    Pause,
    Play,
    Square
} from "lucide-react"

interface AIAgentInterfaceProps {
    projectTitle?: string
    studentName?: string
    isActive?: boolean
    onEndCall?: () => void
}

export default function AIAgentInterface({
    projectTitle = "Smart Campus IoT System",
    studentName = "Alex Johnson",
    isActive = false,
    onEndCall
}: AIAgentInterfaceProps) {
    const [callStatus, setCallStatus] = useState("idle") // idle, connecting, active, ended
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [volumeOn, setVolumeOn] = useState(true)
    const [currentQuery, setCurrentQuery] = useState("")
    const [aiResponse, setAiResponse] = useState("")
    const [callHistory, setCallHistory] = useState([])

    // Simulated call data
    const mockQueries = [
        "How do I integrate Arduino sensors with the cloud platform?",
        "What's the best way to handle data validation?",
        "Can you explain the MQTT protocol setup?",
        "How should I structure the database schema?"
    ]

    const mockResponses = [
        "To integrate Arduino sensors with cloud platforms, you'll need to establish a secure connection using WiFi modules. First, configure your Arduino with the ESP32 or ESP8266 chip...",
        "Data validation is crucial for IoT systems. I recommend implementing both client-side and server-side validation. Start by defining data schemas...",
        "MQTT is perfect for IoT communication. You'll need to set up a broker like AWS IoT Core or Eclipse Mosquitto. Configure your Arduino as a client...",
        "For IoT database design, consider time-series data structure. Use InfluxDB or TimescaleDB for sensor data, with separate tables for device metadata..."
    ]

    useEffect(() => {
        let interval
        if (callStatus === "active") {
            interval = setInterval(() => {
                setDuration(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [callStatus])

    useEffect(() => {
        if (isActive && callStatus === "idle") {
            handleStartCall()
        }
    }, [isActive])

    const handleStartCall = () => {
        setCallStatus("connecting")
        setTimeout(() => {
            setCallStatus("active")
            simulateConversation()
        }, 2000)
    }

    const handleEndCall = () => {
        setCallStatus("ended")
        setDuration(0)
        onEndCall?.()
    }

    const simulateConversation = () => {
        const queryIndex = Math.floor(Math.random() * mockQueries.length)
        setCurrentQuery(mockQueries[queryIndex])

        setTimeout(() => {
            setAiResponse(mockResponses[queryIndex])
        }, 3000)
    }

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getStatusColor = () => {
        switch (callStatus) {
            case "connecting": return "text-yellow-600 bg-yellow-50"
            case "active": return "text-green-600 bg-green-50"
            case "ended": return "text-gray-600 bg-gray-50"
            default: return "text-blue-600 bg-blue-50"
        }
    }

    const getStatusText = () => {
        switch (callStatus) {
            case "connecting": return "Connecting..."
            case "active": return "Active Call"
            case "ended": return "Call Ended"
            default: return "Ready"
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-full">
                                    <Bot className="h-6 w-6 text-white" />
                                </div>
                            </Avatar>
                            {callStatus === "active" && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                            )}
                        </div>
                        <div>
                            <CardTitle className="text-lg">AI Project Assistant</CardTitle>
                            <p className="text-sm text-muted-foreground">{projectTitle}</p>
                        </div>
                    </div>
                    <Badge className={`${getStatusColor()}`}>
                        {getStatusText()}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {callStatus !== "idle" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 bg-muted/30"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/student-1.jpg" />
                                    <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-sm">{studentName}</p>
                                    <p className="text-xs text-muted-foreground">Student</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-mono text-sm">{formatDuration(duration)}</span>
                            </div>
                        </div>

                        {callStatus === "connecting" && (
                            <div className="flex items-center justify-center py-8">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 border-4 border-[#e78a53]/20 rounded-full"></div>
                                        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#e78a53] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Connecting to AI agent...</p>
                                </div>
                            </div>
                        )}

                        {callStatus === "active" && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuery}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    {currentQuery && (
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <User className="h-4 w-4 text-blue-600 mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium text-blue-800">Student Question:</p>
                                                    <p className="text-sm text-blue-700">{currentQuery}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {aiResponse ? (
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <Bot className="h-4 w-4 text-green-600 mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium text-green-800">AI Response:</p>
                                                    <p className="text-sm text-green-700">{aiResponse}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-gray-600" />
                                                <div className="flex items-center gap-2">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                    <p className="text-sm text-gray-600">AI is thinking...</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {callStatus === "ended" && (
                            <div className="text-center py-6">
                                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                                <p className="font-medium">Call completed successfully</p>
                                <p className="text-sm text-muted-foreground">
                                    Duration: {formatDuration(duration)}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

                <div className="flex items-center justify-center gap-4">
                    {callStatus === "idle" && (
                        <Button
                            onClick={handleStartCall}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Start Demo Call
                        </Button>
                    )}

                    {callStatus === "active" && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsMuted(!isMuted)}
                                className={isMuted ? "text-red-600" : ""}
                            >
                                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setVolumeOn(!volumeOn)}
                                className={!volumeOn ? "text-red-600" : ""}
                            >
                                {volumeOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                            </Button>

                            <Button
                                onClick={handleEndCall}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                <Square className="h-4 w-4 mr-2" />
                                End Call
                            </Button>
                        </>
                    )}

                    {callStatus === "ended" && (
                        <Button
                            onClick={() => setCallStatus("idle")}
                            variant="outline"
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            New Call
                        </Button>
                    )}
                </div>

                {callStatus === "active" && (
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <Activity className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                            <p className="text-xs text-blue-700">Real-time AI</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <Zap className="h-6 w-6 text-green-600 mx-auto mb-1" />
                            <p className="text-xs text-green-700">Context Aware</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                            <p className="text-xs text-purple-700">Interactive</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
