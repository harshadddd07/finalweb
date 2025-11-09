'use client';
import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';

const doctors = [
    { name: "Dr. Evelyn Reed", specialty: "Cardiologist", avatar: "https://picsum.photos/seed/doc1/100/100" },
    { name: "Dr. Samuel Green", specialty: "Dermatologist", avatar: "https://picsum.photos/seed/doc2/100/100" },
    { name: "Dr. Isabella Chen", specialty: "Pediatrician", avatar: "https://picsum.photos/seed/doc3/100/100" },
];

const doctorAppointments = [
    { patient: "Liam Johnson", time: "11:00 AM", status: "Confirmed" },
    { patient: "Olivia Smith", time: "12:30 PM", status: "Confirmed" },
    { patient: "Noah Williams", time: "02:00 PM", status: "Pending" },
    { patient: "Ava Garcia", time: "03:30 PM", status: "Confirmed" },
]

export default function AppointmentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    // In a real app, this role would come from auth context
    const role = 'patient'; 

    if (role === 'doctor') {
        return (
            <AppLayout role="doctor">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Schedule for Today</CardTitle>
                        <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {doctorAppointments.map(appt => (
                                <TableRow key={appt.patient}>
                                    <TableCell className="font-medium">{appt.time}</TableCell>
                                    <TableCell>{appt.patient}</TableCell>
                                    <TableCell><Badge variant={appt.status === "Confirmed" ? "default" : "secondary"}>{appt.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </AppLayout>
        )
    }

    return (
        <AppLayout role="patient">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule an Appointment</CardTitle>
                            <CardDescription>Select a doctor and a date for your consultation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">1. Select a Doctor</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {doctors.map((doctor) => (
                                        <Card key={doctor.name} className="p-4 flex flex-col items-center text-center">
                                            <Avatar className="w-16 h-16 mb-2">
                                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{doctor.name}</p>
                                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                            <Button variant="link" size="sm" className="mt-2">View Profile</Button>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">2. Select a Date & Time</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border w-fit"
                                    />
                                    <div className="space-y-2">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a time slot" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <Button className="w-full">Confirm Appointment</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>My Appointments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9 mr-4">
                                    <AvatarImage src="https://picsum.photos/seed/doc1/100/100" />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Dr. Evelyn Reed</p>
                                    <p className="text-sm text-muted-foreground">Aug 15, 2024 - 10:30 AM</p>
                                </div>
                                <Badge className="ml-auto">Upcoming</Badge>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9 mr-4">
                                    <AvatarImage src="https://picsum.photos/seed/doc2/100/100" />
                                    <AvatarFallback>SG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Dr. Samuel Green</p>
                                    <p className="text-sm text-muted-foreground">July 22, 2024 - 09:00 AM</p>
                                </div>
                                <Badge variant="outline" className="ml-auto">Completed</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
