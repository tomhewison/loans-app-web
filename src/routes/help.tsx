import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  HelpCircle, 
  Mail, 
  Clock, 
  Shield, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  FileText,
} from 'lucide-react'

export const Route = createFileRoute('/help')({
  component: Help,
})

const faqs = [
  {
    question: "How do I reserve a device?",
    answer: "Browse our catalogue, select the device you need, and click 'Request to Borrow'. You'll receive a confirmation email with pickup instructions. Most devices can be collected within an hour of reservation."
  },
  {
    question: "How long can I keep a device?",
    answer: "Loan periods vary by device type. Laptops and tablets can typically be borrowed for up to 2 weeks, while cameras are usually available for shorter periods (3-7 days). Extensions may be available upon request."
  },
  {
    question: "What happens if I damage a device?",
    answer: "All devices are covered by our insurance policy for accidental damage. However, you may be charged for repairs if damage is due to negligence or misuse. Please report any issues immediately."
  },
  {
    question: "Where do I collect my reserved device?",
    answer: "Devices can be collected from the Campus IT office during opening hours (Monday-Friday, 9am-5pm). You'll need to bring your student ID and the confirmation email."
  },
  {
    question: "Can I reserve multiple devices at once?",
    answer: "Yes, you can reserve multiple devices, but availability may be limited during peak periods. Each reservation is subject to approval and availability."
  },
  {
    question: "What if I need to return a device early?",
    answer: "You can return devices early at any time during Campus IT opening hours. Early returns help other students access devices sooner, so we appreciate it!"
  },
  {
    question: "Are there any late fees?",
    answer: "Yes, late returns incur a daily fee. Please return devices on time to avoid charges and to ensure availability for other students. You'll receive reminder emails before the due date."
  },
  {
    question: "Can I renew my loan?",
    answer: "Renewals are possible if the device isn't reserved by another student. You can request a renewal through your reservations page up to 2 days before the due date."
  }
]

const quickLinks = [
  { title: "Browse Catalogue", href: "/catalogue", icon: ArrowRight },
  { title: "My Reservations", href: "/reservations", icon: ArrowRight },
  { title: "Policies & Terms", href: "/policies", icon: FileText },
  { title: "Contact Us", href: "/contact", icon: Mail },
]

function Help() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground">Help & Support</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions, get in touch with our team, or learn more about using Campus Loans.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.title} to={link.href}>
            <Card className="p-4 rounded-xl border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-1 text-center group">
              <link.icon className="h-5 w-5 mx-auto mb-2 text-primary group-hover:translate-x-1 transition-transform" />
              <p className="text-sm font-medium text-card-foreground">{link.title}</p>
            </Card>
          </Link>
        ))}
      </div>


      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6 rounded-xl border-0 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary mt-0.5">
                  {index + 1}
                </span>
                {faq.question}
              </h3>
              <p className="text-muted-foreground ml-8 leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Important Information */}
      <section>
        <Card className="p-8 rounded-2xl border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
          <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            Important Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Student ID Required</h3>
                <p className="text-sm text-muted-foreground">
                  You must bring your valid student ID card when collecting devices. Without it, we cannot release the device.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Insurance Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  All devices are covered by our insurance policy. However, you're responsible for the device while it's in your care.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Return on Time</h3>
                <p className="text-sm text-muted-foreground">
                  Late returns affect other students. Please return devices on or before the due date to avoid fees and help maintain availability.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Still Need Help */}
      <section className="text-center py-8">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/catalogue">
                Browse Devices
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}
