import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header */}
            <header className="border-b border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                    <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                        NOVE
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div className="order-2 lg:order-1">
                        <CheckoutForm />
                    </div>
                    <div className="order-1 lg:order-2">
                        <OrderSummary />
                    </div>
                </div>
            </main>
        </div>
    );
}
