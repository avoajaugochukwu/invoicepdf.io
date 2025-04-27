/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPages } from "@/lib/notion";
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPostCard } from "@/components/BlogPostCard";

export default async function Home() {
  const pages = await fetchPages();

  if (!pages || pages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">No posts found</div>
      </div>
    );
  }

  const posts = pages.map((page: any) => {
    const dateStr = page.properties.Created?.created_time || new Date().toISOString();

    let featuredImageUrl = '/placeholder-image.jpg';
    const featuredImageProp = page.properties["Featured Image"]?.files;
    if (featuredImageProp && featuredImageProp.length > 0) {
      if (featuredImageProp[0].type === 'external') {
        featuredImageUrl = featuredImageProp[0].external.url;
      } else if (featuredImageProp[0].type === 'file') {
        featuredImageUrl = featuredImageProp[0].file.url;
      }
    }

    return {
      id: page.id,
      title: page.properties.Name?.title[0]?.plain_text || 'Untitled Post',
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || 'No excerpt available.',
      formattedDate: format(new Date(dateStr), 'MMM d, yyyy'),
      featuredImageUrl: featuredImageUrl,
    };
  }).sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime());

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
              <BlogPostCard key={post.id} post={post} />
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
