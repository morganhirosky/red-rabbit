import Link from "next/link";
import { featureWriting } from "@/src/data/writing";

export default function FeatureWriting() {
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
          marginBottom:  "48px",
          textTransform: "uppercase",
        }}>
          feature writing
        </h1>

        {featureWriting.length === 0 ? (
          <p style={{
            fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:   "13px",
            color:      "rgba(26,58,110,0.3)",
          }}>
            no entries yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0" }}>
            {featureWriting.map((entry) => (
              <li key={entry.slug} style={{ borderTop: "1px solid rgba(26,58,110,0.10)" }}>
                <Link
                  href={entry.url ?? `/writing/feature/${entry.slug}`}
                  target={entry.url ? "_blank" : undefined}
                  rel={entry.url ? "noopener noreferrer" : undefined}
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
                  {(entry.publication || entry.description) && (
                    <div style={{
                      fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
                      fontSize:      "11px",
                      color:         "rgba(26,58,110,0.45)",
                      marginTop:     "6px",
                      letterSpacing: "0.06em",
                    }}>
                      {entry.publication && <span>{entry.publication}{entry.description ? " · " : ""}</span>}
                      {entry.description && <span>{entry.description}</span>}
                    </div>
                  )}
                </Link>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(26,58,110,0.10)" }} />
          </ul>
        )}
      </div>
    </main>
  );
}
