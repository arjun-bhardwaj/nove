'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function OrderSummary() {
    const { cart, cartTotal } = useCart();

    return (
        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
            <h2 className="text-lg font-serif font-medium text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-16 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                            <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-bl-md">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{item.priceString}</p>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-xl font-serif font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Including all taxes</p>
            </div>
        </div>
    );
}
