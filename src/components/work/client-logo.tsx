import Image from "next/image";

const logos: Record<string, { src: string; width: number; height: number }> = {
  "Megham Chocolate": { src: "/clients/megham.png", width: 4000, height: 4000 },
  "Design Interio": { src: "/clients/design-interio.png", width: 447, height: 507 },
  "Yutha Constructions": {
    src: "/clients/yutha.png",
    width: 2230,
    height: 1221,
  },
  "Tungabhadra Developers": {
    src: "/clients/td-sringeri.png",
    width: 1254,
    height: 1254,
  },
  "TD Sringeri": { src: "/clients/td-sringeri.png", width: 1254, height: 1254 },
  "ZAX Design Studio": { src: "/clients/zax.png", width: 1426, height: 714 },
  "Epix Infra": { src: "/clients/epix.jpg", width: 1280, height: 640 },
  "RYT Club": { src: "/clients/ryt.png", width: 4167, height: 4167 },
};

export function ClientLogo({ name }: { name: string }) {
  const logo = logos[name];
  if (!logo) return null;
  return (
    <span
      className={`client-logo client-logo-${name.split(" ")[0].toLowerCase()}`}
    >
      <Image {...logo} alt={`${name} logo`} sizes="200px" />
    </span>
  );
}

export function hasClientLogo(name: string) {
  return name in logos;
}
