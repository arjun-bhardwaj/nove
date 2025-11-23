'use client';

export default function SizeGuidePage() {
    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            {/* Hero */}
            <section className="relative py-16 bg-[#F5F5F7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
                        Size Guide
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find your perfect fit with our comprehensive sizing guide
                    </p>
                </div>
            </section>

            {/* Size Chart */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">Maternity Size Chart</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Size</th>
                                    <th className="px-6 py-4 text-left">UK</th>
                                    <th className="px-6 py-4 text-left">Bust (inches)</th>
                                    <th className="px-6 py-4 text-left">Waist (inches)</th>
                                    <th className="px-6 py-4 text-left">Hip (inches)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[
                                    { size: 'XS', uk: '6-8', bust: '32-34', waist: '24-26', hip: '34-36' },
                                    { size: 'S', uk: '8-10', bust: '34-36', waist: '26-28', hip: '36-38' },
                                    { size: 'M', uk: '10-12', bust: '36-38', waist: '28-30', hip: '38-40' },
                                    { size: 'L', uk: '12-14', bust: '38-40', waist: '30-32', hip: '40-42' },
                                    { size: 'XL', uk: '14-16', bust: '40-42', waist: '32-34', hip: '42-44' },
                                ].map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{row.size}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.uk}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.bust}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.waist}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.hip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How to Measure */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">How to Measure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Bust',
                                description: 'Measure around the fullest part of your bust, keeping the tape parallel to the floor.'
                            },
                            {
                                title: 'Waist',
                                description: 'Measure around your natural waistline, which is typically the narrowest part of your torso.'
                            },
                            {
                                title: 'Hip',
                                description: 'Measure around the fullest part of your hips, approximately 8 inches below your waist.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fit Tips */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">Fit Tips</h2>
                    <div className="space-y-6">
                        {[
                            'Order your pre-pregnancy size - our pieces are designed to grow with you',
                            'If between sizes, we recommend sizing up for extra comfort',
                            'Our fabrics have natural stretch to accommodate your changing body',
                            'Contact us if you need personalized sizing advice'
                        ].map((tip, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">
                                    {index + 1}
                                </span>
                                <p className="text-lg text-gray-600">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
