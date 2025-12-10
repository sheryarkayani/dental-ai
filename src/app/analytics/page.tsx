"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download } from "lucide-react"
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const revenueData = [
  { name: "Implants Campaign", revenue: 45200 },
  { name: "Invisalign Special", revenue: 32800 },
  { name: "Whitening Promo", revenue: 28400 },
  { name: "Family Checkups", revenue: 21000 },
]

const serviceData = [
  { name: "Implants", value: 35, color: "#2563EB" },
  { name: "Invisalign", value: 25, color: "#0D9488" },
  { name: "Whitening", value: 20, color: "#F59E0B" },
  { name: "Checkups", value: 15, color: "#10B981" },
  { name: "Other", value: 5, color: "#64748B" },
]

const timeData = [
  { month: "Jun", leads: 280, appointments: 98, revenue: 42000 },
  { month: "Jul", leads: 320, appointments: 112, revenue: 48000 },
  { month: "Aug", leads: 410, appointments: 145, revenue: 62000 },
  { month: "Sep", leads: 380, appointments: 133, revenue: 57000 },
  { month: "Oct", leads: 450, appointments: 158, revenue: 68000 },
  { month: "Nov", leads: 490, appointments: 172, revenue: 74000 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics & Reports</h1>
          <p className="text-slate-500 mt-1">Track your performance metrics</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$127,450</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              23% vs previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              18% increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cost per Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              12% lower
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Return on Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              35% improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="leads" stroke="#2563EB" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="appointments" stroke="#0D9488" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Campaign */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments by Service */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Ad Impressions", count: "125,000", percent: 100 },
              { stage: "Ad Clicks", count: "8,750", percent: 70 },
              { stage: "Leads Captured", count: "1,240", percent: 50 },
              { stage: "Calls Connected", count: "892", percent: 35 },
              { stage: "Appointments Set", count: "312", percent: 25 },
            ].map((item) => (
              <div key={item.stage}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">{item.stage}</span>
                  <span className="text-slate-600">{item.count}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

