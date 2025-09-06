"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Users,
  Calendar,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Target,
  Sparkles,
  TrendingUp,
  BookOpen,
  Mail,
  Award,
  Zap
} from "lucide-react"
import clubsData from "@/data/clubs.json"
import projectsData from "@/data/projects.json"
import facultyData from "@/data/faculty.json"

type FilterState = {
  search: string
  category: string
  type: string
}

export default function SearchPage() {
  const [allOpportunities, setAllOpportunities] = useState<any[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<any[]>([])
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    type: "all"
  })
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const opportunities = [
      ...clubsData.map(club => ({
        ...club,
        opportunityType: 'club',
        displayName: club.name
      })),
      ...projectsData.map(project => ({
        ...project,
        opportunityType: 'project',
        displayName: project.title
      })),
      ...facultyData
        .filter(faculty => faculty.mentorship?.available)
        .map(faculty => ({
          ...faculty,
          opportunityType: 'faculty',
          displayName: `${faculty.name} - Mentorship`,
          category: 'Mentorship',
          description: `Get personalized mentorship in ${faculty.mentorship.areas.join(', ')} from ${faculty.position} with ${faculty.experience} of experience.`,
          availableSpots: faculty.mentorship.capacity - faculty.mentorship.currentMentees,
          image: faculty.image
        }))
    ]

    setAllOpportunities(opportunities)
    setFilteredOpportunities(opportunities)

    const uniqueCategories = Array.from(new Set(opportunities.map(item => item.category)))
    setCategories(uniqueCategories)
  }, [])

  useEffect(() => {
    let filtered = allOpportunities

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.displayName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.specialization?.some((spec: string) => spec.toLowerCase().includes(filters.search.toLowerCase())) ||
        item.department?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(item => item.opportunityType === filters.type)
    }

    setFilteredOpportunities(filtered)
  }, [filters, allOpportunities])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ search: "", category: "all", type: "all" })
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-2xl border border-[#e78a53]/20">
              <Search className="h-10 w-10 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Discover Opportunities</h1>
              <p className="text-muted-foreground text-lg">Explore clubs, projects, and faculty mentorship programs</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Smart Search
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              {allOpportunities.length} Available
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-card/60 border-border/40 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e78a53]/5 rounded-full blur-3xl"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                <Filter className="h-6 w-6 text-[#e78a53]" />
              </div>
              <div>
                <span className="text-xl font-bold">Advanced Search & Filters</span>
                <p className="text-sm text-muted-foreground font-normal mt-1">Find exactly what you're looking for</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clubs, projects, faculty, or skills..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
              </div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="club">Clubs</SelectItem>
                  <SelectItem value="project">Projects</SelectItem>
                  <SelectItem value="faculty">Faculty Mentorship</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                {(filters.search || filters.category !== "all" || filters.type !== "all") && (
                  <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#e78a53]" />
                <p className="text-sm font-medium text-foreground">
                  Found {filteredOpportunities.length} opportunities
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{filteredOpportunities.filter(o => o.opportunityType === 'club').length} clubs</span>
                <span>•</span>
                <span>{filteredOpportunities.filter(o => o.opportunityType === 'project').length} projects</span>
                <span>•</span>
                <span>{filteredOpportunities.filter(o => o.opportunityType === 'faculty').length} mentorships</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
        {filteredOpportunities.map((opportunity, index) => (
          <motion.div
            key={`${opportunity.opportunityType}-${opportunity.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
          >
            <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full group-hover:shadow-xl group-hover:shadow-[#e78a53]/20 group-hover:border-[#e78a53]/40 group-hover:scale-[1.02] overflow-hidden">
              <div
                className="h-40 bg-cover bg-center rounded-t-xl relative overflow-hidden"
                style={{ backgroundImage: `url(${opportunity.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className={`font-semibold px-3 py-1.5 shadow-lg ${opportunity.opportunityType === 'faculty'
                      ? 'bg-purple-500 text-white border-purple-500'
                      : opportunity.opportunityType === 'project'
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-green-500 text-white border-green-500'
                    }`}>
                    {opportunity.opportunityType === 'club' ? 'Club' :
                      opportunity.opportunityType === 'project' ? 'Project' : 'Faculty Mentorship'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/60 text-white border-white/30 backdrop-blur-sm">
                    {opportunity.category}
                  </Badge>
                </div>
                {opportunity.availableSpots !== undefined && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-[#e78a53] text-white shadow-lg">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      {opportunity.availableSpots} spots
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-[#e78a53] transition-colors duration-300 leading-tight">
                  {opportunity.displayName || opportunity.name || opportunity.title}
                </CardTitle>
                {opportunity.opportunityType === 'faculty' && (
                  <p className="text-sm text-muted-foreground mt-1">{opportunity.department}</p>
                )}
              </CardHeader>

              <CardContent className="space-y-5 flex-1 flex flex-col pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {opportunity.description}
                </p>

                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="space-y-2">
                    {opportunity.opportunityType === 'club' ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-[#e78a53]" />
                          <span className="font-medium">{opportunity.members} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{opportunity.meetingSchedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{opportunity.location}</span>
                        </div>
                      </>
                    ) : opportunity.opportunityType === 'project' ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{opportunity.faculty || opportunity.leader}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-[#e78a53]" />
                          <span className="font-medium">{opportunity.currentMembers}/{opportunity.teamSize} spots</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{opportunity.position}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{opportunity.office}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{opportunity.officeHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 text-[#e78a53]" />
                          <span className="font-medium">{opportunity.publications} publications</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {(opportunity.requiredSkills || opportunity.specialization) && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {opportunity.opportunityType === 'faculty' ? 'Specialization:' : 'Required Skills:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {(opportunity.requiredSkills || opportunity.specialization)?.slice(0, 3).map((skill: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-[#e78a53]/10 text-[#e78a53]">
                          {skill}
                        </Badge>
                      ))}
                      {(opportunity.requiredSkills || opportunity.specialization)?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(opportunity.requiredSkills || opportunity.specialization)?.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    {opportunity.opportunityType === 'club' ? 'Join Club' :
                      opportunity.opportunityType === 'project' ? 'Apply Now' : 'Request Mentorship'}
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#e78a53]/10 hover:border-[#e78a53]/40 transition-all duration-300">
                    {opportunity.opportunityType === 'faculty' ? <Mail className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="relative mb-6">
            <div className="p-6 bg-muted/50 rounded-full inline-block">
              <Search className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 p-2 bg-[#e78a53]/10 rounded-full">
              <Sparkles className="h-6 w-6 text-[#e78a53]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">No opportunities found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn't find any opportunities matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={clearFilters}>
              <Zap className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
            <Button className="bg-[#e78a53] hover:bg-[#e78a53]/90">
              <TrendingUp className="h-4 w-4 mr-2" />
              Browse All Opportunities
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
