"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33)

  const handleNext = () => {
    setStep(step + 1)
    setProgress(progress + 33)
  }

  const handleBack = () => {
    setStep(step - 1)
    setProgress(progress - 33)
  }

  const handleSubmit = () => {
    // Simulate signup
    router.push("/onboarding")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="Dr. John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="practice-name">Practice Name</Label>
                <Input id="practice-name" placeholder="Austin Family Dental" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(512) 555-0123" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Street Address" className="mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="City" />
                  <Input placeholder="State" />
                </div>
                <Input placeholder="Zip Code" className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label>Practice Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Dentistry</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic</SelectItem>
                    <SelectItem value="ortho">Orthodontics</SelectItem>
                    <SelectItem value="pediatric">Pediatric</SelectItem>
                    <SelectItem value="surgery">Oral Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">Services Offered</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Implants", "Invisalign", "Whitening", "Crowns", "Root Canal", "Cleaning", "Emergency"].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox id={service} />
                      <Label htmlFor={service} className="font-normal">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base">Monthly Marketing Budget</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">$500 - $1,000</SelectItem>
                    <SelectItem value="medium">$1,000 - $2,500</SelectItem>
                    <SelectItem value="high">$2,500 - $5,000</SelectItem>
                    <SelectItem value="enterprise">$5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>Back</Button>
          ) : (
            <div /> // Spacer
          )}
          
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">Create Account</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

