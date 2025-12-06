"use client";

import React from "react";

export const FeedbackCard = ({
  name,
  title,
  company,
  testimonial,
  isActive = false,
}) => {
  return (
    <div
      className={`flex-none w-full h-[50vh] md:w-[45vw] md:h-[60vh] lg:w-[25vw] lg:h-[65vh] mr-4 transition-transform duration-300`}
    >
      {/* <div
        className={`bg-white h-2/3 border-4 ${
          isActive ? "border-[#ff6900]" : "border-black"
        }`}
      ></div> */}

      <div
        className={`${
          isActive ? "bg-[#ff6900] text-black" : "bg-black text-white"
        } min-h-80 p-12 flex flex-col gap-3 justify-between `}
      >
        <div className="text-sm text-center lg:text-base">
          <span className="font-semibold">{name}</span>
          <span className="mx-1">•</span>
          <span>{title}</span>
          <div className="text-sm text-gray-300 mt-1">{company}</div>
        </div>

        <p className="text-xs lg:text-base font-[Public_Sans] leading-relaxed overflow-hidden text-center">
          "{testimonial}"
        </p>
      </div>
    </div>
  );
};
