"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { User, Building2, Palette, Phone, Bell, Calendar, CreditCard } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="voice-ai">Voice AI</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                  SM
                </div>
                <Button variant="outline">Change Photo</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Dr. Sarah Martinez" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="sarah@austinfamilydental.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="(512) 555-0147" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practice Information</CardTitle>
              <CardDescription>Manage your practice details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Practice Name</Label>
                <Input defaultValue="Austin Family Dental" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="(512) 555-0147" />
                </div>
                <div className="space-y-2">
                  <Label>Practice Type</Label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Dentistry</SelectItem>
                      <SelectItem value="cosmetic">Cosmetic</SelectItem>
                      <SelectItem value="ortho">Orthodontics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="2847 Oak Hill Drive, Austin, TX 78704" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue="Providing quality dental care to Austin families since 2010." />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice-ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice AI Configuration</CardTitle>
              <CardDescription>Customize your AI voice assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Voice Selection</Label>
                <Select defaultValue="sarah">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah (Female)</SelectItem>
                    <SelectItem value="michael">Michael (Male)</SelectItem>
                    <SelectItem value="emma">Emma (Female)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Calling Hours Start</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label>Calling Hours End</Label>
                  <Input type="time" defaultValue="20:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Greeting Script</Label>
                <Textarea defaultValue="Hi! This is Sarah calling from Austin Family Dental..." />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Leave Voicemail</Label>
                  <p className="text-sm text-slate-500">Leave a message if no answer</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Lead Received</Label>
                  <p className="text-sm text-slate-500">Get notified when a new lead comes in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Appointment Booked</Label>
                  <p className="text-sm text-slate-500">Notification when AI books an appointment</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-slate-500">Receive a daily report via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Report</Label>
                  <p className="text-sm text-slate-500">Get weekly performance insights</p>
                </div>
                <Switch />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

