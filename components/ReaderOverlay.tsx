"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AsciiScene from "@/components/AsciiScene";
import type { ArticleVersion, FeaturedEdit } from "@/src/data/editing";

const MONO = '"Courier New", Courier, monospace';
const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';
const RULE = "1px solid rgba(255,255,255,0.08)";

export type ReaderView = "original" | "edited" | "compare";
const VIEWS: ReaderView[] = ["original", "edited", "compare"];
const TITLES: Record<ReaderView, string> = {
  original: "original article",
  edited:   "edited article",
  compare:  "compare versions",
};

// True when the overlay was opened by a click on this page, so closing can
// step back through history instead of stacking a new entry. A direct visit
// to /editing?view=… leaves it false and closing replaces the URL instead.
let openedInApp = false;

// `[ label ]` link that opens the overlay at a given view
export function ReaderLink({ view, children }: { view: ReaderView; children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  return (
    <button
      className="rd-link"
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

function Paragraphs({ version, size = 17 }: { version: ArticleVersion; size?: number }) {
  if (version.paragraphs.length === 0) {
    return (
      <p style={{ fontFamily: MONO, fontSize: "14px", color: "rgba(255,255,255,0.40)" }}>
        &gt; edited version coming soon
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

function Article({ version, byline }: { version: ArticleVersion; byline: string }) {
  return (
    <article style={{ maxWidth: "720px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 300, lineHeight: 1.15, marginBottom: "12px" }}>
        {withItalics(version.title, version.italicize)}
      </h2>
      <div style={{ ...label, letterSpacing: "0.08em", marginBottom: "24px" }}>{byline}</div>
      <div style={{ borderTop: RULE, marginBottom: "32px" }} />
      <div className="rd-art" style={{ float: "right", margin: "4px 0 16px 28px", border: RULE, padding: "10px 6px" }}>
        <AsciiScene variant="dome" cols={40} rows={18} fontSize="7px" opacity={0.6} />
      </div>
      <Paragraphs version={version} />
    </article>
  );
}

function Compare({ edit, mode }: { edit: FeaturedEdit; mode: "side" | "toggle" }) {
  const [shown, setShown] = useState<"original" | "edited">("original");

  const column = (which: "original" | "edited", divider = false) => (
    <div style={{ minWidth: 0, ...(divider ? { borderLeft: RULE, paddingLeft: "40px" } : { paddingRight: mode === "side" ? "40px" : 0 }) }}>
      <div style={{ ...label, color: "rgba(255,255,255,0.70)", marginBottom: "20px" }}>{which}</div>
      <Paragraphs version={edit[which]} size={16} />
    </div>
  );

  if (mode === "side") {
    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>{column("original")}{column("edited", true)}</div>;
  }

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "28px" }}>
        {(["original", "edited"] as const).map(v => (
          <Bracket key={v} active={shown === v} onClick={() => setShown(v)}>{v}</Bracket>
        ))}
      </div>
      <Paragraphs version={edit[shown]} />
    </div>
  );
}

// Nav-style toggle: active option renders as [label]
function Bracket({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button onClick={onClick} aria-pressed={active} style={{
      fontFamily:    SANS,
      fontSize:      "13px",
      letterSpacing: "0.06em",
      color:         active ? "#fff" : "rgba(255,255,255,0.40)",
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
  const view     = VIEWS.includes(param as ReaderView) ? (param as ReaderView) : null;

  const [mode, setMode]     = useState<"side" | "toggle">("side");
  const [narrow, setNarrow] = useState(false);
  // Client-only: a server-rendered overlay from a direct ?view= link never hydrated
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);

  const close = () => {
    if (openedInApp) { openedInApp = false; router.back(); }
    else router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
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

  const byline = ["By " + (edit.author ?? "[original author]"), edit.outlet, edit.date].filter(Boolean).join("  |  ");
  const effectiveMode = narrow ? "toggle" : mode;

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
          <span style={{ ...label, color: "rgba(255,255,255,0.70)" }}>{TITLES[view]}</span>
          <button className="rd-close" onClick={close} aria-label="Close" style={{
            fontFamily: MONO, fontSize: "18px", lineHeight: 1, color: "rgba(255,255,255,0.55)",
            background: "none", border: "none", padding: "2px 4px", transition: "color 0.15s",
          }}>
            ✕
          </button>
        </div>

        {/* ── View tabs ── */}
        <div className="rd-pad" style={{ display: "flex", alignItems: "center", gap: "32px", padding: "14px 28px", borderBottom: RULE, flexShrink: 0 }}>
          {VIEWS.map(v => (
            <button
              key={v}
              onClick={() => router.replace(`${pathname}?view=${v}`, { scroll: false })}
              style={{
                ...label,
                color:         view === v ? "#fff" : "rgba(255,255,255,0.28)",
                background:    "none",
                border:        "none",
                borderBottom:  view === v ? "1px solid #fff" : "1px solid transparent",
                paddingBottom: "4px",
                transition:    "color 0.2s",
              }}
            >
              {v}
            </button>
          ))}
          {view === "compare" && !narrow && (
            <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
              <Bracket active={mode === "side"}   onClick={() => setMode("side")}>side by side</Bracket>
              <Bracket active={mode === "toggle"} onClick={() => setMode("toggle")}>toggle view</Bracket>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div ref={bodyRef} className="rd-pad" style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "40px 56px 64px" }}>
          {view === "compare"
            ? <Compare edit={edit} mode={effectiveMode} />
            : <Article version={edit[view]} byline={byline} />}
        </div>
      </div>
    </div>
  );
}
