// ── Strategy page content ─────────────────────────────────────────────────────
// Image fields are paths under /public (e.g. "/strategy/argo84-skirt.jpg").
// Leave one null and the page shows a labeled placeholder frame instead.

export type Img = string | null;

export const INTRO =
  "I develop concepts around the way people think, search, shop, and interact—connecting audience insight with copy, creative direction, and digital experience.";

// ── 01 · argo84 ──────────────────────────────────────────────────────────────
export const ARGO84 = {
  id:      "argo84",
  chip:    "content & commerce",
  title:   "argo84 — depop resale shop",
  tags:    ["E-commerce Content", "Product Copywriting", "Visual Merchandising", "Photography"],
  summary: "An independently operated resale shop built around distinctive product presentation, search-oriented copy, and a consistent visual identity.",
  shop: {
    handle:  "argo84",
    href:    "https://www.depop.com/argo84/",   // Depop blocks iframes, so this links out
    tagline: "Vintage and contemporary pieces for a more interesting wardrobe.",
    // Storefront grid, left to right, top row first
    grid:    ["/strategy/argo84-halter.jpg", "/strategy/argo84-boots.jpg", "/strategy/argo84-skirt.jpg", "/strategy/argo84-mary-janes.jpg", "/strategy/argo84-glitter-pumps.jpg", "/strategy/argo84-brown-boots.jpg", "/strategy/argo84-straight-jeans.jpg", "/strategy/argo84-ribbed-top.jpg", "/strategy/argo84-suede-boots.jpg"] as Img[],
  },
  // Example listings (titles shown under each photo)
  listings: [
    { title: "Vintage Charlotte Russe Floral Mini Skirt", img: null as Img },
    { title: "Y2K Star Knit Sweater",                     img: null as Img },
    { title: "Vintage Leather Boots Size 7",              img: null as Img },
  ],
  principles: [
    { title: "search-oriented titles", body: "Product titles balance descriptive language with terms shoppers are likely to use when browsing by era, garment type, style, and material." },
    { title: "product copy",           body: "Descriptions combine personality with practical purchase information, including measurements, materials, fit, construction, and condition." },
    { title: "visual merchandising",   body: "Each listing pairs original product photography with imagery selected to reinforce the garment’s aesthetic and help establish a recognizable storefront identity." },
  ],
  ad: {
    title:   "from listing → brand ad",
    body:    "Original product photography from the shop was later featured in a sponsored Instagram advertisement published by Depop.",
    listing: "/strategy/argo84-plaid-skirt.jpg" as Img,
    ad:      "/strategy/argo84-depop-ad.jpg" as Img,   // Instagram screenshot, shown uncropped
  },
};

// ── 02 · Entre ───────────────────────────────────────────────────────────────
export const ENTRE = {
  id:    "entre",
  chip:  "campaign concepts",
  title: "entre — promotional campaign concept",
  tags:  ["Creative Strategy", "Concept Development", "Copywriting"],
  steps: [
    { label: "the problem", body: "Making plans to eat with other people creates a surprisingly annoying series of negotiations: where to go, what everyone wants, how far people can travel, and how much time they have." },
    { label: "the insight", body: "Entre exists to resolve the friction before the meal. Its promotion could therefore speak directly to the frustration of trying to agree in the first place." },
    { label: "the idea",    title: "match with entre", body: "Low-cost branded matchboxes distributed through participating restaurants put the campaign inside the environment where Entre’s problem is ultimately resolved. Situational copy turns the frustrations of making plans into the campaign itself, while a QR code connects the physical object to the app." },
  ],
  // Matchbox mockups (transparent WebP); landscape boxes stack, the portrait one stands beside them
  mockups: [
    { src: "/strategy/entre-different-things.webp", alt: "Entre matchbox: “I think we want different things”",            orient: "landscape" },
    { src: "/strategy/entre-really-hard.webp",      alt: "Entre matchbox: “It’s really hard to be your friend sometimes”", orient: "landscape" },
    { src: "/strategy/entre-perfect-match.webp",    alt: "Entre matchbox: “The perfect match”",                             orient: "portrait"  },
  ] as { src: string; alt: string; orient: "landscape" | "portrait" }[],
  qrCard: ["Less group chat.", "More good food."],
  flow:  ["friction", "humor", "product promise", "qr", "entre"],
};

// ── 03 · Argo ────────────────────────────────────────────────────────────────
export const ARGO = {
  id:      "argo",
  chip:    "brand & digital experience",
  title:   "argo — experimental e-commerce concept",
  tags:    ["Brand Strategy", "Creative Direction", "Digital Experience", "Copywriting"],
  preview: "/projects/argo-preview.png" as Img,
  href:    "https://argo-morganhiroskys-projects.vercel.app/",
  concept: "An experimental clothing storefront built around the visual and verbal language of a computer file system, transforming familiar e-commerce functions into part of the brand identity.",
  edax:        "Edax is an interactive feature that introduces an element of curiosity and play. By placing an unfamiliar term at the same hierarchy as familiar commerce functions, it invites exploration and reinforces the brand’s unusual, file system-inspired language.",
  exploration: "The project explores how copy, interface language, product design, and interaction can work together to make the shopping experience itself an expression of brand identity.",
  thumbs:      [null, null, null, null] as Img[],
};

export const PROJECTS = [ARGO84, ENTRE, ARGO];
