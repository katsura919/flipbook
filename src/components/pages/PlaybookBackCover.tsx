"use client";

import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { useEffect, useState } from "react";

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function PlaybookBackCover() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, var(--brand-deep-green) 0%, var(--brand-forest-green) 50%, #14291f 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(232, 213, 163, 0.2) 0%, rgba(232, 213, 163, 0) 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(122deg, rgba(232, 213, 163, 0.08) 0%, rgba(232, 213, 163, 0) 42%), linear-gradient(302deg, rgba(250, 247, 240, 0.06) 0%, rgba(250, 247, 240, 0) 36%)",
        }}
      />
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "rgba(201, 168, 76, 0.15)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "rgba(232, 213, 163, 0.1)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.58) 100%)",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-10">
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative w-[78px] h-[78px] rounded-full p-[7px] border"
            style={{
              borderColor: "rgba(232, 213, 163, 0.55)",
              background:
                "radial-gradient(circle at 50% 30%, rgba(250, 247, 240, 0.22), rgba(20, 41, 31, 0.85))",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{ background: "rgba(250, 247, 240, 0.96)" }}
            >
              <Image
                src="/assets/logo.png"
                alt="Peace-Driven Leader logo"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold text-center"
            style={{ color: "var(--brand-pale-gold)" }}
          >
            Peace-Driven Leadership
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p
            className={`${accentScript.className} text-[40px] leading-none`}
            style={{ color: "var(--brand-pale-gold)" }}
          >
            Thank You
          </p>

          <div className="flex items-center gap-3 w-44">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(232, 213, 163, 0.7)" }}
            />
            <span style={{ color: "var(--brand-gold)", fontSize: "11px" }}>*</span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(232, 213, 163, 0.7)" }}
            />
          </div>

          <p
            className="text-sm leading-relaxed max-w-[220px]"
            style={{
              color: "rgba(250, 247, 240, 0.9)",
              fontFamily: "var(--font-serif)",
            }}
          >
            The journey continues one intentional day at a time.
          </p>

          <p
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(232, 213, 163, 0.82)" }}
          >
            Keep Leading with Peace
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p
            className="text-[10px] text-center uppercase"
            style={{
              color: "rgba(232, 213, 163, 0.72)",
              letterSpacing: "0.15em",
            }}
          >
            Peace-Driven Leader Playbook
          </p>
          <p
            className={`${accentScript.className} text-[24px] leading-none`}
            style={{ color: "var(--brand-pale-gold)" }}
          >
            See You Next Week
          </p>
        </div>
      </div>

      {[
        "top-4 left-4",
        "top-4 right-4 rotate-90",
        "bottom-4 left-4 -rotate-90",
        "bottom-4 right-4 rotate-180",
      ].map((pos, i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className={`absolute ${pos} opacity-50`}
          fill="none"
        >
          <path
            d="M2 2 L12 2 L2 12 Z"
            fill="none"
            stroke="var(--brand-pale-gold)"
            strokeWidth="1"
          />
          <path d="M2 2 L2 8" stroke="var(--brand-pale-gold)" strokeWidth="1" />
          <path d="M2 2 L8 2" stroke="var(--brand-pale-gold)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
