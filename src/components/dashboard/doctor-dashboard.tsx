import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Check, LineChart, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const appointmentRequests = [
    { name: "Aarav Patel", avatar: "https://picsum.photos/seed/pat1/100/100", email: "aarav@example.com", date: "2024-08-15", time: "11:00 AM" },
    { name: "Saanvi Singh", avatar: "https://picsum.photos/seed/pat2/100/100", email: "saanvi@example.com", date: "2024-08-15", time: "12:30 PM" },
    { name: "Advik Kumar", avatar: "https://picsum.photos/seed/pat3/100/100", email: "advik@example.com", date: "2024-08-16", time: "09:00 AM" },
];

const liveChatMessages = [
    { name: "Myra Reddy", message: "Hello Dr, I have a quick question about my prescription.", avatar: "https://picsum.photos/seed/pat4/100/100", time: "5m ago" },
    { name: "Ishaan Joshi", message: "Is it normal to feel dizzy after the medication?", avatar: "https://picsum.photos/seed/pat5/100/100", time: "1h ago" },
];

export default function DoctorDashboard() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
        <h1 className="text-3xl font-bold font-headline">Doctor's Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+3 since yesterday</p>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Symptom Analysis</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">AI-powered tool to assist in diagnosis.</p>
                     <Button asChild size="sm">
                        <Link href="/symptom-analyzer">Launch Tool</Link>
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
                        <Link href="/chat">Open Chat</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
             <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Appointment Requests</CardTitle>
                        <CardDescription>New requests from patients for consultations.</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/appointments">View All <ArrowUpRight className="h-4 w-4" /></Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointmentRequests.map((req) => (
                                <TableRow key={req.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={req.avatar} alt={req.name} />
                                                <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{req.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{req.date} at {req.time}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="icon" className="mr-2 h-8 w-8">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" className="h-8 w-8">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>Recent messages from your patients.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {liveChatMessages.map((msg, index) => (
                         <div key={index} className="flex items-start gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={msg.avatar} alt={msg.name} />
                                <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium leading-none">{msg.name}</p>
                                    <p className="text-xs text-muted-foreground">{msg.time}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button className="w-full">
                        <MessageCircle className="mr-2 h-4 w-4" /> Go to Chat
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
