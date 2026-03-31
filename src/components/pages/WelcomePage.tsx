import { PlaybookPage } from "@/types/playbook";

interface Props {
  page: PlaybookPage;
  profilePhoto: string | null;
  familyPhoto: string | null;
}

export default function WelcomePage({ page, profilePhoto, familyPhoto }: Props) {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg, #1b5e20, #2e7d32, #388e3c)" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #a5d6a7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)" }}
      />

      <div className="relative z-10 flex flex-col h-full px-8 py-8 gap-4">
        {/* Top badge */}
        <div className="flex justify-center">
          <span
            className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "#c8e6c9", letterSpacing: "0.2em" }}
          >
            Wellness Playbook 🌿
          </span>
        </div>

        {/* Photos row */}
        <div className="flex justify-center gap-4">
          {[profilePhoto, familyPhoto].map((photo, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                width: "90px",
                height: "90px",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {photo ? (
                <img src={photo} alt={i === 0 ? "Profile" : "Family"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl opacity-50">{i === 0 ? "👤" : "👨‍👩‍👧"}</span>
              )}
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            className="text-2xl font-bold leading-tight mb-1"
            style={{ color: "#f1f8e9", fontFamily: "Georgia, serif", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            {page.title}
          </h1>
          <p className="text-xs tracking-widest uppercase" style={{ color: "#a5d6a7" }}>
            {page.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mx-auto w-40">
          <div className="flex-1 h-px" style={{ background: "rgba(165,214,167,0.5)" }} />
          <span style={{ color: "#a5d6a7", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "rgba(165,214,167,0.5)" }} />
        </div>

        {/* Content */}
        <p
          className="text-center text-xs leading-relaxed"
          style={{ color: "#c8e6c9", fontFamily: "Georgia, serif" }}
        >
          {page.content}
        </p>

        {/* Bottom ornament */}
        <div className="mt-auto flex flex-col items-center gap-2">
          <div className="text-2xl">🌱</div>
          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(165,214,167,0.6)" }}>
            Your Journey Begins
          </p>
        </div>

        {/* Corner ornaments */}
        {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map(
          (pos, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" className={`absolute ${pos} opacity-30`} fill="none">
              <path d="M2 2 L12 2 L2 12 Z" fill="none" stroke="#a5d6a7" strokeWidth="1.5" />
              <path d="M2 2 L2 8" stroke="#a5d6a7" strokeWidth="1.5" />
              <path d="M2 2 L8 2" stroke="#a5d6a7" strokeWidth="1.5" />
            </svg>
          )
        )}
      </div>
    </div>
  );
}
