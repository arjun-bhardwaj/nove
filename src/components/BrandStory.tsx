import Image from 'next/image';

export default function BrandStory() {
    return (
        <section id="about" className="py-24 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/images/hero_lifestyle_maternity_1763899337161.png"
                            alt="Mother and child"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="md:pl-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-8">
                            Celebrating the Journey of Motherhood.
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Nove was born from a simple belief: that you shouldn't have to compromise on style or comfort during one of life's most beautiful transformations.
                            </p>
                            <p>
                                We design pieces that honor your changing body, using sustainable fabrics that feel like a second skin. From the first flutter to the fourth trimester, we are here to support you with elegance and ease.
                            </p>
                            <p>
                                Because you are creating life, and you deserve to feel extraordinary every step of the way.
                            </p>
                        </div>
                        <div className="mt-10">
                            <img src="/signature.png" alt="" className="h-12 opacity-60" />
                            {/* Placeholder for signature, or remove if not needed */}
                            <p className="font-serif italic text-xl text-gray-800 mt-4">- The Nove Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
