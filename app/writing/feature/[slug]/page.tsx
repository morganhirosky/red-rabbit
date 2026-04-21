import Link from "next/link";
import { notFound } from "next/navigation";
import { featureWriting } from "@/src/data/writing";

export function generateStaticParams() {
  return featureWriting
    .filter((e) => !e.url)
    .map((e) => ({ slug: e.slug }));
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = featureWriting.find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <main style={{
      width:      "100vw",
      minHeight:  "100vh",
      background: "#F5F3EE",
      padding:    "120px 64px 120px",
      boxSizing:  "border-box",
    }}>
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>

        {/* Back */}
        <Link href="/writing/feature" style={{
          fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:      "11px",
          color:         "rgba(26,58,110,0.4)",
          textDecoration:"none",
          letterSpacing: "0.1em",
          display:       "block",
          marginBottom:  "64px",
        }}>
          ← feature writing
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <h1 style={{
            fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:      "22px",
            fontWeight:    "normal",
            color:         "#1A3A6E",
            letterSpacing: "0.04em",
            marginBottom:  "16px",
            lineHeight:    1.4,
          }}>
            {entry.title}
          </h1>
          <div style={{
            fontFamily:    '"Source Sans 3", "Source Sans Pro", sans-serif',
            fontSize:      "11px",
            color:         "rgba(26,58,110,0.4)",
            letterSpacing: "0.08em",
            display:       "flex",
            gap:           "16px",
          }}>
            {entry.publication && <span>{entry.publication}</span>}
            <span>{entry.date}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{
          fontFamily:  '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontSize:    "13px",
          lineHeight:  2,
          color:       "rgba(26,58,110,0.75)",
          whiteSpace:  "pre-wrap",
          letterSpacing: "0.02em",
        }}>
          {entry.content || ""}
        </div>

      </div>
    </main>
  );
}
