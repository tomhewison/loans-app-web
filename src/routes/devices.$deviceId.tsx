import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/devices/$deviceId')({
  component: DeviceDetail,
})

function DeviceDetail() {
  const { deviceId } = Route.useParams()
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Device Details</h1>
      <p className="text-muted-foreground">Device ID: {deviceId}</p>
      {/* TODO: Add device detail content */}
    </div>
  )
}

