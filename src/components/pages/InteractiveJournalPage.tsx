"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  image: string | null;
  imageCaption: string;
  heading: string;
  body: string;
  tag: string;
  pageNumber: string;
}

const defaults: PageData = {
  image: null,
  imageCaption: "My photo",
  heading: "Write a heading...",
  body: "Start writing your travel notes here. What did you see? How did it feel? What will you remember most about this place?",
  tag: "Day 1",
  pageNumber: "01",
};

export default function InteractiveJournalPage({ pageId }: { pageId: string }) {
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

  // Block page-flip events for all interactive elements
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stop = (e: Event) => {
      if ((e.target as HTMLElement).closest("input, textarea, label, button")) {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setData((prev) => ({ ...prev, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      {/* Ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 31px, #e2d9c8 32px)",
          backgroundPosition: "0 52px",
        }}
      />
      {/* Left margin line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "28px", width: "1px", background: "#e8a87c", opacity: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-9 py-6 gap-3">

        {/* Top row: tag + page number */}
        <div className="flex items-center justify-between">
          <input
            value={data.tag}
            onChange={(e) => update("tag", e.target.value)}
            className="text-xs uppercase tracking-widest px-2 py-0.5 rounded-full focus:outline-none w-20 text-center"
            style={{ background: "#e8d5a3", color: "#7a5c2e", fontSize: "9px" }}
          />
          <span style={{ color: "#b0a090", fontSize: "9px", fontFamily: "Georgia, serif" }}>
            — {data.pageNumber} —
          </span>
        </div>

        {/* Polaroid upload */}
        <label className="self-center cursor-pointer group" style={{ rotate: "1deg" }}>
          <div
            className="shadow-lg"
            style={{ background: "#fff", padding: "6px 6px 26px 6px", width: "150px" }}
          >
            {data.image ? (
              <img
                src={data.image}
                alt={data.imageCaption}
                className="w-full object-cover"
                style={{ height: "100px" }}
              />
            ) : (
              <div
                className="w-full flex flex-col items-center justify-center gap-1"
                style={{ height: "100px", background: "#f0ebe0" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b0a090" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p style={{ color: "#b0a090", fontSize: "8px", letterSpacing: "0.08em" }}>ADD PHOTO</p>
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded"
              style={{ background: "rgba(0,0,0,0.2)" }}>
              <p style={{ color: "white", fontSize: "8px" }}>Change</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {/* Caption */}
            <input
              value={data.imageCaption}
              onChange={(e) => update("imageCaption", e.target.value)}
              className="w-full text-center bg-transparent focus:outline-none mt-1 block"
              style={{ fontFamily: "Georgia, serif", fontSize: "8px", color: "#888", letterSpacing: "0.05em" }}
            />
          </div>
        </label>

        {/* Heading */}
        <input
          value={data.heading}
          onChange={(e) => update("heading", e.target.value)}
          className="bg-transparent font-bold focus:outline-none focus:border-b border-stone-300 w-full"
          style={{ color: "#3d2b1f", fontFamily: "Georgia, serif", fontSize: "15px" }}
        />

        {/* Body */}
        <textarea
          value={data.body}
          onChange={(e) => update("body", e.target.value)}
          className="bg-transparent text-sm leading-8 resize-none focus:outline-none flex-1 w-full"
          style={{ color: "#5a4a3a", fontFamily: "Georgia, serif" }}
        />
      </div>
    </div>
  );
}
