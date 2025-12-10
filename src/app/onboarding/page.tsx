"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Check, Upload, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  // progress 1: 25, 2: 50, 3: 75, 4: 100

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  const steps = [
    { id: 1, name: "Profile" },
    { id: 2, name: "Branding" },
    { id: 3, name: "Calendar" },
    { id: 4, name: "Launch" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div key={s.id} className={cn("text-sm font-medium", step >= s.id ? "text-primary" : "text-muted-foreground")}>
                {s.name}
              </div>
            ))}
          </div>
          <Progress value={step * 25} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {step === 1 && "Complete Your Profile"}
              {step === 2 && "Customize Your Branding"}
              {step === 3 && "Connect Your Calendar"}
              {step === 4 && "Ready to Launch!"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Tell us a bit more about your practice."}
              {step === 2 && "Make your ads stand out with your brand identity."}
              {step === 3 && "Sync your appointments with your preferred calendar."}
              {step === 4 && "Review your setup and get started."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400" />
                  </div>
                  <Button variant="outline">Upload Photo</Button>
                </div>
                <div className="space-y-2">
                  <Label>Bio / Description</Label>
                  <Textarea placeholder="Tell patients about your practice..." />
                </div>
                <div className="space-y-2">
                  <Label>Operating Hours</Label>
                  <div className="grid grid-cols-1 gap-2 border rounded-md p-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                       <div key={day} className="flex items-center justify-between">
                         <span className="w-10 font-medium">{day}</span>
                         <div className="flex items-center space-x-2">
                           <Input className="w-24 h-8" defaultValue="09:00" />
                           <span>-</span>
                           <Input className="w-24 h-8" defaultValue="17:00" />
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                 <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">Drag & drop your logo here</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Primary Color</Label>
                     <div className="flex items-center space-x-2">
                       <div className="h-10 w-10 rounded-md bg-[#2563EB] border border-slate-200"></div>
                       <Input defaultValue="#2563EB" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label>Secondary Color</Label>
                     <div className="flex items-center space-x-2">
                       <div className="h-10 w-10 rounded-md bg-[#0D9488] border border-slate-200"></div>
                       <Input defaultValue="#0D9488" />
                     </div>
                   </div>
                 </div>
                 <div className="p-4 bg-slate-100 rounded-md">
                   <p className="text-sm font-medium mb-2">Ad Preview</p>
                   <div className="bg-white p-4 rounded-md shadow-sm border">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-8 w-8 bg-[#2563EB] rounded-full"></div>
                        <div>
                          <p className="text-sm font-bold">Austin Family Dental</p>
                          <p className="text-xs text-slate-500">Sponsored</p>
                        </div>
                      </div>
                      <div className="h-32 bg-slate-200 rounded-md mb-2"></div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">New Patient Special!</p>
                        <Button size="sm" className="bg-[#2563EB]">Book Now</Button>
                      </div>
                   </div>
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                   {['Google Calendar', 'Outlook Calendar', 'Apple Calendar'].map(cal => (
                     <div key={cal} className="flex items-center justify-between p-4 border rounded-md">
                       <div className="flex items-center space-x-3">
                         <Calendar className="h-5 w-5 text-slate-500" />
                         <span className="font-medium">{cal}</span>
                       </div>
                       <Button variant="outline">Connect</Button>
                     </div>
                   ))}
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Default Appointment Duration</Label>
                    <div className="flex space-x-2">
                      {['30 min', '45 min', '1 hr'].map(d => (
                        <Button key={d} variant="outline" className="flex-1">{d}</Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {['Profile Completed', 'Branding Configured', 'Calendar Connected'].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-green-50 rounded-md text-green-700">
                      <div className="bg-green-100 p-1 rounded-full">
                         <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Your account is ready to go! Start generating leads today.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
             {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
             ) : (
               <div />
             )}
             
             {step < 4 ? (
               <Button onClick={handleNext}>Continue</Button>
             ) : (
               <Button onClick={handleFinish} className="bg-primary hover:bg-primary/90">
                 Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
             )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

