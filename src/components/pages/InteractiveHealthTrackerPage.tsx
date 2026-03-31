"use client";

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

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const moodColors  = ["#e8e8e8", "#ef5350", "#ffa726", "#ffee58", "#9ccc65", "#43a047"];
const energyColors= ["#e8e8e8", "#b0bec5", "#64b5f6", "#42a5f5", "#1e88e5", "#1565c0"];
// sleep: 1=<4h 2=5h 3=6h 4=7h 5=8h+ — scale of 9, but displayed as 5 levels
const sleepColors = ["#e8e8e8", "#ef9a9a", "#ffcc80", "#fff176", "#a5d6a7", "#66bb6a"];
const sleepLabels = ["", "<4h", "5h", "6h", "7h", "8h+"];

function BarChart({
  label, emoji, values, colors, accentColor, onBarClick, levelLabels,
}: {
  label: string; emoji: string; values: number[]; colors: string[];
  accentColor: string; onBarClick: (i: number) => void; levelLabels?: string[];
}) {
  const MAX_H = 54;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-sm leading-none">{emoji}</span>
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>{label}</p>
      </div>
      <div className="rounded-xl px-2 py-2" style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}22` }}>
        <svg width="100%" viewBox={`0 0 ${DAYS.length * 40} ${MAX_H + 24}`} style={{ display: "block", cursor: "pointer" }}>
          {DAYS.map((day, i) => {
            const level = values[i];
            const barH = level === 0 ? 5 : (level / 5) * MAX_H;
            const barW = 24;
            const x = i * 40 + 8;
            const y = MAX_H - barH;
            const fill = colors[level];
            return (
              <g key={i} onClick={() => onBarClick(i)} style={{ cursor: "pointer" }}>
                <rect x={x} y={0} width={barW} height={MAX_H} rx={5} fill="rgba(0,0,0,0.04)" />
                <rect x={x} y={y} width={barW} height={barH} rx={5} fill={fill} />
                {level > 0 && (
                  <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="8" fill={accentColor} fontWeight="bold">
                    {levelLabels ? levelLabels[level] : level}
                  </text>
                )}
                <text x={x + barW / 2} y={MAX_H + 14} textAnchor="middle" fontSize="9" fill="#999">{day}</text>
              </g>
            );
          })}
        </svg>
        <p className="text-center" style={{ color: "#bbb", fontSize: "8px" }}>tap to rate (1–5)</p>
      </div>
    </div>
  );
}

function avg(arr: number[] | undefined) {
  if (!arr?.length) return "—";
  const filled = arr.filter(Boolean);
  return filled.length ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1) : "—";
}

export default function InteractiveHealthTrackerPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) { try { setData({ ...defaults, ...JSON.parse(saved) }); } catch {} }
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
      if ((e.target as HTMLElement).closest("input,textarea,label,button,svg,g,rect")) e.stopPropagation();
    };
    el.addEventListener("mousedown", stop);
    el.addEventListener("touchstart", stop);
    return () => { el.removeEventListener("mousedown", stop); el.removeEventListener("touchstart", stop); };
  }, []);

  const cycleBar = (field: "mood" | "energy" | "sleep", i: number) => {
    setData(prev => {
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
        background: "linear-gradient(160deg, #e0f7fa, #e8f5e9, #f1f8e9)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #26c6da, #43a047, #66bb6a)" }} />

      <div className="absolute pointer-events-none" style={{ width: "200px", height: "200px", borderRadius: "50%", background: "rgba(38,198,218,0.07)", top: "-70px", right: "-70px" }} />
      <div className="absolute pointer-events-none" style={{ width: "150px", height: "150px", borderRadius: "50%", background: "rgba(67,160,71,0.07)", bottom: "-40px", left: "-40px" }} />

      <div className="relative z-10 flex flex-col h-full px-7 py-4 gap-3">
        {/* Header + averages */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "#26c6da" }}>Weekly Check-in</p>
            <h2 className="text-xl font-bold" style={{ color: "#00695c", fontFamily: "Georgia, serif" }}>📊 Health Tracker</h2>
          </div>
          <div className="flex gap-2">
            {[
              { label: "mood",   val: avg(data.mood),   color: "#43a047" },
              { label: "energy", val: avg(data.energy), color: "#1e88e5" },
              { label: "sleep",  val: avg(data.sleep),  color: "#66bb6a" },
            ].map(({ label, val, color }) => (
              <div key={label} className="text-center rounded-xl px-2 py-1" style={{ background: `${color}18` }}>
                <p className="text-xs font-bold" style={{ color }}>{val}</p>
                <p style={{ color: "#aaa", fontSize: "7px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: "rgba(38,198,218,0.18)" }} />

        <BarChart label="Mood"   emoji="😊" values={data.mood}   colors={moodColors}   accentColor="#43a047" onBarClick={i => cycleBar("mood",   i)} />
        <BarChart label="Energy" emoji="⚡" values={data.energy} colors={energyColors} accentColor="#1e88e5" onBarClick={i => cycleBar("energy", i)} />
        <BarChart label="Sleep"  emoji="🌙" values={data.sleep}  colors={sleepColors}  accentColor="#66bb6a" onBarClick={i => cycleBar("sleep",  i)} levelLabels={sleepLabels} />

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 mt-auto">
          {[1,2,3,4,5].map(n => (
            <div key={n} className="flex flex-col items-center gap-0.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: moodColors[n] }} />
              <span style={{ color: "#bbb", fontSize: "7px" }}>{n}</span>
            </div>
          ))}
          <span style={{ color: "#ccc", fontSize: "8px", marginLeft: "4px" }}>= level</span>
        </div>

        <p className="absolute bottom-3 right-5 text-xs" style={{ color: "#b2dfdb", fontFamily: "Georgia, serif" }}>— 04 —</p>
      </div>
    </div>
  );
}
