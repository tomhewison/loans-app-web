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
import type { DeviceModel, DeviceCategory, CreateDeviceModelParams, UpdateDeviceModelParams } from '@/services/types'

interface DeviceModelFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deviceModel?: DeviceModel | null
  onSubmit: (data: CreateDeviceModelParams | UpdateDeviceModelParams) => Promise<void>
  isSubmitting?: boolean
}

const CATEGORIES: DeviceCategory[] = [
  'Laptop',
  'Tablet',
  'Camera',
  'MobilePhone',
  'Keyboard',
  'Mouse',
  'Charger',
  'Other',
]

export function DeviceModelForm({
  open,
  onOpenChange,
  deviceModel,
  onSubmit,
  isSubmitting,
}: DeviceModelFormProps) {
  const isEditing = !!deviceModel

  const [formData, setFormData] = useState({
    id: '',
    brand: '',
    model: '',
    category: 'Laptop' as DeviceCategory,
    description: '',
    imageUrl: '',
    featured: false,
    specifications: {} as Record<string, string>,
  })

  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')

  // Reset form when dialog opens/closes or deviceModel changes
  useEffect(() => {
    if (open) {
      if (deviceModel) {
        setFormData({
          id: deviceModel.id,
          brand: deviceModel.brand,
          model: deviceModel.model,
          category: deviceModel.category,
          description: deviceModel.description,
          imageUrl: deviceModel.imageUrl || '',
          featured: deviceModel.featured || false,
          specifications: deviceModel.specifications ? { ...deviceModel.specifications } : {},
        })
      } else {
        setFormData({
          id: '',
          brand: '',
          model: '',
          category: 'Laptop',
          description: '',
          imageUrl: '',
          featured: false,
          specifications: {},
        })
      }
      setSpecKey('')
      setSpecValue('')
    }
  }, [open, deviceModel])

  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey.trim()]: specValue.trim(),
        },
      }))
      setSpecKey('')
      setSpecValue('')
    }
  }

  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      const updateData: UpdateDeviceModelParams = {
        brand: formData.brand,
        model: formData.model,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        featured: formData.featured,
        specifications: formData.specifications,
      }
      await onSubmit(updateData)
    } else {
      const createData: CreateDeviceModelParams = {
        id: formData.id,
        brand: formData.brand,
        model: formData.model,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        featured: formData.featured,
        specifications: formData.specifications,
      }
      await onSubmit(createData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Device Model' : 'Create Device Model'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID - only for create */}
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="id">ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
                placeholder="e.g., macbook-pro-14-m3"
                required
              />
              <p className="text-xs text-gray-500">
                A unique identifier (lowercase, hyphens allowed)
              </p>
            </div>
          )}

          {/* Brand and Model */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                placeholder="e.g., Apple"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                placeholder="e.g., MacBook Pro 14&quot;"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as DeviceCategory,
                }))
              }
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'MobilePhone' ? 'Mobile Phone' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe the device model..."
              rows={3}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="featured">Featured (show on homepage)</Label>
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <Label>Specifications</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Key (e.g., RAM)"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
              />
              <Input
                placeholder="Value (e.g., 16GB)"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={handleAddSpec}>
                Add
              </Button>
            </div>
            {Object.keys(formData.specifications).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    <span className="font-medium">{key}:</span> {value}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(key)}
                      className="ml-1 text-gray-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Update Device Model'
              ) : (
                'Create Device Model'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
