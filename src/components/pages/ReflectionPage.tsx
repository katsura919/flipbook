import { PlaybookPage } from "@/types/playbook";

interface Props {
  page: PlaybookPage;
}

export default function ReflectionPage({ page }: Props) {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(160deg, #fff8e1, #fff3e0, #fce4ec)" }}
    >
      {/* Soft texture dots */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffcc80 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-8 py-7 gap-4">
        {/* Header */}
        <div className="text-center">
          <span className="text-3xl">🪞</span>
          <h2 className="text-xl font-bold mt-1" style={{ color: "#bf360c", fontFamily: "Georgia, serif" }}>
            {page.title}
          </h2>
          <p className="text-xs" style={{ color: "#ff8a65" }}>{page.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 mx-auto w-32">
          <div className="flex-1 h-px" style={{ background: "rgba(191,54,12,0.25)" }} />
          <span style={{ color: "#ff8a65", fontSize: "10px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "rgba(191,54,12,0.25)" }} />
        </div>

        {/* Intro text */}
        <p className="text-xs text-center italic" style={{ color: "#8d6e63", fontFamily: "Georgia, serif" }}>
          {page.content}
        </p>

        {/* Reflection prompts */}
        <div className="flex flex-col gap-2 flex-1">
          {page.prompts.map((prompt, i) => (
            <div
              key={i}
              className="rounded-xl px-3 py-2 flex items-start gap-2"
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,138,101,0.2)" }}
            >
              <span
                className="text-xs font-bold mt-0.5 shrink-0"
                style={{ color: "#ff8a65", minWidth: "16px" }}
              >
                {i + 1}.
              </span>
              <p className="text-xs leading-relaxed" style={{ color: "#5d4037" }}>{prompt}</p>
            </div>
          ))}
        </div>

        {/* Journal space hint */}
        <div
          className="rounded-xl px-3 py-2 flex items-center gap-2"
          style={{ background: "rgba(255,138,101,0.08)", border: "1px dashed rgba(255,138,101,0.3)" }}
        >
          <span className="text-sm">✏️</span>
          <p className="text-xs italic" style={{ color: "#a1887f" }}>Write your thoughts below...</p>
        </div>

        {/* Page number */}
        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#d7b8a0", fontFamily: "Georgia, serif" }}>
          — 04 —
        </p>
      </div>
    </div>
  );
}
