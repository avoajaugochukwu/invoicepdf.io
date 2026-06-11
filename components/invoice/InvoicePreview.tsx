import {
  InvoiceData,
  TemplateStyle,
  computeTotals,
  formatMoney,
  lineTotal,
} from '@/lib/invoice/types';

function fmtDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

/** HTML mirror of the PDF layout (lib/invoice/pdf.ts). White paper, fixed colors. */
export function InvoicePreview({ data, style }: { data: InvoiceData; style: TemplateStyle }) {
  const accent = style.accentHex;
  const { subtotal, tax, total } = computeTotals(data);
  const title = data.docType === 'receipt' ? 'RECEIPT' : 'INVOICE';

  return (
    <div className="mx-auto w-full max-w-[640px] bg-white text-neutral-800 shadow-lg ring-1 ring-black/5 p-8 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xl font-bold" style={{ color: accent }}>
            {data.businessName || 'Your Business'}
          </div>
          <div className="mt-1 whitespace-pre-line text-[11px] text-neutral-500">
            {[data.businessAddress, data.businessEmail, data.businessPhone].filter(Boolean).join('\n')}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold tracking-tight" style={{ color: accent }}>
            {title}
          </div>
          <table className="ml-auto mt-2 text-[11px]">
            <tbody>
              <tr>
                <td className="pr-3 text-neutral-500">{data.docType === 'receipt' ? 'Receipt #' : 'Invoice #'}</td>
                <td className="font-semibold text-neutral-800">{data.invoiceNumber}</td>
              </tr>
              <tr>
                <td className="pr-3 text-neutral-500">Date</td>
                <td className="font-semibold text-neutral-800">{fmtDate(data.issueDate)}</td>
              </tr>
              {data.docType !== 'receipt' && (
                <tr>
                  <td className="pr-3 text-neutral-500">Due</td>
                  <td className="font-semibold text-neutral-800">{fmtDate(data.dueDate)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="my-5 border-neutral-200" />

      {/* Bill to */}
      <div className="text-[10px] font-bold tracking-wide" style={{ color: accent }}>
        {data.docType === 'receipt' ? 'RECEIVED FROM' : 'BILL TO'}
      </div>
      <div className="mt-1 text-[14px] font-semibold text-neutral-800">{data.clientName || 'Client name'}</div>
      <div className="whitespace-pre-line text-[11px] text-neutral-500">
        {[data.clientAddress, data.clientEmail].filter(Boolean).join('\n')}
      </div>

      {/* Items */}
      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: accent }} className="text-white">
            <th className="px-2 py-2 text-left font-semibold">Description</th>
            <th className="px-2 py-2 text-right font-semibold w-14">Qty</th>
            <th className="px-2 py-2 text-right font-semibold w-24">Rate</th>
            <th className="px-2 py-2 text-right font-semibold w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="border-b border-neutral-100">
              <td className="px-2 py-2 align-top">{item.description || ' '}</td>
              <td className="px-2 py-2 text-right align-top">{item.quantity}</td>
              <td className="px-2 py-2 text-right align-top">{formatMoney(item.rate, data.currency)}</td>
              <td className="px-2 py-2 text-right align-top">{formatMoney(lineTotal(item), data.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-4 flex justify-end">
        <table className="text-[12px]">
          <tbody>
            <tr>
              <td className="pr-8 py-1 text-right text-neutral-500">Subtotal</td>
              <td className="py-1 text-right text-neutral-800">{formatMoney(subtotal, data.currency)}</td>
            </tr>
            <tr>
              <td className="pr-8 py-1 text-right text-neutral-500">Tax ({data.taxRate || 0}%)</td>
              <td className="py-1 text-right text-neutral-800">{formatMoney(tax, data.currency)}</td>
            </tr>
            <tr style={{ borderTop: `2px solid ${accent}` }}>
              <td className="pr-8 py-2 text-right text-base font-bold" style={{ color: accent }}>Total</td>
              <td className="py-2 text-right text-base font-bold" style={{ color: accent }}>{formatMoney(total, data.currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {data.notes?.trim() && (
        <div className="mt-6">
          <div className="text-[10px] font-bold tracking-wide" style={{ color: accent }}>NOTES</div>
          <div className="mt-1 whitespace-pre-line text-[11px] text-neutral-500">{data.notes}</div>
        </div>
      )}

      <hr className="mt-8 border-t-2" style={{ borderColor: accent }} />
      <div className="mt-2 text-center text-[10px] text-neutral-400">
        Created with InvoicePDF.io — free online invoice generator
      </div>
    </div>
  );
}
