# Nove - Premium Maternity E-commerce Platform

A fully-featured, production-ready e-commerce platform for maternity wear built with Next.js, Supabase, and Razorpay.

## 🚀 Features

### Customer Experience
- Shopping cart & wishlist
- Razorpay payment integration (cards, UPI, netbanking)
- Virtual try-on feature
- Product reviews ("Love Letters")
- Sustainability page
- Responsive design

### Admin Panel
- Real-time analytics with charts
- Product management (CRUD, bulk operations, CSV export)
- Order management (filters, status updates, tracking)
- Stock tracking & low stock alerts
- Dashboard with key metrics

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Payments**: Razorpay
- **Charts**: Recharts
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Razorpay account

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd website_maternity\ wear
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase and Razorpay credentials.

4. Run database migrations (see `SUPABASE_SETUP.md`)

5. Start development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy to Vercel:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 📝 Documentation

- `SUPABASE_SETUP.md` - Database setup guide
- `DEPLOYMENT.md` - Deployment instructions

## 🔒 Security

- Environment variables for all secrets
- Supabase Row Level Security (RLS) enabled
- HTTPS only in production
- Secure payment processing via Razorpay

## 📄 License

Private - All rights reserved

## 🙏 Acknowledgments

Built with ❤️ for expecting mothers everywhere.
