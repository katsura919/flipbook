"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface PageData {
  grateful1: string;
  grateful2: string;
  grateful3: string;
  journal: string;
}

const defaults: PageData = {
  grateful1: "",
  grateful2: "",
  grateful3: "",
  journal: "",
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function InteractiveReflectionPage({ pageId }: { pageId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PageData>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`flipbook-page-${pageId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<PageData>;
        setData({ ...defaults, ...parsed });
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
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          background: "rgba(45, 90, 61, 0.1)",
          bottom: "-55px",
          left: "-48px",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-7 py-4 pb-9 gap-2.5">
        <div>
          <p
            className={`${accentScript.className} text-[30px] leading-none`}
            style={{ color: "var(--brand-forest-green)" }}
          >
            Reflection
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "rgba(44, 58, 46, 0.6)" }}
          >
            Pause and think
          </p>
        </div>

        <div
          className="rounded-2xl px-3 py-2.5 flex flex-col gap-1.5"
          style={{
            background: "rgba(201, 168, 76, 0.13)",
            border: "1px solid rgba(201, 168, 76, 0.35)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.1em]"
            style={{ color: "#8f7340" }}
          >
            I am grateful for
          </p>
          {(["grateful1", "grateful2", "grateful3"] as const).map((field, i) => (
            <div key={field} className="flex items-center gap-2">
              <span
                className="text-[9px] font-bold"
                style={{ color: "#a5884a", minWidth: "10px" }}
              >
                {i + 1}.
              </span>
              <input
                value={data[field]}
                onChange={(e) => update(field, e.target.value)}
                placeholder="Something you are grateful for..."
                className="bg-transparent text-xs focus:outline-none flex-1"
                style={{ color: "var(--brand-charcoal)" }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: "rgba(44, 58, 46, 0.2)" }} />
          <span style={{ color: "var(--brand-gold)", fontSize: "10px" }}>*</span>
          <div className="flex-1 h-px" style={{ background: "rgba(44, 58, 46, 0.2)" }} />
        </div>

        <div
          className="rounded-2xl px-3 py-2 flex-1 min-h-0 flex flex-col gap-1"
          style={{
            background: "rgba(20, 41, 31, 0.42)",
            border: "1px solid rgba(232, 213, 163, 0.35)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className={`${accentScript.className} text-[24px] leading-none`}
              style={{ color: "var(--brand-pale-gold)" }}
            >
              Journal
            </p>
            <p
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ color: "rgba(232, 213, 163, 0.72)" }}
            >
              Write freely
            </p>
          </div>
          <textarea
            value={data.journal}
            onChange={(e) => update("journal", e.target.value)}
            placeholder="Your thoughts..."
            className="bg-transparent text-xs leading-relaxed resize-none focus:outline-none flex-1 w-full"
            style={{ color: "var(--brand-cream)", fontFamily: "var(--font-serif)" }}
          />
        </div>

        <p
          className="absolute bottom-3 right-5 text-xs"
          style={{ color: "rgba(44, 58, 46, 0.45)", fontFamily: "var(--font-serif)" }}
        >
          - 08 -
        </p>
      </div>
    </div>
  );
}
