import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, X, Dumbbell, Sparkles } from "lucide-react";

export const CommunityButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all hover:scale-110"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Users className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Popup Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-2">
          <Card className="shadow-2xl border-border/50 w-80 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Join the Community
              </CardTitle>
              <CardDescription>
                Connect with fellow BMCC students and stay active!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="https://www.bmcc.cuny.edu/student-affairs/student-activities/clubs/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-border/50">
                  <CardContent className="flex items-center gap-3 py-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">Student Clubs</h3>
                      <p className="text-sm text-muted-foreground">
                        Join clubs and organizations
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a
                href="https://www.bmcc.cuny.edu/students/fitness-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-border/50">
                  <CardContent className="flex items-center gap-3 py-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Dumbbell className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">Fitness Center</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay active and healthy
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
