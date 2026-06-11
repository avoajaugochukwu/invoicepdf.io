import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { baseUrl } from './metadata';

// Define static routes directly
const staticRoutes = [
  '/',
  '/blog',
  '/privacy-policy', // Added based on Footer
  '/terms-of-service', // Added based on Footer
];

export default function sitemap(): MetadataRoute.Sitemap {
  const formattedDate = new Date().toISOString();

  // Get all blog posts
  const posts = getAllPosts()
  const blogUrls = posts.map((post) => ({
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

  // Combine static and dynamic URLs
  return [...routeUrls, ...blogUrls];
}
