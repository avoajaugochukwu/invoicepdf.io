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
  downloadFile: string; // path under /public (PDF)
  downloadLabel: string;
  docxFile?: string; // editable Word (.docx), opens in Word + Google Docs
  xlsxFile?: string; // editable Excel (.xlsx), opens in Excel + Google Sheets
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
  'Free editable Word (.docx) and PDF downloads — no watermark',
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
    docxFile: '/templates/invoice-template-google-docs.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A clean, simple invoice template you can use with Google Docs to bill clients and get paid faster. It includes everything a professional invoice needs — your details, the client’s details, an itemized list, and automatic totals — in a layout that prints perfectly to one page.',
      'Prefer to edit it yourself? Download the editable Word (.docx) file and open it directly in Google Docs (File → Open → Upload) or in Microsoft Word. Or use the free online generator below — type your details, watch the live preview update, and export a polished PDF or Word file. No Google account or signup required.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Customize the template', body: 'Open the free generator, pick the Simple style, and enter your business, client, and line items. The preview updates as you type.' },
      { title: 'Add tax and notes', body: 'Set your tax rate and add payment terms or a thank-you note. Totals are calculated automatically.' },
      { title: 'Download your PDF', body: 'Click “Download PDF” to save a print-ready invoice. Email it to your client or attach it to Google Drive.' },
    ],
    faqs: [
      { q: 'Is this invoice template really free?', a: 'Yes. You can download the PDF template and use the online invoice generator for free, with no signup and no watermark.' },
      { q: 'Can I edit the invoice in Google Docs?', a: 'Yes. Download the editable Word (.docx) version and open it in Google Docs via File → Open → Upload — it converts to a fully editable Google Doc. You can also customize every field in our online generator and export a finished PDF or Word file.' },
      { q: 'How do I add my logo?', a: 'Open the free generator and click "Upload logo" — your logo appears on the invoice preview and in the downloaded PDF and Word file.' },
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
    docxFile: '/templates/invoice-template-word.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A classic, professional invoice template designed for Word users who want a no-fuss way to bill clients. It’s structured exactly like a standard business invoice, so it looks credible and gets you paid on time.',
      'Prefer Word itself? Download the editable .docx template and fill it in. Or skip the formatting entirely — enter your details in the free generator below and export a finished PDF or Word file in seconds.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Open the generator', body: 'Select the Classic style and enter your business and client information.' },
      { title: 'List your work', body: 'Add each item with a quantity and rate. Subtotal, tax, and total update automatically.' },
      { title: 'Export to PDF', body: 'Download a clean PDF that opens anywhere — no Word version conflicts or broken layouts.' },
    ],
    faqs: [
      { q: 'Can I open this template in Microsoft Word?', a: 'Yes. Download the editable Word (.docx) version and open it directly in Microsoft Word to fill in your details. You can also use the free online generator and export a Word or PDF file.' },
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
    docxFile: '/templates/invoice-template-canva.docx',
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
    docxFile: '/templates/invoice-template-microsoft.docx',
    xlsxFile: '/templates/invoice-template-microsoft.xlsx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A professional, Office-style invoice template for anyone who bills with Microsoft tools. It has the familiar, trustworthy structure of a business invoice and prints perfectly to a single page.',
      'Download the editable Word (.docx) template to fill in with Microsoft Word, or use the free generator below to fill everything in and export a finished PDF or Word file instantly.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Enter your details', body: 'Open the generator, choose the Professional style, and add your business and client info.' },
      { title: 'Itemize the work', body: 'Add line items with quantity and rate; the template handles subtotal, tax, and total.' },
      { title: 'Download the PDF', body: 'Export a clean, professional invoice ready to email or print.' },
    ],
    faqs: [
      { q: 'Does this work with Excel or Word?', a: 'Yes — download the editable Word (.docx) version and open it in Microsoft Word. You can also customize it in the online generator and export a Word or PDF file. (A native Excel/Sheets version isn’t available yet.)' },
      { q: 'Is it free?', a: 'Yes, completely free with no signup and no watermark.' },
      { q: 'Can I use it for my small business?', a: 'Yes. It’s designed for freelancers, contractors, and small businesses that need professional invoices quickly.' },
      { q: 'What’s the difference between an invoice and a receipt?', a: 'An invoice requests payment before it’s made; a receipt confirms payment was received. You can create both here.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-does-invoice-mean'],
  },
  {
    slug: 'invoice-template-excel',
    styleId: 'excel',
    keyword: 'Invoice Template for Excel',
    platform: 'Microsoft Excel',
    metaTitle: 'Free Invoice Template for Excel (.xlsx) — Download or Edit Online',
    metaDescription:
      'A free invoice template for Excel with built-in formulas that total automatically. Download the .xlsx, or customize it online and export — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-excel.pdf',
    downloadLabel: 'Download PDF',
    docxFile: '/templates/invoice-template-excel.docx',
    xlsxFile: '/templates/invoice-template-excel.xlsx',
    intro: [
      'A clean, professional invoice template for Microsoft Excel. The spreadsheet has built-in formulas, so line totals, subtotal, tax, and the grand total calculate themselves as you type — no math, no broken cells.',
      'Download the editable .xlsx to fill in offline, or use the free online generator below to enter your details and export a finished invoice in Excel, Word, or PDF.',
    ],
    included: [
      'Built-in formulas that total quantity × rate, subtotal, tax, and grand total automatically',
      'Business and client details, invoice number, and dates',
      'A notes section for payment terms or a thank-you',
      'Clean, print-ready formatting that fits a single page',
      'Free editable Excel (.xlsx), Word, and PDF downloads — no watermark',
    ],
    steps: [
      { title: 'Open the generator', body: 'Select the Spreadsheet style and enter your business, client, and line items. The preview updates as you type.' },
      { title: 'Let the formulas total it', body: 'In the .xlsx, quantities and rates multiply and sum automatically — just edit the numbers.' },
      { title: 'Download your file', body: 'Export the editable Excel file (or PDF/Word) — free, no signup, no watermark.' },
    ],
    faqs: [
      { q: 'Does the Excel invoice template calculate totals automatically?', a: 'Yes. The .xlsx includes formulas that multiply quantity by rate for each line, then total the subtotal, tax, and grand total for you.' },
      { q: 'Is this Excel invoice template free?', a: 'Yes — download the .xlsx and use the online generator for free, with no signup and no watermark.' },
      { q: 'Can I open it in Google Sheets or Numbers?', a: 'Yes. The .xlsx opens in Microsoft Excel, Google Sheets, and Apple Numbers, with the formulas intact.' },
      { q: 'How do I add tax?', a: 'Set your tax rate in the generator (or edit the tax cell in the spreadsheet) and the total updates automatically.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'invoice-template-google-sheets',
    styleId: 'excel',
    keyword: 'Invoice Template for Google Sheets',
    platform: 'Google Sheets',
    metaTitle: 'Free Google Sheets Invoice Template — Download & Customize',
    metaDescription:
      'A free invoice template for Google Sheets with automatic totals. Open the .xlsx in Sheets, or customize online and export — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-excel.pdf',
    downloadLabel: 'Download PDF',
    docxFile: '/templates/invoice-template-excel.docx',
    xlsxFile: '/templates/invoice-template-excel.xlsx',
    intro: [
      'A simple, professional invoice template you can use in Google Sheets. It has built-in formulas, so your line totals, subtotal, tax, and total update automatically as you edit — perfect for billing from your browser.',
      'Download the spreadsheet file and open it in Google Sheets (File → Import, or just open it from Drive), or use the free online generator below to fill it in and export instantly.',
    ],
    included: [
      'Automatic totals via built-in spreadsheet formulas',
      'Business and client details, invoice number, and dates',
      'A notes section for payment terms',
      'Opens in Google Sheets, Excel, and Numbers',
      'Free — no signup, no watermark',
    ],
    steps: [
      { title: 'Get the template', body: 'Download the spreadsheet file below, or build one in the online generator with the Spreadsheet style.' },
      { title: 'Open it in Google Sheets', body: 'Upload the file to Google Drive and open it — the formulas keep working in Sheets.' },
      { title: 'Customize and share', body: 'Fill in your details and download or share. Free, no watermark.' },
    ],
    faqs: [
      { q: 'How do I open this template in Google Sheets?', a: 'Download the spreadsheet file, then in Google Drive choose New → File upload (or File → Import in Sheets) and open it. The totals formulas carry over.' },
      { q: 'Does it calculate totals automatically in Google Sheets?', a: 'Yes. The built-in formulas multiply quantity by rate and sum the subtotal, tax, and total — they work the same in Google Sheets and Excel.' },
      { q: 'Is the Google Sheets invoice template free?', a: 'Yes — free to download and customize, with no signup and no watermark.' },
      { q: 'Can I also get a PDF?', a: 'Yes. Use the online generator to export a print-ready PDF, or download the PDF version directly.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice'],
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
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional receipt template to confirm payments you’ve received. Give customers a clear record with your details, what they paid for, and the total — all on a clean, single-page layout.',
      'Fill it in online for free and download a print-ready PDF or an editable Word (.docx) file in seconds. No signup, no watermark.',
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
    docxFile: '/templates/invoice-template-blank.docx',
    downloadLabel: 'Download blank PDF',
    intro: [
      'A clean, minimal blank invoice template you can fill in for any client or project. It has all the standard fields — your details, the client’s, an itemized table, and automatic totals — with nothing you don’t need.',
      'Download the blank PDF to print and fill by hand, grab the editable Word (.docx) version to type into Word or Google Docs, or use the free generator below to complete it online and export a finished invoice instantly.',
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
      { q: 'What format is the download?', a: 'You can download a print-ready PDF or an editable Word (.docx) file that opens in Microsoft Word and Google Docs.' },
      { q: 'How do I make an invoice from scratch?', a: 'Use the generator to enter your details step by step, or read our beginner’s guide to writing an invoice.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-beginner-guide'],
  },
];

export function getLanding(slug: string): Landing | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}
