// Framework-free editable Word (.docx) invoice builder.
// Runs in the browser (generator "Download Word") and Node (scripts/build-templates.ts).
// A .docx opens natively in Microsoft Word and imports as a fully editable doc in Google Docs.
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  VerticalAlign,
  ImageRun,
} from 'docx';
import {
  InvoiceData,
  TemplateStyle,
  computeTotals,
  formatMoney,
  lineTotal,
} from './types';

type Align = (typeof AlignmentType)[keyof typeof AlignmentType];

function fmtDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

const GRAY = '6E6E6E';
const DARK = '1E1E1E';
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } as const;
const NONE_ALL = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideHorizontal: NO_BORDER, insideVertical: NO_BORDER };

function hex(accentHex: string): string {
  return accentHex.replace('#', '').toUpperCase();
}

/** Decode a data: URL to bytes (browser via atob; logo is only ever set client-side). */
function dataUrlToBytes(dataUrl: string): Uint8Array | null {
  const comma = dataUrl.indexOf(',');
  if (comma < 0) return null;
  const b64 = dataUrl.slice(comma + 1);
  try {
    if (typeof atob === 'function') {
      const bin = atob(b64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    }
    return new Uint8Array(Buffer.from(b64, 'base64'));
  } catch {
    return null;
  }
}

function run(text: string, opts: { bold?: boolean; size?: number; color?: string } = {}): TextRun {
  return new TextRun({ text, bold: opts.bold, size: opts.size ?? 19, color: opts.color ?? DARK });
}

function plainCell(children: Paragraph[], width?: number): TableCell {
  return new TableCell({
    children,
    borders: NONE_ALL,
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    verticalAlign: VerticalAlign.TOP,
  });
}

export function buildInvoiceDocx(data: InvoiceData, style: TemplateStyle): Document {
  const accent = hex(style.accentHex);
  const { subtotal, tax, total } = computeTotals(data);
  const title = data.docType === 'receipt' ? 'RECEIPT' : 'INVOICE';

  // --- Header: business (left) + title/meta (right) ---
  const businessLines = [
    ...(data.businessAddress || '').split('\n'),
    data.businessEmail,
    data.businessPhone,
  ].filter(Boolean);

  const metaRows: [string, string][] = [
    [data.docType === 'receipt' ? 'Receipt #' : 'Invoice #', data.invoiceNumber || ''],
    ['Date', fmtDate(data.issueDate)],
  ];
  if (data.docType !== 'receipt') metaRows.push(['Due', fmtDate(data.dueDate)]);

  // Optional logo paragraph (browser-only; logoDataUrl is unset for static templates).
  const logoParagraphs: Paragraph[] = [];
  if (data.logoDataUrl) {
    const bytes = dataUrlToBytes(data.logoDataUrl);
    if (bytes) {
      const h = 56;
      const aspect = data.logoAspect && data.logoAspect > 0 ? data.logoAspect : 1;
      const w = Math.min(180, Math.round(h * aspect));
      const type = data.logoDataUrl.includes('image/png') ? 'png' : 'jpg';
      logoParagraphs.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [new ImageRun({ data: bytes, transformation: { width: w, height: h }, type: type as 'png' | 'jpg' })],
        }),
      );
    }
  }

  const header = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NONE_ALL,
    rows: [
      new TableRow({
        children: [
          plainCell([
            ...logoParagraphs,
            new Paragraph({ children: [run(data.businessName || 'Your Business', { bold: true, size: 30, color: accent })] }),
            ...businessLines.map((l) => new Paragraph({ spacing: { after: 20 }, children: [run(l, { size: 17, color: GRAY })] })),
          ], 55),
          plainCell([
            new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(title, { bold: true, size: 44, color: accent })] }),
            ...metaRows.map(([label, value]) =>
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 40 },
                children: [run(`${label}  `, { size: 17, color: GRAY }), run(value, { bold: true, size: 18 })],
              }),
            ),
          ], 45),
        ],
      }),
    ],
  });

  // --- Bill To ---
  const clientLines = [...(data.clientAddress || '').split('\n'), data.clientEmail].filter(Boolean);
  const billTo = [
    new Paragraph({ spacing: { before: 240, after: 60 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: 'E1E1E1' } }, children: [] }),
    new Paragraph({ spacing: { after: 40 }, children: [run(data.docType === 'receipt' ? 'RECEIVED FROM' : 'BILL TO', { bold: true, size: 16, color: accent })] }),
    new Paragraph({ children: [run(data.clientName || 'Client name', { bold: true, size: 22 })] }),
    ...clientLines.map((l) => new Paragraph({ spacing: { after: 20 }, children: [run(l, { size: 17, color: GRAY })] })),
  ];

  // --- Items table ---
  const headerCell = (text: string, align: Align, width: number) =>
    new TableCell({
      width: { size: width, type: WidthType.PERCENTAGE },
      shading: { fill: accent, color: 'auto' },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      borders: NONE_ALL,
      children: [new Paragraph({ alignment: align, children: [run(text, { bold: true, size: 18, color: 'FFFFFF' })] })],
    });

  const bodyCell = (text: string, align: Align, width: number) =>
    new TableCell({
      width: { size: width, type: WidthType.PERCENTAGE },
      margins: { top: 50, bottom: 50, left: 80, right: 80 },
      borders: { ...NONE_ALL, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'EBEBEB' } },
      children: [new Paragraph({ alignment: align, children: [run(text, { size: 18 })] })],
    });

  const itemsTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NONE_ALL,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell('Description', AlignmentType.LEFT, 52),
          headerCell('Qty', AlignmentType.RIGHT, 12),
          headerCell('Rate', AlignmentType.RIGHT, 18),
          headerCell('Amount', AlignmentType.RIGHT, 18),
        ],
      }),
      ...data.items.map((item) =>
        new TableRow({
          children: [
            bodyCell(item.description || ' ', AlignmentType.LEFT, 52),
            bodyCell(String(item.quantity ?? ''), AlignmentType.RIGHT, 12),
            bodyCell(formatMoney(item.rate, data.currency), AlignmentType.RIGHT, 18),
            bodyCell(formatMoney(lineTotal(item), data.currency), AlignmentType.RIGHT, 18),
          ],
        }),
      ),
    ],
  });

  // --- Totals (right-aligned 2-col table) ---
  const totalRow = (label: string, value: string, opts: { bold?: boolean; color?: string; top?: boolean } = {}) =>
    new TableRow({
      children: [
        new TableCell({
          width: { size: 60, type: WidthType.PERCENTAGE },
          borders: { ...NONE_ALL, top: opts.top ? { style: BorderStyle.SINGLE, size: 8, color: accent } : NO_BORDER },
          margins: { top: 40, bottom: 40, left: 80, right: 80 },
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(label, { bold: opts.bold, size: opts.bold ? 22 : 18, color: opts.color ?? GRAY })] })],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          borders: { ...NONE_ALL, top: opts.top ? { style: BorderStyle.SINGLE, size: 8, color: accent } : NO_BORDER },
          margins: { top: 40, bottom: 40, left: 80, right: 80 },
          children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(value, { bold: opts.bold, size: opts.bold ? 22 : 18, color: opts.color ?? DARK })] })],
        }),
      ],
    });

  const totalsWrapper = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NONE_ALL,
    rows: [
      new TableRow({
        children: [
          plainCell([], 55),
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            borders: NONE_ALL,
            children: [
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: NONE_ALL,
                rows: [
                  totalRow('Subtotal', formatMoney(subtotal, data.currency)),
                  totalRow(`Tax (${data.taxRate || 0}%)`, formatMoney(tax, data.currency)),
                  totalRow('Total', formatMoney(total, data.currency), { bold: true, color: accent, top: true }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // --- Notes + footer ---
  const tail: Paragraph[] = [];
  if (data.notes?.trim()) {
    tail.push(
      new Paragraph({ spacing: { before: 320, after: 40 }, children: [run('NOTES', { bold: true, size: 16, color: accent })] }),
      ...data.notes.split('\n').map((l) => new Paragraph({ children: [run(l, { size: 17, color: GRAY })] })),
    );
  }
  tail.push(
    new Paragraph({
      spacing: { before: 480 },
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 8, color: accent } },
      children: [run('Created with InvoicePDF.io — free online invoice generator', { size: 15, color: GRAY })],
    }),
  );

  return new Document({
    styles: { default: { document: { run: { font: 'Calibri' } } } },
    sections: [
      {
        properties: { page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } } },
        children: [
          header,
          ...billTo,
          new Paragraph({ spacing: { after: 120 }, children: [] }),
          itemsTable,
          totalsWrapper,
          ...tail,
        ],
      },
    ],
  });
}

/** Browser helper: build + trigger a .docx download. */
export async function downloadInvoiceDocx(data: InvoiceData, style: TemplateStyle) {
  const doc = buildInvoiceDocx(data, style);
  const blob = await Packer.toBlob(doc);
  const safe = (data.invoiceNumber || 'invoice').replace(/[^a-z0-9\-]+/gi, '-');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safe}.docx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Node helper: build + return a Buffer (for static template generation). */
export async function invoiceDocxBuffer(data: InvoiceData, style: TemplateStyle): Promise<Buffer> {
  const doc = buildInvoiceDocx(data, style);
  return Packer.toBuffer(doc);
}
