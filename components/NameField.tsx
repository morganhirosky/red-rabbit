"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET    = "abcdefghijklmnopqrstuvwxyz0123456789.,;:!?+-=*#@/|_~".split("");
const FS         = 13;
const LH         = 13;
const ORB_R    = 65;
const FORCE    = 14;
const MAX_DISP = 55;
const HUE: [number, number, number] = [255, 0, 85];  // displacement flash color

type Phase = "scatter" | "converge" | "idle";

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Char = {
  homeX: number; homeY: number;
  x: number; y: number;
  vx: number; vy: number;
  ch: string;
  isName: boolean;
};

function buildScene(W: number, H: number, CW: number): Char[] {
  const SCALE = 3;
  const OW = W * SCALE, OH = H * SCALE;
  const off = document.createElement("canvas");
  off.width = OW; off.height = OH;
  const oc = off.getContext("2d")!;
  const fs = Math.floor(W * SCALE * 0.13);

  oc.font         = `900 ${fs}px "Helvetica Neue", Arial, sans-serif`;
  oc.fillStyle    = "#fff";
  oc.textAlign    = "center";
  oc.textBaseline = "middle";
  oc.fillText("morgan",  OW / 2, OH * 0.37);
  oc.fillText("hirosky", OW / 2, OH * 0.63);

  const data = oc.getImageData(0, 0, OW, OH).data;
  const cols = Math.ceil(W / CW);
  const rows = Math.ceil(H / LH);
  const chars: Char[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let lit = 0;
      for (let sy = 0; sy < 2; sy++) {
        for (let sx = 0; sx < 2; sx++) {
          const px = Math.round((c * CW + CW * (sx + 0.5) / 2) * SCALE);
          const py = Math.round((r * LH + LH * (sy + 0.5) / 2) * SCALE);
          if (px < OW && py < OH && data[(py * OW + px) * 4 + 3]! > 128) lit++;
        }
      }
      chars.push({
        homeX: c * CW,
        homeY: r * LH + LH * 0.82,
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 6,
        vy:    (Math.random() - 0.5) * 6,
        ch:    CHARSET[Math.floor(Math.random() * CHARSET.length)]!,
        isName: lit >= 3,
      });
    }
  }
  return chars;
}

export default function NameField() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bgRef        = useRef("#0a1628");
  const nameRef      = useRef("#00ebf0");
  const fillerRef    = useRef("#00ebf0");

  const [bgColor,     setBgColor]     = useState("#0a1628");
  const [nameColor,   setNameColor]   = useState("#00ebf0");
  const [fillerColor, setFillerColor] = useState("#00ebf0");

  bgRef.current     = bgColor;
  nameRef.current   = nameColor;
  fillerRef.current = fillerColor;

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

    const chars = buildScene(W, H, CW);

    let phase: Phase = "scatter";
    let orbX = -999, orbY = -999;
    let targetX = -999, targetY = -999;

    const BLAST_R = 160;
    const BLAST_F = 28;
    type Ring = { x: number; y: number; age: number };
    const rings: Ring[] = [];

    const t1 = setTimeout(() => { phase = "converge"; }, 900);
    const t2 = setTimeout(() => { phase = "idle"; }, 2800);

    const onMove = (e: MouseEvent) => {
      if (phase === "idle") { targetX = e.clientX; targetY = e.clientY; }
    };

    const onClick = (e: MouseEvent) => {
      if (phase !== "idle") return;
      const mx = e.clientX, my = e.clientY;
      rings.push({ x: mx, y: my, age: 0 });
      for (const c of chars) {
        const dx = c.x - mx, dy = c.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < BLAST_R * BLAST_R && d2 > 0.01) {
          const dist = Math.sqrt(d2);
          const push = ((BLAST_R - dist) / BLAST_R) * BLAST_F;
          c.vx += (dx / dist) * push;
          c.vy += (dy / dist) * push;
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    let raf: number;

    function frame() {
      const [nr, ng, nb] = hexToRgb(nameRef.current);
      const [fr, fg, fb] = hexToRgb(fillerRef.current);

      ctx.fillStyle = bgRef.current;
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px "Source Sans 3", "Source Sans Pro", sans-serif`;

      // Smooth orb trails cursor instead of teleporting
      if (targetX > -100) {
        orbX = orbX < -100 ? targetX : orbX + (targetX - orbX) * 0.18;
        orbY = orbY < -100 ? targetY : orbY + (targetY - orbY) * 0.18;
      }

      const spring = phase === "converge" ? 0.05 : phase === "idle" ? 0.09 : 0;
      const damp   = phase === "scatter"  ? 0.98 : 0.78;

      for (const c of chars) {
        // Orb repulsion (idle only)
        if (phase === "idle" && orbX > -100) {
          const dx = c.x - orbX;
          const dy = c.y - orbY;
          const d2 = dx * dx + dy * dy;
          if (d2 < ORB_R * ORB_R && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            const push = ((ORB_R - dist) / ORB_R) * FORCE;
            c.vx += (dx / dist) * push;
            c.vy += (dy / dist) * push;
          }
        }

        // Spring toward home
        if (spring > 0) {
          c.vx += (c.homeX - c.x) * spring;
          c.vy += (c.homeY - c.y) * spring;
        }

        // Wall bounce during scatter
        if (phase === "scatter") {
          if (c.x < 0) { c.x = 0; c.vx =  Math.abs(c.vx); }
          if (c.x > W) { c.x = W; c.vx = -Math.abs(c.vx); }
          if (c.y < 0) { c.y = 0; c.vy =  Math.abs(c.vy); }
          if (c.y > H) { c.y = H; c.vy = -Math.abs(c.vy); }
        }

        c.vx *= damp;
        c.vy *= damp;
        c.x  += c.vx;
        c.y  += c.vy;

        // Color + alpha
        let alpha: number;
        let cr: number, cg: number, cb: number;

        if (phase === "scatter") {
          cr = nr; cg = ng; cb = nb;
          alpha = 0.85;
        } else {
          const disp = Math.hypot(c.x - c.homeX, c.y - c.homeY);
          const t    = Math.min(1, disp / MAX_DISP);

          let baseR: number, baseG: number, baseB: number, restAlpha: number;
          if (c.isName) {
            [baseR, baseG, baseB] = [nr, ng, nb];
            restAlpha = 0.90;
          } else {
            [baseR, baseG, baseB] = [fr, fg, fb];
            restAlpha = 0.18;
          }

          cr    = Math.round(baseR + (HUE[0] - baseR) * t);
          cg    = Math.round(baseG + (HUE[1] - baseG) * t);
          cb    = Math.round(baseB + (HUE[2] - baseB) * t);
          alpha = restAlpha + Math.min(1 - restAlpha, disp / 30) * (0.85 - restAlpha);
        }

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(2)})`;
        ctx.fillText(c.ch, c.x, c.y);
      }

      // Expanding rings at click points
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]!;
        ring.age++;
        const progress = ring.age / 40;
        const radius   = progress * BLAST_R;
        const ringAlpha = (1 - progress) * 0.6;
        if (ringAlpha <= 0) { rings.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(${nr},${ng},${nb},${ringAlpha.toFixed(2)})`;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", cursor: "none" }}
      />

      {/* Color picker widget */}
      <div style={{
        position:      "fixed",
        bottom:        "24px",
        right:         "28px",
        display:       "flex",
        flexDirection: "column",
        gap:           "10px",
        zIndex:        10,
      }}>
        {([
          { label: "bg",    value: bgColor,     onChange: setBgColor     },
          { label: "name",  value: nameColor,   onChange: setNameColor   },
          { label: "field", value: fillerColor, onChange: setFillerColor },
        ] as const).map(({ label, value, onChange }) => (
          <label key={label} style={{
            display:    "flex",
            alignItems: "center",
            gap:        "8px",
            fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:   "11px",
            color:      "rgba(255,255,255,0.45)",
            cursor:     "pointer",
          }}>
            <input
              type="color"
              value={value}
              onChange={e => onChange(e.target.value)}
              style={{
                width:        "18px",
                height:       "18px",
                border:       "1px solid rgba(255,255,255,0.25)",
                borderRadius: "3px",
                padding:      "1px",
                background:   "none",
                cursor:       "pointer",
              }}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
