'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function RelatedProducts({ currentId }: { currentId: number }) {
    // Get 3 random products excluding the current one
    const related = products
        .filter((p) => p.id !== currentId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <section className="py-16 border-t border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="group block">
                        <div className="aspect-square relative bg-[#F5F5F7] rounded-xl overflow-hidden mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-gray-500">{product.priceString}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
