import Link from 'next/link';
import { Download, FileText, FileSpreadsheet, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvoicePreview } from './InvoicePreview';
import { baseUrl } from '@/app/metadata';
import { getTemplateStyle, sampleInvoice } from '@/lib/invoice/types';
import { Landing } from '@/lib/invoice/landings';
import { getPostBySlug } from '@/lib/blog';

export function TemplateLanding({ landing }: { landing: Landing }) {
  const style = getTemplateStyle(landing.styleId);
  const sample = sampleInvoice(style.docType);
  const generatorHref = `/invoice-generator?style=${landing.styleId}`;

  const related = landing.related
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? { slug, title: post.title } : null;
    })
    .filter((x): x is { slug: string; title: string } => x !== null);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {landing.keyword}
          </h1>
          <div className="space-y-3 text-muted-foreground md:text-lg">
            {landing.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={generatorHref}>
                Customize online <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {landing.xlsxFile && (
              <Button asChild variant="outline" size="lg">
                <a href={landing.xlsxFile} download>
                  <FileSpreadsheet className="h-4 w-4" /> Download blank Excel
                </a>
              </Button>
            )}
            {landing.docxFile && (
              <Button asChild variant="outline" size="lg">
                <a href={landing.docxFile} download>
                  <FileText className="h-4 w-4" /> Download blank Word
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
              <a href={landing.downloadFile} download>
                <Download className="h-4 w-4" /> Download blank PDF
              </a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Customize online, or grab a blank template · Editable Word &amp; PDF · No signup · No watermark</p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4 md:p-6">
          <InvoicePreview data={sample} style={style} />
        </div>
      </div>

      {/* What's included */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-5">What’s included in this {landing.platform} invoice template</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {landing.included.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to use */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-5">How to create your invoice</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {landing.steps.map((step, i) => (
            <li key={i} className="rounded-lg border border-border p-5">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Button asChild>
            <Link href={generatorHref}>
              Open the free generator <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold mb-5">Frequently asked questions</h2>
        <div className="divide-y divide-border">
          {landing.faqs.map((f) => (
            <div key={f.q} className="py-4">
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related reading */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-5">Related guides</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="text-primary hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Closing CTA */}
      <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Create your invoice in under a minute</h2>
        <p className="text-muted-foreground mb-5">Free, professional, and ready to send. No signup required.</p>
        <Button asChild size="lg">
          <Link href={generatorHref}>
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

/** Shared metadata builder for landing routes. */
export function landingMetadata(landing: Landing) {
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${landing.slug}`,
      languages: {
        'en-US': `${baseUrl}/${landing.slug}`,
        'x-default': `${baseUrl}/${landing.slug}`,
      },
    },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      type: 'website' as const,
      url: `${baseUrl}/${landing.slug}`,
    },
    robots: { index: true, follow: true },
  };
}
