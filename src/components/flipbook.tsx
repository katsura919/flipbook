"use client";

import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CoverPage from "./pages/CoverPage";
import DestinationPage from "./pages/DestinationPage";
import JournalPage from "./pages/JournalPage";

const TOTAL_PAGES = 6;

export default function FlipBook() {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };

  const handleNextPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-200 to-stone-300 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-6">
        {/* Flipbook */}
        <div className="flex items-center justify-center bg-stone-100 rounded-2xl shadow-2xl p-8">
          <HTMLFlipBook
            ref={bookRef}
            width={360}
            height={540}
            size="fixed"
            startPage={0}
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            drawShadow={true}
            flippingTime={800}
            usePortrait={false}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            onFlip={handleFlip}
            style={{}}
            className="shadow-none  "
          >
            <div><CoverPage /></div>

            {/* Spread 1 */}
            <div>
              <DestinationPage
                image="https://picsum.photos/seed/paris/360/540"
                location="Paris"
                country="France"
                date="June 2024"
                title="City of Lights"
                description="Wandering cobblestone streets, sipping espresso by the Seine, and watching the Eiffel Tower shimmer at dusk."
              />
            </div>
            <div>
              <JournalPage
                image="https://picsum.photos/seed/eiffel/360/240"
                imageCaption="Eiffel Tower at dusk"
                heading="First Impressions"
                body="Nothing prepares you for the moment Paris reveals itself — the grand boulevards, the smell of fresh bread, the hum of a city that has always known it is beautiful."
                tag="Day 1"
              />
            </div>

            {/* Spread 2 */}
            <div>
              <DestinationPage
                image="https://picsum.photos/seed/santorini/360/540"
                location="Santorini"
                country="Greece"
                date="August 2024"
                title="Where the Sea Meets the Sky"
                description="White-washed walls glowing in the afternoon heat, and a horizon that stretches into forever."
              />
            </div>
            <div>
              <JournalPage
                image="https://picsum.photos/seed/greek-coast/360/240"
                imageCaption="Oia at golden hour"
                heading="Chasing Sunsets"
                body="Every evening the whole village gathers at the cliffside. No phones, no noise — just the slow descent of the sun into the Aegean and a collective exhale."
                tag="Day 4"
              />
            </div>

            {/* Back Cover */}
            <div style={{ backgroundColor: "#0f2027" }}>
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-4 p-10"
                style={{ background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)" }}
              >
                <p className="text-amber-200 text-xl font-semibold text-center" style={{ fontFamily: "Georgia, serif" }}>
                  The Journey Continues
                </p>
                <div className="w-16 h-px bg-amber-600" />
                <p className="text-stone-400 text-xs uppercase tracking-widest">Travel Journal</p>
              </div>
            </div>
          </HTMLFlipBook>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 items-center">
          <button
            onClick={handlePrevPage}
            className="flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-all shadow-md"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <span className="text-sm text-stone-600">
            Page {currentPage + 1} of {TOTAL_PAGES}
          </span>
          <button
            onClick={handleNextPage}
            className="flex items-center gap-2 px-4 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-all shadow-md"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
