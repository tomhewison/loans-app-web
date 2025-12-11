import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  Coffee,
  AlertTriangle,
  XCircle,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  CalendarX,
  Timer
} from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help!* 
          <span className="text-xs block mt-1 opacity-60">*Terms and conditions apply. Help not guaranteed.</span>
        </p>
      </div>

      {/* Office Hours - The Joke */}
      <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <CalendarX className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Office Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Monday: Closed (Coffee break)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Tuesday: Closed (Team building)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Wednesday: Closed (Strategic planning)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Thursday: Closed (Wellness day)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Friday: Closed (Weekend prep)</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Timer className="h-4 w-4 text-warning" />
                <span className="font-semibold">Weekends: Definitely closed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
          <Coffee className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong>Pro tip:</strong> Try calling during a leap year on February 29th at 2:47pm. 
            That's when we're most likely to answer. Maybe.
          </p>
        </div>
      </Card>

      {/* Contact Methods - All Jokes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <Card className="p-6 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send us an email and we'll get back to you... eventually.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span>Average response time: 3-5 business years</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Auto-reply guaranteed within 0.3 seconds</span>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" disabled>
            <Mail className="h-4 w-4" />
            Send Email (Out of Office)
          </Button>
        </Card>

        {/* Phone */}
        <Card className="p-6 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Phone Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Call us! We love hearing the phone ring. It's very soothing.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span>Hold music: 47 hours of elevator jazz</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Voicemail: Always available!</span>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" disabled>
            <Phone className="h-4 w-4" />
            Call Now (Goes to Voicemail)
          </Button>
        </Card>
      </div>

      {/* Live Chat */}
      <Card className="p-6 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our AI assistant! It's definitely not just a chatbot that responds with "Have you tried turning it off and on again?"
            </p>
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground italic">
                    "Hello! I'm here to help. Unfortunately, I'm currently experiencing technical difficulties. 
                    Please try again in 2-3 business decades. Thank you for your patience!"
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" disabled>
              <MessageSquare className="h-4 w-4" />
              Start Chat (Bot is Sleeping)
            </Button>
          </div>
        </div>
      </Card>

      {/* Alternative Contact Methods */}
      <Card className="p-8 rounded-2xl border-0 bg-gradient-to-br from-muted/50 to-muted/30">
        <h2 className="text-2xl font-bold text-card-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-warning" />
          Alternative Contact Methods
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>• Send a carrier pigeon (response time: depends on pigeon)</p>
          <p>• Write a message in a bottle (we're near the sea, sort of)</p>
          <p>• Try telepathy (we're very open-minded)</p>
          <p>• Smoke signals (weather permitting)</p>
          <p>• Morse code via flashlight (we'll see you from the office window... if we're there)</p>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="p-8 rounded-2xl border-2 border-destructive/20 bg-destructive/5">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Emergency Contact</h2>
            <p className="text-muted-foreground mb-4">
              For actual emergencies (like your dissertation is due tomorrow and your laptop just died), 
              try these options:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Check if your friend has a laptop</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Use the library computers (they're always there)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Pray to the IT gods</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Back to Help */}
      <div className="text-center pt-4">
        <Button asChild variant="ghost" className="gap-2">
          <Link to="/help">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Help
          </Link>
        </Button>
      </div>
    </div>
  )
}
