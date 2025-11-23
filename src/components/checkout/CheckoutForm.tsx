'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutForm() {
    const router = useRouter();
    const { cart, cartTotal, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        console.log('🚀 Checkout started');
        console.log('Cart Total:', cartTotal);
        console.log('Cart Items:', cart);

        const formData = new FormData(e.target as HTMLFormElement);
        const customer = {
            email: formData.get('email'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
        };

        try {
            // 1. Load Razorpay Script
            console.log('📦 Loading Razorpay SDK...');
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                alert('Razorpay SDK failed to load. Are you online?');
                setIsLoading(false);
                return;
            }
            console.log('✅ Razorpay SDK loaded');

            // 2. Create Order on Server
            console.log('🔄 Creating Razorpay order...');
            const orderRes = await fetch('/api/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: cartTotal, currency: 'INR' }),
            });

            const orderData = await orderRes.json();
            console.log('📋 Order Response:', orderData);

            if (orderData.error) {
                console.warn('⚠️ Razorpay keys missing or error, falling back to mock payment');
                alert('Razorpay configuration error. Using mock payment flow.');
                // Fallback to mock flow if keys are missing
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: cart,
                        total: cartTotal,
                        customer
                    }),
                });

                if (response.ok) {
                    clearCart();
                    router.push('/checkout/success');
                }
                setIsLoading(false);
                return;
            }

            // 3. Open Razorpay Options
            console.log('💳 Opening Razorpay modal...');
            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            console.log('Razorpay Key:', razorpayKey ? 'Present' : 'MISSING!');

            const options = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Nove Maternity",
                description: "Transaction for Order",
                order_id: orderData.id,
                handler: async function (response: any) {
                    console.log('✅ Payment successful:', response);
                    // 4. On Success, Save Order to Supabase
                    const saveOrderRes = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            items: cart,
                            total: cartTotal,
                            customer,
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        }),
                    });

                    if (saveOrderRes.ok) {
                        clearCart();
                        router.push('/checkout/success');
                    } else {
                        alert('Payment successful but failed to save order. Please contact support.');
                    }
                },
                prefill: {
                    name: `${customer.firstName} ${customer.lastName}`,
                    email: customer.email as string,
                    contact: "9999999999"
                },
                theme: {
                    color: "#111827"
                }
            };

            console.log('🎯 Razorpay options:', options);

            if (!(window as any).Razorpay) {
                console.error('❌ Razorpay not found on window object!');
                alert('Razorpay SDK not loaded properly. Please refresh and try again.');
                setIsLoading(false);
                return;
            }

            const paymentObject = new (window as any).Razorpay(options);
            console.log('🎬 Opening Razorpay...');
            paymentObject.open();

        } catch (error) {
            console.error('❌ Checkout failed:', error);
            alert('Something went wrong. Please check console and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="newsletter" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                        <label htmlFor="newsletter" className="text-sm text-gray-600">Email me with news and offers</label>
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div>
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors md:col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors md:col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="PIN Code"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors md:col-span-2"
                    />
                </div>
            </div>

            {/* Payment */}
            <div>
                <h2 className="text-xl font-serif font-medium text-gray-900 mb-4">Payment</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-500 text-center">
                    <svg className="w-6 h-6 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    All transactions are secure and encrypted.
                </div>
                <div className="mt-4 space-y-3">
                    {/* Mock Payment Options */}
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                        <input type="radio" name="payment" id="card" className="text-gray-900 focus:ring-gray-900" defaultChecked />
                        <label htmlFor="card" className="ml-3 flex-1 font-medium text-gray-900">Credit / Debit Card</label>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                        <input type="radio" name="payment" id="upi" className="text-gray-900 focus:ring-gray-900" />
                        <label htmlFor="upi" className="ml-3 flex-1 font-medium text-gray-900">UPI</label>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Pay Now'
                )}
            </button>
        </form>
    );
}
