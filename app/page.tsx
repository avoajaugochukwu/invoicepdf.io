import { getAllPosts } from "@/lib/blog";
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Check, FileText, FileSpreadsheet, FileDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/BlogPostCard";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { sampleInvoice, getTemplateStyle } from "@/lib/invoice/types";
import { LANDINGS } from "@/lib/invoice/landings";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const FEATURES = [
  'Free, no signup',
  'PDF, Word & Excel',
  'Add your logo',
  'No watermark',
];

export default function Home() {
  const posts = getAllPosts();
  const sample = sampleInvoice('invoice');
  const heroStyle = getTemplateStyle('google-docs');

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                <span className="bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
                  Create professional invoices in minutes — free
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Fill in your details, see a live preview, and download a print-ready invoice as
                PDF, Word, or Excel. No signup, no watermark — built for freelancers and small businesses.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/invoice-generator">
                    Create an invoice <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/invoice-template-google-docs">Browse templates</Link>
                </Button>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-muted/40 p-4 md:p-6 shadow-sm">
              <InvoicePreview data={sample} style={heroStyle} />
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Free invoice &amp; receipt templates</h2>
          <p className="text-muted-foreground">
            Pick a format, customize it online, and download — or grab a blank template.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDINGS.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group rounded-lg border border-border p-5 transition-colors hover:bg-accent"
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                {t.xlsxFile ? <FileSpreadsheet className="h-4 w-4" /> : t.docxFile ? <FileText className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
                <span>{[t.xlsxFile && 'Excel', t.docxFile && 'Word', 'PDF'].filter(Boolean).join(' · ')}</span>
              </div>
              <h3 className="font-semibold group-hover:underline">{t.keyword}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/invoice-generator">
              Open the free generator <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Blog */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12">
          Latest Insights &amp; Tips
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.slice(0, 6).map((post) => (
              <BlogPostCard key={post.slug} post={{ ...post, id: post.slug }} />
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
