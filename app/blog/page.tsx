import { getAllPosts } from '@/lib/blog';
import { BlogPostCard } from '@/components/BlogPostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoicing Guides & Tips for Freelancers and Small Businesses',
  description:
    'Practical, beginner-friendly guides on how to create, send, and get paid on invoices—plus templates, examples, and tips to streamline your billing.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="text-center text-muted-foreground">No posts found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Blog Posts
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          All our latest articles and updates.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={{ ...post, id: post.slug }} />
          ))}
        </div>
      </main>
    </div>
  );
}
