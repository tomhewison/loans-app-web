import type { ReservationSummary, ReservationStatus } from '../../services/types'

interface ReservationTableProps {
    reservations: ReservationSummary[]
}

/**
 * Get status badge styling based on reservation status
 */
function getStatusBadge(status: ReservationStatus): { label: string; className: string } {
    switch (status) {
        case 'Reserved':
            return {
                label: 'Reserved',
                className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            }
        case 'Collected':
            return {
                label: 'Collected',
                className: 'bg-blue-100 text-blue-800 border-blue-300',
            }
        case 'Returned':
            return {
                label: 'Returned',
                className: 'bg-green-100 text-green-800 border-green-300',
            }
        case 'Cancelled':
            return {
                label: 'Cancelled',
                className: 'bg-gray-100 text-gray-800 border-gray-300',
            }
        case 'Expired':
            return {
                label: 'Expired',
                className: 'bg-red-100 text-red-800 border-red-300',
            }
        default:
            return {
                label: status,
                className: 'bg-gray-100 text-gray-800 border-gray-300',
            }
    }
}

/**
 * Format date to short format
 */
function formatShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString()
}

/**
 * Reusable reservation table component
 */
export function ReservationTable({ reservations }: ReservationTableProps) {
    if (reservations.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No reservations found</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reserved At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Return Due
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation) => {
                        const statusBadge = getStatusBadge(reservation.status)
                        const isOverdue = reservation.isOverdue

                        return (
                            <tr
                                key={reservation.id}
                                className={`
                  hover:bg-gray-50 transition-colors
                  ${isOverdue ? 'bg-red-50 border-l-4 border-red-500' : ''}
                `}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {reservation.userEmail}
                                        </div>
                                        <div className="text-sm text-gray-500">{reservation.userId.substring(0, 8)}...</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm text-gray-900">{reservation.deviceModelId}</div>
                                        <div className="text-sm text-gray-500">{reservation.deviceId.substring(0, 8)}...</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`
                      px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border
                      ${statusBadge.className}
                    `}
                                    >
                                        {statusBadge.label}
                                    </span>
                                    {isOverdue && (
                                        <span className="ml-2 text-red-600 font-bold">OVERDUE</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatShortDate(reservation.reservedAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reservation.returnDueAt ? (
                                        <span className={isOverdue ? 'text-red-600 font-bold' : ''}>
                                            {formatShortDate(reservation.returnDueAt)}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        className="text-blue-600 hover:text-blue-900 font-medium"
                                        onClick={() => {
                                            // TODO: Implement view details
                                            console.log('View reservation:', reservation.id)
                                        }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
