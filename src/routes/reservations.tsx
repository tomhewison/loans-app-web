import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reservations')({
  component: Reservations,
})

function Reservations() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Reservations</h1>
      <p className="text-muted-foreground">View and manage your device reservations.</p>
      {/* TODO: Add reservations list */}
    </div>
  )
}
