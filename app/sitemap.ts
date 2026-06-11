import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { LANDINGS } from '@/lib/invoice/landings'
import { baseUrl } from './metadata';

// Only indexable routes belong in the sitemap. /privacy-policy and /terms-of-service
// are intentionally noindex placeholders, so they are excluded.
const staticRoutes = [
  '/',
  '/blog',
];

// Tool + template landing pages — high-intent, high-priority for crawling.
const toolRoutes = [
  '/invoice-generator',
  ...LANDINGS.map((l) => `/${l.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const formattedDate = new Date().toISOString();

  // Get all blog posts, de-duplicated by slug to avoid duplicate sitemap entries.
  const seen = new Set<string>();
  const blogUrls = getAllPosts()
    .filter((post) => {
      if (seen.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    })
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Generate URLs for static routes
  const routeUrls = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: formattedDate, // Use a fixed date for static pages or fetch specific dates if needed
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.8, // Give homepage highest priority
  }));

  // Tool/template landing pages
  const toolUrls = toolRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: formattedDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Combine static and dynamic URLs
  return [...routeUrls, ...toolUrls, ...blogUrls];
}
