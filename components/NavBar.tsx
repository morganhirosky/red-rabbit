"use client";

import React, { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "writing",      href: "/writing"      },
  { label: "projects",     href: "/projects"     },
  { label: "observatory",  href: "/observatory"  },
  { label: "contact",      href: "/contact"      },
];

const SANS = '"Source Sans 3", "Source Sans Pro", sans-serif';

export default function NavBar({ activePath, containerStyle }: { activePath: string; containerStyle?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "20px 32px",
        borderBottom:   "1px solid rgba(255,255,255,0.08)",
        flexShrink:     0,
        position:       "relative",
        zIndex:         100,
        ...containerStyle,
      }}>
        <Link href="/" style={{
          fontFamily:    SANS,
          fontSize:      "13px",
          color:         "rgba(255,255,255,0.5)",
          textDecoration:"none",
          letterSpacing: "0.08em",
        }}>
          morgan hirosky
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links">
          {NAV.map(({ label, href }) => {
            const active = activePath === href;
            return (
              <Link key={href} href={href} style={{
                fontFamily:    SANS,
                fontSize:      "12px",
                color:         active ? "#fff" : "rgba(255,255,255,0.28)",
                textDecoration:"none",
                letterSpacing: "0.08em",
              }}>
                {active ? `[${label}]` : label}
              </Link>
            );
          })}
          <a href="/resume.pdf" download style={{
            fontFamily:    SANS,
            fontSize:      "12px",
            color:         "#ff0055",
            textDecoration:"none",
            letterSpacing: "0.08em",
            border:        "1px solid #ff0055",
            padding:       "3px 8px",
            opacity:       0.7,
            transition:    "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
          >
            resume ↓
          </a>
        </nav>

        {/* Hamburger button */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ width: "22px", height: "1px", background: open ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.6)", display: "block", transition: "transform 0.2s", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.6)", display: "block", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
          <span style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.6)", display: "block", transition: "transform 0.2s", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav className={`navbar-mobile-menu${open ? " open" : ""}`}>
        {NAV.map(({ label, href }) => {
          const active = activePath === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily:    SANS,
                fontSize:      "14px",
                color:         active ? "#fff" : "rgba(255,255,255,0.45)",
                textDecoration:"none",
                letterSpacing: "0.08em",
              }}
            >
              {active ? `[${label}]` : label}
            </Link>
          );
        })}
        <a href="/resume.pdf" download onClick={() => setOpen(false)} style={{
          fontFamily:    SANS,
          fontSize:      "14px",
          color:         "#ff0055",
          textDecoration:"none",
          letterSpacing: "0.08em",
          marginTop:     "4px",
        }}>
          resume ↓
        </a>
      </nav>
    </>
  );
}
