// Device Model types (public catalogue items)
export const DeviceCategory = {
  Laptop: 'Laptop',
  Tablet: 'Tablet',
  Camera: 'Camera',
  MobilePhone: 'MobilePhone',
  Keyboard: 'Keyboard',
  Mouse: 'Mouse',
  Charger: 'Charger',
  Other: 'Other'
} as const

export type DeviceCategory = typeof DeviceCategory[keyof typeof DeviceCategory]

export interface DeviceModel {
  id: string
  brand: string
  model: string
  category: DeviceCategory
  description: string
  specifications: Record<string, string>
  imageUrl?: string
  featured?: boolean
  updatedAt: string
}

// Device types (individual device instances - staff only)
export const DeviceStatus = {
  Available: 'Available',
  Unavailable: 'Unavailable',
  Maintenance: 'Maintenance',
  Retired: 'Retired',
  Lost: 'Lost'
} as const

export type DeviceStatus = typeof DeviceStatus[keyof typeof DeviceStatus]

export interface Device {
  id: string
  deviceModelId: string
  serialNumber: string
  assetId: string
  status: DeviceStatus
  condition: string
  notes?: string
  purchaseDate: string
  updatedAt: string
}

// API error response
export interface ApiError {
  success: false
  message: string
  error?: string
}

// Filter params for device models
export interface DeviceModelFilters {
  category?: DeviceCategory
  search?: string
  sort?: 'popular' | 'newest' | 'oldest' | 'name-asc' | 'name-desc'
  featured?: boolean
}

// Create/Update params
export interface CreateDeviceModelParams {
  id: string
  brand: string
  model: string
  category: DeviceCategory
  description: string
  specifications?: Record<string, string>
  imageUrl?: string
  featured?: boolean
}

export interface UpdateDeviceModelParams {
  brand?: string
  model?: string
  category?: DeviceCategory
  description?: string
  specifications?: Record<string, string>
  imageUrl?: string
  featured?: boolean
}

export interface CreateDeviceParams {
  id: string
  deviceModelId: string
  serialNumber: string
  assetId: string
  status: DeviceStatus
  condition: string
  notes?: string
  purchaseDate: string
}

export interface UpdateDeviceParams {
  deviceModelId?: string
  serialNumber?: string
  assetId?: string
  status?: DeviceStatus
  condition?: string
  notes?: string
  purchaseDate?: string
}

