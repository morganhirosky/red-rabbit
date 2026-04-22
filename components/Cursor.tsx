"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const [pos,         setPos]         = useState({ x: -200, y: -200 });
  const [hovering,    setHovering]    = useState(false);
  const [spriteHover, setSpriteHover] = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const pathname = usePathname();
  const isAbout  = pathname.startsWith("/about");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      setHovering((e.target as HTMLElement).closest("a, button") !== null);
    };
    const onSpriteHover = (e: Event) => {
      setSpriteHover((e as CustomEvent).detail.hovering);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("sprite-hover", onSpriteHover);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("sprite-hover", onSpriteHover);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div style={{
      position:      "fixed",
      left:          pos.x,
      top:           pos.y,
      transform:     "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex:        9999,
      fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
      fontSize:      isAbout ? "28px" : spriteHover ? "22px" : "20px",
      color:         "#ff0055",
      userSelect:    "none",
      lineHeight:    1,
      fontWeight:    isAbout ? "bold" : "normal",
    }}>
      {hovering ? "[+]" : spriteHover ? "⊕" : "+"}
    </div>
  );
}
