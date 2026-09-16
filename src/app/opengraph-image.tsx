import { ImageResponse } from "next/og";
export const alt = "Sandesh Apparala — AI Agent Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#edf3fc",
        color: "#10243a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28 }}>sandesh.io</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 22, color: "#2263d6" }}>
          SANDESH APPARALA · AI AGENT ENGINEER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            letterSpacing: -3,
            lineHeight: 1.1,
          }}
        >
          AI agents that turn enquiries into sales conversations.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 23, color: "#536477" }}>
        WhatsApp AI agents · Custom workflows · Ongoing management
      </div>
    </div>,
    size,
  );
}
