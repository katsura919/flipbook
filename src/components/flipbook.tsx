"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CoverPage from "./pages/CoverPage";
import InteractiveDestinationPage from "./pages/InteractiveDestinationPage";
import InteractiveJournalPage from "./pages/InteractiveJournalPage";

const TOTAL_PAGES = 6;

export default function FlipBook() {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = windowWidth < 768;
  const PAGE_W = isMobile ? Math.min(windowWidth - 32, 360) : 360;
  const PAGE_H = Math.round(PAGE_W * (540 / 360));

  // On desktop with showCover, the cover sits in the right half of the two-page
  // container. Shift the book left by half a page width to center it visually.
  // Back cover sits in the left half — shift right.
  const isOnCover = currentPage === 0;
  const isOnBackCover = currentPage === TOTAL_PAGES - 1;
  const bookOffset =
    !isMobile && isOnCover
      ? -PAGE_W / 2
      : !isMobile && isOnBackCover
      ? PAGE_W / 2
      : 0;

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
    <div className="min-h-screen bg-none   flex flex-col items-center justify-center py-8 px-4">
      <div className="flex flex-col items-center gap-6 w-full">

        {/* Book container */}
        <div className="flex items-center justify-center">
          {/* Offset wrapper for cover/back-cover centering */}
          <div
            style={{
              transform: `translateX(${bookOffset}px)`,
              transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="bg-none rounded-xl shadow-2xl p-4 md:p-8">
              <HTMLFlipBook
                ref={bookRef}
                width={PAGE_W}
                height={PAGE_H}
                size="fixed"
                startPage={0}
                minWidth={220}
                maxWidth={500}
                minHeight={300}
                maxHeight={700}
                drawShadow={true}
                flippingTime={800}
                usePortrait={isMobile}
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
                className="shadow-none"
              >
                <div><CoverPage /></div>

                {/* Spread 1 */}
                <div><InteractiveDestinationPage pageId="spread1-dest" /></div>
                <div><InteractiveJournalPage pageId="spread1-journal" /></div>

                {/* Spread 2 */}
                <div><InteractiveDestinationPage pageId="spread2-dest" /></div>
                <div><InteractiveJournalPage pageId="spread2-journal" /></div>

                {/* Back Cover */}
                <div style={{ backgroundColor: "#0f2027" }}>
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4 p-10"
                    style={{ background: "linear-gradient(160deg, #0f2027, #203a43, #2c5364)" }}
                  >
                    <p
                      className="text-amber-200 text-xl font-semibold text-center"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      The Journey Continues
                    </p>
                    <div className="w-16 h-px bg-amber-600" />
                    <p className="text-stone-400 text-xs uppercase tracking-widest">
                      Travel Journal
                    </p>
                  </div>
                </div>
              </HTMLFlipBook>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 items-center">
          <button
            onClick={handlePrevPage}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-all shadow-md text-sm"
          >
            <ChevronLeft size={16} />
            Prev
          </button>
          <span className="text-sm text-stone-600 w-28 text-center">
            Page {currentPage + 1} of {TOTAL_PAGES}
          </span>
          <button
            onClick={handleNextPage}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-all shadow-md text-sm"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
