import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music2, Headphones, Heart, Wind } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";

const Music = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [playedItems, setPlayedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("pantherPlayedMusic");
    if (saved) {
      setPlayedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleListen = (title: string) => {
    const newPlayed = new Set(playedItems);
    newPlayed.add(title);
    setPlayedItems(newPlayed);
    localStorage.setItem("pantherPlayedMusic", JSON.stringify([...newPlayed]));
  };

  const moodCategories = [
    {
      mood: "Anxious",
      icon: Wind,
      color: "from-destructive/20 to-destructive/5",
      recommendations: [
        { title: "Deep Breathing Meditation", duration: "10 min", type: "Meditation" },
        { title: "Calming Ocean Waves", duration: "30 min", type: "Nature Sounds" },
        { title: "Progressive Muscle Relaxation", duration: "15 min", type: "Guided" },
      ],
    },
    {
      mood: "Stressed",
      icon: Heart,
      color: "from-accent/20 to-accent/5",
      recommendations: [
        { title: "Lofi Study Beats", duration: "1 hour", type: "Music" },
        { title: "Body Scan Meditation", duration: "20 min", type: "Meditation" },
        { title: "Peaceful Piano", duration: "45 min", type: "Music" },
      ],
    },
    {
      mood: "Tired",
      icon: Headphones,
      color: "from-muted to-muted/50",
      recommendations: [
        { title: "Energy Boost Meditation", duration: "10 min", type: "Meditation" },
        { title: "Uplifting Instrumentals", duration: "30 min", type: "Music" },
        { title: "Morning Affirmations", duration: "8 min", type: "Affirmations" },
      ],
    },
    {
      mood: "Happy",
      icon: Music2,
      color: "from-secondary/20 to-secondary/5",
      recommendations: [
        { title: "Gratitude Meditation", duration: "12 min", type: "Meditation" },
        { title: "Upbeat Positivity Mix", duration: "40 min", type: "Music" },
        { title: "Positive Affirmations", duration: "5 min", type: "Affirmations" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <img src={pantherLogo} alt="Panther Wellness" className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-primary">Music & Meditation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="shadow-xl border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">How are you feeling right now?</CardTitle>
            <CardDescription>
              Select your current mood to get personalized music and meditation recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moodCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.mood}
                    variant={selectedMood === category.mood ? "default" : "outline"}
                    className={`h-24 flex-col gap-2 ${
                      selectedMood === category.mood ? "bg-primary" : ""
                    }`}
                    onClick={() => setSelectedMood(category.mood)}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{category.mood}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedMood && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Recommendations for when you're feeling {selectedMood.toLowerCase()}
            </h2>
            {moodCategories
              .find((cat) => cat.mood === selectedMood)
              ?.recommendations
              .filter((rec) => !playedItems.has(rec.title))
              .map((rec, index) => (
                <Card
                  key={index}
                  className={`shadow-lg border-border/50 bg-gradient-to-r ${
                    moodCategories.find((cat) => cat.mood === selectedMood)?.color
                  }`}
                >
                  <CardContent className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Music2 className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {rec.type} • {rec.duration}
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => handleListen(rec.title)}
                    >
                      <Headphones className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            
            {moodCategories
              .find((cat) => cat.mood === selectedMood)
              ?.recommendations
              .filter((rec) => !playedItems.has(rec.title)).length === 0 && (
              <Card className="shadow-lg border-border/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    You've explored all recommendations for this mood. Try selecting a different mood or check back later!
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-xl border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5 mt-8">
              <CardContent className="py-6">
                <h3 className="text-lg font-semibold text-primary mb-2">💡 Wellness Tip</h3>
                <p className="text-foreground">
                  {selectedMood === "Anxious" &&
                    "Deep breathing can activate your parasympathetic nervous system, helping you feel calmer. Try inhaling for 4 counts, holding for 4, and exhaling for 6."}
                  {selectedMood === "Stressed" &&
                    "Taking short breaks throughout your day can significantly reduce stress. Even 5 minutes of mindful breathing can reset your mind."}
                  {selectedMood === "Tired" &&
                    "If you're feeling tired, a short 10-minute walk or light stretching can boost your energy more effectively than another cup of coffee."}
                  {selectedMood === "Happy" &&
                    "Great mood! This is a perfect time to practice gratitude. Write down 3 things you're grateful for today to reinforce these positive feelings."}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedMood && (
          <Card className="shadow-xl border-border/50 bg-gradient-to-r from-secondary/10 to-accent/10">
            <CardContent className="py-12 text-center">
              <Music2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                Select a mood to get started
              </h3>
              <p className="text-muted-foreground">
                We'll recommend the perfect music and meditations for how you're feeling right now
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Music;
