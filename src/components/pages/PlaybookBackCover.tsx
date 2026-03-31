const PlaybookBackCover = () => {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a3a2a, #2d5a3d, #1a3a2a)" }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 40% 60%, rgba(144,188,118,0.15) 0%, transparent 70%)" }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(165,214,167,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(165,214,167,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-14 px-10">

        {/* Top ornament */}
        <div className="flex items-center gap-3 w-36">
          <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
          <span style={{ color: "#90bc76", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* Small leaf icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.75 }}>
            <circle cx="20" cy="20" r="18" stroke="#90bc76" strokeWidth="1" />
            <circle cx="20" cy="20" r="8" stroke="#90bc76" strokeWidth="0.8" fill="none" />
            <line x1="20" y1="12" x2="20" y2="28" stroke="#90bc76" strokeWidth="0.9" />
            <line x1="20" y1="20" x2="14" y2="26" stroke="#90bc76" strokeWidth="0.9" />
            <line x1="20" y1="20" x2="26" y2="26" stroke="#90bc76" strokeWidth="0.9" />
            <circle cx="20" cy="20" r="1.5" fill="#90bc76" />
          </svg>

          <p
            className="text-base font-semibold"
            style={{ color: "#a5d6a7", fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
          >
            The Journey Continues
          </p>

          <div className="w-12 h-px" style={{ background: "#4e6e4e" }} />

          <p
            className="text-xs leading-relaxed max-w-[200px]"
            style={{ color: "#5a7a5a", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            "Peace is not the absence of challenges, but the presence of purpose."
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "#4e6e4e" }}
          >
            Peace-Driven Leader Playbook
          </p>
          <div className="flex items-center gap-3 w-36">
            <div className="flex-1 h-px" style={{ background: "#2d4a2d" }} />
            <span style={{ color: "#4e6e4e", fontSize: "10px" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "#2d4a2d" }} />
          </div>
        </div>
      </div>

      {/* Corner ornaments */}
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
          className={`absolute ${pos} opacity-25`}
          fill="none"
        >
          <path d="M2 2 L12 2 L2 12 Z" fill="none" stroke="#90bc76" strokeWidth="1" />
          <path d="M2 2 L2 8" stroke="#90bc76" strokeWidth="1" />
          <path d="M2 2 L8 2" stroke="#90bc76" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
};

export default PlaybookBackCover;
