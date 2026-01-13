import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Device, DeviceModel } from '@/services/types'

interface DevicesTableProps {
  devices: Device[]
  deviceModels: DeviceModel[]
  onEdit: (device: Device) => void
  onDelete: (id: string) => void
  onCreate: () => void
  isDeleting?: boolean
}

/**
 * Get status badge styling
 */
function getStatusBadge(status: string): { className: string } {
  const styles: Record<string, string> = {
    Available: 'bg-green-100 text-green-800 border-green-300',
    Unavailable: 'bg-red-100 text-red-800 border-red-300',
    Maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Retired: 'bg-gray-100 text-gray-800 border-gray-300',
    Lost: 'bg-purple-100 text-purple-800 border-purple-300',
  }
  return { className: styles[status] || styles.Unavailable }
}

export function DevicesTable({
  devices,
  deviceModels,
  onEdit,
  onDelete,
  onCreate,
  isDeleting,
}: DevicesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Create a map for quick lookup of device model names
  const modelMap = new Map(deviceModels.map((m) => [m.id, m]))

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this device? This action cannot be undone.')) {
      setDeletingId(id)
      try {
        onDelete(id)
      } finally {
        setDeletingId(null)
      }
    }
  }

  const getDeviceModelName = (deviceModelId: string) => {
    const model = modelMap.get(deviceModelId)
    return model ? `${model.brand} ${model.model}` : deviceModelId
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Individual Devices</h2>
        <Button onClick={onCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Device
        </Button>
      </div>

      {devices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No devices found</p>
          <p className="text-gray-400 text-sm mt-2">
            Add individual devices for your device models
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => {
                const statusBadge = getStatusBadge(device.status)
                return (
                  <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {getDeviceModelName(device.deviceModelId)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {device.id.substring(0, 8)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {device.serialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {device.assetId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusBadge.className}`}
                      >
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {device.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(device.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onEdit(device)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(device.id)}
                          disabled={isDeleting && deletingId === device.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
