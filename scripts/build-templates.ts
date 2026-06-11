// Pre-builds the downloadable PDF templates served from /public/templates/.
// Reuses the SAME jsPDF layout as the in-browser generator (single source of truth).
// Run: npx tsx scripts/build-templates.ts
import fs from 'node:fs';
import path from 'node:path';
import { buildInvoicePdf } from '../lib/invoice/pdf';
import { TEMPLATE_STYLES, sampleInvoice, TemplateId } from '../lib/invoice/types';

const OUT = path.join(process.cwd(), 'public', 'templates');
fs.mkdirSync(OUT, { recursive: true });

const ids = Object.keys(TEMPLATE_STYLES) as TemplateId[];
for (const id of ids) {
  const style = TEMPLATE_STYLES[id];
  const data = sampleInvoice(style.docType);
  // Blank out sample text for a fill-in-yourself template.
  const blankData = {
    ...data,
    businessName: 'Your Business Name',
    businessEmail: 'you@business.com',
    businessAddress: 'Street address\nCity, State ZIP',
    businessPhone: '(000) 000-0000',
    clientName: 'Client name',
    clientEmail: 'client@email.com',
    clientAddress: 'Client street address\nCity, State ZIP',
    notes: 'Payment due within 30 days. Thank you for your business.',
    items: [
      { description: 'Description of item or service', quantity: 1, rate: 0 },
      { description: 'Description of item or service', quantity: 1, rate: 0 },
      { description: 'Description of item or service', quantity: 1, rate: 0 },
    ],
  };
  const doc = buildInvoicePdf(blankData, style);
  const fileName = style.docType === 'receipt' ? 'receipt-template.pdf' : `invoice-template-${id}.pdf`;
  const buf = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(path.join(OUT, fileName), buf);
  console.log(`  wrote public/templates/${fileName} (${buf.length} bytes)`);
}
console.log(`Done: ${ids.length} templates.`);
