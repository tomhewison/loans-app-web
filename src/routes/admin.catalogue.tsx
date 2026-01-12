import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Package, Boxes } from 'lucide-react'
import { StaffRoute } from '../components/auth/StaffRoute'
import { DeviceModelTable } from '../components/admin/DeviceModelTable'
import { DeviceModelForm } from '../components/admin/DeviceModelForm'
import { DevicesTable } from '../components/admin/DevicesTable'
import { DeviceForm } from '../components/admin/DeviceForm'
import {
  useDeviceModels,
  useDevices,
  useCreateDeviceModel,
  useUpdateDeviceModel,
  useDeleteDeviceModel,
  useCreateDevice,
  useUpdateDevice,
  useDeleteDevice,
} from '../hooks/useCatalogue'
import type {
  DeviceModel,
  Device,
  CreateDeviceModelParams,
  UpdateDeviceModelParams,
  CreateDeviceParams,
  UpdateDeviceParams,
} from '../services/types'

export const Route = createFileRoute('/admin/catalogue')({
  component: AdminCatalogue,
})

type TabType = 'models' | 'devices'

function AdminCatalogue() {
  const [activeTab, setActiveTab] = useState<TabType>('models')

  // Device Models state
  const [modelFormOpen, setModelFormOpen] = useState(false)
  const [editingModel, setEditingModel] = useState<DeviceModel | null>(null)

  // Devices state
  const [deviceFormOpen, setDeviceFormOpen] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)

  // Queries
  const { data: deviceModels = [], isLoading: modelsLoading, error: modelsError } = useDeviceModels()
  const { data: devices = [], isLoading: devicesLoading, error: devicesError } = useDevices()

  // Device Model mutations
  const createDeviceModel = useCreateDeviceModel()
  const updateDeviceModel = useUpdateDeviceModel()
  const deleteDeviceModel = useDeleteDeviceModel()

  // Device mutations
  const createDevice = useCreateDevice()
  const updateDevice = useUpdateDevice()
  const deleteDevice = useDeleteDevice()

  // Device Model handlers
  const handleCreateModel = () => {
    setEditingModel(null)
    setModelFormOpen(true)
  }

  const handleEditModel = (model: DeviceModel) => {
    setEditingModel(model)
    setModelFormOpen(true)
  }

  const handleDeleteModel = async (id: string) => {
    try {
      await deleteDeviceModel.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete device model:', error)
      alert('Failed to delete device model. Please try again.')
    }
  }

  const handleModelFormSubmit = async (data: CreateDeviceModelParams | UpdateDeviceModelParams) => {
    try {
      if (editingModel) {
        await updateDeviceModel.mutateAsync({ id: editingModel.id, params: data as UpdateDeviceModelParams })
      } else {
        await createDeviceModel.mutateAsync(data as CreateDeviceModelParams)
      }
      setModelFormOpen(false)
      setEditingModel(null)
    } catch (error) {
      console.error('Failed to save device model:', error)
      alert('Failed to save device model. Please try again.')
    }
  }

  // Device handlers
  const handleCreateDevice = () => {
    setEditingDevice(null)
    setDeviceFormOpen(true)
  }

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device)
    setDeviceFormOpen(true)
  }

  const handleDeleteDevice = async (id: string) => {
    try {
      await deleteDevice.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete device:', error)
      alert('Failed to delete device. Please try again.')
    }
  }

  const handleDeviceFormSubmit = async (data: CreateDeviceParams | UpdateDeviceParams) => {
    try {
      if (editingDevice) {
        await updateDevice.mutateAsync({ id: editingDevice.id, params: data as UpdateDeviceParams })
      } else {
        await createDevice.mutateAsync(data as CreateDeviceParams)
      }
      setDeviceFormOpen(false)
      setEditingDevice(null)
    } catch (error) {
      console.error('Failed to save device:', error)
      alert('Failed to save device. Please try again.')
    }
  }

  const isLoading = modelsLoading || devicesLoading
  const error = modelsError || devicesError

  return (
    <StaffRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Catalogue Management</h1>
          <p className="mt-2 text-gray-600">
            Manage device models and individual devices in the loan catalogue
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('models')}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'models'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Package className="h-5 w-5" />
              Device Models
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {deviceModels.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'devices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Boxes className="h-5 w-5" />
              Individual Devices
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {devices.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading catalogue...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading catalogue</h3>
                <p className="mt-1 text-sm text-red-700">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {activeTab === 'models' && (
              <DeviceModelTable
                deviceModels={deviceModels}
                onEdit={handleEditModel}
                onDelete={handleDeleteModel}
                onCreate={handleCreateModel}
                isDeleting={deleteDeviceModel.isPending}
              />
            )}

            {activeTab === 'devices' && (
              <DevicesTable
                devices={devices}
                deviceModels={deviceModels}
                onEdit={handleEditDevice}
                onDelete={handleDeleteDevice}
                onCreate={handleCreateDevice}
                isDeleting={deleteDevice.isPending}
              />
            )}
          </>
        )}

        {/* Device Model Form Dialog */}
        <DeviceModelForm
          open={modelFormOpen}
          onOpenChange={setModelFormOpen}
          deviceModel={editingModel}
          onSubmit={handleModelFormSubmit}
          isSubmitting={createDeviceModel.isPending || updateDeviceModel.isPending}
        />

        {/* Device Form Dialog */}
        <DeviceForm
          open={deviceFormOpen}
          onOpenChange={setDeviceFormOpen}
          device={editingDevice}
          deviceModels={deviceModels}
          onSubmit={handleDeviceFormSubmit}
          isSubmitting={createDevice.isPending || updateDevice.isPending}
        />
      </div>
    </StaffRoute>
  )
}
