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
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      title: page.properties.Title?.title[0]?.plain_text || 'Untitled Post',
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || 'Read more...',
      date: dateStr,
      formattedDate: format(new Date(dateStr), 'MMM d, yyyy'),
      featuredImageUrl: featuredImageUrl,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-12">
      <main className="flex flex-col gap-12 items-center">
        <h1 className="text-4xl font-bold text-center">Welcome!</h1>
        <p className="text-lg text-muted-foreground text-center">Check out our latest articles.</p>

        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No blog posts found.</p>
          )}
          <div className="text-center mt-12">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-16 pt-8 border-t text-center">
        <p className="text-sm text-muted-foreground">My Footer</p>
      </footer>
    </div>
  );
}
