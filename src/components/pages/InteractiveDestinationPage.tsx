"use client";

import { useEffect, useRef, useState } from "react";

interface PageData {
  image: string | null;
  location: string;
  country: string;
  date: string;
  title: string;
  description: string;
}

const defaults: PageData = {
  image: null,
  location: "City",
  country: "Country",
  date: "Month Year",
  title: "Your Destination",
  description: "Write about this place...",
};

export default function InteractiveDestinationPage({ pageId }: { pageId: string }) {
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
      className="w-full h-full relative overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Hero image upload area */}
      <label
        className="absolute inset-x-0 top-0 cursor-pointer group block"
        style={{ height: "65%" }}
      >
        {data.image ? (
          <img
            src={data.image}
            alt="destination"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: "#1e2d3d" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4a6a8a" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p style={{ color: "#4a6a8a", fontSize: "11px", letterSpacing: "0.1em" }}>
              UPLOAD PHOTO
            </p>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)" }}>
          <p style={{ color: "white", fontSize: "10px", letterSpacing: "0.15em" }}>
            {data.image ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
          </p>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>

      {/* Gradient fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 40%, #1a1a1a 75%)" }}
      />

      {/* Text area */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-7 pb-6"
        style={{ top: "55%" }}
      >
        {/* Location row */}
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#c9a84c">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <input
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            className="bg-transparent font-semibold uppercase focus:outline-none focus:border-b border-amber-600 w-24"
            style={{ color: "#c9a84c", fontSize: "10px", letterSpacing: "0.15em" }}
          />
          <span style={{ color: "#c9a84c", fontSize: "10px" }}>,</span>
          <input
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            className="bg-transparent font-semibold uppercase focus:outline-none focus:border-b border-amber-600 w-24"
            style={{ color: "#c9a84c", fontSize: "10px", letterSpacing: "0.15em" }}
          />
        </div>

        {/* Title */}
        <input
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className="bg-transparent font-bold leading-tight focus:outline-none focus:border-b border-amber-200 w-full"
          style={{ color: "#f5e6c8", fontFamily: "Georgia, serif", fontSize: "22px" }}
        />

        {/* Date */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-px" style={{ background: "#c9a84c" }} />
          <input
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
            className="bg-transparent focus:outline-none w-28"
            style={{ color: "#6b7a5e", fontSize: "9px", letterSpacing: "0.15em" }}
          />
        </div>

        {/* Description */}
        <textarea
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className="bg-transparent text-sm leading-relaxed resize-none focus:outline-none w-full"
          style={{ color: "#a0a0a0" }}
        />
      </div>
    </div>
  );
}
