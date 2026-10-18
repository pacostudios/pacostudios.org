"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FeedbackCard } from "./FeedbackCard";

const arrowClass =
  "grid place-items-center size-12 md:size-14 rounded-md border-2 border-black bg-[#EB6E00] text-black shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] cursor-pointer transition-[translate,box-shadow,opacity] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

export default function Testimonials({ testimonials }) {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  // While an arrow-triggered scroll is animating, ignore scroll events so the
  // intermediate positions don't overwrite the index the arrow picked.
  const arrowScrolling = useRef(false);
  const arrowScrollTimer = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const goToTestimonial = (index) => {
    const container = scrollContainerRef.current;
    const card = container?.children[index];
    if (!card) return;
    setCurrentIndex(index);
    arrowScrolling.current = true;
    clearTimeout(arrowScrollTimer.current);
    arrowScrollTimer.current = setTimeout(() => {
      arrowScrolling.current = false;
    }, 600);
    container.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const handleTestimonialScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || arrowScrolling.current) return;
    const { scrollLeft, scrollWidth, clientWidth, children } = container;
    if (scrollLeft + clientWidth >= scrollWidth - 2) {
      setCurrentIndex(children.length - 1);
      return;
    }
    let nearest = 0;
    for (let i = 1; i < children.length; i++) {
      if (
        Math.abs(children[i].offsetLeft - scrollLeft) <
        Math.abs(children[nearest].offsetLeft - scrollLeft)
      ) {
        nearest = i;
      }
    }
    setCurrentIndex(nearest);
  };

  // Click-and-drag to scroll with a mouse (touch already scrolls natively)
  const handlePointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const container = scrollContainerRef.current;
    drag.current = { active: true, startX: e.clientX, startScroll: container.scrollLeft };
    setDragging(true);
  };
  const handlePointerMove = (e) => {
    if (!drag.current.active) return;
    scrollContainerRef.current.scrollLeft =
      drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  useEffect(() => () => clearTimeout(arrowScrollTimer.current), []);

  return (
    <section className="px-4 lg:px-16 pb-[5rem] md:pb-[9rem]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between md:items-end mb-10 md:mb-14">
        <div className="flex flex-col gap-4">
          <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px] text-black">
            <TextAnimate animation="slideLeft" by="character">
              • CLIENT FEEDBACK
            </TextAnimate>
          </div>
          <p className="text-lg md:text-2xl font-[Public_Sans] text-black dark:text-white">
            What our clients say after launch.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-base md:text-lg font-[Public_Sans] tabular-nums text-black dark:text-white">
            {String(currentIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goToTestimonial(Math.max(0, currentIndex - 1))}
            aria-label="Previous testimonial"
            className={arrowClass}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="size-6" strokeWidth={2.25} />
          </button>
          <button
            onClick={() => goToTestimonial(Math.min(testimonials.length - 1, currentIndex + 1))}
            aria-label="Next testimonial"
            className={arrowClass}
            disabled={currentIndex === testimonials.length - 1}
          >
            <ArrowRight className="size-6" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleTestimonialScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`relative flex overflow-x-auto scrollbar-hide pb-3 pr-2 ${
          dragging ? "cursor-grabbing" : "cursor-grab scroll-smooth"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={index}
            name={testimonial?.name}
            title={testimonial?.title}
            company={testimonial?.company}
            testimonial={testimonial?.testimonial}
            isActive={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
}
