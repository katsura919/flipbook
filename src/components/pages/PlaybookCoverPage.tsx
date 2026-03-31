"use client";

import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { useEffect, useState } from "react";

const accentScript = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function PlaybookCoverPage() {
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
        <div className="flex flex-col items-center gap-4">
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
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: "var(--brand-pale-gold)" }}
          >
            Personal Wellness
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">

          <div className="text-center flex flex-col gap-1 mt-1">
            <p
              className={`${accentScript.className} text-[30px] leading-none`}
              style={{ color: "var(--brand-pale-gold)" }}
            >
              The
            </p>
            <h1
              className="text-[2rem] font-bold leading-tight"
              style={{
                color: "var(--brand-cream)",
                textShadow: "0 3px 16px rgba(0, 0, 0, 0.55)",
                letterSpacing: "0.03em",
              }}
            >
              PEACE-DRIVEN
            </h1>
            <h1
              className="text-[2rem] font-bold leading-tight"
              style={{
                color: "var(--brand-cream)",
                textShadow: "0 3px 16px rgba(0, 0, 0, 0.55)",
                letterSpacing: "0.03em",
              }}
            >
              LEADER
            </h1>
            <h2
              className="text-lg font-semibold mt-1 uppercase"
              style={{
                color: "var(--brand-gold)",
                letterSpacing: "0.14em",
              }}
            >
              Playbook
            </h2>
          </div>

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
            className="text-[11px] text-center uppercase"
            style={{
              color: "rgba(232, 213, 163, 0.86)",
              letterSpacing: "0.17em",
            }}
          >
            Wellness &amp; Reflection
          </p>
        </div>

        <p
          className="text-[10px] text-center uppercase"
          style={{
            color: "rgba(232, 213, 163, 0.72)",
            letterSpacing: "0.15em",
          }}
        >
          Open and <span className={accentScript.className}>Explore</span>
        </p>
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
