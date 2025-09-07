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
  GraduationCap,
  BookOpen,
  Calendar,
  Building,
  Upload,
  Code,
  Palette,
  Database,
  Brain,
  Smartphone,
  Globe,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle
} from "lucide-react"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Section 1: About
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    city: "",
    bio: "",

    // Section 2: Education  
    degreeType: "",
    fieldOfStudy: "",
    institution: "",
    graduationYear: "",

    // Section 3: Experience
    resume: null as File | null,
    descriptions: [] as string[],
    skills: [] as string[],
    workExperience: [] as Array<{ id: string, title: string, company: string, duration: string, type: string }>,

    // Section 4: Links
    links: [] as Array<{ id: string, platform: string, url: string }>
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLink, setNewLink] = useState({ platform: "", url: "" })

  const descriptions = [
    { id: "frontend", label: "Frontend Developer", icon: <Code className="h-4 w-4" /> },
    { id: "backend", label: "Backend Developer", icon: <Database className="h-4 w-4" /> },
    { id: "fullstack", label: "Full Stack Developer", icon: <Globe className="h-4 w-4" /> },
    { id: "mobile", label: "Mobile Developer", icon: <Smartphone className="h-4 w-4" /> },
    { id: "aiml", label: "AI/ML Engineer", icon: <Brain className="h-4 w-4" /> },
    { id: "designer", label: "UI/UX Designer", icon: <Palette className="h-4 w-4" /> },
    { id: "blockchain", label: "Blockchain Developer", icon: <Database className="h-4 w-4" /> },
    { id: "devops", label: "DevOps Engineer", icon: <Building className="h-4 w-4" /> }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDescriptionToggle = (description: string) => {
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.includes(description)
        ? prev.descriptions.filter(d => d !== description)
        : [...prev.descriptions, description]
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const addWorkExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      duration: "",
      type: "internship"
    }
    setFormData(prev => ({ ...prev, workExperience: [...prev.workExperience, newExp] }))
  }

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeWorkExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }))
  }

  const addLink = () => {
    if (newLink.platform && newLink.url) {
      const linkId = Date.now().toString()
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { id: linkId, ...newLink }]
      }))
      setNewLink({ platform: "", url: "" })
    }
  }

  const removeLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(formData))
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', JSON.stringify({
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email
    }))

    setIsLoading(false)
    window.location.href = '/student/dashboard'
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
                About You
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
                  Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label className="text-foreground">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#e78a53]" />
                  City
                </Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#e78a53]" />
                  Bio (Optional)
                </Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="bg-background/50 border-border/50 min-h-[100px]"
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
                  <GraduationCap className="h-6 w-6 text-[#e78a53]" />
                </div>
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Degree Type</Label>
                  <Select value={formData.degreeType} onValueChange={(value) => handleInputChange('degreeType', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="highschool">High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#e78a53]" />
                    Field of Study / Branch
                  </Label>
                  <Input
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#e78a53]" />
                  Institution
                </Label>
                <Input
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  placeholder="Enter your institution name"
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#e78a53]" />
                  Year of Graduation
                </Label>
                <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange('graduationYear', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Code className="h-6 w-6 text-[#e78a53]" />
                </div>
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-foreground flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#e78a53]" />
                  Upload Resume
                </Label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-[#e78a53] mx-auto mb-2" />
                    <p className="text-foreground">
                      {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                    </p>
                    <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground">What Describes You Best?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {descriptions.map((desc) => (
                    <div
                      key={desc.id}
                      onClick={() => handleDescriptionToggle(desc.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${formData.descriptions.includes(desc.id)
                          ? 'bg-[#e78a53]/10 border-[#e78a53]/30'
                          : 'bg-background/30 border-border/30 hover:bg-background/50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${formData.descriptions.includes(desc.id)
                            ? 'bg-[#e78a53]/20'
                            : 'bg-muted/50'
                          }`}>
                          {desc.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground">{desc.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground">Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., React, Node.js)"
                    className="bg-background/50 border-border/50"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button onClick={addSkill} size="icon" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {skill}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-foreground">Work Experience (Optional)</Label>
                  <Button onClick={addWorkExperience} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                {formData.workExperience.map((exp) => (
                  <Card key={exp.id} className="bg-background/30 border-border/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <Input
                            placeholder="Job Title"
                            value={exp.title}
                            onChange={(e) => updateWorkExperience(exp.id, 'title', e.target.value)}
                            className="bg-background/50 border-border/50"
                          />
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                            className="bg-background/50 border-border/50"
                          />
                          <Input
                            placeholder="Duration (e.g., 6 months)"
                            value={exp.duration}
                            onChange={(e) => updateWorkExperience(exp.id, 'duration', e.target.value)}
                            className="bg-background/50 border-border/50"
                          />
                          <Select value={exp.type} onValueChange={(value) => updateWorkExperience(exp.id, 'type', value)}>
                            <SelectTrigger className="bg-background/50 border-border/50">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="part-time">Part Time</SelectItem>
                              <SelectItem value="full-time">Full Time</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={() => removeWorkExperience(exp.id)}
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <ExternalLink className="h-6 w-6 text-[#e78a53]" />
                </div>
                Links and Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-foreground">Social & Professional Links</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={newLink.platform} onValueChange={(value) => setNewLink({ ...newLink, platform: value })}>
                      <SelectTrigger className="bg-background/50 border-border/50">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="behance">Behance</SelectItem>
                        <SelectItem value="dribbble">Dribbble</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="URL"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="bg-background/50 border-border/50"
                    />
                    <Button onClick={addLink} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.links.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                          {link.platform === 'linkedin' && <Linkedin className="h-4 w-4 text-[#e78a53]" />}
                          {link.platform === 'github' && <Github className="h-4 w-4 text-[#e78a53]" />}
                          {link.platform !== 'linkedin' && link.platform !== 'github' && <ExternalLink className="h-4 w-4 text-[#e78a53]" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground capitalize">{link.platform}</p>
                          <p className="text-sm text-muted-foreground">{link.url}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeLink(link.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
          <h1 className="text-4xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-zinc-400">Join our campus community in just 4 simple steps</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step
                    ? 'bg-[#e78a53] border-[#e78a53] text-white'
                    : 'bg-transparent border-zinc-600 text-zinc-600'
                  }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
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

          {currentStep < 4 ? (
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
              {isLoading ? "Creating Account..." : "Complete Signup"}
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#e78a53] hover:text-[#e78a53]/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
