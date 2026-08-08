import Link from 'next/link';
import { groupLandings } from '@/lib/invoice/landings';

const GUIDES: { href: string; label: string }[] = [
  { href: '/blog/what-is-an-invoice-beginner-guide', label: 'What is an invoice?' },
  { href: '/blog/how-to-write-an-invoice-for-beginners', label: 'How to write an invoice' },
  { href: '/blog/what-does-net-30-mean-on-an-invoice', label: 'What does Net 30 mean?' },
  { href: '/blog/invoice-vs-receipt', label: 'Invoice vs receipt' },
  { href: '/blog/what-is-a-proforma-invoice', label: 'Proforma invoice' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const templateGroups = groupLandings();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold">InvoicePDF</Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Free online invoice generator &amp; templates for freelancers and small businesses.
            </p>
            <Link href="/invoice-generator" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
              Create an invoice &rarr;
            </Link>
          </div>

          {/* Guides */}
          <div>
            <h2 className="mb-3 text-sm font-semibold">Guides</h2>
            <ul className="space-y-2 text-sm">
              {GUIDES.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-muted-foreground hover:text-foreground hover:underline">
                    {g.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground hover:underline">
                  All guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="mb-3 text-sm font-semibold">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground hover:underline">Blog</Link>
              </li>
              <li>
                <Link href="/privacy-policy" prefetch={false} className="text-muted-foreground hover:text-foreground hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" prefetch={false} className="text-muted-foreground hover:text-foreground hover:underline">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Templates & tools */}
        <div className="mt-12 border-t pt-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold">Templates &amp; tools</h2>
            <Link href="/invoice-generator" className="text-sm font-medium text-primary hover:underline">
              Invoice generator &rarr;
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {templateGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{group.title}</h3>
                <ul className="space-y-2 text-sm">
                  {group.items.map((l) => (
                    <li key={l.slug}>
                      <Link href={`/${l.slug}`} className="text-muted-foreground hover:text-foreground hover:underline">
                        {l.keyword}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          &copy; {currentYear} InvoicePDF. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
