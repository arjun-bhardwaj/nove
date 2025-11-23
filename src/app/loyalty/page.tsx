'use client';

export default function LoyaltyPage() {
    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            {/* Hero */}
            <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6">
                        Nove Rewards
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Earn points with every purchase and unlock exclusive benefits
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-medium text-gray-900 mb-12 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Shop & Earn',
                                description: 'Earn 1 point for every ₹100 spent on Nove products'
                            },
                            {
                                step: '2',
                                title: 'Collect Points',
                                description: 'Points are automatically added to your account after each purchase'
                            },
                            {
                                step: '3',
                                title: 'Redeem Rewards',
                                description: 'Use your points for discounts, free shipping, and exclusive perks'
                            }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Tiers */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-medium text-gray-900 mb-12 text-center">Membership Tiers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                tier: 'Silver',
                                requirement: '₹0 - ₹25,000',
                                benefits: ['1 point per ₹100', 'Birthday gift', 'Early sale access'],
                                color: 'from-gray-300 to-gray-400'
                            },
                            {
                                tier: 'Gold',
                                requirement: '₹25,000 - ₹50,000',
                                benefits: ['1.5 points per ₹100', 'Free shipping', 'Exclusive products', 'Birthday gift'],
                                color: 'from-yellow-400 to-yellow-600'
                            },
                            {
                                tier: 'Platinum',
                                requirement: '₹50,000+',
                                benefits: ['2 points per ₹100', 'Free express shipping', 'VIP customer service', 'Exclusive events', 'Birthday gift'],
                                color: 'from-purple-400 to-purple-600'
                            }
                        ].map((tier) => (
                            <div key={tier.tier} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                                <div className={`bg-gradient-to-r ${tier.color} text-white text-center py-3 rounded-lg mb-6`}>
                                    <h3 className="text-2xl font-bold">{tier.tier}</h3>
                                </div>
                                <p className="text-sm text-gray-600 text-center mb-6">{tier.requirement}</p>
                                <ul className="space-y-3">
                                    {tier.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-700">
                                            <span className="text-gray-900 mt-1">✓</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rewards Catalog */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-serif font-medium text-gray-900 mb-12 text-center">Redeem Your Points</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { points: '500', reward: '₹500 Off', description: 'On orders over ₹5,000' },
                            { points: '1000', reward: '₹1,200 Off', description: 'On orders over ₹10,000' },
                            { points: '1500', reward: 'Free Shipping', description: 'For 3 months' },
                            { points: '2000', reward: 'Exclusive Gift', description: 'Limited edition item' }
                        ].map((item) => (
                            <div key={item.points} className="bg-gray-50 rounded-xl p-6 text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{item.points}</div>
                                <div className="text-sm text-gray-600 mb-3">points</div>
                                <div className="text-lg font-semibold text-gray-900 mb-2">{item.reward}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-serif font-medium mb-6">Ready to Start Earning?</h2>
                    <p className="text-lg opacity-90 mb-8">
                        Create an account or sign in to start earning points with your next purchase
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors">
                        Join Nove Rewards
                    </button>
                </div>
            </section>
        </main>
    );
}
