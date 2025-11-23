'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AccountPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !supabase) return;

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('customer_email', user.email)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setOrders(data);
            }
            setLoadingOrders(false);
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-white pt-[120px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-serif font-medium text-gray-900 mb-2">My Account</h1>
                        <p className="text-gray-600">Welcome back, {user.user_metadata.full_name || user.email}</p>
                    </div>
                    <button
                        onClick={signOut}
                        className="mt-4 md:mt-0 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Order History */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-serif font-medium text-gray-900">Order History</h2>

                        {loadingOrders ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                            <p className="text-sm text-gray-600">{order.items.length} items</p>
                                            <p className="font-medium text-gray-900">₹{order.total_amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-2xl p-12 text-center">
                                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="text-gray-900 font-medium underline hover:text-gray-700"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Account Details */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h2 className="text-xl font-serif font-medium text-gray-900 mb-6">Account Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Email Address
                                    </label>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                        Member Since
                                    </label>
                                    <p className="text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white rounded-2xl p-8">
                            <h2 className="text-xl font-serif font-medium mb-4">Nove Rewards</h2>
                            <p className="opacity-80 mb-6">Join our loyalty program to earn points on every purchase.</p>
                            <button
                                onClick={() => router.push('/loyalty')}
                                className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                            >
                                View Rewards
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
