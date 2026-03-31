
const CoverPage = () => {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ backgroundColor: "#0f2027" }}
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)" }}
      />

      {/* Map grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,220,120,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,220,120,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-10">

        {/* Top label */}
        <p
          className="text-xs uppercase tracking-[0.35em] font-semibold"
          style={{ color: "#c9a84c" }}
        >
          Est. 2025
        </p>

        {/* Center */}
        <div className="flex flex-col items-center gap-6">
          {/* Compass rose SVG */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.85 }}
          >
            {/* Outer circle */}
            <circle cx="40" cy="40" r="38" stroke="#c9a84c" strokeWidth="1" />
            <circle cx="40" cy="40" r="32" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="3 4" />

            {/* Cardinal points */}
            <polygon points="40,4 43,36 37,36" fill="#c9a84c" />
            <polygon points="40,76 43,44 37,44" fill="#6b7280" />
            <polygon points="4,40 36,37 36,43" fill="#6b7280" />
            <polygon points="76,40 44,37 44,43" fill="#6b7280" />

            {/* N label */}
            <text x="40" y="18" textAnchor="middle" fill="#c9a84c" fontSize="8" fontWeight="bold" fontFamily="serif">N</text>

            {/* Center dot */}
            <circle cx="40" cy="40" r="3" fill="#c9a84c" />
            <circle cx="40" cy="40" r="1.5" fill="#0f2027" />
          </svg>

          {/* Title */}
          <div className="text-center">
            <h1
              className="text-5xl font-bold leading-tight"
              style={{
                color: "#f5e6c8",
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Travel
            </h1>
            <h1
              className="text-5xl font-bold leading-tight"
              style={{
                color: "#f5e6c8",
                fontFamily: "Georgia, serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Journal
            </h1>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-48">
            <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
            <span style={{ color: "#c9a84c", fontSize: "10px" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
          </div>

          {/* Subtitle */}
          <p
            className="text-sm text-center"
            style={{ color: "#a89060", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Adventures &amp; Discoveries
          </p>
        </div>

        {/* Bottom label */}
        <p
          className="text-xs text-center"
          style={{ color: "#6b7a5e", letterSpacing: "0.15em", textTransform: "uppercase" }}
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={`absolute ${pos} opacity-40`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 2 L12 2 L2 12 Z" fill="none" stroke="#c9a84c" strokeWidth="1" />
          <path d="M2 2 L2 8" stroke="#c9a84c" strokeWidth="1" />
          <path d="M2 2 L8 2" stroke="#c9a84c" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
};

export default CoverPage;
