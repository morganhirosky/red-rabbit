"use client";

import { useEffect, useMemo, useState } from "react";

const MONO = '"Courier New", Courier, monospace';

// Courier cells are ~0.6em wide at line-height 1, so a row is ~1.67 columns tall
const ASPECT = 1 / 0.6;
const RAMP   = " .:-=+*#%@";
const STARS  = [".", "·", "+", "*"];

// Seeded PRNG so server and client render the same frame
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

type Scene = { grid: string[][]; stars: [number, number][] };

function moon(cols: number, rows: number): Scene {
  const rand  = rng(7);
  const grid  = Array.from({ length: rows }, () => Array(cols).fill(" "));
  const stars: [number, number][] = [];
  const cx = cols * 0.62, cy = rows * 0.5 * ASPECT, R = rows * 0.42 * ASPECT;
  const craters = [[-0.35, -0.2, 0.22], [0.25, 0.3, 0.18], [0.1, -0.45, 0.12], [-0.1, 0.15, 0.1], [0.45, -0.1, 0.14]];
  const L = [-0.55, -0.45, 0.7];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const nx = (c - cx) / R, ny = (r * ASPECT - cy) / R;
      const d2 = nx * nx + ny * ny;
      if (d2 <= 1) {
        const nz = Math.sqrt(1 - d2);
        let b = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]) * 0.9 + 0.08;
        for (const [kx, ky, kr] of craters) {
          const k = Math.hypot(nx - kx, ny - ky) / kr;
          if (k < 1) b *= 0.55 + 0.45 * k;
        }
        b += (rand() - 0.5) * 0.12;
        grid[r][c] = RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.floor(b * RAMP.length)))];
      } else if (d2 > 1.15 && rand() < 0.035) {
        grid[r][c] = STARS[Math.floor(rand() * STARS.length)];
        stars.push([r, c]);
      }
    }
  }
  return { grid, stars };
}

function dome(cols: number, rows: number): Scene {
  const rand  = rng(42);
  const grid  = Array.from({ length: rows }, () => Array(cols).fill(" "));
  const stars: [number, number][] = [];
  const mid = (cols - 1) / 2;
  // Dome rim: highest at center, sweeping down toward the edges
  const rim = (c: number) => Math.round(rows * 0.6 + rows * 0.16 * ((c - mid) / mid) ** 2);

  // Sky: sparse stars plus a diagonal Milky Way band with a bright core
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r >= rim(c)) continue;
      const band = Math.abs(r - (rows * 0.05 + c * 0.42)) / rows;
      const p = band < 0.05 ? 0.5 : band < 0.12 ? 0.2 : 0.04;
      if (rand() < p) {
        grid[r][c] = band < 0.03 && rand() < 0.4 ? "*" : band < 0.05 ? ":" : STARS[Math.floor(rand() * 3)];
        stars.push([r, c]);
      }
    }
  }

  // Rim line, filling vertical gaps so the curve stays continuous
  for (let c = 0; c < cols; c++) {
    const h = rim(c), prev = c > 0 ? rim(c - 1) : h;
    const [a, b] = [Math.min(h, prev), Math.max(h, prev)];
    for (let r = a; r <= b; r++) grid[r][c] = h === prev ? "_" : c < mid ? "/" : "\\";
  }

  // Seat rows parallel to the rim, spacing widening toward the viewer
  for (let k = 0; ; k++) {
    const off = 2 + k * 2;
    if (rim(Math.round(mid)) + off >= rows) break;
    const gap = 3 + k;
    for (let c = (k * 2) % gap; c < cols; c += gap) {
      const r = rim(c) + off;
      if (r < rows) grid[r][c] = k < 2 ? "·" : "n";
    }
  }
  return { grid, stars };
}

export default function AsciiScene({
  variant, cols = 64, rows = 28, fontSize = "clamp(6px, 0.8vw, 11px)", opacity = 0.7,
}: {
  variant: "moon" | "dome"; cols?: number; rows?: number; fontSize?: string; opacity?: number;
}) {
  const base = useMemo(() => (variant === "moon" ? moon : dome)(cols, rows), [variant, cols, rows]);
  const [grid, setGrid] = useState(base.grid);

  // Twinkle: swap a few stars each tick
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setGrid(g => {
        const next = g.map(row => row.slice());
        for (let i = 0; i < 4; i++) {
          const [r, c] = base.stars[Math.floor(Math.random() * base.stars.length)];
          next[r][c] = STARS[Math.floor(Math.random() * STARS.length)];
        }
        return next;
      });
    }, 280);
    return () => clearInterval(id);
  }, [base]);

  return (
    <pre aria-hidden style={{
      fontFamily: MONO,
      fontSize,
      lineHeight: 1,
      color:      `rgba(255,255,255,${opacity})`,
      margin:     0,
      userSelect: "none",
      whiteSpace: "pre",
    }}>
      {grid.map(row => row.join("")).join("\n")}
    </pre>
  );
}
