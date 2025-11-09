'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '../theme-toggle';

type AppHeaderProps = {
  children: React.ReactNode;
};

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-primary-foreground/80 dark:bg-card/80 backdrop-blur-sm px-4 md:px-8">
      <ThemeToggle />
      {children}
    </header>
  );
}
