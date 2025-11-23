'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import { useState, useMemo } from 'react';

export default function ProductGrid() {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category || 'Other')))];

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            default:
                // Featured (default order)
                break;
        }

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <section id="products" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">The Collection.</h2>
                    <p className="text-xl text-gray-500">Essentials for every stage of your journey.</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-500">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-0 bg-white text-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-gray-900 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category === 'evening' ? 'Evening Edit' : category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
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
                ) : (
                    <div className="text-center py-24">
                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                            }}
                            className="mt-4 text-gray-900 font-medium underline hover:text-gray-700"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
