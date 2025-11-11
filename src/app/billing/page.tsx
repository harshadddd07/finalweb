'use client';

import { useState, Suspense } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const initialTransactions = [
  { id: "INV001", date: "2024-07-22", description: "Consultation with Dr. Sharma", amount: 500, status: "Paid" },
  { id: "INV002", date: "2024-07-15", description: "Dermatology Follow-up", amount: 750, status: "Paid" },
  { id: "INV003", date: "2024-06-30", description: "Pediatric Check-up", amount: 1000, status: "Paid" },
  { id: "INV004", date: "2024-08-01", description: "Cardiology Consultation", amount: 1500, status: "Pending" },
];

const UPI_ID = 'harshadshewale31@okhdfcbank';
const PAYEE_NAME = 'MediSync Pro';

function BillingContent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'patient';
    
    const [transactions, setTransactions] = useState(initialTransactions);
    const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

    const handleDownload = (invoiceId: string) => {
        toast({
            title: "Invoice Downloaded",
            description: `Your invoice record (${invoiceId}) has been downloaded.`,
        });
    }

    const createUpiLink = (amount: number, description: string) => {
      const upiUrl = new URL('upi://pay');
      upiUrl.searchParams.set('pa', UPI_ID);
      upiUrl.searchParams.set('pn', PAYEE_NAME);
      upiUrl.searchParams.set('am', amount.toString());
      upiUrl.searchParams.set('cu', 'INR');
      upiUrl.searchParams.set('tn', `Payment for ${description}`);
      return upiUrl.toString();
    }
    
    const pendingInvoice = transactions.find(tx => tx.status === 'Pending');

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
                                            <TableCell>₹{tx.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant={tx.status === 'Paid' ? 'default' : 'destructive'}>{tx.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {tx.status === 'Paid' ? (
                                                    <Button variant="ghost" size="icon" onClick={() => handleDownload(tx.id)}>
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Download Invoice</span>
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        size="sm" 
                                                        asChild
                                                    >
                                                        <Link href={createUpiLink(tx.amount, tx.description)} target="_blank">
                                                            <CreditCard className="mr-2 h-4 w-4" />
                                                            Pay Now
                                                        </Link>
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                   {pendingInvoice ? (
                     <Card>
                        <CardHeader>
                            <CardTitle>Complete Your Payment</CardTitle>
                            <CardDescription>You have an outstanding payment.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className='flex justify-between items-center p-4 bg-muted/50 rounded-lg'>
                                <div>
                                    <p className='text-sm text-muted-foreground'>{pendingInvoice.description}</p>
                                    <p className='text-xl font-bold'>₹{pendingInvoice.amount}</p>
                                </div>
                                <div className='text-right'>
                                     <p className='text-sm text-muted-foreground'>Invoice ID</p>
                                     <p className='font-mono'>{pendingInvoice.id}</p>
                                </div>
                            </div>
                            <Button 
                                className="w-full" 
                                size="lg" 
                                asChild
                            >
                               <Link href={createUpiLink(pendingInvoice.amount, pendingInvoice.description)} target="_blank">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pay ₹{pendingInvoice.amount} Now
                               </Link>
                            </Button>
                            <p className='text-center text-xs text-muted-foreground'>You will be redirected to your UPI app to complete the payment.</p>
                        </CardContent>
                    </Card>
                   ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>All Clear!</CardTitle>
                            <CardDescription>You have no pending payments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center text-muted-foreground p-8">
                                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                All your invoices are paid. Thank you!
                            </div>
                        </CardContent>
                    </Card>
                   )}
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
