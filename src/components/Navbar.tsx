'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import AnnouncementBar from './AnnouncementBar';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();
    const { wishlist, toggleWishlistDrawer } = useWishlist();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBar />
            <nav
                className={`w-full transition-all duration-300 ${isScrolled ? 'glass-nav border-b border-gray-200/50 shadow-sm' : 'bg-white/95 backdrop-blur-md'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                            NOVE
                        </Link>


                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                Shop
                            </Link>
                            <Link href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                Blog
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                About
                            </Link>
                            <Link href="/sustainability" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                Sustainability
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                                Contact
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href="/account"
                                className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
                                aria-label="Account"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                            <button
                                onClick={toggleWishlistDrawer}
                                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
                                aria-label="Wishlist"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
                                aria-label="Shopping cart"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                                aria-label="Menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/" className="block text-gray-700 hover:text-gray-900 font-medium">
                                Shop
                            </Link>
                            <Link href="/sustainability" className="block text-gray-700 hover:text-gray-900 font-medium">
                                Sustainability
                            </Link>
                            <Link href="/about" className="block text-gray-700 hover:text-gray-900 font-medium">
                                About
                            </Link>
                            <Link href="/account" className="block text-gray-700 hover:text-gray-900 font-medium">
                                My Account
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
