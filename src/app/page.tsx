import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Stethoscope, Calendar, Video, BrainCircuit, FileText } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Card, CardContent } from '@/components/ui/card';

const features = [
    {
      icon: Calendar,
      title: "Easy Appointments",
      description: "Book and manage your appointments with specialists in just a few clicks.",
    },
    {
      icon: Video,
      title: "Video Consultations",
      description: "Connect with your doctor from the comfort of your home via secure video calls.",
    },
    {
      icon: BrainCircuit,
      title: "AI Symptom Analyzer",
      description: "Get preliminary insights into your symptoms with our AI-powered analysis tool.",
    },
     {
      icon: FileText,
      title: "Digital Records",
      description: "Access your medical history, prescriptions, and lab reports all in one place.",
    },
  ];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-section');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80">
          <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
            <Logo className="h-6 w-auto" />
            <span className="sr-only">MediSync Pro</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Register</Link>
            </Button>
            </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Seamless Healthcare at Your Fingertips
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience the future of healthcare with our all-in-one platform. Schedule appointments, consult with doctors via video call, and manage your health effortlessly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/login">
                      Access Your Portal
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/register">
                      Join as a Patient
                    </Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-primary-foreground/30 dark:bg-card/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Healthier You is a Click Away</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           Our platform is designed to provide you with a comprehensive and convenient healthcare experience.
                        </p>
                    </div>
                </div>
                 <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="h-full">
                                <CardContent className="flex flex-col items-center text-center p-6 gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 MediSync Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Terms of Service
            </Link>
             <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                Privacy
            </Link>
        </nav>
      </footer>
    </div>
  );
}
