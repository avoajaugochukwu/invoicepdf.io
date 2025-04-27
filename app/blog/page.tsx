import Link from 'next/link';
import { fetchPages } from '@/lib/notion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming Card is available
import { Badge } from "@/components/ui/badge"; // Assuming Badge is available
import { format } from 'date-fns'; // For formatting dates

// Define a type for better structure (adjust based on your actual properties)
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // Keep as string initially
  formattedDate: string;
  readingTime: string;
  tags: string[];
  author: string;
};

export default async function BlogIndex() {
  const pages = await fetchPages();

  if (!pages || pages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>
        <div className="text-center text-muted-foreground">No posts found.</div>
      </div>
    );
  }

  // Map Notion pages to our Post type
  const posts: Post[] = pages.map((page: any) => {
    const dateStr = page.properties.Created?.created_time || new Date().toISOString();
    return {
      id: page.id,
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id, // Fallback slug
      title: page.properties.Title?.title[0]?.plain_text || 'Untitled Post',
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || 'No excerpt available.',
      date: dateStr,
      formattedDate: format(new Date(dateStr), 'MMMM d, yyyy'), // Format the date
      readingTime: `${page.properties.ReadingTime?.number || 5} min read`,
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      author: page.properties.Author?.select?.name || 'Ugo Charles'
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} legacyBehavior>
            <a className="block hover:scale-[1.02] transition-transform duration-200 ease-in-out">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.formattedDate} · {post.readingTime}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 pt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </CardFooter>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Optional: Add revalidation if needed
// export const revalidate = 60; // Revalidate every 60 seconds 