import { getAllPosts } from "@/lib/blog";
import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogPostCard } from "@/components/BlogPostCard";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
      <section className="text-center mb-20 md:mb-24 lg:mb-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
              Effortless Invoicing for Freelancers & Small Businesses
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8">
            Stop chasing payments and wasting time. Create professional invoices in minutes, track expenses, and get paid faster. Focus on what you do best.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12">
          Latest Insights & Tips
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={{ ...post, id: post.slug }} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mb-12">No recent posts found.</div>
        )}
        <div className="text-center">
          <Link href="/blog" className="text-primary hover:underline font-medium">
            View all posts &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
