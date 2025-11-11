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
  // This is now a static loading component without hooks.
  // The role for the layout during loading is less critical, so we can default to 'patient'
  // or remove role-specific elements from the loading AppLayout if needed.
  return (
    <AppLayout role={'patient'}>
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
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
