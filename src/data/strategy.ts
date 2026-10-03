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
    avatar:  "/strategy/argo84-avatar.jpg",   // shop profile photo (chrome wall clock)
    href:    "https://www.depop.com/argo84/",   // Depop blocks iframes, so this links out
    tagline: "Vintage and contemporary pieces for a more interesting wardrobe.",
    // Storefront grid, left to right, top row first
    grid:    ["/strategy/argo84-halter.jpg", "/strategy/argo84-boots.jpg", "/strategy/argo84-skirt.jpg", "/strategy/argo84-mary-janes.jpg", "/strategy/argo84-glitter-pumps.jpg", "/strategy/argo84-brown-boots.jpg", "/strategy/argo84-straight-jeans.jpg", "/strategy/argo84-ribbed-top.jpg", "/strategy/argo84-suede-boots.jpg"] as Img[],
  },
  // Example listings (title is the photo's alt text)
  listings: [
    { title: "argo84 listing photo: red suede knee-high boots",         img: "/strategy/argo84-red-suede-boots.jpg" as Img },
    { title: "argo84 listing photo: black and white Air Jordan 1 Mids", img: "/strategy/argo84-jordan-1s.jpg" as Img },
    { title: "argo84 listing photo: brown leather slouch boots",        img: "/strategy/argo84-brown-leather-boots.jpg" as Img },
  ],
  principles: [
    { title: "search-oriented titles", body: "Product titles balance descriptive language with terms shoppers are likely to use when browsing by era, garment type, style, and material." },
    { title: "product copy",           body: "Descriptions combine personality with practical purchase information, including measurements, materials, fit, construction, and condition." },
    { title: "visual merchandising",   body: "Each listing pairs original product photography with imagery selected to reinforce the garment’s aesthetic and help establish a recognizable storefront identity." },
  ],
  ad: {
    title: "from listing → brand ad",
    // Left to right, shown uncropped; w/h are the image's pixel size. The screenshots share one
    // height; `width` (as a w/h ratio) overrides an image's column width, `header` moves the caption
    // above the image, and `excerpt` adds a paragraph under it. arrowAfter puts a → after that image,
    // and highlight draws its caption in the red accent
    images: [
      { src: "/strategy/argo84-plaid-original.jpg", w: 1200, h: 1195, caption: "original photo", alt: "Original product photograph of the plaid mini skirt on concrete", arrowAfter: true,
        width: 1169 / 2083,   // same column width as the listing beside it
        header: "1169 / 188",  // caption on top, matching the listing's 188px Depop header bar so the photos line up
        excerpt: "Each listing began with an original product photograph, which I isolated and paired with a backdrop selected to complement the item’s aesthetic. I then wrote search-oriented titles, descriptions, and tags using the language prospective buyers were most likely to type in. Together, the imagery and copy established a consistent visual identity while improving each item’s discoverability within Depop’s marketplace." },
      { src: "/strategy/argo84-plaid-listing.jpg",  w: 1169, h: 2083, caption: "merchandised listing",                         alt: "Published Depop listing: vintage Y2K Charlotte Russe plaid micro mini skirt", arrowAfter: false },
      { src: "/strategy/argo84-plaid-details.jpg",  w: 1170, h: 2130, caption: "search-optimized copy",                               alt: "Listing description: title, product copy, measurements, details, and hashtags", arrowAfter: true  },
      { src: "/strategy/argo84-depop-ad.jpg",       w: 900,  h: 1588, caption: "Listing chosen as leading feature in Instagram ad published by Depop", highlight: true, alt: "Sponsored Depop Instagram ad featuring the plaid mini skirt photo", arrowAfter: false },
    ],
  },
};

// ── 02 · Entre ───────────────────────────────────────────────────────────────
export const ENTRE = {
  id:    "entre",
  chip:  "campaign concepts",
  title: "entre — promotional campaign concept",
  tags:  ["Creative Strategy", "Concept Development", "Copywriting"],
  concept: "Entre is a meal-coordination app that locates the halfway point between users, then suggests equidistant restaurants based on the culinary preferences, price ranges, and dietary restrictions the participants privately selected through the in-app, pre-meal survey.",
  steps: [
    { label: "what problem does Entre address?", body: "Entre works to prevent any friction or inconvenience spurred by meal planning with friends amidst busy schedules by simplifying the coordination process." },
    { label: "What did the client ask for?", body: "The client wanted a simple, low-cost promotional concept that caught the attention of busy New Yorkers and resulted in waitlist sign-ups." },
    { label: "my proposal", title: "match with entre", body: "Novelty matchboxes designed to speak directly to the frustrations Entre seeks to resolve–the difficulties of making plans, aligning schedules, reaching compromise, and balancing work and friendship–with a QR code that links to the waitlist sign-up page on the back of the box." },
  ],
  // Each becomes its own box beside the proposal
  approach: [
    { label: "the approach", body: "I used literalism in the matchbox copy and wrote phrases that, while drolly specific to Entre, read as provocative and random to someone without context. Once the recipient learns the purpose and function of the app, the matchbox copy graduates from provocative to clever." },
    { label: "distribution", body: "The matchboxes were distributed to as many restaurants as possible all throughout the city. This placed the promotion in the environments most relevant to Entre’s concept while familiarizing potential users and restaurateurs with the brand." },
  ],
  // Matchbox mockups (transparent WebP); landscape boxes stack, the portrait one stands beside them
  mockups: [
    { src: "/strategy/entre-different-things.webp", alt: "Entre matchbox: “I think we want different things”",            orient: "landscape" },
    { src: "/strategy/entre-really-hard.webp",      alt: "Entre matchbox: “It’s really hard to be your friend sometimes”", orient: "landscape" },
    { src: "/strategy/entre-perfect-match.webp",    alt: "Entre matchbox: “The perfect match”",                             orient: "portrait"  },
  ] as { src: string; alt: string; orient: "landscape" | "portrait" }[],
  // Screenshot of the live site's 2,000+ person waitlist; links out
  site:  { href: "https://www.entre.nyc/", img: "/strategy/entre-waitlist.jpg", alt: "Entre website showing a waitlist of 2,000+ people" },
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
