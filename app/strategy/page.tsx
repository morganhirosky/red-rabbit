import React from "react";
import NavBar from "@/components/NavBar";
import TypewriterText from "@/components/TypewriterText";
import { ARGO84, ENTRE, ARGO, PROJECTS, type Img } from "@/src/data/strategy";

const MONO = '"Courier New", Courier, monospace';
const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';
const RED  = "#ff0055";
const PINK = "#ff8fb1";

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
const body: React.CSSProperties = { fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" };

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

// Retro window chrome, shared with the files page look
function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: FRAME, background: "#000" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "5px 10px", borderBottom: FRAME, fontFamily: MONO, fontSize: "11px", color: "rgba(255,255,255,0.55)",
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
      <ProjectHead n="01" title={p.title} tags={p.tags} summary={p.summary} />
      <div className="st-two" style={{ gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.4fr)" }}>

        {/* Storefront — opens the real shop */}
        <a href={p.shop.href} target="_blank" rel="noopener noreferrer" className="st-window-link" style={{ color: "inherit", textDecoration: "none" }}>
        <Window title="depop.com/argo84">
          <div style={{ padding: "18px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
              <div aria-hidden style={{ width: "54px", height: "54px", borderRadius: "50%", border: FRAME, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: "18px", color: RED }}>*</div>
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
          <div style={{ fontFamily: MONO, fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "10px" }}>[ visit shop ↗ ]</div>
        </a>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", minWidth: 0 }}>
          {/* Listings + the principle each one illustrates */}
          <div className="st-three">
            {p.listings.map((l, i) => (
              <div key={i} style={{ minWidth: 0 }}>
                <div style={{ border: FRAME, padding: "8px" }}>
                  <Slot src={l.img} alt={l.title} ratio="4 / 5" note="product photo" />
                  <div style={{ fontFamily: MONO, fontSize: "11px", lineHeight: 1.4, color: "rgba(255,255,255,0.75)", marginTop: "8px", minHeight: "3em" }}>{l.title}</div>
                </div>
                <h3 style={{ ...label, color: "#fff", margin: "16px 0 6px" }}>{p.principles[i].title}</h3>
                <p style={{ ...body, fontSize: "13px" }}>{p.principles[i].body}</p>
              </div>
            ))}
          </div>

          {/* Listing → sponsored ad */}
          <div className="st-ad" style={{ border: `1px solid ${PINK}55`, background: "rgba(255,143,177,0.05)", padding: "20px", display: "grid", gridTemplateColumns: "1.2fr 1fr auto 1fr", gap: "18px", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "15px", color: PINK, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.ad.title}</div>
              <p style={{ ...body, fontSize: "13px" }}>{p.ad.body}</p>
            </div>
            <Slot src={p.ad.listing} alt="Original listing photo: plaid mini skirt" ratio="1 / 1" note="listing photo" />
            <Arrow />
            <Slot src={p.ad.ad} alt="Sponsored Depop Instagram ad featuring the plaid mini skirt photo" ratio="900 / 1588" note="depop ad" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 02 · Entre ───────────────────────────────────────────────────────────────

// Decorative QR-style block pattern (not scannable) with the three finder squares,
// generated once from a fixed seed
const QR_ROWS = (() => {
  const N = 17;
  let seed = 7;
  const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [[0, 0], [0, N - 7], [N - 7, 0]]) {
      const y = r - fr, x = c - fc;
      if (y >= 0 && y < 7 && x >= 0 && x < 7) return y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4);
    }
    return null;
  };
  return Array.from({ length: N }, (_, r) =>
    Array.from({ length: N }, (_, c) => { const f = finder(r, c); return (f ?? rand() < 0.45) ? "██" : "  "; }).join(""),
  ).join("\n");
})();

function AsciiQR() {
  return <pre aria-hidden style={{ margin: 0, fontFamily: MONO, fontSize: "5px", lineHeight: 1, color: "#fff" }}>{QR_ROWS}</pre>;
}

function Entre() {
  const p = ENTRE;
  return (
    <section id={p.id} className="st-section">
      <ProjectHead n="02" title={p.title} tags={p.tags} />
      <div className="st-two" style={{ gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.4fr)" }}>

        {/* Problem → insight → idea */}
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          {p.steps.map((s, i) => (
            <li key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ border: i === 2 ? `1px solid ${RED}88` : FRAME, padding: "16px 18px", width: "100%" }}>
                <div style={{ ...label, color: i === 2 ? RED : "rgba(255,255,255,0.7)", marginBottom: s.title ? "4px" : "8px" }}>{s.label}</div>
                {s.title && <div style={{ fontFamily: MONO, fontSize: "14px", textTransform: "uppercase", marginBottom: "8px" }}>{s.title}</div>}
                <p style={{ ...body, fontSize: "13px" }}>{s.body}</p>
              </div>
              {i < p.steps.length - 1 && <div style={{ padding: "6px 0" }}><Arrow down /></div>}
            </li>
          ))}
        </ol>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
          <div className="st-matches">
            {/* Landscape boxes stacked, portrait box beside them */}
            <div className="st-match-stack">
              {p.mockups.filter(m => m.orient === "landscape").map(m => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={m.src} src={m.src} alt={m.alt} style={{ width: "100%", display: "block" }} />
              ))}
            </div>
            {p.mockups.filter(m => m.orient === "portrait").map(m => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.src} src={m.src} alt={m.alt} className="st-match-tall" style={{ width: "100%", display: "block" }} />
            ))}
            {/* QR card */}
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ flex: 1, aspectRatio: "3 / 4", border: FRAME, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center" }}>
                <span style={{ fontSize: "12px", lineHeight: 1.4, color: "rgba(255,255,255,0.75)" }}>{p.qrCard.map(l => <span key={l} style={{ display: "block" }}>{l}</span>)}</span>
                <AsciiQR />
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>entre</span>
              </div>
            </div>
          </div>

          {/* Campaign logic */}
          <div className="st-flow" style={{ border: FRAME, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
            {p.flow.map((f, i) => (
              <React.Fragment key={f}>
                <span style={{ fontFamily: MONO, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: i === p.flow.length - 1 ? RED : "rgba(255,255,255,0.8)" }}>{f}</span>
                {i < p.flow.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </div>
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Strategy() {
  return (
    <main style={{
      width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column",
      color: "#fff", fontFamily: SANS, overflow: "hidden",
    }}>
      <style>{`
        .st-section { padding: 56px 0; border-bottom: ${RULE}; scroll-margin-top: 16px; }
        .st-two     { display: grid; gap: 32px; align-items: start; }
        .st-three   { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .st-matches { display: grid; grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: center; }
        .st-match-stack { display: flex; flex-direction: column; gap: 18px; }
        .st-arrow::before      { content: "\\2192"; }
        .st-arrow-down::before { content: "\\2193"; }
        .st-chip { font-family: ${MONO}; font-size: 13px; letter-spacing: 0.06em; color: rgba(255,255,255,0.88); text-decoration: none; white-space: nowrap; transition: color 0.15s; }
        .st-chip:hover { color: #fff; }
        .st-window-link:hover img { filter: brightness(1.1); }

        @media (max-width: 1000px) {
          .st-two { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .st-pad     { padding-left: 20px !important; padding-right: 20px !important; }
          .st-head    { gap: 16px !important; }
          .st-three   { grid-template-columns: 1fr; }
          .st-matches { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .st-match-stack { grid-column: 1 / -1; }
          .st-ad      { grid-template-columns: 1fr 1fr !important; }
          .st-ad > div:first-child { grid-column: 1 / -1; }
          .st-ad .st-arrow { display: none; }
          .st-flow    { justify-content: center !important; }
        }
      `}</style>

      <NavBar activePath="/strategy" />

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <div className="st-pad" style={{ maxWidth: "1328px", margin: "0 auto", padding: "56px 64px 80px" }}>

          {/* Hero */}
          <section style={{ paddingBottom: "40px", borderBottom: RULE }}>
            <h1 style={{ fontSize: "clamp(48px, 7vw, 104px)", fontWeight: 200, letterSpacing: "0.08em", lineHeight: 1, marginBottom: "32px" }}>
              <TypewriterText text="strategy" />
            </h1>
            <nav aria-label="Projects" style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
              {PROJECTS.map(p => <a key={p.id} href={`#${p.id}`} className="st-chip">[ {p.chip} ]</a>)}
            </nav>
          </section>

          <Argo84 />
          <Entre />
          <Argo />
        </div>
      </div>
    </main>
  );
}
