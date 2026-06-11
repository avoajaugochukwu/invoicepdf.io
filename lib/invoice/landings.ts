// Config for the SEO template landing pages. Each entry drives one route via the
// shared <TemplateLanding> component. Keep copy US-English and intent-matched.
import { TemplateId } from './types';

export interface FAQ {
  q: string;
  a: string;
}

export interface Landing {
  slug: string;
  styleId: TemplateId;
  /** H1 / primary keyword. */
  keyword: string;
  platform: string;
  metaTitle: string;
  metaDescription: string;
  downloadFile: string; // path under /public
  downloadLabel: string;
  intro: string[];
  included: string[];
  steps: { title: string; body: string }[];
  faqs: FAQ[];
  /** Related blog slugs for internal linking. */
  related: string[];
}

const COMMON_INCLUDED = [
  'Business and client details, invoice number, and dates',
  'An itemized table with quantity, rate, and line totals',
  'Automatic subtotal, tax, and grand total',
  'A notes section for payment terms or a thank-you',
  'Clean, print-ready formatting that fits a single page',
];

export const LANDINGS: Landing[] = [
  {
    slug: 'invoice-template-google-docs',
    styleId: 'google-docs',
    keyword: 'Invoice Template for Google Docs',
    platform: 'Google Docs',
    metaTitle: 'Free Invoice Template for Google Docs (Download or Edit Online)',
    metaDescription:
      'Grab a free, professional invoice template for Google Docs. Download the PDF, or customize it online and export a print-ready invoice in seconds — no signup.',
    downloadFile: '/templates/invoice-template-google-docs.pdf',
    downloadLabel: 'Download PDF template',
    intro: [
      'A clean, simple invoice template you can use with Google Docs to bill clients and get paid faster. It includes everything a professional invoice needs — your details, the client’s details, an itemized list, and automatic totals — in a layout that prints perfectly to one page.',
      'Want it filled out instantly? Use the free online generator below: type your details, watch the live preview update, and download a polished PDF. No Google account or signup required.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Customize the template', body: 'Open the free generator, pick the Simple style, and enter your business, client, and line items. The preview updates as you type.' },
      { title: 'Add tax and notes', body: 'Set your tax rate and add payment terms or a thank-you note. Totals are calculated automatically.' },
      { title: 'Download your PDF', body: 'Click “Download PDF” to save a print-ready invoice. Email it to your client or attach it to Google Drive.' },
    ],
    faqs: [
      { q: 'Is this invoice template really free?', a: 'Yes. You can download the PDF template and use the online invoice generator for free, with no signup and no watermark.' },
      { q: 'Can I edit the invoice in Google Docs?', a: 'You can download the PDF and import it into Google Drive, or use our online generator to customize every field and export a finished PDF — usually faster than formatting a doc by hand.' },
      { q: 'How do I add my logo?', a: 'The fastest path is to customize the invoice in the generator and add your business name and details; a logo upload option is on the roadmap.' },
      { q: 'What should an invoice include?', a: 'A professional invoice includes your business and contact details, the client’s details, a unique invoice number, issue and due dates, an itemized list of work, subtotal, tax, and the total due.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'invoice-template-word',
    styleId: 'word',
    keyword: 'Invoice Template for Word',
    platform: 'Microsoft Word',
    metaTitle: 'Free Invoice Template for Word — Download or Customize Online',
    metaDescription:
      'A free, professional invoice template for Microsoft Word. Download the print-ready PDF, or fill it in online and export your invoice instantly. No signup, no watermark.',
    downloadFile: '/templates/invoice-template-word.pdf',
    downloadLabel: 'Download PDF template',
    intro: [
      'A classic, professional invoice template designed for Word users who want a no-fuss way to bill clients. It’s structured exactly like a standard business invoice, so it looks credible and gets you paid on time.',
      'Skip the manual formatting: enter your details in the free generator below and download a finished, print-ready PDF in seconds.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Open the generator', body: 'Select the Classic style and enter your business and client information.' },
      { title: 'List your work', body: 'Add each item with a quantity and rate. Subtotal, tax, and total update automatically.' },
      { title: 'Export to PDF', body: 'Download a clean PDF that opens anywhere — no Word version conflicts or broken layouts.' },
    ],
    faqs: [
      { q: 'Can I open this template in Microsoft Word?', a: 'The template downloads as a print-ready PDF. To edit fields, use the free online generator and export a finished invoice — it avoids the formatting headaches of Word tables.' },
      { q: 'Is it free with no watermark?', a: 'Yes. Both the downloadable template and the online generator are free, with no signup and no watermark on your invoice.' },
      { q: 'Will the invoice print on one page?', a: 'Yes. The layout is designed to fit a standard page so it prints and emails cleanly.' },
      { q: 'How do I number my invoices?', a: 'Use a simple sequential format like INV-0001, INV-0002. See our guide on invoice numbers for best practices.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'invoice-template-canva',
    styleId: 'canva',
    keyword: 'Invoice Template for Canva',
    platform: 'Canva',
    metaTitle: 'Free Invoice Template (Canva-Style) — Customize & Download',
    metaDescription:
      'A modern, designer-style invoice template for Canva fans. Customize it online for free and download a print-ready PDF in seconds — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-canva.pdf',
    downloadLabel: 'Download PDF template',
    intro: [
      'A modern, design-forward invoice template for freelancers and creatives who like the polished look of Canva. It keeps the styling clean and professional while still covering every detail a client expects.',
      'Customize it online for free — pick the Modern style, fill in your details, and download a beautiful PDF without wrestling with a design editor.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Choose the Modern style', body: 'Open the generator and select the Modern (Canva-style) accent. Enter your business and client details.' },
      { title: 'Add your items', body: 'List your services with rates. The template totals everything for you, including tax.' },
      { title: 'Download and send', body: 'Export a crisp PDF and send it to your client — it looks designed, without the design work.' },
    ],
    faqs: [
      { q: 'Do I need a Canva account?', a: 'No. You can customize and download this invoice entirely for free here — no Canva account, signup, or watermark needed.' },
      { q: 'Can I match my brand colors?', a: 'You can choose from several accent styles. More color customization is on the roadmap; for now the Modern style gives a clean, branded look.' },
      { q: 'Is the PDF high quality for printing?', a: 'Yes. The PDF is vector-based, so text stays sharp whether you print it or send it digitally.' },
      { q: 'Is this good for freelancers?', a: 'Absolutely — it’s built for freelancers and small businesses who want a professional invoice fast.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice'],
  },
  {
    slug: 'microsoft-invoice-template',
    styleId: 'microsoft',
    keyword: 'Microsoft Invoice Template',
    platform: 'Microsoft Office',
    metaTitle: 'Free Microsoft Invoice Template — Professional & Print-Ready',
    metaDescription:
      'A free, professional Microsoft-style invoice template. Download the print-ready PDF or customize it online and export in seconds. No signup, no watermark.',
    downloadFile: '/templates/invoice-template-microsoft.pdf',
    downloadLabel: 'Download PDF template',
    intro: [
      'A professional, Office-style invoice template for anyone who bills with Microsoft tools. It has the familiar, trustworthy structure of a business invoice and prints perfectly to a single page.',
      'Prefer not to fight with templates and tables? Use the free generator below to fill everything in and download a finished PDF instantly.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Enter your details', body: 'Open the generator, choose the Professional style, and add your business and client info.' },
      { title: 'Itemize the work', body: 'Add line items with quantity and rate; the template handles subtotal, tax, and total.' },
      { title: 'Download the PDF', body: 'Export a clean, professional invoice ready to email or print.' },
    ],
    faqs: [
      { q: 'Does this work with Excel or Word?', a: 'The template is a print-ready PDF. To edit the contents, use the free online generator — it’s faster than reformatting an Excel or Word template and exports a polished PDF.' },
      { q: 'Is it free?', a: 'Yes, completely free with no signup and no watermark.' },
      { q: 'Can I use it for my small business?', a: 'Yes. It’s designed for freelancers, contractors, and small businesses that need professional invoices quickly.' },
      { q: 'What’s the difference between an invoice and a receipt?', a: 'An invoice requests payment before it’s made; a receipt confirms payment was received. You can create both here.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-does-invoice-mean'],
  },
  {
    slug: 'receipt-template',
    styleId: 'receipt',
    keyword: 'Free Receipt Template',
    platform: 'any device',
    metaTitle: 'Free Receipt Template — Create & Download a Receipt (PDF)',
    metaDescription:
      'Create a free receipt online and download it as a PDF. Simple, professional receipt template for payments received — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional receipt template to confirm payments you’ve received. Give customers a clear record with your details, what they paid for, and the total — all on a clean, single-page layout.',
      'Fill it in online for free and download a print-ready PDF in seconds. No signup, no watermark.',
    ],
    included: [
      'Your business details and the customer’s name',
      'A receipt number and the date paid',
      'An itemized list of what was purchased',
      'Subtotal, tax, and total paid',
      'A notes line for a thank-you or terms',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Add the items paid for', body: 'List each item with quantity and price; totals calculate automatically.' },
      { title: 'Download and share', body: 'Export a PDF receipt to email or hand to your customer.' },
    ],
    faqs: [
      { q: 'What is the difference between a receipt and an invoice?', a: 'An invoice asks for payment; a receipt proves payment was made. Use a receipt after the customer has paid.' },
      { q: 'Is this receipt template free?', a: 'Yes — create and download receipts for free, with no signup or watermark.' },
      { q: 'Can I use it as a rent or cash receipt?', a: 'Yes. Edit the items and notes to fit rent, cash payments, or any sale.' },
      { q: 'Does it calculate tax?', a: 'Yes, set a tax rate and the total updates automatically.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-get-invoice-from-amazon'],
  },
  {
    slug: 'blank-invoice-template',
    styleId: 'blank',
    keyword: 'Blank Invoice Template',
    platform: 'any device',
    metaTitle: 'Free Blank Invoice Template — Fillable PDF Download',
    metaDescription:
      'Download a free blank invoice template or fill one in online and export a PDF. Simple, professional, and print-ready — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-blank.pdf',
    downloadLabel: 'Download blank PDF',
    intro: [
      'A clean, minimal blank invoice template you can fill in for any client or project. It has all the standard fields — your details, the client’s, an itemized table, and automatic totals — with nothing you don’t need.',
      'Download the blank PDF to print and fill by hand, or use the free generator below to complete it online and export a finished invoice instantly.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Start blank', body: 'Open the generator with the Minimal style and clear the sample text, or download the blank PDF to print.' },
      { title: 'Fill in your details', body: 'Add your business, the client, and each line item with quantity and rate.' },
      { title: 'Download the PDF', body: 'Export a professional, print-ready invoice — free and without a watermark.' },
    ],
    faqs: [
      { q: 'Can I print the blank invoice and fill it by hand?', a: 'Yes. Download the blank PDF and print it, or fill it in online first and then print a completed copy.' },
      { q: 'Is it really free?', a: 'Yes — the blank template and the online generator are free, with no signup and no watermark.' },
      { q: 'What format is the download?', a: 'It’s a print-ready PDF that opens on any device.' },
      { q: 'How do I make an invoice from scratch?', a: 'Use the generator to enter your details step by step, or read our beginner’s guide to writing an invoice.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-beginner-guide'],
  },
];

export function getLanding(slug: string): Landing | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}
