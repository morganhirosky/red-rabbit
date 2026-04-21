"use client";

import Link from "next/link";
import { featureWriting, technicalWriting } from "@/src/data/writing";

export default function WritingList() {
  return (
    <section style={{
      width:     "100%",
      padding:   "80px 64px 120px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        <p style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "11px",
          color:         "rgba(255,255,255,0.25)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom:  "48px",
        }}>
          writing
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {featureWriting.map((entry) => (
            <li key={entry.slug} style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Link
                href={entry.url ?? `/writing/feature/${entry.slug}`}
                target={entry.url ? "_blank" : undefined}
                rel={entry.url ? "noopener noreferrer" : undefined}
                style={{
                  display:        "block",
                  padding:        "20px 0",
                  textDecoration: "none",
                  fontFamily:     '"Source Sans 3", "Source Sans Pro", sans-serif',
                  fontSize:       "14px",
                  color:          "rgba(255,255,255,0.70)",
                  letterSpacing:  "0.03em",
                  transition:     "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
              >
                {entry.title}
              </Link>
            </li>
          ))}

          {technicalWriting.map((entry, i) => (
            <li key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <a
                href={`/senate/${entry.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "block",
                  padding:        "20px 0",
                  textDecoration: "none",
                  fontFamily:     '"Source Sans 3", "Source Sans Pro", sans-serif',
                  fontSize:       "14px",
                  color:          "rgba(255,255,255,0.70)",
                  letterSpacing:  "0.03em",
                  transition:     "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
              >
                {entry.title}
              </a>
            </li>
          ))}

          <li style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
        </ul>

      </div>
    </section>
  );
}
