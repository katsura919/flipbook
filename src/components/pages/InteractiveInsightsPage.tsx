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
  body: "Write about the patterns you've noticed this week. What does your body and mind tell you? Look for small correlations — on active days, did you feel better? When you ate well, did your mood improve?",
};

export default function InteractiveInsightsPage({ pageId }: { pageId: string }) {
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
      style={{ background: "linear-gradient(160deg, #f3e5f5, #e8eaf6, #e3f2fd)" }}
    >
      {/* Soft circle accents */}
      <div className="absolute pointer-events-none" style={{ width: "200px", height: "200px", borderRadius: "50%", background: "rgba(149,117,205,0.08)", top: "-60px", right: "-60px" }} />
      <div className="absolute pointer-events-none" style={{ width: "160px", height: "160px", borderRadius: "50%", background: "rgba(100,181,246,0.08)", bottom: "-40px", left: "-40px" }} />

      <div className="relative z-10 flex flex-col h-full px-8 py-7 gap-4">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#9c27b0" }}>Patterns & Insights</p>
          <h2 className="text-lg font-bold" style={{ color: "#4a148c", fontFamily: "Georgia, serif" }}>
            Your Insights
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-px" style={{ background: "rgba(156,39,176,0.3)" }} />
            <span style={{ color: "#ab47bc", fontSize: "10px" }}>✦</span>
          </div>
        </div>

        {/* Main body */}
        <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(156,39,176,0.15)" }}>
          <textarea
            value={data.body}
            onChange={(e) => update("body", e.target.value)}
            rows={4}
            className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none w-full"
            style={{ color: "#4a4a6a", fontFamily: "Georgia, serif" }}
          />
        </div>

        {/* Insight chips */}
        <div className="flex flex-col gap-2">
          {(["insight1", "insight2", "insight3"] as const).map((field) => (
            <div
              key={field}
              className="flex items-start gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(156,39,176,0.07)" }}
            >
              <span style={{ color: "#ab47bc", fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>💡</span>
              <input
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                className="bg-transparent text-xs leading-relaxed focus:outline-none w-full"
                style={{ color: "#5a4a7a" }}
              />
            </div>
          ))}
        </div>

        {/* Correlation row (decorative labels) */}
        <div className="flex items-center gap-2 mt-auto">
          {[
            { label: "Food", emoji: "🥗", color: "#43a047" },
            { label: "+", emoji: "", color: "#9e9e9e" },
            { label: "Mood", emoji: "😊", color: "#ab47bc" },
            { label: "=", emoji: "", color: "#9e9e9e" },
            { label: "Energy", emoji: "⚡", color: "#fb8c00" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              {item.emoji ? (
                <>
                  <span className="text-sm">{item.emoji}</span>
                  <span style={{ color: item.color, fontSize: "8px" }}>{item.label}</span>
                </>
              ) : (
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
              )}
            </div>
          ))}
        </div>

        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#c8b8d8", fontFamily: "Georgia, serif" }}>
          — 03 —
        </p>
      </div>
    </div>
  );
}
