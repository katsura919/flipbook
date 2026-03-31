"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  mood: number[];
  energy: number[];
}

const defaults: PageData = {
  mood: [0, 0, 0, 0, 0, 0, 0],
  energy: [0, 0, 0, 0, 0, 0, 0],
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const moodColors = ["#e0e0e0", "#ef5350", "#ffa726", "#ffee58", "#9ccc65", "#43a047"];
const energyColors = ["#e0e0e0", "#b0bec5", "#64b5f6", "#42a5f5", "#1e88e5", "#1565c0"];

function BarChart({
  label,
  emoji,
  values,
  colors,
  accentColor,
  onBarClick,
}: {
  label: string;
  emoji: string;
  values: number[];
  colors: string[];
  accentColor: string;
  onBarClick: (i: number) => void;
}) {
  const MAX_H = 72;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-base leading-none">{emoji}</span>
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          {label}
        </p>
      </div>
      <div
        className="rounded-2xl px-3 py-3"
        style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25` }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${DAYS.length * 44} ${MAX_H + 28}`}
          style={{ display: "block", cursor: "pointer" }}
        >
          {DAYS.map((day, i) => {
            const level = values[i];
            const barH = level === 0 ? 6 : (level / 5) * MAX_H;
            const barW = 28;
            const x = i * 44 + 8;
            const y = MAX_H - barH;
            const fill = colors[level];

            return (
              <g key={i} onClick={() => onBarClick(i)} style={{ cursor: "pointer" }}>
                {/* Background track */}
                <rect x={x} y={0} width={barW} height={MAX_H} rx={6} fill="rgba(0,0,0,0.04)" />
                {/* Filled bar */}
                <rect x={x} y={y} width={barW} height={barH} rx={6} fill={fill} />
                {/* Level label above bar */}
                {level > 0 && (
                  <text
                    x={x + barW / 2}
                    y={y - 4}
                    textAnchor="middle"
                    fontSize="9"
                    fill={accentColor}
                    fontWeight="bold"
                  >
                    {level}
                  </text>
                )}
                {/* Day label */}
                <text
                  x={x + barW / 2}
                  y={MAX_H + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#888"
                >
                  {day}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-center mt-0.5" style={{ color: "#aaa", fontSize: "9px" }}>
          tap a bar to rate (1–5)
        </p>
      </div>
    </div>
  );
}

export default function InteractiveHealthTrackerPage({ pageId }: { pageId: string }) {
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
      if ((e.target as HTMLElement).closest("input, textarea, label, button, svg, g, rect")) {
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

  const cycleBar = (field: "mood" | "energy", i: number) => {
    setData((prev) => {
      const updated = [...prev[field]];
      updated[i] = (updated[i] % 5) + 1;
      return { ...prev, [field]: updated };
    });
  };

  const moodAvg = data.mood.filter(Boolean).length
    ? (data.mood.reduce((a, b) => a + b, 0) / data.mood.filter(Boolean).length).toFixed(1)
    : "—";
  const energyAvg = data.energy.filter(Boolean).length
    ? (data.energy.reduce((a, b) => a + b, 0) / data.energy.filter(Boolean).length).toFixed(1)
    : "—";

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg, #e0f7fa, #e8f5e9, #f1f8e9)" }}
    >
      {/* Top color strip */}
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #26c6da, #43a047)" }} />

      {/* Soft circle accents */}
      <div className="absolute pointer-events-none" style={{ width: "220px", height: "220px", borderRadius: "50%", background: "rgba(38,198,218,0.07)", top: "-80px", right: "-80px" }} />
      <div className="absolute pointer-events-none" style={{ width: "160px", height: "160px", borderRadius: "50%", background: "rgba(67,160,71,0.07)", bottom: "-50px", left: "-50px" }} />

      <div className="relative z-10 flex flex-col h-full px-7 py-5 gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#26c6da" }}>
              Weekly Check-in
            </p>
            <h2 className="text-xl font-bold" style={{ color: "#00695c", fontFamily: "Georgia, serif" }}>
              📊 Health Tracker
            </h2>
          </div>
          {/* Averages */}
          <div className="flex gap-3">
            <div className="text-center rounded-xl px-2 py-1" style={{ background: "rgba(38,198,218,0.12)" }}>
              <p className="text-xs font-bold" style={{ color: "#26c6da" }}>{moodAvg}</p>
              <p style={{ color: "#aaa", fontSize: "8px" }}>mood</p>
            </div>
            <div className="text-center rounded-xl px-2 py-1" style={{ background: "rgba(30,136,229,0.12)" }}>
              <p className="text-xs font-bold" style={{ color: "#1e88e5" }}>{energyAvg}</p>
              <p style={{ color: "#aaa", fontSize: "8px" }}>energy</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "rgba(38,198,218,0.2)" }} />

        {/* Charts */}
        <BarChart
          label="Mood"
          emoji="😊"
          values={data.mood}
          colors={moodColors}
          accentColor="#43a047"
          onBarClick={(i) => cycleBar("mood", i)}
        />
        <BarChart
          label="Energy"
          emoji="⚡"
          values={data.energy}
          colors={energyColors}
          accentColor="#1e88e5"
          onBarClick={(i) => cycleBar("energy", i)}
        />

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-auto">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col items-center gap-0.5">
              <div className="w-3 h-3 rounded-full" style={{ background: moodColors[n] }} />
              <span style={{ color: "#aaa", fontSize: "8px" }}>{n}</span>
            </div>
          ))}
          <span style={{ color: "#ccc", fontSize: "9px", marginLeft: "4px" }}>= level</span>
        </div>

        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#b2dfdb", fontFamily: "Georgia, serif" }}>
          — 04 —
        </p>
      </div>
    </div>
  );
}
