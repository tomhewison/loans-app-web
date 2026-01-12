import { createFileRoute } from '@tanstack/react-router'
import { StaffRoute } from '../components/auth/StaffRoute'
import { ReservationTable } from '../components/admin/ReservationTable'
import { useOverdueReservations } from '../hooks/useManagement'

export const Route = createFileRoute('/admin/overdue')({
    component: AdminOverdue,
})

function AdminOverdue() {
    const { data: reservations, isLoading, error } = useOverdueReservations()

    return (
        <StaffRoute>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900">Overdue Loans</h1>
                        {reservations && reservations.length > 0 && (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                {reservations.length} Overdue
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-gray-600">
                        Devices that have not been returned by their due date
                    </p>
                </div>

                {reservations && reservations.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    <strong>Action required:</strong> Contact users to arrange device returns.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading overdue loans...</p>
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
                                <h3 className="text-sm font-medium text-red-800">Error loading overdue loans</h3>
                                <p className="mt-1 text-sm text-red-700">{error.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {reservations && (
                    <>
                        {reservations.length === 0 ? (
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">
                                            <strong>Great news!</strong> No overdue loans at this time.
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
