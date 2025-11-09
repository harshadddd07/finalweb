'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Bell,
  LineChart,
  Home,
  Calendar,
  MessageCircle,
  CreditCard,
  User,
  LogOut,
  Settings,
  ShieldAlert,
  Video,
  BrainCircuit,
} from 'lucide-react';

import { AppHeader } from './header';
import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import { Logo } from '../icons/logo';
import { Button } from '../ui/button';

type AppLayoutProps = {
  children: React.ReactNode;
  role: 'doctor' | 'patient';
};

export function AppLayout({ children, role }: AppLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get('role');

  const patientNav = [
    { href: '/dashboard?role=patient', label: 'Dashboard', icon: Home },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/symptom-analyzer', label: 'Symptom Analyzer', icon: BrainCircuit },
    { href: '/emergency', label: 'Emergency', icon: ShieldAlert },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const doctorNav = [
    { href: '/dashboard?role=doctor', label: 'Dashboard', icon: Home },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/symptom-analyzer', label: 'Symptom Analyzer', icon: BrainCircuit },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const navItems = role === 'doctor' ? doctorNav : patientNav;
  
  // The chat page has its own sidebar for doctor selection on mobile.
  const isChatPage = pathname === '/chat';


  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="bg-primary-foreground dark:bg-card border-r dark:border-border/20"
          hidden={isChatPage}
        >
          <SidebarHeader className="p-4 flex items-center gap-2">
            <Link href={`/dashboard?role=${role}`} className="flex items-center gap-2">
              <Logo className="w-8 h-8 text-primary" />
              <span className="text-lg font-headline font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                MediSync Pro
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <MainNav items={navItems} />
          </SidebarContent>
          <SidebarFooter className="p-2">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-4 h-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Settings
                </span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive" asChild>
                <Link href="/" className="flex items-center gap-2 w-full">
                  <LogOut className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Logout
                  </span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          <AppHeader>
             {!isChatPage && (
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
            )}
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <UserNav role={role} />
            </div>
          </AppHeader>
          <main className="flex-1 p-4 md:p-8 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
