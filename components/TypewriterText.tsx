"use client";

import { useEffect, useState } from "react";

// Types `text` out one character at a time on mount, like the writing page's "select a piece"
export default function TypewriterText({ text, speed = 100, cursor = "_" }: { text: string; speed?: number; cursor?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = reduce ? text.length : 0;
    const id = setInterval(() => {
      i++;
      setCount(Math.min(i, text.length));
      if (i >= text.length) clearInterval(id);
    }, reduce ? 0 : speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span aria-hidden style={{ color: "rgba(255,255,255,0.45)", animation: "blink 1s step-start infinite" }}>{cursor}</span>
    </span>
  );
}
