import { useState } from 'react'
import { Pencil, Trash2, Plus, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DeviceModel } from '@/services/types'

interface DeviceModelTableProps {
  deviceModels: DeviceModel[]
  onEdit: (model: DeviceModel) => void
  onDelete: (id: string) => void
  onCreate: () => void
  isDeleting?: boolean
}

/**
 * Get category badge styling
 */
function getCategoryBadge(category: string): string {
  const styles: Record<string, string> = {
    Laptop: 'bg-blue-100 text-blue-800 border-blue-300',
    Tablet: 'bg-purple-100 text-purple-800 border-purple-300',
    Camera: 'bg-amber-100 text-amber-800 border-amber-300',
    MobilePhone: 'bg-green-100 text-green-800 border-green-300',
    Keyboard: 'bg-gray-100 text-gray-800 border-gray-300',
    Mouse: 'bg-gray-100 text-gray-800 border-gray-300',
    Charger: 'bg-orange-100 text-orange-800 border-orange-300',
    Other: 'bg-slate-100 text-slate-800 border-slate-300',
  }
  return styles[category] || styles.Other
}

export function DeviceModelTable({
  deviceModels,
  onEdit,
  onDelete,
  onCreate,
  isDeleting,
}: DeviceModelTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this device model? This action cannot be undone.')) {
      setDeletingId(id)
      try {
        onDelete(id)
      } finally {
        setDeletingId(null)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Device Models</h2>
        <Button onClick={onCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Device Model
        </Button>
      </div>

      {deviceModels.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No device models found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first device model to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deviceModels.map((model) => (
                <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {model.imageUrl ? (
                        <img
                          src={model.imageUrl}
                          alt={`${model.brand} ${model.model}`}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">N/A</span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {model.brand} {model.model}
                        </div>
                        <div className="text-sm text-gray-500">ID: {model.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getCategoryBadge(model.category)}`}
                    >
                      {model.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {model.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {model.featured && (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(model.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onEdit(model)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(model.id)}
                        disabled={isDeleting && deletingId === model.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
