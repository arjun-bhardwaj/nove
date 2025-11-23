'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        lowStockItems: 0,
        pendingOrders: 0,
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch stats
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Failed to fetch stats:', err));

        // Fetch recent orders
        fetch('/api/admin/orders')
            .then(res => res.json())
            .then(data => setRecentOrders(data.slice(0, 5)))
            .catch(err => console.error('Failed to fetch orders:', err));

        // Fetch low stock products
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const lowStock = data.filter((p: any) => (p.stock_quantity || 0) < 5 && (p.stock_quantity || 0) > 0);
                setLowStockProducts(lowStock);
            })
            .catch(err => console.error('Failed to fetch products:', err));
    }, []);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon="🛍️"
                    trend={{ value: '12%', isPositive: true }}
                />
                <StatsCard
                    title="Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon="💰"
                    trend={{ value: '8%', isPositive: true }}
                />
                <StatsCard
                    title="Low Stock Items"
                    value={stats.lowStockItems}
                    icon="⚠️"
                />
                <StatsCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon="⏳"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                            View All →
                        </Link>
                    </div>
                    {recentOrders.length > 0 ? (
                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/admin/orders/${order.id}`}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm">#{order.id.slice(0, 8)}</p>
                                        <p className="text-xs text-gray-500">{order.customer_name}</p>
                                    </div>
                                    <div className="text-right mr-4">
                                        <p className="font-medium text-gray-900 text-sm">₹{order.total_amount?.toLocaleString()}</p>
                                    </div>
                                    <OrderStatusBadge status={order.status || 'pending'} />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-8">No orders yet</p>
                    )}
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
                        <Link href="/admin/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                            Manage →
                        </Link>
                    </div>
                    {lowStockProducts.length > 0 ? (
                        <div className="space-y-3">
                            {lowStockProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                                        <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                        {product.stock_quantity} left
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm text-center py-8">All products well-stocked ✓</p>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                    <span className="text-2xl">➕</span>
                    <div>
                        <p className="font-semibold">Add Product</p>
                        <p className="text-xs text-gray-300">Create new inventory item</p>
                    </div>
                </Link>
                <Link
                    href="/admin/orders"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                    <span className="text-2xl">📦</span>
                    <div>
                        <p className="font-semibold">Process Orders</p>
                        <p className="text-xs text-blue-100">Update order status</p>
                    </div>
                </Link>
                <Link
                    href="/admin/analytics"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                    <span className="text-2xl">📊</span>
                    <div>
                        <p className="font-semibold">View Analytics</p>
                        <p className="text-xs text-purple-100">Sales insights</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
