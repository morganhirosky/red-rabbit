import { technicalWriting } from "@/src/data/writing";
import Link from "next/link";

export default function TechnicalWriting() {
  return (
    <main style={{
      width:      "100vw",
      minHeight:  "100vh",
      background: "#F5F3EE",
      padding:    "120px 64px 80px",
      boxSizing:  "border-box",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Back */}
        <Link href="/writing" style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "11px",
          color:         "rgba(26,58,110,0.4)",
          textDecoration:"none",
          letterSpacing: "0.1em",
          display:       "block",
          marginBottom:  "48px",
        }}>
          ← writing
        </Link>

        <h1 style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "13px",
          fontWeight:    "normal",
          letterSpacing: "0.12em",
          color:         "rgba(26,58,110,0.35)",
          marginBottom:  "8px",
          textTransform: "uppercase",
        }}>
          technical writing
        </h1>
        <p style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "11px",
          color:         "rgba(26,58,110,0.3)",
          letterSpacing: "0.06em",
          marginBottom:  "48px",
        }}>
          senate proclamations &amp; resolutions — texas senate
        </p>

        {technicalWriting.length === 0 ? (
          <p style={{
            fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:   "13px",
            color:      "rgba(26,58,110,0.3)",
          }}>
            no entries yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
            {technicalWriting.map((entry, i) => (
              <li key={i} style={{ borderTop: "1px solid rgba(26,58,110,0.10)" }}>
                <a
                  href={`/senate/${entry.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "block",
                    padding:        "24px 0",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "24px" }}>
                    <span style={{
                      fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
                      fontSize:      "14px",
                      color:         "#1A3A6E",
                      letterSpacing: "0.04em",
                    }}>
                      {entry.title}
                    </span>
                    <span style={{
                      fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
                      fontSize:      "11px",
                      color:         "rgba(26,58,110,0.35)",
                      whiteSpace:    "nowrap",
                      letterSpacing: "0.06em",
                    }}>
                      {entry.date}
                    </span>
                  </div>
                  {entry.description && (
                    <div style={{
                      fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
                      fontSize:      "11px",
                      color:         "rgba(26,58,110,0.45)",
                      marginTop:     "6px",
                      letterSpacing: "0.06em",
                    }}>
                      {entry.description}
                    </div>
                  )}
                </a>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(26,58,110,0.10)" }} />
          </ul>
        )}
      </div>
    </main>
  );
}
