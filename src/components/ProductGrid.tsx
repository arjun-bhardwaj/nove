'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

export default function ProductGrid() {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Filter out evening wear for the main grid
    const mainCollection = products.filter(p => p.category !== 'evening');

    return (
        <section id="products" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">The Collection.</h2>
                    <p className="text-xl text-gray-500">Essentials for every stage of your journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {mainCollection.map((product) => (
                        <div
                            key={product.id}
                            className={`group relative overflow-hidden rounded-3xl bg-[#F5F5F7] hover:scale-[1.01] transition-transform duration-300 ${product.size === 'large' ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 z-10 pointer-events-none" />

                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            priceString: product.priceString,
                                            image: product.image
                                        });
                                    }}
                                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                                >
                                    <svg
                                        className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-900'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end h-full">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-lg text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">{product.description}</p>
                                        <span className="text-lg font-medium text-white">{product.priceString}</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Add to Cart Button - Pointer events enabled */}
                            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            priceString: product.priceString,
                                            image: product.image,
                                            size: 'M'
                                        });
                                        showToast(`Added ${product.name} to bag`);
                                    }}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:bg-gray-800"
                                >
                                    Quick Add
                                </button>
                            </div>

                            {/* Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
