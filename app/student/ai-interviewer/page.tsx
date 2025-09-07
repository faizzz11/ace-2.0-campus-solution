"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Bot,
    Mic,
    MicOff,
    Video,
    VideoOff,
    Play,
    Pause,
    Square,
    Clock,
    Star,
    Award,
    TrendingUp,
    Brain,
    MessageSquare,
    Eye,
    Users,
    Briefcase,
    Code,
    Zap,
    Target,
    CheckCircle,
    XCircle,
    AlertCircle,
    BarChart3,
    FileText,
    Lightbulb,
    ThumbsUp,
    Camera,
    Volume2,
    Settings
} from "lucide-react"

export default function AIInterviewerPage() {
    const [interviewState, setInterviewState] = useState("setup") // setup, active, completed
    const [interviewType, setInterviewType] = useState("")
    const [duration, setDuration] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOn, setIsVideoOn] = useState(true)
    const [feedback, setFeedback] = useState(null)

    const interviewTypes = [
        { id: "technical", name: "Technical Interview", description: "Coding and problem-solving questions", duration: "45-60 min" },
        { id: "behavioral", name: "Behavioral Interview", description: "Soft skills and experience questions", duration: "30-45 min" },
        { id: "case-study", name: "Case Study", description: "Business problem-solving scenarios", duration: "60-90 min" },
        { id: "general", name: "General Interview", description: "Mixed technical and behavioral questions", duration: "45-60 min" }
    ]

    const mockQuestions = {
        technical: [
            "Tell me about yourself and your technical background.",
            "Explain the difference between == and === in JavaScript.",
            "How would you optimize a slow database query?",
            "Describe your experience with version control systems.",
            "Walk me through how you would design a URL shortening service."
        ],
        behavioral: [
            "Tell me about yourself and why you're interested in this role.",
            "Describe a challenging project you worked on and how you handled it.",
            "How do you handle feedback and criticism?",
            "Tell me about a time when you had to work with a difficult team member.",
            "Where do you see yourself in 5 years?"
        ],
        "case-study": [
            "Tell me about your background and interest in business analysis.",
            "How would you approach launching a new product in a competitive market?",
            "Analyze the decline in user engagement for a mobile app.",
            "Design a strategy to increase customer retention for an e-commerce platform.",
            "How would you prioritize features for a new software product?"
        ],
        general: [
            "Tell me about yourself and your career goals.",
            "What's your experience with agile development methodologies?",
            "Describe a time when you had to learn a new technology quickly.",
            "How do you handle tight deadlines and pressure?",
            "What questions do you have for me about the role or company?"
        ]
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        let interval
        if (interviewState === "active" && isRecording) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [interviewState, isRecording])

    const startInterview = () => {
        setInterviewState("active")
        setIsRecording(true)
        setCurrentQuestion(0)
        setDuration(0)
    }

    const nextQuestion = () => {
        if (currentQuestion < mockQuestions[interviewType].length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            completeInterview()
        }
    }

    const completeInterview = () => {
        setInterviewState("completed")
        setIsRecording(false)
        generateFeedback()
    }

    const generateFeedback = () => {
        // Mock feedback generation
        const mockFeedback = {
            overallScore: 85,
            categories: {
                communication: 88,
                technical: 82,
                confidence: 90,
                clarity: 85
            },
            strengths: [
                "Clear and confident communication",
                "Good technical knowledge demonstration",
                "Professional demeanor throughout",
                "Structured approach to problem-solving"
            ],
            improvements: [
                "Provide more specific examples in behavioral questions",
                "Take a moment to think before answering complex technical questions",
                "Use the STAR method for behavioral responses",
                "Ask clarifying questions when needed"
            ],
            recommendations: [
                "Practice explaining technical concepts in simpler terms",
                "Prepare more diverse examples from your experience",
                "Work on reducing filler words (um, uh)",
                "Research common industry-specific questions"
            ]
        }
        setFeedback(mockFeedback)
    }

    const resetInterview = () => {
        setInterviewState("setup")
        setInterviewType("")
        setDuration(0)
        setCurrentQuestion(0)
        setIsRecording(false)
        setFeedback(null)
    }

    const ScoreCard = ({ title, score, icon: Icon }) => (
        <Card className="text-center">
            <CardContent className="p-4">
                <Icon className="h-8 w-8 mx-auto mb-2 text-[#e78a53]" />
                <div className="text-2xl font-bold mb-1">{score}%</div>
                <div className="text-sm text-muted-foreground">{title}</div>
                <Progress value={score} className="mt-2 h-2" />
            </CardContent>
        </Card>
    )

    if (interviewState === "setup") {
        return (
            <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-hidden">
                <div className="h-full flex flex-col max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <h1 className="text-2xl font-bold mb-2">AI Interview Simulator</h1>
                        <p className="text-muted-foreground">
                            Practice interviews with AI and get real-time feedback on your performance
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bot className="h-5 w-5 text-[#e78a53]" />
                                        Choose Interview Type
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {interviewTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${interviewType === type.id ? "border-[#e78a53] bg-[#e78a53]/5" : ""
                                                }`}
                                            onClick={() => setInterviewType(type.id)}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold">{type.name}</h3>
                                                <Badge variant="outline">{type.duration}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{type.description}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="h-5 w-5 text-blue-600" />
                                        What to Expect
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Video className="h-5 w-5 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Real-time Recording</p>
                                            <p className="text-sm text-muted-foreground">Your responses will be recorded and analyzed</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">AI Analysis</p>
                                            <p className="text-sm text-muted-foreground">Get detailed feedback on communication skills</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <BarChart3 className="h-5 w-5 text-orange-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Performance Scoring</p>
                                            <p className="text-sm text-muted-foreground">Receive scores across multiple categories</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Improvement Tips</p>
                                            <p className="text-sm text-muted-foreground">Get personalized recommendations</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                onClick={startInterview}
                                disabled={!interviewType}
                                className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 h-12"
                            >
                                <Play className="h-5 w-5 mr-2" />
                                Start Interview
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    }

    if (interviewState === "active") {
        const questions = mockQuestions[interviewType] || []
        const progress = ((currentQuestion + 1) / questions.length) * 100

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
                                <h1 className="text-xl font-bold">AI Interview in Progress</h1>
                                <p className="text-sm text-muted-foreground">
                                    Question {currentQuestion + 1} of {questions.length}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-mono">{formatTime(duration)}</span>
                                </div>
                                <Badge className={isRecording ? "bg-red-600" : "bg-gray-600"}>
                                    {isRecording ? "Recording" : "Paused"}
                                </Badge>
                            </div>
                        </div>
                        <Progress value={progress} className="mt-2" />
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-3 flex-1">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="flex-1">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bot className="h-5 w-5 text-[#e78a53]" />
                                        AI Interviewer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="text-center">
                                        <Avatar className="h-24 w-24 mx-auto mb-4">
                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#e78a53] to-[#e78a53]/70 rounded-full">
                                                <Bot className="h-12 w-12 text-white" />
                                            </div>
                                        </Avatar>
                                        <h3 className="font-semibold text-lg mb-2">Sarah AI</h3>
                                        <p className="text-sm text-muted-foreground">Senior Technical Interviewer</p>
                                    </div>

                                    <div className="bg-muted/30 p-6 rounded-lg">
                                        <h4 className="font-medium mb-3">Current Question:</h4>
                                        <p className="text-lg leading-relaxed">{questions[currentQuestion]}</p>
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsRecording(!isRecording)}
                                        >
                                            {isRecording ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                            {isRecording ? "Pause" : "Resume"}
                                        </Button>
                                        <Button onClick={nextQuestion} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                                            {currentQuestion === questions.length - 1 ? "Complete Interview" : "Next Question"}
                                        </Button>
                                        <Button variant="outline" onClick={completeInterview}>
                                            <Square className="h-4 w-4 mr-2" />
                                            End Interview
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Your Video</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                                        {isVideoOn ? (
                                            <div className="text-white text-center">
                                                <Camera className="h-8 w-8 mx-auto mb-2" />
                                                <p className="text-sm">Camera Active</p>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 text-center">
                                                <VideoOff className="h-8 w-8 mx-auto mb-2" />
                                                <p className="text-sm">Camera Off</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setIsVideoOn(!isVideoOn)}
                                            className="flex-1"
                                        >
                                            {isVideoOn ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setIsMuted(!isMuted)}
                                            className="flex-1"
                                        >
                                            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Real-time Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Confidence</span>
                                            <span>85%</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Clarity</span>
                                            <span>78%</span>
                                        </div>
                                        <Progress value={78} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Eye Contact</span>
                                            <span>92%</span>
                                        </div>
                                        <Progress value={92} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Speaking Pace</span>
                                            <span>88%</span>
                                        </div>
                                        <Progress value={88} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (interviewState === "completed" && feedback) {
        return (
            <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-auto">
                <div className="max-w-6xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Interview Completed!</h1>
                        <p className="text-muted-foreground">
                            Duration: {formatTime(duration)} • {mockQuestions[interviewType].length} questions answered
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-4">
                        <ScoreCard title="Communication" score={feedback.categories.communication} icon={MessageSquare} />
                        <ScoreCard title="Technical Skills" score={feedback.categories.technical} icon={Code} />
                        <ScoreCard title="Confidence" score={feedback.categories.confidence} icon={TrendingUp} />
                        <ScoreCard title="Clarity" score={feedback.categories.clarity} icon={Target} />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-[#e78a53]" />
                                Overall Performance: {feedback.overallScore}%
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Progress value={feedback.overallScore} className="h-4" />
                            </div>
                            <p className="text-muted-foreground">
                                {feedback.overallScore >= 90 ? "Excellent performance! You're well-prepared for interviews." :
                                    feedback.overallScore >= 75 ? "Good performance with room for some improvements." :
                                        feedback.overallScore >= 60 ? "Decent performance, focus on the improvement areas." :
                                            "Practice more to improve your interview skills."}
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-600">
                                    <ThumbsUp className="h-5 w-5" />
                                    Strengths
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {feedback.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span className="text-sm">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-orange-600">
                                    <AlertCircle className="h-5 w-5" />
                                    Areas for Improvement
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {feedback.improvements.map((improvement, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <XCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                                            <span className="text-sm">{improvement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-600" />
                                Recommendations for Next Interview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2">
                                {feedback.recommendations.map((recommendation, index) => (
                                    <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                                        <Zap className="h-4 w-4 text-[#e78a53] mt-0.5" />
                                        <span className="text-sm">{recommendation}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center gap-4">
                        <Button onClick={resetInterview} variant="outline">
                            Practice Again
                        </Button>
                        <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                            <FileText className="h-4 w-4 mr-2" />
                            Download Report
                        </Button>
                        <Button variant="outline">
                            <Users className="h-4 w-4 mr-2" />
                            Share Results
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}
