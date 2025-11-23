'use client';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white pt-[120px]">
            {/* Hero Section */}
            <section className="relative py-24 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
                        About Nove
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We believe motherhood is a journey worth celebrating—every curve, every milestone, every moment.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-serif font-medium text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Nove was born from a simple observation: expecting mothers deserve clothing that doesn't compromise on style, comfort, or sustainability.
                                </p>
                                <p>
                                    Founded in 2024, we set out to create a maternity wear brand that celebrates the beauty of pregnancy while honoring the planet our children will inherit.
                                </p>
                                <p>
                                    Every piece is thoughtfully designed to grow with you—from the first trimester through postpartum and beyond.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square bg-[#F5F5F7] rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-400 font-serif text-3xl opacity-20">Our Story</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-medium text-gray-900 mb-16 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Sustainability',
                                description: 'Every fabric is chosen for its minimal environmental impact. From organic bamboo to Tencel™ Modal, we prioritize the planet.',
                                icon: '🌱'
                            },
                            {
                                title: 'Comfort First',
                                description: 'Your body is doing incredible work. Our designs adapt to your changing shape with gentle support and breathable fabrics.',
                                icon: '💚'
                            },
                            {
                                title: 'Timeless Style',
                                description: 'Maternity wear shouldn\'t feel temporary. Our pieces are designed to be worn throughout pregnancy and beyond.',
                                icon: '✨'
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed opacity-90">
                        "To empower mothers with clothing that honors their journey, respects the earth, and celebrates the beauty of every stage."
                    </blockquote>
                    <p className="mt-8 text-gray-400">— The Nove Team</p>
                </div>
            </section>
        </main>
    );
}
