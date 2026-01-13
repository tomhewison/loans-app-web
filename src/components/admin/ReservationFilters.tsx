import { useState } from 'react'
import type { ReservationFilters as Filters, ReservationStatus } from '../../services/types'

interface ReservationFiltersProps {
    onFilterChange: (filters: Filters) => void
}

/**
 * Filter controls for reservation listing
 */
export function ReservationFilters({ onFilterChange }: ReservationFiltersProps) {
    const [status, setStatus] = useState<ReservationStatus | ''>('')
    const [userId, setUserId] = useState('')
    const [deviceModelId, setDeviceModelId] = useState('')

    const handleApplyFilters = () => {
        const filters: Filters = {}
        if (status) filters.status = status as ReservationStatus
        if (userId.trim()) filters.userId = userId.trim()
        if (deviceModelId.trim()) filters.deviceModelId = deviceModelId.trim()

        onFilterChange(filters)
    }

    const handleClearFilters = () => {
        setStatus('')
        setUserId('')
        setDeviceModelId('')
        onFilterChange({})
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Reservations</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        id="status-filter"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ReservationStatus | '')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Collected">Collected</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Expired">Expired</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        User ID / Email
                    </label>
                    <input
                        type="text"
                        id="user-filter"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter user ID or email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="device-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Device Model ID
                    </label>
                    <input
                        type="text"
                        id="device-filter"
                        value={deviceModelId}
                        onChange={(e) => setDeviceModelId(e.target.value)}
                        placeholder="Enter device model ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    )
}
