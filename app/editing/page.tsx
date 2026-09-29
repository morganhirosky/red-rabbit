import React, { Suspense } from "react";
import NavBar from "@/components/NavBar";
import AsciiScene from "@/components/AsciiScene";
import ReaderOverlay, { ReaderLink } from "@/components/ReaderOverlay";
import TypewriterText from "@/components/TypewriterText";
import { FEATURED_EDIT } from "@/src/data/editing";

const MONO = '"Courier New", Courier, monospace';
const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';

const RULE  = "1px solid rgba(255,255,255,0.08)";
const FAINT = "1px solid rgba(255,255,255,0.06)";

const DSOTM = <em>The Dark Side of the Moon</em>;

type Panel = { label: string; body: React.ReactNode };
type Edit  = { title: string; before: Panel; after: Panel; note: React.ReactNode };

const EDITS: Edit[] = [
  {
    title:   "structure",
    before: { label: "original order", body: <ol>{["Overall experience", "Synthesizers", "“Us and Them”", "General visual description"].map(s => <li key={s}>{s}</li>)}</ol> },
    after:  { label: "edited order",   body: <ol>{["Overall experience", "General visual description", "“Us and Them”", "Specific visual examples"].map(s => <li key={s}>{s}</li>)}</ol> },
    note: <>I moved the broader description of the show&rsquo;s visual language ahead of the &ldquo;Us and Them&rdquo; discussion, allowing the article to progress from the overall experience to a specific standout moment.</>,
  },
  {
    title:   "clarity & specificity",
    before: { label: "before", body: <>&ldquo;While listening to the album front to back you are seated looking up at the rounded planetarium with specific visuals with every color you can imagine.&rdquo;</> },
    after:  { label: "after",  body: <>&ldquo;Seated inside the Burke Baker Planetarium, you&rsquo;re able to listen to {DSOTM} from start to finish while specially made visuals play out on the full-dome ceiling overhead.&rdquo;</> },
    note: <>I replaced vague spatial descriptions with specific details about the venue and full-dome format while restructuring the sentence for clarity.</>,
  },
  {
    title:   "focus",
    before: { label: "before (opening)", body: <>&ldquo;&hellip;Its considerate lyrics and use of instruments never fail to amaze me. Thinking nothing could ever top listening to this album, I discovered listening AND seeing this album is 10 times better.&rdquo;</> },
    after:  { label: "after (opening)",  body: <>&ldquo;&hellip;From my first listen, I felt like the experience this record creates could never be topped&mdash;until I discovered the Pink Floyd audio-visual laser show at the Houston Museum of Natural Science.&rdquo;</> },
    note: <>The original introduction established the writer&rsquo;s enthusiasm for the album but delayed the article&rsquo;s central subject. I condensed the background and restructured the paragraph to transition directly into the planetarium experience.</>,
  },
  {
    title:   "voice",
    before: { label: "before", body: <>&ldquo;Since a good amount of the album incorporates crazy synthesizers, the visuals just add that same amount of passionate energy into the whole show.&rdquo;</> },
    after:  { label: "after",  body: <>&ldquo;Since many songs feature crazy synthesizers, the colorful laser projections easily match the passionate energy of the album&hellip;&rdquo;</> },
    note: <>I kept the writer&rsquo;s phrasing, &ldquo;crazy synthesizers&rdquo; and &ldquo;passionate energy,&rdquo; to maintain their original voice and writing idiosyncrasies. I expanded overly generalized wording to avoid redundancy and improve substance.</>,
  },
];

const EXPERIENCE = [
  { org: "KTSW 89.9",     body: "Edited and developed work from journalists across music, culture, and long-form editorial coverage; managed editorial workflows and mentored contributing writers." },
  { org: "Texas Senate",  body: "Edit and proofread legislative and ceremonial documents for accuracy, consistency, grammar, and adherence to institutional style." },
  { org: "Freelance",     body: "Manuscript and editorial work across long-form and digital content, including features, creative nonfiction, and fiction." },
];

const label: React.CSSProperties = {
  fontFamily:    SANS,
  fontSize:      "11px",
  fontWeight:    300,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color:         "rgba(255,255,255,0.40)",
};

// "label ───────" header used to open each section
function SectionHead({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
      <span style={{ ...label, color: "rgba(255,255,255,0.70)", whiteSpace: "nowrap" }}>{children}</span>
      <span style={{ flex: 1, borderTop: RULE }} />
      {aside && <span className="ed-aside" style={{ fontSize: "12px", fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>{aside}</span>}
    </div>
  );
}

function EditCard({ edit, n }: { edit: Edit; n: number }) {
  const panel = (p: Panel) => (
    <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: FAINT, padding: "16px 18px" }}>
      <div style={{ ...label, fontSize: "10px", marginBottom: "10px" }}>{p.label}</div>
      <div className="ed-panel" style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}>{p.body}</div>
    </div>
  );

  return (
    <article style={{ border: RULE, padding: "28px 28px 26px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <header style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
        <span style={{ fontFamily: MONO, fontSize: "20px", color: "rgba(255,255,255,0.35)" }}>{String(n).padStart(2, "0")}</span>
        <h3 style={{ ...label, fontSize: "13px", color: "#fff" }}>{edit.title}</h3>
      </header>

      <div className="ed-compare">
        {panel(edit.before)}
        <span className="ed-arrow" aria-hidden style={{ fontFamily: MONO, color: "rgba(255,255,255,0.40)" }} />
        {panel(edit.after)}
      </div>

      <div style={{ marginTop: "auto" }}>
        <div style={{ ...label, fontSize: "10px", marginBottom: "6px" }}>editor&rsquo;s note</div>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" }}>{edit.note}</p>
      </div>
    </article>
  );
}

export default function Editing() {
  return (
    <main style={{
      width:         "100vw",
      height:        "100vh",
      background:    "#000",
      display:       "flex",
      flexDirection: "column",
      color:         "#fff",
      fontFamily:    SANS,
      overflow:      "hidden",
    }}>
      <style>{`
        .ed-hero     { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 32px; }
        .ed-featured { display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; align-items: center; }
        .ed-grid     { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ed-exp      { display: grid; grid-template-columns: repeat(3, 1fr); }
        .ed-exp > div + div { border-left: ${RULE}; }
        .ed-compare  { display: flex; align-items: stretch; gap: 14px; }
        .ed-arrow    { align-self: center; }
        .ed-arrow::before { content: "\\2192"; }
        .ed-panel ol { list-style: none; counter-reset: n; }
        .ed-panel li { counter-increment: n; }
        .ed-panel li::before { content: counter(n) ". "; color: rgba(255,255,255,0.35); font-family: ${MONO}; font-size: 12px; }
        .ed-panel em { font-style: italic; }
        .ed-art { display: flex; justify-content: center; overflow: hidden; }

        @media (max-width: 1100px) {
          .rd-wide-only { display: none; }
        }
        @media (max-width: 900px) {
          .ed-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .ed-hero, .ed-featured { grid-template-columns: 1fr; gap: 28px; }
          .ed-hero .ed-art { order: -1; }
          .ed-featured .ed-art { order: 1; }   /* text between the moon and the planetarium */
          .ed-exp { grid-template-columns: 1fr; }
          .ed-exp > div + div { border-left: none; border-top: ${RULE}; }
          .ed-exp > div { padding: 16px 0 !important; }
          .ed-compare { flex-direction: column; align-items: stretch; }
          .ed-arrow { align-self: center; }
          .ed-arrow::before { content: "\\2193"; }
          .ed-aside { display: none; }
          .ed-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <NavBar activePath="/editing" />

      {/* useSearchParams needs a Suspense boundary for static rendering */}
      <Suspense fallback={null}>
        <ReaderOverlay edit={FEATURED_EDIT} />
      </Suspense>

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

        {/* ── Hero ── */}
        {/* Equal top/bottom padding + grid centering keeps the title midway between the two rules */}
        <section className="ed-pad" style={{ padding: "48px 64px", borderBottom: RULE }}>
          <div className="ed-hero" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{
              fontSize:      "clamp(48px, 7vw, 104px)",
              fontWeight:    200,
              letterSpacing: "0.08em",
              lineHeight:    1,
            }}>
              <TypewriterText text="editing" />
            </h1>
            <div className="ed-art">
              <AsciiScene variant="moon" cols={70} rows={26} />
            </div>
          </div>
        </section>

        <div className="ed-pad" style={{ maxWidth: "1328px", margin: "0 auto", padding: "56px 64px 80px" }}>

          {/* ── Featured edit ── */}
          <section className="ed-featured" style={{ marginBottom: "72px" }}>
            <div className="ed-art" style={{ border: RULE, padding: "20px 12px" }}>
              <AsciiScene variant="dome" cols={64} rows={30} opacity={0.75} />
            </div>
            <div>
              <SectionHead>featured edit</SectionHead>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, lineHeight: 1.15, marginBottom: "14px" }}>
                The Dark Side of the Moon: Come to Life
              </h2>
              <div style={{ ...label, marginBottom: "12px" }}>music &amp; culture</div>
              <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.70)", marginBottom: "18px" }}>
                Developmental Editing &middot; Line Editing &middot; Copyediting
              </div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.60)", marginBottom: "28px", maxWidth: "560px" }}>
                A retrospective edit of a music feature originally written by a KTSW 89.9 contributor. The edit focused on restructuring the piece, strengthening its introduction and transitions, improving clarity and specificity, and preserving the writer&rsquo;s enthusiastic first-person voice.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
                <ReaderLink view="original">original</ReaderLink>
                <ReaderLink view="soft">soft edit</ReaderLink>
                <ReaderLink view="hard">hard edit</ReaderLink>
                <ReaderLink view="compare" wideOnly>compare versions</ReaderLink>
              </div>
            </div>
          </section>

          {/* ── Selected edits ── */}
          <section style={{ marginBottom: "72px" }}>
            <SectionHead aside="Four examples highlighting structural, line, and copy edits.">selected edits</SectionHead>
            <div className="ed-grid">
              {EDITS.map((e, i) => <EditCard key={e.title} edit={e} n={i + 1} />)}
            </div>
          </section>

          {/* ── Editorial experience ── */}
          <section>
            <SectionHead>editorial experience</SectionHead>
            <div className="ed-exp">
              {EXPERIENCE.map(x => (
                <div key={x.org} style={{ padding: "8px 28px 16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 300, marginBottom: "8px" }}>{x.org}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>{x.body}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
