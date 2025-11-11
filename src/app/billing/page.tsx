'use client';

import { useState, Suspense, useMemo } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, CreditCard, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialTransactions = [
  { id: "INV001", date: "2024-07-22", description: "Consultation with Dr. Sharma", amount: 500, status: "Paid" },
  { id: "INV002", date: "2024-07-15", description: "Dermatology Follow-up", amount: 750, status: "Paid" },
  { id: "INV003", date: "2024-06-30", description: "Pediatric Check-up", amount: 1000, status: "Paid" },
  { id: "INV004", date: "2024-08-01", description: "Cardiology Consultation", amount: 1500, status: "Pending" },
];

const PAYEE_UPI_ID = 'harshadshewale31@okhdfcbank';
const PAYEE_NAME = 'MediSync Pro';

function BillingContent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'patient';
    
    const [transactions, setTransactions] = useState(initialTransactions);
    const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);

    const [payerUpiId, setPayerUpiId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');

    const createUpiLink = (amount: number, description: string, upiId?: string) => {
      const upiUrl = new URL('upi://pay');
      upiUrl.searchParams.set('pa', upiId || PAYEE_UPI_ID);
      upiUrl.searchParams.set('pn', PAYEE_NAME);
      upiUrl.searchParams.set('am', amount.toString());
      upiUrl.searchParams.set('cu', 'INR');
      upiUrl.searchParams.set('tn', `Payment for ${description}`);
      return upiUrl.toString();
    }
    
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerateLink = () => {
        if (!payerUpiId || !paymentAmount || Number(paymentAmount) <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Input',
                description: 'Please enter a valid UPI ID and amount.',
            });
            return;
        }
        const link = createUpiLink(Number(paymentAmount), 'MediSync Pro Bill', payerUpiId);
        setGeneratedLink(link);
    };


    const handleDownload = (invoiceId: string) => {
        toast({
            title: "Invoice Downloaded",
            description: `Your invoice record (${invoiceId}) has been downloaded.`,
        });
    }
    
    const pendingInvoice = transactions.find(tx => tx.status === 'Pending');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied to Clipboard',
            description: 'The payment link has been copied.',
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
                <div className="space-y-8">
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
                   <Card>
                        <CardHeader>
                            <CardTitle>Request Payment from Others</CardTitle>
                            <CardDescription>Generate a payment link to share with someone else.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="payer-upi">Payer's UPI ID</Label>
                                <Input id="payer-upi" placeholder="example@upi" value={payerUpiId} onChange={(e) => setPayerUpiId(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment-amount">Amount (₹)</Label>
                                <Input id="payment-amount" type="number" placeholder="Enter amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
                            </div>
                             <Button className="w-full" onClick={handleGenerateLink}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Generate Payment Link
                            </Button>
                             {generatedLink && (
                                <div className='space-y-2 pt-2'>
                                    <Label htmlFor='generated-link'>Share this link:</Label>
                                     <div className="flex gap-2">
                                        <Input id='generated-link' value={generatedLink} readOnly />
                                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedLink)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
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
