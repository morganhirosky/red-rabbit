"use client";

import { useCallback, useEffect, useRef } from "react";
import FishField, { RepelZone } from "@/components/FishField";
import NavBar from "@/components/NavBar";

const SANS   = '"Source Sans 3", "Source Sans Pro", sans-serif';
const SERIF  = '"Times New Roman", Times, serif';
const OUTFIT = '"Outfit", sans-serif';

const VISITOR_COUNT = "013372";

export default function About() {
  const nameRef       = useRef<HTMLDivElement>(null);
  const bioRef        = useRef<HTMLDivElement>(null);
  const repelZonesRef = useRef<RepelZone[]>([]);

  const updateZones = useCallback(() => {
    const zones: RepelZone[] = [];
    for (const ref of [nameRef, bioRef]) {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        zones.push({ x: r.left, y: r.top, w: r.width, h: r.height });
      }
    }
    repelZonesRef.current = zones;
  }, []);

  useEffect(() => {
    updateZones();
    window.addEventListener("resize", updateZones);
    return () => window.removeEventListener("resize", updateZones);
  }, [updateZones]);

  return (
    <>
      <main style={{
        position:   "relative",
        width:      "100vw",
        height:     "100vh",
        overflow:   "hidden",
        background: "#000",
        fontFamily: SANS,
        color:      "#fff",
      }}>

        {/* ── Fish background ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          <FishField repelZonesRef={repelZonesRef} />
        </div>

        <NavBar activePath="/about" containerStyle={{ position: "absolute", top: 0, left: 0, right: 0, background: "rgba(0,0,0,0.65)" }} />

        {/* ── Centered content ── */}
        <div style={{
          position:      "absolute",
          top:           "61px",
          bottom:        0,
          left:          0,
          right:         0,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent:"center",
          gap:           "32px",
          zIndex:        9,
          pointerEvents: "none",
        }}>

        {/* Name block */}
        <div
          ref={nameRef}
          style={{ textAlign: "center", whiteSpace: "nowrap" }}
        >
          <h1 style={{
            fontFamily:    OUTFIT,
            fontSize:      "clamp(28px, 4vw, 46px)",
            fontWeight:    300,
            color:         "#fff",
            margin:        0,
            lineHeight:    1,
            letterSpacing: "0.08em",
            textShadow:    "0 0 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,1)",
          }}>
            morgan hirosky
          </h1>
          <div style={{
            fontFamily:    OUTFIT,
            fontSize:      "11px",
            fontWeight:    200,
            color:         "rgba(255,255,255,0.28)",
            marginTop:     "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textShadow:    "0 0 20px rgba(0,0,0,1)",
          }}>
            (Her-Ah-Skee)
          </div>
        </div>

        {/* Bio block */}
        <div
          ref={bioRef}
          style={{
            textAlign: "center",
            width:     "min(540px, calc(100vw - 80px))",
          }}
        >
          <p style={body}>
            I have a knack for functional creativity. I love artistry, oddity, and authenticity. I love to learn and collaborate with others. I find satisfaction in successfully utilizing my experience, skillset, and ideas to accomplish goals and fulfill objectives.
          </p>
          <p style={{ ...body, marginBottom: 0 }}>
            I find joy in expression. I love learning to share it in every way
            possible. My perspective is one of the very few things in life that
            truly belongs to me. With that in mind, I take great care and interest
            in the perspectives of others and I am easily inspired by friends,
            family, and strangers.
          </p>
        </div>
        </div>


      </main>
    </>
  );
}

const body: React.CSSProperties = {
  fontFamily:   '"Outfit", sans-serif',
  fontWeight:   200,
  fontSize:     "13px",
  lineHeight:   1.9,
  letterSpacing:"0.03em",
  color:        "#fff",
  marginBottom: "14px",
  textShadow:   "0 0 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,1)",
};
