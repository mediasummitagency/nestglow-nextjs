import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "NestGlow Co — Professional Cleaning in NJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FBF8F3",
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
        {/* Gold accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#E8B86A",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: "700",
              color: "#1F1B16",
              letterSpacing: "-2px",
              fontFamily: "Georgia, serif",
            }}
          >
            NestGlow Co
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#4A443D",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Cleaning you can trust. NJ.
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#4A443D",
                fontSize: "22px",
              }}
            >
              ✓ Insured &amp; bonded
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#4A443D",
                fontSize: "22px",
              }}
            >
              ✓ 10+ years experience
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#4A443D",
                fontSize: "22px",
              }}
            >
              ✓ Satisfaction guaranteed
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            fontSize: "20px",
            color: "#8A837B",
            display: "flex",
          }}
        >
          nestglowco.com
        </div>

        {/* Gold accent bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#E8B86A",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
