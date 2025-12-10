"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Phone, Calendar, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { appointments, leads, campaigns, stats, performanceData } from "@/lib/dummy-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Good morning, Dr. Martinez!</h1>
        <p className="text-slate-500 mt-1">Tuesday, December 2, 2025</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsToday}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">12% from yesterday</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="warning" className="text-xs">5 uncontacted</Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">23% from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">5% from last week</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Leads and appointments this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="appointments" stroke="#0D9488" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Appointments
              <Calendar className="h-5 w-5 text-slate-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                <div className="text-sm font-medium text-slate-500 w-16">{apt.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{apt.patient}</p>
                  <p className="text-xs text-slate-500">{apt.procedure}</p>
                </div>
              </div>
            ))}
            <Link href="/appointments">
              <Button variant="ghost" className="w-full text-primary">View Calendar →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/leads">
              <Button variant="ghost" size="sm">View All →</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-slate-500">{lead.service} • {lead.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={lead.status === "New" ? "info" : lead.status === "Booked" ? "success" : "outline"}>
                    {lead.status}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Campaigns</CardTitle>
            <Link href="/campaigns">
              <Button variant="ghost" size="sm">Manage →</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{campaign.name}</h4>
                  <Badge variant="success" className="text-xs">Active</Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>Leads: {campaign.leads}</p>
                  <p>Appointments: {campaign.appointments}</p>
                  <p>Spend: {campaign.spend}</p>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

