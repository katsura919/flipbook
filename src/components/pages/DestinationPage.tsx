
interface DestinationPageProps {
  image: string;
  location: string;
  country: string;
  date: string;
  title: string;
  description: string;
}

const DestinationPage = ({ image, location, country, date, title, description }: DestinationPageProps) => {
    return (
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {/* Hero image — top 65% */}
        <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: "65%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={location}
            className="w-full h-full object-cover"
          />
          {/* Gradient fade into bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, #1a1a1a 100%)",
            }}
          />
        </div>

        {/* Text area — bottom */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-7 pb-7"
          style={{ top: "55%" }}
        >
          {/* Location badge */}
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a84c">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#c9a84c" }}
            >
              {location}, {country}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl font-bold leading-tight"
            style={{ color: "#f5e6c8", fontFamily: "Georgia, serif" }}
          >
            {title}
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span style={{ color: "#6b7a5e", fontSize: "10px", letterSpacing: "0.15em" }}>
              {date}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: "#a0a0a0" }}>
            {description}
          </p>
        </div>
      </div>
    );
};

export default DestinationPage;
