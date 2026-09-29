// ── Featured Edit ─────────────────────────────────────────────────────────────
// Paragraph arrays shown in the /editing reader overlay.
// `author` / `date` are optional; the byline skips whichever is unset.
// An empty `paragraphs` array shows a "coming soon" placeholder.

// `italicize` lists phrases (e.g. album titles) rendered in italics wherever they appear
export type ArticleVersion = { title: string; paragraphs: string[]; italicize?: string[] };

export type FeaturedEdit = {
  author?:     string;
  outlet:      string;
  date?:       string;
  original:    ArticleVersion;
  edited:      ArticleVersion;
};

export const FEATURED_EDIT: FeaturedEdit = {
  author: "Lupita",
  outlet: "KTSW 89.9",

  // Verbatim contributor draft — do not correct
  original: {
    title: "The Dark Side of the Moon Come to Life",
    paragraphs: [
      "Pink Floyds The Dark Side of the Moon album is arguably one of the most revolutionary psychedelic rock albums of all time. These 10 trippy tracks shaped the 70s and left a huge mark in its genre. It truly feels like it was ahead of its time. Its considerate lyrics and use of instruments never fail to amaze me. Thinking nothing could ever top listening to this album, I discovered listening AND seeing this album is 10 times better.",
      "Inside of Houstons Museum of Natural Science, there is a showing of The Dark Side of the Moon album in their planetarium. While listening to the album front to back you are seated looking up at the rounded planetarium with specific visuals with every color you can imagine. It is absolutely genius since the album already feels like you are listening to one giant song that flows perfectly down to the last one.",
      "Since a good amount of the album incorporates crazy synthesizers, the visuals just add that same amount of passionate energy into the whole show. From beginning to end the show is beautifully insane but when it came to the 7th song “Us and Them”, it was personally breathtaking. This song allowed the visuals to become softer with less saturated hues. Going along with the songs title, a visual that stood out to me was two floating blank faces staring at each other in space. Also, during this song, the screen showed more literal graphics that related to the lyrics. When you would hear “Up and down” it felt like the planetarium was turning because of the movements on the screen turning everything upside down; when you would hear “And in the end its only round ‘n round” there would be a pair of wings that circled the moon that was sitting on the ocean with a blue and pink sky in the background. These are just some examples that I am able to describe because most of what you see is hard to explain. It is mostly shapes and objects being resculpted, squished, or expanded but perfectly moving along with every lyric and every instrument you hear.",
      "Every time I travel to Houston, Texas I am always drawn to this Pink Floyd laser show. It is an experience that changed the way I hear the music and it keeps me going back. It brought to life the strange and colorful visuals you see in your mind while listening to songs like “Time” or “The Great Gig in the Sky” from this album. It's such a treat to take the time to hear the legendary The Dark Side of the Moon album in a captivating place like the full-dome Burke Baker Planetarium.",
    ],
  },

  edited: {
    title: "The Dark Side of the Moon: Come to Life",
    italicize: ["The Dark Side of the Moon"],
    paragraphs: [
      "Pink Floyd's The Dark Side of the Moon is a revolutionary album composed of ten trippy tracks that helped shape and define psychedelic rock in the 1970s. Known for being ahead of its time, thoughtful lyrics and kaleidoscopic instrumentation are hallmarks of the project, and they are nothing short of amazing. After my first listen, I believed the sonic experience this record curates could never be topped–until I discovered the Pink Floyd audio-visual laser show at the Houston Museum of Natural Science.",
      "Seated inside the Burke Baker Planetarium, you’re able to listen to The Dark Side of the Moon from start to finish while specially made visuals play out on the full-dome ceiling overhead. The show is imaginative, immersive, and absolutely genius. Since many songs feature crazy synthesizers, the colorful laser projections easily match the passionate energy of the album, and the seamless transitions between each track makes the record sound like one giant song.",
      "The majority of what you see is remarkably surreal and hard to explain, largely characterized by shapes and objects being resculpted, squished, or expanded in synchronization with every word and instrument. The experience brings to life the colorful abstractions you might envision in your mind while listening to tracks like “Time” or “The Great Gig in the Sky”.",
      "The seventh track, “Us and Them”, is especially breathtaking. Its imagery is noticeably softer with less saturated hues, and in keeping with the song’s title, it depicts two blank faces staring at one another as they float through space. The graphics also relate directly to the lyrics. For example, when you hear the words, “Up and down,” the screen literally turns upside down, giving the illusion that the planetarium is flipping in tandem with the lyrics. When you hear the line, “...and in the end, it's only round and round,” a pair of wings circle around the moon as it sits on the ocean horizon before a blue and pink sky.",
      "The Pink Floyd audio-visual laser show at the Burke Baker Planetarium changed the way I hear the music, and now, I hope to see it every time I travel to Houston. From beginning to end, the experience is beautifully insane, and as always, listening to the legendary work that is The Dark Side of the Moon is such a treat.",
    ],
  },
};
