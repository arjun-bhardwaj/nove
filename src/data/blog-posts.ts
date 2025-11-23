export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Ultimate Guide to First Trimester Dressing',
        slug: 'first-trimester-dressing-guide',
        excerpt: 'Navigate early pregnancy style with comfort and confidence. Learn which pieces to invest in and which to skip.',
        content: `
# The Ultimate Guide to First Trimester Dressing

The first trimester is a time of incredible change—both physically and emotionally. While your bump might not be showing yet, you're likely experiencing bloating, breast tenderness, and fluctuating energy levels.

## What to Wear

Focus on pieces with gentle stretch and adjustable waistbands. Empire waist dresses, flowing tops, and soft leggings will be your best friends.

## Investment Pieces

- High-quality nursing bras
- Stretchy midi dresses
- Comfortable leggings with belly support

## Style Tips

Layer strategically and choose breathable fabrics like organic cotton and bamboo.
        `,
        category: 'Style Guide',
        author: 'Priya Sharma',
        date: '2024-01-15',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Sustainable Maternity: Why Fabric Matters',
        slug: 'sustainable-maternity-fabric-guide',
        excerpt: 'Discover why choosing sustainable fabrics during pregnancy is better for you and your baby.',
        content: `
# Sustainable Maternity: Why Fabric Matters

What touches your skin during pregnancy matters more than ever. Your body is working overtime, and the last thing you need is synthetic fabrics that trap heat and moisture.

## Why Organic Matters

Conventional cotton uses harmful pesticides that can affect both you and the environment. Organic alternatives are gentler on sensitive skin.

## Our Favorite Fabrics

- Organic Bamboo: Naturally antibacterial and moisture-wicking
- Tencel™ Modal: Silky soft and sustainably sourced
- Organic Cotton: Breathable and hypoallergenic

## The Long-Term Impact

Choosing sustainable maternity wear isn't just about pregnancy—it's about the world your child will inherit.
        `,
        category: 'Sustainability',
        author: 'Ananya Desai',
        date: '2024-01-10',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop'
    },
    {
        id: '3',
        title: 'Postpartum Wardrobe Essentials',
        slug: 'postpartum-wardrobe-essentials',
        excerpt: 'What to wear in the fourth trimester: comfortable, nursing-friendly pieces that make you feel like yourself.',
        content: `
# Postpartum Wardrobe Essentials

The fourth trimester is all about recovery, bonding, and adjusting to life with a newborn. Your wardrobe should support you through it all.

## Must-Have Pieces

Easy-access nursing tops, high-waisted leggings, and soft robes will be your uniform for the first few weeks.

## Nursing-Friendly Features

Look for hidden zippers, wrap styles, and button-front designs that make feeding easier.

## Comfort First

Your body has done incredible work. Choose pieces that feel like a gentle hug.
        `,
        category: 'Postpartum',
        author: 'Meera Patel',
        date: '2024-01-05',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop'
    }
];

export const blogCategories = [
    'All',
    'Style Guide',
    'Sustainability',
    'Postpartum',
    'Wellness',
    'Pregnancy Tips'
];
