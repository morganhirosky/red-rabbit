"use client";

import NavBar from "@/components/NavBar";

const SANS  = '"Source Sans 3", "Source Sans Pro", sans-serif';
const SERIF = '"Times New Roman", Times, serif';

const LINKS = [
  {
    label: "email",
    value: "morghirosky@gmail.com",
    href:  "mailto:morghirosky@gmail.com",
  },
  {
    label: "linkedin",
    value: "morgan hirosky",
    href:  "https://www.linkedin.com/in/morgan-hirosky-b4350a16b",
  },
];

export default function Contact() {
  return (
    <main style={{
      width:         "100vw",
      height:        "100vh",
      background:    "#000",
      display:       "flex",
      flexDirection: "column",
      color:         "#fff",
      fontFamily:    SANS,
      overflow:      "hidden",
    }}>
      <NavBar activePath="/contact" />

      <div style={{
        flex:          1,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"center",
        gap:           "48px",
      }}>

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily:    SANS,
            fontSize:      "10px",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.25)",
            marginBottom:  "16px",
          }}>
            get in touch
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontSize:   "clamp(28px, 4vw, 52px)",
            fontWeight: "normal",
            color:      "#fff",
            margin:     0,
            lineHeight: 1,
          }}>
            morgan hirosky
          </h1>
        </div>

        <div style={{
          width:        "1px",
          height:       "40px",
          background:   "rgba(255,255,255,0.12)",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center" }}>
          {LINKS.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={label === "linkedin" ? "_blank" : undefined}
              rel={label === "linkedin" ? "noopener noreferrer" : undefined}
              style={{
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                gap:           "6px",
                textDecoration:"none",
                cursor:        "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget.querySelector(".contact-value") as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget.querySelector(".contact-value") as HTMLElement).style.color = "rgba(255,255,255,0.55)";
              }}
            >
              <span style={{
                fontFamily:    SANS,
                fontSize:      "9px",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.25)",
              }}>
                {label}
              </span>
              <span className="contact-value" style={{
                fontFamily:  SERIF,
                fontSize:    "18px",
                fontWeight:  "normal",
                color:       "rgba(255,255,255,0.55)",
                transition:  "color 0.2s",
              }}>
                {value}
              </span>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
