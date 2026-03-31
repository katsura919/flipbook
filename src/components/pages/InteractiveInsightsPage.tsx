"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  insight1: string;
  insight2: string;
  insight3: string;
  body: string;
}

const defaults: PageData = {
  insight1: "How did your meals affect your energy levels?",
  insight2: "When did you feel most motivated to move?",
  insight3: "What connection do you see between your mood and habits?",
  body: "Write about the patterns you've noticed this week. Look for small correlations — on active days, did you feel better? When you ate well, did your mood improve?",
};

const insightColors = ["#43a047", "#1e88e5", "#ab47bc"];

export default function InteractiveInsightsPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ratings, setRatings] = useState({ food: 0, mood: 0, exercise: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
    // Pull ratings from snapshot page
    const snap = localStorage.getItem("flipbook-page-wellness-snapshot");
    if (snap) {
      try {
        const s = JSON.parse(snap);
        setRatings({ food: s.foodRating ?? 0, mood: s.moodRating ?? 0, exercise: s.exerciseRating ?? 0 });
      } catch {}
    }
    setLoaded(true);
    requestAnimationFrame(() => setVisible(true));
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

  const ratingItems = [
    { label: "Food", emoji: "🥗", value: ratings.food, color: "#43a047" },
    { label: "Mood", emoji: "😊", value: ratings.mood, color: "#ab47bc" },
    { label: "Energy", emoji: "⚡", value: ratings.exercise, color: "#1e88e5" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #f3e5f5, #e8eaf6, #e3f2fd)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Top color strip */}
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #ab47bc, #1e88e5)" }} />

      {/* Soft circle accents */}
      <div className="absolute pointer-events-none" style={{ width: "220px", height: "220px", borderRadius: "50%", background: "rgba(149,117,205,0.08)", top: "-80px", right: "-80px" }} />
      <div className="absolute pointer-events-none" style={{ width: "160px", height: "160px", borderRadius: "50%", background: "rgba(100,181,246,0.08)", bottom: "-50px", left: "-50px" }} />

      <div className="relative z-10 flex flex-col h-full px-7 py-5 gap-3">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#9c27b0" }}>Patterns & Insights</p>
          <h2 className="text-xl font-bold" style={{ color: "#4a148c", fontFamily: "Georgia, serif" }}>
            Your Insights
          </h2>
        </div>

        {/* Live ratings from snapshot */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center justify-around"
          style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(156,39,176,0.15)" }}
        >
          {ratingItems.map(({ label, emoji, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-lg">{emoji}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="rounded-full"
                    style={{ width: "6px", height: "6px", background: n <= value ? color : "#e0e0e0" }}
                  />
                ))}
              </div>
              <p style={{ color: "#888", fontSize: "8px" }}>{label}</p>
            </div>
          ))}
          <p style={{ color: "#bbb", fontSize: "8px", alignSelf: "flex-end" }}>from snapshot</p>
        </div>

        {/* Main body */}
        <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(156,39,176,0.12)" }}>
          <textarea
            value={data.body}
            onChange={(e) => update("body", e.target.value)}
            rows={3}
            className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none w-full"
            style={{ color: "#4a4a6a", fontFamily: "Georgia, serif" }}
          />
        </div>

        {/* Numbered insight cards */}
        <div className="flex flex-col gap-2">
          {(["insight1", "insight2", "insight3"] as const).map((field, i) => (
            <div
              key={field}
              className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
              style={{
                background: `${insightColors[i]}0d`,
                border: `1px solid ${insightColors[i]}25`,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ width: "20px", height: "20px", background: insightColors[i], color: "white", fontSize: "9px" }}
              >
                {i + 1}
              </div>
              <input
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                className="bg-transparent text-xs leading-relaxed focus:outline-none w-full"
                style={{ color: "#5a4a7a" }}
              />
            </div>
          ))}
        </div>

        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#c8b8d8", fontFamily: "Georgia, serif" }}>
          — 06 —
        </p>
      </div>
    </div>
  );
}
