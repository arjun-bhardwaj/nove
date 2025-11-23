import Image from 'next/image';

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen bg-white mt-[104px]">
            {/* Hero */}
            <section className="relative py-24 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
                        Consciously Crafted.
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We believe that what touches your skin matters. That's why every Nove piece is crafted from sustainable, non-toxic fabrics designed to nurture you and the planet.
                    </p>
                </div>
            </section>

            {/* Materials Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                            {/* Placeholder for Bamboo Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#E8F3E8]">
                                <span className="text-green-800 font-serif text-4xl opacity-20">Bamboo</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">Organic Bamboo</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Our signature fabric. Derived from organically grown bamboo, it is naturally hypoallergenic, moisture-wicking, and temperature regulating. It feels like a cool breeze against your skin, perfect for hormonal fluctuations.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Pesticide-free cultivation
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Biodegradable fibers
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Antibacterial properties
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">Tencel™ Modal</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Silky soft and incredibly durable. Our Modal is sourced from sustainably managed beech wood forests. It retains its shape and softness wash after wash, ensuring your favorite pieces last well beyond pregnancy.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    Closed-loop production
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    Water-efficient process
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    Carbon neutral footprint
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                            {/* Placeholder for Modal Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#E8EEF3]">
                                <span className="text-blue-800 font-serif text-4xl opacity-20">Modal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed opacity-90">
                        "We are borrowing this earth from our children. Every thread we weave is a promise to protect their future."
                    </blockquote>
                </div>
            </section>
        </main>
    );
}
