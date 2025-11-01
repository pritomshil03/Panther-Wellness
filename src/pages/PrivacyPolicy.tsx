import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <img src={pantherLogo} alt="Panther Wellness" className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-primary">Privacy Policy</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Panther Wellness Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Panther Wellness ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our mental health and wellness application designed for Borough of Manhattan Community College (BMCC) students.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Information We Collect</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-medium">We collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Email address, EMPLID, contact number (only when you make counseling appointments)</li>
                  <li><strong>Wellness Data:</strong> Mood tracker responses, stress levels, sleep quality, energy levels, wellness goals</li>
                  <li><strong>Chat Data:</strong> Messages exchanged with our AI wellness companion</li>
                  <li><strong>Usage Data:</strong> App interactions, features used, and time spent on the platform</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">How We Use Your Information</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Your information is used to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide personalized wellness recommendations and support</li>
                  <li>Track your wellness progress and goals</li>
                  <li>Connect you with BMCC counseling services when requested</li>
                  <li>Improve our AI companion's responses and suggestions</li>
                  <li>Analyze app usage to enhance user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Data Storage and Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your wellness data is stored locally on your device using browser storage. We implement industry-standard security measures to protect your information. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information with BMCC counseling services only when you explicitly request an appointment. All data shared with counseling services is subject to BMCC's privacy policies and FERPA regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Your Rights</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data stored in the app</li>
                  <li>Delete your wellness data at any time</li>
                  <li>Opt out of AI chat features</li>
                  <li>Request data export or deletion</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Confidentiality Notice</h2>
              <p className="text-muted-foreground leading-relaxed">
                While Panther Wellness provides wellness support, it is not a substitute for professional mental health services. If you are in crisis or need immediate help, please contact BMCC Counseling Services at (212) 220-8140 or visit our counseling center.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">BMCC Affiliation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Panther Wellness is designed to support BMCC students. For BMCC's official privacy policies and FERPA information, please visit{" "}
                <a href="https://www.bmcc.cuny.edu/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  www.bmcc.cuny.edu
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or your data, please contact us through the BMCC Student Affairs office or visit{" "}
                <a href="https://www.bmcc.cuny.edu/student-affairs/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  BMCC Student Affairs
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. We will notify users of any significant changes through the app or via email.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
