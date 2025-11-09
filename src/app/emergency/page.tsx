'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, PhoneCall, Hospital, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const nearbyHospitals = [
    { name: "City General Hospital", address: "123 Main Street, Mumbai", phone: "022-21234567" },
    { name: "Apollo Hospital", address: "456 Park Avenue, Delhi", phone: "011-29876543" },
    { name: "Fortis Hospital", address: "789 Lake View Road, Bengaluru", phone: "080-25550000" },
]


function EmergencyContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'patient';

    return (
        <AppLayout role={role as 'patient' | 'doctor'}>
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <ShieldAlert className="h-8 w-8 text-destructive" />
                    <h1 className="text-4xl font-bold font-headline text-destructive">Emergency Services</h1>
                </div>

                <Card className="border-destructive bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <PhoneCall /> Immediate Assistance
                        </CardTitle>
                        <CardDescription>If this is a medical emergency, call for help immediately.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <a href="tel:102" className="w-full">
                            <Button variant="destructive" size="lg" className="w-full text-lg py-6">
                                <PhoneCall className="mr-4 h-6 w-6" /> Call Emergency Services (102)
                            </Button>
                        </a>
                        <p className="text-center text-sm text-muted-foreground mt-4">Or your local emergency number.</p>
                    </CardContent>
                </Card>

                 <div className="grid md:grid-cols-2 gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Hospital /> Nearby Hospitals
                            </CardTitle>
                            <CardDescription>Contact a hospital near you for assistance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {nearbyHospitals.map(hospital => (
                               <div key={hospital.name} className="flex items-start gap-4">
                                   <div className="bg-primary/10 p-2 rounded-full">
                                        <Hospital className="h-5 w-5 text-primary" />
                                   </div>
                                   <div>
                                       <p className="font-semibold">{hospital.name}</p>
                                       <p className="text-sm text-muted-foreground">{hospital.address}</p>
                                       <a href={`tel:${hospital.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                                           <PhoneCall className="h-3 w-3" /> {hospital.phone}
                                       </a>
                                   </div>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlusCircle /> Basic First-Aid
                            </CardTitle>
                            <CardDescription>Quick references for common situations. Not a substitute for professional medical advice.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Minor Cuts and Scrapes</AccordionTrigger>
                                    <AccordionContent>
                                        1. Wash your hands. <br />
                                        2. Stop the bleeding by applying gentle pressure. <br />
                                        3. Clean the wound with water. <br />
                                        4. Apply an antibiotic ointment and a sterile bandage.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Burns (Minor)</AccordionTrigger>
                                    <AccordionContent>
                                       1. Cool the burn under cool (not cold) running water for about 10 minutes. <br />
                                       2. Cover with a sterile gauze bandage. <br />
                                       3. Take an over-the-counter pain reliever. <br />
                                       4. Do not use ice, and do not break blisters.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Choking</AccordionTrigger>
                                    <AccordionContent>
                                        Perform the Heimlich maneuver (abdominal thrusts). Stand behind the person, make a fist with one hand, and place it slightly above their navel. Grasp the fist with the other hand and press hard into the abdomen with a quick, upward thrust — as if trying to lift the person up.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


export default function EmergencyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmergencyContent />
        </Suspense>
    )
}
