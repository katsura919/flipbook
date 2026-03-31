"use client";

import { Great_Vibes } from "next/font/google";
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
  body: "Write about the patterns you noticed this week. Look for small correlations. On active days, did you feel better? When you ate well, did your mood improve?",
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const insightColors = [
  "var(--brand-forest-green)",
  "#6d8254",
  "#b86b4d",
];

export default function InteractiveInsightsPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ratings, setRatings] = useState({ food: 0, mood: 0, exercise: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {}
    }

    const snapshot = localStorage.getItem("flipbook-page-wellness-snapshot");
    if (snapshot) {
      try {
        const parsed = JSON.parse(snapshot);
        setRatings({
          food: parsed.foodRating ?? 0,
          mood: parsed.moodRating ?? 0,
          exercise: parsed.exerciseRating ?? 0,
        });
      } catch {}
    }

    setLoaded(true);
    requestAnimationFrame(() => setVisible(true));
  }, [pageId]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(`flipbook-page-${pageId}`, JSON.stringify(data));
    }
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
    { label: "Food", value: ratings.food, color: "var(--brand-forest-green)", mark: "F" },
    { label: "Mood", value: ratings.mood, color: "#6d8254", mark: "M" },
    { label: "Movement", value: ratings.exercise, color: "#b86b4d", mark: "X" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(165deg, var(--brand-cream) 0%, #f4eddc 58%, #ece2ca 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    > 

      <div
        className="absolute pointer-events-none"
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(201, 168, 76, 0.14)",
          top: "-90px",
          right: "-80px",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(45, 90, 61, 0.1)",
          bottom: "-50px",
          left: "-48px",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-7 py-5 gap-3">
        <div>
          <p
            className={`${accentScript.className} text-[30px] leading-none`}
            style={{ color: "var(--brand-forest-green)" }}
          >
            Patterns and Insights
          </p>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--brand-deep-green)", fontFamily: "var(--font-serif)" }}
          >
            Your Insights
          </h2>
        </div>

        <div
          className="rounded-2xl px-4 py-3 flex items-center justify-around"
          style={{
            background: "rgba(250, 247, 240, 0.6)",
            border: "1px solid rgba(44, 58, 46, 0.14)",
          }}
        >
          {ratingItems.map(({ label, value, color, mark }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-bold"
                style={{
                  color,
                  background: "rgba(250, 247, 240, 0.9)",
                  border: `1px solid ${color}55`,
                }}
              >
                {mark}
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="rounded-full"
                    style={{
                      width: "6px",
                      height: "6px",
                      background: n <= value ? color : "rgba(44, 58, 46, 0.14)",
                    }}
                  />
                ))}
              </div>
              <p
                className="text-[8px] uppercase tracking-[0.08em]"
                style={{ color: "rgba(44, 58, 46, 0.55)" }}
              >
                {label}
              </p>
            </div>
          ))}
          <p
            className="text-[8px] uppercase tracking-[0.08em] self-end"
            style={{ color: "rgba(44, 58, 46, 0.42)" }}
          >
            from snapshot
          </p>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgba(250, 247, 240, 0.62)",
            border: "1px solid rgba(44, 58, 46, 0.12)",
          }}
        >
          <textarea
            value={data.body}
            onChange={(e) => update("body", e.target.value)}
            rows={4}
            className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none w-full"
            style={{ color: "var(--brand-charcoal)", fontFamily: "var(--font-serif)" }}
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0">
          {(["insight1", "insight2", "insight3"] as const).map((field, i) => (
            <div
              key={field}
              className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
              style={{
                background: `${insightColors[i]}12`,
                border: `1px solid ${insightColors[i]}33`,
              }}
            >
              <div
                className="rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                style={{
                  width: "20px",
                  height: "20px",
                  background: insightColors[i],
                  color: "white",
                }}
              >
                {i + 1}
              </div>
              <input
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                className="bg-transparent text-xs leading-relaxed focus:outline-none w-full"
                style={{ color: "var(--brand-charcoal)" }}
              />
            </div>
          ))}
        </div>

        <p
          className="absolute bottom-4 right-6 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 06 -
        </p>
      </div>
    </div>
  );
}
