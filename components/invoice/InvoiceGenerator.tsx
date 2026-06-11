'use client';

import { useMemo, useState } from 'react';
import { Download, FileText, FileSpreadsheet, Plus, Trash2, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvoicePreview } from './InvoicePreview';
import { downloadInvoicePdf } from '@/lib/invoice/pdf';
import { downloadInvoiceDocx } from '@/lib/invoice/docx';
import { downloadInvoiceXlsx } from '@/lib/invoice/xlsx';
import {
  InvoiceData,
  LineItem,
  TemplateId,
  TEMPLATE_STYLES,
  getTemplateStyle,
  sampleInvoice,
} from '@/lib/invoice/types';

const inputClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';
const labelClass = 'mb-1 block text-xs font-medium text-muted-foreground';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function InvoiceGenerator({ initialStyleId }: { initialStyleId?: string }) {
  const initialStyle = getTemplateStyle(initialStyleId);
  const [styleId, setStyleId] = useState<TemplateId>(initialStyle.id);
  const [data, setData] = useState<InvoiceData>(() => ({
    ...sampleInvoice(initialStyle.docType),
  }));

  const [docxBusy, setDocxBusy] = useState(false);
  const [xlsxBusy, setXlsxBusy] = useState(false);
  const style = useMemo(() => getTemplateStyle(styleId), [styleId]);

  async function handleDocx() {
    setDocxBusy(true);
    try {
      await downloadInvoiceDocx(data, style);
    } finally {
      setDocxBusy(false);
    }
  }
  async function handleXlsx() {
    setXlsxBusy(true);
    try {
      await downloadInvoiceXlsx(data, style);
    } finally {
      setXlsxBusy(false);
    }
  }
  function handleLogo(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const img = new window.Image();
      img.onload = () =>
        setData((d) => ({ ...d, logoDataUrl: dataUrl, logoAspect: img.naturalWidth / img.naturalHeight || 1 }));
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  function set<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }
  function setItem(i: number, key: keyof LineItem, value: string) {
    setData((d) => {
      const items = d.items.slice();
      items[i] = {
        ...items[i],
        [key]: key === 'description' ? value : Number(value),
      };
      return { ...d, items };
    });
  }
  function addItem() {
    setData((d) => ({ ...d, items: [...d.items, { description: '', quantity: 1, rate: 0 }] }));
  }
  function removeItem(i: number) {
    setData((d) => ({ ...d, items: d.items.filter((_, idx) => idx !== i) }));
  }
  function selectStyle(id: TemplateId) {
    setStyleId(id);
    set('docType', TEMPLATE_STYLES[id].docType);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* ---- Form ---- */}
      <div className="space-y-6">
        {/* Style picker */}
        <div>
          <span className={labelClass}>Template style</span>
          <div className="flex flex-wrap gap-2">
            {Object.values(TEMPLATE_STYLES).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => selectStyle(s.id)}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors ${
                  styleId === s.id ? 'border-foreground ring-2 ring-ring/40' : 'border-border hover:bg-accent'
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.accentHex }} />
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">Your business</legend>
          <div>
            <span className={labelClass}>Logo (optional)</span>
            <div className="flex items-center gap-3">
              {data.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.logoDataUrl} alt="Logo preview" className="h-12 w-auto max-w-[120px] object-contain rounded border border-border" />
              ) : null}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent">
                <ImagePlus className="h-4 w-4" />
                {data.logoDataUrl ? 'Replace logo' : 'Upload logo'}
                <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleLogo(e.target.files?.[0])} />
              </label>
              {data.logoDataUrl && (
                <button type="button" className="text-xs text-muted-foreground hover:text-destructive" onClick={() => setData((d) => ({ ...d, logoDataUrl: undefined, logoAspect: undefined }))}>
                  Remove
                </button>
              )}
            </div>
          </div>
          <Field label="Business name">
            <input className={inputClass} value={data.businessName} onChange={(e) => set('businessName', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input className={inputClass} value={data.businessEmail} onChange={(e) => set('businessEmail', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={data.businessPhone} onChange={(e) => set('businessPhone', e.target.value)} />
            </Field>
          </div>
          <Field label="Address">
            <textarea className={inputClass} rows={2} value={data.businessAddress} onChange={(e) => set('businessAddress', e.target.value)} />
          </Field>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">{data.docType === 'receipt' ? 'Received from' : 'Bill to'}</legend>
          <Field label="Client name">
            <input className={inputClass} value={data.clientName} onChange={(e) => set('clientName', e.target.value)} />
          </Field>
          <Field label="Client email">
            <input className={inputClass} value={data.clientEmail} onChange={(e) => set('clientEmail', e.target.value)} />
          </Field>
          <Field label="Client address">
            <textarea className={inputClass} rows={2} value={data.clientAddress} onChange={(e) => set('clientAddress', e.target.value)} />
          </Field>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">Details</legend>
          <div className="grid grid-cols-2 gap-3">
            <Field label={data.docType === 'receipt' ? 'Receipt #' : 'Invoice #'}>
              <input className={inputClass} value={data.invoiceNumber} onChange={(e) => set('invoiceNumber', e.target.value)} />
            </Field>
            <Field label="Currency">
              <select className={inputClass} value={data.currency} onChange={(e) => set('currency', e.target.value)}>
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'ZAR', 'INR'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Issue date">
              <input type="date" className={inputClass} value={data.issueDate} onChange={(e) => set('issueDate', e.target.value)} />
            </Field>
            {data.docType !== 'receipt' && (
              <Field label="Due date">
                <input type="date" className={inputClass} value={data.dueDate} onChange={(e) => set('dueDate', e.target.value)} />
              </Field>
            )}
          </div>
        </fieldset>

        {/* Line items */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Items</legend>
          <div className="space-y-2">
            {data.items.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_4rem_5rem_auto] items-center gap-2">
                <input className={inputClass} placeholder="Description" value={item.description} onChange={(e) => setItem(i, 'description', e.target.value)} />
                <input className={inputClass} type="number" min={0} placeholder="Qty" value={item.quantity} onChange={(e) => setItem(i, 'quantity', e.target.value)} />
                <input className={inputClass} type="number" min={0} step="0.01" placeholder="Rate" value={item.rate} onChange={(e) => setItem(i, 'rate', e.target.value)} />
                <button type="button" onClick={() => removeItem(i)} aria-label="Remove item" className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4" /> Add item
          </Button>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">Tax & notes</legend>
          <Field label="Tax rate (%)">
            <input className={inputClass} type="number" min={0} step="0.1" value={data.taxRate} onChange={(e) => set('taxRate', Number(e.target.value))} />
          </Field>
          <Field label="Notes / payment terms">
            <textarea className={inputClass} rows={2} value={data.notes} onChange={(e) => set('notes', e.target.value)} />
          </Field>
        </fieldset>
      </div>

      {/* ---- Preview + download ---- */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold">Live preview</span>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={handleXlsx} disabled={xlsxBusy}>
              <FileSpreadsheet className="h-4 w-4" /> {xlsxBusy ? 'Preparing…' : 'Excel'}
            </Button>
            <Button type="button" variant="outline" onClick={handleDocx} disabled={docxBusy}>
              <FileText className="h-4 w-4" /> {docxBusy ? 'Preparing…' : 'Word'}
            </Button>
            <Button type="button" onClick={() => downloadInvoicePdf(data, style)}>
              <Download className="h-4 w-4" /> PDF
            </Button>
          </div>
        </div>
        <div className="overflow-auto rounded-lg bg-muted/40 p-4">
          <InvoicePreview data={data} style={style} />
        </div>
      </div>
    </div>
  );
}
