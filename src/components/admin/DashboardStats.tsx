import type { DashboardStats as DashboardStatsType } from '../../services/types'

interface DashboardStatsProps {
    stats: DashboardStatsType
}

/**
 * Dashboard statistics cards component
 * Displays key metrics for admin oversight
 */
export function DashboardStats({ stats }: DashboardStatsProps) {
    const statCards = [
        {
            label: 'Active Loans',
            value: stats.activeLoans,
            icon: '📦',
            color: 'bg-blue-50 text-blue-700 border-blue-200',
        },
        {
            label: 'Pending Collection',
            value: stats.pendingCollection,
            icon: '⏳',
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        },
        {
            label: 'Overdue Loans',
            value: stats.overdueLoans,
            icon: '⚠️',
            color: stats.overdueLoans > 0
                ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-200'
                : 'bg-green-50 text-green-700 border-green-200',
            highlight: stats.overdueLoans > 0,
        },
        {
            label: 'Returned Today',
            value: stats.returnedToday,
            icon: '✅',
            color: 'bg-green-50 text-green-700 border-green-200',
        },
        {
            label: 'Reservations Today',
            value: stats.reservationsToday,
            icon: '📋',
            color: 'bg-purple-50 text-purple-700 border-purple-200',
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-sm text-gray-500">
                    Updated: {new Date(stats.calculatedAt).toLocaleTimeString()}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className={`
              p-6 rounded-lg border-2 transition-all duration-200
              ${card.color}
              ${card.highlight ? 'animate-pulse' : 'hover:shadow-md'}
            `}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{card.icon}</span>
                            {card.highlight && (
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            )}
                        </div>
                        <p className="text-3xl font-bold mb-1">{card.value}</p>
                        <p className="text-sm font-medium opacity-80">{card.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
