"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursorTilt } from "@/lib/useCursorTilt";
import CountUp from "./CountUp";

// "W[O]RK" in the same style as the PACO hero, with the O on a tilting tile.
export default function WorkHero({ stats }) {
  const [popFinished, setPopFinished] = useState(false);
  const tilt = useCursorTilt();

  useEffect(() => {
    const timer = setTimeout(() => setPopFinished(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const letterClass = popFinished ? "" : "animate-pop-letter opacity-0";

  return (
    <section className="px-4 lg:px-16 pb-12 md:pb-20" {...tilt.handlers}>
      <h1 className="sr-only">Our work</h1>
      <div
        aria-hidden="true"
        className="flex text-[23vw] md:text-[20vw] justify-center items-center font-semibold leading-none pt-10 md:pt-16 text-black dark:text-white"
      >
        <p className={letterClass} style={{ animationDelay: "0ms" }}>
          W
        </p>
        <motion.div style={tilt.style} className="mx-1 md:mx-2">
          <div
            className={`bg-[#EB6E00] px-3 md:px-6 lg:px-8 rounded-md h-[20vw] md:h-[15vw] lg:h-[25vw] flex items-center shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] lg:shadow-[10px_10px_0px_#000000] lg:dark:shadow-[10px_10px_0px_#FFFFFF] cursor-pointer ${
              popFinished ? "hover-wiggle" : "animate-pop-badge opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-white leading-none rotate-[3deg]">O</p>
          </div>
        </motion.div>
        <p className={letterClass} style={{ animationDelay: "200ms" }}>
          R
        </p>
        <p className={letterClass} style={{ animationDelay: "300ms" }}>
          K
        </p>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-10 xl:gap-16 items-end">
        <p className="text-xl md:text-3xl lg:text-[40px] font-medium leading-tight tracking-tight text-black dark:text-white text-balance max-w-3xl">
          Websites we&apos;ve designed and built for{" "}
          <span className="text-[#EB6E00]">nonprofits</span>,{" "}
          <span className="text-[#EB6E00]">logistics</span>,{" "}
          <span className="text-[#EB6E00]">health</span> and{" "}
          <span className="text-[#EB6E00]">retail</span> businesses.
        </p>

        <dl className="grid grid-cols-3 border-2 border-black dark:border-white">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-4 md:p-6 ${index > 0 ? "border-l-2 border-black dark:border-white" : ""}`}
            >
              <dt className="text-xs md:text-sm uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
                {stat.label}
              </dt>
              <dd className="text-4xl md:text-6xl font-semibold tabular-nums text-black dark:text-white mt-1">
                <CountUp value={stat.value} pad={2} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
