"use client";

import { useEffect, useRef } from "react";

const _ = null;

// Color palette
const k  = '#1a1a1a';  // outline
const w  = '#ffffff';  // white
const p  = '#ff99bb';  // pink
const b  = '#4499ff';  // blue
const t  = '#44ddee';  // teal
const g  = '#aaaaaa';  // gray
const o  = '#ee8833';  // orange
const y  = '#ffdd44';  // yellow
const pu = '#aa66ff';  // purple
const lp = '#ffccaa';  // light peach

type Px = string | null;

const SPRITES: { pixels: Px[][]; scale: number }[] = [
  // ── Bunny ─────────────────────────────────────────────────────
  {
    scale: 4,
    pixels: [
      [_,k,k,_,_,k,k,_],
      [_,k,p,_,_,k,p,_],
      [_,k,p,_,_,k,p,_],
      [_,k,k,k,k,k,k,_],
      [_,k,k,w,w,k,k,_],  // eyes
      [_,k,w,w,p,w,k,_],  // nose
      [_,k,w,w,w,w,k,_],
      [_,k,k,k,k,k,k,_],
      [_,k,b,b,b,b,k,_],  // stripe
      [_,k,w,w,w,w,k,_],
      [_,k,b,b,b,b,k,_],  // stripe
      [_,k,k,k,k,k,k,_],
      [_,_,k,k,_,k,k,_],  // legs
      [_,_,k,k,_,k,k,_],
    ],
  },
  // ── Robot ─────────────────────────────────────────────────────
  {
    scale: 4,
    pixels: [
      [_,_,_,_,k,_,_,_],  // antenna
      [_,_,_,k,y,k,_,_],
      [_,k,k,k,k,k,k,_],  // head
      [_,k,t,t,t,t,k,_],
      [_,k,y,t,y,t,k,_],  // eyes
      [_,k,t,t,t,t,k,_],
      [_,k,t,k,k,t,k,_],  // mouth
      [_,k,k,k,k,k,k,_],
      [_,_,k,g,g,k,_,_],  // body
      [_,_,k,g,g,k,_,_],
      [_,_,k,k,k,k,_,_],
      [_,_,k,k,_,k,k,_],  // legs
      [_,_,k,k,_,k,k,_],
    ],
  },
  // ── Cat ───────────────────────────────────────────────────────
  {
    scale: 4,
    pixels: [
      [k,k,_,_,_,_,_,_,k,k],
      [k,o,k,_,_,_,_,k,o,k],
      [_,k,o,k,k,k,k,o,k,_],
      [_,k,o,o,o,o,o,o,k,_],
      [_,k,k,o,k,o,o,k,k,_],  // eyes
      [_,k,o,o,p,o,o,o,k,_],  // nose
      [_,k,o,o,o,o,o,o,k,_],
      [_,_,k,k,k,k,k,k,_,_],
      [_,_,k,_,_,_,k,k,k,k],  // legs + tail
      [_,_,k,_,_,_,k,_,_,k],
    ],
  },
  // ── Diamond ───────────────────────────────────────────────────
  {
    scale: 5,
    pixels: [
      [_,_,_,b,b,_,_,_],
      [_,_,b,w,w,b,_,_],
      [_,b,w,b,b,w,b,_],
      [b,w,b,_,_,b,w,b],
      [b,b,b,b,b,b,b,b],
      [_,b,b,b,b,b,b,_],
      [_,_,b,b,b,b,_,_],
      [_,_,_,b,b,_,_,_],
    ],
  },
  // ── Balloon character ─────────────────────────────────────────
  {
    scale: 4,
    pixels: [
      [_,_,pu,pu,pu,_,_,_],  // balloon
      [_,pu,w, w, w,pu,_,_],
      [_,pu,w, w, w,pu,_,_],
      [_,_,pu,pu,pu,_,_,_],
      [_,_,_,k, _,_,_,_],    // string
      [_,_,k, lp,k,_,_,_],   // head
      [_,_,k, lp,k,_,_,_],
      [_,_,_,k, _,_,_,_],    // neck
      [_,_,k, lp,k,_,_,_],   // body
      [_,_,k, lp,k,_,_,_],
      [_,_,_,k, _,_,_,_],
      [_,_,k, _,k,_,_,_],    // legs
      [_,_,k, _,k,_,_,_],
    ],
  },
];

type Floaty = {
  img:   HTMLCanvasElement;
  x:     number;
  y:     number;
  vx:    number;
  vy:    number;
  phase: number;
};

function makeSprite(pixels: Px[][], scale: number): HTMLCanvasElement {
  const rows = pixels.length;
  const cols = pixels[0]!.length;
  const c    = document.createElement("canvas");
  c.width    = cols * scale;
  c.height   = rows * scale;
  const ctx  = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const color = pixels[r]![col];
      if (color !== null) {
        ctx.fillStyle = color;
        ctx.fillRect(col * scale, r * scale, scale, scale);
      }
    }
  }
  return c;
}

function removeWhiteBackground(src: HTMLCanvasElement, threshold = 230): HTMLCanvasElement {
  const out  = document.createElement("canvas");
  out.width  = src.width;
  out.height = src.height;
  const ctx  = out.getContext("2d")!;
  ctx.drawImage(src, 0, 0);
  const data = ctx.getImageData(0, 0, out.width, out.height);
  for (let i = 0; i < data.data.length; i += 4) {
    if (data.data[i]! > threshold && data.data[i+1]! > threshold && data.data[i+2]! > threshold) {
      data.data[i+3] = 0;
    }
  }
  ctx.putImageData(data, 0, 0);
  return out;
}

function loadImageSprite(src: string, size: number): Promise<HTMLCanvasElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const c   = document.createElement("canvas");
      c.width   = size;
      c.height  = size;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      resolve(removeWhiteBackground(c));
    };
    img.src = src;
  });
}

export default function FloatingSprites() {
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

    let raf: number;

    function startAnimation(floaties: Floaty[]) {
      function frame(now: number) {
        const W = canvas!.width;
        const H = canvas!.height;

        ctx!.clearRect(0, 0, W, H);
        ctx!.imageSmoothingEnabled = false;

        for (const f of floaties) {
          f.x += f.vx;
          f.y += f.vy;

          if (f.x <= 0)               { f.x = 0;               f.vx =  Math.abs(f.vx); }
          if (f.x + f.img.width  >= W){ f.x = W - f.img.width; f.vx = -Math.abs(f.vx); }
          if (f.y <= 0)               { f.y = 0;               f.vy =  Math.abs(f.vy); }
          if (f.y + f.img.height >= H){ f.y = H - f.img.height;f.vy = -Math.abs(f.vy); }

          const bob = Math.sin(now * 0.001 + f.phase) * 5;
          ctx!.drawImage(f.img, Math.round(f.x), Math.round(f.y + bob));
        }

        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    const pixelImgs = SPRITES.map(s => makeSprite(s.pixels, s.scale));

    loadImageSprite("/apple.png", 72).then(appleImg => {
      const allImgs = [...pixelImgs, appleImg];
      const floaties: Floaty[] = allImgs.map(img => ({
        img,
        x:     Math.random() * Math.max(1, canvas.width  - img.width),
        y:     Math.random() * Math.max(1, canvas.height - img.height),
        vx:    (Math.random() * 0.5 + 0.25) * (Math.random() > 0.5 ? 1 : -1),
        vy:    (Math.random() * 0.5 + 0.25) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
      }));
      startAnimation(floaties);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        width:           "100%",
        height:          "100%",
        pointerEvents:   "none",
        zIndex:          5,
        imageRendering:  "pixelated",
      }}
    />
  );
}
