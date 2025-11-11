'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';


function CalendarContent() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'patient';

    return (
        <AppLayout role={role as 'patient' | 'doctor'}>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6" />
                    <h1 className="text-3xl font-bold font-headline">Calendar</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Schedule</CardTitle>
                        <CardDescription>View your upcoming appointments.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default function CalendarPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CalendarContent />
        </Suspense>
    );
}