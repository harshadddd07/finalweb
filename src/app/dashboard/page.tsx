'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AppLayout } from "@/components/layout/app-layout";
import PatientDashboard from "@/components/dashboard/patient-dashboard";
import DoctorDashboard from "@/components/dashboard/doctor-dashboard";
import { Skeleton } from '@/components/ui/skeleton';

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') === 'doctor' ? 'doctor' : 'patient';
  
  return (
    <AppLayout role={role}>
      {role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
    </AppLayout>
  );
}

function DashboardLoading() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') === 'doctor' ? 'doctor' : 'patient';
  
  return (
    <AppLayout role={role}>
      <div className="p-8">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-96" />
          <div className="space-y-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
