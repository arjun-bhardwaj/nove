'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

export default function WishlistDrawer() {
    const { wishlist, isWishlistOpen, toggleWishlistDrawer, toggleWishlist } = useWishlist();
    const { addItem } = useCart();
    const { showToast } = useToast();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isWishlistOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleWishlistDrawer}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-[70] transform transition-transform duration-300 ease-in-out ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-serif font-medium text-gray-900">Your Wishlist ({wishlist.length})</h2>
                        <button onClick={toggleWishlistDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {wishlist.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900">Your wishlist is empty</p>
                                    <p className="text-gray-500 mt-1">Save items you love to revisit later.</p>
                                </div>
                                <button
                                    onClick={toggleWishlistDrawer}
                                    className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {wishlist.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-24 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <Link
                                                        href={`/products/${item.id}`}
                                                        className="text-base font-medium text-gray-900 hover:text-gray-600 line-clamp-2"
                                                        onClick={toggleWishlistDrawer}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleWishlist(item)}
                                                        className="text-gray-400 hover:text-red-500 ml-2"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{item.priceString}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    addItem({
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        priceString: item.priceString,
                                                        image: item.image,
                                                        size: 'M' // Default size, user can change in cart
                                                    });
                                                    showToast(`Added ${item.name} to bag`);
                                                }}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-700 text-left"
                                            >
                                                Add to Bag
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
