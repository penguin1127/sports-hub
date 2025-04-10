import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardSliderContainerProps {
  children: ReactNode;
}

const CardSliderContainer = ({ children }: CardSliderContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8; // 한 화면의 80% 정도 스크롤

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* 왼쪽 버튼 */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-gray-100 hidden md:block"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={24} />
      </button>

      {/* 슬라이더 영역 */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="flex gap-4 snap-x snap-mandatory w-max px-0">
          {children}
        </div>
      </div>

      {/* 오른쪽 버튼 */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-gray-100 hidden md:block"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CardSliderContainer;
