import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { MdxContent } from '@/components/MdxContent';
import { Badge } from '@/components/ui/badge';
import { baseUrl } from '@/app/metadata';
import { Metadata } from 'next';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Generate metadata for the blog post
 * @param params - The parameters of the blog post
 * @returns The metadata for the blog post
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
      languages: {
        'en-US': `${baseUrl}/blog/${slug}`,
        'x-default': `${baseUrl}/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="text-muted-foreground text-sm mb-4">
          <span>{post.formattedDate}</span> · <span>{post.readingTime}</span> ·{' '}
          <span>By {post.author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <MdxContent source={post.content} />
    </article>
  );
}
