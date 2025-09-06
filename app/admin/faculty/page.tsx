"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  GraduationCap,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Users,
  Star,
  Award,
  Target,
  UserPlus,
  Clock,
  BookOpen,
  Settings,
  AlertCircle,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Building,
  Briefcase,
  FileText,
  Presentation
} from "lucide-react"

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      position: "Professor",
      specialization: ["Artificial Intelligence", "Machine Learning", "Data Science"],
      office: "Tech Building 301",
      officeHours: "Monday & Wednesday 2-4 PM",
      bio: "Dr. Wilson is a leading researcher in AI and machine learning with over 15 years of experience.",
      courses: ["CS 301 - AI Fundamentals", "CS 450 - Advanced ML"],
      research: ["Deep Learning", "Computer Vision", "NLP"],
      publications: 45,
      experience: "15 years",
      education: "PhD in Computer Science - MIT",
      status: "active",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Computer Science",
      position: "Associate Professor",
      specialization: ["Software Engineering", "Web Development", "Database Systems"],
      office: "Tech Building 205",
      officeHours: "Tuesday & Thursday 1-3 PM",
      bio: "Prof. Chen specializes in modern software development practices and database optimization.",
      courses: ["CS 250 - Software Engineering", "CS 350 - Database Systems"],
      research: ["Software Architecture", "Cloud Computing", "DevOps"],
      publications: 28,
      experience: "10 years",
      education: "PhD in Software Engineering - Stanford",
      status: "active",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Green",
      email: "emily.green@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Environmental Engineering",
      position: "Professor",
      specialization: ["Sustainable Energy", "Environmental Monitoring", "Green Technology"],
      office: "Science Building 405",
      officeHours: "Friday 10 AM - 12 PM",
      bio: "Dr. Green is an expert in sustainable technologies and environmental conservation.",
      courses: ["ENV 201 - Environmental Systems", "ENV 401 - Renewable Energy"],
      research: ["Solar Energy", "Environmental Sensors", "Sustainability"],
      publications: 38,
      experience: "12 years",
      education: "PhD in Environmental Engineering - UC Berkeley",
      status: "active",
      image: "/placeholder.jpg"
    }
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI & Ethics Symposium",
      description: "A comprehensive discussion on the ethical implications of artificial intelligence in modern society.",
      organizer: "Dr. Sarah Wilson",
      department: "Computer Science",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      capacity: 200,
      registered: 145,
      type: "Symposium",
      status: "upcoming",
      speakers: ["Dr. Sarah Wilson", "Guest Speaker: Dr. Alan Turing Jr.", "Industry Expert: Jane Doe"],
      agenda: ["Opening Remarks", "Keynote: AI Ethics", "Panel Discussion", "Networking Lunch"],
      requirements: "Open to all students and faculty",
      registration_deadline: "2024-02-10",
      contact: "sarah.wilson@university.edu"
    },
    {
      id: 2,
      title: "Sustainable Engineering Workshop",
      description: "Hands-on workshop covering latest sustainable engineering practices and green technologies.",
      organizer: "Dr. Emily Green",
      department: "Environmental Engineering",
      date: "2024-02-20",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Lab 102",
      capacity: 50,
      registered: 38,
      type: "Workshop",
      status: "upcoming",
      speakers: ["Dr. Emily Green", "Industry Partner: GreenTech Corp"],
      agenda: ["Sustainable Design Principles", "Hands-on Lab Work", "Project Presentations"],
      requirements: "Engineering students preferred",
      registration_deadline: "2024-02-15",
      contact: "emily.green@university.edu"
    },
    {
      id: 3,
      title: "Software Development Best Practices",
      description: "Learn industry-standard software development methodologies and tools.",
      organizer: "Prof. Michael Chen",
      department: "Computer Science",
      date: "2024-02-25",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Lab A",
      capacity: 80,
      registered: 65,
      type: "Workshop",
      status: "upcoming",
      speakers: ["Prof. Michael Chen", "Senior Developer: Tech Company"],
      agenda: ["Agile Methodologies", "Code Review Practices", "Testing Strategies"],
      requirements: "Basic programming knowledge required",
      registration_deadline: "2024-02-20",
      contact: "michael.chen@university.edu"
    }
  ])

  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    specialization: "",
    office: "",
    officeHours: "",
    bio: "",
    courses: "",
    research: "",
    education: "",
    experience: ""
  })

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    organizer: "",
    department: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    type: "",
    speakers: "",
    agenda: "",
    requirements: "",
    registration_deadline: ""
  })

  const [isCreateFacultyOpen, setIsCreateFacultyOpen] = useState(false)
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)

  const handleCreateFaculty = () => {
    const faculty_member = {
      id: faculty.length + 1,
      ...newFaculty,
      specialization: newFaculty.specialization.split(',').map(s => s.trim()),
      courses: newFaculty.courses.split(',').map(c => c.trim()),
      research: newFaculty.research.split(',').map(r => r.trim()),
      publications: 0,
      status: "active",
      image: "/placeholder.jpg"
    }
    setFaculty([...faculty, faculty_member])
    setNewFaculty({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      specialization: "",
      office: "",
      officeHours: "",
      bio: "",
      courses: "",
      research: "",
      education: "",
      experience: ""
    })
    setIsCreateFacultyOpen(false)
  }

  const handleCreateEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      capacity: parseInt(newEvent.capacity),
      registered: 0,
      status: "upcoming",
      speakers: newEvent.speakers.split(',').map(s => s.trim()),
      agenda: newEvent.agenda.split(',').map(a => a.trim()),
      contact: newEvent.organizer.toLowerCase().replace(' ', '.') + '@university.edu'
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      organizer: "",
      department: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      type: "",
      speakers: "",
      agenda: "",
      requirements: "",
      registration_deadline: ""
    })
    setIsCreateEventOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "upcoming":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Professor":
        return "bg-purple-500/10 text-purple-500"
      case "Associate Professor":
        return "bg-blue-500/10 text-blue-500"
      case "Assistant Professor":
        return "bg-green-500/10 text-green-500"
      case "Lecturer":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl border border-purple-500/20">
              <GraduationCap className="h-10 w-10 text-purple-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Faculty Management</h1>
              <p className="text-muted-foreground text-lg">Manage faculty profiles, events, and academic activities</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20 px-4 py-2 text-sm">
              <GraduationCap className="h-4 w-4 mr-2" />
              {faculty.length} Faculty
            </Badge>
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-4 py-2 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              {events.length} Events
            </Badge>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faculty">Faculty Directory</TabsTrigger>
          <TabsTrigger value="events">Events & Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="faculty" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Faculty Members</h2>
            <Dialog open={isCreateFacultyOpen} onOpenChange={setIsCreateFacultyOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Faculty Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Faculty Member</DialogTitle>
                  <DialogDescription>
                    Add a new faculty member to the directory
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                        placeholder="john.smith@university.edu"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={newFaculty.phone}
                        onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Office</Label>
                      <Input
                        value={newFaculty.office}
                        onChange={(e) => setNewFaculty({...newFaculty, office: e.target.value})}
                        placeholder="Building Room Number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={newFaculty.department} onValueChange={(value) => setNewFaculty({...newFaculty, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Environmental Engineering">Environmental Engineering</SelectItem>
                          <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                          <SelectItem value="Business Administration">Business Administration</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select value={newFaculty.position} onValueChange={(value) => setNewFaculty({...newFaculty, position: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                          <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                          <SelectItem value="Lecturer">Lecturer</SelectItem>
                          <SelectItem value="Visiting Professor">Visiting Professor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Office Hours</Label>
                    <Input
                      value={newFaculty.officeHours}
                      onChange={(e) => setNewFaculty({...newFaculty, officeHours: e.target.value})}
                      placeholder="Monday & Wednesday 2-4 PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={newFaculty.bio}
                      onChange={(e) => setNewFaculty({...newFaculty, bio: e.target.value})}
                      placeholder="Brief biography and background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization (comma-separated)</Label>
                    <Input
                      value={newFaculty.specialization}
                      onChange={(e) => setNewFaculty({...newFaculty, specialization: e.target.value})}
                      placeholder="AI, Machine Learning, Data Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Courses Teaching (comma-separated)</Label>
                    <Input
                      value={newFaculty.courses}
                      onChange={(e) => setNewFaculty({...newFaculty, courses: e.target.value})}
                      placeholder="CS 301, CS 450"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Research Interests (comma-separated)</Label>
                    <Input
                      value={newFaculty.research}
                      onChange={(e) => setNewFaculty({...newFaculty, research: e.target.value})}
                      placeholder="Deep Learning, Computer Vision"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Education</Label>
                      <Input
                        value={newFaculty.education}
                        onChange={(e) => setNewFaculty({...newFaculty, education: e.target.value})}
                        placeholder="PhD in Computer Science - MIT"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience</Label>
                      <Input
                        value={newFaculty.experience}
                        onChange={(e) => setNewFaculty({...newFaculty, experience: e.target.value})}
                        placeholder="15 years"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateFacultyOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFaculty} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Add Faculty
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {faculty.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.image} />
                        <AvatarFallback className="bg-[#e78a53] text-white text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-foreground">{member.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getPositionColor(member.position)} variant="secondary">
                            {member.position}
                          </Badge>
                          <Badge className={getStatusColor(member.status)} variant="secondary">
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{member.department}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#e78a53]" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{member.office}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="truncate">{member.officeHours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                        <span>{member.publications} papers</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Specialization:</Label>
                      <div className="flex flex-wrap gap-1">
                        {member.specialization.slice(0, 2).map((spec, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {member.specialization.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{member.specialization.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Research:</Label>
                      <div className="flex flex-wrap gap-1">
                        {member.research.slice(0, 2).map((research, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {research}
                          </Badge>
                        ))}
                        {member.research.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.research.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Faculty Events</h2>
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Schedule a new faculty event or activity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Event Title</Label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Describe the event"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Organizer</Label>
                      <Select value={newEvent.organizer} onValueChange={(value) => setNewEvent({...newEvent, organizer: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organizer" />
                        </SelectTrigger>
                        <SelectContent>
                          {faculty.map(member => (
                            <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input
                        value={newEvent.department}
                        onChange={(e) => setNewEvent({...newEvent, department: e.target.value})}
                        placeholder="Department name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        placeholder="9:00 AM - 5:00 PM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Capacity</Label>
                      <Input
                        type="number"
                        value={newEvent.capacity}
                        onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                        placeholder="Max attendees"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        placeholder="Venue location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Symposium">Symposium</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Conference">Conference</SelectItem>
                          <SelectItem value="Lecture">Lecture</SelectItem>
                          <SelectItem value="Networking">Networking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Speakers (comma-separated)</Label>
                    <Input
                      value={newEvent.speakers}
                      onChange={(e) => setNewEvent({...newEvent, speakers: e.target.value})}
                      placeholder="Dr. Smith, Prof. Johnson"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Agenda (comma-separated)</Label>
                    <Input
                      value={newEvent.agenda}
                      onChange={(e) => setNewEvent({...newEvent, agenda: e.target.value})}
                      placeholder="Opening, Keynote, Panel Discussion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Requirements</Label>
                    <Textarea
                      value={newEvent.requirements}
                      onChange={(e) => setNewEvent({...newEvent, requirements: e.target.value})}
                      placeholder="Prerequisites or requirements"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Deadline</Label>
                    <Input
                      type="date"
                      value={newEvent.registration_deadline}
                      onChange={(e) => setNewEvent({...newEvent, registration_deadline: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Create Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                        <p className="text-muted-foreground">Organized by {event.organizer} • {event.department}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge className={getStatusColor(event.status)} variant="secondary">
                            {event.status}
                          </Badge>
                          <Badge className="bg-blue-500/10 text-blue-500">
                            {event.registered}/{event.capacity} registered
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#e78a53]" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Speakers:</Label>
                      <div className="flex flex-wrap gap-1">
                        {event.speakers.map((speaker, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-purple-500/10 text-purple-500 text-xs">
                            {speaker}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Agenda:</Label>
                      <div className="flex flex-wrap gap-1">
                        {event.agenda.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Registration
                      </Button>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
