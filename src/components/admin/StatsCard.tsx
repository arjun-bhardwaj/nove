interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                {trend && (
                    <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}
                    </span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
