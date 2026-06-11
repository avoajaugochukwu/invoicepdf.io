import 'server-only';
import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTimeOf from 'reading-time';
import { format } from 'date-fns';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  description: string;
  author: string;
  featuredImage: string;
  readingTime?: number;
  tags: string[];
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  formattedDate: string;
  readingTime: string;
  tags: string[];
  author: string;
  featuredImageUrl: string;
};

export type Post = PostMeta & {
  content: string;
};

function parseFile(fileName: string): Post {
  const slugFromFile = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;

  const date = fm.date || new Date(0).toISOString();
  const readingMinutes = fm.readingTime ?? Math.max(1, Math.round(readingTimeOf(content).minutes));

  return {
    slug: fm.slug || slugFromFile,
    title: fm.title || 'Untitled Post',
    excerpt: fm.excerpt || '',
    description: fm.description || fm.excerpt || '',
    date,
    formattedDate: format(new Date(date), 'MMMM d, yyyy'),
    readingTime: `${readingMinutes} min read`,
    tags: fm.tags || [],
    author: fm.author || 'InvoicePDF Team',
    featuredImageUrl: fm.featuredImage || '/placeholder-image.jpg',
    content,
  };
}

/** All posts, newest first. Cached per render. */
export const getAllPosts = React.cache((): Post[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parseFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getPostBySlug = React.cache((slug: string): Post | undefined => {
  return getAllPosts().find((post) => post.slug === slug);
});
