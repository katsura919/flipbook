import { PlaybookPage } from "@/types/playbook";

interface Props {
  page: PlaybookPage;
}

export default function WeeklySnapshotPage({ page }: Props) {
  // Parse the content blocks separated by double newlines
  const sections = page.content.split("\n\n").filter(Boolean);

  const icons: Record<string, string> = {
    "🥗": "#43a047",
    "😊": "#ab47bc",
    "🏃": "#1e88e5",
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      {/* Ruled lines background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 31px, #e8e0d0 32px)",
          backgroundPosition: "0 48px",
        }}
      />
      {/* Left margin */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "26px", width: "1px", background: "#f0a090", opacity: 0.4 }} />

      <div className="relative z-10 flex flex-col h-full px-8 py-6 gap-4">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#81c784" }}>Week in Review</p>
          <h2 className="text-xl font-bold" style={{ color: "#2e7d32", fontFamily: "Georgia, serif" }}>
            {page.title}
          </h2>
          <p className="text-xs" style={{ color: "#a5d6a7" }}>{page.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: "#e8d5a3" }} />

        {/* Snapshot cards */}
        <div className="flex flex-col gap-3 flex-1">
          {sections.map((section, i) => {
            const emoji = section.slice(0, 2);
            const color = icons[emoji] ?? "#555";
            const rest = section.slice(2).trim();
            const [label, ...body] = rest.split(": ");

            return (
              <div
                key={i}
                className="rounded-2xl p-3 flex gap-3 items-start"
                style={{ background: `${color}12`, border: `1px solid ${color}30` }}
              >
                <span className="text-xl leading-none mt-0.5">{emoji}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color }}>
                    {label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                    {body.join(": ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-4 h-px" style={{ background: "#a5d6a7" }} />
          <p className="text-xs italic" style={{ color: "#a5d6a7", fontFamily: "Georgia, serif" }}>
            Every small step is a victory ✨
          </p>
        </div>

        {/* Page number */}
        <p className="absolute bottom-4 right-6 text-xs" style={{ color: "#c8b89a", fontFamily: "Georgia, serif" }}>
          — 02 —
        </p>
      </div>
    </div>
  );
}
