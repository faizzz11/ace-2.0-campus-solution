"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, Heart, ExternalLink, Clock, Users, TrendingUp, GraduationCap, Mail, MapPin, BookOpen, Award } from "lucide-react"
import recommendationsData from "@/data/recommendations.json"
import clubsData from "@/data/clubs.json"
import projectsData from "@/data/projects.json"
import facultyData from "@/data/faculty.json"

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const enrichedRecommendations = recommendationsData.map(rec => {
      if (rec.type === 'club') {
        const club = clubsData.find(c => c.id === rec.itemId)
        return { ...rec, details: club }
      } else if (rec.type === 'project') {
        const project = projectsData.find(p => p.id === rec.itemId)
        return { ...rec, details: project }
      } else if (rec.type === 'faculty') {
        const faculty = facultyData.find(f => f.id === rec.itemId)
        return { ...rec, details: faculty }
      }
      return rec
    })
    setRecommendations(enrichedRecommendations)
  }, [])

  const toggleSave = (id: number) => {
    const newSaved = new Set(savedItems)
    if (newSaved.has(id)) {
      newSaved.delete(id)
    } else {
      newSaved.add(id)
    }
    setSavedItems(newSaved)
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-[#e78a53]"
    if (score >= 80) return "text-[#e78a53]"
    if (score >= 70) return "text-[#e78a53]/80"
    return "text-[#e78a53]/60"
  }

  const getMatchScoreBg = (score: number) => {
    if (score >= 90) return "bg-[#e78a53]/10 border-[#e78a53]/20"
    if (score >= 80) return "bg-[#e78a53]/10 border-[#e78a53]/20"
    if (score >= 70) return "bg-[#e78a53]/8 border-[#e78a53]/15"
    return "bg-[#e78a53]/5 border-[#e78a53]/10"
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
              <Sparkles className="h-10 w-10 text-[#e78a53]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">AI Recommendations</h1>
              <p className="text-muted-foreground text-lg">Personalized suggestions tailored to your interests and academic profile</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-4 py-2 text-sm">
              <Star className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              {recommendations.length} Perfect Matches
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Card className="bg-card/60 border-border/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full group-hover:shadow-xl group-hover:shadow-[#e78a53]/20 group-hover:border-[#e78a53]/40 group-hover:scale-[1.02] overflow-hidden">
              <div
                className="h-40 bg-cover bg-center rounded-t-xl relative overflow-hidden"
                style={{ backgroundImage: `url(${rec.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge
                    className="bg-[#e78a53] text-white border-[#e78a53] font-semibold px-3 py-1.5 shadow-lg"
                  >
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    {rec.matchScore}% match
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all duration-200 ${savedItems.has(rec.id)
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
                      : 'bg-black/40 text-white hover:bg-black/60 hover:scale-110'
                      }`}
                    onClick={() => toggleSave(rec.id)}
                  >
                    <Heart className={`h-4 w-4 ${savedItems.has(rec.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-[#e78a53] transition-colors duration-300 leading-tight">
                  {rec.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs bg-background/50">
                    {rec.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-[#e78a53]/10 text-[#e78a53]">
                    {rec.type === 'club' ? 'Club' : rec.type === 'project' ? 'Project' : 'Faculty Mentorship'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 flex-1 flex flex-col pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{rec.description}</p>

                <div className="p-4 rounded-xl bg-gradient-to-br from-[#e78a53]/8 to-[#e78a53]/12 border border-[#e78a53]/25 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#e78a53]/10 rounded-full blur-2xl"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="p-2.5 bg-[#e78a53]/15 rounded-lg">
                      <Star className="h-4 w-4 text-[#e78a53] fill-[#e78a53]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#e78a53] mb-2">Perfect Match Because:</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{rec.reason}</p>
                    </div>
                  </div>
                </div>

                {rec.details && (
                  <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {rec.type === 'club' && (
                        <>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 text-[#e78a53]" />
                            <span className="font-medium">{rec.details.members} members</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium truncate">{rec.details.meetingSchedule}</span>
                          </div>
                        </>
                      )}

                      {rec.type === 'project' && (
                        <>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{rec.details.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 text-[#e78a53]" />
                            <span className="font-medium">{rec.details.currentMembers}/{rec.details.teamSize} spots</span>
                          </div>
                        </>
                      )}

                      {rec.type === 'faculty' && (
                        <>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">{rec.details.position}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="font-medium truncate">{rec.details.office}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium truncate">{rec.details.officeHours}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BookOpen className="h-4 w-4 text-[#e78a53]" />
                            <span className="font-medium">{rec.details.publications} publications</span>
                          </div>
                        </>
                      )}
                    </div>

                    {rec.type === 'faculty' && rec.details.mentorship && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Mentorship Availability:</span>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-500 text-xs">
                            {rec.details.mentorship.capacity - rec.details.mentorship.currentMentees} spots available
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {rec.details.mentorship.areas.slice(0, 2).map((area: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                          {rec.details.mentorship.areas.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{rec.details.mentorship.areas.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    {rec.type === 'club' ? 'Join Club' : rec.type === 'project' ? 'Apply Now' : 'Request Mentorship'}
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#e78a53]/10 hover:border-[#e78a53]/40 transition-all duration-300">
                    {rec.type === 'faculty' ? <Mail className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {savedItems.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-red-500/8 to-pink-500/8 border-red-500/25 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-3xl"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-4">
                <div className="p-3 bg-red-500/15 rounded-xl">
                  <Heart className="h-7 w-7 text-red-500 fill-red-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Saved Recommendations</span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">
                    {savedItems.size} item{savedItems.size !== 1 ? 's' : ''} saved for later
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Star className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-muted-foreground">
                  Your saved recommendations are stored in your profile and can be accessed anytime.
                  You'll also receive notifications about updates and deadlines.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
