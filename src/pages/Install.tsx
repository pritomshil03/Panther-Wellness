import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Check, Smartphone, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Already Installed",
        description: "The app is already installed on your device",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast({
        title: "Success!",
        description: "App installed successfully",
      });
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Smartphone className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Install Panther Buddy</CardTitle>
          <CardDescription>
            Get the full app experience on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Works Offline</p>
                <p className="text-sm text-muted-foreground">
                  Access your wellness tools anytime
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Fast & Reliable</p>
                <p className="text-sm text-muted-foreground">
                  Quick loading and smooth performance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Home Screen Access</p>
                <p className="text-sm text-muted-foreground">
                  Launch like any other app
                </p>
              </div>
            </div>
          </div>

          {isInstalled ? (
            <div className="text-center py-4 space-y-2">
              <Check className="h-12 w-12 text-primary mx-auto" />
              <p className="font-medium">App Already Installed!</p>
              <p className="text-sm text-muted-foreground">
                You can find it on your home screen
              </p>
            </div>
          ) : (
            <>
              <Button 
                onClick={handleInstall} 
                className="w-full" 
                size="lg"
                disabled={!deferredPrompt}
              >
                <Download className="mr-2 h-5 w-5" />
                Install App
              </Button>
              
              {!deferredPrompt && (
                <div className="text-sm text-muted-foreground text-center space-y-2">
                  <p>Can't see the install button?</p>
                  <div className="space-y-1 text-xs">
                    <p><strong>iPhone:</strong> Tap Share → Add to Home Screen</p>
                    <p><strong>Android:</strong> Tap Menu → Install App</p>
                  </div>
                </div>
              )}
            </>
          )}

          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard'}
          >
            <X className="mr-2 h-4 w-4" />
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;