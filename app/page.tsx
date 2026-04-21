import OrbField from "@/components/OrbField";
import WritingList from "@/components/WritingList";

export default function Home() {
  return (
    <main style={{ width: "100vw", background: "#000" }}>
      <section style={{ width: "100%", height: "100svh", overflow: "hidden", position: "relative" }}>
        <OrbField />

      </section>
      <WritingList />
    </main>
  );
}
