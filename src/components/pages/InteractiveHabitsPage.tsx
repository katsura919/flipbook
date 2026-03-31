"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface Habit {
  name: string;
  days: boolean[];
}

interface PageData {
  habits: Habit[];
}

const defaults: PageData = {
  habits: [
    { name: "Drink water", days: Array(7).fill(false) },
    { name: "Exercise", days: Array(7).fill(false) },
    { name: "Meditate", days: Array(7).fill(false) },
    { name: "Sleep 8h", days: Array(7).fill(false) },
    { name: "Eat clean", days: Array(7).fill(false) },
    { name: "Journaling", days: Array(7).fill(false) },
  ],
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const rowColors = [
  "#2d5a3d",
  "#3f7d5d",
  "#7c8c4d",
  "#c9a84c",
  "#b86b4d",
  "#4f7a5f",
];

function streak(days: boolean[]): number {
  let s = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (!days[i]) break;
    s++;
  }
  return s;
}

function sanitizeHabits(rawHabits: unknown): Habit[] {
  if (!Array.isArray(rawHabits)) return defaults.habits;

  return defaults.habits.map((fallback, i) => {
    const source = rawHabits[i] as Partial<Habit> | undefined;
    const safeName =
      typeof source?.name === "string" && source.name.trim().length > 0
        ? source.name
        : fallback.name;

    const safeDays = Array.from({ length: 7 }, (_, di) =>
      Boolean(source?.days?.[di])
    );

    return { name: safeName, days: safeDays };
  });
}

export default function InteractiveHabitsPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<PageData>;
        setData({ habits: sanitizeHabits(parsed.habits) });
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

  const toggleDay = (habitIndex: number, dayIndex: number) => {
    setData((prev) => ({
      habits: prev.habits.map((habit, i) => {
        if (i !== habitIndex) return habit;
        const days = [...habit.days];
        days[dayIndex] = !days[dayIndex];
        return { ...habit, days };
      }),
    }));
  };

  const updateName = (habitIndex: number, name: string) => {
    setData((prev) => ({
      habits: prev.habits.map((habit, i) =>
        i === habitIndex ? { ...habit, name } : habit
      ),
    }));
  };

  const doneByHabit = data.habits.map((h) => h.days.filter(Boolean).length);
  const totalDone = doneByHabit.reduce((sum, n) => sum + n, 0);
  const totalPossible = data.habits.length * 7;
  const pct = Math.round((totalDone / totalPossible) * 100);

  const highestStreak = Math.max(0, ...data.habits.map((h) => streak(h.days)));
  const bestHabitIndex = doneByHabit.reduce(
    (bestIdx, n, i, arr) => (n > arr[bestIdx] ? i : bestIdx),
    0
  );
  const bestHabit = data.habits[bestHabitIndex];
  const progressColor =
    pct >= 80 ? "var(--brand-forest-green)" : pct >= 50 ? "var(--brand-gold)" : "#d98d64";
  const encouragement =
    pct >= 80
      ? "Excellent consistency this week."
      : pct >= 50
        ? "Good momentum. Keep building the rhythm."
        : "Small wins count. Keep showing up.";

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(166deg, var(--brand-cream) 0%, #f4eddc 56%, #ece2ca 100%)",
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
          right: "-72px",
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(45, 90, 61, 0.1)",
          bottom: "-56px",
          left: "-52px",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-7 py-4 gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`${accentScript.className} text-[30px] leading-none`}
              style={{ color: "var(--brand-forest-green)" }}
            >
              This Week
            </p>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--brand-deep-green)", fontFamily: "var(--font-serif)" }}
            >
              Weekly Habits
            </h2>
          </div>

          <div
            className="rounded-xl px-2.5 py-1.5 text-center"
            style={{
              background: "rgba(250, 247, 240, 0.6)",
              border: "1px solid rgba(44, 58, 46, 0.16)",
            }}
          >
            <p className="text-xs font-bold" style={{ color: "var(--brand-deep-green)" }}>
              {totalDone}/{totalPossible}
            </p>
            <p
              className="text-[7px] uppercase tracking-[0.1em]"
              style={{ color: "rgba(44, 58, 46, 0.55)" }}
            >
              checks
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div style={{ width: "118px" }} />
          <div className="flex gap-1.5">
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{
                  width: "24px",
                  fontSize: "9px",
                  color: "rgba(44, 58, 46, 0.55)",
                  fontWeight: 700,
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div style={{ width: "34px" }} />
        </div>

        <div className="flex flex-col gap-1.5">
          {data.habits.map((habit, hi) => {
            const color = rowColors[hi % rowColors.length];
            const done = habit.days.filter(Boolean).length;
            const currentStreak = streak(habit.days);

            return (
              <div key={hi} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1"
                  style={{
                    width: "118px",
                    background: `${color}12`,
                    border: `1px solid ${color}2e`,
                    flexShrink: 0,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                  <input
                    value={habit.name}
                    onChange={(e) => updateName(hi, e.target.value)}
                    className="bg-transparent text-xs focus:outline-none w-full min-w-0"
                    style={{ color: "var(--brand-charcoal)" }}
                  />
                </div>

                <div className="flex gap-1.5">
                  {habit.days.map((doneToday, di) => (
                    <button
                      key={di}
                      onClick={() => toggleDay(hi, di)}
                      className="flex items-center justify-center rounded-full transition-all"
                      style={{
                        width: "24px",
                        height: "24px",
                        background: doneToday ? color : "transparent",
                        border: `2px solid ${doneToday ? color : "rgba(44, 58, 46, 0.22)"}`,
                        flexShrink: 0,
                      }}
                      type="button"
                    >
                      {doneToday && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M2 5l2.5 2.5L8 3"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center" style={{ width: "30px", flexShrink: 0 }}>
                  {currentStreak >= 2 && (
                    <span
                      className="text-[8px] px-1 rounded"
                      style={{
                        color: color,
                        background: `${color}18`,
                        border: `1px solid ${color}35`,
                        lineHeight: 1.2,
                      }}
                    >
                      hot
                    </span>
                  )}
                  <span
                    style={{
                      color: currentStreak >= 2 ? color : "rgba(44, 58, 46, 0.55)",
                      fontSize: "8px",
                      fontWeight: currentStreak >= 2 ? 700 : 400,
                    }}
                  >
                    {currentStreak >= 2 ? `${currentStreak}d` : `${done}/7`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div
            className="rounded-2xl p-3 flex flex-col gap-1"
            style={{
              background: "rgba(250, 247, 240, 0.62)",
              border: "1px solid rgba(44, 58, 46, 0.16)",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold" style={{ color: "var(--brand-deep-green)" }}>
                Weekly Progress
              </p>
              <p className="text-xs font-bold" style={{ color: progressColor }}>
                {pct}%
              </p>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: "8px", background: "rgba(44, 58, 46, 0.12)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: progressColor }}
              />
            </div>
            <p className="text-[10px]" style={{ color: "rgba(44, 58, 46, 0.62)" }}>
              {encouragement}
            </p>
          </div>

          <div
            className="rounded-2xl p-3"
            style={{
              background: "rgba(20, 41, 31, 0.42)",
              border: "1px solid rgba(232, 213, 163, 0.35)",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.14)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "rgba(232, 213, 163, 0.78)" }}
            >
              Momentum Note
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--brand-cream)", lineHeight: 1.45 }}
            >
              Best habit this week: <strong>{bestHabit?.name ?? "-"}</strong> ({doneByHabit[bestHabitIndex] ?? 0}/7). Current max streak: <strong>{highestStreak} day</strong>.
            </p>
          </div>
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 05 -
        </p>
      </div>
    </div>
  );
}
