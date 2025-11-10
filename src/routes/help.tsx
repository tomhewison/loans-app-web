import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/help')({
  component: Help,
})

function Help() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <p className="text-muted-foreground">Find answers to common questions and get support.</p>
      {/* TODO: Add help content */}
    </div>
  )
}

