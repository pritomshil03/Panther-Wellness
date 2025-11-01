import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Smile, Frown, Meh, Heart, Battery } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";
import { useToast } from "@/hooks/use-toast";

const MoodTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState([5]);
  const [energy, setEnergy] = useState([5]);
  const [stress, setStress] = useState([5]);
  const [social, setSocial] = useState([5]);
  const [motivation, setMotivation] = useState([5]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ level: "", message: "", suggestions: [] as string[] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const avgScore = (sleep[0] + energy[0] + (10 - stress[0]) + social[0] + motivation[0]) / 5;
    
    let level = "";
    let message = "";
    let suggestions: string[] = [];
    
    if (avgScore >= 7) {
      level = "Low Stress";
      message = "You're doing great! Your wellness indicators are positive.";
      suggestions = [
        "Continue your current wellness practices",
        "Share your positive energy with others",
        "Try a gratitude journaling exercise"
      ];
    } else if (avgScore >= 4) {
      level = "Moderate Stress";
      message = "You're managing, but could use some extra self-care.";
      suggestions = [
        "Take a 10-minute mindfulness break",
        "Go for a short walk outside",
        "Practice deep breathing exercises",
        "Connect with a friend or counselor"
      ];
    } else {
      level = "High Stress";
      message = "It seems like you're going through a tough time. Please reach out for support.";
      suggestions = [
        "Consider talking to a BMCC counselor",
        "Try a guided meditation session",
        "Take a break from academic work",
        "Reach out to friends or family",
        "Practice gentle stretching or yoga"
      ];
    }
    
    setResults({ level, message, suggestions });
    setShowResults(true);
    
    toast({
      title: "Mood Check Complete",
      description: `Your stress level: ${level}`,
    });
  };

  const resetForm = () => {
    setShowResults(false);
    setMood("");
    setSleep([5]);
    setEnergy([5]);
    setStress([5]);
    setSocial([5]);
    setMotivation([5]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <img src={pantherLogo} alt="Panther Wellness" className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-primary">Mood & Stress Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {!showResults ? (
          <Card className="shadow-xl border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">How are you feeling today?</CardTitle>
              <CardDescription>
                Take a moment to check in with yourself. Your responses help us provide personalized wellness recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Mood Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">Current Mood</Label>
                  <RadioGroup value={mood} onValueChange={setMood} required>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { value: "happy", label: "Happy", icon: Smile, color: "text-secondary" },
                        { value: "sad", label: "Sad", icon: Frown, color: "text-muted-foreground" },
                        { value: "anxious", label: "Anxious", icon: Heart, color: "text-destructive" },
                        { value: "tired", label: "Tired", icon: Battery, color: "text-muted-foreground" },
                        { value: "calm", label: "Calm", icon: Heart, color: "text-accent" },
                        { value: "neutral", label: "Neutral", icon: Meh, color: "text-muted-foreground" },
                      ].map(({ value, label, icon: Icon, color }) => (
                        <div key={value} className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value={value} id={value} />
                          <Label htmlFor={value} className="flex items-center gap-2 cursor-pointer">
                            <Icon className={`h-5 w-5 ${color}`} />
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sleep Quality */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">
                    Sleep Quality: {sleep[0]}/10
                  </Label>
                  <Slider value={sleep} onValueChange={setSleep} max={10} step={1} className="w-full" />
                </div>

                {/* Energy Level */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">
                    Energy Level: {energy[0]}/10
                  </Label>
                  <Slider value={energy} onValueChange={setEnergy} max={10} step={1} className="w-full" />
                </div>

                {/* Academic Stress */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">
                    Academic Stress: {stress[0]}/10
                  </Label>
                  <Slider value={stress} onValueChange={setStress} max={10} step={1} className="w-full" />
                </div>

                {/* Social Connection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">
                    Social Connection: {social[0]}/10
                  </Label>
                  <Slider value={social} onValueChange={setSocial} max={10} step={1} className="w-full" />
                </div>

                {/* Motivation */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-foreground">
                    Motivation Level: {motivation[0]}/10
                  </Label>
                  <Slider value={motivation} onValueChange={setMotivation} max={10} step={1} className="w-full" />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  Analyze My Mood
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Your Wellness Report</CardTitle>
              <CardDescription>
                Based on your responses, here's your current wellness status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">Stress Level: {results.level}</h3>
                <p className="text-foreground">{results.message}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-primary mb-3">Recommended Activities:</h4>
                <ul className="space-y-2">
                  {results.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span className="text-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetForm} className="flex-1 bg-primary hover:bg-primary/90">
                  Check Mood Again
                </Button>
                <Button onClick={() => navigate("/dashboard")} variant="outline" className="flex-1">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MoodTracker;
