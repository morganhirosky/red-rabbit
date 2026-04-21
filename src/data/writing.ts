// ── Feature Writing ───────────────────────────────────────────────────────────
// For published pieces: set `url` to the live link.
// For unpublished pieces: set `content` with the full text.
// `slug` must be unique — it becomes the URL: /writing/feature/[slug]

export type FeatureEntry = {
  slug: string;
  title: string;
  publication?: string;
  date: string;
  description?: string;
  url?: string;
  content?: string;
  embed?: boolean;   // attempt to show url in an iframe preview
  cropTop?: number;  // pixels to crop from the top of the iframe preview
};

export const featureWriting: FeatureEntry[] = [
  {
    slug: "10-anime-characters-father-wound",
    title: "10 Anime Characters Struggling with the Father Wound",
    publication: "Game Rant",
    url: "https://morghirosky.wixsite.com/redrabbit/post/10-anime-characters-struggling-with-the-father-wound-in-depth",
    embed: true,
    cropTop: 192,
  },
  {
    slug: "broken-teeth-music-diary",
    title: "Broken Teeth: Music Diary",
    publication: "Column",
    url: "https://morghirosky.wixsite.com/redrabbit-4/post/broken-teeth-music-diary",
    embed: true,
    cropTop: 126,
  },
  {
    slug: "hey-loneliness-loves-you",
    title: "Loneliness Loves You",
    publication: "Psychology",
    url: "https://morghirosky.wixsite.com/redrabbit/post/hey-loneliness-loves-you",
    embed: true,
    cropTop: 192,
  },
  {
    slug: "masaaki-yuasa-adventure-time",
    title: "Masaaki Yuasa Wrote an Adventure Time Episode",
    publication: "Game Rant",
    url: "https://morghirosky.wixsite.com/redrabbit/post/director-of-mind-game-masaaki-yuasa-wrote-an-adventure-time-episode",
    embed: true,
    cropTop: 192,
  },
  {
    slug: "rabbits-of-the-90s",
    title: "Rabbits of the 90s: A Niche's Core",
    publication: "KTSW 89.9",
    date: "October 2022",
    url: "https://morghirosky.wixsite.com/redrabbit/post/rabbits-of-the-90s-a-niche-s-core",
    embed: true,
    cropTop: 192,
  },
  // Add more entries below. Examples:
  //
  // Published with a link:
  // {
  //   slug: "my-game-rant-piece",
  //   title: "Article Title",
  //   publication: "Game Rant",
  //   date: "Month Year",
  //   description: "One-line description.",
  //   url: "https://gamerant.com/your-article",
  // },
  //
  // Unpublished, full text:
  // {
  //   slug: "my-unpublished-piece",
  //   title: "Article Title",
  //   date: "Month Year",
  //   description: "One-line description.",
  //   content: `Paste your full article text here.`,
  // },
];

// ── Technical Writing ─────────────────────────────────────────────────────────
// Drop PDF files into public/senate/ and reference the filename below.

export type TechnicalEntry = {
  title: string;
  date?: string;
  description?: string;
  pdf: string;    // filename in public/senate/
  cropTop?: number; // pixels to crop from the top of the PDF preview (for PDFs with large top margins)
};

export const technicalWriting: TechnicalEntry[] = [
  { title: "9-1-1 Day",                          pdf: "9-1-1 Day.pdf" },
  { title: "Barbara Jordan Leadership Institute", pdf: "Barbara Jordan Leadership Institute.pdf" },
  { title: "Charles Anderson",                   pdf: "Charles Anderson.pdf" },
  { title: "Dagmar Hamilton",                    pdf: "Dagmar Hamilton.pdf" },
  { title: "Dallas Black Dance Academy",         pdf: "Dallas Black Dance Academy.pdf" },
  { title: "Dick Lavine",                        pdf: "Dick Lavine.pdf" },
  { title: "Dr. Jill Fox",                       pdf: "Dr. Jill Fox Memorial.pdf" },
  { title: "Dr. Rutchebeth Contreras",           pdf: "Dr. Rutchebeth Contreras.pdf" },
  { title: "Filipino Veterans Recognition",      pdf: "Filipino Veterans Recognition 2025.pdf", cropTop: 450 },
  { title: "Frank Cloud Cooksey",                pdf: "Frank Cloud Cooksey Memorial.pdf" },
  { title: "James Arens",                        pdf: "James Arens Memorial.pdf" },
  { title: "La Salle Dialysis",                  pdf: "La Salle Dialysis.pdf" },
  { title: "Lamar G. Urbanovsky",                pdf: "Lamar G. Urbanovsky.pdf" },
  { title: "Leukodystrophy Awareness Month",     pdf: "Leukodystrophy Awareness Month.pdf" },
  { title: "Master Chief Clenon",                pdf: "Master Chief Clenon.pdf" },
  { title: "Moral Injury Day",                   pdf: "Moral Injury Day.pdf" },
  { title: "Muscular Dystrophy",                 pdf: "O. Muscular Dystrophy.pdf" },
  { title: "Nexus Family Recovery Day",          pdf: "Nexus Family Recovery Day.pdf" },
  { title: "Operation Dragoon",                  pdf: "Operation Dragoon.pdf" },
  { title: "Qusay Hussein",                      pdf: "Qusay Hussein Proc No. 77.pdf" },
  { title: "Sergeant Willie Ford",               pdf: "Sgt. Willie Ford.pdf" },
  { title: "Texas Nuclear Day",                  pdf: "Texas Nuclear Day.pdf" },
  { title: "Texas Rangers World Series",         pdf: "Texas Rangers World Series.pdf" },
  { title: "Todd Snider",                        pdf: "Todd Snider Memorial.pdf" },
  { title: "Tommie Lee Wyatt",                   pdf: "Tommie Lee Wyatt.pdf" },
  { title: "Vietnam War",                        pdf: "Vietnam War.pdf" },
  { title: "World Meditation Day",               pdf: "World Meditation Day.pdf" },
];
