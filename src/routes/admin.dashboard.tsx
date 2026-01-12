import { createFileRoute, Link } from '@tanstack/react-router'
import { StaffRoute } from '../components/auth/StaffRoute'
import { DashboardStats } from '../components/admin/DashboardStats'
import { useDashboardStats } from '../hooks/useManagement'

export const Route = createFileRoute('/admin/dashboard')({
    component: AdminDashboard,
})

function AdminDashboard() {
    const { data: stats, isLoading, error } = useDashboardStats()

    return (
        <StaffRoute>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-600">
                        Monitor and manage device reservations and loans
                    </p>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
                                <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                                <p className="mt-1 text-sm text-red-700">{error.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {stats && (
                    <>
                        <DashboardStats stats={stats} />

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                to="/admin/reservations"
                                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">All Reservations</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            View and manage all reservations
                                        </p>
                                    </div>
                                    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>

                            <Link
                                to="/admin/overdue"
                                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Overdue Loans</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {stats.overdueLoans} item{stats.overdueLoans !== 1 ? 's' : ''} need attention
                                        </p>
                                    </div>
                                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </Link>

                            <Link
                                to="/admin/pending"
                                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Pending Collections</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {stats.pendingCollection} waiting for pickup
                                        </p>
                                    </div>
                                    <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        {/* Catalogue Management Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Catalogue Management</h2>
                            <Link
                                to="/admin/catalogue"
                                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 block"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Manage Catalogue</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Add, edit, or remove device models and individual devices
                                        </p>
                                    </div>
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </StaffRoute>
    )
}
