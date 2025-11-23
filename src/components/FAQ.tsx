'use client';

import { useState } from 'react';

const faqs = [
    {
        question: "How do I choose my size?",
        answer: "We recommend ordering your pre-pregnancy size. Our clothes are designed to grow with you. If you're expecting twins or prefer a looser fit, you may want to size up."
    },
    {
        question: "What is your return policy?",
        answer: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within India. We are working on expanding our shipping destinations soon."
    },
    {
        question: "Are the fabrics sustainable?",
        answer: "Yes! We use organic bamboo, cotton, and recycled materials whenever possible. Our goal is to be kind to your skin and the planet."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-semibold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4">
                            <button
                                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-500 pb-4 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
