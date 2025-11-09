'use client';
import { useState, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paperclip, Phone, Send, Video } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const contacts = [
  { id: 1, name: 'Dr. Evelyn Reed', specialty: 'Cardiologist', avatarId: 'avatar-2', online: true },
  { id: 2, name: 'Liam Johnson', specialty: 'Patient', avatarId: 'avatar-1', online: false },
  { id: 3, name: 'Dr. Samuel Green', specialty: 'Dermatologist', avatarId: 'avatar-3', online: true },
];

const initialMessages = [
  { id: 1, sender: 'Dr. Evelyn Reed', text: 'Hello, how are you feeling today?', time: '10:30 AM', sent: false },
  { id: 2, sender: 'Me', text: 'I am feeling a bit better, thank you for asking!', time: '10:31 AM', sent: true },
  { id: 3, sender: 'Dr. Evelyn Reed', text: 'That is great to hear. Remember to take your medication as prescribed.', time: '10:32 AM', sent: false },
];

export default function ChatPage() {
    const [isVideoCall, setVideoCall] = useState(false);
    const mainVideo = PlaceHolderImages.find(img => img.id === 'video-call-main');
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    const selfVideoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    
    useEffect(() => {
        if (!isVideoCall) return;

        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);
    
            if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this app.',
            });
          }
        };
    
        getCameraPermission();

        // Cleanup function to stop video stream
        return () => {
            if (selfVideoRef.current && selfVideoRef.current.srcObject) {
                const stream = selfVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
      }, [isVideoCall, toast]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const newMsg = {
            id: messages.length + 1,
            sender: 'Me',
            text: newMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            sent: true,
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }


  return (
    <AppLayout role="patient">
        <Card className="h-[calc(100vh-10rem)] w-full grid md:grid-cols-3 lg:grid-cols-4">
          <div className="flex-col border-r bg-primary-foreground/50 dark:bg-card/50 md:flex">
            <CardHeader>
                <Input placeholder="Search contacts..." />
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-2">
                <div className="flex flex-col gap-1">
                {contacts.map((contact) => {
                    const avatar = PlaceHolderImages.find(img => img.id === contact.avatarId);
                    return (
                    <Button key={contact.id} variant="ghost" className="w-full justify-start h-16 gap-2 p-2">
                        <Avatar className="w-10 h-10 border-2 border-background">
                        {avatar && <AvatarImage src={avatar.imageUrl} />}
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                        </Avatar>
                        <div className="text-left">
                        <div className="font-semibold">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.specialty}</div>
                        </div>
                    </Button>
                    );
                })}
                </div>
            </CardContent>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <div className="flex items-center p-2 border-b">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl} />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Dr. Evelyn Reed</p>
                        <p className="text-xs text-green-500">Online</p>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setVideoCall(!isVideoCall)}>
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2 ${message.sent ? 'justify-end' : ''}`}>
                        {!message.sent && (
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl} />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        )}
                        <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${message.sent ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 text-right opacity-70">{message.time}</p>
                        </div>
                        {message.sent && (
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl} />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                ))}
                </div>

                {isVideoCall && (
                    <div className="relative bg-black min-h-[300px] border-t p-4 flex flex-col gap-4">
                         {mainVideo && <Image src={mainVideo.imageUrl} alt={mainVideo.description} layout="fill" objectFit="cover" />}
                        
                        <div className="absolute top-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white z-10">
                           <video ref={selfVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                           {hasCameraPermission === false && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-2">
                                Camera access denied
                            </div>
                           )}
                        </div>

                         <div className="flex-1" />

                        {hasCameraPermission === false && (
                            <Alert variant="destructive" className="max-w-md mx-auto">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access in your browser settings to use this feature.
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        <div className="flex justify-center gap-4 z-10">
                            <Button variant="destructive" size="lg" onClick={() => setVideoCall(false)}>End Call</Button>
                        </div>
                    </div>
                )}
                
                <div className="p-4 border-t">
                    <div className="relative">
                        <Input
                            placeholder="Type a message..."
                            className="pr-24"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleSendMessage}>
                            <Send className="h-5 w-5" />
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </Card>
    </AppLayout>
  );
}
