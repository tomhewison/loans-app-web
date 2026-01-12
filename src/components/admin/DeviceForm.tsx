import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Device, DeviceModel, DeviceStatus, CreateDeviceParams, UpdateDeviceParams } from '@/services/types'

interface DeviceFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  device?: Device | null
  deviceModels: DeviceModel[]
  onSubmit: (data: CreateDeviceParams | UpdateDeviceParams) => Promise<void>
  isSubmitting?: boolean
}

const STATUSES: DeviceStatus[] = [
  'Available',
  'Unavailable',
  'Maintenance',
  'Retired',
  'Lost',
]

const CONDITIONS = [
  'Excellent',
  'Good',
  'Fair',
  'Poor',
]

export function DeviceForm({
  open,
  onOpenChange,
  device,
  deviceModels,
  onSubmit,
  isSubmitting,
}: DeviceFormProps) {
  const isEditing = !!device

  const [formData, setFormData] = useState({
    id: '',
    deviceModelId: '',
    serialNumber: '',
    assetId: '',
    status: 'Available' as DeviceStatus,
    condition: 'Good',
    notes: '',
    purchaseDate: '',
  })

  // Reset form when dialog opens/closes or device changes
  useEffect(() => {
    if (open) {
      if (device) {
        setFormData({
          id: device.id,
          deviceModelId: device.deviceModelId,
          serialNumber: device.serialNumber,
          assetId: device.assetId,
          status: device.status,
          condition: device.condition,
          notes: device.notes || '',
          purchaseDate: device.purchaseDate.split('T')[0], // Format for date input
        })
      } else {
        setFormData({
          id: '',
          deviceModelId: deviceModels[0]?.id || '',
          serialNumber: '',
          assetId: '',
          status: 'Available',
          condition: 'Good',
          notes: '',
          purchaseDate: new Date().toISOString().split('T')[0],
        })
      }
    }
  }, [open, device, deviceModels])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      const updateData: UpdateDeviceParams = {
        deviceModelId: formData.deviceModelId,
        serialNumber: formData.serialNumber,
        assetId: formData.assetId,
        status: formData.status,
        condition: formData.condition,
        notes: formData.notes || undefined,
        purchaseDate: new Date(formData.purchaseDate).toISOString(),
      }
      await onSubmit(updateData)
    } else {
      const createData: CreateDeviceParams = {
        id: formData.id,
        deviceModelId: formData.deviceModelId,
        serialNumber: formData.serialNumber,
        assetId: formData.assetId,
        status: formData.status,
        condition: formData.condition,
        notes: formData.notes || undefined,
        purchaseDate: new Date(formData.purchaseDate).toISOString(),
      }
      await onSubmit(createData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Device' : 'Add Device'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID - only for create */}
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="id">Device ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
                placeholder="e.g., macbook-pro-001"
                required
              />
              <p className="text-xs text-gray-500">
                A unique identifier for this specific device
              </p>
            </div>
          )}

          {/* Device Model */}
          <div className="space-y-2">
            <Label htmlFor="deviceModelId">Device Model *</Label>
            <select
              id="deviceModelId"
              value={formData.deviceModelId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, deviceModelId: e.target.value }))
              }
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              {deviceModels.length === 0 && (
                <option value="">No device models available</option>
              )}
              {deviceModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.brand} {model.model}
                </option>
              ))}
            </select>
          </div>

          {/* Serial Number and Asset ID */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number *</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, serialNumber: e.target.value }))
                }
                placeholder="e.g., ABC123XYZ"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetId">Asset ID *</Label>
              <Input
                id="assetId"
                value={formData.assetId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, assetId: e.target.value }))
                }
                placeholder="e.g., IT-2024-001"
                required
              />
            </div>
          </div>

          {/* Status and Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as DeviceStatus,
                  }))
                }
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, condition: e.target.value }))
                }
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                {CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Purchase Date */}
          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date *</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))
              }
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Any additional notes about this device..."
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || deviceModels.length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : isEditing ? (
                'Update Device'
              ) : (
                'Add Device'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
