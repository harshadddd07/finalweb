'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function VideoCallPage() {
    const mainVideo = PlaceHolderImages.find(img => img.id === 'video-call-main');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const selfVideoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    
    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            setHasCameraPermission(true);
    
            if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing media devices:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Media Access Denied',
              description: 'Please enable camera and microphone permissions in your browser settings to use video call.',
            });
          }
        };
    
        getCameraPermission();

        return () => {
            if (selfVideoRef.current && selfVideoRef.current.srcObject) {
                const stream = selfVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
      }, [toast]);
      
      const toggleMedia = (type: 'audio' | 'video') => {
        if (selfVideoRef.current && selfVideoRef.current.srcObject) {
            const stream = selfVideoRef.current.srcObject as MediaStream;
            const track = type === 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
            if (track) {
                const isEnabled = track.enabled;
                track.enabled = !isEnabled;
                if (type === 'audio') setIsMuted(isEnabled);
                if (type === 'video') setIsCameraOff(isEnabled);
            }
        }
      }

      const handleEndCall = () => {
        if (selfVideoRef.current && selfVideoRef.current.srcObject) {
          const stream = selfVideoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
        // In a real app, this would also notify the other party and close the connection.
        // For this demo, we can just navigate away or close the window if it's a popup.
        toast({ title: "Call Ended" });
      }

    return (
        <AppLayout role="patient">
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Video Call</h1>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="font-medium mb-4">In call with Dr. Sharma</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                           <video ref={selfVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                           {hasCameraPermission === false && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-2 text-sm">
                                Camera access denied
                            </div>
                           )}
                           <div className={cn("absolute inset-0 bg-black/70 flex items-center justify-center text-white", { 'hidden': !isCameraOff })}>
                              <VideoOff className="w-10 h-10" />
                           </div>
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                            {mainVideo && <Image src={mainVideo.imageUrl} alt={mainVideo.description} layout="fill" objectFit="cover" />}
                             <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
                                Dr. Sharma
                            </div>
                        </div>
                    </div>
                    {hasCameraPermission === false && (
                        <Alert variant="destructive" className="max-w-md mx-auto my-4">
                            <AlertTitle>Camera & Mic Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera and microphone access in your browser settings to use this feature.
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => toggleMedia('audio')}>
                            {isMuted ? <MicOff className="h-6 w-6"/> : <Mic className="h-6 w-6"/>}
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={() => toggleMedia('video')}>
                            {isCameraOff ? <VideoOff className="h-6 w-6"/> : <Video className="h-6 w-6"/>}
                        </Button>
                        <Button variant="destructive" size="icon" className="rounded-full w-14 h-14" onClick={handleEndCall}>
                            <Phone className="h-6 w-6" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
