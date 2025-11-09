'use client';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/components/layout/app-layout';
import PatientDashboard from './patient-dashboard';
import DoctorDashboard from './doctor-dashboard';

export default function DashboardClient() {
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');

    return (
        <AppLayout role={role}>
            <div className="flex justify-end items-center space-x-2 mb-6 p-2 bg-primary-foreground dark:bg-card rounded-lg shadow-sm">
                <Label htmlFor="role-switch">Patient</Label>
                <Switch 
                    id="role-switch"
                    checked={role === 'doctor'}
                    onCheckedChange={(checked) => setRole(checked ? 'doctor' : 'patient')}
                    aria-label="Toggle role view"
                />
                <Label htmlFor="role-switch">Doctor</Label>
            </div>
            {role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
        </AppLayout>
    )
}
