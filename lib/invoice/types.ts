// Shared invoice data model + template styles.
// Used by the in-browser generator (components/invoice/*) and the build-time
// static template generator (scripts/build-templates.mjs). Keep framework-free.

export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export type DocType = 'invoice' | 'receipt';

export interface InvoiceData {
  docType: DocType;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessPhone: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  currency: string; // ISO 4217, e.g. 'USD'
  taxRate: number; // percent, e.g. 8.5
  notes: string;
  items: LineItem[];
  /** Optional uploaded logo (browser only) as a data URL, plus its width/height ratio. */
  logoDataUrl?: string;
  logoAspect?: number; // width / height
}

export type TemplateId =
  | 'google-docs'
  | 'word'
  | 'canva'
  | 'microsoft'
  | 'excel'
  | 'receipt'
  | 'blank';

export interface TemplateStyle {
  id: TemplateId;
  name: string;
  /** RGB accent used for headings, table header, and the big title. */
  accent: [number, number, number];
  /** Tailwind-friendly hex mirror of `accent` for the HTML preview. */
  accentHex: string;
  docType: DocType;
}

export const TEMPLATE_STYLES: Record<TemplateId, TemplateStyle> = {
  'google-docs': { id: 'google-docs', name: 'Simple', accent: [66, 133, 244], accentHex: '#4285F4', docType: 'invoice' },
  word:          { id: 'word',        name: 'Classic', accent: [43, 87, 154], accentHex: '#2B579A', docType: 'invoice' },
  canva:         { id: 'canva',       name: 'Modern',  accent: [125, 42, 232], accentHex: '#7D2AE8', docType: 'invoice' },
  microsoft:     { id: 'microsoft',   name: 'Professional', accent: [0, 120, 212], accentHex: '#0078D4', docType: 'invoice' },
  excel:         { id: 'excel',       name: 'Spreadsheet', accent: [33, 115, 70], accentHex: '#217346', docType: 'invoice' },
  receipt:       { id: 'receipt',     name: 'Receipt', accent: [51, 51, 51], accentHex: '#333333', docType: 'receipt' },
  blank:         { id: 'blank',       name: 'Minimal', accent: [17, 24, 39], accentHex: '#111827', docType: 'invoice' },
};

export function getTemplateStyle(id: string | null | undefined): TemplateStyle {
  if (id && id in TEMPLATE_STYLES) return TEMPLATE_STYLES[id as TemplateId];
  return TEMPLATE_STYLES['google-docs'];
}

export function lineTotal(item: LineItem): number {
  return (Number(item.quantity) || 0) * (Number(item.rate) || 0);
}

export function computeTotals(data: InvoiceData) {
  const subtotal = data.items.reduce((sum, it) => sum + lineTotal(it), 0);
  const tax = subtotal * ((Number(data.taxRate) || 0) / 100);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount || 0);
  } catch {
    return `${currency} ${(amount || 0).toFixed(2)}`;
  }
}

/** Empty fill-in-yourself template — used for the on-the-fly blank downloads. */
export function blankInvoice(docType: DocType = 'invoice'): InvoiceData {
  return {
    ...sampleInvoice(docType),
    businessName: 'Your Business Name',
    businessEmail: 'you@business.com',
    businessAddress: 'Street address\nCity, State ZIP',
    businessPhone: '(000) 000-0000',
    clientName: 'Client name',
    clientEmail: 'client@email.com',
    clientAddress: 'Client street address\nCity, State ZIP',
    invoiceNumber: docType === 'receipt' ? 'REC-0001' : 'INV-0001',
    taxRate: 0,
    notes: 'Payment due within 30 days. Thank you for your business.',
    items: [
      { description: 'Description of item or service', quantity: 1, rate: 0 },
      { description: 'Description of item or service', quantity: 1, rate: 0 },
      { description: 'Description of item or service', quantity: 1, rate: 0 },
    ],
  };
}

export function sampleInvoice(docType: DocType = 'invoice'): InvoiceData {
  return {
    docType,
    businessName: 'Acme Studio',
    businessEmail: 'hello@acmestudio.com',
    businessAddress: '123 Market Street\nSan Francisco, CA 94103',
    businessPhone: '(555) 123-4567',
    clientName: 'Globex Corporation',
    clientEmail: 'accounts@globex.com',
    clientAddress: '500 Industrial Way\nAustin, TX 78701',
    invoiceNumber: 'INV-0001',
    issueDate: '2026-06-10',
    dueDate: '2026-07-10',
    currency: 'USD',
    taxRate: 8.5,
    notes: 'Thank you for your business. Payment is due within 30 days.',
    items: [
      { description: 'Website design (homepage + 3 inner pages)', quantity: 1, rate: 1800 },
      { description: 'Logo & brand mark', quantity: 1, rate: 650 },
      { description: 'Revisions', quantity: 4, rate: 75 },
    ],
  };
}
