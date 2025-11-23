interface OrderStatusBadgeProps {
    status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
        processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' },
        shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shipped' },
        delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}
