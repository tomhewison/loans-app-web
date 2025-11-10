import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/policies')({
  component: Policies,
})

function Policies() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Policies</h1>
      <p className="text-muted-foreground">Review our device lending policies and terms.</p>
      {/* TODO: Add policies content */}
    </div>
  )
}
