import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  Scale,
  Lock,
  UserCheck,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react'

export const Route = createFileRoute('/policies')({
  component: Policies,
})

const loanPeriods = [
  { device: "Laptops", period: "Up to 14 days", renewable: true },
  { device: "Tablets", period: "Up to 14 days", renewable: true },
  { device: "Cameras", period: "3-7 days", renewable: false },
  { device: "Mobile Phones", period: "Up to 7 days", renewable: false },
  { device: "Accessories", period: "Up to 30 days", renewable: true },
]

const fees = [
  { item: "Late return (per day)", amount: "£5.00" },
  { item: "Lost device", amount: "Replacement cost" },
  { item: "Damage (accidental)", amount: "Repair cost (if not covered by insurance)" },
  { item: "Damage (negligent)", amount: "Full repair or replacement cost" },
  { item: "Unauthorised software installation", amount: "£25.00 + restoration fee" },
]

function Policies() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground">Policies & Terms</h1>
        <p className="text-lg text-muted-foreground">
          Please read these terms carefully before borrowing any device from Campus Loans.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="p-6 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Navigation</h2>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#eligibility" className="text-primary hover:underline">Eligibility Requirements</a>
          <a href="#loan-periods" className="text-primary hover:underline">Loan Periods</a>
          <a href="#responsibilities" className="text-primary hover:underline">Borrower Responsibilities</a>
          <a href="#fees" className="text-primary hover:underline">Fees & Charges</a>
          <a href="#insurance" className="text-primary hover:underline">Insurance Coverage</a>
          <a href="#terms" className="text-primary hover:underline">Terms & Conditions</a>
        </div>
      </Card>

      {/* Eligibility */}
      <section id="eligibility">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Eligibility Requirements</h2>
              <p className="text-muted-foreground mb-4">
                To borrow devices from Campus Loans, you must meet the following requirements:
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground">Active Student Status</h3>
                <p className="text-sm text-muted-foreground">You must be a currently enrolled student at Teesside University with valid student ID.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground">Account in Good Standing</h3>
                <p className="text-sm text-muted-foreground">No outstanding fees, late returns, or policy violations on your account.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground">Completed Orientation</h3>
                <p className="text-sm text-muted-foreground">First-time borrowers must complete a brief orientation session (available online).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground">Valid Contact Information</h3>
                <p className="text-sm text-muted-foreground">Current email address and phone number registered in your student account.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Loan Periods */}
      <section id="loan-periods">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Loan Periods</h2>
              <p className="text-muted-foreground mb-4">
                Standard loan periods vary by device type. All loans are subject to availability.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-card-foreground">Device Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-card-foreground">Loan Period</th>
                  <th className="text-left py-3 px-4 font-semibold text-card-foreground">Renewable</th>
                </tr>
              </thead>
              <tbody>
                {loanPeriods.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-card-foreground">{item.device}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.period}</td>
                    <td className="py-3 px-4">
                      {item.renewable ? (
                        <span className="inline-flex items-center gap-1 text-success">
                          <CheckCircle className="h-4 w-4" />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <XCircle className="h-4 w-4" />
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Loan periods may be adjusted during peak demand periods (e.g., exam season). 
              Renewals are subject to availability and must be requested at least 2 days before the due date.
            </p>
          </div>
        </Card>
      </section>

      {/* Borrower Responsibilities */}
      <section id="responsibilities">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Borrower Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                As a borrower, you are responsible for the device while it's in your care.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Care & Maintenance
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Keep the device in a safe, secure location</li>
                <li>Protect from extreme temperatures, moisture, and physical damage</li>
                <li>Do not remove any labels, stickers, or identification marks</li>
                <li>Report any issues or damage immediately</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Usage Restrictions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Use only for academic or university-related purposes</li>
                <li>Do not install unauthorised software or modify system settings</li>
                <li>Do not share the device with others or use for commercial purposes</li>
                <li>Comply with all university IT policies and acceptable use guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Return Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Return the device on or before the due date</li>
                <li>Return with all original accessories and packaging</li>
                <li>Remove all personal data and files before returning</li>
                <li>Return during Campus IT opening hours</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Fees & Charges */}
      <section id="fees">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Fees & Charges</h2>
              <p className="text-muted-foreground mb-4">
                The following fees may apply to your account:
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-card-foreground">Item</th>
                  <th className="text-right py-3 px-4 font-semibold text-card-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-card-foreground">{fee.item}</td>
                    <td className="py-3 px-4 text-right font-medium text-card-foreground">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Important</h3>
                <p className="text-sm text-muted-foreground">
                  Fees are charged to your student account and must be paid before you can borrow additional devices. 
                  Repeated violations may result in suspension of borrowing privileges.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Insurance Coverage */}
      <section id="insurance">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Insurance Coverage</h2>
              <p className="text-muted-foreground mb-4">
                All devices are covered by our insurance policy while on loan.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Covered Events
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Accidental damage (drops, spills, etc.)</li>
                <li>Theft (with police report)</li>
                <li>Fire or water damage</li>
                <li>Manufacturing defects discovered during loan</li>
              </ul>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                Not Covered
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Intentional damage or misuse</li>
                <li>Loss due to negligence (left unattended in public)</li>
                <li>Damage from unauthorised modifications</li>
                <li>Cosmetic damage that doesn't affect functionality</li>
                <li>Data loss (always back up your work)</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Claims Process:</strong> Report damage or loss immediately. You may be required to provide 
                documentation (photos, police report, etc.). Claims are reviewed within 5-7 business days.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Terms & Conditions */}
      <section id="terms">
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Terms & Conditions</h2>
              <p className="text-muted-foreground mb-4">
                By borrowing a device, you agree to the following terms:
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">1. Agreement to Terms</h3>
              <p>
                By reserving and collecting a device, you acknowledge that you have read, understood, and agree to be 
                bound by these policies and terms. These terms form a legally binding agreement between you and 
                Teesside University Campus IT.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">2. Right to Refuse Service</h3>
              <p>
                Campus IT reserves the right to refuse service to any student who has violated these policies, 
                has outstanding fees, or whose account is not in good standing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">3. Device Availability</h3>
              <p>
                All reservations are subject to availability. Campus IT does not guarantee that requested devices 
                will be available, even if a reservation is confirmed. We reserve the right to cancel reservations 
                due to maintenance, damage, or other unforeseen circumstances.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">4. Privacy & Data</h3>
              <p>
                You are responsible for all data stored on borrowed devices. Campus IT is not responsible for data 
                loss. You must remove all personal data before returning devices. Campus IT may access devices 
                for maintenance or security purposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">5. Policy Changes</h3>
              <p>
                These policies may be updated at any time. You will be notified of significant changes via email. 
                Continued use of Campus Loans after policy changes constitutes acceptance of the new terms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">6. Dispute Resolution</h3>
              <p>
                Disputes regarding fees, damage, or policy violations should be reported within 7 days of the 
                incident. Campus IT will review disputes and make a final determination. Appeals may be made 
                through the standard university complaints procedure.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Privacy Notice */}
      <section>
        <Card className="p-8 rounded-2xl border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Privacy & Data Protection</h2>
              <p className="text-muted-foreground mb-4">
                How we handle your personal information:
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              We collect and process your student ID, contact information, and borrowing history to manage the 
              device lending service. This data is used solely for service administration and will not be shared 
              with third parties except as required by law.
            </p>
            <p>
              Your borrowing history is retained for 2 years after graduation or account closure. You have the 
              right to access, correct, or request deletion of your personal data in accordance with GDPR.
            </p>
            <p>
              For more information, see the university's full Privacy Policy at{' '}
              <a href="https://www.tees.ac.uk/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                tees.ac.uk/privacy
              </a>
            </p>
          </div>
        </Card>
      </section>

      {/* Acceptance */}
      <Card className="p-8 rounded-2xl border-2 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-8 w-8 text-primary flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By using Campus Loans, you confirm that you have read, understood, and agree to comply with all 
              policies and terms outlined on this page. Failure to comply may result in suspension of borrowing 
              privileges and applicable fees.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button asChild size="lg" className="gap-2">
                <Link to="/catalogue">
                  I Understand - Browse Catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/help">
                  <BookOpen className="h-4 w-4" />
                  Back to Help
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
