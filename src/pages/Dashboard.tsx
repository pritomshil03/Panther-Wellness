import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, Target, Music, LogOut } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";
import { useToast } from "@/hooks/use-toast";
import { AppointmentDialog } from "@/components/AppointmentDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("pantherUser");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("pantherUser");
    toast({
      title: "Logged Out",
      description: "See you soon! Take care of yourself.",
    });
    navigate("/login");
  };

  const dashboardCards = [
    {
      title: "Mood & Stress Tracker",
      description: "Check in with yourself and track your emotional well-being",
      icon: Brain,
      path: "/mood-tracker",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      title: "AI Wellness Companion",
      description: "Chat with our supportive AI assistant in multiple languages",
      icon: MessageCircle,
      path: "/chatbot",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      title: "Wellness Goals",
      description: "Set and track your personal wellness journey",
      icon: Target,
      path: "/goals",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "Music & Meditation",
      description: "Find calming music and guided meditations for your mood",
      icon: Music,
      path: "/music",
      gradient: "from-muted to-muted/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={pantherLogo} alt="Panther Wellness" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-primary hidden sm:block">Panther Wellness</h1>
          </div>
          <div className="flex items-center gap-2">
            <AppointmentDialog />
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Welcome to Your Wellness Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a moment for yourself. Your mental health matters.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {dashboardCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.path}
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 bg-gradient-to-br ${card.gradient} hover:scale-[1.02]`}
                onClick={() => navigate(card.path)}
              >
                <CardHeader className="space-y-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">{card.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
