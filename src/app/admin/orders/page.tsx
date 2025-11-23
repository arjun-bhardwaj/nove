'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

interface Order {
    id: string;
    customer_email: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: any[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesStatus = filter === 'all' || o.status === filter;
        const matchesSearch = o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.id.includes(searchTerm);

        let matchesDate = true;
        if (dateRange !== 'all') {
            const orderDate = new Date(o.created_at);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

            if (dateRange === 'today') matchesDate = daysDiff === 0;
            else if (dateRange === 'week') matchesDate = daysDiff <= 7;
            else if (dateRange === 'month') matchesDate = daysDiff <= 30;
        }

        return matchesStatus && matchesSearch && matchesDate;
    });

    const handleBulkStatusUpdate = async (newStatus: string) => {
        if (!confirm(`Update ${selectedOrders.length} orders to ${newStatus}?`)) return;
        alert(`Bulk status update to ${newStatus} would be implemented here`);
    };

    const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Orders</h1>
                <p className="text-gray-500">Manage customer orders and fulfillment</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {filteredOrders.filter(o => o.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-500">Delivered</p>
                    <p className="text-2xl font-bold text-green-600">
                        {filteredOrders.filter(o => o.status === 'delivered').length}
                    </p>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by customer, email, or order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                    </select>
                    <div className="flex gap-2">
                        {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-2 rounded-lg font-medium capitalize transition-colors text-sm ${filter === status
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    {selectedOrders.length > 0 && (
                        <select
                            onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                        >
                            <option value="">Bulk Update ({selectedOrders.length})</option>
                            <option value="processing">Mark as Processing</option>
                            <option value="shipped">Mark as Shipped</option>
                            <option value="delivered">Mark as Delivered</option>
                        </select>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading orders...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedOrders(filteredOrders.map(o => o.id));
                                            } else {
                                                setSelectedOrders([]);
                                            }
                                        }}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Order ID</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Customer</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Total</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedOrders([...selectedOrders, order.id]);
                                                } else {
                                                    setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                                                }
                                            }}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-gray-600">#{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{order.customer_name}</div>
                                            <div className="text-sm text-gray-500">{order.customer_email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">₹{order.total_amount?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <OrderStatusBadge status={order.status || 'pending'} />
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No orders found</div>
                    )}
                </div>
            )}
        </div>
    );
}
