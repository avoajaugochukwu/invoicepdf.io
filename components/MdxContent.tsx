import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

// Competitor / affiliate domains whose outbound links should carry rel="nofollow"
// (don't pass ranking equity or imply endorsement). Neutral authorities and source
// citations are intentionally NOT listed — those stay followed as a trust signal.
// See .claude/blog-standards.md §5.
const NOFOLLOW_DOMAINS = [
  'freshbooks.com', 'quickbooks.intuit.com', 'intuit.com', 'waveapps.com', 'zoho.com',
  'xero.com', 'bill.com', 'squareup.com', 'stripe.com', 'hellobonsai.com', 'invoicehome.com',
  'honeybook.com', 'sage.com', 'sumup.com', 'billdu.com', 'canva.com', 'paypal.com', 'venmo.com',
];

function relFor(href?: string): string | undefined {
  if (!href?.startsWith('http')) return undefined;
  let nofollow = false;
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    nofollow = NOFOLLOW_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    // malformed URL — treat as plain external link
  }
  return nofollow ? 'noopener noreferrer nofollow' : 'noopener noreferrer';
}

// Custom element styling for rendered MDX blog content.
const components = {
  // The post title is the page's single <h1>; render in-body "#" headings as <h2>
  // so each article keeps exactly one <h1>.
  h1: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => <p className="my-4 leading-7" {...props} />,
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc ml-6 my-4 space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal ml-6 my-4 space-y-1" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className="leading-7" {...props} />,
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={relFor(props.href)}
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="bg-gray-800 dark:bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono my-4 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<'hr'>) => (
    <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
  ),
  table: (props: React.ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-left font-semibold bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="border border-gray-300 dark:border-gray-700 px-3 py-2" {...props} />
  ),
  img: (props: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="max-w-full h-auto rounded-md mx-auto my-6" alt={props.alt ?? ''} {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
