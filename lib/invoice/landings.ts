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

  // ── Industry-specific invoice templates ───────────────────────────────
  {
    slug: 'contractor-invoice-template',
    styleId: 'word',
    keyword: 'Contractor Invoice Template',
    platform: 'contractor',
    metaTitle: 'Free Contractor Invoice Template — Download or Edit Online',
    metaDescription:
      'A free, professional contractor invoice template for billing labor, materials, and jobs. Download the PDF or Word file, or customize it online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-word.pdf',
    docxFile: '/templates/invoice-template-word.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A clean, professional invoice template built for contractors and tradespeople who bill for labor, materials, and completed jobs. It has space for your license or business details, an itemized breakdown of work and materials, and automatic totals — so clients see exactly what they’re paying for and pay on time.',
      'Download the editable Word (.docx) or print-ready PDF to fill in yourself, or use the free generator below to enter your details and export a finished invoice in seconds. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Add your business details', body: 'Open the generator, choose the Classic style, and enter your business name, contact info, and the client or job site.' },
      { title: 'Itemize labor and materials', body: 'List each line — hours of labor, materials, and any fees — with quantity and rate. Subtotal, tax, and total calculate automatically.' },
      { title: 'Download and send', body: 'Export a clean PDF or Word file and send it to your client. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this contractor invoice template free?', a: 'Yes. Download the PDF or Word template and use the online generator for free, with no signup and no watermark.' },
      { q: 'Can I bill for both labor and materials?', a: 'Yes. Add a separate line item for each — hours of labor, materials, equipment, or fees — each with its own quantity and rate. The template totals everything automatically.' },
      { q: 'Can I add my license number or business details?', a: 'Yes. Use the notes section or business details fields to include your license number, insurance, or payment terms.' },
      { q: 'How should I number contractor invoices?', a: 'Use a simple sequential format like INV-0001, INV-0002. See our guide on invoice numbers for best practices.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number', 'how-to-ask-for-payment'],
  },
  {
    slug: 'independent-contractor-invoice-template',
    styleId: 'microsoft',
    keyword: 'Independent Contractor Invoice Template',
    platform: 'independent contractor',
    metaTitle: 'Free Independent Contractor Invoice Template (PDF & Word)',
    metaDescription:
      'A free independent contractor invoice template for freelancers and 1099 workers. Download the PDF or Word file, or fill it in online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-microsoft.pdf',
    docxFile: '/templates/invoice-template-microsoft.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A professional invoice template made for independent contractors, freelancers, and 1099 workers who need to bill clients cleanly and get paid fast. It includes your details, the client’s details, an itemized list of services, and automatic totals — everything a client’s accounts-payable team expects to see.',
      'Download the editable Word (.docx) or PDF to fill in, or use the free generator below to create and export your invoice in under a minute. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Enter your details', body: 'Open the generator, choose the Professional style, and add your name or business and the client’s information.' },
      { title: 'List your services', body: 'Add each service or project milestone with a quantity and rate. Totals update as you type.' },
      { title: 'Export and send', body: 'Download a polished PDF or Word file and send it to your client — free and watermark-free.' },
    ],
    faqs: [
      { q: 'Is this independent contractor invoice template free?', a: 'Yes — download the template and use the online generator for free, with no signup and no watermark.' },
      { q: 'What should an independent contractor invoice include?', a: 'Your name or business and contact details, the client’s details, a unique invoice number, issue and due dates, an itemized list of services, the total due, and your accepted payment methods.' },
      { q: 'Do I need to include my tax ID?', a: 'It’s optional on the invoice itself. Many independent contractors provide a W-9 to the client separately rather than printing a Social Security or EIN number on every invoice. Consult a tax professional for your situation.' },
      { q: 'How do I get paid faster?', a: 'Set clear payment terms (for example, Net 15), number your invoices, and follow up politely if payment runs late. See our guide on how to ask for payment.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-ask-for-payment', 'what-does-net-30-mean-on-an-invoice'],
  },
  {
    slug: 'photography-invoice-template',
    styleId: 'canva',
    keyword: 'Photography Invoice Template',
    platform: 'photography',
    metaTitle: 'Free Photography Invoice Template — Modern & Customizable',
    metaDescription:
      'A free, modern photography invoice template for photographers and studios. Bill for sessions, prints, and licensing. Download or customize online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-canva.pdf',
    docxFile: '/templates/invoice-template-canva.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A modern, design-forward invoice template made for photographers, studios, and creatives. Bill clients for shoots, editing, prints, and image licensing with a polished layout that matches your brand — without wrestling with a design editor.',
      'Customize it online for free — pick the Modern style, add your sessions and packages, and download a beautiful PDF. Or grab the editable Word file to fill in yourself. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Choose the Modern style', body: 'Open the generator, select the Modern (designer) style, and add your studio and client details.' },
      { title: 'Add sessions and packages', body: 'List each line — session fees, editing hours, prints, or licensing — with quantity and rate. Totals calculate automatically.' },
      { title: 'Download and send', body: 'Export a crisp, branded PDF and send it to your client. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this photography invoice template free?', a: 'Yes — customize and download it for free, with no signup and no watermark.' },
      { q: 'Can I bill for licensing and usage rights?', a: 'Yes. Add a separate line item for image licensing or usage rights with its own rate, alongside session and editing fees.' },
      { q: 'Can I add a deposit or retainer?', a: 'Yes. Add the deposit as a line item, or note it in the terms section and bill the balance on a later invoice.' },
      { q: 'Will it look professional and on-brand?', a: 'Yes. The Modern style gives a clean, designed look, and the PDF is vector-based so it stays sharp in print or on screen.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice', 'what-is-an-invoice-number'],
  },
  {
    slug: 'mechanic-invoice-template',
    styleId: 'word',
    keyword: 'Mechanic Invoice Template',
    platform: 'auto repair',
    metaTitle: 'Free Mechanic Invoice Template — Auto Repair Billing (PDF & Word)',
    metaDescription:
      'A free mechanic invoice template for auto repair shops. Bill for parts, labor, and shop fees with automatic totals. Download or edit online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-word.pdf',
    docxFile: '/templates/invoice-template-word.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A practical invoice template for mechanics and auto repair shops that need to bill customers for parts, labor, and shop fees. It separates each line clearly — so customers can see the parts, the hours, and the totals — on a clean, single-page layout that prints and emails well.',
      'Download the editable Word (.docx) or print-ready PDF, or use the free generator below to fill it in and export an itemized repair invoice in seconds. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Add shop and customer details', body: 'Open the generator, choose the Classic style, and enter your shop name, the customer, and the vehicle.' },
      { title: 'List parts and labor', body: 'Add each part and each labor line with quantity and rate. Subtotal, tax, and total update automatically.' },
      { title: 'Download the invoice', body: 'Export a clean PDF or Word file to print at the counter or email to the customer. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this mechanic invoice template free?', a: 'Yes — download the template and use the generator for free, with no signup and no watermark.' },
      { q: 'Can I list parts and labor separately?', a: 'Yes. Add a line item for each part and each labor charge, with its own quantity and rate, so the bill is fully itemized.' },
      { q: 'Can I add the vehicle or VIN?', a: 'Yes. Use the notes or client details section to record the vehicle, mileage, or VIN for your records.' },
      { q: 'Does it calculate sales tax?', a: 'Yes. Set your tax rate and the total updates automatically. Whether you charge tax on parts and labor depends on your state — check your local rules.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number', 'invoice-vs-receipt'],
  },
  {
    slug: 'cleaning-invoice-template',
    styleId: 'google-docs',
    keyword: 'Cleaning Invoice Template',
    platform: 'cleaning service',
    metaTitle: 'Free Cleaning Invoice Template — House & Commercial (PDF & Word)',
    metaDescription:
      'A free cleaning invoice template for house cleaners and janitorial services. Bill per visit, room, or hour with automatic totals. Download or edit online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-google-docs.pdf',
    docxFile: '/templates/invoice-template-google-docs.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional invoice template for house cleaners, maid services, and commercial janitorial businesses. Bill per visit, per room, or per hour, add supplies, and let the template total everything — so recurring clients get a clear, consistent invoice every time.',
      'Download the editable Word (.docx) or PDF, or use the free generator below to fill it in and export a finished cleaning invoice in seconds. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Add your details', body: 'Open the generator, choose the Simple style, and enter your business and the client or property.' },
      { title: 'List the services', body: 'Add each line — standard clean, deep clean, extra rooms, or supplies — with quantity and rate. Totals update automatically.' },
      { title: 'Download and send', body: 'Export a clean PDF or Word file and send it to your client. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this cleaning invoice template free?', a: 'Yes — download the template and use the generator for free, with no signup and no watermark.' },
      { q: 'Can I use it for recurring weekly or monthly cleans?', a: 'Yes. Reuse the template each cycle, change the date and invoice number, and keep your line items the same for consistent billing.' },
      { q: 'Can I bill per hour or per visit?', a: 'Both. Set the quantity to hours and the rate to your hourly price, or use a single line per visit with a flat rate.' },
      { q: 'How do I number cleaning invoices?', a: 'Use a sequential format like INV-0001, INV-0002 so each invoice is unique and easy to track.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-ask-for-payment', 'what-is-an-invoice-number'],
  },
  {
    slug: 'handyman-invoice-template',
    styleId: 'word',
    keyword: 'Handyman Invoice Template',
    platform: 'handyman',
    metaTitle: 'Free Handyman Invoice Template — Download or Edit Online',
    metaDescription:
      'A free handyman invoice template for home repair and maintenance jobs. Bill for labor, materials, and call-out fees. Download or customize online — no signup, no watermark.',
    downloadFile: '/templates/invoice-template-word.pdf',
    docxFile: '/templates/invoice-template-word.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A straightforward invoice template for handymen and home repair pros who bill for labor, materials, and call-out fees. It itemizes each job clearly and totals everything for you, so customers know exactly what they owe and you get paid without back-and-forth.',
      'Download the editable Word (.docx) or print-ready PDF, or use the free generator below to fill it in and export a finished invoice in seconds. No signup, no watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Add your details', body: 'Open the generator, choose the Classic style, and enter your business and the customer.' },
      { title: 'Itemize the job', body: 'Add labor, materials, and any call-out fee as separate lines with quantity and rate. Totals calculate automatically.' },
      { title: 'Download and send', body: 'Export a clean PDF or Word file to print or email. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this handyman invoice template free?', a: 'Yes — download the template and use the generator for free, with no signup and no watermark.' },
      { q: 'Can I bill for materials and labor together?', a: 'Yes. Add a line for each — labor hours, materials, and a call-out fee — and the template totals them automatically.' },
      { q: 'Can I add a call-out or trip fee?', a: 'Yes. Add it as its own line item with a flat rate, separate from your labor charges.' },
      { q: 'What should a handyman invoice include?', a: 'Your business and contact details, the customer’s details, a unique invoice number, the date, an itemized list of labor and materials, the total due, and your payment terms.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number', 'how-to-ask-for-payment'],
  },

  // ── Receipt sub-types ─────────────────────────────────────────────────
  {
    slug: 'rent-receipt-template',
    styleId: 'receipt',
    keyword: 'Rent Receipt Template',
    platform: 'rent',
    metaTitle: 'Free Rent Receipt Template — Create & Download (PDF)',
    metaDescription:
      'Create a free rent receipt online and download it as a PDF. Simple rent receipt template for landlords confirming rent payments — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional rent receipt template for landlords and property managers to confirm rent payments. Give tenants a clear record of what they paid, for which period, and how — a paper trail that protects both sides and helps at tax time.',
      'Fill it in online for free and download a print-ready PDF or editable Word file in seconds. No signup, no watermark.',
    ],
    included: [
      'Landlord and tenant names',
      'The rental property address',
      'Receipt number and the date paid',
      'The rental period the payment covers',
      'Amount paid and payment method (cash, check, transfer)',
      'A notes line for balance due or terms',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Enter the rent details', body: 'Add the tenant, the property, the rental period, and the amount paid. Note the payment method in the notes line.' },
      { title: 'Download and share', body: 'Export a PDF rent receipt to email or hand to your tenant. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this rent receipt template free?', a: 'Yes — create and download rent receipts for free, with no signup and no watermark.' },
      { q: 'What should a rent receipt include?', a: 'The landlord and tenant names, the property address, the date paid, the rental period covered, the amount paid, the payment method, and a receipt number.' },
      { q: 'Do landlords have to give rent receipts?', a: 'It varies by state and local law — some jurisdictions require a receipt on request or for cash payments. Even where it’s not required, providing one is good practice. Check your local rules.' },
      { q: 'Can I use it for cash rent payments?', a: 'Yes. Rent receipts are especially important for cash payments, since they’re the tenant’s only proof of payment. Note “cash” as the payment method.' },
    ],
    related: ['invoice-vs-receipt', 'how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'payment-receipt-template',
    styleId: 'receipt',
    keyword: 'Payment Receipt Template',
    platform: 'payment',
    metaTitle: 'Free Payment Receipt Template — Create & Download (PDF)',
    metaDescription:
      'Create a free payment receipt online and download it as a PDF. Simple payment receipt template confirming money received — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional payment receipt template to confirm money you’ve received. Give your customer a clear record of what they paid for, how much, and when — closing the loop on the transaction and keeping your books clean.',
      'Fill it in online for free and download a print-ready PDF or editable Word file in seconds. No signup, no watermark.',
    ],
    included: [
      'Your business details and the payer’s name',
      'A receipt number and the date paid',
      'What the payment was for',
      'Amount paid and payment method',
      'Reference to the original invoice number (optional)',
      'A notes line for a thank-you or balance due',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Add the payment details', body: 'Enter who paid, what for, the amount, and the payment method. Reference the original invoice if there is one.' },
      { title: 'Download and share', body: 'Export a PDF receipt to email or hand to your customer. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this payment receipt template free?', a: 'Yes — create and download payment receipts for free, with no signup and no watermark.' },
      { q: 'What is the difference between a payment receipt and an invoice?', a: 'An invoice requests payment before it’s made; a payment receipt confirms payment after it’s received. Use a receipt once the customer has paid.' },
      { q: 'What should a payment receipt include?', a: 'Your business details, the payer’s name, a receipt number, the date paid, what the payment was for, the amount, and the payment method.' },
      { q: 'Can I issue a receipt for a partial payment?', a: 'Yes. Note the amount paid and the remaining balance in the notes line so both sides have a clear record.' },
    ],
    related: ['invoice-vs-receipt', 'how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'cash-receipt-template',
    styleId: 'receipt',
    keyword: 'Cash Receipt Template',
    platform: 'cash',
    metaTitle: 'Free Cash Receipt Template — Create & Download (PDF)',
    metaDescription:
      'Create a free cash receipt online and download it as a PDF. Simple cash receipt template proving a cash payment was received — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional cash receipt template to prove a cash payment was received. Cash leaves no automatic paper trail, so a receipt is the only record both sides have — give your customer a clear confirmation of what they paid and when.',
      'Fill it in online for free and download a print-ready PDF or editable Word file in seconds. No signup, no watermark.',
    ],
    included: [
      'Your business details and the payer’s name',
      'A receipt number and the date paid',
      'What the cash payment was for',
      'Amount received (marked as paid in cash)',
      'Subtotal, tax, and total where relevant',
      'A notes line for a thank-you or balance due',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Enter the cash payment', body: 'Add who paid, what for, and the amount. Note “cash” as the payment method in the notes line.' },
      { title: 'Download and share', body: 'Export a PDF cash receipt to print or hand over on the spot. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this cash receipt template free?', a: 'Yes — create and download cash receipts for free, with no signup and no watermark.' },
      { q: 'Why is a cash receipt important?', a: 'Cash payments leave no bank record, so the receipt is the only proof the payment happened. It protects both the payer and the recipient if a dispute comes up later.' },
      { q: 'What should a cash receipt include?', a: 'Your business details, the payer’s name, a receipt number, the date, what was paid for, the amount, and a note that it was paid in cash.' },
      { q: 'Should I keep a copy of cash receipts?', a: 'Yes. Keep a copy for your records — cash income still needs to be tracked for tax purposes. Consult a tax professional for guidance specific to your situation.' },
    ],
    related: ['invoice-vs-receipt', 'how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'donation-receipt-template',
    styleId: 'receipt',
    keyword: 'Donation Receipt Template',
    platform: 'donation',
    metaTitle: 'Free Donation Receipt Template for Nonprofits (PDF)',
    metaDescription:
      'Create a free donation receipt online and download it as a PDF. Nonprofit donation receipt template for acknowledging charitable gifts — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional donation receipt template for nonprofits and charities to acknowledge gifts from donors. Give donors a clear record of their contribution — what they gave, when, and to whom — which they may need for their tax records.',
      'Fill it in online for free and download a print-ready PDF or editable Word file in seconds. No signup, no watermark.',
    ],
    included: [
      'Your organization’s name and details',
      'The donor’s name',
      'A receipt number and the date of the gift',
      'The donation amount or description of donated goods',
      'A statement of whether goods or services were provided in return',
      'A thank-you note line',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Enter the donation details', body: 'Add the donor, the amount or description of the gift, and the date. Use the notes line for your tax-acknowledgment statement.' },
      { title: 'Download and send', body: 'Export a PDF donation receipt to email to your donor. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this donation receipt template free?', a: 'Yes — create and download donation receipts for free, with no signup and no watermark.' },
      { q: 'What should a nonprofit donation receipt include?', a: 'Your organization’s name, the donor’s name, the date and amount of the gift, and a statement of whether any goods or services were provided in exchange. The IRS has specific requirements for tax-deductible contributions.' },
      { q: 'Are donation receipts required for tax deductions?', a: 'For donations of $250 or more, the IRS generally requires a written acknowledgment from the charity for the donor to claim a deduction. Review the IRS charitable contribution rules and consult a tax professional.' },
      { q: 'Can I use it for in-kind (non-cash) donations?', a: 'Yes. Describe the donated goods in place of an amount. Generally the donor — not the charity — is responsible for valuing in-kind gifts.' },
    ],
    related: ['invoice-vs-receipt', 'how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },
  {
    slug: 'receipt-book-template',
    styleId: 'receipt',
    keyword: 'Receipt Book Template',
    platform: 'receipt book',
    metaTitle: 'Free Receipt Book Template — Printable Receipts (PDF)',
    metaDescription:
      'A free receipt book template you can print and reuse. Create numbered receipts for any payment and download as a PDF — no signup, no watermark.',
    downloadFile: '/templates/receipt-template.pdf',
    docxFile: '/templates/receipt-template.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A simple, professional receipt template that works like a digital receipt book — create a clean, numbered receipt for any payment, then print it or send it as a PDF. No carbon copies or messy handwriting, just consistent records you can reuse for every sale.',
      'Fill it in online for free and download a print-ready PDF or editable Word file in seconds. Print a stack to keep on hand, or generate one as needed. No signup, no watermark.',
    ],
    included: [
      'Your business details and the customer’s name',
      'A sequential receipt number and the date',
      'An itemized list of what was paid for',
      'Subtotal, tax, and total paid',
      'Payment method line',
      'A notes line for a thank-you or terms',
    ],
    steps: [
      { title: 'Open the receipt generator', body: 'Select the Receipt style — the layout switches to “Received from” and a receipt number.' },
      { title: 'Fill in the receipt', body: 'Add the customer, the items paid for, and the amount. Increment the receipt number for each new one.' },
      { title: 'Print or download', body: 'Export a PDF to print for your receipt book, or email it to the customer. Free, no watermark.' },
    ],
    faqs: [
      { q: 'Is this receipt book template free?', a: 'Yes — create, print, and download receipts for free, with no signup and no watermark.' },
      { q: 'Can I print blank receipts to fill in by hand?', a: 'Yes. Download the blank PDF and print as many as you need for a physical receipt book, or fill each one in online first.' },
      { q: 'How do I number receipts in a receipt book?', a: 'Use a simple sequential format like REC-0001, REC-0002 so every receipt is unique and easy to track.' },
      { q: 'What is the difference between a receipt and an invoice?', a: 'An invoice requests payment before it’s made; a receipt confirms payment after it’s received. Use a receipt once the customer has paid.' },
    ],
    related: ['invoice-vs-receipt', 'how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number'],
  },

  // ── Free alternatives to popular invoicing tools ──────────────────────
  {
    slug: 'freshbooks-invoice-template',
    styleId: 'google-docs',
    keyword: 'FreshBooks Invoice Template',
    platform: 'professional',
    metaTitle: 'Free FreshBooks-Style Invoice Template — No Account Needed',
    metaDescription:
      'A free invoice template and generator — a no-cost alternative to FreshBooks invoicing. Create and download a professional PDF invoice with no account, signup, or watermark.',
    downloadFile: '/templates/invoice-template-google-docs.pdf',
    docxFile: '/templates/invoice-template-google-docs.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A clean, professional invoice template and free online generator — a no-cost alternative to FreshBooks’ invoicing for freelancers and small businesses who just want to send a polished invoice without subscribing to accounting software. It covers everything a professional invoice needs and exports a print-ready PDF or Word file.',
      'No FreshBooks account, no trial, no signup. Download the editable template to fill in yourself, or use the free generator below — type your details, watch the live preview update, and export your invoice in seconds. No watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Open the generator', body: 'Choose the Simple style and enter your business, client, and line items. The preview updates as you type.' },
      { title: 'Add tax and notes', body: 'Set your tax rate and add payment terms or a thank-you. Subtotal, tax, and total are calculated automatically.' },
      { title: 'Download your invoice', body: 'Export a print-ready PDF or editable Word file and send it to your client. Free, no signup, no watermark.' },
    ],
    faqs: [
      { q: 'Is this really free, unlike FreshBooks?', a: 'Yes. This invoice template and the online generator are completely free, with no account, trial, or watermark. FreshBooks is a paid accounting platform; this is a free way to create and download individual invoices.' },
      { q: 'Do I need a FreshBooks account to use it?', a: 'No. You don’t need a FreshBooks account or any signup — just open the generator, fill it in, and download your invoice.' },
      { q: 'Can I download the invoice as a PDF?', a: 'Yes. Export a print-ready PDF or an editable Word (.docx) file that opens in Microsoft Word and Google Docs.' },
      { q: 'Is this a full accounting tool?', a: 'No — it’s focused on creating and downloading professional invoices fast. If you need full bookkeeping, time tracking, and reporting, a paid platform like FreshBooks may suit you better.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice', 'what-is-an-invoice-number'],
  },
  {
    slug: 'wise-invoice-generator',
    styleId: 'microsoft',
    keyword: 'Wise Invoice Generator',
    platform: 'professional',
    metaTitle: 'Free Invoice Generator — A Simple Wise Alternative (No Signup)',
    metaDescription:
      'A free invoice generator for freelancers billing international clients — a simple alternative to the Wise invoice generator. Create and download a PDF invoice, no signup, no watermark.',
    downloadFile: '/templates/invoice-template-microsoft.pdf',
    docxFile: '/templates/invoice-template-microsoft.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A free, professional invoice generator for freelancers and small businesses — a simple alternative to the Wise invoice generator. Pick your currency, bill domestic or international clients, and export a clean PDF or Word invoice in under a minute. No account required.',
      'Enter your business and client details, add your line items in any currency, and download a polished invoice — no signup, no watermark. Pair it with your own Wise, bank, or PayPal account to actually get paid.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Open the generator', body: 'Choose the Professional style, set your currency, and enter your business and client details.' },
      { title: 'List your work', body: 'Add each service with a quantity and rate. Subtotal, tax, and total update automatically.' },
      { title: 'Download and send', body: 'Export a print-ready PDF or Word file and send it to your client. Free, no signup, no watermark.' },
    ],
    faqs: [
      { q: 'Is this invoice generator free?', a: 'Yes — completely free, with no account, signup, or watermark.' },
      { q: 'Can I invoice international clients in another currency?', a: 'Yes. Set the currency in the generator and the totals format accordingly, so you can bill clients abroad in their currency.' },
      { q: 'How is this different from the Wise invoice generator?', a: 'Both create free invoices. This generator works entirely in your browser with no signup. Wise also offers currency accounts and transfers — use this to make the invoice, and your Wise or bank account to receive the payment.' },
      { q: 'Can I download the invoice as a PDF?', a: 'Yes. Export a print-ready PDF or an editable Word file that opens in Microsoft Word and Google Docs.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice', 'what-is-an-invoice-number'],
  },
  {
    slug: 'quickbooks-invoice-template',
    styleId: 'microsoft',
    keyword: 'QuickBooks Invoice Template',
    platform: 'professional',
    metaTitle: 'Free QuickBooks-Style Invoice Template — No Subscription',
    metaDescription:
      'A free, professional invoice template — a no-cost alternative to QuickBooks invoicing. Create and download a PDF or Word invoice with no subscription, signup, or watermark.',
    downloadFile: '/templates/invoice-template-microsoft.pdf',
    docxFile: '/templates/invoice-template-microsoft.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A professional invoice template and free generator — a no-cost alternative to QuickBooks invoicing for small businesses and freelancers who want a clean invoice without an accounting subscription. It has the familiar, trustworthy structure of a business invoice and exports a print-ready PDF or Word file.',
      'No QuickBooks subscription, no trial, no signup. Download the editable template, or use the free generator below to fill everything in and export your invoice in seconds. No watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Enter your details', body: 'Open the generator, choose the Professional style, and add your business and client information.' },
      { title: 'Itemize the work', body: 'Add line items with quantity and rate; the template handles subtotal, tax, and total.' },
      { title: 'Download the invoice', body: 'Export a clean PDF or Word file ready to email or print. Free, no signup, no watermark.' },
    ],
    faqs: [
      { q: 'Is this QuickBooks invoice template free?', a: 'Yes. The template and the online generator are completely free, with no subscription, signup, or watermark. QuickBooks is paid accounting software; this is a free way to create and download invoices.' },
      { q: 'Do I need a QuickBooks subscription?', a: 'No. You don’t need a QuickBooks account or any signup — just open the generator, fill it in, and download your invoice.' },
      { q: 'Can I open the invoice in Word or Excel?', a: 'You can download an editable Word (.docx) file that opens in Microsoft Word and Google Docs, plus a print-ready PDF.' },
      { q: 'Is this a full accounting tool?', a: 'No — it focuses on creating and downloading professional invoices quickly. If you need full bookkeeping, payroll, and reporting, paid software like QuickBooks may fit better.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'what-is-an-invoice-number', 'how-to-send-an-invoice'],
  },
  {
    slug: 'zoho-invoice-template',
    styleId: 'google-docs',
    keyword: 'Zoho Invoice Template',
    platform: 'professional',
    metaTitle: 'Free Zoho-Style Invoice Template — No Account Needed',
    metaDescription:
      'A free invoice template and generator — a simple alternative to Zoho Invoice. Create and download a professional PDF or Word invoice with no account, signup, or watermark.',
    downloadFile: '/templates/invoice-template-google-docs.pdf',
    docxFile: '/templates/invoice-template-google-docs.docx',
    downloadLabel: 'Download PDF template',
    intro: [
      'A clean, professional invoice template and free online generator — a simple alternative to Zoho Invoice for freelancers and small businesses who just need to send a polished invoice without signing up for software. It covers every field a professional invoice needs and exports a print-ready PDF or Word file.',
      'No Zoho account, no signup. Download the editable template to fill in yourself, or use the free generator below — enter your details, watch the live preview update, and export your invoice in seconds. No watermark.',
    ],
    included: COMMON_INCLUDED,
    steps: [
      { title: 'Open the generator', body: 'Choose the Simple style and enter your business, client, and line items. The preview updates as you type.' },
      { title: 'Add tax and notes', body: 'Set your tax rate and add payment terms or a thank-you. Totals calculate automatically.' },
      { title: 'Download your invoice', body: 'Export a print-ready PDF or editable Word file and send it to your client. Free, no signup, no watermark.' },
    ],
    faqs: [
      { q: 'Is this Zoho invoice template free?', a: 'Yes. The template and online generator are completely free, with no account, signup, or watermark.' },
      { q: 'Do I need a Zoho account?', a: 'No. You don’t need a Zoho Invoice account or any signup — just open the generator, fill it in, and download your invoice.' },
      { q: 'Can I download the invoice as a PDF or Word file?', a: 'Yes. Export a print-ready PDF or an editable Word (.docx) file that opens in Microsoft Word and Google Docs.' },
      { q: 'Is this a full invoicing platform?', a: 'No — it focuses on creating and downloading professional invoices fast. If you need recurring billing, client portals, and reporting, a platform like Zoho Invoice may suit you better.' },
    ],
    related: ['how-to-write-an-invoice-for-beginners', 'how-to-send-an-invoice', 'what-is-an-invoice-number'],
  },
];

export function getLanding(slug: string): Landing | undefined {
  return LANDINGS.find((l) => l.slug === slug);
}
