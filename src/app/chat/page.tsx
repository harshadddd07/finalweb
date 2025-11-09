'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paperclip, Phone, Send, Video } from 'lucide-react';

const doctors = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", avatar: "https://picsum.photos/seed/doc1/100/100", online: true },
    { id: 2, name: "Dr. Rahul Gupta", specialty: "Dermatologist", avatar: "https://picsum.photos/seed/doc2/100/100", online: false },
    { id: 3, name: "Dr. Anjali Desai", specialty: "Pediatrician", avatar: "https://picsum.photos/seed/doc3/100/100", online: true },
    { id: 4, name: "Dr. Vikram Singh", specialty: "Neurologist", avatar: "https://picsum.photos/seed/doc4/100/100", online: true },
];

const initialMessages = [
  { id: 1, sender: 'Dr. Priya Sharma', text: 'Hello, how are you feeling today?', time: '10:30 AM', sent: false },
  { id: 2, sender: 'Me', text: 'I am feeling a bit better, thank you for asking!', time: '10:31 AM', sent: true },
  { id: 3, sender: 'Dr. Priya Sharma', text: 'That is great to hear. Remember to take your medication as prescribed.', time: '10:32 AM', sent: false },
];

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

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
                <Input placeholder="Search doctors..." />
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-2">
                <div className="flex flex-col gap-1">
                {doctors.map((doctor) => (
                    <Button 
                        key={doctor.id} 
                        variant={selectedDoctor.id === doctor.id ? 'secondary' : 'ghost'} 
                        className="w-full justify-start h-16 gap-2 p-2"
                        onClick={() => setSelectedDoctor(doctor)}
                    >
                        <Avatar className="w-10 h-10 border-2 border-background">
                            <AvatarImage src={doctor.avatar} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            {doctor.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                        </Avatar>
                        <div className="text-left">
                            <div className="font-semibold">{doctor.name}</div>
                            <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
                        </div>
                    </Button>
                ))}
                </div>
            </CardContent>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <div className="flex items-center p-2 border-b">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={selectedDoctor.avatar} />
                        <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{selectedDoctor.name}</p>
                        <p className={`text-xs ${selectedDoctor.online ? 'text-green-500' : 'text-muted-foreground'}`}>{selectedDoctor.online ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/video-call" target="_blank">
                          <Video className="h-5 w-5" />
                        </Link>
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
                            <AvatarImage src={selectedDoctor.avatar} />
                            <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        )}
                        <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${message.sent ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 text-right opacity-70">{message.time}</p>
                        </div>
                        {message.sent && (
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="https://picsum.photos/seed/me/100/100" />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                ))}
                </div>
                
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
