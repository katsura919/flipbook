"use client";

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
  message: "This playbook is a reflection of your effort and growth. Every small step forward is worth celebrating.",
  goal: "My wellness goal this week...",
  goalProgress: 5,
  profilePhoto: null,
  familyPhoto: null,
};

export default function InteractiveWelcomePage({ pageId }: { pageId: string }) {
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

  const update = (field: keyof PageData, value: string | number) =>
    setData(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = (field: "profilePhoto" | "familyPhoto") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => setData(prev => ({ ...prev, [field]: ev.target?.result as string }));
      reader.readAsDataURL(file);
    };

  const pct = ((data.goalProgress - 1) / 9) * 100;
  const progressColor = data.goalProgress >= 8 ? "#66bb6a" : data.goalProgress >= 5 ? "#ffa726" : "#ef5350";

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #1b5e20, #2e7d32, #388e3c)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full h-1 shrink-0" style={{ background: "linear-gradient(90deg, #a5d6a7, #66bb6a, #43a047)" }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #a5d6a7 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />

      <div className="relative z-10 flex flex-col h-full px-8 py-5 gap-3">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "#c8e6c9", letterSpacing: "0.2em" }}>
            Wellness Playbook 🌿
          </span>
        </div>

        {/* Photo uploads */}
        <div className="flex justify-center gap-4">
          {(["profilePhoto", "familyPhoto"] as const).map(field => (
            <label key={field} className="cursor-pointer group">
              <div className="rounded-2xl overflow-hidden flex items-center justify-center relative"
                style={{ width: "80px", height: "80px", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.25)" }}>
                {data[field] ? (
                  <img src={data[field]!} alt={field} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl opacity-60">{field === "profilePhoto" ? "👤" : "👨‍👩‍👧"}</span>
                    <span style={{ color: "rgba(200,230,201,0.7)", fontSize: "8px" }}>Upload</span>
                  </div>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.3)" }}>
                  <span style={{ color: "white", fontSize: "8px" }}>Change</span>
                </div>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(field)} />
            </label>
          ))}
        </div>

        {/* Name + subtitle */}
        <div className="text-center">
          <input value={data.name} onChange={e => update("name", e.target.value)}
            className="bg-transparent text-center font-bold focus:outline-none focus:border-b w-full"
            style={{ color: "#f1f8e9", fontFamily: "Georgia, serif", fontSize: "22px", borderColor: "rgba(165,214,167,0.5)", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }} />
          <input value={data.subtitle} onChange={e => update("subtitle", e.target.value)}
            className="bg-transparent text-center focus:outline-none focus:border-b w-full mt-1"
            style={{ color: "#a5d6a7", fontSize: "10px", letterSpacing: "0.12em", borderColor: "rgba(165,214,167,0.4)" }} />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mx-auto w-40">
          <div className="flex-1 h-px" style={{ background: "rgba(165,214,167,0.4)" }} />
          <span style={{ color: "#a5d6a7", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "rgba(165,214,167,0.4)" }} />
        </div>

        {/* Message */}
        <textarea value={data.message} onChange={e => update("message", e.target.value)}
          rows={2}
          className="bg-transparent text-center text-xs leading-relaxed resize-none focus:outline-none w-full"
          style={{ color: "#c8e6c9", fontFamily: "Georgia, serif" }} />

        {/* Goal tracker */}
        <div className="rounded-2xl px-4 py-3 flex flex-col gap-2"
          style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(165,214,167,0.2)" }}>
          <div className="flex items-center gap-2">
            <span className="text-sm">🎯</span>
            <input value={data.goal} onChange={e => update("goal", e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none flex-1"
              style={{ color: "#c8e6c9" }} />
          </div>
          {/* Progress slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span style={{ color: "rgba(165,214,167,0.6)", fontSize: "8px" }}>Progress</span>
              <span style={{ color: progressColor, fontSize: "8px", fontWeight: "bold" }}>{data.goalProgress}/10</span>
            </div>
            <div className="relative w-full rounded-full" style={{ height: "6px", background: "rgba(255,255,255,0.15)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: progressColor }} />
            </div>
            <input type="range" min={1} max={10} value={data.goalProgress}
              onChange={e => update("goalProgress", Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer"
              style={{ height: "12px", marginTop: "-8px", opacity: 0.01, position: "relative", zIndex: 10 }} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col items-center gap-1">
          <div className="text-xl">🌱</div>
          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(165,214,167,0.5)" }}>Your Journey Begins</p>
        </div>

        {/* Corner ornaments */}
        {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map((pos, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" className={`absolute ${pos} opacity-30`} fill="none">
            <path d="M2 2 L12 2 L2 12 Z" fill="none" stroke="#a5d6a7" strokeWidth="1.5" />
            <path d="M2 2 L2 8" stroke="#a5d6a7" strokeWidth="1.5" />
            <path d="M2 2 L8 2" stroke="#a5d6a7" strokeWidth="1.5" />
          </svg>
        ))}
      </div>
    </div>
  );
}
