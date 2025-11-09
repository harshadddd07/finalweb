'use client';
import { AppLayout } from "@/components/layout/app-layout";
import SymptomAnalyzerClient from "@/components/symptom-analyzer/symptom-analyzer-client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SymptomAnalyzerContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'patient';
  
  return (
    <AppLayout role={role as 'patient' | 'doctor'}>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Symptom Analysis Tool</h1>
          <p className="text-muted-foreground">
            An AI-powered assistant to help identify potential diseases based on reported symptoms.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Enter Symptoms</CardTitle>
                <CardDescription>
                    Please enter patient symptoms, separated by commas, for analysis.
                    This tool is for informational purposes and does not replace professional medical advice.
                </CardDescription>
            </CardHeader>
            <SymptomAnalyzerClient />
        </Card>
      </div>
    </AppLayout>
  );
}

export default function SymptomAnalyzerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SymptomAnalyzerContent />
        </Suspense>
    )
}
