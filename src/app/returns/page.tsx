'use client';

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            {/* Hero */}
            <section className="relative py-16 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
                        Returns & Exchanges
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We want you to love every piece. If something isn't quite right, we're here to help.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Return Policy */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">Our Return Policy</h2>
                    <div className="prose prose-lg text-gray-600">
                        <p>
                            We offer a <strong>30-day return window</strong> from the date of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached.
                        </p>
                    </div>
                </section>

                {/* How to Return */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">How to Return</h2>
                    <div className="space-y-6">
                        {[
                            {
                                step: '1',
                                title: 'Initiate Your Return',
                                description: 'Email us at returns@nove.com with your order number and reason for return.'
                            },
                            {
                                step: '2',
                                title: 'Pack Your Items',
                                description: 'Securely pack the items in their original packaging with all tags attached.'
                            },
                            {
                                step: '3',
                                title: 'Ship It Back',
                                description: 'Use the prepaid return label we\'ll email you. Drop it off at any courier location.'
                            },
                            {
                                step: '4',
                                title: 'Get Your Refund',
                                description: 'Once we receive and inspect your return, we\'ll process your refund within 5-7 business days.'
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                                        {item.step}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exchanges */}
                <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-4">Exchanges</h2>
                    <p className="text-gray-600 mb-4">
                        Need a different size or color? We offer free exchanges within 30 days of delivery.
                    </p>
                    <p className="text-gray-600">
                        Simply email us at <a href="mailto:orders@nove.com" className="text-gray-900 underline">orders@nove.com</a> with your order number and the item you'd like to exchange.
                    </p>
                </section>

                {/* Important Notes */}
                <section>
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">Important Notes</h2>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-3">
                            <span className="text-gray-900">•</span>
                            <span>Sale items are final sale and cannot be returned or exchanged</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-gray-900">•</span>
                            <span>Intimates and swimwear must have hygiene seals intact</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-gray-900">•</span>
                            <span>Return shipping is free for Indian orders</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-gray-900">•</span>
                            <span>International returns may incur shipping fees</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-gray-900">•</span>
                            <span>Refunds will be issued to the original payment method</span>
                        </li>
                    </ul>
                </section>

                {/* Contact */}
                <section className="mt-16 text-center">
                    <p className="text-gray-600 mb-4">Have questions about returns or exchanges?</p>
                    <a
                        href="/contact"
                        className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Contact Us
                    </a>
                </section>
            </div>
        </main>
    );
}
