import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@/contexts/AuthContext'
import * as catalogueService from '@/services/catalogue'
import type {
  DeviceModel,
  Device,
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

// ============================================
// Device Models Mutations (Staff only)
// ============================================

/**
 * Hook to create a new device model
 */
export function useCreateDeviceModel() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (params: CreateDeviceModelParams) => {
      const token = await getAccessTokenSilently()
      return catalogueService.createDeviceModel(params, token)
    },
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
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async ({
      id,
      params,
    }: {
      id: string
      params: UpdateDeviceModelParams
    }) => {
      const token = await getAccessTokenSilently()
      return catalogueService.updateDeviceModel(id, params, token)
    },
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
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently()
      return catalogueService.deleteDeviceModel(id, token)
    },
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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  return useQuery({
    queryKey: catalogueKeys.deviceList(),
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return catalogueService.listDevices(token)
    },
    enabled: isAuthenticated,
  })
}

/**
 * Hook to fetch a single device by ID (staff only)
 */
export function useDevice(id: string) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  return useQuery({
    queryKey: catalogueKeys.device(id),
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return catalogueService.getDevice(id, token)
    },
    enabled: !!id && isAuthenticated,
  })
}

/**
 * Hook to create a new device
 */
export function useCreateDevice() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (params: CreateDeviceParams) => {
      const token = await getAccessTokenSilently()
      return catalogueService.createDevice(params, token)
    },
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
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async ({
      id,
      params,
    }: {
      id: string
      params: UpdateDeviceParams
    }) => {
      const token = await getAccessTokenSilently()
      return catalogueService.updateDevice(id, params, token)
    },
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
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getAccessTokenSilently()
      return catalogueService.deleteDevice(id, token)
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: catalogueKeys.devices() })
      queryClient.removeQueries({ queryKey: catalogueKeys.device(id) })
    },
  })
}

