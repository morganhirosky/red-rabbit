"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "writing",     href: "/writing"     },
  { label: "projects",    href: "/projects"    },
  { label: "observatory", href: "/observatory" },
  { label: "contact",     href: "/contact"     },
];

// Pages with light backgrounds — use cobalt palette
const LIGHT_PAGES: string[] = [];
// Pages that need white header
const WHITE_PAGES = ["/about"];
// Pages that render their own nav — hide global header
const NO_HEADER_PAGES = ["/writing", "/projects"];

export default function Header() {
  const pathname = usePathname();

  const isLight  = LIGHT_PAGES.some((p) => pathname.startsWith(p));
  const isWhite  = WHITE_PAGES.some((p) => pathname.startsWith(p));
  const noHeader = NO_HEADER_PAGES.some((p) => pathname.startsWith(p));

  if (noHeader) return null;

  const nameColor   = isWhite ? "rgba(255,255,255,0.80)" : isLight ? "rgba(26,58,110,0.60)" : "rgba(255,255,255,0.50)";
  const linkColor   = isWhite ? "rgba(255,255,255,0.45)" : isLight ? "rgba(26,58,110,0.30)" : "rgba(255,255,255,0.28)";
  const activeColor = isWhite ? "#ffffff"                : isLight ? "#1A3A6E"              : "#ffffff";

  return (
    <header style={{
      position:       "fixed",
      top:            0,
      left:           0,
      right:          0,
      zIndex:         10,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "20px 32px",
      pointerEvents:  "none",
    }}>
      {/* Name / home link */}
      <Link href="/" style={{
        fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
        fontSize:      "13px",
        color:         nameColor,
        textDecoration:"none",
        letterSpacing: "0.08em",
        pointerEvents: "auto",
        transition:    "color 0.3s",
      }}>
        morgan hirosky
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {NAV.map(({ label, href }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} style={{
              fontFamily:     '"Source Sans 3", "Source Sans Pro", sans-serif',
              fontSize:       "12px",
              color:          active ? activeColor : linkColor,
              textDecoration: "none",
              letterSpacing:  "0.08em",
              pointerEvents:  "auto",
              transition:     "color 0.3s",
              padding:        "12px 8px",
            }}>
              {active ? `[${label}]` : label}
            </Link>
          );
        })}
        <a href="/resume.pdf" download style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "12px",
          color:         "#ff0055",
          textDecoration:"none",
          letterSpacing: "0.08em",
          pointerEvents: "auto",
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
    </header>
  );
}
