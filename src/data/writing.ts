// ── Feature Writing ───────────────────────────────────────────────────────────
// For published pieces: set `url` to the live link.
// For unpublished pieces: set `content` with the full text.
// `slug` must be unique — it becomes the URL: /writing/feature/[slug]

export type ImgEntry = { src: string; cropTop?: number };
export type ImgAfterValue = ImgEntry | { layout: "side-by-side"; images: ImgEntry[] };

export type FeatureEntry = {
  slug: string;
  title: string;
  publication?: string;
  date: string;
  description?: string;
  url?: string;
  content?: string;
  imagesAfter?: Record<number, ImgAfterValue>;
  topImage?: string;
  embed?: boolean;
  cropTop?: number;
};

export const featureWriting: FeatureEntry[] = [
  {
    slug: "jimmy",
    title: "The Eighth Grade Boy Wants to See a Dead Body",
    date: "2023",
    description: "A mortician in New Braunfels reflects on curiosity, sacrifice, and what he believes waits on the other side.",
    topImage: "/projects/jimmy.jpg",
    imagesAfter: {
      12: { layout: "side-by-side", images: [{ src: "/projects/pennington-sign.jpg" }, { src: "/projects/pennington-building.jpg" }] },
      17: { src: "/projects/church.jpg", cropTop: 80 },
    },
    content: `Mr. Jimmy grew up in New Braunfels, Texas, back when the city was much smaller than it is today. His youth was filled with friends, extracurricular activities, and the kind of small-town familiarity that leaves little room for anonymity. Yet even amid the ordinary rhythms of adolescence, his curiosity was already leaning toward something less ordinary.

I began by asking Jimmy when he first realized he had an interest in mortuary science and how he first entered the industry.

"I guess it was in middle school when they [school counselors] approached us in our general business class. They asked us to write a paper on the career or whatever we wanted to go into after high school. I had always been curious about the funeral industry so I wrote my paper on that."

For Jimmy, the fascination began even earlier, rooted in the quiet rituals of family and faith.

Jimmy continues, "Growing up, I was very close to my grandparents. Starting at a young age, I would hang around adults and tag along when my grandparents went to vigil services. I was always very curious about what went on behind closed doors."

That curiosity soon found its way into experience.

"By that summer, after the eighth grade, I was working in a restaurant and even though I still had an interest, because of my age I really wasn't able to work in a funeral home. But the funeral home got in a bind later that same summer, and wanted to see if I was interested in maybe doing some cleaning and getting the cars ready for the next day. I took on the job, and during the day I'd be at the restaurant then at night, I went in and got the cars ready."

By the summer after his freshman year of high school, Jimmy had moved beyond cleaning and preparation work and was assisting the local funeral home with "removals," transporting the deceased from the site of death to the mortuary for post-mortem care.

When I asked what had drawn him toward becoming a mortician in the first place, his answer was unexpectedly candid.

"Well, this is going to sound a little weird but honestly I wanted to see a dead body."

The honesty of the response was disarming, but it also felt emblematic of the conversation itself: direct, unvarnished, and absent of pretense.

After graduating from college, Jimmy went straight to the San Antonio College of Mortuary Science. He lived in an apartment above the funeral home where he had begun working, spending his days in school and his nights immersed in the profession. In 1981, he began his apprenticeship, and a year later he passed his state board exam, earning his license in funeral directing and embalming.

After graduation, he briefly worked in San Antonio before returning to New Braunfels, where the work became more personal. There, he found himself preparing people he had known throughout his childhood — faces once familiar in life, now returned to him in death.

Years later, Jimmy returned to San Antonio to work as a manager for a corporate funeral home. The experience clarified something for him: he preferred the intimacy of family-owned establishments. After about two years in the corporate setting, he moved to San Marcos and has spent the last 15 years at Pennington Funeral Home.

When I asked about the parts of the job he loves most and least, his answer moved first to the physical demands of the work.

"Well, now that I'm older, it's difficult for me to go out and help pick up a 300-pound individual, especially if they've died on the floor. We actually used to go to the scenes of accidents and pick up bodies off the road or out of a car or from the side of a lake. If there was a drowning, the fire department would pull them out of the water, wrap them up then put them on the side and wait for the funeral home to arrive. That's probably the least."

But when he turned to what he loves, his tone softened.

"What I love the most is when you actually sit in an office with the family and they're telling you exactly how they want the funeral to be, what they want for their loved one while I'm making all my notes and getting all of the information. The best thing you can do for them is just make it happen. I like to carry out all their wishes and meet all their expectations."

What stood out was not only the contrast between the physical and emotional labor of the profession, but the way he spoke of service — not as obligation, but as fulfillment.

That candor led me to ask how he maintains balance while navigating a family's grief and, at the same time, tending to the source of it. His response was immediate and striking in its simplicity.

"I don't. Funeral directors make a lot of sacrifices. I have missed a lot of things, especially in my only son's life that I regret. Family birthday parties I didn't go to for the sake of a stranger's funeral."

The weight of that admission settled heavily between us. Not wanting to leave him too long in the vulnerability of that moment, I told him I had always assumed funeral directors made sacrifices, and that this was part of what had first drawn my curiosity.

I then circled back to something he had mentioned earlier — being raised Catholic — and asked whether Catholicism still reflected his beliefs today.

His answer first drifted toward the technical frustrations of multi-hour open caskets before I asked more directly, "Mr. Jimmy, what do you think happens after we die?"

He sighed and said, "From the time we started attending religious classes they would always tell us, it's not really life after death but it is the fact that your soul leaves your body and your soul goes up to Heaven."

"I don't know if there's going to be a time when the Good Lord is going to come down and raise everyone from the dead — okay, so what's gonna happen? You're going to take the bodies, you're going to grow their skin back, and everything else? And then you're going to bring the soul from Heaven? What route will be taken, you know?"

"So no, I don't really believe in that besides, yes, the soul does go to Heaven. But once you're gone, that has ended, your life has ended. I think we're told these things only to help you continue to be a good person and be good to each other."

"Even though I came up Catholic and I should believe everything the Catholics have been taught, I really don't look at it that way. I mean, once your life has ended, your shell will start to deteriorate regardless of whether it's in a tomb, in the ground, or cremated. I mean, that's about the extent of it."

"As I've gotten older, I've had some questions — not anything I'd discuss with a priest because a priest will fight you on it. But I have my own way of looking at life and death and, you know, I guess I'll find out one day."

His answer lingered with me long after the conversation ended. For someone who has spent decades in the presence of death, his view of it was neither especially mystical nor entirely clinical. Instead, it seemed shaped by proximity — by years of witnessing bodies, rituals, grief, and the slow deterioration of certainty itself.`,
  },
  {
    slug: "10-anime-characters-father-wound",
    title: "7 Anime Characters Struggling with the Father Wound",
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
