import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/components/layout/auth-layout"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Aarav Patel" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="30" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="aarav@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="grid gap-2">
                <Label>Register as</Label>
                <RadioGroup defaultValue="patient" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="patient" id="r-patient" />
                        <Label htmlFor="r-patient">Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="r-doctor" />
                        <Label htmlFor="r-doctor">Doctor</Label>
                    </div>
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Create an account</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
