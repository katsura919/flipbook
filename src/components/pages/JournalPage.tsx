
interface JournalPageProps {
  image: string;
  imageCaption: string;
  heading: string;
  body: string;
  tag: string;
}

const JournalPage = ({ image, imageCaption, heading, body, tag }: JournalPageProps) => {
    return (
      <div
        className="w-full h-full relative overflow-hidden flex flex-col"
        style={{ backgroundColor: "#fdf8f0" }}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 31px, #e2d9c8 32px)",
            backgroundPosition: "0 52px",
          }}
        />

        {/* Left margin line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: "28px", width: "1px", background: "#e8a87c", opacity: 0.5 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-9 py-7 gap-4">

          {/* Tag */}
          <span
            className="self-start text-xs uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "#e8d5a3", color: "#7a5c2e", fontSize: "9px" }}
          >
            {tag}
          </span>

          {/* Polaroid photo */}
          <div
            className="self-center rotate-1 shadow-lg"
            style={{
              background: "#fff",
              padding: "6px 6px 28px 6px",
              width: "160px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageCaption}
              className="w-full object-cover"
              style={{ height: "110px" }}
            />
            <p
              className="text-center mt-1"
              style={{ fontFamily: "Georgia, serif", fontSize: "9px", color: "#888", letterSpacing: "0.05em" }}
            >
              {imageCaption}
            </p>
          </div>

          {/* Heading */}
          <h3
            className="text-lg font-bold"
            style={{ color: "#3d2b1f", fontFamily: "Georgia, serif" }}
          >
            {heading}
          </h3>

          {/* Body text */}
          <p
            className="text-sm leading-8 flex-1"
            style={{ color: "#5a4a3a", fontFamily: "Georgia, serif" }}
          >
            {body}
          </p>

          {/* Page number */}
          <div className="flex justify-end">
            <span style={{ color: "#b0a090", fontSize: "10px", fontFamily: "Georgia, serif" }}>
              — 01 —
            </span>
          </div>
        </div>
      </div>
    );
};

export default JournalPage;
