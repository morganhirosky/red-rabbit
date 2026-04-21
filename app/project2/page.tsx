"use client";

import { useState, useRef, useEffect } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id:       "01",
    slug:     "dead-bugs-trailer",
    headline: "Dead Bugs",
    deck:     "Three anonymous individuals examine self-concept through intimate, faceless testimony.",
    cat:      "DOCUMENTARY FILM — TRAILER",
    date:     "2022",
    desc:     "Three anonymous individuals share intimate reflections of their self-concepts, memories, and defining relationships. Faceless interviews and sentimentally charged locations suggest that identity emanates beyond the individual.",
    meta:     "Canon XF300 · Adobe Premiere Pro",
    embed:    "https://www.youtube.com/embed/6BiXCjKb1Cc",
    rotation: "-1.2deg",
  },
  {
    id:       "02",
    slug:     "dead-bugs-full",
    headline: "Dead Bugs",
    deck:     "The full cut. Self-understanding born through witnessing another.",
    cat:      "SHORT DOCUMENTARY",
    date:     "2022",
    desc:     "Self-understanding is born through witnessing another. Shot across intimate locations, this film asks what it means to know yourself through someone else's eyes.",
    meta:     "Canon XF300 · Adobe Premiere Pro",
    embed:    "https://www.youtube.com/embed/orgpva2COfY",
    rotation: "0.8deg",
  },
  {
    id:       "03",
    slug:     "life-as-deaths-keeper",
    headline: "Life as Death's Keeper",
    deck:     "A journalist embeds with morticians to examine mortality, faith, and happiness.",
    cat:      "INDEPENDENT JOURNALISM",
    date:     "2023",
    desc:     "An examination of morticians' perspectives on mortality, faith, family, and the pursuit of happiness. Long-form interviews and firsthand observation of mortuary practice.",
    meta:     "Canon EOS Rebel SL1 & Digital Rebel XT · Adobe Photoshop",
    embed:    null,
    rotation: "-0.4deg",
  },
] as const;

type Project = typeof PROJECTS[number];

const ICON_POS = [
  { top: "16%", left: "4%"   },
  { top: "46%", left: "5%"   },
  { top: "72%", left: "3.5%" },
];

const TICKER_ITEMS = [
  "HIROSKY REPORTS: THREE INDIVIDUALS EXAMINE SELF-CONCEPT IN LANDMARK DOCUMENTARY",
  "DEAD BUGS PREMIERES — FACELESS INTERVIEWS REVEAL TRUTH BENEATH IDENTITY",
  "LIFE AS DEATH'S KEEPER: JOURNALIST EMBEDS WITH MORTICIANS IN GROUNDBREAKING LONG-FORM REPORT",
  "TEXAS SENATE: OVER 500 PROCLAMATIONS DRAFTED BY LEAD WRITER M. HIROSKY",
  "KTSW 89.9 — ARTICLE OF THE YEAR: \"RABBITS OF THE 90s: A NICHE'S CORE\"",
  "FIELD ARCHIVE NOW OPEN — THREE WORKS AVAILABLE FOR REVIEW",
];

// ── Palette ───────────────────────────────────────────────────────────────────

const C = {
  bg:      "#cdc5a2",   // aged desktop
  paper:   "#f0e8cc",   // newsprint
  paper2:  "#ede0b8",   // slightly darker newsprint
  ink:     "#120e08",   // near-black ink
  dim:     "#6a5a38",   // faded ink
  dim2:    "#9a8a68",   // very faded
  red:     "#8b1a1a",   // masthead red
  rule:    "rgba(18,14,8,0.18)",
  shadow:  "rgba(40,30,10,0.22)",
} as const;

const serif  = "Georgia, 'Times New Roman', Times, serif";
const courier = "'Courier New', Courier, monospace";

// ── Wire ticker ───────────────────────────────────────────────────────────────

function WireTicker() {
  const text = TICKER_ITEMS.join("   ·   ") + "   ·   ";

  return (
    <div style={{
      position:   "fixed",
      bottom:     0,
      left:       0,
      right:      0,
      height:     "28px",
      background: C.ink,
      borderTop:  "2px solid #3a2a10",
      zIndex:     9000,
      display:    "flex",
      alignItems: "center",
      overflow:   "hidden",
      userSelect: "none",
    }}>
      {/* Label */}
      <div style={{
        flexShrink:    0,
        padding:       "0 10px",
        borderRight:   "1px solid #3a3020",
        fontFamily:    courier,
        fontSize:      "8px",
        color:         C.paper2,
        letterSpacing: "0.14em",
        whiteSpace:    "nowrap",
      }}>
        WIRE
      </div>

      {/* Scrolling text */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative", height: "100%" }}>
        <div className="ticker-track" style={{
          display:    "flex",
          alignItems: "center",
          height:     "100%",
          whiteSpace: "nowrap",
        }}>
          {[0, 1].map(n => (
            <span key={n} style={{
              fontFamily:    courier,
              fontSize:      "9px",
              color:         "#c8b880",
              letterSpacing: "0.08em",
              paddingRight:  "48px",
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Masthead date ─────────────────────────────────────────────────────────────

function Masthead() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now
    ? now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div style={{
      position:       "fixed",
      top:            "80px",
      left:           0,
      right:          0,
      zIndex:         4,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      pointerEvents:  "none",
      userSelect:     "none",
    }}>
      <div style={{
        width:         "100%",
        borderTop:     `3px solid ${C.ink}`,
        borderBottom:  `1px solid ${C.ink}`,
        padding:       "6px 0 4px",
        textAlign:     "center",
        background:    C.bg,
      }}>
        <div style={{
          fontFamily:    serif,
          fontSize:      "11px",
          color:         C.red,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom:  "3px",
        }}>
          The Portfolio Gazette
        </div>
        <div style={{
          fontFamily:    courier,
          fontSize:      "7px",
          color:         C.dim,
          letterSpacing: "0.14em",
        }}>
          {dateStr}  ·  M. HIROSKY, REPORTER  ·  EST. 2022
        </div>
      </div>
      <div style={{ width: "100%", borderBottom: `2px solid ${C.ink}`, background: C.bg }} />
    </div>
  );
}

// ── Index panel ───────────────────────────────────────────────────────────────

function IndexPanel({ onOpen }: { onOpen: (i: number) => void }) {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{
      position:   "fixed",
      top:        "160px",
      right:      "32px",
      width:      "220px",
      background: C.paper,
      border:     `1px solid rgba(18,14,8,0.25)`,
      boxShadow:  `2px 3px 10px ${C.shadow}`,
      zIndex:     5,
      userSelect: "none",
    }}>
      {/* Box head */}
      <div style={{
        borderBottom: `2px solid ${C.ink}`,
        padding:      "5px 10px 4px",
        background:   C.paper2,
      }}>
        <div style={{ fontFamily: serif, fontSize: "9px", color: C.ink, fontWeight: "bold", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Today's Features
        </div>
      </div>

      {/* Entries */}
      {PROJECTS.map((p, i) => (
        <div
          key={i}
          onClick={() => onOpen(i)}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
          style={{
            padding:      "7px 10px",
            borderBottom: i < PROJECTS.length - 1 ? `1px solid ${C.rule}` : "none",
            background:   hov === i ? "rgba(18,14,8,0.05)" : "transparent",
            display:      "flex",
            alignItems:   "baseline",
            gap:          "6px",
            transition:   "background 0.12s",
          }}
        >
          <span style={{ fontFamily: courier, fontSize: "7px", color: C.red, flexShrink: 0 }}>
            {p.id}.
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily:    serif,
              fontSize:      "11px",
              fontStyle:     "italic",
              color:         hov === i ? C.ink : "#2a2010",
              lineHeight:    "1.3",
              transition:    "color 0.12s",
            }}>
              {p.headline}
            </div>
            <div style={{ fontFamily: courier, fontSize: "7px", color: C.dim2, marginTop: "2px", letterSpacing: "0.06em" }}>
              {p.cat}
            </div>
          </div>
          <span style={{
            fontFamily:    courier,
            fontSize:      "7px",
            color:         C.dim2,
            letterSpacing: "0.06em",
            flexShrink:    0,
          }}>
            p.{p.id}
          </span>
        </div>
      ))}

      {/* Dingbat footer */}
      <div style={{
        borderTop: `1px solid ${C.rule}`,
        padding:   "4px 10px",
        textAlign: "center",
      }}>
        <span style={{ fontFamily: serif, fontSize: "8px", color: C.dim2, letterSpacing: "0.1em" }}>— click to open —</span>
      </div>
    </div>
  );
}

// ── Newspaper clipping icon ───────────────────────────────────────────────────

function Clipping({
  project, selected, onClick,
}: {
  project: Project; selected: boolean; onClick: (e: React.MouseEvent) => void;
}) {
  const [hov, setHov] = useState(false);
  const lit = hov || selected;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:      "110px",
        background: C.paper,
        border:     `1px solid rgba(18,14,8,0.22)`,
        boxShadow:  lit
          ? `4px 6px 16px ${C.shadow}`
          : `2px 3px 8px ${C.shadow}`,
        transform:  lit
          ? "rotate(0deg) translateY(-4px)"
          : `rotate(${project.rotation}) translateY(0)`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        userSelect: "none",
        overflow:   "hidden",
      }}
    >
      {/* Top rule — thick */}
      <div style={{ height: "4px", background: C.ink }} />
      <div style={{ height: "1px", background: C.red, margin: "2px 0" }} />

      {/* Content */}
      <div style={{ padding: "6px 8px 10px" }}>
        <div style={{
          fontFamily:    courier,
          fontSize:      "6px",
          color:         C.red,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom:  "4px",
        }}>
          {project.cat}
        </div>
        <div style={{
          fontFamily:    serif,
          fontSize:      "12px",
          fontWeight:    "bold",
          color:         C.ink,
          lineHeight:    "1.2",
          marginBottom:  "5px",
        }}>
          {project.headline}
        </div>
        <div style={{ height: "1px", background: C.rule, marginBottom: "5px" }} />
        <div style={{
          fontFamily:    serif,
          fontSize:      "8px",
          fontStyle:     "italic",
          color:         C.dim,
          lineHeight:    "1.4",
        }}>
          {project.deck}
        </div>
      </div>

      {/* Bottom meta */}
      <div style={{
        borderTop:  `1px solid ${C.rule}`,
        padding:    "3px 8px",
        display:    "flex",
        justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: courier, fontSize: "6px", color: C.dim2 }}>M. HIROSKY</span>
        <span style={{ fontFamily: courier, fontSize: "6px", color: C.dim2 }}>{project.date}</span>
      </div>
    </div>
  );
}

// ── Press sheet window ────────────────────────────────────────────────────────

interface WinState {
  id: number; project: Project; pos: { x: number; y: number }; zIndex: number;
}

function PressSheet({
  win, isActive, onClose, onFocus,
}: {
  win: WinState; isActive: boolean; onClose: () => void; onFocus: () => void;
}) {
  const posRef     = useRef(win.pos);
  const dragOffset = useRef<{ dx: number; dy: number } | null>(null);
  const [pos, setPos]   = useState(win.pos);
  const [drag, setDrag] = useState(false);
  const { project } = win;

  useEffect(() => { posRef.current = pos; }, [pos]);

  function startDrag(e: React.MouseEvent) {
    e.preventDefault();
    onFocus();
    dragOffset.current = { dx: e.clientX - posRef.current.x, dy: e.clientY - posRef.current.y };
    setDrag(true);
    function onMove(e: MouseEvent) {
      if (!dragOffset.current) return;
      const x = e.clientX - dragOffset.current.dx;
      const y = e.clientY - dragOffset.current.dy;
      posRef.current = { x, y };
      setPos({ x, y });
    }
    function onUp() {
      dragOffset.current = null; setDrag(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const shadow = isActive
    ? `5px 8px 28px ${C.shadow}, 0 0 0 1px rgba(18,14,8,0.1)`
    : `3px 5px 16px rgba(40,30,10,0.15), 0 0 0 1px rgba(18,14,8,0.07)`;

  return (
    <div
      onMouseDown={onFocus}
      onClick={e => e.stopPropagation()}
      style={{
        position:      "fixed",
        left:          pos.x,
        top:           pos.y,
        width:         "560px",
        zIndex:        win.zIndex,
        background:    C.paper,
        border:        `1px solid rgba(18,14,8,0.3)`,
        boxShadow:     shadow,
        userSelect:    "none",
        display:       "flex",
        flexDirection: "column",
        opacity:       isActive ? 1 : 0.9,
        transition:    "opacity 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Masthead */}
      <div
        onMouseDown={startDrag}
        style={{ cursor: drag ? "grabbing" : "move", flexShrink: 0 }}
      >
        <div style={{ height: "3px", background: C.ink }} />
        <div style={{ height: "1px", background: C.red }} />
        <div style={{
          padding:       "5px 12px 4px",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          background:    C.paper2,
        }}>
          <span style={{
            fontFamily:    serif,
            fontSize:      "10px",
            fontStyle:     "italic",
            color:         C.dim,
            letterSpacing: "0.08em",
          }}>
            {project.cat}
          </span>
          <span style={{
            fontFamily:    serif,
            fontSize:      "13px",
            fontWeight:    "bold",
            color:         C.ink,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            The Portfolio Gazette
          </span>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={onClose}
            style={{
              background: "none", border: "none",
              fontFamily: serif, fontSize: "16px",
              color: C.dim, cursor: "pointer",
              lineHeight: 1, padding: "0 2px",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ height: "1px", background: C.red }} />
        <div style={{ height: "2px", background: C.ink }} />
      </div>

      {/* Content */}
      <div style={{ padding: "20px 28px 24px", overflowY: "auto", maxHeight: "70vh", userSelect: "text" }}>

        {/* Headline */}
        <div style={{
          fontFamily:    serif,
          fontSize:      "30px",
          fontWeight:    "bold",
          color:         C.ink,
          lineHeight:    "1.1",
          marginBottom:  "8px",
          letterSpacing: "-0.01em",
        }}>
          {project.headline.toUpperCase()}
        </div>

        {/* Deck */}
        <div style={{
          fontFamily:    serif,
          fontSize:      "14px",
          fontStyle:     "italic",
          color:         "#3a2a10",
          lineHeight:    "1.4",
          marginBottom:  "12px",
        }}>
          {project.deck}
        </div>

        {/* Byline + rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div style={{ flex: 1, height: "1px", background: C.rule }} />
          <span style={{ fontFamily: courier, fontSize: "8px", color: C.dim, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
            BY M. HIROSKY  ·  {project.date}
          </span>
          <div style={{ flex: 1, height: "1px", background: C.rule }} />
        </div>

        {/* Body copy */}
        <div style={{
          fontFamily:    serif,
          fontSize:      "13px",
          color:         "#1e1808",
          lineHeight:    "1.75",
          marginBottom:  "16px",
          textAlign:     "justify",
        }}>
          {project.desc}
        </div>

        {/* Meta */}
        <div style={{
          borderTop:     `1px solid ${C.rule}`,
          paddingTop:    "10px",
          marginBottom:  project.embed ? "20px" : 0,
          fontFamily:    courier,
          fontSize:      "8px",
          color:         C.dim,
          letterSpacing: "0.08em",
        }}>
          EQUIPMENT — {project.meta}
        </div>

        {/* Video embed — styled as a press photo */}
        {project.embed && (
          <div>
            <div style={{
              width:        "100%",
              aspectRatio:  "16/9",
              border:       `1px solid rgba(18,14,8,0.3)`,
              outline:      `4px solid ${C.paper}`,
              outlineOffset:"-5px",
            }}>
              <iframe
                src={project.embed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>
            <div style={{
              fontFamily:    courier,
              fontSize:      "8px",
              fontStyle:     "italic",
              color:         C.dim,
              marginTop:     "5px",
              letterSpacing: "0.04em",
            }}>
              ▲ {project.headline} ({project.date}) — {project.meta.split(" ·")[0]}
            </div>
          </div>
        )}
      </div>

      {/* Footer rule */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: "1px", background: C.rule }} />
        <div style={{
          padding:       "4px 14px",
          display:       "flex",
          justifyContent:"space-between",
          background:    C.paper2,
        }}>
          <span style={{ fontFamily: courier, fontSize: "7px", color: C.dim2, letterSpacing: "0.1em" }}>
            THE PORTFOLIO GAZETTE
          </span>
          <span style={{ fontFamily: courier, fontSize: "7px", color: C.dim2, letterSpacing: "0.08em" }}>
            pg. {project.id}
          </span>
        </div>
        <div style={{ height: "2px", background: C.ink }} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Project2() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [windows, setWindows]           = useState<WinState[]>([]);
  const [topZ, setTopZ]                 = useState(10);
  const nextId                          = useRef(0);

  function openProject(idx: number, e?: React.MouseEvent) {
    e?.stopPropagation();
    setSelectedIcon(idx);
    const existing = windows.find(w => w.project === PROJECTS[idx]);
    if (existing) { bringToFront(existing.id); return; }
    const z      = topZ + 1;
    const offset = windows.length * 28;
    const x      = Math.round((window.innerWidth  - 560) / 2) + offset;
    const y      = Math.round((window.innerHeight - 520) / 3) + offset;
    setTopZ(z);
    setWindows(prev => [...prev, { id: nextId.current++, project: PROJECTS[idx], pos: { x, y }, zIndex: z }]);
  }

  function closeWindow(id: number) {
    setWindows(prev => prev.filter(w => w.id !== id));
  }

  function bringToFront(id: number) {
    const z = topZ + 1;
    setTopZ(z);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z } : w));
  }

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 42s linear infinite;
        }
      `}</style>

      <div
        onClick={() => setSelectedIcon(null)}
        style={{
          position:   "fixed",
          inset:      0,
          background: C.bg,
          // Paper grain via dot pattern
          backgroundImage: `radial-gradient(circle, rgba(18,14,8,0.06) 1px, transparent 1px)`,
          backgroundSize:  "3px 3px",
          overflow:   "hidden",
          paddingBottom: "28px",
        }}
      >
        {/* Masthead header */}
        <Masthead />

        {/* Clipping icons */}
        {PROJECTS.map((p, i) => (
          <div key={i} style={{ position: "absolute", zIndex: 2, ...ICON_POS[i], marginTop: "90px" }}>
            <Clipping
              project={p}
              selected={selectedIcon === i}
              onClick={e => openProject(i, e)}
            />
          </div>
        ))}

        {/* Index panel */}
        <div style={{ marginTop: "80px" }}>
          <IndexPanel onOpen={i => openProject(i)} />
        </div>

        {/* Press sheet windows */}
        {windows.map(win => (
          <PressSheet
            key={win.id}
            win={win}
            isActive={win.zIndex === topZ}
            onClose={() => closeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
          />
        ))}

        {/* Wire ticker */}
        <WireTicker />
      </div>
    </>
  );
}
