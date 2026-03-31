"use client";

import { useEffect, useState } from "react";

function computeScore(): number {
  let score = 0;
  let total = 0;

  // Habits completion (40 pts)
  try {
    const raw = localStorage.getItem("flipbook-page-wellness-habits");
    if (raw) {
      const { habits } = JSON.parse(raw) as { habits: { days: boolean[] }[] };
      const done = habits.reduce((s, h) => s + h.days.filter(Boolean).length, 0);
      const possible = habits.length * 7;
      score += (done / possible) * 40;
      total += 40;
    }
  } catch {}

  // Mood + energy avg (30 pts each, scaled to 5)
  try {
    const raw = localStorage.getItem("flipbook-page-wellness-tracker");
    if (raw) {
      const { mood, energy } = JSON.parse(raw) as { mood: number[]; energy: number[] };
      const moodFilled = mood.filter(Boolean);
      const energyFilled = energy.filter(Boolean);
      if (moodFilled.length) {
        score += (moodFilled.reduce((a, b) => a + b, 0) / moodFilled.length / 5) * 30;
        total += 30;
      }
      if (energyFilled.length) {
        score += (energyFilled.reduce((a, b) => a + b, 0) / energyFilled.length / 5) * 30;
        total += 30;
      }
    }
  } catch {}

  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export default function PlaybookCoverPage() {
  const [score, setScore] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setScore(computeScore());
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const scoreColor = score >= 75 ? "#66bb6a" : score >= 50 ? "#ffa726" : score > 0 ? "#ef5350" : "#555";
  const circumference = 2 * Math.PI * 28;
  const dash = score > 0 ? (score / 100) * circumference : 0;

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a3a2a, #2d5a3d, #1a3a2a)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full h-1 absolute top-0 left-0 z-20" style={{ background: "linear-gradient(90deg, #90bc76, #66bb6a, #43a047)" }} />

      {/* Soft radial glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(144,188,118,0.18) 0%, transparent 70%)" }} />
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "linear-gradient(rgba(165,214,167,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(165,214,167,0.8) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-10">
        {/* Top label */}
        <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "#90bc76" }}>Personal Wellness</p>

        {/* Center */}
        <div className="flex flex-col items-center gap-4">
          {/* Wellness score ring */}
          <div className="relative flex items-center justify-center" style={{ width: "80px", height: "80px" }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              {/* Peace symbol background */}
              <circle cx="40" cy="40" r="34" stroke="#2d5a3d" strokeWidth="1.5" fill="none" />
              {/* Track */}
              <circle cx="40" cy="40" r="28" stroke="rgba(144,188,118,0.15)" strokeWidth="5" fill="none" />
              {/* Progress arc */}
              {score > 0 && (
                <circle
                  cx="40" cy="40" r="28"
                  stroke={scoreColor}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform="rotate(-90 40 40)"
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
              )}
              {/* Peace lines */}
              <line x1="40" y1="16" x2="40" y2="44" stroke="#90bc76" strokeWidth="1" opacity="0.5" />
              <line x1="40" y1="40" x2="30" y2="50" stroke="#90bc76" strokeWidth="1" opacity="0.5" />
              <line x1="40" y1="40" x2="50" y2="50" stroke="#90bc76" strokeWidth="1" opacity="0.5" />
              <circle cx="40" cy="40" r="14" stroke="#90bc76" strokeWidth="1" fill="none" opacity="0.5" />
              {/* Score text */}
              <text x="40" y="43" textAnchor="middle" fontSize={score > 0 ? "12" : "9"} fontWeight="bold" fill={score > 0 ? scoreColor : "#4e6e4e"} fontFamily="Georgia, serif">
                {score > 0 ? score : "—"}
              </text>
            </svg>
            {score > 0 && (
              <div className="absolute -bottom-4 text-center">
                <p style={{ color: scoreColor, fontSize: "8px", letterSpacing: "0.1em" }}>WELLNESS SCORE</p>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="text-center flex flex-col gap-1 mt-3">
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#90bc76" }}>The</p>
            <h1 className="text-3xl font-bold leading-tight"
              style={{ color: "#e8f5e9", fontFamily: "Georgia, serif", textShadow: "0 2px 12px rgba(0,0,0,0.5)", letterSpacing: "0.03em" }}>
              Peace-Driven
            </h1>
            <h1 className="text-3xl font-bold leading-tight"
              style={{ color: "#e8f5e9", fontFamily: "Georgia, serif", textShadow: "0 2px 12px rgba(0,0,0,0.5)", letterSpacing: "0.03em" }}>
              Leader
            </h1>
            <h2 className="text-lg font-semibold mt-1"
              style={{ color: "#a5d6a7", fontFamily: "Georgia, serif", letterSpacing: "0.08em" }}>
              Playbook
            </h2>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-44">
            <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
            <span style={{ color: "#90bc76", fontSize: "10px" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
          </div>

          <p className="text-xs text-center" style={{ color: "#7a9e6e", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Wellness &amp; Reflection
          </p>
        </div>

        <p className="text-xs text-center" style={{ color: "#4e6e4e", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Open &amp; Explore
        </p>
      </div>

      {/* Corner ornaments */}
      {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 left-4 -rotate-90", "bottom-4 right-4 rotate-180"].map((pos, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" className={`absolute ${pos} opacity-35`} fill="none">
          <path d="M2 2 L12 2 L2 12 Z" fill="none" stroke="#90bc76" strokeWidth="1" />
          <path d="M2 2 L2 8" stroke="#90bc76" strokeWidth="1" />
          <path d="M2 2 L8 2" stroke="#90bc76" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
