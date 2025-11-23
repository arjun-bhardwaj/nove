'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products } from '@/data/products';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    priceString: string;
    image: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    toggleWishlist: (item: WishlistItem) => void;
    isInWishlist: (id: number) => boolean;
    isWishlistOpen: boolean;
    toggleWishlistDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Load wishlist from local storage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('nove_wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Save wishlist to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('nove_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            const exists = prev.some((i) => i.id === item.id);
            if (exists) {
                return prev.filter((i) => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
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
