import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
}

const Goals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("7");
  const [newGoalUnit, setNewGoalUnit] = useState("days");

  useEffect(() => {
    const savedGoals = localStorage.getItem("pantherGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      const defaultGoals: Goal[] = [
        { id: "1", title: "Sleep 8 hours per night", progress: 0, target: 7, unit: "nights" },
        { id: "2", title: "Exercise regularly", progress: 0, target: 3, unit: "sessions" },
        { id: "3", title: "Practice mindfulness", progress: 0, target: 5, unit: "days" },
      ];
      setGoals(defaultGoals);
      localStorage.setItem("pantherGoals", JSON.stringify(defaultGoals));
    }
  }, []);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem("pantherGoals", JSON.stringify(updatedGoals));
  };

  const addGoal = () => {
    if (!newGoalTitle.trim()) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      progress: 0,
      target: parseInt(newGoalTarget) || 7,
      unit: newGoalUnit,
    };

    saveGoals([...goals, newGoal]);
    setNewGoalTitle("");
    setNewGoalTarget("7");
    
    toast({
      title: "Goal Added!",
      description: "You're taking great steps towards wellness!",
    });
  };

  const incrementProgress = (goalId: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId && goal.progress < goal.target) {
        const newProgress = goal.progress + 1;
        
        if (newProgress === goal.target) {
          toast({
            title: "Goal Completed! 🎉",
            description: `Amazing work on "${goal.title}"! You're doing great!`,
          });
        }
        
        return { ...goal, progress: newProgress };
      }
      return goal;
    });
    saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    saveGoals(updatedGoals);
    
    toast({
      title: "Goal Removed",
      description: "You can always add new goals anytime!",
    });
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
          <h1 className="text-xl font-bold text-primary">Wellness Goals</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Add New Goal */}
        <Card className="shadow-xl border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Create a New Goal</CardTitle>
            <CardDescription>
              Set achievable wellness goals and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Goal (e.g., Meditate daily)"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="flex-1 bg-background"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Target"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="w-20 bg-background"
                  min="1"
                />
                <Input
                  placeholder="Unit"
                  value={newGoalUnit}
                  onChange={(e) => setNewGoalUnit(e.target.value)}
                  className="w-28 bg-background"
                />
                <Button onClick={addGoal} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <Card className="shadow-xl border-border/50">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No goals yet. Create your first wellness goal above!
                </p>
              </CardContent>
            </Card>
          ) : (
            goals.map((goal) => {
              const progressPercent = (goal.progress / goal.target) * 100;
              const isCompleted = goal.progress >= goal.target;

              return (
                <Card
                  key={goal.id}
                  className={`shadow-lg border-border/50 transition-all ${
                    isCompleted ? "bg-gradient-to-r from-secondary/10 to-accent/10" : ""
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                          {goal.title}
                          {isCompleted && <CheckCircle2 className="h-5 w-5 text-secondary" />}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.progress} / {goal.target} {goal.unit}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <Progress value={progressPercent} className="h-3" />
                      
                      {!isCompleted && (
                        <Button
                          onClick={() => incrementProgress(goal.id)}
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Mark Progress (+1)
                        </Button>
                      )}
                      
                      {isCompleted && (
                        <div className="bg-secondary/20 text-secondary rounded-lg p-3 text-center font-semibold">
                          🎉 Goal Completed! Keep up the great work!
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Motivational Message */}
        {goals.length > 0 && (
          <Card className="mt-8 shadow-xl border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="py-6 text-center">
              <p className="text-lg text-foreground font-medium">
                You're doing amazing! One step at a time. 💪
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Remember: Progress, not perfection.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Goals;
