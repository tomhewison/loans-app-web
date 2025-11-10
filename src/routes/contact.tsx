import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-muted-foreground">Get in touch with Campus IT for device lending support.</p>
      {/* TODO: Add contact form */}
    </div>
  )
}

