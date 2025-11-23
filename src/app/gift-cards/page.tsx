'use client';

import { useState } from 'react';

export default function GiftCardsPage() {
    const [amount, setAmount] = useState('5000');
    const [customAmount, setCustomAmount] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [message, setMessage] = useState('');

    const predefinedAmounts = ['2000', '5000', '10000', '15000'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Gift card purchase functionality coming soon!');
    };

    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            {/* Hero */}
            <section className="relative py-16 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
                        Gift Cards
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Give the gift of comfort and style. Perfect for expecting mothers.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Gift Card Preview */}
                    <div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-12 text-white aspect-[16/10] flex flex-col justify-between shadow-2xl">
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-2">NOVE</h2>
                                <p className="text-sm opacity-80">Gift Card</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold mb-2">
                                    ₹{(customAmount || amount).toLocaleString()}
                                </p>
                                <p className="text-sm opacity-80">Redeemable online</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4 text-gray-600">
                            <p className="flex items-start gap-3">
                                <span className="text-gray-900">✓</span>
                                <span>Valid for 12 months from purchase date</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-gray-900">✓</span>
                                <span>Delivered instantly via email</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-gray-900">✓</span>
                                <span>Can be used multiple times until balance is zero</span>
                            </p>
                        </div>
                    </div>

                    {/* Purchase Form */}
                    <div>
                        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">Purchase a Gift Card</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Amount Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Amount
                                </label>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {predefinedAmounts.map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => {
                                                setAmount(amt);
                                                setCustomAmount('');
                                            }}
                                            className={`py-3 px-4 rounded-lg font-medium transition-colors ${amount === amt && !customAmount
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            ₹{parseInt(amt).toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Or enter custom amount"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            {/* Recipient Email */}
                            <div>
                                <label htmlFor="recipient-email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipient Email
                                </label>
                                <input
                                    type="email"
                                    id="recipient-email"
                                    required
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="recipient@example.com"
                                />
                            </div>

                            {/* Personal Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Personal Message (Optional)
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                    placeholder="Write a personal message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                            >
                                Purchase Gift Card
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
