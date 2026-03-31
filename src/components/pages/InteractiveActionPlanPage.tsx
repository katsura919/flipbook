"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface PageData {
  focusTheme: string;
  commitment1: string;
  commitment2: string;
  commitment3: string;
  day30: string;
  day60: string;
  day90: string;
  supportPerson: string;
  celebration: string;
}

const defaults: PageData = {
  focusTheme: "My next growth focus...",
  commitment1: "I will protect this one daily habit...",
  commitment2: "I will improve this leadership behavior...",
  commitment3: "I will strengthen this personal boundary...",
  day30: "What I should see by day 30...",
  day60: "What progress should look like by day 60...",
  day90: "What success looks like by day 90...",
  supportPerson: "Who will keep me accountable?",
  celebration: "How will I celebrate completion?",
};

export default function InteractiveActionPlanPage({ pageId }: { pageId: string }) {
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
        <div>
          <p
            className={`${accentScript.className} text-[30px] leading-none`}
            style={{ color: "var(--brand-forest-green)" }}
          >
            Action Plan
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "rgba(44, 58, 46, 0.6)" }}
          >
            Turn insight into execution
          </p>
        </div>

        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgba(250, 247, 240, 0.62)",
            border: "1px solid rgba(44, 58, 46, 0.12)",
          }}
        >
          <input
            value={data.focusTheme}
            onChange={(e) => update("focusTheme", e.target.value)}
            className="bg-transparent text-xs font-semibold focus:outline-none w-full"
            style={{ color: "var(--brand-deep-green)" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {(["commitment1", "commitment2", "commitment3"] as const).map((field, i) => (
            <div
              key={field}
              className="rounded-xl px-3 py-1.5 flex items-center gap-2"
              style={{
                background: "rgba(250, 247, 240, 0.64)",
                border: "1px solid rgba(44, 58, 46, 0.18)",
              }}
            >
              <span
                className="text-xs font-bold shrink-0"
                style={{ color: "var(--brand-gold)", minWidth: "14px" }}
              >
                {i + 1}.
              </span>
              <input
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                className="bg-transparent text-xs leading-relaxed focus:outline-none w-full"
                style={{ color: "var(--brand-charcoal)" }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "day30" as const, label: "Day 30" },
            { key: "day60" as const, label: "Day 60" },
            { key: "day90" as const, label: "Day 90" },
          ].map((m) => (
            <div
              key={m.key}
              className="rounded-xl p-2 flex flex-col gap-1"
              style={{
                background: "rgba(201, 168, 76, 0.12)",
                border: "1px solid rgba(201, 168, 76, 0.28)",
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "#8f7340" }}
              >
                {m.label}
              </p>
              <textarea
                value={data[m.key]}
                onChange={(e) => update(m.key, e.target.value)}
                rows={3}
                className="bg-transparent text-[10px] leading-relaxed resize-none focus:outline-none w-full"
                style={{ color: "var(--brand-charcoal)" }}
              />
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-3 flex flex-col gap-1.5 mt-auto"
          style={{
            background: "rgba(20, 41, 31, 0.42)",
            border: "1px solid rgba(232, 213, 163, 0.35)",
          }}
        >
          <input
            value={data.supportPerson}
            onChange={(e) => update("supportPerson", e.target.value)}
            className="bg-transparent text-xs focus:outline-none w-full"
            style={{ color: "var(--brand-cream)" }}
          />
          <input
            value={data.celebration}
            onChange={(e) => update("celebration", e.target.value)}
            className="bg-transparent text-xs focus:outline-none w-full"
            style={{ color: "rgba(232, 213, 163, 0.88)" }}
          />
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 09 -
        </p>
      </div>
    </div>
  );
}

