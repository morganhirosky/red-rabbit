"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";

const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789.,;:!?+-=*#@/|_~".split("");
const MONO = '"Courier New", Courier, monospace';
const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';

type TermLine =
  | { kind: "text"; text: string }
  | { kind: "link"; prefix: string; label: string; href: string; external?: boolean }
  | { kind: "blank" };

const LINES: TermLine[] = [
  { kind: "text",  text: "> establishing contact..." },
  { kind: "text",  text: "> subject: morgan hirosky" },
  { kind: "blank" },
  { kind: "link",  prefix: "> email ......... ", label: "morghirosky@gmail.com",      href: "mailto:morghirosky@gmail.com" },
  { kind: "link",  prefix: "> linkedin ...... ", label: "morgan hirosky",             href: "https://www.linkedin.com/in/morgan-hirosky-b4350a16b", external: true },
];

function lineFullText(l: TermLine): string {
  if (l.kind === "blank") return "";
  if (l.kind === "text")  return l.text;
  return l.prefix + l.label;
}

function ScrambleLink({ prefix, label, href, external }: {
  prefix: string; label: string; href: string; external?: boolean;
}) {
  const [disp,    setDisp]    = useState(label);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    setHovered(true);
    if (timerRef.current) clearInterval(timerRef.current);
    let tick = 0;
    const SCRAM = 6, PER = 3;
    timerRef.current = setInterval(() => {
      tick++;
      const revealed = Math.max(0, Math.floor((tick - SCRAM) / PER));
      if (revealed >= label.length) {
        setDisp(label);
        clearInterval(timerRef.current!);
        return;
      }
      setDisp(label.split("").map((ch, i) =>
        i < revealed ? ch : CHARSET[Math.floor(Math.random() * CHARSET.length)]!
      ).join(""));
    }, 40);
  };

  const reset = () => {
    setHovered(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setDisp(label);
  };

  return (
    <span style={{ fontFamily: MONO, fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: 2 }}>
      <span style={{ color: "rgba(255,255,255,0.25)" }}>{prefix}</span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseEnter={scramble}
        onMouseLeave={reset}
        style={{
          color:          hovered ? "#fff" : "rgba(255,255,255,0.70)",
          textDecoration: "none",
          transition:     "color 0.15s",
          cursor:         "default",
        }}
      >
        {disp}
      </a>
      <span style={{ color: "rgba(255,255,255,0.25)", marginLeft: "10px" }}>{"[->]"}</span>
    </span>
  );
}

export default function Contact() {
  const [lineIndex, setLineIndex] = useState(-1);
  const [charIndex, setCharIndex] = useState(0);
  const [allDone,   setAllDone]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLineIndex(0), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (lineIndex < 0 || allDone) return;
    const line = LINES[lineIndex];
    if (!line) { setAllDone(true); return; }

    const fullText = lineFullText(line);

    if (charIndex >= fullText.length) {
      const pause = line.kind === "text" && line.text.endsWith("...") ? 700 : 160;
      const t = setTimeout(() => {
        if (lineIndex + 1 >= LINES.length) setAllDone(true);
        else { setLineIndex(l => l + 1); setCharIndex(0); }
      }, pause);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharIndex(c => c + 1), line.kind === "blank" ? 8 : 26);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, allDone]);

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
      <NavBar activePath="/contact" />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "0 40px" }}>

          {LINES.map((line, li) => {
            const isFullyRevealed = lineIndex > li || (allDone && lineIndex >= li);
            const isCurrent       = lineIndex === li && !allDone;

            if (!isFullyRevealed && !isCurrent) return null;

            if (line.kind === "blank") return <div key={li} style={{ height: "10px" }} />;

            if (line.kind === "link" && isFullyRevealed) {
              return (
                <div key={li}>
                  <ScrambleLink
                    prefix={line.prefix}
                    label={line.label}
                    href={line.href}
                    external={line.external}
                  />
                </div>
              );
            }

            const visibleText = isFullyRevealed
              ? lineFullText(line)
              : lineFullText(line).slice(0, charIndex);
            const showCursor = isCurrent && !allDone;

            return (
              <div key={li} style={{
                fontFamily: MONO,
                fontSize:   "clamp(13px, 1.4vw, 16px)",
                color:      "rgba(255,255,255,0.45)",
                lineHeight: 2,
              }}>
                {visibleText}
                {showCursor && (
                  <span style={{ animation: "blink 1s step-start infinite" }}>_</span>
                )}
              </div>
            );
          })}

          {allDone && (
            <div style={{
              fontFamily: MONO,
              fontSize:   "clamp(13px, 1.4vw, 16px)",
              color:      "rgba(255,255,255,0.18)",
              lineHeight: 2,
            }}>
              <span style={{ animation: "blink 1s step-start infinite" }}>_</span>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
