import { apiFetch } from './api'
import type {
  DeviceModel,
  Device,
  DeviceModelFilters,
  CreateDeviceModelParams,
  UpdateDeviceModelParams,
  CreateDeviceParams,
  UpdateDeviceParams,
} from './types'

// ============================================
// Device Models (Public catalogue items)
// ============================================

const BASE_PATH = '/proxy/catalogue'

/**
 * List all device models with optional filters (public)
 */
export async function listDeviceModels(
  filters?: DeviceModelFilters
): Promise<DeviceModel[]> {
  const params = new URLSearchParams()

  if (filters?.category) params.set('category', filters.category)
  if (filters?.search) params.set('search', filters.search)
  if (filters?.sort) params.set('sort', filters.sort)
  if (filters?.featured !== undefined) params.set('featured', String(filters.featured))

  const query = params.toString()
  const endpoint = `${BASE_PATH}/device-models${query ? `?${query}` : ''}`

  return apiFetch<DeviceModel[]>(endpoint)
}

/**
 * Get a single device model by ID (public)
 */
export async function getDeviceModel(id: string): Promise<DeviceModel> {
  return apiFetch<DeviceModel>(`${BASE_PATH}/device-models/${id}`)
}

/**
 * Create a new device model (staff only)
 */
export async function createDeviceModel(
  params: CreateDeviceModelParams,
  token: string
): Promise<DeviceModel> {
  return apiFetch<DeviceModel>(`${BASE_PATH}/device-models`, {
    method: 'POST',
    body: JSON.stringify(params),
    token,
  })
}

/**
 * Update an existing device model (staff only)
 */
export async function updateDeviceModel(
  id: string,
  params: UpdateDeviceModelParams,
  token: string
): Promise<DeviceModel> {
  return apiFetch<DeviceModel>(`${BASE_PATH}/device-models/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    token,
  })
}

/**
 * Delete a device model (staff only)
 */
export async function deleteDeviceModel(
  id: string,
  token: string
): Promise<void> {
  return apiFetch<void>(`${BASE_PATH}/device-models/${id}`, {
    method: 'DELETE',
    token,
  })
}

// ============================================
// Devices (Individual instances - staff only)
// ============================================

/**
 * List all devices (staff only)
 */
export async function listDevices(token: string): Promise<Device[]> {
  return apiFetch<Device[]>(`${BASE_PATH}/devices`, { token })
}

/**
 * Get a single device by ID (staff only)
 */
export async function getDevice(id: string, token: string): Promise<Device> {
  return apiFetch<Device>(`${BASE_PATH}/devices/${id}`, { token })
}

/**
 * Create a new device (staff only)
 */
export async function createDevice(
  params: CreateDeviceParams,
  token: string
): Promise<Device> {
  return apiFetch<Device>(`${BASE_PATH}/devices`, {
    method: 'POST',
    body: JSON.stringify(params),
    token,
  })
}

/**
 * Update an existing device (staff only)
 */
export async function updateDevice(
  id: string,
  params: UpdateDeviceParams,
  token: string
): Promise<Device> {
  return apiFetch<Device>(`${BASE_PATH}/devices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    token,
  })
}

/**
 * Delete a device (staff only)
 */
export async function deleteDevice(id: string, token: string): Promise<void> {
  return apiFetch<void>(`${BASE_PATH}/devices/${id}`, {
    method: 'DELETE',
    token,
  })
}

