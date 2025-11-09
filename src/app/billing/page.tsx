'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const transactions = [
  { id: "INV001", date: "2024-07-22", description: "Consultation with Dr. Sharma", amount: "₹500", status: "Paid" },
  { id: "INV002", date: "2024-07-15", description: "Dermatology Follow-up", amount: "₹750", status: "Paid" },
  { id: "INV003", date: "2024-06-30", description: "Pediatric Check-up", amount: "₹1000", status: "Paid" },
  { id: "INV004", date: "2024-08-01", description: "Cardiology Consultation", amount: "₹1500", status: "Pending" },
];

function BillingContent() {
    const qrCodeImage = PlaceHolderImages.find((img) => img.id === 'qr-code');
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'patient';

    const handleDownload = (invoiceId: string) => {
        toast({
            title: "Invoice Downloaded",
            description: `Your invoice record (${invoiceId}) has been downloaded.`,
        });
    }

    return (
        <AppLayout role={role as 'patient' | 'doctor'}>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                            <CardDescription>A record of your past transactions and invoices.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-medium">{tx.id}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{tx.date}</TableCell>
                                            <TableCell>{tx.description}</TableCell>
                                            <TableCell>{tx.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant={tx.status === 'Paid' ? 'default' : 'destructive'}>{tx.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleDownload(tx.id)}>
                                                    <Download className="h-4 w-4" />
                                                    <span className="sr-only">Download Invoice</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Make a Payment</CardTitle>
                            <CardDescription>Scan the QR code to pay via UPI.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center gap-4">
                            {qrCodeImage && (
                                <Image
                                    src={qrCodeImage.imageUrl}
                                    alt={qrCodeImage.description}
                                    width={150}
                                    height={150}
                                    data-ai-hint={qrCodeImage.imageHint}
                                />
                            )}
                            <div className="space-y-1">
                                <p className="text-sm font-medium">UPI ID:</p>
                                <p className="font-mono text-lg p-2 bg-muted rounded-md">aditirai44530@okaxis</p>
                            </div>
                             <Button className="w-full">Copy UPI ID</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


export default function BillingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BillingContent />
        </Suspense>
    )
}
