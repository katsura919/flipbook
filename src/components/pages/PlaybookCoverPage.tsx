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
          "radial-gradient(140% 100% at 50% 0%, #fffaf1 0%, #f5ecdb 58%, #ecdfc8 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(125deg, rgba(232, 213, 163, 0.06) 0%, rgba(232, 213, 163, 0) 42%), linear-gradient(305deg, rgba(250, 247, 240, 0.05) 0%, rgba(250, 247, 240, 0) 36%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(130,102,49,0.035) 0px, rgba(130,102,49,0.035) 1px, transparent 1px, transparent 5px)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative h-[58%] px-6 pt-[9%] text-center">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.09em]"
            style={{ color: "#876e34" }}
          >
            Peace-Driven Leader
          </p>

          <p className="mt-4 text-[11px] uppercase tracking-[0.14em]" style={{ color: "#7d6430" }}>
            The
          </p>
          <h1
            className="text-[33px] font-bold leading-[0.95]"
            style={{
              color: "#1f2b25",
              fontFamily: "var(--font-serif)",
              letterSpacing: "0.02em",
            }}
          >
            PEACE-DRIVEN
          </h1>
          <h1
            className="text-[33px] font-bold leading-[0.95]"
            style={{
              color: "#1f2b25",
              fontFamily: "var(--font-serif)",
              letterSpacing: "0.02em",
            }}
          >
            LEADER
          </h1>

          <p
            className={`${accentScript.className} text-[44px] leading-none mt-1`}
            style={{ color: "#b9923c" }}
          >
            Playbook
          </p>

          <div
            className="mx-auto mt-2 inline-flex items-center justify-center rounded-full px-4 py-1"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #b18d37)",
              color: "#2a2418",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Leadership Stabilization System
          </div>

          <p
            className="mt-2 text-[10px] uppercase tracking-[0.1em]"
            style={{ color: "rgba(134, 110, 52, 0.72)" }}
          >
            Executive Alignment Edition
          </p>
        </div>

        <div
          className="relative flex-1 rounded-t-[34px] overflow-hidden border-t px-6 pb-[7.5%] pt-[22%]"
          style={{
            borderColor: "rgba(210, 177, 90, 0.65)",
            boxShadow: "0 -10px 24px rgba(20, 41, 31, 0.22)",
            background:
              "linear-gradient(175deg, #28473a 0%, #1e3a2f 58%, #162e25 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.2) 0%, rgba(201, 168, 76, 0) 46%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(232, 213, 163, 0.6), transparent)",
            }}
          />

          <div
            className="relative text-center"
            style={{ textShadow: "0 3px 12px rgba(0, 0, 0, 0.34)" }}
          >
            <p
              className="text-[28px] font-bold leading-[1.1]"
              style={{ color: "var(--brand-pale-gold)", fontFamily: "var(--font-serif)" }}
            >
              Where Vision Gets Protected
            </p>
            <p
              className="text-[28px] font-bold leading-[1.1]"
              style={{ color: "var(--brand-pale-gold)", fontFamily: "var(--font-serif)" }}
            >
              and Execution Stays Consistent
            </p>

            <div className="mt-2 h-px w-full" style={{ background: "rgba(201, 168, 76, 0.45)" }} />
            <p
              className="mt-1 text-[11px] uppercase tracking-[0.11em]"
              style={{ color: "rgba(232, 213, 163, 0.85)" }}
            >
              A Peace-Driven Leader Command System
            </p>
          </div>
        </div>
      </div>

      <Image
        src="/assets/logo.png"
        alt="Peace-Driven Leader logo emblem"
        width={150}
        height={150}
        className="absolute left-1/2 -translate-x-1/2 top-[49.4%] drop-shadow-[0_12px_18px_rgba(0,0,0,0.24)] z-10"
        priority
      />

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
          className={`absolute ${pos} opacity-45`}
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
