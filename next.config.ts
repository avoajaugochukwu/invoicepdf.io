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
  // Cluster D — automation/reconciliation near-synonym cannibalization -> keeper
  ["/blog/billing-automation-software", "/blog/invoice-automation-software"],
  ["/blog/recurring-invoice-software", "/blog/recurring-billing-software"],
  ["/blog/billing-reconciliation", "/blog/payment-reconciliation"],
];

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days — let legit optimized images cache hard
    qualities: [75], // reject ?q= probing; only q=75 is allowed
    localPatterns: [{ pathname: "/**" }], // only same-origin local paths are optimizable
    remotePatterns: [], // no remote image optimization
    formats: ["image/webp"],
  },
  async redirects() {
    return BLOG_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 301
    }));
  },
};

export default nextConfig;
