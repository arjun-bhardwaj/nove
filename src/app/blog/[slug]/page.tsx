'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export default function BlogPostPage() {
    const params = useParams();
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[120px]">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Post not found</h1>
                    <Link href="/blog" className="text-gray-600 hover:text-gray-900 underline">
                        Back to blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

    return (
        <main className="min-h-screen bg-white pt-[120px] pb-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/blog" className="text-gray-600 hover:text-gray-900 mb-6 inline-block">
                        ← Back to blog
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-medium text-gray-900 bg-gray-100 px-4 py-1 rounded-full">
                            {post.category}
                        </span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden mb-12">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-16">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {post.content}
                    </div>
                </div>

                {/* Share */}
                <div className="border-t border-b border-gray-200 py-8 mb-16">
                    <p className="text-sm text-gray-600 mb-4">Share this article:</p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                            Twitter
                        </button>
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                            Facebook
                        </button>
                        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                            Pinterest
                        </button>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
