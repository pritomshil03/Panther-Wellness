import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import pantherLogo from "@/assets/panther-logo.png";

const TermsAndConditions = () => {
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
          <h1 className="text-xl font-bold text-primary">Terms & Conditions</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Terms and Conditions of Use</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Panther Wellness ("the App"), you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the App.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                Panther Wellness is designed exclusively for current Borough of Manhattan Community College (BMCC) students. By using this App, you confirm that you are an enrolled BMCC student and have a valid student EMPLID.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Purpose and Scope</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-medium">Panther Wellness is designed to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Support student mental health and emotional well-being</li>
                  <li>Provide wellness tracking and goal-setting tools</li>
                  <li>Offer AI-powered wellness guidance and resources</li>
                  <li>Connect students with BMCC counseling services</li>
                </ul>
                <p className="mt-4 font-semibold text-destructive">
                  Important: Panther Wellness is NOT a substitute for professional mental health treatment, emergency services, or crisis intervention.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">User Responsibilities</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>As a user, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate information when using the App</li>
                  <li>Use the App only for its intended wellness purposes</li>
                  <li>Not share your account credentials with others</li>
                  <li>Seek professional help for serious mental health concerns</li>
                  <li>Respect the privacy and confidentiality of the App</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">AI Wellness Companion Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The AI Wellness Companion provides general wellness support and information. It is not a licensed mental health professional and cannot diagnose, treat, or provide therapy for mental health conditions. AI responses are generated based on patterns and should not be considered medical or therapeutic advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Emergency Situations</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-destructive">If you are experiencing a mental health crisis or emergency:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li><strong>Call 911</strong> for immediate emergency assistance</li>
                  <li><strong>Call 988</strong> for the Suicide & Crisis Lifeline</li>
                  <li><strong>Contact BMCC Counseling</strong> at (212) 220-8140</li>
                  <li><strong>Visit BMCC Counseling Center</strong> in Room S-343</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Data and Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of the App is subject to our Privacy Policy. By using Panther Wellness, you consent to the collection and use of your information as described in the Privacy Policy. We store wellness data locally on your device and do not share your personal information without consent, except when you request BMCC counseling appointments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality of Panther Wellness, including but not limited to text, graphics, logos, and software, are the property of the App creators or BMCC and are protected by copyright and intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Panther Wellness is provided "as is" without warranties of any kind. We do not guarantee that the App will be error-free, uninterrupted, or meet all your wellness needs. We are not liable for any damages arising from your use or inability to use the App.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">BMCC Policies</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a BMCC student, you are also subject to all BMCC policies, including the Student Code of Conduct and CUNY policies. For more information, visit{" "}
                <a href="https://www.bmcc.cuny.edu/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  www.bmcc.cuny.edu
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Significant changes will be communicated through the App or via email. Continued use of the App after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your access to Panther Wellness if you violate these Terms and Conditions or misuse the App.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions are governed by the laws of the State of New York and the policies of the City University of New York (CUNY) system.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms and Conditions, please contact BMCC Student Affairs or visit{" "}
                <a href="https://www.bmcc.cuny.edu/student-affairs/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  BMCC Student Affairs
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">Acknowledgment</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using Panther Wellness, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsAndConditions;
