import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/config";

export const runtime = "nodejs";
export const alt = "NestGlow Co — Professional Cleaning in NJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, mirrored from globals.css. Satori can't read CSS custom
// properties, so these have to be literals — keep them in step with
// --color-brand / --color-charcoal if the palette moves again.
const BRAND = "#4FACFE";
const BRAND_DARK = "#1D8FD8";
const NAVY = "#1A1F36";
const SLATE = "#4A5568";
const PALE = "#F0F8FF";

const POINTS = ["Insured & bonded", "10+ years experience", "Satisfaction guaranteed"];

/**
 * A drawn tick, not the "✓" character.
 *
 * Satori has no glyph for U+2713 in the default font and tries to fetch one at
 * render time; that request 400s, the build logs a warning it does not fail on,
 * and the shipped card renders three tofu boxes. An inline SVG has no font
 * dependency, so it always draws.
 */
function Tick() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: "flex" }}>
      <circle cx="12" cy="12" r="12" fill={BRAND} />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Brand bar, top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: BRAND,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <div
            style={{
              fontSize: "82px",
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            {BUSINESS.name}
          </div>

          <div
            style={{
              fontSize: "34px",
              color: SLATE,
              textAlign: "center",
              maxWidth: "760px",
              display: "flex",
            }}
          >
            Home &amp; short-term rental cleaning across the Jersey Shore
          </div>

          <div style={{ display: "flex", gap: "34px", marginTop: "18px" }}>
            {POINTS.map((p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: NAVY,
                  fontSize: "23px",
                  background: PALE,
                  borderRadius: "999px",
                  padding: "10px 20px",
                }}
              >
                <Tick />
                {p}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "34px",
            left: "48px",
            fontSize: "21px",
            color: SLATE,
            display: "flex",
          }}
        >
          Monmouth · Ocean · Middlesex County, NJ
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "34px",
            right: "48px",
            fontSize: "21px",
            fontWeight: 600,
            color: BRAND_DARK,
            display: "flex",
          }}
        >
          nestglowco.com
        </div>

        {/* Brand bar, bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: BRAND,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
