"use client";

import { useEffect, useRef } from "react";

// ── Boat + fisherman (right side = direction fish are below) ───────────
const BOAT_LINES = [
  "       _____       ",  // hat crown
  "     ,-------,     ",  // hat brim
  "       (o_o)       ",  // face
  "       /|\\        ",  // arms  — \ at col 9, rod fills col 10+
  "  _____|_|_______  ",  // gunwale with seat post
  " /     |_|        \\", // hull upper — seat visible
  "|   ~ ~~~~~  ~  ~  |", // hull interior
  " \\__________________/",// hull lower
];
const BOAT_ROD_ROW = 3;   // row where the rod arm is (moved down for hat+face)
const BOAT_ROD_COL = 10;  // column where the rod begins (unchanged)
const ROD_LEN     = 24;   // characters

// ── Fish shapes ────────────────────────────────────────────────────────
const FISH = [
  { r: "><o>",     l: "<o><",     min: 10, max: 13, spd: 1.3 },
  { r: "><(o>",    l: "<o)><",    min: 12, max: 15, spd: 1.0 },
  { r: "><((o>",   l: "<o))><",   min: 13, max: 17, spd: 0.8 },
  { r: "><(((o>",  l: "<o)))><",  min: 16, max: 21, spd: 0.5 },
];

type Fish = {
  x: number; baseY: number; speed: number; dir: 1 | -1;
  shape: typeof FISH[number]; fontSize: number; opacity: number;
  phase: number; waveFreq: number; waveAmp: number;
};

function mkFish(W: number, wY: number, H: number): Fish {
  const s = FISH[Math.floor(Math.random() * FISH.length)]!;
  const depth = Math.random();
  return {
    x: Math.random() * W,
    baseY: wY + 40 + Math.random() * (H - wY - 70),
    speed: (0.25 + depth * 0.9) * s.spd,
    dir: Math.random() > 0.5 ? 1 : -1,
    shape: s,
    fontSize: s.min + Math.random() * (s.max - s.min),
    opacity: 0.12 + depth * 0.55,
    phase: Math.random() * Math.PI * 2,
    waveFreq: 0.0005 + Math.random() * 0.0009,
    waveAmp: 3 + Math.random() * 11,
  };
}

export default function FishingScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FS   = 16;                          // base font size
    const LH   = FS * 1.22;                  // line height
    const font = (s = FS) => `${s}px "Source Sans 3", "Source Sans Pro", sans-serif`;
    ctx.font    = font();
    const CW   = ctx.measureText("M").width;  // char width
    const BOAT_H = BOAT_LINES.length * LH;

    // ── Layout helpers ────────────────────────────────────────────────
    const waterY  = () => canvas.height * 0.50;
    const boatX   = () => canvas.width  * 0.22;
    const rodEndX = () => boatX() + (BOAT_ROD_COL + ROD_LEN) * CW;

    // ── Spawn fish ────────────────────────────────────────────────────
    const fish: Fish[] = Array.from({ length: 14 }, () =>
      mkFish(canvas.width, waterY(), canvas.height)
    );

    let raf: number;

    function animate(now: number) {
      const W  = canvas.width;
      const H  = canvas.height;
      const wY = waterY();
      const bX = boatX();
      const rX = rodEndX();

      // ── Background ─────────────────────────────────────────────────
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      // Subtle underwater tint
      ctx.fillStyle = "rgba(0,10,28,0.55)";
      ctx.fillRect(0, wY, W, H - wY);

      // ── Rocking motion ─────────────────────────────────────────────
      const rockY     = Math.sin(now * 0.00085) * 6;
      const rockAngle = Math.sin(now * 0.00072) * 0.024;
      const boatTopY  = wY - BOAT_H + rockY;

      // pivot = waterline center of boat
      const pivotX = bX + CW * 8;
      const pivotY = wY + rockY;

      // ── Draw boat (rocked) ──────────────────────────────────────────
      ctx.save();
      ctx.translate(pivotX, pivotY);
      ctx.rotate(rockAngle);
      ctx.translate(-pivotX, -pivotY);
      ctx.font = font();
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      for (let i = 0; i < BOAT_LINES.length; i++) {
        ctx.fillText(BOAT_LINES[i]!, bX, boatTopY + i * LH);
      }
      ctx.restore();

      // ── Fishing rod (rocks with boat) ───────────────────────────────
      const rodY      = boatTopY + BOAT_ROD_ROW * LH;
      const rodStartX = bX + BOAT_ROD_COL * CW;
      ctx.font = font();
      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.fillText("=".repeat(ROD_LEN), rodStartX, rodY);

      // ── Line above water ────────────────────────────────────────────
      const sway   = Math.sin(now * 0.00082) * 3;
      const lineX  = rX + sway;

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      for (let ly = rodY + LH * 0.8; ly < wY; ly += LH * 0.82) {
        ctx.fillText("|", lineX, ly);
      }

      // ── Water surface ───────────────────────────────────────────────
      const waveShift = (now * 0.022) % (CW * 4);
      const waveRep   = "~-~-~-~-".repeat(Math.ceil(W / (CW * 8)) + 4);
      ctx.font = font();
      ctx.fillStyle = "rgba(255,255,255,0.52)";
      ctx.fillText(waveRep, -waveShift, wY);

      // Second wave row (slightly offset)
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText(waveRep, -(waveShift * 0.6) - CW * 2, wY + LH * 0.5);

      // ── Line below water ────────────────────────────────────────────
      const baitDepth = (H - wY) * 0.52;
      const baitSway  = Math.sin(now * 0.00095) * 6;
      const baitX     = lineX + baitSway;
      const baitY     = wY + baitDepth + Math.sin(now * 0.00125) * 7;

      ctx.fillStyle = "rgba(200,200,200,0.38)";
      for (let ly = wY + LH * 0.9; ly < baitY - LH; ly += LH * 0.82) {
        const wobble = Math.sin(now * 0.001 + ly * 0.05) * 1.5;
        ctx.fillText("|", baitX + wobble, ly);
      }

      // Bait
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.font = font(FS * 0.95);
      ctx.fillText("@", baitX - CW * 0.45, baitY);

      // ── Fish ────────────────────────────────────────────────────────
      for (const f of fish) {
        f.x += f.speed * f.dir;
        const margin = f.fontSize * 9;
        if (f.dir ===  1 && f.x > W + margin) f.x = -margin;
        if (f.dir === -1 && f.x < -margin)    f.x = W + margin;

        const fy = f.baseY + Math.sin(now * f.waveFreq + f.phase) * f.waveAmp;
        if (fy < wY + 14) continue; // clip at water surface

        ctx.font = font(f.fontSize);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fillText(f.dir === 1 ? f.shape.r : f.shape.l, f.x, fy);
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
