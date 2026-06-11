import type { NextConfig } from "next";

// Phase 1 SEO de-cannibalization: 301 the merged "loser" posts to their keeper.
// Add entries here as each cluster is consolidated. [from, to]
const BLOG_REDIRECTS: [string, string][] = [
  // Cluster A — how to write / make / create an invoice -> keeper
  ["/blog/how-to-write-an-invoice-beginners-guide", "/blog/how-to-write-an-invoice-for-beginners"],
  ["/blog/how-to-make-an-invoice-for-beginners", "/blog/how-to-write-an-invoice-for-beginners"],
  ["/blog/how-to-create-an-invoice", "/blog/how-to-write-an-invoice-for-beginners"],
  // Cluster B — duplicate "what is an invoice" -> keeper
  ["/blog/what-is-an-invoice-guide-for-beginners", "/blog/what-is-an-invoice-beginner-guide"],
  // Cluster C — duplicate proforma invoice -> keeper
  ["/blog/understanding-pro-forma-invoices-what-they-are-and-how-to-use-them", "/blog/what-is-a-proforma-invoice"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return BLOG_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 301
    }));
  },
};

export default nextConfig;
