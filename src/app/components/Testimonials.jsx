"use client";

import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FeedbackCard } from "./FeedbackCard";

const arrowClass =
  "bg-orange-500 hover:bg-orange-600 text-white p-3 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-orange-500";

export default function Testimonials({ testimonials }) {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // While an arrow-triggered scroll is animating, ignore scroll events so the
  // intermediate positions don't overwrite the index the arrow picked.
  const arrowScrolling = useRef(false);
  const arrowScrollTimer = useRef(null);

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

  useEffect(() => () => clearTimeout(arrowScrollTimer.current), []);

  return (
    <div className="px-4 lg:px-16 pb-[5rem] md:pb-[10rem]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start mb-12">
        <div className="bg-orange-500 text-black px-6 py-3 inline-flex items-center">
          <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
          <span className="font-bold text-2xl md:text-3xl lg:text-[42px]">
            <TextAnimate animation="slideLeft" by="character">
              CLIENT FEEDBACK
            </TextAnimate>
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => goToTestimonial(Math.max(0, currentIndex - 1))}
            aria-label="Previous testimonial"
            className={arrowClass}
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M24.5 14C24.5 14.2321 24.4078 14.4546 24.2437 14.6187C24.0796 14.7828 23.857 14.875 23.625 14.875H6.48699L12.869 21.2559C12.9503 21.3372 13.0148 21.4337 13.0588 21.54C13.1028 21.6462 13.1254 21.76 13.1254 21.875C13.1254 21.99 13.1028 22.1038 13.0588 22.21C13.0148 22.3162 12.9503 22.4128 12.869 22.4941C12.7877 22.5754 12.6912 22.6398 12.585 22.6838C12.4788 22.7278 12.3649 22.7505 12.25 22.7505C12.135 22.7505 12.0211 22.7278 11.9149 22.6838C11.8087 22.6398 11.7122 22.5754 11.6309 22.4941L3.75589 14.6191C3.67454 14.5378 3.61 14.4413 3.56597 14.3351C3.52193 14.2288 3.49927 14.115 3.49927 14C3.49927 13.885 3.52193 13.7711 3.56597 13.6649C3.61 13.5587 3.67454 13.4622 3.75589 13.3809L11.6309 5.50594C11.7951 5.34175 12.0178 5.24951 12.25 5.24951C12.4822 5.24951 12.7048 5.34175 12.869 5.50594C13.0332 5.67012 13.1254 5.8928 13.1254 6.125C13.1254 6.35719 13.0332 6.57987 12.869 6.74406L6.48699 13.125H23.625C23.857 13.125 24.0796 13.2172 24.2437 13.3813C24.4078 13.5454 24.5 13.7679 24.5 14Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              goToTestimonial(Math.min(testimonials.length - 1, currentIndex + 1))
            }
            aria-label="Next testimonial"
            className={arrowClass}
            disabled={currentIndex === testimonials.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M24.2441 14.6191L16.3691 22.4941C16.2049 22.6582 15.9822 22.7505 15.75 22.7505C15.5178 22.7505 15.2951 22.6582 15.1309 22.4941C14.9668 22.3299 14.8745 22.1072 14.8745 21.875C14.8745 21.6428 14.9668 21.4201 15.1309 21.2559L21.513 14.875H4.375C4.14294 14.875 3.92038 14.7828 3.75628 14.6187C3.59219 14.4546 3.5 14.2321 3.5 14C3.5 13.7679 3.59219 13.5454 3.75628 13.3813C3.92038 13.2172 4.14294 13.125 4.375 13.125H21.513L15.1309 6.74406C14.9668 6.57987 14.8745 6.35719 14.8745 6.125C14.8745 5.8928 14.9668 5.67012 15.1309 5.50594C15.2951 5.34175 15.5178 5.24951 15.75 5.24951C15.9822 5.24951 16.2049 5.34175 16.3691 5.50594L24.2441 13.3809C24.3254 13.4622 24.39 13.5587 24.434 13.6649C24.478 13.7711 24.5007 13.885 24.5007 14C24.5007 14.115 24.478 14.2288 24.434 14.3351C24.39 14.4413 24.3254 14.5378 24.2441 14.6191Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleTestimonialScroll}
        className="relative flex overflow-x-auto scrollbar-hide scroll-smooth"
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
    </div>
  );
}
