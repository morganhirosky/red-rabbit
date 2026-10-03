import React from "react";
import NavBar from "@/components/NavBar";
import TypewriterText from "@/components/TypewriterText";
import { Roboto } from "next/font/google";
import { ARGO84, ENTRE as ENTRE_DATA, ARGO, PROJECTS, type Img } from "@/src/data/strategy";

const MONO = '"Courier New", Courier, monospace';
// Roboto for this page's sections: Thin (100) for body text, heavier weights for labels and bold headings
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "500", "700"] });
const SANS = roboto.style.fontFamily;
const RED  = "#ff0055";
const BLUE = "#8bb9cd";   // backdrop blue from the plaid skirt listing (#74a1b6), brightened

const RULE  = "1px solid rgba(255,255,255,0.08)";
const FRAME = "1px solid rgba(255,255,255,0.14)";

const label: React.CSSProperties = {
  fontFamily:    SANS,
  fontSize:      "11px",
  fontWeight:    300,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color:         "rgba(255,255,255,0.40)",
};
const body: React.CSSProperties = { fontSize: "14px", fontWeight: 100, letterSpacing: "0.02em", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" };

// ── Building blocks ──────────────────────────────────────────────────────────

// Photo, or a labeled empty frame until one is added in src/data/strategy.ts
function Slot({ src, alt, ratio = "1 / 1", note = "image" }: { src: Img; alt: string; ratio?: string; note?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} style={{ width: "100%", aspectRatio: ratio, objectFit: "cover", display: "block", border: FRAME }} />
  ) : (
    <div role="img" aria-label={alt} style={{
      width: "100%", aspectRatio: ratio, border: "1px dashed rgba(255,255,255,0.18)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: MONO, fontSize: "11px", color: "rgba(255,255,255,0.28)", textAlign: "center", padding: "6px",
    }}>
      [ {note} ]
    </div>
  );
}

// Opens an image full size in a new tab (plain wrapper when there's no image yet)
function FullSize({ src, children }: { src: Img; children: React.ReactNode }) {
  return src ? (
    <a href={src} target="_blank" rel="noopener noreferrer" className="st-window-link" title="open full size" style={{ display: "block", minWidth: 0, cursor: "zoom-in" }}>{children}</a>
  ) : <div style={{ minWidth: 0 }}>{children}</div>;
}

// Retro window chrome, shared with the files page look
function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: FRAME, background: "#000" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderBottom: FRAME, fontFamily: MONO, fontSize: "12px", color: "rgba(255,255,255,0.55)",
      }}>
        <span aria-hidden>o o o</span>
        <span>{title}</span>
        <span aria-hidden>_ □ ✕</span>
      </div>
      {children}
    </div>
  );
}

function ProjectHead({ n, title, tags, summary }: { n: string; title: string; tags: string[]; summary?: string }) {
  return (
    <header className="st-head" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "28px", alignItems: "start", marginBottom: "36px" }}>
      <span style={{ fontFamily: MONO, fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 0.9, color: "rgba(255,255,255,0.30)" }}>{n}</span>
      <div>
        <h2 style={{ fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 300, lineHeight: 1.2, marginBottom: "10px" }}>{title}</h2>
        <div style={{ ...label, letterSpacing: "0.1em", marginBottom: summary ? "14px" : 0 }}>{tags.join("  ·  ")}</div>
        {summary && <p style={{ ...body, maxWidth: "640px" }}>{summary}</p>}
      </div>
    </header>
  );
}

function Arrow({ down }: { down?: boolean }) {
  return <span aria-hidden className={down ? "st-arrow-down" : "st-arrow"} style={{ fontFamily: MONO, color: "rgba(255,255,255,0.40)" }} />;
}

// ── 01 · argo84 ──────────────────────────────────────────────────────────────

function Argo84() {
  const p = ARGO84;
  return (
    <section id={p.id} className="st-section">
      {/* Header sits in the left column so the storefront's top lines up with the title */}
      {/* Both columns stretch to the same height; the listings spread out so the last photo's bottom
          meets the storefront window's bottom */}
      <div className="st-two" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <ProjectHead n="01" title={p.title} tags={p.tags} summary={p.summary} />
          {/* Listings stacked; each photo on the left with the principle it illustrates beside it.
              Capped so the text ends where the header summary does: the "01" (two Courier glyphs,
              0.6em each, at the header's number size) + 28px gap + the summary's 640px max width */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", maxWidth: "calc(1.2 * clamp(40px, 5vw, 56px) + 28px + 640px)" }}>
            {p.listings.map((l, i) => (
              <div key={i} className="st-listing">
                <div style={{ border: FRAME, padding: "8px", minWidth: 0 }}>
                  <Slot src={l.img} alt={l.title} ratio="1 / 1" note="product photo" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ ...label, fontSize: "15px", color: "#fff", marginBottom: "8px" }}>{p.principles[i].title}</h3>
                  <p style={{ ...body, fontSize: "16px" }}>{p.principles[i].body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storefront — opens the real shop */}
        <a href={p.shop.href} target="_blank" rel="noopener noreferrer" className="st-window-link" style={{ color: "inherit", textDecoration: "none", position: "relative", alignSelf: "start" }}>
        <Window title="depop.com/argo84">
          <div style={{ padding: "18px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.shop.avatar} alt="" aria-hidden style={{ width: "54px", height: "54px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }} />
              <div>
                <div style={{ fontSize: "18px", fontWeight: 300 }}>{p.shop.handle}</div>
                <p style={{ ...body, fontSize: "13px" }}>{p.shop.tagline}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
              {p.shop.grid.map((src, i) => <Slot key={i} src={src} alt={`argo84 listing ${i + 1}`} note="listing" />)}
            </div>
          </div>
        </Window>
          {/* Hangs below the window without adding height, so the window's bottom is the column's bottom */}
          <div style={{ position: "absolute", top: "100%", left: 0, fontFamily: MONO, fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "10px", whiteSpace: "nowrap" }}>[ visit shop ↗ ]</div>
        </a>
      </div>
      {/* Photo → listing → sponsored ad. Full width so the screenshots stay readable; each opens full size.
          flex-grow follows each image's aspect ratio, so they all render uncropped at the same height */}
      <div style={{ marginTop: "72px", border: `1px solid ${BLUE}`, background: "rgba(139,185,205,0.06)", padding: "20px" }}>
        <div style={{ ...label, fontSize: "22px", fontWeight: 600, color: "#fff", marginBottom: "20px", textAlign: "center" }}>{p.ad.title}</div>
        <div className="st-ad">
          {p.ad.images.map(im => (
            <React.Fragment key={im.src}>
              <figure className="st-ad-fig" style={{ flex: `${im.width ?? im.w / im.h} 1 0`, margin: 0 }}>
                {/* A headed image puts its caption on top, sized like the screenshot header bar beside it */}
                {im.header && <figcaption style={{ ...label, fontSize: "13px", fontWeight: 600, color: BLUE, border: `1px solid ${BLUE}`, padding: "0 10px", aspectRatio: im.header, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", boxSizing: "border-box" }}>{im.caption}</figcaption>}
                <FullSize src={im.src}><Slot src={im.src} alt={im.alt} ratio={`${im.w} / ${im.h}`} note={im.caption} /></FullSize>
                {!im.header && <figcaption className="st-ad-cap" style={{ ...label, fontSize: im.highlight ? "12px" : "13px", letterSpacing: im.highlight ? "0.08em" : label.letterSpacing, fontWeight: 600, color: im.highlight ? RED : BLUE, border: `1px solid ${im.highlight ? RED : BLUE}`, background: im.highlight ? "rgba(255,0,85,0.08)" : undefined, padding: "8px 10px", marginTop: "10px", lineHeight: 1.4, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>{im.caption}</figcaption>}
                {im.excerpt && <p style={{ ...body, fontSize: "15px", color: "#fff", marginTop: "14px", textAlign: "justify", hyphens: "auto" }} lang="en">{im.excerpt}</p>}
              </figure>
              {im.arrowAfter && <div className="st-ad-arrow"><Arrow /></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 02 · Entre ───────────────────────────────────────────────────────────────

// Entre's green, sampled from the matchbox lettering; used for the section's text and boxes
const ENTRE = { green: "#9fcfa0", gray: "#a49db8" };   // gray: purple-gray from the site's small print

// Width/height of each matchbox-row column. The stack is two 1000px-wide boxes (515 + 517 tall)
// with a gap of STACK_GAP × its width, set as a % margin so it scales with the images
const STACK_GAP = 0.036;
const MATCH_RATIO = {
  stack:    1 / (515 / 1000 + 517 / 1000 + STACK_GAP),
  portrait: 504 / 975,
  site:     999 / 1975,
};

function Entre() {
  const p = ENTRE_DATA;
  const [problem, ask, proposal] = p.steps;
  const H3: React.CSSProperties = { ...label, fontSize: "15px", fontWeight: 600, color: ENTRE.green, marginBottom: "8px" };
  const P: React.CSSProperties = { ...body, fontSize: "16px", color: "#fff", textAlign: "justify", hyphens: "auto" };
  // Unboxed text is inset to line up with the text inside the boxes
  const INSET = "0 19px";
  return (
    <section id={p.id} className="st-section st-entre" lang="en">
      <ProjectHead n="02" title={p.title} tags={p.tags} />
      {/* Two rows: concept / problem / ask beside the images, then the proposal beside the approach,
          so those two boxes always start at the same height */}
      <div className="st-two" style={{ gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.4fr)", rowGap: "14px", alignItems: "stretch" }}>

        {/* Stretched to the images' height: the concept sits at the top beside them, and the
            problem → ask chain sits at the bottom so its last arrow leads into the proposal box */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px" }}>
          <div style={{ padding: INSET }}>
            <h3 style={H3}>what is Entre?</h3>
            <p style={P}>{p.concept}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[problem, ask].map(st => (
              <React.Fragment key={st.label}>
                <div style={{ padding: INSET }}>
                  <h3 style={H3}>{st.label}</h3>
                  <p style={P}>{st.body}</p>
                </div>
                <div className="st-entre-arrow"><Arrow down /></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="st-matches">
          {/* Waitlist screenshot and the portrait box sandwich the stacked landscape boxes. Each column's
              flex-grow is its width/height ratio, so all three come out exactly the same height */}
          {/* Waitlist screenshot, links to the live site; the label hangs above without adding height */}
          <a href={p.site.href} target="_blank" rel="noopener noreferrer" className="st-window-link" style={{ flex: `${MATCH_RATIO.site} 1 0`, minWidth: 0, position: "relative", color: "inherit", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.site.img} alt={p.site.alt} style={{ width: "100%", display: "block" }} />
            <div style={{ position: "absolute", bottom: "100%", left: 0, right: 0, textAlign: "center", fontFamily: MONO, fontSize: "13px", color: ENTRE.gray, marginBottom: "8px", whiteSpace: "nowrap" }}>[ visit site <span style={{ fontSize: "1.35em", lineHeight: 0 }}>↓</span> ]</div>
          </a>
          <div className="st-match-stack" style={{ flex: `${MATCH_RATIO.stack} 1 0` }}>
            {p.mockups.filter(m => m.orient === "landscape").map((m, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.src} src={m.src} alt={m.alt} style={{ width: "100%", display: "block", marginTop: i ? `${STACK_GAP * 100}%` : 0 }} />
            ))}
          </div>
          {p.mockups.filter(m => m.orient === "portrait").map(m => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={m.src} src={m.src} alt={m.alt} className="st-match-tall" style={{ flex: `${MATCH_RATIO.portrait} 1 0`, minWidth: 0, display: "block" }} />
          ))}
        </div>

        <div style={{ border: `1px solid ${ENTRE.green}`, padding: "16px 18px", minWidth: 0 }}>
          <h3 style={H3}>{proposal.label}: {proposal.title}</h3>
          <p style={P}>{proposal.body}</p>
        </div>

        {/* Approach split into its own boxes, side by side, so three boxes run across this row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px", minWidth: 0 }} className="st-entre-approach">
          {p.approach.map(a => (
            <div key={a.label} style={{ border: `1px solid ${ENTRE.green}`, padding: "16px 18px", minWidth: 0 }}>
              <h3 style={H3}>{a.label}</h3>
              <p style={P}>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 03 · Argo ────────────────────────────────────────────────────────────────

function Argo() {
  const p = ARGO;
  return (
    <section id={p.id} className="st-section" style={{ borderBottom: "none" }}>
      <ProjectHead n="03" title={p.title} tags={p.tags} />
      <div className="st-two" style={{ gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 0.7fr)" }}>

        <a href={p.href} target="_blank" rel="noopener noreferrer" className="st-window-link" style={{ color: "inherit", textDecoration: "none" }}>
          <Window title="argo">
            <Slot src={p.preview} alt="Argo storefront" ratio="4 / 3" note="site preview" />
          </Window>
          <div style={{ fontFamily: MONO, fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "10px" }}>[ visit site ↗ ]</div>
        </a>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ ...label, color: "#fff", marginBottom: "8px" }}>the concept</h3>
          <p style={{ ...body, marginBottom: "22px" }}>{p.concept}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {p.thumbs.map((src, i) => <Slot key={i} src={src} alt={`Argo detail ${i + 1}`} note="detail" />)}
          </div>
        </div>

        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ border: `1px solid ${RED}88`, padding: "16px 18px" }}>
            <h3 style={{ fontFamily: MONO, fontSize: "15px", color: RED, marginBottom: "8px" }}>edax</h3>
            <p style={{ ...body, fontSize: "13px" }}>{p.edax}</p>
          </div>
          <div>
            <h3 style={{ ...label, color: "#fff", marginBottom: "8px" }}>exploration</h3>
            <p style={{ ...body, fontSize: "13px" }}>{p.exploration}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sections kept in the code but not shown yet (by project id)
const HIDDEN = ["argo"];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Strategy() {
  return (
    <main style={{
      width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column",
      color: "#fff", fontFamily: SANS, overflow: "hidden",
    }}>
      <style>{`
        .st-section { padding: 56px 0; border-bottom: ${RULE}; scroll-margin-top: 16px; }
        .st-section:last-of-type { border-bottom: none; }
        .st-two     { display: grid; gap: 32px; align-items: start; }
        .st-listing { display: grid; grid-template-columns: minmax(0, 0.41fr) minmax(0, 1fr); gap: 24px; align-items: center; }
        .st-matches { display: flex; gap: 20px; align-items: flex-start; }
        .st-match-stack { min-width: 0; }
        .st-arrow::before      { content: "\\2192"; }
        .st-arrow-down::before { content: "\\2193"; }
        .st-chip { font-family: ${MONO}; font-size: 13px; letter-spacing: 0.06em; color: rgba(255,255,255,0.88); text-decoration: none; white-space: nowrap; transition: color 0.15s; }
        .st-chip:hover { color: #fff; }
        .st-window-link:hover img { filter: brightness(1.1); }
        .st-entre .st-arrow-down { color: #9fcfa0 !important; }
        .st-entre-arrow { text-align: center; font-size: 30px; line-height: 1; }
        /* Captions share one height so the arrows can center on the images above them */
        .st-ad       { display: flex; align-items: flex-start; gap: 14px; }
        .st-ad-fig   { min-width: 0; }
        .st-ad-cap   { min-height: calc(3 * 1.4 * 11px + 18px); }
        .st-ad-arrow { align-self: stretch; display: flex; align-items: center; padding-bottom: calc(3 * 1.4 * 11px + 28px); font-size: 32px; }
        .st-ad-arrow span { color: rgba(255,255,255,0.7) !important; }

        @media (max-width: 1000px) {
          .st-two { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .st-pad     { padding-left: 20px !important; padding-right: 20px !important; }
          .st-head    { gap: 16px !important; }
          .st-listing { grid-template-columns: minmax(0, 0.45fr) minmax(0, 1fr); gap: 16px; }
          .st-matches { flex-wrap: wrap; row-gap: 32px; }
          .st-entre-approach { grid-template-columns: 1fr !important; }
          .st-match-stack { flex-basis: 100% !important; order: -1; }
          .st-ad       { flex-wrap: wrap; row-gap: 20px; }
          .st-ad-fig   { min-width: 40%; }
          .st-ad-arrow { display: none !important; }
        }
      `}</style>

      <NavBar activePath="/strategy" />

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <div className="st-pad" style={{ maxWidth: "1528px", margin: "0 auto", padding: "56px 64px 80px" }}>

          {/* Hero */}
          <section style={{ paddingBottom: "40px", borderBottom: RULE }}>
            <h1 style={{ fontSize: "clamp(48px, 7vw, 104px)", fontWeight: 200, letterSpacing: "0.08em", lineHeight: 1, marginBottom: "32px" }}>
              <TypewriterText text="strategy" />
            </h1>
            <nav aria-label="Projects" style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
              {PROJECTS.filter(p => !HIDDEN.includes(p.id)).map(p => <a key={p.id} href={`#${p.id}`} className="st-chip">[ {p.chip} ]</a>)}
            </nav>
          </section>

          <Argo84 />
          <Entre />
          {!HIDDEN.includes("argo") && <Argo />}
        </div>
      </div>
    </main>
  );
}
