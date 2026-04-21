"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "morgan hirosky",
  "",
  "writer · journalist · storyteller",
  "",
  "words have always been the most honest tool",
  "i know for making sense of the world.",
  "i write to find the truth buried",
  "beneath the noise — then share it.",
  "",
  "currently: lead writer, texas senate,",
  "where precision and clarity are the job.",
  "",
  "trained at texas state university,",
  "ba in journalism, 2022.",
  "",
  "drawn to stories at the edges of the obvious —",
  "the human truth that statistics miss.",
  "",
  "this portfolio is an ongoing record",
  "of that pursuit.",
];

const FS     = 12;
const LH     = 22;
const ORB_R  = 75;
const FORCE  = 8;
const SPRING = 0.10;
const DAMP   = 0.74;
const BASE: [number, number, number] = [0, 235, 240];
const HUE:  [number, number, number] = [255, 0, 136];

type Char = {
  homeX: number; homeY: number;
  x: number; y: number;
  vx: number; vy: number;
  ch: string;
  isTitle: boolean;
};

function buildChars(W: number, H: number, CW: number): Char[] {
  const chars: Char[] = [];
  const totalH = LINES.length * LH;
  const startY = (H - totalH) / 2 + 30;

  for (let li = 0; li < LINES.length; li++) {
    const line = LINES[li]!;
    if (!line.length) continue;
    const lineW = line.length * CW;
    const sx = (W - lineW) / 2;
    const y  = startY + li * LH + LH * 0.75;

    for (let ci = 0; ci < line.length; ci++) {
      const x = sx + ci * CW;
      chars.push({ homeX: x, homeY: y, x, y, vx: 0, vy: 0, ch: line[ci]!, isTitle: li === 0 });
    }
  }
  return chars;
}

export default function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    ctx.font = `${FS}px "Source Sans 3", "Source Sans Pro", sans-serif`;
    const CW = ctx.measureText("M").width;

    const chars = buildChars(W, H, CW);
    let orbX = -999, orbY = -999;

    const onMove = (e: MouseEvent) => { orbX = e.clientX; orbY = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf: number;

    function frame() {
      ctx.fillStyle = "#0a1628";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px "Source Sans 3", "Source Sans Pro", sans-serif`;
      ctx.textBaseline = "alphabetic";

      for (const c of chars) {
        if (orbX > -100) {
          const dx = c.x - orbX, dy = c.y - orbY;
          const d2 = dx * dx + dy * dy;
          if (d2 < ORB_R * ORB_R && d2 > 0.01) {
            const d    = Math.sqrt(d2);
            const push = ((ORB_R - d) / ORB_R) * FORCE;
            c.vx += (dx / d) * push;
            c.vy += (dy / d) * push;
          }
        }

        c.vx += (c.homeX - c.x) * SPRING;
        c.vy += (c.homeY - c.y) * SPRING;
        c.vx *= DAMP; c.vy *= DAMP;
        c.x  += c.vx; c.y  += c.vy;

        const disp = Math.hypot(c.x - c.homeX, c.y - c.homeY);
        const t    = Math.min(1, disp / 45);
        const al   = (c.isTitle ? 0.95 : 0.65) - t * 0.40;
        const cr   = Math.round(BASE[0] + (HUE[0] - BASE[0]) * t);
        const cg   = Math.round(BASE[1] + (HUE[1] - BASE[1]) * t);
        const cb   = Math.round(BASE[2] + (HUE[2] - BASE[2]) * t);

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.max(0.05, al).toFixed(2)})`;
        ctx.fillText(c.ch, c.x, c.y);
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display:        "block",
        width:          "100%",
        height:         "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}
