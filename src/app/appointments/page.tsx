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
import { MoreHorizontal, ArrowLeft } from 'lucide-react';

const doctors = [
    { name: "Dr. Priya Sharma", specialty: "Cardiologist", avatar: "https://picsum.photos/seed/doc1/100/100" },
    { name: "Dr. Rahul Gupta", specialty: "Dermatologist", avatar: "https://picsum.photos/seed/doc2/100/100" },
    { name: "Dr. Anjali Desai", specialty: "Pediatrician", avatar: "https://picsum.photos/seed/doc3/100/100" },
    { name: "Dr. Vikram Singh", specialty: "Neurologist", avatar: "https://picsum.photos/seed/doc4/100/100" },
    { name: "Dr. Meera Iyer", specialty: "Cardiologist", avatar: "https://picsum.photos/seed/doc5/100/100" },
];

const specialties = ["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const doctorAppointments = [
    { patient: "Aarav Patel", time: "11:00 AM", status: "Confirmed" },
    { patient: "Saanvi Singh", time: "12:30 PM", status: "Confirmed" },
    { patient: "Advik Kumar", time: "02:00 PM", status: "Pending" },
    { patient: "Myra Reddy", time: "03:30 PM", status: "Confirmed" },
]

export default function AppointmentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [step, setStep] = useState(1);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors[0]) | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    // In a real app, this role would come from auth context
    const role = 'patient'; 

    const filteredDoctors = selectedSpecialty ? doctors.filter(d => d.specialty === selectedSpecialty) : [];

    const resetFlow = () => {
        setStep(1);
        setSelectedSpecialty(null);
        setSelectedDoctor(null);
        setSelectedTime(null);
    }

    if (role === 'doctor') {
        return (
            <AppLayout role="doctor">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Schedule for Today</CardTitle>
                        <CardDescription>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
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
                           <div className="flex items-center gap-4">
                             {step > 1 && <Button variant="outline" size="icon" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /></Button>}
                             <div>
                                <CardTitle>Schedule an Appointment</CardTitle>
                                <CardDescription>
                                     {step === 1 && "Choose a medical specialty to find a doctor."}
                                     {step === 2 && `Select a doctor specializing in ${selectedSpecialty}.`}
                                     {step === 3 && "Select a date and time for your consultation."}
                                     {step === 4 && "Please review and confirm your appointment details."}
                                </CardDescription>
                             </div>
                           </div>
                        </CardHeader>
                        <CardContent>
                            {/* Step 1: Select Specialty */}
                            {step === 1 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {specialties.map(specialty => (
                                        <Button key={specialty} variant="outline" className="h-20 text-base" onClick={() => { setSelectedSpecialty(specialty); setStep(2); }}>
                                            {specialty}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Select Doctor */}
                            {step === 2 && (
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredDoctors.map((doctor) => (
                                        <Card key={doctor.name} className="p-4 flex flex-col items-center text-center hover:bg-muted/50 cursor-pointer" onClick={() => { setSelectedDoctor(doctor); setStep(3); }}>
                                            <Avatar className="w-16 h-16 mb-2">
                                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{doctor.name}</p>
                                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                        </Card>
                                    ))}
                                </div>
                            )}

                             {/* Step 3: Select Date & Time */}
                            {step === 3 && (
                                 <div className="grid md:grid-cols-2 gap-8">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-md border w-fit"
                                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Available Slots</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map(time => (
                                                <Button 
                                                    key={time} 
                                                    variant={selectedTime === time ? "default" : "outline"}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                         <Button className="w-full mt-6" disabled={!date || !selectedTime} onClick={() => setStep(4)}>Proceed to Confirmation</Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Confirmation */}
                            {step === 4 && selectedDoctor && date && selectedTime &&(
                                <div className="space-y-6">
                                    <div className="p-4 border rounded-lg space-y-4">
                                        <h3 className="font-semibold text-lg">Appointment Details</h3>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                                                <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">{selectedDoctor.name}</p>
                                                <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="text-muted-foreground">
                                            <p><strong>Date:</strong> {date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p><strong>Time:</strong> {selectedTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                         <Button className="w-full" onClick={resetFlow}>Confirm Appointment</Button>
                                         <Button className="w-full" variant="outline" onClick={() => setStep(3)}>Change Date/Time</Button>
                                    </div>
                                </div>
                            )}
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
                                    <AvatarFallback>PS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Dr. Priya Sharma</p>
                                    <p className="text-sm text-muted-foreground">Aug 15, 2024 - 10:30 AM</p>
                                </div>
                                <Badge className="ml-auto">Upcoming</Badge>
                            </div>
                            <div className="flex items-center">
                                <Avatar className="h-9 w-9 mr-4">
                                    <AvatarImage src="https://picsum.photos/seed/doc2/100/100" />
                                    <AvatarFallback>RG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Dr. Rahul Gupta</p>
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
