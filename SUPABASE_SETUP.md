# Supabase Database Setup Guide

## Prerequisites
- Supabase account (sign up at https://supabase.com)
- Project created in Supabase

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/001_create_products_table.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Repeat for `002_create_orders_table.sql`

## Step 3: Verify Tables Created

1. Go to **Table Editor** in Supabase
2. You should see two tables:
   - `products` (with 6 sample products)
   - `orders` (empty, will populate when customers place orders)

## Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RjC40eeiTBtPQw
RAZORPAY_KEY_ID=rzp_live_RjC40eeiTBtPQw
RAZORPAY_KEY_SECRET=2QK6qeFmNy86z8ThFBytsS6N
```

## Step 5: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password for your admin account
4. Click **Create User**
5. Use these credentials to log in at `/admin/login`

## Step 6: Test the Integration

1. Restart your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Products should now load from Supabase
4. Try adding a product to cart and checking out
5. Check the `orders` table in Supabase to see the new order

## Optional: Add More Products

You can add more products via:
- **Admin Panel**: Go to `/admin/products/new`
- **SQL Editor**: Run INSERT statements
- **Table Editor**: Manually add rows

## Troubleshooting

**Products not loading?**
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Verify tables exist in Table Editor
- Check browser console for errors

**Can't log in to admin?**
- Make sure you created a user in Supabase Auth
- Check that the email/password match

**Orders not saving?**
- Check that RLS policies are enabled
- Verify the orders table exists
- Check Network tab in browser DevTools for API errors

## Next Steps

Once database is set up:
1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Your site will be live with real database!
