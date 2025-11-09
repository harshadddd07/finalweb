'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default function EmergencyPage() {
    return (
        <AppLayout role="patient">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="h-6 w-6 text-destructive" />
                    <h1 className="text-3xl font-bold font-headline text-destructive">Emergency</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Contact</CardTitle>
                        <CardDescription>In case of emergency, please contact the number below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold">Contact Number: <a href="tel:123-456-7890" className="text-primary hover:underline">123-456-7890</a></p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
