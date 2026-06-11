// On-the-fly blank template downloads. Generates the PDF/DOCX per request from the
// shared layout (lib/invoice/pdf.ts, lib/invoice/docx.ts) — no files committed to the repo.
// URLs match what the landing pages link to, e.g.:
//   /templates/invoice-template-word.docx
//   /templates/invoice-template-google-docs.pdf
//   /templates/receipt-template.pdf
import { buildInvoicePdf } from '@/lib/invoice/pdf';
import { invoiceDocxBuffer } from '@/lib/invoice/docx';
import { invoiceXlsxBuffer } from '@/lib/invoice/xlsx';
import { TEMPLATE_STYLES, blankInvoice, TemplateId, TemplateStyle } from '@/lib/invoice/types';

export const runtime = 'nodejs';

const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

type Ext = 'pdf' | 'docx' | 'xlsx';

function parseFile(file: string): { style: TemplateStyle; ext: Ext } | null {
  const m = /^(.+)\.(pdf|docx|xlsx)$/.exec(file);
  if (!m) return null;
  const [, base, ext] = m;
  let id: string | null = null;
  if (base === 'receipt-template') id = 'receipt';
  else if (base.startsWith('invoice-template-')) id = base.slice('invoice-template-'.length);
  if (!id || !(id in TEMPLATE_STYLES)) return null;
  return { style: TEMPLATE_STYLES[id as TemplateId], ext: ext as Ext };
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const parsed = parseFile(file);
  if (!parsed) return new Response('Not found', { status: 404 });

  const data = blankInvoice(parsed.style.docType);
  let body: Uint8Array;
  let type: string;

  if (parsed.ext === 'pdf') {
    const doc = buildInvoicePdf(data, parsed.style);
    body = new Uint8Array(doc.output('arraybuffer'));
    type = 'application/pdf';
  } else if (parsed.ext === 'xlsx') {
    body = new Uint8Array(await invoiceXlsxBuffer(data, parsed.style));
    type = XLSX_TYPE;
  } else {
    body = new Uint8Array(await invoiceDocxBuffer(data, parsed.style));
    type = DOCX_TYPE;
  }

  return new Response(body, {
    headers: {
      'Content-Type': type,
      'Content-Disposition': `attachment; filename="${file}"`,
      // Identical for every visitor → safe to cache hard at the edge.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
