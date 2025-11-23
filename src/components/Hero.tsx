'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[#F5F5F7] overflow-hidden">
            <div ref={heroRef} className="max-w-4xl px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000 transform translate-y-10" style={{ animationFillMode: 'forwards' }}>
                <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-gray-900 mb-6">
                    Designed for Life.
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto">
                    Maternity wear that moves with you, from the first trimester to forever.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="#products"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
                    >
                        Shop Collection
                    </a>
                    <a
                        href="#features"
                        className="inline-flex items-center px-8 py-3 text-base font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Learn more <span className="ml-1">&gt;</span>
                    </a>
                </div>
            </div>

            <div className="mt-16 w-full max-w-6xl px-4">
                <div className="aspect-[16/9] rounded-t-3xl shadow-2xl mx-auto relative overflow-hidden">
                    {/* Hero Image */}
                    <img
                        src="/images/hero_lifestyle_maternity_1763899337161.png"
                        alt="Maternity Lifestyle"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>
        </section>
    );
}
