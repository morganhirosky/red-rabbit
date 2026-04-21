"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { featureWriting, technicalWriting, FeatureEntry, TechnicalEntry } from "@/src/data/writing";

type Category = "all" | "feature" | "senate";

type Entry =
  | { kind: "feature"; data: FeatureEntry }
  | { kind: "senate";  data: TechnicalEntry; index: number };

const allEntries: Entry[] = [
  ...featureWriting.map(d  => ({ kind: "feature" as const, data: d })),
  ...technicalWriting.map((d, i) => ({ kind: "senate" as const, data: d, index: i })),
].sort((a, b) => a.data.title.localeCompare(b.data.title));

function entryId(e: Entry)          { return e.kind === "feature" ? e.data.slug : `senate-${e.index}`; }
function entryTitle(e: Entry)       { return e.data.title; }
function entryMeta(e: Entry)        { return e.kind === "feature" ? [e.data.publication, e.data.date].filter(Boolean).join(" · ") : ["Texas Senate", e.data.date].filter(Boolean).join(" · "); }
function entryKindLabel(e: Entry)   { return e.kind === "feature" ? "culture" : "government"; }
function entryIsExternal(e: Entry)  { return e.kind === "feature" ? !!e.data.url : true; }
function entryHref(e: Entry)        { return e.kind === "feature" ? (e.data.url ?? null) : `/senate/${e.data.pdf}`; }
function entryContent(e: Entry)     { return e.kind === "feature" ? (e.data.content ?? null) : null; }
function entryDescription(e: Entry) { return e.data.description; }

const SANS  = '"Source Sans 3", "Source Sans Pro", sans-serif';
const SERIF = '"Times New Roman", Times, serif';

export default function WritingArchive() {
  const [filter,   setFilter]   = useState<Category>("all");
  const [selected, setSelected] = useState<Entry | null>(null);

  const visible = filter === "all"
    ? allEntries
    : allEntries.filter(e => e.kind === (filter === "senate" ? "senate" : "feature"));

  const activeEntry = selected && visible.includes(selected)
    ? selected
    : null;

  const FULL_TEXT = "select a piece";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (activeEntry) return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [activeEntry]);

  const activeIndex = activeEntry
    ? visible.findIndex(e => entryId(e) === entryId(activeEntry))
    : -1;

  const isExternal = activeEntry ? entryIsExternal(activeEntry) : false;
  const href       = activeEntry ? entryHref(activeEntry) : null;
  const content    = activeEntry ? entryContent(activeEntry) : null;

  return (
    <main style={{
      width:         "100vw",
      height:        "100vh",
      background:    "#000",
      display:       "flex",
      flexDirection: "column",
      fontFamily:    SANS,
      overflow:      "hidden",
      color:         "#fff",
    }}>

      <NavBar activePath="/writing" />

      {/* ── Filter tabs ── */}
      <div style={{
        display:      "flex",
        gap:          "32px",
        padding:      "16px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        flexShrink:   0,
      }}>
        {(["all", "feature", "senate"] as Category[]).map(cat => {
          const label = cat === "feature" ? "culture" : cat === "senate" ? "government" : "all";
          return (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              fontFamily:    SANS,
              fontSize:      "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         filter === cat ? "#fff" : "rgba(255,255,255,0.28)",
              background:    "none",
              border:        "none",
              borderBottom:  filter === cat ? "1px solid #fff" : "1px solid transparent",
              paddingBottom: "4px",
              cursor:        "default",
              transition:    "color 0.2s",
            }}
          >
            {label}
          </button>
        );})}
        <span style={{
          marginLeft:    "auto",
          fontSize:      "11px",
          letterSpacing: "0.08em",
          color:         "rgba(255,255,255,0.20)",
          alignSelf:     "center",
        }}>
          {activeIndex >= 0 ? activeIndex + 1 : 0} / {visible.length}
        </span>
      </div>

      {/* ── Content row ── */}
      <div style={{
        flex:     1,
        display:  "flex",
        overflow: "hidden",
      }}>

        {/* ── Left pane: list ── */}
        <div style={{
          width:        "300px",
          flexShrink:   0,
          overflowY:    "auto",
          borderRight:  "1px solid rgba(255,255,255,0.08)",
        }}>
          {visible.length === 0 ? (
            <div style={{ padding: "24px 32px", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
              no entries
            </div>
          ) : visible.map((entry) => {
            const id       = entryId(entry);
            const isActive = activeEntry ? entryId(activeEntry) === id : false;
            return (
              <div
                key={id}
                onClick={() => setSelected(entry)}
                style={{
                  padding:      "16px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background:   isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  cursor:       "default",
                  transition:   "background 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{
                  fontSize:      "11px",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color:         isActive ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)",
                  marginBottom:  "6px",
                }}>
                  {entryKindLabel(entry)}
                </div>
                <div style={{
                  fontSize:   "13px",
                  lineHeight: 1.4,
                  color:      isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  fontWeight: isActive ? 300 : 200,
                }}>
                  {entryTitle(entry)}
                </div>
                {entryMeta(entry) && (
                  <div style={{
                    fontSize:      "11px",
                    color:         "rgba(255,255,255,0.25)",
                    marginTop:     "6px",
                    letterSpacing: "0.04em",
                  }}>
                    {entryMeta(entry)}
                  </div>
                )}
              </div>
            );
          })}

          {(filter === "all" || filter === "feature" || filter === "senate") && (
            <div style={{
              padding:       "20px 32px",
              borderTop:     "1px solid rgba(255,255,255,0.06)",
              fontFamily:    SANS,
              fontSize:      "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.18)",
              fontStyle:     "italic",
            }}>
              archive in progress
            </div>
          )}
        </div>

        {/* ── Right pane: detail ── */}
        <div style={{
          flex:          1,
          overflowY:     (activeEntry?.kind === "senate" || (activeEntry?.kind === "feature" && activeEntry.data.embed)) ? "hidden" : "auto",
          padding:       (activeEntry?.kind === "senate" || (activeEntry?.kind === "feature" && activeEntry.data.embed)) ? "32px 48px" : "64px 72px",
          display:       "flex",
          flexDirection: "column",
        }}>
          {!activeEntry ? (
            <div style={{
              flex:          1,
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
            }}>
              <>
<span style={{
                  fontFamily: SANS,
                  fontSize:   "clamp(24px, 2.5vw, 40px)",
                  fontWeight: "normal",
                  color:      "rgba(255,255,255,0.45)",
                }}>
                  {typed}
                </span>
                <span style={{
                  fontFamily: SANS,
                  fontSize:   "clamp(24px, 2.5vw, 40px)",
                  color:      "rgba(255,255,255,0.45)",
                  animation:  "blink 1s step-start infinite",
                  marginLeft: "2px",
                }}>
                  |
                </span>
              </>
            </div>
          ) : (
            <>
              <div style={{
                fontSize:      "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.30)",
                marginBottom:  "20px",
              }}>
                {entryKindLabel(activeEntry)}
              </div>

              <h1 style={{
                fontFamily:   SERIF,
                fontSize:     (activeEntry.kind === "senate" || activeEntry.data.embed) ? "clamp(20px, 2vw, 32px)" : "clamp(28px, 3vw, 48px)",
                fontWeight:   "normal",
                lineHeight:   1.1,
                color:        "#fff",
                marginBottom: "12px",
              }}>
                {entryTitle(activeEntry)}
              </h1>

              {entryMeta(activeEntry) && (
                <div style={{
                  fontSize:      "11px",
                  letterSpacing: "0.08em",
                  color:         "rgba(255,255,255,0.30)",
                  marginBottom:  (activeEntry.kind === "senate" || activeEntry.data.embed) ? "20px" : "40px",
                }}>
                  {entryMeta(activeEntry)}
                </div>
              )}

              {activeEntry.kind !== "senate" && !activeEntry.data.embed && (
                <div style={{
                  width:        "40px",
                  height:       "1px",
                  background:   "rgba(255,255,255,0.15)",
                  marginBottom: "40px",
                }} />
              )}

              {entryDescription(activeEntry) && (
                <p style={{
                  fontFamily:   SANS,
                  fontWeight:   200,
                  fontSize:     "15px",
                  lineHeight:   1.85,
                  color:        "rgba(255,255,255,0.65)",
                  marginBottom: "40px",
                  maxWidth:     "540px",
                }}>
                  {entryDescription(activeEntry)}
                </p>
              )}

              {(activeEntry.kind === "senate" || (activeEntry.kind === "feature" && activeEntry.data.embed)) && href ? (
                <div style={{
                  flex:     1,
                  minHeight: 0,
                  overflow: "hidden",
                  border:       "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "2px",
                  background:   "#111",
                }}>
                  <iframe
                    key={href}
                    src={href}
                    style={{
                      width:     "100%",
                      height:    `calc(100% + ${activeEntry.data.cropTop ?? (activeEntry.kind === "senate" ? 250 : 0)}px)`,
                      marginTop: `-${activeEntry.data.cropTop ?? (activeEntry.kind === "senate" ? 250 : 0)}px`,
                      border:    "none",
                      display:   "block",
                    }}
                  />
                </div>
              ) : isExternal && href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:       "inline-block",
                    fontFamily:    SANS,
                    fontSize:      "11px",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color:         "#fff",
                    textDecoration:"none",
                    borderBottom:  "1px solid rgba(255,255,255,0.40)",
                    paddingBottom: "2px",
                    transition:    "border-color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)")}
                >
                  Read full piece ↗
                </a>
              ) : content ? (
                <div style={{
                  fontFamily:  SERIF,
                  fontSize:    "15px",
                  lineHeight:  2,
                  color:       "rgba(255,255,255,0.75)",
                  whiteSpace:  "pre-wrap",
                  maxWidth:    "560px",
                }}>
                  {content}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

    </main>
  );
}
