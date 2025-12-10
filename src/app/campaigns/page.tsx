"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter } from "lucide-react"
import Link from "next/link"

const allCampaigns = [
  { id: 1, name: "Austin Dental Implants - Summer 2024", status: "Active", service: "Implants", leads: 145, appointments: 52, cpa: "$24", spend: "$1,250", created: "Aug 1, 2024" },
  { id: 2, name: "Invisalign Special Offer", status: "Active", service: "Invisalign", leads: 89, appointments: 31, cpa: "$27", spend: "$850", created: "Sep 15, 2024" },
  { id: 3, name: "Emergency Dental Care", status: "Paused", service: "Emergency", leads: 67, appointments: 28, cpa: "$15", spend: "$420", created: "Jul 10, 2024" },
  { id: 4, name: "Teeth Whitening Promo", status: "Active", service: "Whitening", leads: 203, appointments: 78, cpa: "$18", spend: "$1,404", created: "Oct 1, 2024" },
  { id: 5, name: "Family Dental Checkups", status: "Completed", service: "Checkup", leads: 312, appointments: 124, cpa: "$12", spend: "$1,488", created: "Jun 1, 2024" },
  { id: 6, name: "Cosmetic Dentistry Austin", status: "Active", service: "Cosmetic", leads: 56, appointments: 19, cpa: "$32", spend: "$608", created: "Nov 1, 2024" },
  { id: 7, name: "Senior Dental Care", status: "Paused", service: "General", leads: 41, appointments: 15, cpa: "$22", spend: "$330", created: "Aug 20, 2024" },
  { id: 8, name: "Back to School Checkups", status: "Completed", service: "Checkup", leads: 178, appointments: 89, cpa: "$14", spend: "$1,246", created: "Aug 1, 2024" },
]

export default function CampaignsPage() {
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

