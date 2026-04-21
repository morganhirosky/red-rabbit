"use client";

import { useEffect, useRef, useState } from "react";

// ── Sprite data ───────────────────────────────────────────────────────────────

type Action = 'spin' | 'float' | 'flash' | 'blink' | 'shake';

const SPRITE_DEFS: { src: string; action: Action; drawH: number; invert?: boolean; stripWhite?: boolean }[] = [
  { src: '/sprites/bunny.png', action: 'spin',  drawH: 70 },
  { src: '/sprites/tooth.png', action: 'shake', drawH: 52 },
  { src: '/sprites/bug.png',   action: 'blink', drawH: 82 },
  { src: '/sprites/apple.png', action: 'float', drawH: 62, stripWhite: true },
];

function stripWhiteBg(img: HTMLImageElement, drawH: number): HTMLCanvasElement {
  const drawW = Math.round(img.naturalWidth / img.naturalHeight * drawH);
  const c = document.createElement("canvas");
  c.width = drawW; c.height = drawH;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, drawW, drawH);
  const d = ctx.getImageData(0, 0, drawW, drawH);
  for (let i = 0; i < d.data.length; i += 4) {
    if (d.data[i]! > 230 && d.data[i+1]! > 230 && d.data[i+2]! > 230) d.data[i+3] = 0;
  }
  ctx.putImageData(d, 0, 0);
  return c;
}

// Preload images at module level so they're ready before the animation starts
const preloadedImages: Promise<HTMLImageElement>[] = SPRITE_DEFS.map(d =>
  new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = d.src;
  })
);

// ── Text / name sampling ──────────────────────────────────────────────────────

const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789.,;:!?+-=*#@/|_~".split("");
const FS      = 9;
const LH      = 9;
const ORB_R   = 130;
const FORCE   = 10;
const SPR_R   = 65;
const SPR_F   = 5;

type Phase = "scatter" | "converge" | "idle";

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Char = {
  homeX: number; homeY: number;
  x: number; y: number;
  vx: number; vy: number;
  ch: string;
};

type Floaty = {
  img: HTMLImageElement | HTMLCanvasElement;
  action: Action;
  invert: boolean;
  drawW: number;
  drawH: number;
  repelR: number;
  idx: number;
  x: number; y: number;
  vx: number; vy: number;
  driftVx: number; driftVy: number;
  phase: number;
  timer: number;
  angle: number;
  alpha: number;
  entered: boolean;
};

function sampleName(W: number, H: number, CW: number): Array<{ x: number; y: number }> {
  const SCALE  = 3;
  const OW     = W * SCALE;
  const OH     = H * SCALE;
  const off    = document.createElement("canvas");
  off.width    = OW;
  off.height   = OH;
  const oc     = off.getContext("2d")!;
  const fs     = Math.floor(W * SCALE * 0.13);

  oc.font          = `900 ${fs}px "Helvetica Neue", Arial, sans-serif`;
  oc.fillStyle     = "#fff";
  oc.textAlign     = "center";
  oc.textBaseline  = "middle";
  oc.fillText("morgan",  OW / 2, OH * 0.37);
  oc.fillText("hirosky", OW / 2, OH * 0.63);

  const data = oc.getImageData(0, 0, OW, OH).data;
  const positions: Array<{ x: number; y: number }> = [];
  const cols = Math.ceil(W / CW);
  const rows = Math.ceil(H / LH);

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
      if (lit >= (W < 600 ? 1 : 3)) {
        positions.push({ x: c * CW, y: r * LH + LH * 0.82 });
      }
    }
  }
  return positions;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function OrbField() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const bgRef      = useRef("#000000");
  const textRef    = useRef("#ffffff");

  const [bgColor,   setBgColor]   = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [isMobile,  setIsMobile]  = useState(false);

  const SCRAMBLE_WORDS = ["morgan", "hirosky"];
  const [displayChars, setDisplayChars] = useState<string[][]>(
    SCRAMBLE_WORDS.map(w => w.split(""))
  );

  bgRef.current   = bgColor;
  textRef.current = textColor;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const SCRAMBLE  = 20;   // ticks of all-random scramble
    const PER_CHAR  = 5;    // ticks between each char snap
    const HOLD      = 100;  // ticks to hold the finished name
    const TOTAL_CHARS = SCRAMBLE_WORDS.reduce((s, w) => s + w.length, 0);
    const CYCLE     = SCRAMBLE + TOTAL_CHARS * PER_CHAR + HOLD;
    let tick = 0;
    const id = setInterval(() => {
      tick = (tick + 1) % CYCLE;
      if (tick < SCRAMBLE) {
        setDisplayChars(SCRAMBLE_WORDS.map(w =>
          w.split("").map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)]!)
        ));
      } else if (tick < SCRAMBLE + TOTAL_CHARS * PER_CHAR) {
        const revealed = Math.floor((tick - SCRAMBLE) / PER_CHAR);
        let g = 0;
        setDisplayChars(SCRAMBLE_WORDS.map(w =>
          w.split("").map((ch) => {
            const show = g++ < revealed;
            return show ? ch : CHARSET[Math.floor(Math.random() * CHARSET.length)]!;
          })
        ));
      } else {
        setDisplayChars(SCRAMBLE_WORDS.map(w => w.split("")));
      }
    }, 55);
    return () => clearInterval(id);
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const mobile = W < 768;

    ctx.font  = `${FS}px "Courier New", monospace`;
    const CW  = ctx.measureText("M").width;
    const homes = mobile ? [] : sampleName(W, H, CW);

    const rand  = seededRand(643294);
    const chars: Char[] = homes.map(({ x: hx, y: hy }) => ({
      homeX: hx, homeY: hy,
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 6,
      vy:    (Math.random() - 0.5) * 6,
      ch:    CHARSET[Math.floor(rand() * CHARSET.length)]!,
    }));

    const floaties: Floaty[] = [];
    Promise.all(preloadedImages).then(imgs => {
      imgs.forEach((img, i) => {
        const def   = SPRITE_DEFS[i]!;
        const drawH = def.drawH;
        const drawW = Math.round(img.naturalWidth / img.naturalHeight * drawH);
        const spriteImg: HTMLImageElement | HTMLCanvasElement = def.stripWhite ? stripWhiteBg(img, drawH) : img;
        const dvx = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
        const dvy = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
        floaties.push({
          img: spriteImg, action: def.action, invert: def.invert ?? false,
          drawW, drawH, repelR: Math.max(drawW, drawH) / 2 + 30, idx: i,
          x:       Math.random() * Math.max(1, W - drawW),
          y:       Math.random() * Math.max(1, H - drawH),
          vx:      dvx, vy: dvy,
          driftVx: dvx, driftVy: dvy,
          phase:   Math.random() * Math.PI * 2,
          timer:   0,
          angle:   0,
          alpha:   0,
          entered: false,
        });
      });
      imagesLoaded = true;
    });

    let animPhase: Phase = "scatter";
    let orbX = -999, orbY = -999;
    let imagesLoaded = false;
    let idleReached  = false;

    type Drag = { f: Floaty; ox: number; oy: number; lx: number; ly: number; dvx: number; dvy: number; moved: boolean };
    let drag: Drag | null = null;

    const t1 = setTimeout(() => { animPhase = "converge"; }, 900);
    const t2 = setTimeout(() => { animPhase = "idle"; idleReached = true; }, 2800);

    const onMove = (e: MouseEvent) => {
      if (animPhase === "idle") { orbX = e.clientX; orbY = e.clientY; }
      if (!drag) return;
      const dx = e.clientX - drag.lx, dy = e.clientY - drag.ly;
      drag.dvx = dx; drag.dvy = dy;
      drag.lx  = e.clientX; drag.ly = e.clientY;
      drag.f.x = e.clientX - drag.ox;
      drag.f.y = e.clientY - drag.oy;
      drag.f.vx = 0; drag.f.vy = 0;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    };

    const onDown = (e: MouseEvent) => {
      for (const f of floaties) {
        if (e.clientX >= f.x && e.clientX <= f.x + f.drawW &&
            e.clientY >= f.y && e.clientY <= f.y + f.drawH) {
          drag = { f, ox: e.clientX - f.x, oy: e.clientY - f.y,
                   lx: e.clientX, ly: e.clientY, dvx: 0, dvy: 0, moved: false };
          break;
        }
      }
    };

    const onUp = () => {
      if (!drag) return;
      if (!drag.moved) {
        drag.f.timer = 90;
        if (drag.f.action === 'float') drag.f.vy = -7;
      } else {
        drag.f.vx = drag.dvx * 0.9;
        drag.f.vy = drag.dvy * 0.9;
      }
      drag = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      if (animPhase === "idle") { orbX = t.clientX; orbY = t.clientY; }
      if (!drag) return;
      e.preventDefault();
      const dx = t.clientX - drag.lx, dy = t.clientY - drag.ly;
      drag.dvx = dx; drag.dvy = dy;
      drag.lx  = t.clientX; drag.ly = t.clientY;
      drag.f.x = t.clientX - drag.ox;
      drag.f.y = t.clientY - drag.oy;
      drag.f.vx = 0; drag.f.vy = 0;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      for (const f of floaties) {
        if (t.clientX >= f.x && t.clientX <= f.x + f.drawW &&
            t.clientY >= f.y && t.clientY <= f.y + f.drawH) {
          e.preventDefault();
          drag = { f, ox: t.clientX - f.x, oy: t.clientY - f.y,
                   lx: t.clientX, ly: t.clientY, dvx: 0, dvy: 0, moved: false };
          break;
        }
      }
    };
    const onTouchEnd = () => onUp();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    window.addEventListener("touchend",   onTouchEnd);

    let raf: number;

    function frame(now: number) {
      const bg        = bgRef.current;
      const [tr, tg, tb] = hexToRgb(textRef.current);

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px "Courier New", monospace`;

      const spring = animPhase === "converge" ? 0.05 : animPhase === "idle" ? 0.10 : 0;
      const damp   = animPhase === "scatter"  ? 0.98 : 0.80;

      for (const c of chars) {
        if (animPhase === "idle" && orbX > -100) {
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

        // Sprite repulsion (only once sprites are visible)
        if (animPhase === "idle") {
          for (const f of floaties) {
            const sx = f.x + f.drawW / 2;
            const sy = f.y + f.drawH / 2;
            const dx = c.x - sx, dy = c.y - sy;
            const d2 = dx * dx + dy * dy;
            if (d2 < SPR_R * SPR_R && d2 > 0.01) {
              const d    = Math.sqrt(d2);
              const push = ((SPR_R - d) / SPR_R) * SPR_F;
              c.vx += (dx / d) * push;
              c.vy += (dy / d) * push;
            }
          }
        }

        if (spring > 0) {
          c.vx += (c.homeX - c.x) * spring;
          c.vy += (c.homeY - c.y) * spring;
        }

        if (animPhase === "scatter") {
          if (c.x < 0) { c.x = 0; c.vx =  Math.abs(c.vx); }
          if (c.x > W) { c.x = W; c.vx = -Math.abs(c.vx); }
          if (c.y < 0) { c.y = 0; c.vy =  Math.abs(c.vy); }
          if (c.y > H) { c.y = H; c.vy = -Math.abs(c.vy); }
        }

        c.vx *= damp;
        c.vy *= damp;
        c.x  += c.vx;
        c.y  += c.vy;

        const disp  = Math.hypot(c.x - c.homeX, c.y - c.homeY);
        const alpha = animPhase === "scatter"
          ? 0.85
          : 0.95 - Math.min(0.60, disp / 25) * 0.75;

        ctx.fillStyle = `rgba(${tr},${tg},${tb},${alpha.toFixed(2)})`;
        ctx.fillText(c.ch, c.x, c.y);
      }

      // Orb glow
      if (animPhase === "idle" && orbX > -100) {
        const g = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, ORB_R);
        g.addColorStop(0,    `rgba(${tr},${tg},${tb},0.12)`);
        g.addColorStop(0.45, `rgba(${tr},${tg},${tb},0.04)`);
        g.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orbX, orbY, ORB_R, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Sprites ─────────────────────────────────────────────────
      for (const f of floaties) {
        f.alpha = imagesLoaded ? 1 : 0;

        const isDragging = drag?.f === f;
        if (!isDragging) {
          f.vx += (f.driftVx - f.vx) * 0.02;
          f.vy += (f.driftVy - f.vy) * 0.02;
          f.x  += f.vx; f.y += f.vy;
          if (f.x <= 0)              { f.x = 0;              f.vx =  Math.abs(f.vx); f.driftVx =  Math.abs(f.driftVx); }
          if (f.x + f.drawW >= W)    { f.x = W - f.drawW;    f.vx = -Math.abs(f.vx); f.driftVx = -Math.abs(f.driftVx); }
          if (f.y <= 0)              { f.y = 0;              f.vy =  Math.abs(f.vy); f.driftVy =  Math.abs(f.driftVy); }
          if (f.y + f.drawH >= H)    { f.y = H - f.drawH;    f.vy = -Math.abs(f.vy); f.driftVy = -Math.abs(f.driftVy); }
        }

        const bob   = isDragging ? 0 : Math.sin(now * 0.001 + f.phase) * 4;
        const drawX = Math.round(f.x);
        const drawY = Math.round(f.y + bob);
        const hw    = f.drawW / 2;
        const hh    = f.drawH / 2;

        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.imageSmoothingEnabled = true;

        if (f.timer > 0) {
          f.timer--;
          const prog = f.timer / 90;

          switch (f.action) {
            case 'spin':
              f.angle += 0.12;
              ctx.translate(drawX + hw, drawY + hh);
              ctx.rotate(f.angle);
              ctx.drawImage(f.img, -hw, -hh, f.drawW, f.drawH);
              break;

            case 'shake': {
              const ox = (Math.random() - 0.5) * 10 * prog;
              const oy = (Math.random() - 0.5) * 10 * prog;
              ctx.drawImage(f.img, drawX + ox, drawY + oy, f.drawW, f.drawH);
              break;
            }

            case 'flash':
              ctx.drawImage(f.img, drawX, drawY, f.drawW, f.drawH);
              if (Math.floor(now / 80) % 2 === 0) {
                ctx.globalAlpha = 0.55 * prog;
                ctx.fillStyle   = '#FF66AA';
                ctx.fillRect(drawX, drawY, f.drawW, f.drawH);
                ctx.globalAlpha = 1;
              }
              break;

            case 'blink': {
              ctx.drawImage(f.img, drawX, drawY, f.drawW, f.drawH);
              const blinkColors = ['#44CC44', '#FFCC00', '#FF4444', '#0088FF', '#FF66AA'];
              const ci = Math.floor(now / 150) % blinkColors.length;
              ctx.globalAlpha = 0.4 * prog;
              ctx.fillStyle = blinkColors[ci]!;
              ctx.fillRect(drawX, drawY, f.drawW, f.drawH);
              ctx.globalAlpha = 1;
              break;
            }

            case 'float':
              ctx.drawImage(f.img, drawX, drawY, f.drawW, f.drawH);
              break;
          }
        } else {
          if (f.action === 'spin') f.angle = 0;
          ctx.drawImage(f.img, drawX, drawY, f.drawW, f.drawH);
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", cursor: "none" }}
      />

      {/* Mobile name overlay */}
      {isMobile && (
        <div style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          textAlign:     "center",
          pointerEvents: "none",
          zIndex:        5,
        }}>
          {displayChars.map((wordChars, wi) => (
            <div key={wi} style={{ fontFamily: '"Courier New", monospace', fontSize: "9vw", color: "rgba(255,255,255,0.85)", letterSpacing: "0.15em", lineHeight: 1.3 }}>
              {wordChars.join("")}
            </div>
          ))}
        </div>
      )}

      {/* Color picker widget */}
      <div style={{
        position:     "fixed",
        bottom:       "24px",
        right:        "28px",
        display:      "flex",
        flexDirection:"column",
        gap:          "10px",
        zIndex:       10,
      }}>
        {[
          { label: "bg",   value: bgColor,   onChange: setBgColor   },
          { label: "text", value: textColor, onChange: setTextColor },
        ].map(({ label, value, onChange }) => (
          <label key={label} style={{
            display:     "flex",
            alignItems:  "center",
            gap:         "8px",
            fontFamily:  '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:    "11px",
            color:       "rgba(255,255,255,0.45)",
            cursor:      "pointer",
          }}>
            <input
              type="color"
              value={value}
              onChange={e => onChange(e.target.value)}
              style={{
                width:      "18px",
                height:     "18px",
                border:     "1px solid rgba(255,255,255,0.25)",
                borderRadius:"3px",
                padding:    "1px",
                background: "none",
                cursor:     "pointer",
              }}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
