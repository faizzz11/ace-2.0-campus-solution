"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, Heart, ExternalLink, Clock, Users, TrendingUp } from "lucide-react"
import recommendationsData from "@/data/recommendations.json"
import clubsData from "@/data/clubs.json"
import projectsData from "@/data/projects.json"

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
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-[#e78a53]"
    if (score >= 70) return "text-yellow-500"
    return "text-gray-500"
  }

  const getMatchScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500/10 border-green-500/20"
    if (score >= 80) return "bg-[#e78a53]/10 border-[#e78a53]/20"
    if (score >= 70) return "bg-yellow-500/10 border-yellow-500/20"
    return "bg-gray-500/10 border-gray-500/20"
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
              <Sparkles className="h-10 w-10 text-purple-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Recommendations</h1>
              <p className="text-muted-foreground text-lg">Personalized suggestions based on your profile and interests</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53] border-[#e78a53]/20 px-4 py-2 text-sm">
              <Star className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-4 py-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              {recommendations.length} Matches
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 h-full group-hover:shadow-lg group-hover:shadow-[#e78a53]/10 group-hover:border-[#e78a53]/30">
              <div
                className="h-40 bg-cover bg-center rounded-t-xl relative overflow-hidden"
                style={{ backgroundImage: `url(${rec.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${getMatchScoreBg(rec.matchScore)} ${getMatchScoreColor(rec.matchScore)} font-semibold px-3 py-1`}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {rec.matchScore}% match
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-full transition-all duration-200 ${
                      savedItems.has(rec.id) 
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
                        : 'bg-black/40 text-white hover:bg-black/60 hover:scale-110'
                    }`}
                    onClick={() => toggleSave(rec.id)}
                  >
                    <Heart className={`h-4 w-4 ${savedItems.has(rec.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-black/60 text-white border-white/30 backdrop-blur-sm">
                    {rec.type === 'club' ? 'Club' : 'Project'}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="outline" className="bg-black/40 text-white border-white/30 backdrop-blur-sm">
                    {rec.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-foreground group-hover:text-[#e78a53] transition-colors duration-200">
                  {rec.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{rec.description}</p>
                
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#e78a53]/5 to-[#e78a53]/10 border border-[#e78a53]/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-[#e78a53]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#e78a53] mb-1">Why this is perfect for you:</p>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                  </div>
                </div>

                {rec.details && (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {rec.type === 'club' && (
                      <>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{rec.details.members} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{rec.details.meetingSchedule}</span>
                        </div>
                      </>
                    )}
                    
                    {rec.type === 'project' && (
                      <>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{rec.details.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{rec.details.currentMembers}/{rec.details.teamSize} members</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-[#e78a53] hover:bg-[#e78a53]/90 text-white font-semibold">
                    {rec.type === 'club' ? 'Join Club' : 'Apply to Project'}
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#e78a53]/10 hover:border-[#e78a53]/30">
                    <ExternalLink className="h-4 w-4" />
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
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-red-500/5 to-pink-500/5 border-red-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                Saved Recommendations ({savedItems.size})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">
                You have {savedItems.size} saved recommendation{savedItems.size !== 1 ? 's' : ''}. 
                These will be available in your profile for easy access.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
