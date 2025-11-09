import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, MessageCircle, PlusCircle, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const upcomingAppointments = [
  {
    doctor: "Dr. Evelyn Reed",
    specialty: "Cardiologist",
    date: "2024-08-15",
    time: "10:30 AM",
    avatar: "https://picsum.photos/seed/doc1/100/100"
  },
  {
    doctor: "Dr. Samuel Green",
    specialty: "Dermatologist",
    date: "2024-08-20",
    time: "02:00 PM",
    avatar: "https://picsum.photos/seed/doc2/100/100"
  },
];

export default function PatientDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
            <h1 className="text-3xl font-bold font-headline mb-4">Welcome Back, Patient!</h1>
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
            </div>
        </div>

        <Card className="xl:col-span-1">
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>You have {upcomingAppointments.length} upcoming appointments.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {upcomingAppointments.map((appt, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={appt.avatar} alt={appt.doctor} />
                            <AvatarFallback>{appt.doctor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{appt.doctor}</p>
                            <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                            <p className="text-xs text-muted-foreground">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appt.time}</p>
                        </div>
                        <Button variant="outline" size="icon" className="ml-auto">
                            <Video className="h-4 w-4" />
                            <span className="sr-only">Start Video Call</span>
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
