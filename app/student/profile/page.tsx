"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Save,
  Edit3,
  Github,
  Linkedin,
  ExternalLink,
  Settings
} from "lucide-react"

export default function ProfileSettingsPage() {
  const [userData, setUserData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      // Default empty structure if no data found
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        city: "",
        bio: "",
        degreeType: "",
        fieldOfStudy: "",
        institution: "",
        graduationYear: "",
        resume: null,
        descriptions: [],
        skills: [],
        workExperience: [],
        links: []
      })
    }
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleDescriptionToggle = (description: string) => {
    setUserData((prev: any) => ({
      ...prev,
      descriptions: prev.descriptions.includes(description)
        ? prev.descriptions.filter((d: string) => d !== description)
        : [...prev.descriptions, description]
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !userData.skills.includes(newSkill.trim())) {
      setUserData((prev: any) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setUserData((prev: any) => ({ ...prev, skills: prev.skills.filter((s: string) => s !== skill) }))
  }

  const addWorkExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      duration: "",
      type: "internship"
    }
    setUserData((prev: any) => ({ ...prev, workExperience: [...prev.workExperience, newExp] }))
  }

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setUserData((prev: any) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp: any) => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeWorkExperience = (id: string) => {
    setUserData((prev: any) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp: any) => exp.id !== id)
    }))
  }

  const addLink = () => {
    if (newLink.platform && newLink.url) {
      const linkId = Date.now().toString()
      setUserData((prev: any) => ({
        ...prev,
        links: [...prev.links, { id: linkId, ...newLink }]
      }))
      setNewLink({ platform: "", url: "" })
    }
  }

  const removeLink = (id: string) => {
    setUserData((prev: any) => ({
      ...prev,
      links: prev.links.filter((link: any) => link.id !== id)
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUserData((prev: any) => ({ ...prev, resume: file }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem('userData', JSON.stringify(userData))
    
    setIsSaving(false)
    setIsEditing(false)
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#e78a53]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-2xl border border-[#e78a53]/20">
              <Settings className="h-10 w-10 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-muted-foreground text-lg">Manage your account information and preferences</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsEditing(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-[#e78a53] hover:bg-[#e78a53]/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-h-[calc(100vh-12rem)]">
        {/* Match dashboard layout with 3 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6 w-full"
        >
          {/* About Section */}
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
                    value={userData.firstName || ""}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    className="bg-background/50 border-border/50"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Last Name</Label>
                  <Input
                    value={userData.lastName || ""}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    className="bg-background/50 border-border/50"
                    disabled={!isEditing}
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
                  value={userData.email || ""}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="bg-background/50 border-border/50"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#e78a53]" />
                    Phone Number
                  </Label>
                  <Input
                    value={userData.phone || ""}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className="bg-background/50 border-border/50"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Gender</Label>
                  <Select 
                    value={userData.gender || ""} 
                    onValueChange={(value) => handleInputChange('gender', value)}
                    disabled={!isEditing}
                  >
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
                  value={userData.city || ""}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                  className="bg-background/50 border-border/50"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#e78a53]" />
                  Bio
                </Label>
                <Textarea
                  value={userData.bio || ""}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="bg-background/50 border-border/50 min-h-[100px]"
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Education Section */}
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
                  <Select 
                    value={userData.degreeType || ""} 
                    onValueChange={(value) => handleInputChange('degreeType', value)}
                    disabled={!isEditing}
                  >
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
                    value={userData.fieldOfStudy || ""}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="bg-background/50 border-border/50"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#e78a53]" />
                  Institution
                </Label>
                <Input
                  value={userData.institution || ""}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  placeholder="Enter your institution name"
                  className="bg-background/50 border-border/50"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#e78a53]" />
                  Year of Graduation
                </Label>
                <Select 
                  value={userData.graduationYear || ""} 
                  onValueChange={(value) => handleInputChange('graduationYear', value)}
                  disabled={!isEditing}
                >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 w-full"
        >
          {/* Experience Section */}
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
              {isEditing && (
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
                        {userData.resume ? userData.resume.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                    </label>
                  </div>
                </div>
              )}

              {userData.resume && !isEditing && (
                <div className="p-4 bg-background/30 rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                      <FileText className="h-4 w-4 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Resume Uploaded</p>
                      <p className="text-sm text-muted-foreground">{userData.resume.name || 'resume.pdf'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <Label className="text-foreground">What Describes You Best?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {descriptions.map((desc) => (
                    <div
                      key={desc.id}
                      onClick={() => isEditing && handleDescriptionToggle(desc.id)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        isEditing ? 'cursor-pointer' : 'cursor-default'
                      } ${
                        userData.descriptions?.includes(desc.id)
                          ? 'bg-[#e78a53]/10 border-[#e78a53]/30'
                          : 'bg-background/30 border-border/30 hover:bg-background/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          userData.descriptions?.includes(desc.id) 
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
                {isEditing && (
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
                )}
                <div className="flex flex-wrap gap-2">
                  {userData.skills?.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {skill}
                      {isEditing && (
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => removeSkill(skill)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-foreground">Work Experience</Label>
                    <Button onClick={addWorkExperience} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  {userData.workExperience?.map((exp: any) => (
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
              )}

              {!isEditing && userData.workExperience?.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-foreground">Work Experience</Label>
                  {userData.workExperience.map((exp: any) => (
                    <div key={exp.id} className="p-4 bg-background/30 rounded-lg border border-border/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                          <Badge variant="outline" className="mt-2 text-xs capitalize">{exp.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Links Section */}
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
              {isEditing && (
                <div className="space-y-4">
                  <Label className="text-foreground">Social & Professional Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={newLink.platform} onValueChange={(value) => setNewLink({...newLink, platform: value})}>
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
                      onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                      className="bg-background/50 border-border/50"
                    />
                    <Button onClick={addLink} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {userData.links?.map((link: any) => (
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
                    {isEditing && (
                      <Button 
                        onClick={() => removeLink(link.id)}
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
