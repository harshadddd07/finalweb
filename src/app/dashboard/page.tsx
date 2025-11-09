import { AppLayout } from "@/components/layout/app-layout";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  return (
    // The role will be dynamically determined in a real app
    // Here we pass it down to the client to allow toggling for demo purposes
    <DashboardClient />
  );
}
