'use client';

import { AppLayout } from "@/components/layout/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const avatar = PlaceHolderImages.find((img) => img.id === 'avatar-1');
    const role = 'patient'; // This would be dynamic in a real app

    return (
        <AppLayout role={role}>
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Manage your personal information and account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            {avatar && <AvatarImage src={avatar.imageUrl} alt="User Avatar" />}
                            <AvatarFallback className="text-2xl">U</AvatarFallback>
                        </Avatar>
                        <div>
                           <Button>Change Photo</Button>
                           <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue="Liam Johnson" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="liam@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" defaultValue="1990-05-15" />
                        </div>
                         {role === 'doctor' && (
                            <>
                            <div className="space-y-2">
                                <Label htmlFor="specialty">Specialty</Label>
                                <Input id="specialty" defaultValue="Cardiology" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about your professional background..." defaultValue="Experienced Cardiologist with over 15 years in clinical practice. Specializing in..." />
                            </div>
                            </>
                        )}
                    </div>
                    
                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>

                </CardContent>
            </Card>
        </AppLayout>
    );
}
