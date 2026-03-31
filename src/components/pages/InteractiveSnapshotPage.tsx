"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  food: string;
  mood: string;
  exercise: string;
  note: string;
}

const defaults: PageData = {
  food: "Write about your meals and eating habits this week...",
  mood: "How was your mood? Any patterns you noticed?",
  exercise: "What movement or exercise did you do this week?",
  note: "Every small win matters ✨",
};

const sections = [
  { field: "food" as const, emoji: "🥗", label: "Food", color: "#43a047", bg: "#43a04712", border: "#43a04730" },
  { field: "mood" as const, emoji: "😊", label: "Mood", color: "#ab47bc", bg: "#ab47bc12", border: "#ab47bc30" },
  { field: "exercise" as const, emoji: "🏃", label: "Movement", color: "#1e88e5", bg: "#1e88e512", border: "#1e88e530" },
];

export default function InteractiveSnapshotPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
    setLoaded(true);
  }, [pageId]);

  useEffect(() => {
    if (loaded) localStorage.setItem(`flipbook-page-${pageId}`, JSON.stringify(data));
  }, [data, loaded, pageId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stop = (e: Event) => {
      if ((e.target as HTMLElement).closest("input, textarea, label, button")) {
        e.stopPropagation();
      }
    };
    el.addEventListener("mousedown", stop);
    el.addEventListener("touchstart", stop);
    return () => {
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("touchstart", stop);
    };
  }, []);

  const update = (field: keyof PageData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      {/* Ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 31px, #e2d9c8 32px)",
          backgroundPosition: "0 52px",
        }}
      />
      {/* Left margin */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "26px", width: "1px", background: "#e8a87c", opacity: 0.4 }} />

      <div className="relative z-10 flex flex-col h-full px-8 py-6 gap-3">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#81c784" }}>Week in Review</p>
          <h2 className="text-lg font-bold" style={{ color: "#2e7d32", fontFamily: "Georgia, serif" }}>
            Your Weekly Snapshot
          </h2>
          <div className="w-12 h-px mt-1" style={{ background: "#c9a84c" }} />
        </div>

        {/* Sections */}
        {sections.map(({ field, emoji, label, color, bg, border }) => (
          <div
            key={field}
            className="rounded-2xl p-3 flex gap-3"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <span className="text-lg leading-none mt-0.5 shrink-0">{emoji}</span>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{label}</p>
              <textarea
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                rows={2}
                className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none w-full"
                style={{ color: "#5a4a3a" }}
              />
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-4 h-px" style={{ background: "#a5d6a7" }} />
          <input
            value={data.note}
            onChange={(e) => update("note", e.target.value)}
            className="bg-transparent text-xs italic focus:outline-none flex-1"
            style={{ color: "#a5d6a7", fontFamily: "Georgia, serif" }}
          />
        </div>

        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#c8b89a", fontFamily: "Georgia, serif" }}>
          — 02 —
        </p>
      </div>
    </div>
  );
}
