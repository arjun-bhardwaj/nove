'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import RelatedProducts from '@/components/RelatedProducts';
import VirtualTryOn from '@/components/VirtualTryOn';
import ProductReviews from '@/components/ProductReviews';

export default function ProductPage() {
    const params = useParams();
    const { addItem } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState('M');
    const [isTryOnOpen, setIsTryOnOpen] = useState(false);

    // Handle case where params might be null or undefined initially
    if (!params?.id) return null;

    const product = products.find((p) => p.id === Number(params.id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-900">Product not found</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square relative bg-[#F5F5F7] rounded-3xl overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Thumbnails (Placeholder) */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-[#F5F5F7] rounded-xl relative overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                    <Image
                                        src={product.image}
                                        alt={`${product.name} view ${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-medium text-gray-900 mb-8">{product.priceString}</p>

                        <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Select Size</h3>
                            <div className="flex gap-4">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all ${selectedSize === size
                                            ? 'bg-gray-900 text-white shadow-lg scale-110'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex flex-col gap-4 mb-12">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            priceString: product.priceString,
                                            image: product.image,
                                            size: selectedSize
                                        });
                                        showToast(`Added ${product.name} to bag`);
                                    }}
                                    className="flex-1 bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                                >
                                    Add to Bag
                                </button>
                                <button
                                    onClick={() => toggleWishlist({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        priceString: product.priceString,
                                        image: product.image
                                    })}
                                    className={`w-14 h-14 flex items-center justify-center rounded-full border transition-colors ${isInWishlist(product.id)
                                        ? 'border-red-200 bg-red-50 text-red-500'
                                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    <svg className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={() => setIsTryOnOpen(true)}
                                className="w-full py-3 border border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Virtual Try-On
                            </button>
                        </div>

                        <VirtualTryOn
                            productImage={product.image}
                            isOpen={isTryOnOpen}
                            onClose={() => setIsTryOnOpen(false)}
                        />
                        {/* Details List */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                            <ul className="space-y-2">
                                {product.details?.map((detail, index) => (
                                    <li key={index} className="flex items-center text-gray-500">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-24">
                    <ProductReviews productId={product.id} />
                </div>

                <RelatedProducts currentId={product.id} />
            </div>
        </main>
    );
}
