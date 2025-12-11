"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Database } from "@/lib/database.types"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const timeSlots = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`)

type Appointment = Database['public']['Tables']['appointments']['Row'] & {
  day?: number
  color?: string
}

export default function AppointmentsPage() {
  const [weekAppointments, setWeekAppointments] = useState<Appointment[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data } = await supabase.from('appointments').select('*')
      if (data) {
        // Map to add visualization props that aren't in DB yet
        const mapped = data.map((apt, index) => ({
          ...apt,
          day: (index % 5) + 1, // Distribute across Mon-Fri
          color: ["bg-yellow-200 border-yellow-400", "bg-green-200 border-green-400", "bg-red-200 border-red-400", "bg-blue-200 border-blue-400"][index % 4],
          // Normalize time format if needed
          time: apt.time?.split(' ')[0] || "9:00"
        }))
        setWeekAppointments(mapped)
      }
    }
    fetchAppointments()
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 mt-1">Manage your calendar</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Manual Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Estimated Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,450</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 min</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Week View</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">{"<"}</Button>
                <Button variant="outline" size="sm">Today</Button>
                <Button variant="outline" size="sm">{">"}</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-8 gap-2 mb-2">
                  <div className="text-xs font-medium text-slate-500"></div>
                  {weekDays.map((day, i) => (
                    <div key={day} className="text-center">
                      <div className="text-xs font-medium text-slate-500">{day}</div>
                      <div className="text-sm font-bold">Dec {i + 2}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2">
                      <div className="text-xs text-slate-500 py-2">{time}</div>
                      {weekDays.map((_, dayIndex) => {
                        const apt = weekAppointments.find(a => a.day === dayIndex && a.time === time)
                        return (
                          <div key={dayIndex} className="border border-slate-100 min-h-[60px] rounded p-1">
                            {apt && (
                              <div className={`${apt.color} border rounded p-2 text-xs h-full`}>
                                <p className="font-medium truncate">{apt.patient}</p>
                                <p className="text-slate-600 truncate">{apt.procedure}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's List */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weekAppointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="p-3 border rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{apt.time}</span>
                  <Badge variant="success" className="text-xs">Confirmed</Badge>
                </div>
                <p className="font-medium text-sm">{apt.patient}</p>
                <p className="text-xs text-slate-500">{apt.procedure}</p>
                <div className="flex space-x-1 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">Reschedule</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

