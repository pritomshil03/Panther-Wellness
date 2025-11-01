import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import pantherLogo from "@/assets/panther-logo.png";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem("pantherUser", JSON.stringify({ email, loggedIn: true }));
      toast({
        title: "Welcome to Panther Wellness!",
        description: "You've successfully logged in.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-accent/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center mb-2">
            <img src={pantherLogo} alt="Panther Wellness Logo" className="h-24 w-auto" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Panther Wellness Login</CardTitle>
          <CardDescription className="text-base text-muted-foreground px-4">
            Welcome to Panther Wellness — your personal AI companion for mindfulness, mood tracking, 
            and student well-being at BMCC.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@bmcc.cuny.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-input"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
            >
              Sign In
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              SSO integration coming soon
            </p>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">
            <div className="flex justify-center gap-4">
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
