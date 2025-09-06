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
  Target
} from "lucide-react"
import clubsData from "@/data/clubs.json"
import projectsData from "@/data/projects.json"

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
      ...clubsData.map(club => ({ ...club, opportunityType: 'club' })),
      ...projectsData.map(project => ({ ...project, opportunityType: 'project' }))
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
        item.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(item => item.category === filters.category)
    }

    if (filters.type !== "all") {
      if (filters.type === "club") {
        filtered = filtered.filter(item => item.opportunityType === 'club')
      } else if (filters.type === "project") {
        filtered = filtered.filter(item => item.opportunityType === 'project')
      }
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
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#e78a53]/10 rounded-xl">
              <Search className="h-8 w-8 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Search Opportunities</h1>
              <p className="text-muted-foreground">Discover clubs, projects, and faculty initiatives</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-3 py-1">
              <Target className="h-3 w-3 mr-1" />
              Advanced Filters
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#e78a53]" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search for clubs, projects, or keywords..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="bg-background/50 border-border/50">
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
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredOpportunities.length} opportunities
              </p>
              {(filters.search || filters.category !== "all" || filters.type !== "all") && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredOpportunities.map((opportunity, index) => (
          <motion.div
            key={`${opportunity.opportunityType}-${opportunity.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full">
              <div
                className="h-40 bg-cover bg-center rounded-t-lg relative"
                style={{ backgroundImage: `url(${opportunity.image})` }}
              >
                <div className="absolute inset-0 bg-black/50 rounded-t-lg" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/50 text-white border-white/20">
                    {opportunity.opportunityType === 'club' ? 'Club' : 'Project'}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-[#e78a53]/20 text-[#e78a53] border-[#e78a53]/30">
                    {opportunity.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">
                  {opportunity.name || opportunity.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {opportunity.description}
                </p>

                <div className="space-y-2">
                  {opportunity.opportunityType === 'club' ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{opportunity.members} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{opportunity.meetingSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{opportunity.location}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{opportunity.faculty || opportunity.leader}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{opportunity.currentMembers}/{opportunity.teamSize} members</span>
                      </div>
                    </>
                  )}
                </div>

                {opportunity.requiredSkills && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.requiredSkills.slice(0, 3).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {opportunity.requiredSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opportunity.requiredSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90 text-white">
                    {opportunity.opportunityType === 'club' ? 'Join Club' : 'Apply'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
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
          className="text-center py-12"
        >
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </div>
  )
}
