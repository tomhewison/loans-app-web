import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { StaffRoute } from '../components/auth/StaffRoute'
import { ReservationTable } from '../components/admin/ReservationTable'
import { ReservationFilters } from '../components/admin/ReservationFilters'
import { useAdminReservations } from '../hooks/useManagement'
import type { ReservationFilters as Filters } from '../services/types'

export const Route = createFileRoute('/admin/reservations')({
    component: AdminReservations,
})

function AdminReservations() {
    const [filters, setFilters] = useState<Filters>({})
    const { data: reservations, isLoading, error } = useAdminReservations(filters)

    return (
        <StaffRoute>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">All Reservations</h1>
                    <p className="mt-2 text-gray-600">
                        View and manage all device reservations
                    </p>
                </div>

                <ReservationFilters onFilterChange={setFilters} />

                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading reservations...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading reservations</h3>
                                <p className="mt-1 text-sm text-red-700">{error.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {reservations && (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
                        </div>
                        <ReservationTable reservations={reservations} />
                    </>
                )}
            </div>
        </StaffRoute>
    )
}
