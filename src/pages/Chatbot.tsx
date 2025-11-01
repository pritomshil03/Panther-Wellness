import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
}

interface MoodData {
  mood: string;
  level: string;
  message: string;
  avgScore: number;
  timestamp: string;
  scores: {
    sleep: number;
    energy: number;
    stress: number;
    social: number;
    motivation: number;
  };
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    if (!contextLoaded) {
      const moodDataStr = localStorage.getItem("pantherMoodData");
      const goalsStr = localStorage.getItem("pantherGoals");
      
      let contextMessage = "Hi! I'm your Panther Wellness AI companion. I'm here to support you with care and understanding. ";
      
      const moodData: MoodData | null = moodDataStr ? JSON.parse(moodDataStr) : null;
      const goals: Goal[] = goalsStr ? JSON.parse(goalsStr) : [];
      
      if (moodData || goals.length > 0) {
        contextMessage += "\n\nI've reviewed your wellness data:\n";
        
        if (moodData) {
          contextMessage += `\n**Your Recent Mood Check:**\nYou're feeling ${moodData.mood} with ${moodData.level}. Your sleep quality is ${moodData.scores.sleep}/10, energy at ${moodData.scores.energy}/10, and academic stress at ${moodData.scores.stress}/10. `;
        }
        
        if (goals.length > 0) {
          const activeGoals = goals.filter(g => g.progress < g.target);
          const completedGoals = goals.filter(g => g.progress >= g.target);
          
          if (activeGoals.length > 0) {
            contextMessage += `\n\n**Your Active Wellness Goals:**\n`;
            activeGoals.forEach(g => {
              contextMessage += `- ${g.title}: ${g.progress}/${g.target} ${g.unit}\n`;
            });
          }
          
          if (completedGoals.length > 0) {
            contextMessage += `\n**Completed Goals:** You've achieved ${completedGoals.length} goal(s)! `;
          }
        }
        
        contextMessage += "\n\nHow can I support you today?";
      } else {
        contextMessage += "How are you feeling today? I'm here to listen and help.";
      }
      
      setMessages([{ role: "assistant", content: contextMessage }]);
      setContextLoaded(true);
    }
  }, [contextLoaded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const moodDataStr = localStorage.getItem("pantherMoodData");
      const goalsStr = localStorage.getItem("pantherGoals");
      const moodData: MoodData | null = moodDataStr ? JSON.parse(moodDataStr) : null;
      const goals: Goal[] = goalsStr ? JSON.parse(goalsStr) : [];
      
      let systemPrompt = "You are a gentle, caring AI wellness companion for BMCC college students. Speak with warmth and empathy, like a supportive friend. Use natural, conversational language. Be encouraging and understanding. Keep responses concise (2-3 sentences). Support multilingual conversations. Avoid repeating information already mentioned. Focus on listening and providing thoughtful, personalized support.";
      
      if (moodData || goals.length > 0) {
        systemPrompt += "\n\nStudent context (use naturally, don't repeat verbatim): ";
        if (moodData) {
          systemPrompt += `Mood: ${moodData.mood}, Stress: ${moodData.level}, Sleep: ${moodData.scores.sleep}/10, Energy: ${moodData.scores.energy}/10. `;
        }
        if (goals.length > 0) {
          const active = goals.filter(g => g.progress < g.target);
          if (active.length > 0) {
            systemPrompt += `Active goals: ${active.map(g => g.title).join(", ")}. `;
          }
        }
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantContent = data.choices[0]?.message?.content || "I'm here for you. Tell me more?";
      
      const assistantMessage: Message = {
        role: "assistant",
        content: assistantContent
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the AI assistant. Please try again.",
        variant: "destructive"
      });
      
      const fallbackMessage: Message = {
        role: "assistant",
        content: "I'm having trouble connecting, but I'm here for you. Taking care of your mental health is important. Consider reaching out to BMCC counseling if you need support."
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 flex flex-col">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <img src={pantherLogo} alt="Panther Wellness" className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-primary">AI Wellness Companion</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
        <Card className="flex-1 flex flex-col shadow-xl border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-primary flex items-center gap-2">
              <Bot className="h-6 w-6" />
              Chat with Your Wellness Companion
            </CardTitle>
            <p className="text-sm text-muted-foreground">Multilingual support • Emotion recognition • Confidential</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-secondary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-background"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This AI companion is here to support you, but in case of emergency, please contact BMCC counseling services.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Chatbot;
