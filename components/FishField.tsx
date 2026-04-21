"use client";

import { useEffect, useRef } from "react";

const SHAPES = [
  { r: "><o>",    l: "<o><",    min: 10, max: 13, spd: 1.3 },
  { r: "><(o>",   l: "<o)><",   min: 12, max: 15, spd: 1.0 },
  { r: "><((o>",  l: "<o))><",  min: 13, max: 17, spd: 0.8 },
  { r: "><(((o>", l: "<o)))><", min: 16, max: 21, spd: 0.5 },
];

type FishShape = typeof SHAPES[number];

type Fish = {
  x: number; y: number; baseY: number; velY: number;
  speed: number; dir: 1 | -1;
  shape: FishShape;
  fontSize: number; opacity: number;
  phase: number; waveFreq: number; waveAmp: number;
};

export type RepelZone = { x: number; y: number; w: number; h: number };

function mkFish(W: number, H: number): Fish {
  const s     = SHAPES[Math.floor(Math.random() * SHAPES.length)]!;
  const depth = Math.random();
  const y     = 60 + Math.random() * (H - 120);
  return {
    x:        Math.random() * W,
    y, baseY: y, velY: 0,
    speed:    (0.25 + depth * 0.9) * s.spd,
    dir:      Math.random() > 0.5 ? 1 : -1,
    shape:    s,
    fontSize: s.min + Math.random() * (s.max - s.min),
    opacity:  0.12 + depth * 0.55,
    phase:    Math.random() * Math.PI * 2,
    waveFreq: 0.0005 + Math.random() * 0.0009,
    waveAmp:  3 + Math.random() * 11,
  };
}

export default function FishField({ repelZonesRef }: { repelZonesRef?: { current: RepelZone[] } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const font = (s: number) => `${s}px "Source Sans 3", "Source Sans Pro", sans-serif`;

    const fish: Fish[] = Array.from({ length: 22 }, () => mkFish(canvas.width, canvas.height));

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    let raf: number;

    function animate(now: number) {
      const W = canvas.width;
      const H = canvas.height;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const zones = repelZonesRef?.current ?? [];

      for (const f of fish) {
        f.x += f.speed * f.dir;
        const margin = f.fontSize * 9;
        if (f.dir ===  1 && f.x > W + margin) f.x = -margin;
        if (f.dir === -1 && f.x < -margin)    f.x = W + margin;

        // Repel from zones
        let force = (f.baseY - f.y) * 0.018; // drift back to baseY
        const pad = 36;
        for (const z of zones) {
          if (f.x > z.x - pad && f.x < z.x + z.w + pad) {
            const top = z.y - pad;
            const bot = z.y + z.h + pad;
            if (f.y > top && f.y < bot) {
              const center = z.y + z.h / 2;
              force += (f.y > center ? 1 : -1) * 0.55;
            }
          }
        }
        f.velY = f.velY * 0.82 + force * 0.18;
        f.y   += f.velY;
        f.y    = Math.max(60, Math.min(H - 60, f.y));

        const fy = f.y + Math.sin(now * f.waveFreq + f.phase) * f.waveAmp;
        if (fy < 10 || fy > H - 10) continue;

        ctx.font      = font(f.fontSize);
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
  }, [repelZonesRef]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}
