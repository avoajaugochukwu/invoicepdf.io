import { notFound } from 'next/navigation';
import { fetchBySlug, fetchPageBlocks, notion } from '@/lib/notion';
import { NotionRenderer } from '@/components/NotionRenderer'; // We'll create this basic renderer
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type BlogPageProps = {
  params: {
    slug: string;
  };
};

// Optional: Generate static paths at build time
// export async function generateStaticParams() {
//   const pages = await fetchPages(); // Assuming fetchPages gets all slugs
//   return pages.map((page: any) => ({
//     slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
//   }));
// }

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const page = await fetchBySlug(slug);

  if (!page) {
    notFound(); // Trigger 404 if page not found
  }

  const blocks = await fetchPageBlocks(page.id);

  // Extract metadata (similar to index page, adjust as needed)
  const pageProps = page.properties as any; // Use 'as any' for simplicity here, or define a stricter type
  const title = pageProps.Title?.title[0]?.plain_text || 'Untitled Post';
  const dateStr = pageProps.Created?.created_time || new Date().toISOString();
  const formattedDate = format(new Date(dateStr), 'MMMM d, yyyy');
  const readingTime = `${pageProps.ReadingTime?.number || 5} min read`;
  const tags = pageProps.Tags?.multi_select?.map((tag: any) => tag.name) || [];
  const author = pageProps.Author?.select?.name || 'Ugo Charles';

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
        <div className="text-muted-foreground text-sm mb-4">
          <span>{formattedDate}</span> · <span>{readingTime}</span> · <span>By {author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </header>

      {/* Render Notion Blocks */}
      <NotionRenderer blocks={blocks} />

    </article>
  );
}

// Optional: Add revalidation
// export const revalidate = 60; 