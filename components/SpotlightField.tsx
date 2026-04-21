"use client";

import { useEffect, useRef } from "react";

const CHARSET    = "abcdefghijklmnopqrstuvwxyz0123456789.,;:!?+-=*#@/|_~".split("");
const FS         = 13;
const LH         = 13;
const ORB_R      = 170;
const BASE_ALPHA = 0.035;
const DECAY      = 0.92;

type Char = {
  x: number;
  y: number;
  ch: string;
  glow: number; // 0–1, fades after cursor leaves
};

export default function SpotlightField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width;
    const H = canvas.height;

    ctx.font = `${FS}px "Source Sans 3", "Source Sans Pro", sans-serif`;
    const CW = ctx.measureText("M").width;

    const cols = Math.ceil(W / CW) + 1;
    const rows = Math.ceil(H / LH) + 1;
    const chars: Char[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        chars.push({
          x:    c * CW,
          y:    r * LH + LH * 0.82,
          ch:   CHARSET[Math.floor(Math.random() * CHARSET.length)]!,
          glow: 0,
        });
      }
    }

    let orbX = -999, orbY = -999;
    const onMove = (e: MouseEvent) => { orbX = e.clientX; orbY = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf: number;

    function frame() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px "Source Sans 3", "Source Sans Pro", sans-serif`;

      for (const c of chars) {
        const dx = c.x - orbX;
        const dy = c.y - orbY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const illumination = Math.max(0, 1 - dist / ORB_R);
        const lit = illumination * illumination; // quadratic falloff

        // Glow decays slowly — leaves a fading trail
        c.glow = Math.max(c.glow * DECAY, lit);

        const alpha = BASE_ALPHA + c.glow * (1 - BASE_ALPHA);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
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
      style={{ display: "block", width: "100%", height: "100%", cursor: "none" }}
    />
  );
}
