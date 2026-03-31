"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface PageData {
  mood: number[];
  energy: number[];
  sleep: number[];
}

const defaults: PageData = {
  mood: [0, 0, 0, 0, 0, 0, 0],
  energy: [0, 0, 0, 0, 0, 0, 0],
  sleep: [0, 0, 0, 0, 0, 0, 0],
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const moodColors = [
  "#e9e5d9",
  "#d98d64",
  "#c9a84c",
  "#d8be73",
  "#7c8c4d",
  "#2d5a3d",
];
const energyColors = [
  "#e9e5d9",
  "#9cae99",
  "#7fa186",
  "#5f9174",
  "#3f7d5d",
  "#1c3a2e",
];
const sleepColors = [
  "#e9e5d9",
  "#c9b28d",
  "#d6c894",
  "#e8d5a3",
  "#98b18f",
  "#4f7a5f",
];
const sleepLabels = ["", "<4h", "5h", "6h", "7h", "8h+"];

function BarChart({
  label,
  mark,
  values,
  colors,
  accentColor,
  onBarClick,
  levelLabels,
}: {
  label: string;
  mark: string;
  values: number[];
  colors: string[];
  accentColor: string;
  onBarClick: (i: number) => void;
  levelLabels?: string[];
}) {
  const MAX_H = 54;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span
          className="w-5 h-5 rounded-full inline-flex items-center justify-center text-[9px] font-bold"
          style={{
            color: accentColor,
            background: "rgba(250, 247, 240, 0.85)",
            border: `1px solid ${accentColor}55`,
          }}
        >
          {mark}
        </span>
        <p
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: accentColor }}
        >
          {label}
        </p>
      </div>

      <div
        className="rounded-xl px-2 py-2"
        style={{
          background: `${accentColor}0f`,
          border: `1px solid ${accentColor}2e`,
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${DAYS.length * 40} ${MAX_H + 24}`}
          style={{ display: "block", cursor: "pointer" }}
        >
          {DAYS.map((day, i) => {
            const level = values[i];
            const barH = level === 0 ? 5 : (level / 5) * MAX_H;
            const barW = 24;
            const x = i * 40 + 8;
            const y = MAX_H - barH;
            const fill = colors[level];

            return (
              <g key={i} onClick={() => onBarClick(i)} style={{ cursor: "pointer" }}>
                <rect
                  x={x}
                  y={0}
                  width={barW}
                  height={MAX_H}
                  rx={5}
                  fill="rgba(28, 58, 46, 0.08)"
                />
                <rect x={x} y={y} width={barW} height={barH} rx={5} fill={fill} />
                {level > 0 && (
                  <text
                    x={x + barW / 2}
                    y={y - 3}
                    textAnchor="middle"
                    fontSize="8"
                    fill={accentColor}
                    fontWeight="700"
                  >
                    {levelLabels ? levelLabels[level] : level}
                  </text>
                )}
                <text
                  x={x + barW / 2}
                  y={MAX_H + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="rgba(44, 58, 46, 0.6)"
                >
                  {day}
                </text>
              </g>
            );
          })}
        </svg>

        <p
          className="text-center text-[8px] uppercase tracking-[0.1em]"
          style={{ color: "rgba(44, 58, 46, 0.5)" }}
        >
          Tap bars to rate 1-5
        </p>
      </div>
    </div>
  );
}

function avg(arr: number[] | undefined) {
  if (!arr?.length) return "-";
  const filled = arr.filter(Boolean);
  return filled.length
    ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1)
    : "-";
}

export default function InteractiveHealthTrackerPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        setData({ ...defaults, ...JSON.parse(saved) });
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
      if ((e.target as HTMLElement).closest("input,textarea,label,button,svg,g,rect")) {
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

  const cycleBar = (field: "mood" | "energy" | "sleep", i: number) => {
    setData((prev) => {
      const updated = [...prev[field]];
      updated[i] = (updated[i] % 5) + 1;
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(165deg, var(--brand-cream) 0%, #f5efdd 58%, #ede5cf 100%)",
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
          right: "-70px",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          background: "rgba(45, 90, 61, 0.1)",
          bottom: "-52px",
          left: "-50px",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-7 py-4 gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`${accentScript.className} text-[30px] leading-none`}
              style={{ color: "var(--brand-forest-green)" }}
            >
              Weekly Check-in
            </p>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--brand-deep-green)", fontFamily: "var(--font-serif)" }}
            >
              Health Tracker
            </h2>
          </div>

          <div className="flex gap-2">
            {[
              { label: "mood", val: avg(data.mood), color: "var(--brand-forest-green)" },
              { label: "energy", val: avg(data.energy), color: "#3f7d5d" },
              { label: "sleep", val: avg(data.sleep), color: "var(--brand-gold)" },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                className="text-center rounded-xl px-2 py-1 min-w-[38px]"
                style={{
                  background: "rgba(250, 247, 240, 0.6)",
                  border: "1px solid rgba(44, 58, 46, 0.12)",
                }}
              >
                <p className="text-xs font-bold" style={{ color }}>
                  {val}
                </p>
                <p
                  className="text-[7px] uppercase tracking-[0.1em]"
                  style={{ color: "rgba(44, 58, 46, 0.5)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: "rgba(44, 58, 46, 0.16)" }} />

        <BarChart
          label="Mood"
          mark="M"
          values={data.mood}
          colors={moodColors}
          accentColor="var(--brand-forest-green)"
          onBarClick={(i) => cycleBar("mood", i)}
        />
        <BarChart
          label="Energy"
          mark="E"
          values={data.energy}
          colors={energyColors}
          accentColor="#3f7d5d"
          onBarClick={(i) => cycleBar("energy", i)}
        />
        <BarChart
          label="Sleep"
          mark="S"
          values={data.sleep}
          colors={sleepColors}
          accentColor="var(--brand-gold)"
          onBarClick={(i) => cycleBar("sleep", i)}
          levelLabels={sleepLabels}
        />

        <div className="flex items-center justify-center gap-2 mt-auto">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col items-center gap-0.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: moodColors[n] }} />
              <span style={{ color: "rgba(44, 58, 46, 0.48)", fontSize: "7px" }}>{n}</span>
            </div>
          ))}
          <span
            className="text-[8px] uppercase tracking-[0.08em] ml-1"
            style={{ color: "rgba(44, 58, 46, 0.45)" }}
          >
            = level
          </span>
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 04 -
        </p>
      </div>
    </div>
  );
}
