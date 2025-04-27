import { Metadata } from "next";

export const baseUrl = 'https://invoicepdf.io';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | InvoicePDF.io',
    default: 'InvoicePDF.io - Create and Share Invoices Instantly',
  },
  description: 'Create, customize, and share professional invoices in seconds. Perfect for businesses, freelancers, and professionals looking to streamline their invoice process.',
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
      'x-default': baseUrl
    },
  },
  openGraph: {
    title: "InvoicePDF.io - Generate Professional Invoices Instantly",
    description: "Streamline your invoice process with our easy-to-use tool. Create, customize, and share professional invoices in seconds—perfect for businesses, freelancers, and professionals.",
    url: "https://invoicepdf.io",
    siteName: "InvoicePDF.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoicePDF.io - Generate Professional Invoices Instantly",
    description: "Streamline your invoice process with our easy-to-use tool. Create, customize, and share professional invoices in seconds—perfect for businesses, freelancers, and professionals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, // Allow indexing
    follow: true, // Allow following links
  },
  verification: {
    google: "google-site-verification: 63EE4WX9NK",
  },
  icons: {
    icon: "favicon_io/favicon.ico",
    apple: "favicon_io/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "favicon_io/favicon.ico",
    },
    shortcut: "favicon_io/favicon.ico",
  }
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
      url: `${baseUrl}/logo.png`
    }
  }
};