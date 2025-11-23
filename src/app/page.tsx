import Hero from '@/components/Hero';
import PressSection from '@/components/PressSection';
import ProductGrid from '@/components/ProductGrid';
import LoveLetters from '@/components/LoveLetters';
import FAQ from '@/components/FAQ';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import EveningEdit from '@/components/EveningEdit';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <PressSection />
      <ProductGrid />
      <EveningEdit />
      <BrandStory />
      <LoveLetters />
      <FAQ />
      <Newsletter />

      <section id="features" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Breathable Fabrics.</h3>
              <p className="text-gray-500">Stay cool and comfortable all day long with our signature bamboo blends.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Adaptive Fit.</h3>
              <p className="text-gray-500">Clothes that grow with your bump and shrink with you afterwards.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Sustainable.</h3>
              <p className="text-gray-500">Good for you, good for the planet. 100% eco-friendly materials.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#F5F5F7] border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
                <li><a href="#" className="hover:text-gray-900">Maternity</a></li>
                <li><a href="#" className="hover:text-gray-900">Nursing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About Nove</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Our Story</a></li>
                <li><a href="/sustainability" className="hover:text-gray-900">Sustainability</a></li>
                <li><a href="#" className="hover:text-gray-900">Fabrics</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900">Size Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Stay in the loop</h4>
              <p className="text-sm text-gray-500 mb-4">Sign up for exclusive offers and new arrivals.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-900" />
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">Join</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">&copy; 2025 Nove Maternity. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-xs text-gray-500 hover:underline">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:underline">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
