// Framework-free vector invoice/receipt PDF builder.
// Runs in the browser (generator download) and in Node (scripts/build-templates.mjs).
import { jsPDF } from 'jspdf';
import {
  InvoiceData,
  TemplateStyle,
  computeTotals,
  formatMoney,
  lineTotal,
} from './types';

const PAGE_W = 210;
const MARGIN = 16;
const RIGHT = PAGE_W - MARGIN;

function fmtDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

/** Build the invoice as a jsPDF document. Returns the doc (caller saves/streams it). */
export function buildInvoicePdf(data: InvoiceData, style: TemplateStyle): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const [ar, ag, ab] = style.accent;
  const gray: [number, number, number] = [110, 110, 110];
  const dark: [number, number, number] = [30, 30, 30];
  const title = data.docType === 'receipt' ? 'RECEIPT' : 'INVOICE';

  // ---- Header: business (left) + big title (right) ----
  let y = 22;

  // Optional logo, top-left; pushes the business name down.
  if (data.logoDataUrl) {
    try {
      const logoH = 16;
      const aspect = data.logoAspect && data.logoAspect > 0 ? data.logoAspect : 1;
      const logoW = Math.min(50, logoH * aspect);
      const fmt = data.logoDataUrl.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(data.logoDataUrl, fmt, MARGIN, 14, logoW, logoH);
      y = 14 + logoH + 8;
    } catch {
      // bad image data — skip the logo, keep the layout
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(ar, ag, ab);
  doc.text(data.businessName || 'Your Business', MARGIN, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...gray);
  let by = y + 6;
  for (const line of [
    ...(data.businessAddress || '').split('\n'),
    data.businessEmail,
    data.businessPhone,
  ].filter(Boolean)) {
    doc.text(line, MARGIN, by);
    by += 4.6;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(ar, ag, ab);
  doc.text(title, RIGHT, y + 2, { align: 'right' });

  doc.setFontSize(9.5);
  doc.setTextColor(...dark);
  const meta: [string, string][] = [
    [data.docType === 'receipt' ? 'Receipt #' : 'Invoice #', data.invoiceNumber || ''],
    ['Date', fmtDate(data.issueDate)],
  ];
  if (data.docType !== 'receipt') meta.push(['Due', fmtDate(data.dueDate)]);
  let my = y + 12;
  for (const [label, value] of meta) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text(label, RIGHT - 32, my, { align: 'left' });
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text(value, RIGHT, my, { align: 'right' });
    my += 5;
  }

  y = Math.max(by, my) + 6;

  // ---- Bill To ----
  doc.setDrawColor(225, 225, 225);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, RIGHT, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(ar, ag, ab);
  doc.text(data.docType === 'receipt' ? 'RECEIVED FROM' : 'BILL TO', MARGIN, y);
  y += 5;
  doc.setFontSize(11);
  doc.setTextColor(...dark);
  doc.text(data.clientName || 'Client name', MARGIN, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...gray);
  for (const line of [...(data.clientAddress || '').split('\n'), data.clientEmail].filter(Boolean)) {
    doc.text(line, MARGIN, y);
    y += 4.6;
  }

  y += 6;

  // ---- Items table ----
  const colQty = RIGHT - 78;
  const colRate = RIGHT - 42;
  const colAmt = RIGHT;
  const descRight = colQty - 6;

  doc.setFillColor(ar, ag, ab);
  doc.rect(MARGIN, y, RIGHT - MARGIN, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  const headY = y + 6;
  doc.text('Description', MARGIN + 3, headY);
  doc.text('Qty', colQty, headY, { align: 'right' });
  doc.text('Rate', colRate, headY, { align: 'right' });
  doc.text('Amount', colAmt - 3, headY, { align: 'right' });
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  for (const item of data.items) {
    const descLines = doc.splitTextToSize(item.description || '', descRight - (MARGIN + 3)) as string[];
    const rowH = Math.max(8, descLines.length * 4.6 + 3);
    if (y + rowH > 270) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setTextColor(...dark);
    doc.text(descLines, MARGIN + 3, y + 5);
    doc.text(String(item.quantity ?? ''), colQty, y + 5, { align: 'right' });
    doc.text(formatMoney(item.rate, data.currency), colRate, y + 5, { align: 'right' });
    doc.text(formatMoney(lineTotal(item), data.currency), colAmt - 3, y + 5, { align: 'right' });
    y += rowH;
    doc.setDrawColor(235, 235, 235);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y, RIGHT, y);
  }

  // ---- Totals ----
  const { subtotal, tax, total } = computeTotals(data);
  y += 7;
  const labelX = colRate;
  const valX = colAmt - 3;
  doc.setFontSize(9.5);
  const rows: [string, string, boolean][] = [
    ['Subtotal', formatMoney(subtotal, data.currency), false],
    [`Tax (${data.taxRate || 0}%)`, formatMoney(tax, data.currency), false],
  ];
  for (const [label, value] of rows) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text(label, labelX, y, { align: 'right' });
    doc.setTextColor(...dark);
    doc.text(value, valX, y, { align: 'right' });
    y += 5.5;
  }
  y += 1;
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.5);
  doc.line(labelX - 28, y, RIGHT, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(ar, ag, ab);
  doc.text('Total', labelX, y, { align: 'right' });
  doc.text(formatMoney(total, data.currency), valX, y, { align: 'right' });

  // ---- Notes ----
  if (data.notes && data.notes.trim()) {
    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(ar, ag, ab);
    doc.text('NOTES', MARGIN, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...gray);
    const noteLines = doc.splitTextToSize(data.notes, RIGHT - MARGIN) as string[];
    doc.text(noteLines, MARGIN, y);
  }

  // ---- Footer ----
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, 285, RIGHT, 285);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.text('Created with InvoicePDF.io — free online invoice generator', PAGE_W / 2, 290, { align: 'center' });

  return doc;
}

/** Browser helper: build + trigger a download. */
export function downloadInvoicePdf(data: InvoiceData, style: TemplateStyle) {
  const doc = buildInvoicePdf(data, style);
  const safe = (data.invoiceNumber || 'invoice').replace(/[^a-z0-9\-]+/gi, '-');
  doc.save(`${safe}.pdf`);
}
