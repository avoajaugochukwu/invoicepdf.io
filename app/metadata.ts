import { Metadata } from "next";
import { LANDINGS } from "@/lib/invoice/landings";

export const baseUrl = 'https://invoicepdf.io';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | InvoicePDF.io',
    default: 'InvoicePDF.io - Create and Share Invoices Instantly',
  },
  description: 'Create, customize, and share professional invoices in seconds. Perfect for businesses, freelancers, and professionals looking to streamline their invoice process.',
  // Per-page canonicals are set on each route (see app/page.tsx, app/blog/page.tsx,
  // app/blog/[slug]/page.tsx). A site-wide canonical here would force every page to
  // canonicalize to the homepage and get them dropped from the index.
  openGraph: {
    title: "InvoicePDF.io - Generate Professional Invoices Instantly",
    description: "Streamline your invoice process with our easy-to-use tool. Create, customize, and share professional invoices in seconds—perfect for businesses, freelancers, and professionals.",
    url: baseUrl,
    siteName: "InvoicePDF.io",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoicePDF.io - Generate Professional Invoices Instantly",
    description: "Streamline your invoice process with our easy-to-use tool. Create, customize, and share professional invoices in seconds—perfect for businesses, freelancers, and professionals.",
  },
  robots: {
    index: true, // Allow indexing
    follow: true, // Allow following links
  },
  verification: {
    google: "63EE4WX9NK",
  },
  // The OG/Twitter image is generated dynamically by app/opengraph-image.tsx.
  // The favicon is served automatically by Next.js from app/favicon.ico.
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'InvoicePDF.io',
  description: 'Create, customize, and share professional invoices in seconds.',
  url: baseUrl,
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: `${baseUrl}/blog?q={search_term_string}`
  //   },
  //   'query-input': 'required name=search_term_string'
  // },
  publisher: {
    '@type': 'Organization',
    name: 'InvoicePDF.io',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo`,
      width: 512,
      height: 512
    }
  }
};

// Primary navigation surfaced as structured data so search engines can discover the
// tool + template pages (mirrors the header/footer links).
const navItems: { name: string; path: string }[] = [
  { name: 'Invoice Generator', path: '/invoice-generator' },
  { name: 'Blog', path: '/blog' },
  ...LANDINGS.map((l) => ({ name: l.keyword, path: `/${l.slug}` })),
];

export const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'InvoicePDF.io — tools & templates',
  itemListElement: navItems.map((item, i) => ({
    '@type': 'SiteNavigationElement',
    position: i + 1,
    name: item.name,
    url: `${baseUrl}${item.path}`,
  })),
};