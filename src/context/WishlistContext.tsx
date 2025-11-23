'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    priceString: string;
    image: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    toggleWishlist: (item: WishlistItem) => Promise<void>;
    isInWishlist: (id: number) => boolean;
    isWishlistOpen: boolean;
    toggleWishlistDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const { user } = useAuth();
    const { showToast } = useToast();

    // Load wishlist
    useEffect(() => {
        const loadWishlist = async () => {
            if (user && supabase) {
                // Load from Supabase for logged-in users
                const { data, error } = await supabase
                    .from('wishlists')
                    .select('product_id');

                if (data) {
                    // We need to fetch full product details. 
                    // For now, we'll fetch all products from the API to map IDs to details.
                    // In a real app, you might want a more efficient way or store details in the wishlist table (denormalized).
                    // Or better, fetch product details by ID from the products table.

                    // Fetching full product list to map IDs (temporary solution for static data mix)
                    // Ideally, we should query the 'products' table if we migrated fully.
                    // Let's try to fetch from the API endpoint we have or import static data if API fails.

                    try {
                        const response = await fetch('/api/products');
                        const products = await response.json();

                        const wishlistItems = data.map(w => {
                            const product = products.find((p: any) => p.id === w.product_id);
                            return product ? {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                priceString: product.priceString,
                                image: product.image
                            } : null;
                        }).filter(Boolean) as WishlistItem[];

                        setWishlist(wishlistItems);
                    } catch (e) {
                        console.error("Failed to load product details for wishlist", e);
                    }
                }
            } else {
                // Load from local storage for guests
                const savedWishlist = localStorage.getItem('nove_wishlist');
                if (savedWishlist) {
                    setWishlist(JSON.parse(savedWishlist));
                }
            }
        };

        loadWishlist();
    }, [user]);

    // Save wishlist to local storage for guests
    useEffect(() => {
        if (!user) {
            localStorage.setItem('nove_wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const toggleWishlist = async (item: WishlistItem) => {
        const exists = wishlist.some((i) => i.id === item.id);

        // Optimistic update
        setWishlist((prev) => {
            if (exists) {
                return prev.filter((i) => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });

        if (user && supabase) {
            if (exists) {
                // Remove from Supabase
                const { error } = await supabase
                    .from('wishlists')
                    .delete()
                    .match({ user_id: user.id, product_id: item.id });

                if (error) {
                    showToast('Failed to remove from wishlist', 'error');
                    // Revert optimistic update
                    setWishlist((prev) => [...prev, item]);
                }
            } else {
                // Add to Supabase
                const { error } = await supabase
                    .from('wishlists')
                    .insert({ user_id: user.id, product_id: item.id });

                if (error) {
                    showToast('Failed to add to wishlist', 'error');
                    // Revert optimistic update
                    setWishlist((prev) => prev.filter((i) => i.id !== item.id));
                } else {
                    showToast('Added to wishlist', 'success');
                }
            }
        } else {
            // Guest user - just show toast
            showToast(exists ? 'Removed from wishlist' : 'Added to wishlist', 'success');
        }
    };

    const isInWishlist = (id: number) => {
        return wishlist.some((item) => item.id === id);
    };

    const toggleWishlistDrawer = () => {
        setIsWishlistOpen((prev) => !prev);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, isWishlistOpen, toggleWishlistDrawer }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
