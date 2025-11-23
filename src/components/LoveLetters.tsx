'use client';

import { useState } from 'react';

export default function LoveLetters() {
    const reviews = [
        {
            id: 1,
            author: "Sarah J.",
            role: "Expecting Mom (7 months)",
            rating: 5,
            text: "I have never felt more beautiful. The fabric is like butter, and it fits my bump perfectly without being tight. Nove is a game changer.",
            product: "The Everyday Legging"
        },
        {
            id: 2,
            author: "Emily R.",
            role: "New Mom",
            rating: 5,
            text: "The nursing access is genius. Finally, a top that doesn't look like 'maternity wear'. I wear it even when I'm not feeding!",
            product: "Nove Signature Nursing Top"
        },
        {
            id: 3,
            author: "Jessica M.",
            role: "Expecting Mom (5 months)",
            rating: 5,
            text: "Bought the sequin dress for my baby shower and got so many compliments. It made me feel like myself again.",
            product: "Midnight Sequin Mini"
        }
    ];

    return (
        <section className="py-24 bg-[#F9F9F9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gray-400 font-medium tracking-wider uppercase text-sm">Community</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-medium mt-4 text-gray-900">
                        Love Letters.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                <div>
                                    <p className="font-medium text-gray-900">{review.author}</p>
                                    <p className="text-xs text-gray-500">{review.role}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                    {review.product}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
