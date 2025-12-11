"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Database } from "@/lib/database.types"

type Lead = Database['public']['Tables']['leads']['Row']

export default function LeadsPage() {
  const [allLeads, setAllLeads] = useState<Lead[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from('leads').select('*')
      if (data) setAllLeads(data)
    }
    fetchLeads()
  }, [])

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

