export default function PressSection() {
    const pressLogos = [
        { name: 'VOGUE', font: 'font-serif' },
        { name: 'ELLE', font: 'font-sans' },
        { name: 'Harper\'s BAZAAR', font: 'font-serif' },
        { name: 'Marie Claire', font: 'font-serif' },
        { name: 'Goop', font: 'font-sans' },
    ];

    return (
        <section className="py-12 border-b border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">
                    As Seen In
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {pressLogos.map((logo) => (
                        <span
                            key={logo.name}
                            className={`text-2xl md:text-3xl font-bold text-gray-900 ${logo.font}`}
                        >
                            {logo.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
