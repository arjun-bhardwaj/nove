'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newStatus, setNewStatus] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    useEffect(() => {
        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    const fetchOrder = async () => {
        try {
            const res = await fetch(`/api/admin/orders`);
            const data = await res.json();
            const found = data.find((o: any) => o.id === params.id);
            setOrder(found);
            setNewStatus(found?.status || 'pending');
            setTrackingNumber(found?.tracking_number || '');
        } catch (error) {
            console.error('Failed to fetch order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/admin/orders/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, tracking_number: trackingNumber }),
            });

            if (res.ok) {
                alert('Order updated successfully');
                router.push('/admin/orders');
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading...</div>;
    if (!order) return <div className="p-8 text-center">Order not found</div>;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order #{order.id.slice(0, 8)}</h1>
                <p className="text-gray-500">Order details and management</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">{item.priceString}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-gray-900">₹{order.total_amount?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-gray-500">Name:</span>
                                <p className="font-medium text-gray-900">{order.customer_name}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Email:</span>
                                <p className="font-medium text-gray-900">{order.customer_email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Enter tracking number"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            <button
                                onClick={handleUpdate}
                                className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Update Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
