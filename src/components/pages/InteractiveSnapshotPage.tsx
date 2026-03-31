"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface PageData {
  food: string;
  mood: string;
  exercise: string;
  note: string;
  foodRating: number;
  moodRating: number;
  exerciseRating: number;
  stressRating: number;
  weeklyWin: string;
  weeklyChallenge: string;
}

const defaults: PageData = {
  food: "Write about your meals and eating habits this week...",
  mood: "How was your mood? Any patterns you noticed?",
  exercise: "What movement or exercise did you do this week?",
  note: "Every small win matters.",
  foodRating: 0,
  moodRating: 0,
  exerciseRating: 0,
  stressRating: 0,
  weeklyWin: "",
  weeklyChallenge: "",
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const sections = [
  {
    field: "food" as const,
    ratingField: "foodRating" as const,
    label: "Food",
    accent: "var(--brand-forest-green)",
    cardBg: "rgba(45, 90, 61, 0.08)",
    border: "rgba(45, 90, 61, 0.25)",
    mark: "★",
    ratingIcon: "★",
  },
  {
    field: "mood" as const,
    ratingField: "moodRating" as const,
    label: "Mood",
    accent: "#7c8c4d",
    cardBg: "rgba(124, 140, 77, 0.09)",
    border: "rgba(124, 140, 77, 0.25)",
    mark: "★",
    ratingIcon: "★",
  },
  {
    field: "exercise" as const,
    ratingField: "exerciseRating" as const,
    label: "Movement",
    accent: "#4d6f66",
    cardBg: "rgba(77, 111, 102, 0.08)",
    border: "rgba(77, 111, 102, 0.25)",
    mark: "★",
    ratingIcon: "★",
  },
];

function RatingDots({
  value,
  icon,
  onChange,
}: {
  value: number;
  icon: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n === value ? 0 : n)}
          className="w-[14px] h-[14px] rounded-full text-[8px] leading-none transition-all flex items-center justify-center"
          style={{
            opacity: n <= value ? 1 : 0.45,
            background: n <= value ? "rgba(201, 168, 76, 0.28)" : "rgba(44, 58, 46, 0.08)",
            color: n <= value ? "var(--brand-gold)" : "rgba(44, 58, 46, 0.45)",
            border: "1px solid rgba(44, 58, 46, 0.15)",
          }}
          aria-label={`Rate ${n}`}
          type="button"
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

export default function InteractiveSnapshotPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        setData(JSON.parse(saved));
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
      if ((e.target as HTMLElement).closest("input,textarea,label,button")) {
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

  const update = (field: keyof PageData, value: string | number) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--brand-cream)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="w-full h-[3px] shrink-0"
        style={{
          background:
            "linear-gradient(90deg, var(--brand-forest-green), var(--brand-gold), var(--brand-deep-green))",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 82% 6%, rgba(201, 168, 76, 0.16) 0%, rgba(201, 168, 76, 0) 48%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-8 py-4 gap-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={`${accentScript.className} text-[28px] leading-none`}
              style={{ color: "var(--brand-forest-green)" }}
            >
              Week in Review
            </p>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--brand-deep-green)", fontFamily: "var(--font-serif)" }}
            >
              Your Weekly Snapshot
            </h2>
          </div>

          <div
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1"
            style={{
              background: "rgba(217, 141, 100, 0.14)",
              border: "1px solid rgba(217, 141, 100, 0.25)",
            }}
          >
            <p
              className="text-[8px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "#b86b4d" }}
            >
              Stress
            </p>
            <RatingDots
              value={data.stressRating}
              icon="X"
              onChange={(v) => update("stressRating", v)}
            />
          </div>
        </div>

        {sections.map(({ field, ratingField, label, accent, cardBg, border, mark, ratingIcon }) => (
          <div
            key={field}
            className="rounded-2xl p-2.5 flex gap-2.5"
            style={{ background: cardBg, border: `1px solid ${border}` }}
          >
            <div
              className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
              style={{
                color: accent,
                background: "rgba(250, 247, 240, 0.8)",
                border: `1px solid ${border}`,
              }}
            >
              {mark}
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: accent }}>
                  {label}
                </p>
                <RatingDots
                  value={data[ratingField] as number}
                  icon={ratingIcon}
                  onChange={(v) => update(ratingField, v)}
                />
              </div>
              <textarea
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                rows={1}
                className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none w-full"
                style={{ color: "var(--brand-charcoal)" }}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
          {[
            {
              field: "weeklyWin" as const,
              label: "This week I won",
              accent: "var(--brand-gold)",
              bg: "rgba(201, 168, 76, 0.12)",
              border: "rgba(201, 168, 76, 0.35)",
              mark: "W",
            },
            {
              field: "weeklyChallenge" as const,
              label: "My challenge was",
              accent: "#b86b4d",
              bg: "rgba(217, 141, 100, 0.12)",
              border: "rgba(217, 141, 100, 0.35)",
              mark: "C",
            },
          ].map(({ field, label, accent, bg, border, mark }) => (
            <div
              key={field}
              className="rounded-2xl p-2.5 flex flex-col gap-1 h-full min-h-0"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: accent }}>
                <span
                  className="w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px]"
                  style={{ background: "rgba(250, 247, 240, 0.7)", border: `1px solid ${border}` }}
                >
                  {mark}
                </span>
                {label}
              </p>
              <textarea
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                placeholder="Write here..."
                className="bg-transparent text-xs focus:outline-none w-full resize-none flex-1 min-h-0"
                style={{ color: "var(--brand-charcoal)" }}
                rows={5}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <div className="w-5 h-px" style={{ background: "rgba(45, 90, 61, 0.45)" }} />
          <input
            value={data.note}
            onChange={(e) => update("note", e.target.value)}
            className={`${accentScript.className} bg-transparent text-[24px] leading-none focus:outline-none flex-1`}
            style={{ color: "var(--brand-forest-green)" }}
          />
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.5)", fontFamily: "var(--font-serif)" }}
        >
          - 03 -
        </p>
      </div>
    </div>
  );
}
