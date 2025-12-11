"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    service: "General",
    dailyBudget: "50",
    audience: "Adults 25-55, 15 mile radius",
  })

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    // Determine service based on goal or default
    let service = formData.service
    if (formData.goal.toLowerCase().includes('implant')) service = 'Implants'
    else if (formData.goal.toLowerCase().includes('invisalign')) service = 'Invisalign'
    else if (formData.goal.toLowerCase().includes('whitening')) service = 'Whitening'

    // Create unique name if empty
    const campaignName = formData.name || `${service} Campaign - ${new Date().toLocaleDateString()}`

    const { error } = await supabase.from('campaigns').insert({
      name: campaignName,
      service: service,
      status: 'Active',
      spend: `$${formData.dailyBudget}/day`,
      leads: 0,
      appointments: 0
    })

    if (error) {
      console.error('Error creating campaign:', error)
      alert("Failed to create campaign")
    } else {
      router.push("/campaigns")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create New Campaign</h1>
          <p className="text-slate-500 mt-1">Step {step} of 5</p>
        </div>
      </div>

      <Progress value={step * 20} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Campaign Goal"}
            {step === 2 && "Target Audience"}
            {step === 3 && "AI-Generated Ads"}
            {step === 4 && "Budget & Schedule"}
            {step === 5 && "Review & Launch"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us what you want to achieve"}
            {step === 2 && "Define who you want to reach"}
            {step === 3 && "Review your AI-generated ad creatives"}
            {step === 4 && "Set your budget and campaign duration"}
            {step === 5 && "Review everything before launching"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  placeholder="e.g. Summer Implant Special"
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>What's your campaign goal?</Label>
                <Textarea
                  placeholder="E.g., I want more dental implant patients in Austin..."
                  className="min-h-[100px]"
                  value={formData.goal}
                  onChange={(e) => updateForm('goal', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Get more implant patients", "Promote Invisalign", "Fill emergency slots", "Increase cleanings"].map((goal) => (
                  <Button
                    key={goal}
                    variant={formData.goal === goal ? "default" : "outline"}
                    className="h-auto py-4"
                    onClick={() => updateForm('goal', goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Austin, TX" defaultValue="Austin, TX" />
              </div>
              <div className="space-y-2">
                <Label>Radius (miles)</Label>
                <Input type="number" defaultValue="15" />
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-900">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  AI Suggestion: Target adults 35-55 within 15 miles interested in cosmetic dentistry
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <Badge>Variation {i}</Badge>
                    <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center">
                      <span className="text-slate-400">Ad Preview</span>
                    </div>
                    <h4 className="font-medium">Transform Your Smile Today!</h4>
                    <p className="text-sm text-slate-600">Get professional dental implants from Austin's trusted experts...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Daily Budget ($)</Label>
                <Input
                  type="number"
                  value={formData.dailyBudget}
                  onChange={(e) => updateForm('dailyBudget', e.target.value)}
                />
              </div>
              <div className="p-4 bg-slate-50 border rounded-md space-y-2">
                <h4 className="font-medium">Estimated Results</h4>
                <div className="space-y-1 text-sm">
                  <p>Daily Reach: {parseInt(formData.dailyBudget) * 50} - {parseInt(formData.dailyBudget) * 70} people</p>
                  <p>Estimated Leads/Week: {(parseInt(formData.dailyBudget) / 20).toFixed(0)} - {(parseInt(formData.dailyBudget) / 15).toFixed(0)}</p>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Goal</h4>
                  <p className="text-sm text-slate-600">{formData.goal || "Not specified"}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Budget</h4>
                  <p className="text-sm text-slate-600">${formData.dailyBudget}/day</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <Button onClick={() => setStep(step + 1)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleFinish} className="bg-primary" disabled={isSubmitting}>
            {isSubmitting ? "Launching..." : "Launch Campaign"}
            {!isSubmitting && <Sparkles className="ml-2 h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  )
}
