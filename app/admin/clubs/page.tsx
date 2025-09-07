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
import { Separator } from "@/components/ui/separator"
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
  Users,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Star,
  Award,
  Target,
  UserPlus,
  Clock,
  BookOpen,
  Settings,
  AlertCircle,
  CheckCircle
} from "lucide-react"

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "AI & Machine Learning Club",
      description: "Explore the fascinating world of artificial intelligence and machine learning through hands-on projects and workshops.",
      category: "Technology",
      members: 45,
      maxMembers: 60,
      requirements: ["Basic programming knowledge", "Interest in AI/ML", "Commitment to attend weekly meetings"],
      meetingSchedule: "Every Wednesday 6:00 PM",
      location: "Tech Building Room 201",
      established: "2020",
      president: "Alice Johnson",
      status: "active",
      openings: 15,
      tags: ["AI", "Machine Learning", "Programming", "Data Science"],
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Drama Society",
      description: "Express yourself through the art of theater. Join us for performances, workshops, and creative collaboration.",
      category: "Arts",
      members: 28,
      maxMembers: 40,
      requirements: ["Passion for theater", "Regular attendance", "Willingness to participate in productions"],
      meetingSchedule: "Tuesday & Thursday 7:00 PM",
      location: "Arts Center Theater",
      established: "2018",
      president: "Michael Brown",
      status: "active",
      openings: 12,
      tags: ["Theater", "Acting", "Performance", "Creative"],
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "Environmental Action Group",
      description: "Work together to create a sustainable future through environmental awareness and action.",
      category: "Environment",
      members: 32,
      maxMembers: 50,
      requirements: ["Environmental consciousness", "Active participation", "Community service commitment"],
      meetingSchedule: "Friday 5:00 PM",
      location: "Science Building 105",
      established: "2019",
      president: "Sarah Green",
      status: "recruiting",
      openings: 18,
      tags: ["Environment", "Sustainability", "Community", "Action"],
      image: "/placeholder.jpg"
    }
  ])

  const [openings, setOpenings] = useState([
    {
      id: 1,
      clubId: 1,
      title: "AI Research Assistant",
      description: "Help with ongoing AI research projects and gain hands-on experience with cutting-edge technology.",
      requirements: ["Python programming", "Basic understanding of ML algorithms", "Research interest"],
      positions: 3,
      deadline: "2024-02-15",
      type: "Research",
      commitment: "10 hours/week"
    },
    {
      id: 2,
      clubId: 2,
      title: "Lead Actor for Spring Production",
      description: "Main role in our upcoming spring theater production. Experience preferred but not required.",
      requirements: ["Acting experience", "Memorization skills", "Availability for rehearsals"],
      positions: 1,
      deadline: "2024-01-30",
      type: "Performance",
      commitment: "15 hours/week"
    },
    {
      id: 3,
      clubId: 3,
      title: "Campus Sustainability Coordinator",
      description: "Lead campus-wide sustainability initiatives and coordinate environmental projects.",
      requirements: ["Leadership skills", "Project management", "Environmental knowledge"],
      positions: 2,
      deadline: "2024-02-10",
      type: "Leadership",
      commitment: "8 hours/week"
    }
  ])

  const [newClub, setNewClub] = useState({
    name: "",
    description: "",
    category: "",
    maxMembers: "",
    requirements: "",
    meetingSchedule: "",
    location: "",
    president: ""
  })

  const [newOpening, setNewOpening] = useState({
    clubId: "",
    title: "",
    description: "",
    requirements: "",
    positions: "",
    deadline: "",
    type: "",
    commitment: ""
  })

  const [isCreateClubOpen, setIsCreateClubOpen] = useState(false)
  const [isCreateOpeningOpen, setIsCreateOpeningOpen] = useState(false)

  const handleCreateClub = () => {
    const club = {
      id: clubs.length + 1,
      ...newClub,
      members: 0,
      maxMembers: parseInt(newClub.maxMembers),
      requirements: newClub.requirements.split('\n').filter(req => req.trim()),
      established: new Date().getFullYear().toString(),
      status: "active",
      openings: parseInt(newClub.maxMembers),
      tags: [],
      image: "/placeholder.jpg"
    }
    setClubs([...clubs, club])
    setNewClub({
      name: "",
      description: "",
      category: "",
      maxMembers: "",
      requirements: "",
      meetingSchedule: "",
      location: "",
      president: ""
    })
    setIsCreateClubOpen(false)
  }

  const handleCreateOpening = () => {
    const opening = {
      id: openings.length + 1,
      ...newOpening,
      clubId: parseInt(newOpening.clubId),
      positions: parseInt(newOpening.positions)
    }
    setOpenings([...openings, opening])
    setNewOpening({
      clubId: "",
      title: "",
      description: "",
      requirements: "",
      positions: "",
      deadline: "",
      type: "",
      commitment: ""
    })
    setIsCreateOpeningOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "recruiting":
        return "bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20"
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getClubName = (clubId: number) => {
    const club = clubs.find(c => c.id === clubId)
    return club?.name || "Unknown Club"
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
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl border border-blue-500/20">
              <Users className="h-10 w-10 text-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Clubs Management</h1>
              <p className="text-muted-foreground text-lg">Manage campus clubs, requirements, and member recruitment</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-2 text-sm">
              <Users className="h-4 w-4 mr-2" />
              {clubs.length} Clubs
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 text-sm">
              <UserPlus className="h-4 w-4 mr-2" />
              {openings.length} Open Positions
            </Badge>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="clubs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg">
          <TabsTrigger
            value="clubs"
            style={{
              backgroundColor: 'var(--active-bg, transparent)',
              color: 'var(--active-color, inherit)',
            }}
            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
          >
            Clubs Overview
          </TabsTrigger>
          <TabsTrigger
            value="openings"
            style={{
              backgroundColor: 'var(--active-bg, transparent)',
              color: 'var(--active-color, inherit)',
            }}
            className="transition-all duration-200 data-[state=active]:[--active-bg:#e78a53] data-[state=active]:[--active-color:white] shadow-sm"
          >
            Open Positions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clubs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Active Clubs</h2>
            <Dialog open={isCreateClubOpen} onOpenChange={setIsCreateClubOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Club
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Club</DialogTitle>
                  <DialogDescription>
                    Add a new club to the campus community
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Club Name</Label>
                      <Input
                        value={newClub.name}
                        onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                        placeholder="Enter club name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newClub.category} onValueChange={(value) => setNewClub({ ...newClub, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newClub.description}
                      onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                      placeholder="Describe the club's purpose and activities"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Max Members</Label>
                      <Input
                        type="number"
                        value={newClub.maxMembers}
                        onChange={(e) => setNewClub({ ...newClub, maxMembers: e.target.value })}
                        placeholder="Maximum capacity"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>President</Label>
                      <Input
                        value={newClub.president}
                        onChange={(e) => setNewClub({ ...newClub, president: e.target.value })}
                        placeholder="Club president name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meeting Schedule</Label>
                      <Input
                        value={newClub.meetingSchedule}
                        onChange={(e) => setNewClub({ ...newClub, meetingSchedule: e.target.value })}
                        placeholder="e.g., Every Monday 6:00 PM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={newClub.location}
                        onChange={(e) => setNewClub({ ...newClub, location: e.target.value })}
                        placeholder="Meeting location"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Requirements (one per line)</Label>
                    <Textarea
                      value={newClub.requirements}
                      onChange={(e) => setNewClub({ ...newClub, requirements: e.target.value })}
                      placeholder="List membership requirements"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateClubOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateClub} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Create Club
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-foreground mb-2">{club.name}</CardTitle>
                        <Badge variant="outline" className="mb-2">{club.category}</Badge>
                        <Badge className={getStatusColor(club.status)} variant="secondary">
                          {club.status}
                        </Badge>
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
                    <p className="text-muted-foreground text-sm">{club.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#e78a53]" />
                        <span>{club.members}/{club.maxMembers} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-green-500" />
                        <span>{club.openings} openings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="truncate">{club.meetingSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="truncate">{club.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Requirements:</Label>
                      <div className="space-y-1">
                        {club.requirements.slice(0, 2).map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="truncate">{req}</span>
                          </div>
                        ))}
                        {club.requirements.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{club.requirements.length - 2} more requirements
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Recruit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="openings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Open Positions</h2>
            <Dialog open={isCreateOpeningOpen} onOpenChange={setIsCreateOpeningOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Opening
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post New Opening</DialogTitle>
                  <DialogDescription>
                    Create a new position opening for club recruitment
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Select Club</Label>
                    <Select value={newOpening.clubId} onValueChange={(value) => setNewOpening({ ...newOpening, clubId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map(club => (
                          <SelectItem key={club.id} value={club.id.toString()}>{club.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Position Title</Label>
                      <Input
                        value={newOpening.title}
                        onChange={(e) => setNewOpening({ ...newOpening, title: e.target.value })}
                        placeholder="Position title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newOpening.type} onValueChange={(value) => setNewOpening({ ...newOpening, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Position type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Leadership">Leadership</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                          <SelectItem value="General">General Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newOpening.description}
                      onChange={(e) => setNewOpening({ ...newOpening, description: e.target.value })}
                      placeholder="Describe the position responsibilities"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Requirements</Label>
                    <Textarea
                      value={newOpening.requirements}
                      onChange={(e) => setNewOpening({ ...newOpening, requirements: e.target.value })}
                      placeholder="List position requirements"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Positions</Label>
                      <Input
                        type="number"
                        value={newOpening.positions}
                        onChange={(e) => setNewOpening({ ...newOpening, positions: e.target.value })}
                        placeholder="Number of openings"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input
                        type="date"
                        value={newOpening.deadline}
                        onChange={(e) => setNewOpening({ ...newOpening, deadline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time Commitment</Label>
                      <Input
                        value={newOpening.commitment}
                        onChange={(e) => setNewOpening({ ...newOpening, commitment: e.target.value })}
                        placeholder="e.g., 10 hours/week"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpeningOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateOpening} className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    Post Opening
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {openings.map((opening, index) => (
              <motion.div
                key={opening.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-foreground">{opening.title}</CardTitle>
                        <p className="text-muted-foreground">{getClubName(opening.clubId)}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{opening.type}</Badge>
                          <Badge className="bg-[#e78a53]/10 text-[#e78a53]">
                            {opening.positions} {opening.positions === 1 ? 'Position' : 'Positions'}
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
                    <p className="text-muted-foreground">{opening.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#e78a53]" />
                        <span>Deadline: {new Date(opening.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{opening.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span>{opening.type} Role</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Requirements:</Label>
                      <p className="text-sm text-muted-foreground">{opening.requirements}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Applications
                      </Button>
                      <Button size="sm" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
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
