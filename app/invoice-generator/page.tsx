import { Metadata } from 'next';
import { InvoiceGenerator } from '@/components/invoice/InvoiceGenerator';
import { baseUrl } from '@/app/metadata';

const title = 'Free Invoice Generator — Create & Download Invoices as PDF';
const description =
  'Create a professional invoice online for free. Fill in your details, see a live preview, and download a print-ready PDF in seconds. No signup, no watermark.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${baseUrl}/invoice-generator`,
    languages: {
      'en-US': `${baseUrl}/invoice-generator`,
      'x-default': `${baseUrl}/invoice-generator`,
    },
  },
  openGraph: { title, description, type: 'website', url: `${baseUrl}/invoice-generator` },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'InvoicePDF.io Invoice Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${baseUrl}/invoice-generator`,
  description,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default async function InvoiceGeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string }>;
}) {
  const { style } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Free Invoice Generator</h1>
        <p className="text-muted-foreground md:text-lg">
          Fill in the details, watch the live preview update, and download a clean, print-ready PDF —
          free, no signup, no watermark.
        </p>
      </header>
      <InvoiceGenerator initialStyleId={style} />
    </div>
  );
}
