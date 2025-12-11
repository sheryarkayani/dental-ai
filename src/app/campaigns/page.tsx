"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Database } from "@/lib/database.types"

type Campaign = Database['public']['Tables']['campaigns']['Row'] & {
  cpa?: string
  created?: string
}

export default function CampaignsPage() {
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase.from('campaigns').select('*')
      if (data) {
        const mapped = data.map(c => {
          const spendVal = parseFloat(c.spend?.replace(/[^0-9.]/g, '') || '0')
          const cpaVal = c.appointments && c.appointments > 0 ? (spendVal / c.appointments).toFixed(0) : '0'
          return {
            ...c,
            cpa: `$${cpaVal}`,
            created: c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'
          }
        })
        setAllCampaigns(mapped)
      }
    }
    fetchCampaigns()
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-500 mt-1">Manage your marketing campaigns</p>
        </div>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search campaigns..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Appointments</TableHead>
                <TableHead>CPA</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === "Active" ? "success" : campaign.status === "Paused" ? "warning" : "outline"}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.service}</TableCell>
                  <TableCell>{campaign.leads}</TableCell>
                  <TableCell>{campaign.appointments}</TableCell>
                  <TableCell>{campaign.cpa}</TableCell>
                  <TableCell>{campaign.spend}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

