"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Upload,
    FileText,
    Download,
    Eye,
    Star,
    AlertCircle,
    CheckCircle,
    XCircle,
    Zap,
    Brain,
    Target,
    TrendingUp,
    Award,
    Lightbulb,
    RefreshCw,
    Share,
    Save,
    Copy,
    Trash2,
    Edit3,
    Plus,
    Users,
    Briefcase,
    GraduationCap,
    Code,
    Calendar,
    MapPin,
    Mail,
    Phone,
    Globe,
    Linkedin
} from "lucide-react"

export default function AIResumeAnalyzerPage() {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [improvedResume, setImprovedResume] = useState(null)
    const [activeTab, setActiveTab] = useState("upload")
    const fileInputRef = useRef(null)

    // Mock analysis result
    const mockAnalysis = {
        overallScore: 76,
        sections: {
            format: { score: 85, status: "good" },
            content: { score: 72, status: "needs_improvement" },
            keywords: { score: 68, status: "needs_improvement" },
            experience: { score: 82, status: "good" },
            skills: { score: 70, status: "average" },
            education: { score: 90, status: "excellent" }
        },
        strengths: [
            "Clear and professional formatting",
            "Strong educational background",
            "Good use of action verbs",
            "Relevant technical skills listed",
            "Consistent date formatting"
        ],
        weaknesses: [
            "Missing quantifiable achievements",
            "Limited use of industry keywords",
            "Generic objective statement",
            "No mention of certifications",
            "Could benefit from more specific project details"
        ],
        suggestions: [
            {
                type: "critical",
                section: "Experience",
                issue: "Add quantifiable results (e.g., 'Improved efficiency by 30%')",
                impact: "High"
            },
            {
                type: "warning",
                section: "Skills",
                issue: "Include more relevant technologies for target roles",
                impact: "Medium"
            },
            {
                type: "info",
                section: "Summary",
                issue: "Replace generic objective with compelling professional summary",
                impact: "Medium"
            },
            {
                type: "critical",
                section: "Projects",
                issue: "Add more technical project details and outcomes",
                impact: "High"
            }
        ],
        atsScore: 68,
        industryComparison: {
            technology: 74,
            finance: 71,
            healthcare: 69,
            consulting: 78
        },
        missingKeywords: [
            "Machine Learning", "Data Analysis", "Python", "SQL", "Git",
            "Agile", "Problem Solving", "Team Leadership", "Project Management"
        ]
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file && file.type === "application/pdf") {
            setUploadedFile(file)
            setActiveTab("analyze")
        } else {
            alert("Please upload a PDF file")
        }
    }

    const analyzeResume = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setAnalysisResult(mockAnalysis)
            setIsAnalyzing(false)
            setActiveTab("results")
        }, 3000)
    }

    const generateImprovedResume = () => {
        const improved = {
            personalInfo: {
                name: "Alex Johnson",
                title: "Software Engineer",
                email: "alex.johnson@email.com",
                phone: "+1 (555) 123-4567",
                location: "San Francisco, CA",
                linkedin: "linkedin.com/in/alexjohnson",
                portfolio: "alexjohnson.dev"
            },
            summary: "Results-driven Software Engineer with 3+ years of experience developing scalable web applications. Proven track record of improving system performance by 40% and leading cross-functional teams of 5+ developers. Expertise in Python, JavaScript, and cloud technologies.",
            experience: [
                {
                    title: "Software Engineer",
                    company: "Tech Innovations Inc.",
                    period: "2022 - Present",
                    achievements: [
                        "Developed microservices architecture that improved system scalability by 60%",
                        "Led a team of 5 developers to deliver projects 20% ahead of schedule",
                        "Implemented automated testing reducing bugs by 45%",
                        "Optimized database queries resulting in 30% faster response times"
                    ]
                },
                {
                    title: "Junior Developer",
                    company: "StartupXYZ",
                    period: "2021 - 2022",
                    achievements: [
                        "Built responsive web applications serving 10,000+ users daily",
                        "Collaborated with UX team to improve user engagement by 25%",
                        "Integrated third-party APIs reducing development time by 40%"
                    ]
                }
            ],
            projects: [
                {
                    name: "E-commerce Platform",
                    tech: "React, Node.js, MongoDB",
                    description: "Built full-stack e-commerce platform with payment integration, resulting in 15% increase in conversion rates"
                },
                {
                    name: "Data Analytics Dashboard",
                    tech: "Python, Django, PostgreSQL",
                    description: "Created real-time analytics dashboard processing 1M+ data points, enabling data-driven decisions"
                }
            ],
            skills: {
                technical: ["Python", "JavaScript", "React", "Node.js", "SQL", "MongoDB", "AWS", "Docker", "Git"],
                soft: ["Team Leadership", "Problem Solving", "Agile Development", "Project Management"]
            },
            education: {
                degree: "Bachelor of Science in Computer Science",
                school: "University of California, Berkeley",
                year: "2021",
                gpa: "3.8/4.0"
            }
        }
        setImprovedResume(improved)
        setActiveTab("improved")
    }

    const ScoreCircle = ({ score, size = "large" }) => {
        const circumference = 2 * Math.PI * 40
        const strokeDasharray = circumference
        const strokeDashoffset = circumference - (score / 100) * circumference

        return (
            <div className={`relative ${size === "large" ? "w-24 h-24" : "w-16 h-16"}`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className={`transition-all duration-1000 ${score >= 80 ? "text-green-500" :
                                score >= 60 ? "text-[#e78a53]" : "text-red-500"
                            }`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold ${size === "large" ? "text-xl" : "text-sm"}`}>
                        {score}%
                    </span>
                </div>
            </div>
        )
    }

    const SectionScore = ({ title, score, status }) => {
        const getStatusColor = (status) => {
            switch (status) {
                case "excellent": return "text-green-600 bg-green-50"
                case "good": return "text-blue-600 bg-blue-50"
                case "average": return "text-[#e78a53] bg-orange-50"
                case "needs_improvement": return "text-red-600 bg-red-50"
                default: return "text-gray-600 bg-gray-50"
            }
        }

        return (
            <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                    <h4 className="font-medium">{title}</h4>
                    <Badge className={`text-xs ${getStatusColor(status)}`}>
                        {status.replace("_", " ").toUpperCase()}
                    </Badge>
                </div>
                <ScoreCircle score={score} size="small" />
            </div>
        )
    }

    const SuggestionCard = ({ suggestion }) => {
        const getIcon = (type) => {
            switch (type) {
                case "critical": return <AlertCircle className="h-4 w-4 text-red-600" />
                case "warning": return <XCircle className="h-4 w-4 text-orange-600" />
                case "info": return <Lightbulb className="h-4 w-4 text-blue-600" />
                default: return <CheckCircle className="h-4 w-4 text-green-600" />
            }
        }

        const getBorderColor = (type) => {
            switch (type) {
                case "critical": return "border-red-200 bg-red-50/50"
                case "warning": return "border-orange-200 bg-orange-50/50"
                case "info": return "border-blue-200 bg-blue-50/50"
                default: return "border-green-200 bg-green-50/50"
            }
        }

        return (
            <div className={`p-4 border rounded-lg ${getBorderColor(suggestion.type)}`}>
                <div className="flex items-start gap-3">
                    {getIcon(suggestion.type)}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{suggestion.section}</h4>
                            <Badge variant="outline" className="text-xs">
                                {suggestion.impact} Impact
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{suggestion.issue}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-hidden">
            <div className="h-full flex flex-col max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl font-bold mb-2">AI Resume Analyzer & Improver</h1>
                    <p className="text-muted-foreground">
                        Upload your resume for AI-powered analysis and get personalized improvement suggestions
                    </p>
                </motion.div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="analyze" disabled={!uploadedFile}>Analyze</TabsTrigger>
                        <TabsTrigger value="results" disabled={!analysisResult}>Results</TabsTrigger>
                        <TabsTrigger value="improved" disabled={!improvedResume}>Improved</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="flex-1">
                        <div className="grid gap-6 lg:grid-cols-2 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Upload className="h-5 w-5 text-[#e78a53]" />
                                            Upload Your Resume
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div
                                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-[#e78a53] transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                            <p className="text-lg font-medium mb-2">
                                                {uploadedFile ? uploadedFile.name : "Click to upload your resume"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Supports PDF files up to 10MB
                                            </p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </div>

                                        {uploadedFile && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-green-50 p-4 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="font-medium text-green-800">File uploaded successfully!</p>
                                                        <p className="text-sm text-green-600">{uploadedFile.name}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="space-y-4">
                                            <h3 className="font-medium">What our AI analyzes:</h3>
                                            <div className="grid gap-3">
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Target className="h-4 w-4 text-blue-600" />
                                                    <span>Content structure and formatting</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Brain className="h-4 w-4 text-purple-600" />
                                                    <span>Industry keyword optimization</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                                    <span>ATS compatibility score</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Award className="h-4 w-4 text-[#e78a53]" />
                                                    <span>Achievement quantification</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-yellow-600" />
                                            AI Features
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="p-4 border rounded-lg">
                                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                    Smart Analysis
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Comprehensive resume scoring across multiple dimensions including content, format, and ATS compatibility.
                                                </p>
                                            </div>
                                            <div className="p-4 border rounded-lg">
                                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                                                    Personalized Suggestions
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Get specific, actionable recommendations tailored to your industry and career level.
                                                </p>
                                            </div>
                                            <div className="p-4 border rounded-lg">
                                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                                    <RefreshCw className="h-4 w-4 text-green-600" />
                                                    Auto-Improvement
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Generate an improved version of your resume with AI-enhanced content and formatting.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#e78a53]/10 p-4 rounded-lg">
                                            <h4 className="font-medium mb-2">Pro Tips:</h4>
                                            <ul className="text-sm space-y-1 text-muted-foreground">
                                                <li>• Use a clean, professional format</li>
                                                <li>• Include quantifiable achievements</li>
                                                <li>• Tailor keywords to your target role</li>
                                                <li>• Keep it concise (1-2 pages)</li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </TabsContent>

                    <TabsContent value="analyze" className="flex-1">
                        <Card className="h-full">
                            <CardContent className="flex items-center justify-center h-full">
                                {!isAnalyzing ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-[#e78a53]/10 rounded-full flex items-center justify-center mx-auto">
                                            <Brain className="h-12 w-12 text-[#e78a53]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">Ready to Analyze</h2>
                                            <p className="text-muted-foreground mb-6">
                                                Our AI will analyze your resume and provide detailed feedback
                                            </p>
                                            <Button
                                                onClick={analyzeResume}
                                                className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                                                size="lg"
                                            >
                                                <Zap className="h-5 w-5 mr-2" />
                                                Start Analysis
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center space-y-6"
                                    >
                                        <div className="relative w-24 h-24 mx-auto">
                                            <div className="absolute inset-0 border-4 border-[#e78a53]/20 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-[#e78a53] border-t-transparent rounded-full animate-spin"></div>
                                            <Brain className="absolute inset-0 m-auto h-8 w-8 text-[#e78a53]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">Analyzing Your Resume</h2>
                                            <p className="text-muted-foreground">
                                                AI is processing your resume content, format, and keywords...
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="results" className="flex-1 overflow-auto">
                        {analysisResult && (
                            <div className="space-y-6">
                                <div className="grid gap-6 lg:grid-cols-3">
                                    <Card className="lg:col-span-1">
                                        <CardHeader>
                                            <CardTitle className="text-center">Overall Score</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center space-y-4">
                                            <ScoreCircle score={analysisResult.overallScore} />
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground">
                                                    {analysisResult.overallScore >= 80 ? "Excellent resume!" :
                                                        analysisResult.overallScore >= 60 ? "Good with improvements needed" :
                                                            "Needs significant improvements"}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={generateImprovedResume}
                                                className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90"
                                            >
                                                <RefreshCw className="h-4 w-4 mr-2" />
                                                Generate Improved Version
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="lg:col-span-2">
                                        <CardHeader>
                                            <CardTitle>Section Breakdown</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                {Object.entries(analysisResult.sections).map(([key, section]) => (
                                                    <SectionScore
                                                        key={key}
                                                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                        score={section.score}
                                                        status={section.status}
                                                    />
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-green-600">
                                                <CheckCircle className="h-5 w-5" />
                                                Strengths
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {analysisResult.strengths.map((strength, index) => (
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
                                            <CardTitle className="flex items-center gap-2 text-red-600">
                                                <XCircle className="h-5 w-5" />
                                                Areas to Improve
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {analysisResult.weaknesses.map((weakness, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                                        <span className="text-sm">{weakness}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Lightbulb className="h-5 w-5 text-[#e78a53]" />
                                            Improvement Suggestions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3 md:grid-cols-2">
                                            {analysisResult.suggestions.map((suggestion, index) => (
                                                <SuggestionCard key={index} suggestion={suggestion} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>ATS Compatibility</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-4 mb-4">
                                                <ScoreCircle score={analysisResult.atsScore} size="small" />
                                                <div>
                                                    <p className="font-medium">ATS Score: {analysisResult.atsScore}%</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Applicant Tracking System compatibility
                                                    </p>
                                                </div>
                                            </div>
                                            <Progress value={analysisResult.atsScore} className="mb-2" />
                                            <p className="text-xs text-muted-foreground">
                                                {analysisResult.atsScore >= 80 ? "Excellent ATS compatibility" :
                                                    analysisResult.atsScore >= 60 ? "Good, with room for improvement" :
                                                        "Needs optimization for ATS systems"}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Missing Keywords</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {analysisResult.missingKeywords.slice(0, 8).map((keyword, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {keyword}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-3">
                                                Consider adding these relevant keywords to improve visibility
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="improved" className="flex-1 overflow-auto">
                        {improvedResume && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold">AI-Improved Resume</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Enhanced version with optimized content and formatting
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">
                                            <Eye className="h-4 w-4 mr-2" />
                                            Preview
                                        </Button>
                                        <Button variant="outline">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download PDF
                                        </Button>
                                        <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>

                                <Card>
                                    <CardContent className="p-8 space-y-8">
                                        {/* Header Section */}
                                        <div className="text-center border-b pb-6">
                                            <h1 className="text-3xl font-bold mb-2">{improvedResume.personalInfo.name}</h1>
                                            <h2 className="text-xl text-[#e78a53] mb-4">{improvedResume.personalInfo.title}</h2>
                                            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Mail className="h-4 w-4" />
                                                    {improvedResume.personalInfo.email}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Phone className="h-4 w-4" />
                                                    {improvedResume.personalInfo.phone}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {improvedResume.personalInfo.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Linkedin className="h-4 w-4" />
                                                    {improvedResume.personalInfo.linkedin}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Globe className="h-4 w-4" />
                                                    {improvedResume.personalInfo.portfolio}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Summary */}
                                        <div>
                                            <h3 className="text-lg font-bold mb-3 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                PROFESSIONAL SUMMARY
                                            </h3>
                                            <p className="text-sm leading-relaxed">{improvedResume.summary}</p>
                                        </div>

                                        {/* Experience */}
                                        <div>
                                            <h3 className="text-lg font-bold mb-4 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                PROFESSIONAL EXPERIENCE
                                            </h3>
                                            <div className="space-y-6">
                                                {improvedResume.experience.map((exp, index) => (
                                                    <div key={index}>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-semibold">{exp.title}</h4>
                                                                <p className="text-sm text-muted-foreground">{exp.company}</p>
                                                            </div>
                                                            <Badge variant="outline" className="text-xs">
                                                                {exp.period}
                                                            </Badge>
                                                        </div>
                                                        <ul className="space-y-1 text-sm">
                                                            {exp.achievements.map((achievement, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <span className="text-[#e78a53] mt-1">•</span>
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Projects */}
                                        <div>
                                            <h3 className="text-lg font-bold mb-4 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                KEY PROJECTS
                                            </h3>
                                            <div className="space-y-4">
                                                {improvedResume.projects.map((project, index) => (
                                                    <div key={index}>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-semibold">{project.name}</h4>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {project.tech}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{project.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-bold mb-3 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                    TECHNICAL SKILLS
                                                </h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {improvedResume.skills.technical.map((skill, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-3 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                    SOFT SKILLS
                                                </h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {improvedResume.skills.soft.map((skill, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div>
                                            <h3 className="text-lg font-bold mb-3 text-[#e78a53] border-b border-[#e78a53]/20 pb-1">
                                                EDUCATION
                                            </h3>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold">{improvedResume.education.degree}</h4>
                                                    <p className="text-sm text-muted-foreground">{improvedResume.education.school}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="outline" className="text-xs mb-1">
                                                        {improvedResume.education.year}
                                                    </Badge>
                                                    <p className="text-sm text-muted-foreground">
                                                        GPA: {improvedResume.education.gpa}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
