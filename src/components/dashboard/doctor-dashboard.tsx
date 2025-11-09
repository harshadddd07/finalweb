
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Users, CalendarCheck, BarChart, MessageCircle, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResponsiveContainer, BarChart as BarGraph, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';
import { ChartTooltipContent, ChartContainer, ChartConfig, ChartLegendContent } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";


const initialAppointmentRequests = [
    { name: "Aarav Patel", avatar: "https://picsum.photos/seed/pat1/100/100", email: "aarav@example.com", reason: "Annual Check-up" },
    { name: "Saanvi Singh", avatar: "https://picsum.photos/seed/pat2/100/100", email: "saanvi@example.com", reason: "Follow-up" },
    { name: "Advik Kumar", avatar: "https://picsum.photos/seed/pat3/100/100", email: "advik@example.com", reason: "New patient" },
    { name: "Diya Sharma", avatar: "https://picsum.photos/seed/pat4/100/100", email: "diya@example.com", reason: "Symptom check" },
    { name: "Vihaan Joshi", avatar: "https://picsum.photos/seed/pat5/100/100", email: "vihaan@example.com", reason: "Prescription refill" },
];

const weeklyAppointmentsData = [
  { day: 'Mon', appointments: 8 },
  { day: 'Tue', appointments: 12 },
  { day: 'Wed', appointments: 10 },
  { day: 'Thu', appointments: 15 },
  { day: 'Fri', appointments: 11 },
  { day: 'Sat', appointments: 5 },
  { day: 'Sun', appointments: 2 },
];

const barChartConfig = {
  appointments: {
    label: "Appointments",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const patientDemographicsData = [
  { name: '0-18', value: 250, fill: "hsl(var(--chart-1))" },
  { name: '19-40', value: 600, fill: "hsl(var(--chart-2))" },
  { name: '41-60', value: 300, fill: "hsl(var(--chart-3))" },
  { name: '60+', value: 104, fill: "hsl(var(--chart-4))" },
];
const pieChartConfig = {
  value: {
    label: "Patients",
  },
  "0-18": { label: "0-18", color: "hsl(var(--chart-1))" },
  "19-40": { label: "19-40", color: "hsl(var(--chart-2))" },
  "41-60": { label: "41-60", color: "hsl(var(--chart-3))" },
  "60+": { label: "60+", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const appointmentStatusData = [
    { name: 'Confirmed', value: 38, fill: "hsl(var(--chart-1))" },
    { name: 'Pending', value: 8, fill: "hsl(var(--chart-2))" },
    { name: 'Canceled', value: 3, fill: "hsl(var(--chart-5))" },
]
const appointmentStatusConfig = {
    value: { label: 'Appointments' },
    Confirmed: { label: 'Confirmed', color: 'hsl(var(--chart-1))' },
    Pending: { label: 'Pending', color: 'hsl(var(--chart-2))' },
    Canceled: { label: 'Canceled', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig


export default function DoctorDashboard() {
  const [appointmentRequests, setAppointmentRequests] = useState(initialAppointmentRequests);
  const { toast } = useToast();

  const handleApprove = (patientName: string) => {
    setAppointmentRequests(prev => prev.filter(req => req.name !== patientName));
    toast({
        title: "Appointment Approved",
        description: `${patientName} has been added to your chat list.`,
    });
  }

  const handleDecline = (patientName: string) => {
    setAppointmentRequests(prev => prev.filter(req => req.name !== patientName));
     toast({
        variant: "destructive",
        title: "Appointment Declined",
        description: `The request from ${patientName} has been declined.`,
    });
  }


  return (
    <div className="flex flex-col gap-4 md:gap-8">
        <h1 className="text-3xl font-bold font-headline">Doctor's Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+3 since yesterday</p>
                </CardContent>
            </Card>
             <Card>
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Symptom Analysis</CardTitle>
                    <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">AI-powered tool to assist in diagnosis.</p>
                     <Button asChild size="sm">
                        <Link href="/symptom-analyzer?role=doctor">Launch Tool</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Live Chat</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">Communicate with your patients in real-time.</p>
                     <Button asChild size="sm" variant="secondary">
                        <Link href="/chat?role=doctor">Open Chat</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>New Appointment Requests</CardTitle>
                        <CardDescription>
                            {appointmentRequests.length > 0
                             ? `You have ${appointmentRequests.length} new patient requests.`
                             : "You have no new appointment requests."
                            }
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/appointments?role=doctor">View All <ArrowUpRight className="h-4 w-4" /></Link>
                    </Button>
                </CardHeader>
                <CardContent>
                   {appointmentRequests.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead className="hidden sm:table-cell">Reason for Visit</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointmentRequests.map((req) => (
                                <TableRow key={req.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={req.avatar} alt={req.name} />
                                                <AvatarFallback>{req.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{req.name}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">{req.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{req.reason}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleApprove(req.name)}>Approve</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDecline(req.name)}>Decline</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                   ) : (
                       <div className="text-center text-muted-foreground py-8">No pending requests.</div>
                   )}
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Appointments This Week</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ChartContainer config={barChartConfig}>
                        <BarGraph data={weeklyAppointmentsData}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                             <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarGraph>
                    </ChartContainer>
                </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Appointment Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[150px] flex items-center justify-center">
                       <ChartContainer config={appointmentStatusConfig}>
                            <PieChart>
                                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                                 <Pie data={appointmentStatusData} dataKey="value" nameKey="name" innerRadius={30} strokeWidth={5}>
                                    {appointmentStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend content={<ChartLegendContent nameKey="name" />}  />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Patient Demographics</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[150px] flex items-center justify-center">
                       <ChartContainer config={pieChartConfig}>
                            <PieChart>
                                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie
                                    data={patientDemographicsData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={40}
                                    labelLine={false}
                                />
                                <Legend content={<ChartLegendContent nameKey="name" />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

  