# Deployment Guide - Nove E-commerce Platform

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Nove e-commerce platform"

# Create main branch
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your repository
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zzjsunvanixyjsctjgva.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6anN1bnZhbml4eWpzY3RqZ3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MDM0NDcsImV4cCI6MjA3OTQ3OTQ0N30.q0w9t-BVCCoCpz1b-mhQkLRsq2L_3A2hqNSQd9UcUGM
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RjC40eeiTBtPQw
RAZORPAY_KEY_ID=rzp_live_RjC40eeiTBtPQw
RAZORPAY_KEY_SECRET=2QK6qeFmNy86z8ThFBytsS6N
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait ~2 minutes for build to complete
3. Your site will be live at: `https://your-project-name.vercel.app`

---

## 📋 Post-Deployment Checklist

### 1. Create Admin User
- Go to Supabase → Authentication → Users
- Add a new user with email/password
- Use this to log in at `/admin/login`

### 2. Test the Site
- [ ] Browse products
- [ ] Add to cart
- [ ] Complete checkout with Razorpay test card
- [ ] Check order in Supabase
- [ ] Log in to admin panel
- [ ] Add/edit products
- [ ] Update order status

### 3. Configure Custom Domain (Optional)
- In Vercel project settings → Domains
- Add your custom domain (e.g., `nove.com`)
- Update DNS records as instructed

### 4. Enable Analytics (Optional)
- Vercel Analytics (free)
- Google Analytics
- Hotjar for user behavior

---

## 🧪 Razorpay Test Cards

For testing payments:

**Test Card:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Test UPI:**
- UPI ID: `success@razorpay`

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use environment variables** in Vercel for all secrets
3. **Enable RLS** in Supabase (already done)
4. **Use HTTPS only** (Vercel provides this automatically)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Check Supabase logs for database errors

---

## 🎉 You're Live!

Once deployed, share your site:
- Social media
- Friends and family
- Start selling!

Your Nove e-commerce platform is production-ready! 🚀
