import { ImageResponse } from "next/og";
import { serviceBySlug } from "@/content/services";
import {
  serviceSlugs,
  workSlugs,
  type ServiceSlug,
  type WorkSlug,
} from "@/content/site";
import { workBySlug } from "@/content/work";

export const runtime = "nodejs";

const overview = {
  home: {
    eyebrow: "Sandesh · WhatsApp sales systems",
    title: "Replies in 3 seconds. Books site visits while you sleep.",
    footer: "500+ conversations · 30+ site visits · 5 villas sold",
  },
  services: {
    eyebrow: "Services",
    title: "AI systems that do revenue work.",
    footer: "WhatsApp agents · Automation · LLM integration",
  },
  work: {
    eyebrow: "Work",
    title: "Proof, a live demo, and the systems behind both.",
    footer: "Yutha Constructions · Verenza demo · Selected work",
  },
  about: {
    eyebrow: "About Sandesh",
    title: "Building practical AI systems for residential developers.",
    footer: "Gemini API · WhatsApp Cloud API · Firebase · Next.js",
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with the working WhatsApp conversation.",
    footer: "hello@sandesh.io · sandesh.io",
  },
} as const;

const kinds = [
  ...Object.keys(overview),
  ...serviceSlugs.map((slug) => `service-${slug}`),
  ...workSlugs.map((slug) => `work-${slug}`),
];

export function generateStaticParams() {
  return kinds.map((kind) => ({ kind }));
}

function getContent(kind: string) {
  if (kind in overview) {
    return overview[kind as keyof typeof overview];
  }

  if (kind.startsWith("service-")) {
    const slug = kind.replace("service-", "") as ServiceSlug;
    const service = serviceBySlug[slug];
    if (service) {
      return {
        eyebrow: service.eyebrow,
        title: service.title,
        footer:
          service.slug === "whatsapp-ai-sales-agents"
            ? "Reply · Qualify · Book the visit"
            : "Sandesh Technologies · India",
      };
    }
  }

  if (kind.startsWith("work-")) {
    const slug = kind.replace("work-", "") as WorkSlug;
    const item = workBySlug[slug];
    if (item) {
      return {
        eyebrow: item.eyebrow,
        title: item.title,
        footer:
          item.slug === "yutha-constructions"
            ? "500+ conversations · 30+ site visits · 5 villas sold"
            : item.kind === "demo"
              ? "A fictional villa project · Try it on WhatsApp"
              : "Selected systems work · Sandesh Technologies",
      };
    }
  }

  return overview.home;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const { kind } = await params;
  const content = getContent(kind);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F7F5F1",
          color: "#16181C",
          padding: "58px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #D7D1C7",
            padding: "46px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "46px",
              top: "46px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#5B6068",
            }}
          >
            <span>11:47 PM</span>
            <span
              style={{
                width: "12px",
                height: "12px",
                display: "flex",
                borderRadius: "999px",
                background: "#1FA855",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              color: "#8A682E",
              fontFamily: "monospace",
              fontSize: "18px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {content.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "970px",
              fontSize: "70px",
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 700,
            }}
          >
            {content.title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "monospace",
                fontSize: "18px",
                color: "#5B6068",
              }}
            >
              {content.footer}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              sandesh
              <span style={{ color: "#B5883C" }}>.io</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
