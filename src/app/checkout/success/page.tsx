import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl font-serif font-medium text-gray-900 mb-4">
                Thank you for your order!
            </h1>
            <p className="text-gray-500 max-w-md mb-12 leading-relaxed">
                We've received your order and will send you an email confirmation shortly. Your Nove pieces are being prepared with care.
            </p>

            <div className="space-x-4">
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
