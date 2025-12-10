// Appointments
export const appointments = [
  { id: 1, patient: "Sarah Johnson", time: "9:00 AM", procedure: "Teeth Whitening", duration: "1h", status: "confirmed" },
  { id: 2, patient: "Michael Chen", time: "10:30 AM", procedure: "Checkup", duration: "30m", status: "pending" },
  { id: 3, patient: "Emily Davis", time: "11:15 AM", procedure: "Invisalign Consult", duration: "45m", status: "confirmed" },
  { id: 4, patient: "James Wilson", time: "2:00 PM", procedure: "Root Canal", duration: "1h 30m", status: "checked-in" },
  { id: 5, patient: "Robert Taylor", time: "4:00 PM", procedure: "Implant Consult", duration: "1h", status: "confirmed" },
]

// Leads
export const leads = [
  { id: 1, name: "Alice Brown", service: "Implants", source: "Summer 2024", time: "5 min ago", status: "New" },
  { id: 2, name: "David Miller", service: "Invisalign", source: "Invisalign Special", time: "15 min ago", status: "Calling" },
  { id: 3, name: "Jessica White", service: "Emergency", source: "Emergency Care", time: "1 hour ago", status: "Contacted" },
  { id: 4, name: "Thomas Anderson", service: "Whitening", source: "Whitening Promo", time: "2 hours ago", status: "Booked" },
  { id: 5, name: "Jennifer Martin", service: "Checkup", source: "Family Dental", time: "3 hours ago", status: "New" },
]

// Campaigns
export const campaigns = [
  { id: 1, name: "Austin Dental Implants - Summer 2024", leads: 145, appointments: 52, spend: "$1,250", status: "Active" },
  { id: 2, name: "Invisalign Special Offer", leads: 89, appointments: 31, spend: "$850", status: "Active" },
  { id: 3, name: "Emergency Dental Care", leads: 67, appointments: 28, spend: "$420", status: "Paused" },
]

// Stats
export const stats = {
  appointmentsToday: 8,
  newLeads: 12,
  monthlyRevenue: 47500,
  conversionRate: 34,
}

// Chart Data
export const performanceData = [
  { name: "Mon", leads: 12, appointments: 4 },
  { name: "Tue", leads: 19, appointments: 7 },
  { name: "Wed", leads: 15, appointments: 5 },
  { name: "Thu", leads: 22, appointments: 9 },
  { name: "Fri", leads: 28, appointments: 12 },
  { name: "Sat", leads: 10, appointments: 3 },
  { name: "Sun", leads: 8, appointments: 2 },
]

