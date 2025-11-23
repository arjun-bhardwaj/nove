export default function Newsletter() {
    return (
        <section className="py-24 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                    Join the World of Nove
                </h2>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                    Sign up for exclusive access to new collections, parenting tips, and 10% off your first order.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
