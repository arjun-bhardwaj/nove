'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
    const [revenueData, setRevenueData] = useState([
        { month: 'Jan', revenue: 45000, orders: 23 },
        { month: 'Feb', revenue: 52000, orders: 28 },
        { month: 'Mar', revenue: 48000, orders: 25 },
        { month: 'Apr', revenue: 61000, orders: 32 },
        { month: 'May', revenue: 55000, orders: 29 },
        { month: 'Jun', revenue: 67000, orders: 35 },
    ]);

    const [categoryData, setCategoryData] = useState([
        { name: 'Essentials', value: 45, color: '#3b82f6' },
        { name: 'Evening', value: 30, color: '#8b5cf6' },
        { name: 'Activewear', value: 25, color: '#10b981' },
    ]);

    const [topProducts, setTopProducts] = useState([
        { name: 'Nove Signature Top', sales: 156, revenue: 249840 },
        { name: 'Velvet Luxe Jumpsuit', sales: 89, revenue: 267100 },
        { name: 'Bamboo Dress', sales: 134, revenue: 201000 },
        { name: 'Satin Slip Dress', sales: 67, revenue: 200300 },
    ]);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Analytics</h1>
                <p className="text-gray-500">Sales insights and performance metrics</p>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            formatter={(value: any) => `₹${value.toLocaleString()}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#111827" strokeWidth={2} name="Revenue (₹)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Orders by Month */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders by Month</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                            />
                            <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
                <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.sales} units sold</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Total Revenue</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
