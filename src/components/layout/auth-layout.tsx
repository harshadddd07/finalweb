import { Logo } from "@/components/icons/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
       <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-auto text-primary" />
                <span className="text-2xl font-bold font-headline">MediSync Pro</span>
            </Link>
        </div>
        {children}
       </div>
    </div>
  );
}
