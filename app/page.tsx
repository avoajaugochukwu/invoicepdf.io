import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchPages } from "@/lib/notion";
import Link from 'next/link';
import { format } from 'date-fns';

export default async function Home() {
  const pages = await fetchPages();

  if (pages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">No posts found</div>
      </div>
    );
  }

  const posts = pages.map((page: any) => {
    const dateStr = page.properties.Created?.created_time || new Date().toISOString();
    return {
      id: page.id,
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      title: page.properties.Title?.title[0]?.plain_text || 'Untitled Post',
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
      date: dateStr,
      formattedDate: format(new Date(dateStr), 'MMM d, yyyy'),
      readingTime: `${page.properties.ReadingTime?.number || 5} min read`,
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      author: page.properties.Author?.select?.name || 'Ugo Charles'
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p>This is your clean page.</p>

        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">Latest Blog Posts</h2>
          {posts && posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="border-b pb-2 last:border-b-0">
                  <Link href={`/blog/${post.slug}`} legacyBehavior>
                    <a className="group block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded transition-colors">
                      <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</span>
                      <span className="text-sm text-muted-foreground ml-2">({post.formattedDate})</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">No blog posts found.</p>
          )}
          <div className="text-center mt-6">
            <Link href="/blog" legacyBehavior>
              <a className="text-blue-600 dark:text-blue-400 hover:underline">
                View all posts &rarr;
              </a>
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-12">
        <p className="text-sm text-muted-foreground">My Footer</p>
      </footer>
    </div>
  );
}
