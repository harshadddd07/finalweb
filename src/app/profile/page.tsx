'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const avatar = PlaceHolderImages.find((img) => img.id === 'avatar-1');
    const role = 'patient'; // This would be dynamic in a real app

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Dashboard</span>
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
                        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4 text-center">
                                <Avatar className="h-32 w-32">
                                    {avatar && <AvatarImage src={avatar.imageUrl} alt="User Avatar" />}
                                    <AvatarFallback className="text-4xl">AP</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button>Change Photo</Button>
                                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" defaultValue="Aarav Patel" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue="aarav@example.com" disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input id="dob" type="date" defaultValue="1990-05-15" />
                                    </div>
                                </div>
                                {role === 'doctor' && (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="specialty">Specialty</Label>
                                            <Input id="specialty" defaultValue="Cardiology" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="bio">Professional Bio</Label>
                                            <Textarea id="bio" placeholder="Tell us about your professional background..." defaultValue="Experienced Cardiologist with over 15 years in clinical practice. Specializing in..." />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input id="password" type="password" placeholder="Enter new password" />
                            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end mt-8">
                    <Button size="lg">Save All Changes</Button>
                </div>
            </div>
        </div>
    );
}
