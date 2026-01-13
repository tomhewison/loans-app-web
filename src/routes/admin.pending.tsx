import { createFileRoute } from '@tanstack/react-router'
import { StaffRoute } from '../components/auth/StaffRoute'
import { ReservationTable } from '../components/admin/ReservationTable'
import { usePendingCollections } from '../hooks/useManagement'

export const Route = createFileRoute('/admin/pending')({
    component: AdminPending,
})

function AdminPending() {
    const { data: reservations, isLoading, error } = usePendingCollections()

    return (
        <StaffRoute>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900">Pending Collections</h1>
                        {reservations && reservations.length > 0 && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                {reservations.length} Waiting
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-gray-600">
                        Devices reserved and waiting for user collection
                    </p>
                </div>

                {reservations && reservations.length > 0 && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    <strong>Info:</strong> These reservations are awaiting user collection. Prepare devices for pickup.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading pending collections...</p>
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
                                <h3 className="text-sm font-medium text-red-800">Error loading pending collections</h3>
                                <p className="mt-1 text-sm text-red-700">{error.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {reservations && (
                    <>
                        {reservations.length === 0 ? (
                            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-700">
                                            No pending collections at this time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ReservationTable reservations={reservations} />
                        )}
                    </>
                )}
            </div>
        </StaffRoute>
    )
}
