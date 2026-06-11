// Framework-free editable Excel (.xlsx) invoice builder via ExcelJS.
// Runs in the browser (generator "Download Excel") and Node (route handler).
// A .xlsx opens natively in Microsoft Excel and imports as an editable Google Sheet.
import ExcelJS from 'exceljs';
import {
  InvoiceData,
  TemplateStyle,
  computeTotals,
  lineTotal,
} from './types';

function fmtDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

function hex(accentHex: string): string {
  return 'FF' + accentHex.replace('#', '').toUpperCase();
}

const GRAY = 'FF6E6E6E';
const DARK = 'FF1E1E1E';

/** Build the invoice as an ExcelJS workbook. */
export function buildInvoiceWorkbook(data: InvoiceData, style: TemplateStyle): ExcelJS.Workbook {
  const accent = hex(style.accentHex);
  const wb = new ExcelJS.Workbook();
  wb.creator = 'InvoicePDF.io';
  const ws = wb.addWorksheet(data.docType === 'receipt' ? 'Receipt' : 'Invoice', {
    pageSetup: { paperSize: 9, orientation: 'portrait', margins: { left: 0.5, right: 0.5, top: 0.5, bottom: 0.5, header: 0.3, footer: 0.3 } },
    views: [{ showGridLines: false }],
  });

  // Columns: A description, B qty, C rate, D amount
  ws.columns = [
    { width: 46 },
    { width: 10 },
    { width: 16 },
    { width: 16 },
  ];

  const currency = data.currency || 'USD';
  const moneyFmt = `[$${currencySymbol(currency)}]#,##0.00`;
  const title = data.docType === 'receipt' ? 'RECEIPT' : 'INVOICE';

  // Row 1: business name (left) + TITLE (right)
  ws.mergeCells('A1:B1');
  const biz = ws.getCell('A1');
  biz.value = data.businessName || 'Your Business';
  biz.font = { bold: true, size: 16, color: { argb: accent } };
  ws.mergeCells('C1:D1');
  const ttl = ws.getCell('C1');
  ttl.value = title;
  ttl.font = { bold: true, size: 22, color: { argb: accent } };
  ttl.alignment = { horizontal: 'right' };
  ws.getRow(1).height = 28;

  // Business contact lines (A2..) + meta (C2..)
  const bizLines = [...(data.businessAddress || '').split('\n'), data.businessEmail, data.businessPhone].filter(Boolean);
  const meta: [string, string][] = [
    [data.docType === 'receipt' ? 'Receipt #' : 'Invoice #', data.invoiceNumber || ''],
    ['Date', fmtDate(data.issueDate)],
  ];
  if (data.docType !== 'receipt') meta.push(['Due', fmtDate(data.dueDate)]);

  const infoRows = Math.max(bizLines.length, meta.length);
  for (let i = 0; i < infoRows; i++) {
    const r = ws.getRow(2 + i);
    if (bizLines[i]) {
      ws.mergeCells(`A${2 + i}:B${2 + i}`);
      const c = r.getCell(1);
      c.value = bizLines[i];
      c.font = { size: 10, color: { argb: GRAY } };
    }
    if (meta[i]) {
      const lc = r.getCell(3);
      lc.value = meta[i][0];
      lc.font = { size: 10, color: { argb: GRAY } };
      lc.alignment = { horizontal: 'right' };
      const vc = r.getCell(4);
      vc.value = meta[i][1];
      vc.font = { size: 10, bold: true, color: { argb: DARK } };
      vc.alignment = { horizontal: 'right' };
    }
  }

  let row = 2 + infoRows + 1;

  // Bill To
  const billLabel = ws.getCell(`A${row}`);
  billLabel.value = data.docType === 'receipt' ? 'RECEIVED FROM' : 'BILL TO';
  billLabel.font = { bold: true, size: 9, color: { argb: accent } };
  row++;
  const clientName = ws.getCell(`A${row}`);
  clientName.value = data.clientName || 'Client name';
  clientName.font = { bold: true, size: 12, color: { argb: DARK } };
  row++;
  for (const line of [...(data.clientAddress || '').split('\n'), data.clientEmail].filter(Boolean)) {
    ws.getCell(`A${row}`).value = line;
    ws.getCell(`A${row}`).font = { size: 10, color: { argb: GRAY } };
    row++;
  }
  row++;

  // Items header
  const headerRow = ws.getRow(row);
  const headers = ['Description', 'Qty', 'Rate', 'Amount'];
  headers.forEach((h, i) => {
    const c = headerRow.getCell(i + 1);
    c.value = h;
    c.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: accent } };
    c.alignment = { horizontal: i === 0 ? 'left' : 'right', vertical: 'middle' };
  });
  headerRow.height = 20;
  const firstItemRow = row + 1;
  row++;

  // Items
  for (const item of data.items) {
    const r = ws.getRow(row);
    r.getCell(1).value = item.description || '';
    r.getCell(2).value = Number(item.quantity) || 0;
    r.getCell(3).value = Number(item.rate) || 0;
    r.getCell(3).numFmt = moneyFmt;
    // Live formula so editing qty/rate recalculates in Excel/Sheets
    r.getCell(4).value = { formula: `B${row}*C${row}`, result: lineTotal(item) } as ExcelJS.CellFormulaValue;
    r.getCell(4).numFmt = moneyFmt;
    [2, 3, 4].forEach((ci) => (r.getCell(ci).alignment = { horizontal: 'right' }));
    r.getCell(1).border = { bottom: { style: 'thin', color: { argb: 'FFEBEBEB' } } };
    r.getCell(2).border = { bottom: { style: 'thin', color: { argb: 'FFEBEBEB' } } };
    r.getCell(3).border = { bottom: { style: 'thin', color: { argb: 'FFEBEBEB' } } };
    r.getCell(4).border = { bottom: { style: 'thin', color: { argb: 'FFEBEBEB' } } };
    row++;
  }
  const lastItemRow = row - 1;

  // Totals
  const { tax, total } = computeTotals(data);
  row++;
  const subRow = row;
  ws.getCell(`C${subRow}`).value = 'Subtotal';
  ws.getCell(`C${subRow}`).alignment = { horizontal: 'right' };
  ws.getCell(`C${subRow}`).font = { color: { argb: GRAY } };
  ws.getCell(`D${subRow}`).value = { formula: `SUM(D${firstItemRow}:D${lastItemRow})` } as ExcelJS.CellFormulaValue;
  ws.getCell(`D${subRow}`).numFmt = moneyFmt;
  ws.getCell(`D${subRow}`).alignment = { horizontal: 'right' };
  row++;
  const taxRow = row;
  ws.getCell(`C${taxRow}`).value = `Tax (${data.taxRate || 0}%)`;
  ws.getCell(`C${taxRow}`).alignment = { horizontal: 'right' };
  ws.getCell(`C${taxRow}`).font = { color: { argb: GRAY } };
  ws.getCell(`D${taxRow}`).value = { formula: `D${subRow}*${(Number(data.taxRate) || 0) / 100}`, result: tax } as ExcelJS.CellFormulaValue;
  ws.getCell(`D${taxRow}`).numFmt = moneyFmt;
  ws.getCell(`D${taxRow}`).alignment = { horizontal: 'right' };
  row++;
  const totalRow = row;
  ws.getCell(`C${totalRow}`).value = 'Total';
  ws.getCell(`C${totalRow}`).font = { bold: true, size: 12, color: { argb: accent } };
  ws.getCell(`C${totalRow}`).alignment = { horizontal: 'right' };
  ws.getCell(`C${totalRow}`).border = { top: { style: 'medium', color: { argb: accent } } };
  const totalCell = ws.getCell(`D${totalRow}`);
  totalCell.value = { formula: `D${subRow}+D${taxRow}`, result: total } as ExcelJS.CellFormulaValue;
  totalCell.numFmt = moneyFmt;
  totalCell.font = { bold: true, size: 12, color: { argb: accent } };
  totalCell.alignment = { horizontal: 'right' };
  totalCell.border = { top: { style: 'medium', color: { argb: accent } } };
  row += 2;

  // Notes
  if (data.notes?.trim()) {
    ws.getCell(`A${row}`).value = 'NOTES';
    ws.getCell(`A${row}`).font = { bold: true, size: 9, color: { argb: accent } };
    row++;
    ws.mergeCells(`A${row}:D${row}`);
    ws.getCell(`A${row}`).value = data.notes;
    ws.getCell(`A${row}`).font = { size: 10, color: { argb: GRAY } };
    ws.getCell(`A${row}`).alignment = { wrapText: true, vertical: 'top' };
    row += 2;
  }

  ws.mergeCells(`A${row}:D${row}`);
  ws.getCell(`A${row}`).value = 'Created with InvoicePDF.io — free online invoice generator';
  ws.getCell(`A${row}`).font = { size: 8, color: { argb: GRAY } };
  ws.getCell(`A${row}`).alignment = { horizontal: 'center' };

  return wb;
}

function currencySymbol(code: string): string {
  const map: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', CAD: '$', AUD: '$', NZD: '$', ZAR: 'R', INR: '₹' };
  return map[code] || '$';
}

/** Browser helper: build + trigger an .xlsx download. */
export async function downloadInvoiceXlsx(data: InvoiceData, style: TemplateStyle) {
  const wb = buildInvoiceWorkbook(data, style);
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safe = (data.invoiceNumber || 'invoice').replace(/[^a-z0-9\-]+/gi, '-');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safe}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Node helper: build + return a Buffer (for the on-the-fly template route). */
export async function invoiceXlsxBuffer(data: InvoiceData, style: TemplateStyle): Promise<Buffer> {
  const wb = buildInvoiceWorkbook(data, style);
  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}
