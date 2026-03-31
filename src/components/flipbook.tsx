"use client";

import HTMLFlipBook from "react-pageflip";

export default function FlipBook() {
  const pages = [
    { title: "Cover", body: "My Digital Book" },
    { title: "Page 1", body: "Once upon a time..." },
    { title: "Page 2", body: "The story continues..." },
    { title: "Page 3", body: "Almost there..." },
    { title: "Back Cover", body: "The End" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-zinc-100 dark:bg-zinc-950">
      <HTMLFlipBook
        width={360}
        height={520}
        size="fixed"
        showCover
        className="shadow-2xl"
      >
        {pages.map((p, i) => (
          <div
            key={i}
            className="bg-white text-zinc-900 p-6 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800"
          >
            <h2 className="text-xl font-semibold mb-3">{p.title}</h2>
            <p className="text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
