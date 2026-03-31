"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  prompt1: string;
  prompt2: string;
  prompt3: string;
  prompt4: string;
  prompt5: string;
  prompt6: string;
  grateful1: string;
  grateful2: string;
  grateful3: string;
  journal: string;
}

const defaults: PageData = {
  prompt1: "What made you feel your best this week?",
  prompt2: "What habits do you want to improve?",
  prompt3: "What are you most proud of?",
  prompt4: "What will you do differently next week?",
  prompt5: "How close are you to your wellness goal?",
  prompt6: "What does feeling healthy mean to you?",
  grateful1: "",
  grateful2: "",
  grateful3: "",
  journal: "",
};

const prompts = ["prompt1", "prompt2", "prompt3", "prompt4", "prompt5", "prompt6"] as const;

export default function InteractiveReflectionPage({ pageId }: { pageId: string }) {
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

  const update = (field: keyof PageData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }));

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #fff8e1, #fff3e0, #fce4ec)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #ff8a65, #ff4081)" }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #ffcc80 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      <div className="relative z-10 flex flex-col h-full px-7 py-4 gap-2.5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🪞</span>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "#bf360c", fontFamily: "Georgia, serif" }}>Reflection</h2>
            <p className="text-xs" style={{ color: "#ff8a65" }}>Pause and think</p>
          </div>
        </div>

        {/* Gratitude log */}
        <div className="rounded-2xl px-3 py-2.5 flex flex-col gap-1.5"
          style={{ background: "rgba(255,213,79,0.12)", border: "1px solid rgba(255,193,7,0.3)" }}>
          <p className="text-xs font-bold flex items-center gap-1" style={{ color: "#f57f17" }}>
            🙏 I am grateful for...
          </p>
          {(["grateful1", "grateful2", "grateful3"] as const).map((field, i) => (
            <div key={field} className="flex items-center gap-2">
              <span style={{ color: "#ffa000", fontSize: "9px", minWidth: "10px" }}>{i + 1}.</span>
              <input value={data[field]} onChange={e => update(field, e.target.value)}
                placeholder="Something you're grateful for..."
                className="bg-transparent text-xs focus:outline-none flex-1"
                style={{ color: "#5d4037" }} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: "rgba(191,54,12,0.2)" }} />
          <span style={{ color: "#ff8a65", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "rgba(191,54,12,0.2)" }} />
        </div>

        {/* 6 Prompts */}
        <div className="flex flex-col gap-1.5">
          {prompts.map((field, i) => (
            <div key={field} className="rounded-xl px-3 py-1.5 flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,138,101,0.25)" }}>
              <span className="text-xs font-bold shrink-0" style={{ color: "#ff8a65", minWidth: "14px" }}>{i + 1}.</span>
              <input value={data[field]} onChange={e => update(field, e.target.value)}
                className="bg-transparent text-xs leading-relaxed focus:outline-none w-full"
                style={{ color: "#5d4037" }} />
            </div>
          ))}
        </div>

        {/* Journal space */}
        <div className="rounded-xl px-3 py-2 flex-1 flex flex-col gap-1"
          style={{ background: "rgba(255,138,101,0.06)", border: "1px dashed rgba(255,138,101,0.35)" }}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">✏️</span>
            <p className="text-xs italic" style={{ color: "#a1887f" }}>Write your thoughts below...</p>
          </div>
          <textarea value={data.journal} onChange={e => update("journal", e.target.value)}
            placeholder="Your thoughts..."
            className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none flex-1 w-full"
            style={{ color: "#5d4037", fontFamily: "Georgia, serif" }} />
        </div>

        <p className="absolute bottom-3 right-5 text-xs" style={{ color: "#d7b8a0", fontFamily: "Georgia, serif" }}>— 07 —</p>
      </div>
    </div>
  );
}
