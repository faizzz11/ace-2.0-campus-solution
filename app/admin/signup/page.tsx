"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    FileText,
    Building,
    Shield,
    GraduationCap,
    Calendar,
    Award,
    ChevronLeft,
    ChevronRight,
    CheckCircle
} from "lucide-react"

export default function AdminSignupPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        // Personal Information
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",

        // Professional Information
        institution: "",
        department: "",
        position: "",
        employeeId: "",
        yearsOfExperience: "",

        // Admin Request Details
        requestReason: "",
        accessLevel: "",
        supervisorName: "",
        supervisorEmail: "",
        additionalInfo: ""
    })

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Store admin request data
        localStorage.setItem('adminRequestData', JSON.stringify(formData))

        setIsLoading(false)
        // Redirect to a confirmation page or show success message
        window.location.href = '/admin/login'
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                    <User className="h-6 w-6 text-[#e78a53]" />
                                </div>
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">First Name</Label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        placeholder="Enter first name"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Last Name</Label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        placeholder="Enter last name"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-[#e78a53]" />
                                    Professional Email
                                </Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your institutional email"
                                    className="bg-background/50 border-border/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-[#e78a53]" />
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Create password"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirm password"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#e78a53]" />
                                    Phone Number
                                </Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="Enter phone number"
                                    className="bg-background/50 border-border/50"
                                />
                            </div>
                        </CardContent>
                    </Card>
                )

            case 2:
                return (
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                    <Building className="h-6 w-6 text-[#e78a53]" />
                                </div>
                                Professional Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-foreground flex items-center gap-2">
                                    <Building className="h-4 w-4 text-[#e78a53]" />
                                    Institution/University
                                </Label>
                                <Input
                                    value={formData.institution}
                                    onChange={(e) => handleInputChange('institution', e.target.value)}
                                    placeholder="Enter your institution name"
                                    className="bg-background/50 border-border/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Department</Label>
                                    <Input
                                        value={formData.department}
                                        onChange={(e) => handleInputChange('department', e.target.value)}
                                        placeholder="e.g., Computer Science"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Position/Role</Label>
                                    <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                                        <SelectTrigger className="bg-background/50 border-border/50">
                                            <SelectValue placeholder="Select your position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="professor">Professor</SelectItem>
                                            <SelectItem value="associate-professor">Associate Professor</SelectItem>
                                            <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                                            <SelectItem value="lecturer">Lecturer</SelectItem>
                                            <SelectItem value="department-head">Department Head</SelectItem>
                                            <SelectItem value="dean">Dean</SelectItem>
                                            <SelectItem value="administrator">Administrator</SelectItem>
                                            <SelectItem value="it-staff">IT Staff</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Employee ID</Label>
                                    <Input
                                        value={formData.employeeId}
                                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                        placeholder="Enter your employee ID"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#e78a53]" />
                                        Years of Experience
                                    </Label>
                                    <Select value={formData.yearsOfExperience} onValueChange={(value) => handleInputChange('yearsOfExperience', value)}>
                                        <SelectTrigger className="bg-background/50 border-border/50">
                                            <SelectValue placeholder="Select experience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-2">0-2 years</SelectItem>
                                            <SelectItem value="3-5">3-5 years</SelectItem>
                                            <SelectItem value="6-10">6-10 years</SelectItem>
                                            <SelectItem value="11-15">11-15 years</SelectItem>
                                            <SelectItem value="16+">16+ years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )

            case 3:
                return (
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                                    <Shield className="h-6 w-6 text-[#e78a53]" />
                                </div>
                                Admin Access Request
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-foreground">Requested Access Level</Label>
                                <Select value={formData.accessLevel} onValueChange={(value) => handleInputChange('accessLevel', value)}>
                                    <SelectTrigger className="bg-background/50 border-border/50">
                                        <SelectValue placeholder="Select access level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="faculty-admin">Faculty Administrator</SelectItem>
                                        <SelectItem value="club-admin">Club Administrator</SelectItem>
                                        <SelectItem value="project-admin">Project Administrator</SelectItem>
                                        <SelectItem value="system-admin">System Administrator</SelectItem>
                                        <SelectItem value="super-admin">Super Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-[#e78a53]" />
                                    Reason for Request
                                </Label>
                                <Textarea
                                    value={formData.requestReason}
                                    onChange={(e) => handleInputChange('requestReason', e.target.value)}
                                    placeholder="Explain why you need admin access and how you plan to use it..."
                                    className="bg-background/50 border-border/50 min-h-[100px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-foreground">Supervisor/Approver Name</Label>
                                    <Input
                                        value={formData.supervisorName}
                                        onChange={(e) => handleInputChange('supervisorName', e.target.value)}
                                        placeholder="Enter supervisor's name"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-foreground">Supervisor Email</Label>
                                    <Input
                                        type="email"
                                        value={formData.supervisorEmail}
                                        onChange={(e) => handleInputChange('supervisorEmail', e.target.value)}
                                        placeholder="Enter supervisor's email"
                                        className="bg-background/50 border-border/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground">Additional Information (Optional)</Label>
                                <Textarea
                                    value={formData.additionalInfo}
                                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                                    placeholder="Any additional information that might help with your request..."
                                    className="bg-background/50 border-border/50 min-h-[80px]"
                                />
                            </div>

                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="p-1 bg-yellow-500/20 rounded">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-yellow-500"
                                        >
                                            <path d="m21 16-4 4-4-4" />
                                            <path d="M17 20V4" />
                                            <path d="m3 8 4-4 4 4" />
                                            <path d="M7 4v16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-600 mb-1">Request Review Process</h4>
                                        <p className="text-xs text-yellow-700">
                                            Your admin access request will be reviewed by the IT team and your designated supervisor.
                                            Approval typically takes 2-5 business days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Link
                href="/"
                className="absolute top-6 left-6 z-20 text-zinc-400 hover:text-[#e78a53] transition-colors duration-200 flex items-center space-x-2"
            >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Home</span>
            </Link>

            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-[#e78a53]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#e78a53]/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Request Admin Access</h1>
                    <p className="text-zinc-400">Submit your request for administrative privileges in 3 steps</p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step
                                        ? 'bg-[#e78a53] border-[#e78a53] text-white'
                                        : 'bg-transparent border-zinc-600 text-zinc-600'
                                    }`}>
                                    {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                                </div>
                                {step < 3 && (
                                    <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${currentStep > step ? 'bg-[#e78a53]' : 'bg-zinc-600'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    {renderStep()}
                </motion.div>

                <div className="flex justify-between">
                    <Button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            onClick={nextStep}
                            className="bg-[#e78a53] hover:bg-[#e78a53]/90 flex items-center gap-2"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-[#e78a53] hover:bg-[#e78a53]/90 flex items-center gap-2"
                        >
                            {isLoading ? "Submitting Request..." : "Submit Request"}
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-zinc-400">
                        Already have admin access?{" "}
                        <Link href="/admin/login" className="text-[#e78a53] hover:text-[#e78a53]/80 font-medium">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
