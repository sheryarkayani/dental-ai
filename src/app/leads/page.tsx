"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Clock } from "lucide-react"

const allLeads = [
  { id: 1, name: "Alice Brown", phone: "***-***-1234", service: "Implants", source: "Summer 2024", time: "5 min ago", status: "New", attempts: 0 },
  { id: 2, name: "David Miller", phone: "***-***-5678", service: "Invisalign", source: "Invisalign Special", time: "15 min ago", status: "Calling", attempts: 1 },
  { id: 3, name: "Jessica White", phone: "***-***-9012", service: "Emergency", source: "Emergency Care", time: "1 hour ago", status: "Contacted", attempts: 2 },
  { id: 4, name: "Thomas Anderson", phone: "***-***-3456", service: "Whitening", source: "Whitening Promo", time: "2 hours ago", status: "Booked", attempts: 1 },
  { id: 5, name: "Jennifer Martin", phone: "***-***-7890", service: "Checkup", source: "Family Dental", time: "3 hours ago", status: "New", attempts: 0 },
  { id: 6, name: "Christopher Lee", phone: "***-***-2345", service: "Implants", source: "Summer 2024", time: "4 hours ago", status: "Calling", attempts: 2 },
  { id: 7, name: "Amanda Garcia", phone: "***-***-6789", service: "Cosmetic", source: "Cosmetic Dentistry", time: "5 hours ago", status: "No Answer", attempts: 3 },
  { id: 8, name: "Daniel Rodriguez", phone: "***-***-0123", service: "Invisalign", source: "Invisalign Special", time: "6 hours ago", status: "Contacted", attempts: 1 },
]

export default function LeadsPage() {
  const statusColumns = {
    "New": allLeads.filter(l => l.status === "New"),
    "Calling": allLeads.filter(l => l.status === "Calling"),
    "Contacted": allLeads.filter(l => l.status === "Contacted"),
    "Booked": allLeads.filter(l => l.status === "Booked"),
    "No Answer": allLeads.filter(l => l.status === "No Answer"),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">Track and manage your patient leads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allLeads.filter(l => l.status === "Contacted").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allLeads.filter(l => l.status === "Booked").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35%</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusColumns).map(([status, leads]) => (
          <Card key={status}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{status}</CardTitle>
                <Badge variant="outline">{leads.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {leads.map((lead) => (
                <Card key={lead.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.phone}</p>
                    <Badge variant="outline" className="text-xs">{lead.service}</Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {lead.time}
                    </div>
                    <div className="flex space-x-1 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

