'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle, PlusCircle, Video, BrainCircuit, HeartPulse, Droplets, Activity } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const upcomingAppointments = [
  {
    doctor: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    date: "2024-08-15",
    time: "10:30 AM",
    avatar: "https://picsum.photos/seed/doc1/100/100"
  },
  {
    doctor: "Dr. Rahul Gupta",
    specialty: "Dermatologist",
    date: "2024-08-20",
    time: "02:00 PM",
    avatar: "https://picsum.photos/seed/doc2/100/100"
  },
];

export default function PatientDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold font-headline mb-4">Welcome Back, Aarav!</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Schedule Appointment</CardTitle>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Book your next consultation with one of our specialists.
                        </p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild className="w-full">
                            <Link href="/appointments">Schedule Now</Link>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Chat with a Doctor</CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Get quick answers to your health questions.
                        </p>
                    </CardContent>
                     <CardFooter>
                         <Button asChild className="w-full" variant="secondary">
                            <Link href="/chat">Start Chat</Link>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="md:col-span-2">
                     <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Symptom Analysis</CardTitle>
                        <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                           Use our AI-powered tool to analyze your symptoms. This does not replace professional medical advice.
                        </p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild className="w-full" variant="outline">
                            <Link href="/symptom-analyzer">Launch Tool</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have {upcomingAppointments.length} upcoming appointments.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {upcomingAppointments.map((appt, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={appt.avatar} alt={appt.doctor} />
                                <AvatarFallback>{appt.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{appt.doctor}</p>
                                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                                <p className="text-xs text-muted-foreground">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appt.time}</p>
                            </div>
                            <Button asChild variant="outline" size="icon" className="ml-auto">
                                <Link href="/video-call" target="_blank">
                                    <Video className="h-4 w-4" />
                                    <span className="sr-only">Start Video Call</span>
                                </Link>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Health Vitals</CardTitle>
                    <CardDescription>Your latest recorded metrics.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full"><HeartPulse className="h-5 w-5 text-primary" /></div>
                            <span className="font-medium">Blood Pressure</span>
                        </div>
                        <span className="font-bold text-lg">120/80 <span className="text-sm font-normal text-muted-foreground">mmHg</span></span>
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/20 rounded-full"><Activity className="h-5 w-5 text-accent-foreground" /></div>
                            <span className="font-medium">Heart Rate</span>
                        </div>
                        <span className="font-bold text-lg">72 <span className="text-sm font-normal text-muted-foreground">bpm</span></span>
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="p-2 bg-destructive/10 rounded-full"><Droplets className="h-5 w-5 text-destructive" /></div>
                            <span className="font-medium">Blood Sugar</span>
                        </div>
                        <span className="font-bold text-lg">95 <span className="text-sm font-normal text-muted-foreground">mg/dL</span></span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">View History</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
