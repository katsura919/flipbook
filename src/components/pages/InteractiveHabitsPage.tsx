"use client";

import { useEffect, useRef, useState } from "react";

interface Habit { name: string; days: boolean[]; }
interface PageData { habits: Habit[]; }

const defaults: PageData = {
  habits: [
    { name: "Drink water",  days: Array(7).fill(false) },
    { name: "Exercise",     days: Array(7).fill(false) },
    { name: "Meditate",     days: Array(7).fill(false) },
    { name: "Sleep 8h",     days: Array(7).fill(false) },
    { name: "Eat clean",    days: Array(7).fill(false) },
    { name: "Journaling",   days: Array(7).fill(false) },
  ],
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const rowColors  = ["#43a047", "#1e88e5", "#ab47bc", "#fb8c00", "#26c6da", "#e53935"];

/** Longest streak of consecutive true values ending at last checked day */
function streak(days: boolean[]): number {
  let s = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (!days[i]) break;
    s++;
  }
  return s;
}

export default function InteractiveHabitsPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) { try { setData(JSON.parse(saved)); } catch {} }
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
      if ((e.target as HTMLElement).closest("input,textarea,label,button")) e.stopPropagation();
    };
    el.addEventListener("mousedown", stop);
    el.addEventListener("touchstart", stop);
    return () => { el.removeEventListener("mousedown", stop); el.removeEventListener("touchstart", stop); };
  }, []);

  const toggleDay = (hi: number, di: number) => {
    setData(prev => ({
      habits: prev.habits.map((h, i) => {
        if (i !== hi) return h;
        const days = [...h.days];
        days[di] = !days[di];
        return { ...h, days };
      }),
    }));
  };

  const updateName = (hi: number, name: string) =>
    setData(prev => ({ habits: prev.habits.map((h, i) => (i === hi ? { ...h, name } : h)) }));

  const totalDone     = data.habits.reduce((s, h) => s + h.days.filter(Boolean).length, 0);
  const totalPossible = data.habits.length * 7;
  const pct           = Math.round((totalDone / totalPossible) * 100);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#fdf8f0",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #43a047, #fb8c00, #e53935)" }} />

      {/* Ruled lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 31px, #e2d9c8 32px)",
        backgroundPosition: "0 52px",
      }} />
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "26px", width: "1px", background: "#e8a87c", opacity: 0.4 }} />

      <div className="relative z-10 flex flex-col h-full px-8 py-4 gap-2.5">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ color: "#fb8c00" }}>This Week</p>
          <h2 className="text-xl font-bold" style={{ color: "#4a2c0a", fontFamily: "Georgia, serif" }}>✅ Weekly Habits</h2>
        </div>

        {/* Day labels row */}
        <div className="flex items-center">
          <div style={{ width: "116px" }} />
          <div className="flex gap-1.5">
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="flex items-center justify-center" style={{ width: "24px", fontSize: "9px", color: "#aaa", fontWeight: "bold" }}>{d}</div>
            ))}
          </div>
          <div style={{ width: "32px" }} />
        </div>

        {/* Habit rows */}
        <div className="flex flex-col gap-1.5">
          {data.habits.map((habit, hi) => {
            const color  = rowColors[hi % rowColors.length];
            const done   = habit.days.filter(Boolean).length;
            const s      = streak(habit.days);
            return (
              <div key={hi} className="flex items-center gap-2">
                {/* Name */}
                <div className="flex items-center gap-1.5 rounded-lg px-2 py-1"
                  style={{ width: "116px", background: `${color}12`, border: `1px solid ${color}25`, flexShrink: 0 }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                  <input value={habit.name} onChange={e => updateName(hi, e.target.value)}
                    className="bg-transparent text-xs focus:outline-none w-full min-w-0" style={{ color: "#4a2c0a" }} />
                </div>

                {/* Day toggles */}
                <div className="flex gap-1.5">
                  {habit.days.map((done, di) => (
                    <button key={di} onClick={() => toggleDay(hi, di)}
                      className="flex items-center justify-center rounded-full transition-all"
                      style={{ width: "24px", height: "24px", background: done ? color : "transparent", border: `2px solid ${done ? color : "#d0c8b8"}`, flexShrink: 0 }}>
                      {done && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* Streak + count */}
                <div className="flex flex-col items-center" style={{ width: "28px", flexShrink: 0 }}>
                  {s >= 2 && <span style={{ fontSize: "10px" }}>🔥</span>}
                  <span style={{ color: s >= 2 ? color : "#aaa", fontSize: "8px", fontWeight: s >= 2 ? "bold" : "normal" }}>
                    {s >= 2 ? `${s}d` : `${done}/7`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold" style={{ color: "#7a5c2e" }}>Weekly Progress</p>
            <p className="text-xs font-bold" style={{ color: pct >= 80 ? "#43a047" : pct >= 50 ? "#fb8c00" : "#ef5350" }}>{pct}%</p>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: "8px", background: "#e8d9c0" }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: pct >= 80 ? "#43a047" : pct >= 50 ? "#fb8c00" : "#ef5350" }} />
          </div>
          <p className="text-xs italic" style={{ color: "#a5916e", fontFamily: "Georgia, serif" }}>
            {pct >= 80 ? "Incredible week! 🌟" : pct >= 50 ? "Good progress, keep going! 💪" : "Every step counts 🌱"}
          </p>
        </div>

        <p className="absolute bottom-3 right-5 text-xs" style={{ color: "#c8b89a", fontFamily: "Georgia, serif" }}>— 05 —</p>
      </div>
    </div>
  );
}
