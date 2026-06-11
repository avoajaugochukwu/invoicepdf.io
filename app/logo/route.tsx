import { ImageResponse } from 'next/og';

// Dynamically generated square brand logo (served at /logo as image/png).
// Used as the Organization/publisher logo in JSON-LD — no static binary needed.
// Prerendered at build time so it's cached like a static asset.
export const dynamic = 'force-static';

const SIZE = 512;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(135deg, #0b1120 0%, #1e1b4b 60%, #831843 100%)',
        }}
      >
        {/* Invoice "paper" */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 280,
            height: 344,
            backgroundColor: 'white',
            borderRadius: 24,
            padding: '34px 30px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          }}
        >
          {/* Accent header bar */}
          <div
            style={{
              width: 120,
              height: 22,
              borderRadius: 6,
              backgroundImage: 'linear-gradient(90deg, #6366f1, #ec4899)',
              marginBottom: 30,
            }}
          />
          {/* Invoice line rows */}
          {[230, 200, 215, 175].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 16,
                borderRadius: 5,
                backgroundColor: '#cbd5e1',
                marginBottom: 18,
              }}
            />
          ))}
          {/* Total bar */}
          <div
            style={{
              marginTop: 'auto',
              width: 150,
              height: 26,
              borderRadius: 6,
              backgroundColor: '#0b1120',
            }}
          />
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE }
  );
}
