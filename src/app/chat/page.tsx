'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paperclip, Phone, Send, Video, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';
import { getChatResponse } from '@/ai/flows/chat-flow';
import { useToast } from '@/hooks/use-toast';

const aiAssistant = { id: 0, name: 'AI Medical Assistant', specialty: 'General Information', avatar: '', online: true, isAi: true };

const doctors = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist", avatar: "https://picsum.photos/seed/doc1/100/100", online: true, isAi: false },
    { id: 2, name: "Dr. Rahul Gupta", specialty: "Dermatologist", avatar: "https://picsum.photos/seed/doc2/100/100", online: false, isAi: false },
    { id: 3, name: "Dr. Anjali Desai", specialty: "Pediatrician", avatar: "https://picsum.photos/seed/doc3/100/100", online: true, isAi: false },
    { id: 4, name: "Dr. Vikram Singh", specialty: "Neurologist", avatar: "https://picsum.photos/seed/doc4/100/100", online: false, isAi: false },
];

const allContacts = [aiAssistant, ...doctors];

const initialMessages: Record<number, { id: number; sender: string; text: string; time: string; sent: boolean }[]> = {
  0: [
    { id: 1, sender: 'AI Assistant', text: 'Hello! I am your AI Medical Assistant. I am here to help with any general questions you may have. Please remember, I am an AI assistant and not a substitute for professional medical advice. Consult with a qualified healthcare provider for any medical concerns.', time: '11:10 AM', sent: false },
  ],
  1: [
    { id: 1, sender: 'Dr. Priya Sharma', text: 'Hello, how are you feeling today?', time: '10:30 AM', sent: false },
    { id: 2, sender: 'Me', text: 'I am feeling a bit better, thank you for asking!', time: '10:31 AM', sent: true },
    { id: 3, sender: 'Dr. Priya Sharma', text: 'That is great to hear. Remember to take your medication as prescribed.', time: '10:32 AM', sent: false },
  ],
  2: [
      { id: 1, sender: 'AI Assistant', text: 'Hello! I am your AI Medical Assistant. Dr. Rahul Gupta is currently offline, but I am here to help with any general questions you may have. Please remember, I am an AI assistant and not a substitute for professional medical advice. Consult with a qualified healthcare provider for any medical concerns.', time: '11:00 AM', sent: false },
  ],
  3: [],
  4: [
      { id: 1, sender: 'AI Assistant', text: 'Hello! I am your AI Medical Assistant. Dr. Vikram Singh is currently offline, but I am here to help with any general questions you may have. Please remember, I am an AI assistant and not a substitute for professional medical advice. Consult with a qualified healthcare provider for any medical concerns.', time: '11:05 AM', sent: false },
  ],
};


function DoctorList({selectedContact, onSelectContact}: {selectedContact: any, onSelectContact: (contact: any) => void}) {
    return(
        <>
            <CardHeader>
                <Input placeholder="Search..." />
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-2">
                <div className="flex flex-col gap-1">
                {allContacts.map((contact) => (
                    <Button 
                        key={contact.id} 
                        variant={selectedContact.id === contact.id ? 'secondary' : 'ghost'} 
                        className="w-full justify-start h-16 gap-2 p-2"
                        onClick={() => onSelectContact(contact)}
                    >
                        <Avatar className="w-10 h-10 border-2 border-background">
                            {contact.isAi ? (
                                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                            ) : (
                                <>
                                    <AvatarImage src={contact.avatar} />
                                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </>
                            )}
                            {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
                        </Avatar>
                        <div className="text-left">
                            <div className="font-semibold">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.specialty}</div>
                        </div>
                    </Button>
                ))}
                </div>
            </CardContent>
        </>
    )
}

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [selectedContact, setSelectedContact] = useState(allContacts[0]);
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const currentMessages = messages[selectedContact.id] || [];

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [currentMessages, isTyping]);


    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        const userMessage = {
            id: currentMessages.length + 1,
            sender: 'Me',
            text: newMessage,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            sent: true,
        };
        
        const updatedMessages = [...currentMessages, userMessage];
        setMessages(prev => ({ ...prev, [selectedContact.id]: updatedMessages }));
        setNewMessage('');

        if (selectedContact.isAi || !selectedContact.online) {
            setIsTyping(true);
            try {
                const aiResponse = await getChatResponse({
                    history: updatedMessages.map(m => ({ text: m.text, sent: m.sent })),
                    newMessage: newMessage,
                });
                
                const aiMessage = {
                    id: updatedMessages.length + 1,
                    sender: 'AI Assistant',
                    text: aiResponse,
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    sent: false,
                };

                setMessages(prev => ({ ...prev, [selectedContact.id]: [...updatedMessages, aiMessage] }));

            } catch (error) {
                 toast({
                    variant: "destructive",
                    title: "AI Chat Error",
                    description: "Could not get a response from the AI assistant. Please try again.",
                });
            } finally {
                setIsTyping(false);
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }


  return (
    <AppLayout role="patient">
        <Card className="h-[calc(100vh-10rem)] w-full grid md:grid-cols-3 lg:grid-cols-4">
          <div className="hidden flex-col border-r bg-primary-foreground/50 dark:bg-card/50 md:flex">
             <DoctorList selectedContact={selectedContact} onSelectContact={setSelectedContact} />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <div className="flex items-center p-2 border-b">
                <div className="md:hidden pr-2">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-2">
                    <Avatar>
                        {selectedContact.isAi ? (
                             <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                        ) : (
                            <>
                                <AvatarImage src={selectedContact.avatar} />
                                <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </>
                        )}
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{selectedContact.name}</p>
                         <div className="flex items-center gap-1.5">
                            <div className={cn("w-2 h-2 rounded-full", selectedContact.online ? "bg-green-500" : "bg-gray-400")} />
                            <p className={`text-xs ${selectedContact.online ? 'text-green-600' : 'text-muted-foreground'}`}>{selectedContact.online ? 'Online' : 'Offline'}</p>
                            {(!selectedContact.online || selectedContact.isAi) && <Bot className="w-3 h-3 text-muted-foreground" />}
                        </div>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    {!selectedContact.isAi && (
                        <>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/video-call" target="_blank">
                            <Video className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Phone className="h-5 w-5" />
                        </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                    <div key={message.id} className={cn('flex items-end gap-2', message.sent ? 'justify-end' : '')}>
                        {!message.sent && (
                           <Avatar className="w-8 h-8">
                                {message.sender === 'AI Assistant' || selectedContact.isAi ? (
                                    <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                ) : (
                                    <>
                                        <AvatarImage src={selectedContact.avatar} />
                                        <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                        )}
                        <div className={cn('rounded-lg p-3 max-w-xs lg:max-w-md', message.sent ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
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
                 {isTyping && (
                    <div className="flex items-end gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3 max-w-xs lg:max-w-md">
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
                </div>
                
                <div className="p-2 border-t">
                    <div className="relative">
                        <Input
                            placeholder="Type a message..."
                            className="pr-20"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleSendMessage} className="h-8 w-8" disabled={isTyping}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </Card>
        <Sidebar variant="sidebar" side="left" className="md:hidden">
            <SidebarContent className="flex flex-col bg-card p-0">
                <DoctorList selectedContact={selectedContact} onSelectContact={setSelectedContact} />
            </SidebarContent>
        </Sidebar>
    </AppLayout>
  );
}
