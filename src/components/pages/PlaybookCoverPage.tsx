const PlaybookCoverPage = () => {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a3a2a, #2d5a3d, #1a3a2a)" }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(144,188,118,0.18) 0%, transparent 70%)" }}
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
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-10">

        {/* Top label */}
        <p
          className="text-xs uppercase tracking-[0.3em] font-semibold"
          style={{ color: "#90bc76" }}
        >
          Personal Wellness
        </p>

        {/* Center */}
        <div className="flex flex-col items-center gap-5">
          {/* Leaf / peace emblem */}
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.88 }}>
            <circle cx="36" cy="36" r="34" stroke="#90bc76" strokeWidth="1" />
            <circle cx="36" cy="36" r="27" stroke="#90bc76" strokeWidth="0.5" strokeDasharray="3 4" />
            {/* Peace symbol */}
            <circle cx="36" cy="36" r="14" stroke="#90bc76" strokeWidth="1.2" fill="none" />
            <line x1="36" y1="22" x2="36" y2="50" stroke="#90bc76" strokeWidth="1.2" />
            <line x1="36" y1="36" x2="26" y2="46" stroke="#90bc76" strokeWidth="1.2" />
            <line x1="36" y1="36" x2="46" y2="46" stroke="#90bc76" strokeWidth="1.2" />
            {/* Center dot */}
            <circle cx="36" cy="36" r="2.5" fill="#90bc76" />
            <circle cx="36" cy="36" r="1.2" fill="#1a3a2a" />
          </svg>

          {/* Title */}
          <div className="text-center flex flex-col gap-1">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "#90bc76" }}
            >
              The
            </p>
            <h1
              className="text-3xl font-bold leading-tight"
              style={{
                color: "#e8f5e9",
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                letterSpacing: "0.03em",
              }}
            >
              Peace-Driven
            </h1>
            <h1
              className="text-3xl font-bold leading-tight"
              style={{
                color: "#e8f5e9",
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                letterSpacing: "0.03em",
              }}
            >
              Leader
            </h1>
            <h2
              className="text-lg font-semibold mt-1"
              style={{
                color: "#a5d6a7",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.08em",
              }}
            >
              Playbook
            </h2>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-44">
            <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
            <span style={{ color: "#90bc76", fontSize: "10px" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "#90bc76" }} />
          </div>

          {/* Subtitle */}
          <p
            className="text-xs text-center"
            style={{ color: "#7a9e6e", letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Wellness &amp; Reflection
          </p>
        </div>

        {/* Bottom label */}
        <p
          className="text-xs text-center"
          style={{ color: "#4e6e4e", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          Open &amp; Explore
        </p>
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
          className={`absolute ${pos} opacity-35`}
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

export default PlaybookCoverPage;
