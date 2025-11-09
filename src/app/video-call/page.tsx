'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/icons/logo';

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
        window.close();
      }

    return (
        <div className="w-screen h-screen bg-black text-white flex flex-col">
            <header className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-2">
                <Logo className="w-6 h-6 text-white" />
                <span className="font-bold text-lg">MediSync Pro</span>
              </div>
              <div className="text-center">
                  <h1 className="text-xl font-bold">Dr. Evelyn Reed</h1>
                  <p className="text-sm text-neutral-300">Cardiology</p>
              </div>
              <div className="w-24"></div>
            </header>

            <div className="flex-1 relative overflow-hidden">
                {mainVideo && <Image src={mainVideo.imageUrl} alt={mainVideo.description} layout="fill" objectFit="cover" className="opacity-90" />}
                
                <div className="absolute top-8 right-8 w-48 md:w-64 h-auto aspect-video rounded-lg overflow-hidden border-2 border-white/50 z-10 shadow-2xl">
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
            </div>

            <footer className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="max-w-md mx-auto absolute bottom-24">
                        <AlertTitle>Camera & Mic Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera and microphone access in your browser settings to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
                
                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md p-3 rounded-full">
                    <Button variant="ghost" size="icon" className="rounded-full w-14 h-14 hover:bg-white/20" onClick={() => toggleMedia('audio')}>
                        {isMuted ? <MicOff className="h-6 w-6"/> : <Mic className="h-6 w-6"/>}
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-14 h-14 hover:bg-white/20" onClick={() => toggleMedia('video')}>
                        {isCameraOff ? <VideoOff className="h-6 w-6"/> : <Video className="h-6 w-6"/>}
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-full w-16 h-16" onClick={handleEndCall}>
                        <Phone className="h-7 w-7" />
                    </Button>
                </div>
            </footer>
        </div>
    );
}
