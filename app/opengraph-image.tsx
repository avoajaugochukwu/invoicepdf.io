import { ImageResponse } from 'next/og';

// Default Open Graph / Twitter image for routes that don't set their own.
// Generated at build time (no static binary asset required).
export const alt = 'InvoicePDF.io — Create and share professional invoices instantly';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0b1120',
          backgroundImage:
            'linear-gradient(135deg, #0b1120 0%, #1e1b4b 60%, #831843 100%)',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, opacity: 0.85, marginBottom: 24 }}>
          InvoicePDF.io
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Create and share professional invoices instantly
        </div>
        <div style={{ fontSize: 32, opacity: 0.8, marginTop: 32, maxWidth: 880 }}>
          Invoicing guides, templates, and tips for freelancers and small businesses.
        </div>
      </div>
    ),
    { ...size }
  );
}
