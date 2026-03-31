import { PlaybookPage } from "@/types/playbook";

interface Props {
  page: PlaybookPage;
}

export default function InsightsPage({ page }: Props) {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg, #f3e5f5, #e8eaf6, #e3f2fd)" }}
    >
      {/* Soft circle accents */}
      <div
        className="absolute pointer-events-none"
        style={{ width: "200px", height: "200px", borderRadius: "50%", background: "rgba(149,117,205,0.08)", top: "-60px", right: "-60px" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ width: "160px", height: "160px", borderRadius: "50%", background: "rgba(100,181,246,0.08)", bottom: "-40px", left: "-40px" }}
      />

      <div className="relative z-10 flex flex-col h-full px-8 py-7 gap-4">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#9c27b0" }}>Patterns & Insights</p>
          <h2 className="text-xl font-bold" style={{ color: "#4a148c", fontFamily: "Georgia, serif" }}>
            {page.title}
          </h2>
          <p className="text-xs" style={{ color: "#ab47bc" }}>{page.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: "rgba(156,39,176,0.2)" }} />
          <span style={{ color: "#ab47bc", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "rgba(156,39,176,0.2)" }} />
        </div>

        {/* Main insight block */}
        <div
          className="rounded-2xl p-4 flex-1 flex flex-col gap-3"
          style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(156,39,176,0.15)" }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "#4a4a6a", fontFamily: "Georgia, serif" }}>
            {page.content}
          </p>

          {/* Insight chips */}
          {page.prompts.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {page.prompts.map((prompt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl px-3 py-2"
                  style={{ background: "rgba(156,39,176,0.07)" }}
                >
                  <span style={{ color: "#ab47bc", fontSize: "12px", marginTop: "1px" }}>💡</span>
                  <p className="text-xs leading-relaxed" style={{ color: "#5a4a7a" }}>
                    {prompt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Correlation visual (decorative) */}
        <div className="flex items-center gap-3">
          {[
            { label: "Food", emoji: "🥗", color: "#43a047" },
            { label: "+", emoji: "", color: "#9e9e9e" },
            { label: "Mood", emoji: "😊", color: "#ab47bc" },
            { label: "=", emoji: "", color: "#9e9e9e" },
            { label: "Energy", emoji: "⚡", color: "#fb8c00" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              {item.emoji ? (
                <>
                  <span className="text-base">{item.emoji}</span>
                  <span className="text-xs" style={{ color: item.color, fontSize: "9px" }}>{item.label}</span>
                </>
              ) : (
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Page number */}
        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#c8b8d8", fontFamily: "Georgia, serif" }}>
          — 03 —
        </p>
      </div>
    </div>
  );
}
