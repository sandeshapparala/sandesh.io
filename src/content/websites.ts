export type WebsiteProject = {
  name: string;
  category: string;
  kind: "website" | "ecommerce";
  period: string;
  status: "Delivered" | "In progress";
  url: string | null;
  domain: string;
  tone: string;
  image: string | null;
};

export const websites: WebsiteProject[] = [
  {
    name: "Megham Chocolate",
    category: "Chocolate & gifting",
    kind: "ecommerce",
    period: "June–August 2026",
    status: "Delivered",
    url: "https://meghamchocolate.com",
    domain: "meghamchocolate.com",
    tone: "chocolate",
    image: "/projects/megham-supplied.png",
  },
  {
    name: "ZAX Design Studio",
    category: "Architecture & interiors",
    kind: "website",
    period: "2025",
    status: "Delivered",
    url: "https://zaxdesignstudio.com",
    domain: "zaxdesignstudio.com",
    tone: "stone",
    image: "/projects/zax-supplied.png",
  },
  {
    name: "Epix Infra",
    category: "Home cinema & interiors",
    kind: "website",
    period: "2024",
    status: "Delivered",
    url: "https://epixinfra.com",
    domain: "epixinfra.com",
    tone: "sage",
    image: "/projects/epix-supplied.png",
  },
  {
    name: "Yutha Constructions",
    category: "Real estate",
    kind: "website",
    period: "March–May 2026",
    status: "Delivered",
    url: "https://yuthaconstructions.com",
    domain: "yuthaconstructions.com",
    tone: "lavender",
    image: "/projects/yutha-supplied.png",
  },
  {
    name: "Design Interio",
    category: "Interior design",
    kind: "website",
    period: "May–July 2026",
    status: "Delivered",
    url: "https://designinterio.co",
    domain: "designinterio.co",
    tone: "sand",
    image: "/projects/designinterio-screen.png",
  },
  {
    name: "TD Sringeri",
    category: "Real estate · Sringeri",
    kind: "website",
    period: "July 2026",
    status: "Delivered",
    url: "https://tdsringeri.com",
    domain: "tdsringeri.com",
    tone: "sage",
    image: "/projects/tdsringeri-screen.png",
  },
  {
    name: "RYT Club",
    category: "Ecommerce",
    kind: "ecommerce",
    period: "In progress",
    status: "In progress",
    url: null,
    domain: "rytclub.com",
    tone: "lavender",
    image: "/projects/ryt-supplied.png",
  },
];
