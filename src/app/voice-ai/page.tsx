"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Play, CheckCircle, XCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const recentCalls = [
  { id: 1, time: "10:45 AM", patient: "Alice Brown", duration: "2m 34s", outcome: "Appointment Booked", status: "success" },
  { id: 2, time: "10:32 AM", patient: "David Miller", duration: "1m 12s", outcome: "Left Voicemail", status: "voicemail" },
  { id: 3, time: "10:18 AM", patient: "Jessica White", duration: "3m 05s", outcome: "Appointment Booked", status: "success" },
  { id: 4, time: "10:05 AM", patient: "Thomas Anderson", duration: "45s", outcome: "No Answer", status: "failed" },
  { id: 5, time: "9:52 AM", patient: "Jennifer Martin", duration: "2m 18s", outcome: "Callback Requested", status: "callback" },
]

const liveActivity = [
  { id: 1, time: "Just now", patient: "Robert Taylor", action: "Calling...", status: "in-progress" },
  { id: 2, time: "2 min ago", patient: "Sarah Johnson", action: "Appointment Booked", status: "success" },
  { id: 3, time: "5 min ago", patient: "Michael Chen", action: "Left Voicemail", status: "voicemail" },
]

export default function VoiceAIPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Voice AI Activity</h1>
          <div className="flex items-center mt-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <p className="text-slate-500">AI Active</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 15s</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <Phone className={`h-5 w-5 ${activity.status === 'in-progress' ? 'text-blue-500 animate-pulse' : activity.status === 'success' ? 'text-green-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="font-medium text-sm">{activity.patient}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{activity.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle cx="64" cy="64" r="56" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="#2563EB" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="66.85" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">81%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total calls:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Connected:</span>
                <span className="font-medium text-green-600">38 (81%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Appointments:</span>
                <span className="font-medium text-blue-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Voicemails:</span>
                <span className="font-medium">9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">No answer:</span>
                <span className="font-medium text-red-600">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Calls */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-slate-500 w-20">{call.time}</div>
                  <div>
                    <p className="font-medium">{call.patient}</p>
                    <p className="text-sm text-slate-500">{call.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={call.status === "success" ? "success" : call.status === "failed" ? "destructive" : "outline"}>
                    {call.outcome}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

