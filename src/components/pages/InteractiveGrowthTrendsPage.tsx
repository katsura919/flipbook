"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface PageData {
  strategicFocus: string;
  nextMove: string;
}

interface DomainScore {
  name: string;
  value: number | null;
  color: string;
}

const defaults: PageData = {
  strategicFocus: "My growth focus for Q1...",
  nextMove: "One action I will commit to this week...",
};

const MONTHS = ["Jan", "Feb", "Mar"] as const;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const avg = (arr?: number[]) => {
  if (!arr?.length) return null;
  const filled = arr.filter(Boolean);
  if (!filled.length) return null;
  return filled.reduce((a, b) => a + b, 0) / filled.length;
};

function computeDomainScores(): {
  hasData: boolean;
  overall: number;
  domains: DomainScore[];
  opportunities: string[];
  q1Arc: number[];
} {
  let snapshot: any = null;
  let tracker: any = null;
  let habits: any = null;

  try {
    snapshot = JSON.parse(localStorage.getItem("flipbook-page-wellness-snapshot") ?? "null");
  } catch {}
  try {
    tracker = JSON.parse(localStorage.getItem("flipbook-page-wellness-tracker") ?? "null");
  } catch {}
  try {
    habits = JSON.parse(localStorage.getItem("flipbook-page-wellness-habits") ?? "null");
  } catch {}

  const foodRating = typeof snapshot?.foodRating === "number" ? snapshot.foodRating : null;
  const moodRating = typeof snapshot?.moodRating === "number" ? snapshot.moodRating : null;
  const movementRating = typeof snapshot?.exerciseRating === "number" ? snapshot.exerciseRating : null;

  const moodAvg = avg(tracker?.mood);
  const energyAvg = avg(tracker?.energy);
  const sleepAvg = avg(tracker?.sleep);

  const habitChecks = Array.isArray(habits?.habits)
    ? habits.habits.reduce(
        (sum: number, h: { days?: boolean[] }) =>
          sum + (Array.isArray(h.days) ? h.days.filter(Boolean).length : 0),
        0
      )
    : 0;
  const habitPossible = Array.isArray(habits?.habits) ? habits.habits.length * 7 : 0;
  const consistencyScore = habitPossible > 0 ? (habitChecks / habitPossible) * 100 : null;

  const nutritionScore = foodRating && foodRating > 0 ? foodRating * 20 : null;
  const mindsetSources = [moodRating && moodRating > 0 ? moodRating * 20 : null, moodAvg ? moodAvg * 20 : null].filter(
    (v): v is number => v !== null
  );
  const mindsetScore = mindsetSources.length
    ? mindsetSources.reduce((a, b) => a + b, 0) / mindsetSources.length
    : null;

  const vitalitySources = [movementRating && movementRating > 0 ? movementRating * 20 : null, energyAvg ? energyAvg * 20 : null].filter(
    (v): v is number => v !== null
  );
  const vitalityScore = vitalitySources.length
    ? vitalitySources.reduce((a, b) => a + b, 0) / vitalitySources.length
    : null;

  const recoveryScore = sleepAvg ? sleepAvg * 20 : null;

  const domains: DomainScore[] = [
    { name: "Nutrition", value: nutritionScore, color: "#4f7a5f" },
    { name: "Mindset", value: mindsetScore, color: "#7c8c4d" },
    { name: "Vitality", value: vitalityScore, color: "#b9923c" },
    { name: "Recovery", value: recoveryScore, color: "#b86b4d" },
    { name: "Consistency", value: consistencyScore, color: "#2d5a3d" },
  ];

  const validScores = domains.map((d) => d.value).filter((v): v is number => v !== null);
  const overall = validScores.length ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
  const hasData = validScores.length > 0;

  const orderedWeakest = [...domains]
    .filter((d) => d.value !== null)
    .sort((a, b) => (a.value as number) - (b.value as number))
    .slice(0, 2);

  const opportunities =
    orderedWeakest.length > 0
      ? orderedWeakest.map((d) =>
          d.name === "Consistency"
            ? "Increase consistency with a repeatable morning anchor habit."
            : `Focus next cycle on ${d.name.toLowerCase()} to raise your baseline.`
        )
      : [
          "Start with one daily check-in to unlock your trend insights.",
          "Track 3 days this week to begin your growth arc.",
        ];

  const q1Arc = hasData
    ? [
        clamp(Math.round(overall * 0.68), 24, 100),
        clamp(Math.round(overall * 0.84), 32, 100),
        clamp(Math.round(overall), 40, 100),
      ]
    : [18, 24, 30];

  return { hasData, overall, domains, opportunities, q1Arc };
}

export default function InteractiveGrowthTrendsPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        setData({ ...defaults, ...JSON.parse(saved) });
      } catch {}
    }
    setLoaded(true);
    setVersion((v) => v + 1);
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
      if ((e.target as HTMLElement).closest("input,textarea,label,button")) e.stopPropagation();
    };
    el.addEventListener("mousedown", stop);
    el.addEventListener("touchstart", stop);
    return () => {
      el.removeEventListener("mousedown", stop);
      el.removeEventListener("touchstart", stop);
    };
  }, []);

  const insights = useMemo(() => computeDomainScores(), [version]);

  const points = insights.q1Arc.map((v, i) => {
    const x = 34 + i * 96;
    const y = 108 - (v / 100) * 72;
    return { x, y, v };
  });
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const update = (field: keyof PageData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(166deg, var(--brand-cream) 0%, #f4eddc 58%, #ece2ca 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >


      <div className="relative z-10 flex flex-col h-full px-7 py-4 gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`${accentScript.className} text-[30px] leading-none`}
              style={{ color: "var(--brand-forest-green)" }}
            >
              Growth and Trends
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "rgba(44, 58, 46, 0.6)" }}
            >
              Patterns and growth opportunities across all domains
            </p>
          </div>
          <div
            className="rounded-xl px-2.5 py-1.5 text-center"
            style={{
              background: "rgba(250, 247, 240, 0.6)",
              border: "1px solid rgba(44, 58, 46, 0.16)",
            }}
          >
            <p className="text-xs font-bold" style={{ color: "var(--brand-deep-green)" }}>
              {insights.overall}
            </p>
            <p
              className="text-[7px] uppercase tracking-[0.1em]"
              style={{ color: "rgba(44, 58, 46, 0.55)" }}
            >
              score
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgba(250, 247, 240, 0.62)",
            border: "1px solid rgba(44, 58, 46, 0.12)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p
              className="text-xs font-semibold uppercase tracking-[0.11em]"
              style={{ color: "var(--brand-deep-green)" }}
            >
              Q1 Progress Arc
            </p>
            <p className="text-[9px]" style={{ color: "rgba(44, 58, 46, 0.52)" }}>
              {insights.hasData ? "Live from tracked pages" : "Template until data is tracked"}
            </p>
          </div>

          <svg width="100%" viewBox="0 0 260 122" style={{ display: "block" }}>
            <path d="M34 108 L226 108" stroke="rgba(44,58,46,0.16)" strokeWidth="1.2" />
            <polyline
              points={polyline}
              fill="none"
              stroke="var(--brand-gold)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={insights.hasData ? 1 : 0.7}
            />
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="5" fill="var(--brand-pale-gold)" />
                <circle cx={p.x} cy={p.y} r="2.3" fill="var(--brand-forest-green)" />
                <text
                  x={p.x}
                  y={118}
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(44,58,46,0.62)"
                  fontWeight="700"
                >
                  {MONTHS[i]}
                </text>
                <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="8" fill="#7d6430" fontWeight="700">
                  {p.v}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-2xl p-3 flex flex-col gap-1.5"
            style={{
              background: "rgba(250, 247, 240, 0.62)",
              border: "1px solid rgba(44, 58, 46, 0.12)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.11em]" style={{ color: "var(--brand-deep-green)" }}>
              Domain Snapshot
            </p>
            {insights.domains.slice(0, 4).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-[10px]">
                <span style={{ color: "rgba(44,58,46,0.75)" }}>{d.name}</span>
                <span style={{ color: d.color, fontWeight: 700 }}>{d.value === null ? "--" : Math.round(d.value)}</span>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-3 flex flex-col gap-1.5"
            style={{
              background: "rgba(20, 41, 31, 0.42)",
              border: "1px solid rgba(232, 213, 163, 0.35)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.11em]" style={{ color: "rgba(232,213,163,0.9)" }}>
              Growth Opportunities
            </p>
            {insights.opportunities.map((item, i) => (
              <p key={i} className="text-[10px] leading-relaxed" style={{ color: "var(--brand-cream)" }}>
                {i + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-3 flex flex-col gap-1.5 mt-auto"
          style={{
            background: "rgba(250, 247, 240, 0.62)",
            border: "1px solid rgba(44, 58, 46, 0.12)",
          }}
        >
          <input
            value={data.strategicFocus}
            onChange={(e) => update("strategicFocus", e.target.value)}
            className="bg-transparent text-xs font-semibold focus:outline-none w-full"
            style={{ color: "var(--brand-deep-green)" }}
          />
          <input
            value={data.nextMove}
            onChange={(e) => update("nextMove", e.target.value)}
            className="bg-transparent text-xs focus:outline-none w-full"
            style={{ color: "rgba(44, 58, 46, 0.74)" }}
          />
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 07 -
        </p>
      </div>
    </div>
  );
}
