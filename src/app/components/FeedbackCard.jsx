"use client";

import React from "react";

// Large quote card. The active card turns orange.
export const FeedbackCard = ({ name, title, company, testimonial, isActive = false }) => {
  return (
    <figure
      className={`group flex-none w-[85vw] md:w-[55vw] lg:w-[36vw] mr-5 md:mr-6 flex flex-col justify-between gap-8 rounded-md border-2 p-7 md:p-10 min-h-[22rem] md:min-h-[26rem] transition-colors duration-300 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] select-none ${
        isActive
          ? "bg-[#EB6E00] text-black border-black"
          : "bg-white text-black border-black dark:bg-black dark:text-white dark:border-white"
      }`}
    >
      <div>
        <span
          aria-hidden="true"
          className={`block text-[7rem] md:text-[9rem] leading-[0.7] font-bold transition-[color,transform] duration-300 group-hover:-rotate-6 ${
            isActive ? "text-black" : "text-[#EB6E00]"
          }`}
        >
          &ldquo;
        </span>
        <blockquote className="mt-2 text-lg md:text-2xl font-medium leading-snug tracking-tight text-pretty">
          {testimonial}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className={`grid place-items-center size-12 md:size-14 shrink-0 rounded-full text-lg md:text-xl font-bold border-2 ${
            isActive
              ? "bg-black text-[#EB6E00] border-black"
              : "bg-[#EB6E00] text-black border-black dark:border-white"
          }`}
        >
          {name?.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold text-base md:text-lg">{name}</span>
          <span className="block text-sm md:text-base font-[Public_Sans] opacity-80">
            {[title, company].filter(Boolean).join(", ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
};
