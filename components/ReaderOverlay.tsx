"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AsciiScene from "@/components/AsciiScene";
import type { ArticleVersion, FeaturedEdit } from "@/src/data/editing";

const MONO = '"Courier New", Courier, monospace';
const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';
const RULE = "1px solid rgba(255,255,255,0.08)";

type VersionKey = "original" | "soft" | "hard";
export type ReaderView = VersionKey | "compare";
const VERSIONS: VersionKey[] = ["original", "soft", "hard"];
const VIEWS: ReaderView[] = [...VERSIONS, "compare"];
const NAMES: Record<ReaderView, string> = {
  original: "original",
  soft:     "soft edit",
  hard:     "hard edit",
  compare:  "compare",
};
const TITLES: Record<ReaderView, string> = {
  original: "original article",
  soft:     "soft edit",
  hard:     "hard edit",
  compare:  "compare versions",
};
// One accent per version, used only on labels, tab underlines and rules:
// gray for the draft, soft pink for the light edit, the site red for the hard edit
const ACCENT: Record<ReaderView, string> = {
  original: "rgba(255,255,255,0.45)",
  soft:     "#ff8fb1",
  hard:     "#ff0055",
  compare:  "#fff",
};
// Old links from before the soft edit existed
const LEGACY: Record<string, ReaderView> = { edited: "hard" };

// True when the overlay was opened by a click on this page, so closing can
// step back through history instead of stacking a new entry. A direct visit
// to /editing?view=… leaves it false and closing replaces the URL instead.
let openedInApp = false;

// `[ label ]` link that opens the overlay at a given view
// `wideOnly` hides the link where side-by-side compare isn't available
export function ReaderLink({ view, wideOnly, children }: { view: ReaderView; wideOnly?: boolean; children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  return (
    <button
      className={wideOnly ? "rd-link rd-wide-only" : "rd-link"}
      onClick={() => { openedInApp = true; router.push(`${pathname}?view=${view}`, { scroll: false }); }}
      style={{
        fontFamily:    MONO,
        fontSize:      "13px",
        letterSpacing: "0.06em",
        color:         "rgba(255,255,255,0.88)",
        background:    "none",
        border:        "none",
        padding:       0,
        whiteSpace:    "nowrap",
        transition:    "color 0.15s",
      }}
    >
      [ {children} ]
    </button>
  );
}

const label: React.CSSProperties = {
  fontFamily:    SANS,
  fontSize:      "11px",
  fontWeight:    300,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color:         "rgba(255,255,255,0.40)",
};

// Wraps each occurrence of the version's `italicize` phrases in <em>
function withItalics(text: string, phrases: string[] = []): React.ReactNode {
  if (phrases.length === 0) return text;
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, i) =>
    phrases.includes(part) ? <em key={i}>{part}</em> : part,
  );
}

function Paragraphs({ version, name, size = 17 }: { version: ArticleVersion; name: string; size?: number }) {
  if (version.paragraphs.length === 0) {
    return (
      <p style={{ fontFamily: MONO, fontSize: "14px", color: "rgba(255,255,255,0.40)" }}>
        &gt; {name} coming soon
        <span style={{ animation: "blink 1s step-start infinite" }}>_</span>
      </p>
    );
  }
  return (
    <>
      {version.paragraphs.map((p, i) => (
        <p key={i} style={{ fontSize: `${size}px`, lineHeight: 1.8, color: "rgba(255,255,255,0.80)", marginBottom: "1.2em" }}>
          {withItalics(p, version.italicize)}
        </p>
      ))}
    </>
  );
}

function Article({ version, name, byline, accent }: { version: ArticleVersion; name: string; byline: string; accent: string }) {
  return (
    <article style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, lineHeight: 1.15, marginBottom: "12px" }}>
        {withItalics(version.title, version.italicize)}
      </h2>
      <div style={{ ...label, letterSpacing: "0.08em", marginBottom: "24px" }}>{byline}</div>
      <div style={{ borderTop: `1px solid ${accent}`, opacity: 0.7, marginBottom: "32px" }} />
      <div className="rd-art" style={{ float: "right", margin: "4px 0 16px 28px", border: RULE, padding: "10px 6px" }}>
        <AsciiScene variant="dome" cols={40} rows={18} fontSize="7px" opacity={0.6} />
      </div>
      <Paragraphs version={version} name={name} />
    </article>
  );
}

// All three versions: side by side in columns, or one at a time with a switcher
function Compare({ edit, mode }: { edit: FeaturedEdit; mode: "side" | "toggle" }) {
  const [shown, setShown] = useState<VersionKey>("original");

  if (mode === "side") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {VERSIONS.map((v, i) => (
          <div key={v} style={{ minWidth: 0, padding: "0 28px", ...(i > 0 && { borderLeft: RULE }), ...(i === 0 && { paddingLeft: 0 }), ...(i === 2 && { paddingRight: 0 }) }}>
            <div style={{ borderTop: `2px solid ${ACCENT[v]}`, width: "28px", marginBottom: "12px" }} />
            <div style={{ ...label, color: ACCENT[v], marginBottom: "20px" }}>{NAMES[v]}</div>
            <Paragraphs version={edit[v]} name={NAMES[v]} size={15} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "28px" }}>
        {VERSIONS.map(v => (
          <Bracket key={v} active={shown === v} accent={ACCENT[v]} onClick={() => setShown(v)}>{NAMES[v]}</Bracket>
        ))}
      </div>
      <Paragraphs version={edit[shown]} name={NAMES[shown]} />
    </div>
  );
}

// Nav-style toggle: active option renders as [label]
function Bracket({ active, onClick, accent = "#fff", children }: { active: boolean; onClick: () => void; accent?: string; children: string }) {
  return (
    <button onClick={onClick} aria-pressed={active} style={{
      fontFamily:    SANS,
      fontSize:      "13px",
      letterSpacing: "0.06em",
      color:         active ? accent : "rgba(255,255,255,0.40)",
      background:    "none",
      border:        "none",
      padding:       0,
      transition:    "color 0.15s",
    }}>
      {active ? `[${children}]` : children}
    </button>
  );
}

export default function ReaderOverlay({ edit }: { edit: FeaturedEdit }) {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const param    = params.get("view");
  const asked    = VIEWS.includes(param as ReaderView) ? (param as ReaderView) : param ? LEGACY[param] ?? null : null;

  const [mode, setMode]     = useState<"side" | "toggle">("side");
  const [narrow, setNarrow] = useState(false);
  // Client-only: a server-rendered overlay from a direct ?view= link never hydrated
  const [mounted, setMounted] = useState(false);
  // Compare needs side-by-side room; on narrow screens the version tabs already
  // cover it, so a compare link falls back to the original
  const view = narrow && asked === "compare" ? "original" : asked;
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);

  const close = () => {
    if (openedInApp) { openedInApp = false; router.back(); }
    else router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1100px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    setMounted(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!view) return;
    dialogRef.current?.focus();
    bodyRef.current?.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, mounted]);

  if (!view || !mounted) return null;

  // Writer keeps the byline on every version; the editor is credited on the edits
  const byline = (v: VersionKey) => [
    "By " + (edit.author ?? "[original author]"),
    v !== "original" && edit.editor && `Edited by ${edit.editor}`,
    edit.outlet,
    edit.date,
  ].filter(Boolean).join("  |  ");
  const tabs = narrow ? VERSIONS : VIEWS;

  return (
    <div
      onClick={close}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         500,
        background:     "rgba(0,0,0,0.78)",
        backdropFilter: "blur(3px)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     SANS,
        color:          "#fff",
      }}
    >
      <style>{`
        .rd-window { width: min(${view === "compare" ? 1240 : 1000}px, calc(100vw - 48px)); height: calc(100dvh - 64px); }
        .rd-link:hover, .rd-close:hover { color: #fff !important; }
        @media (max-width: 768px) {
          .rd-window { width: 100vw; height: 100dvh; border: none !important; }
          .rd-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .rd-art { display: none; }
        }
      `}</style>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={TITLES[view]}
        tabIndex={-1}
        className="rd-window"
        onClick={e => e.stopPropagation()}
        style={{
          background:    "#000",
          border:        "1px solid rgba(255,255,255,0.14)",
          display:       "flex",
          flexDirection: "column",
          outline:       "none",
          overflow:      "hidden",
          colorScheme:   "dark",
        }}
      >
        {/* ── Title bar ── */}
        <div className="rd-pad" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", borderBottom: RULE, flexShrink: 0 }}>
          <span style={{ ...label, color: view === "compare" ? "rgba(255,255,255,0.70)" : ACCENT[view] }}>{TITLES[view]}</span>
          <button className="rd-close" onClick={close} aria-label="Close" style={{
            fontFamily: MONO, fontSize: "18px", lineHeight: 1, color: "rgba(255,255,255,0.55)",
            background: "none", border: "none", padding: "2px 4px", transition: "color 0.15s",
          }}>
            ✕
          </button>
        </div>

        {/* ── View tabs ── */}
        <div className="rd-pad" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 28px", padding: "14px 28px", borderBottom: RULE, flexShrink: 0 }}>
          {tabs.map(v => (
            <button
              key={v}
              onClick={() => router.replace(`${pathname}?view=${v}`, { scroll: false })}
              style={{
                ...label,
                color:         view === v ? "#fff" : "rgba(255,255,255,0.28)",
                background:    "none",
                border:        "none",
                borderBottom:  view === v ? `1px solid ${ACCENT[v]}` : "1px solid transparent",
                paddingBottom: "4px",
                transition:    "color 0.2s",
              }}
            >
              {NAMES[v]}
            </button>
          ))}
          {view === "compare" && (
            <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
              <Bracket active={mode === "side"}   onClick={() => setMode("side")}>side by side</Bracket>
              <Bracket active={mode === "toggle"} onClick={() => setMode("toggle")}>toggle view</Bracket>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div ref={bodyRef} className="rd-pad" style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "40px 56px 64px" }}>
          {view === "compare"
            ? <Compare edit={edit} mode={mode} />
            : <Article version={edit[view]} name={NAMES[view]} byline={byline(view)} accent={ACCENT[view]} />}
        </div>
      </div>
    </div>
  );
}
