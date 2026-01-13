import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import * as catalogueService from '@/services/catalogue'
import type {
  DeviceModelFilters,
  CreateDeviceModelParams,
  UpdateDeviceModelParams,
  CreateDeviceParams,
  UpdateDeviceParams,
} from '@/services/types'

// Query keys for cache management
export const catalogueKeys = {
  all: ['catalogue'] as const,
  deviceModels: () => [...catalogueKeys.all, 'device-models'] as const,
  deviceModelList: (filters?: DeviceModelFilters) =>
    [...catalogueKeys.deviceModels(), 'list', filters] as const,
  deviceModel: (id: string) => [...catalogueKeys.deviceModels(), id] as const,
  deviceModelAvailability: (id: string) => [...catalogueKeys.deviceModels(), id, 'availability'] as const,
  devices: () => [...catalogueKeys.all, 'devices'] as const,
  deviceList: () => [...catalogueKeys.devices(), 'list'] as const,
  device: (id: string) => [...catalogueKeys.devices(), id] as const,
}

// ============================================
// Device Models Hooks (Public)
// ============================================

/**
 * Hook to fetch list of device models with optional filters
 */
export function useDeviceModels(filters?: DeviceModelFilters) {
  return useQuery({
    queryKey: catalogueKeys.deviceModelList(filters),
    queryFn: () => catalogueService.listDeviceModels(filters),
  })
}

/**
 * Hook to fetch a single device model by ID
 */
export function useDeviceModel(id: string) {
  return useQuery({
    queryKey: catalogueKeys.deviceModel(id),
    queryFn: () => catalogueService.getDeviceModel(id),
    enabled: !!id,
  })
}

/**
 * Hook to fetch device availability for a device model (authenticated users)
 */
export function useDeviceModelAvailability(id: string) {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: catalogueKeys.deviceModelAvailability(id),
    queryFn: () => catalogueService.getDeviceModelAvailability(id),
    enabled: !!id && isAuthenticated,
    // Refresh availability more frequently as it can change
    staleTime: 30 * 1000, // 30 seconds
  })
}

// ============================================
// Device Models Mutations (Staff only)
// ============================================

/**
 * Hook to create a new device model
 */
export function useCreateDeviceModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateDeviceModelParams) => catalogueService.createDeviceModel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.deviceModels() })
    },
  })
}

/**
 * Hook to update an existing device model
 */
export function useUpdateDeviceModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: UpdateDeviceModelParams }) =>
      catalogueService.updateDeviceModel(id, params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.deviceModels() })
      queryClient.setQueryData(catalogueKeys.deviceModel(data.id), data)
    },
  })
}

/**
 * Hook to delete a device model
 */
export function useDeleteDeviceModel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => catalogueService.deleteDeviceModel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.deviceModels() })
      queryClient.removeQueries({ queryKey: catalogueKeys.deviceModel(id) })
    },
  })
}

// ============================================
// Devices Hooks (Staff only)
// ============================================

/**
 * Hook to fetch list of all devices (staff only)
 */
export function useDevices() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: catalogueKeys.deviceList(),
    queryFn: () => catalogueService.listDevices(),
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch a single device by ID (staff only)
 */
export function useDevice(id: string) {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: catalogueKeys.device(id),
    queryFn: () => catalogueService.getDevice(id),
    enabled: !!id && isAuthenticated,
  })
}

/**
 * Hook to create a new device
 */
export function useCreateDevice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateDeviceParams) => catalogueService.createDevice(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.devices() })
    },
  })
}

/**
 * Hook to update an existing device
 */
export function useUpdateDevice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: UpdateDeviceParams }) =>
      catalogueService.updateDevice(id, params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.devices() })
      queryClient.setQueryData(catalogueKeys.device(data.id), data)
    },
  })
}

/**
 * Hook to delete a device
 */
export function useDeleteDevice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => catalogueService.deleteDevice(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.devices() })
      queryClient.removeQueries({ queryKey: catalogueKeys.device(id) })
    },
  })
}
