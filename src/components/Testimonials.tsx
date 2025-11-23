'use client';

const testimonials = [
    {
        id: 1,
        text: "The most comfortable leggings I've ever worn. I lived in these during my third trimester!",
        author: "Sarah M.",
        role: "New Mom"
    },
    {
        id: 2,
        text: "Finally, maternity wear that actually looks stylish. The dress fits perfectly.",
        author: "Priya K.",
        role: "Expecting"
    },
    {
        id: 3,
        text: "The nursing tops are a lifesaver. So easy to use and the fabric is incredibly soft.",
        author: "Emily R.",
        role: "Mom of 2"
    },
    {
        id: 4,
        text: "Worth every penny. The quality is unmatched compared to other brands I've tried.",
        author: "Jessica T.",
        role: "First-time Mom"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-center text-gray-900 mb-16">
                    Loved by Moms.
                </h2>

                <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="min-w-[300px] md:min-w-[400px] bg-[#F5F5F7] p-8 rounded-2xl snap-center flex-shrink-0"
                        >
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-lg text-gray-800 mb-6 leading-relaxed">"{testimonial.text}"</p>
                            <div>
                                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
