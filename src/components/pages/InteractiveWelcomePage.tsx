"use client";

import { Great_Vibes } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface PageData {
  name: string;
  subtitle: string;
  message: string;
  goal: string;
  goalProgress: number;
  profilePhoto: string | null;
  familyPhoto: string | null;
}

const defaults: PageData = {
  name: "Your Name",
  subtitle: "Your wellness journey starts here",
  message:
    "This playbook is a reflection of your effort and growth. Every small step forward is worth celebrating.",
  goal: "My wellness goal this week...",
  goalProgress: 5,
  profilePhoto: null,
  familyPhoto: null,
};

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function InteractiveWelcomePage({ pageId }: { pageId: string }) {
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

  const handleImageUpload =
    (field: "profilePhoto" | "familyPhoto") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) =>
        setData((prev) => ({ ...prev, [field]: ev.target?.result as string }));
      reader.readAsDataURL(file);
    };

  const pct = ((data.goalProgress - 1) / 9) * 100;
  const progressColor =
    data.goalProgress >= 8
      ? "var(--brand-gold)"
      : data.goalProgress >= 5
        ? "var(--brand-pale-gold)"
        : "#d98d64";

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(164deg, var(--brand-deep-green) 0%, var(--brand-forest-green) 52%, #14291f 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="w-full h-[3px] shrink-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--brand-gold), var(--brand-pale-gold), var(--brand-gold), transparent)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 10%, rgba(232, 213, 163, 0.24) 0%, rgba(232, 213, 163, 0) 54%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(250, 247, 240, 0.08) 0%, rgba(250, 247, 240, 0) 40%), linear-gradient(300deg, rgba(232, 213, 163, 0.07) 0%, rgba(232, 213, 163, 0) 32%)",
        }}
      />
      <div
        className="absolute -top-20 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(201, 168, 76, 0.15)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 48%, rgba(0, 0, 0, 0.45) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-8 py-5 gap-3">
        <div className="flex justify-center">
          <span
            className="text-[10px] uppercase tracking-[0.24em] px-4 py-1 rounded-full"
            style={{
              background: "rgba(232, 213, 163, 0.16)",
              color: "var(--brand-pale-gold)",
              border: "1px solid rgba(232, 213, 163, 0.3)",
            }}
          >
            Wellness Playbook
          </span>
        </div>

        <div className="flex justify-center gap-4">
          {(["profilePhoto", "familyPhoto"] as const).map((field) => (
            <label key={field} className="cursor-pointer group">
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center relative"
                style={{
                  width: "82px",
                  height: "82px",
                  background: "rgba(250, 247, 240, 0.08)",
                  border: "1.5px solid rgba(232, 213, 163, 0.45)",
                }}
              >
                {data[field] ? (
                  <img src={data[field]!} alt={field} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center px-2">
                    <span
                      className="text-[10px] uppercase"
                      style={{
                        color: "rgba(250, 247, 240, 0.88)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {field === "profilePhoto" ? "Profile" : "Family"}
                    </span>
                    <span style={{ color: "rgba(232, 213, 163, 0.7)", fontSize: "8px" }}>
                      Upload
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: "rgba(0, 0, 0, 0.36)" }}
                >
                  <span style={{ color: "white", fontSize: "8px", letterSpacing: "0.08em" }}>
                    CHANGE
                  </span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload(field)}
              />
            </label>
          ))}
        </div>

        <div className="text-center">
          <input
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="bg-transparent text-center font-bold focus:outline-none focus:border-b w-full"
            style={{
              color: "var(--brand-cream)",
              fontFamily: "var(--font-serif)",
              fontSize: "24px",
              borderColor: "rgba(232, 213, 163, 0.55)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.34)",
            }}
          />
          <input
            value={data.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            className="bg-transparent text-center focus:outline-none focus:border-b w-full mt-1"
            style={{
              color: "rgba(232, 213, 163, 0.94)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              borderColor: "rgba(232, 213, 163, 0.4)",
              textTransform: "uppercase",
            }}
          />
        </div>

        <div className="flex items-center gap-3 mx-auto w-44">
          <div className="flex-1 h-px" style={{ background: "rgba(232, 213, 163, 0.55)" }} />
          <span style={{ color: "var(--brand-gold)", fontSize: "10px" }}>*</span>
          <div className="flex-1 h-px" style={{ background: "rgba(232, 213, 163, 0.55)" }} />
        </div>

        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          className="resize-none focus:outline-none w-full rounded-2xl px-4 py-3 text-center text-xs leading-relaxed"
          style={{
            color: "rgba(250, 247, 240, 0.93)",
            background: "rgba(20, 41, 31, 0.38)",
            border: "1px solid rgba(232, 213, 163, 0.24)",
          }}
        />

        <div
          className="rounded-2xl px-4 py-3 flex flex-col gap-2"
          style={{
            background: "rgba(20, 41, 31, 0.5)",
            border: "1px solid rgba(232, 213, 163, 0.28)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className={`${accentScript.className} text-[23px] leading-none`}
              style={{ color: "var(--brand-pale-gold)" }}
            >
              Goal
            </span>
            <input
              value={data.goal}
              onChange={(e) => update("goal", e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none flex-1"
              style={{ color: "var(--brand-cream)" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span
                style={{
                  color: "rgba(232, 213, 163, 0.7)",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Progress
              </span>
              <span style={{ color: progressColor, fontSize: "9px", fontWeight: "bold" }}>
                {data.goalProgress}/10
              </span>
            </div>
            <div
              className="relative w-full rounded-full"
              style={{ height: "7px", background: "rgba(250, 247, 240, 0.16)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: progressColor,
                  boxShadow: "0 0 12px rgba(232, 213, 163, 0.3)",
                }}
              />
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={data.goalProgress}
              onChange={(e) => update("goalProgress", Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer"
              style={{
                height: "12px",
                marginTop: "-8px",
                opacity: 0.01,
                position: "relative",
                zIndex: 10,
              }}
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-1">
          <p
            className={`${accentScript.className} text-[30px] leading-none`}
            style={{ color: "var(--brand-pale-gold)" }}
          >
            Welcome
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(232, 213, 163, 0.72)" }}
          >
            Your Journey Begins
          </p>
        </div>

        {[
          "top-3 left-3",
          "top-3 right-3 rotate-90",
          "bottom-3 left-3 -rotate-90",
          "bottom-3 right-3 rotate-180",
        ].map((pos, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={`absolute ${pos} opacity-40`}
            fill="none"
          >
            <path
              d="M2 2 L12 2 L2 12 Z"
              fill="none"
              stroke="var(--brand-pale-gold)"
              strokeWidth="1.5"
            />
            <path d="M2 2 L2 8" stroke="var(--brand-pale-gold)" strokeWidth="1.5" />
            <path d="M2 2 L8 2" stroke="var(--brand-pale-gold)" strokeWidth="1.5" />
          </svg>
        ))}
      </div>
    </div>
  );
}
