'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export default function EveningEdit() {
    const eveningProducts = products.filter(p => p.category === 'evening');

    return (
        <section className="py-24 bg-gray-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">The Evening Edit</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mt-4 mb-6">
                        Own the Night.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Glamorous styles designed for your most memorable moments. From cocktail parties to baby showers, shine in comfort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {eveningProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="group block">
                            <div className="aspect-[3/4] relative bg-gray-900 rounded-xl overflow-hidden mb-6">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                            </div>
                            <h3 className="text-xl font-serif font-medium mb-2">{product.name}</h3>
                            <p className="text-gray-400">{product.priceString}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="#products" className="inline-block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-gray-950 transition-colors">
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
}
