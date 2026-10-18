"use client";

import { useCallback, useEffect, useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import Preloader2 from "./Preloader2";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [popFinished, setPopFinished] = useState(false);

  const finishLoading = useCallback(() => setLoading(false), []);

  // Mark pop animations as finished 1.4 seconds after they start
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => setPopFinished(true), 1400);
    return () => clearTimeout(timer);
  }, [loading]);

  const letterClass = loading
    ? "opacity-0"
    : `opacity-100 ${!popFinished ? "animate-pop-letter" : ""}`;

  return (
    <>
      {loading && <Preloader2 onComplete={finishLoading} />}
      <section id="home" className="relative">
        <div className="flex text-[23vw] md:text-[20vw] justify-center items-center font-semibold leading-none mt-10 md:mt-18">
          <p className={letterClass} style={{ animationDelay: "0ms" }}>
            P
          </p>
          <div
            className={`bg-[#EB6E00] px-4 md:px-7 lg:px-10 py-2 md:py-0 rounded-md h-[20vw] md:h-[15vw] lg:h-90 flex items-center shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] lg:shadow-[10px_10px_0px_#000000] lg:dark:shadow-[10px_10px_0px_#FFFFFF] cursor-pointer mx-1 md:mx-2 ${
              loading
                ? "opacity-0"
                : `opacity-100 ${!popFinished ? "animate-pop-badge" : "hover-wiggle"}`
            }`}
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-white dark:text-white p-1 leading-none rotate-[3deg]">A</p>
          </div>
          <p className={letterClass} style={{ animationDelay: "200ms" }}>
            C
          </p>
          <p className={letterClass} style={{ animationDelay: "300ms" }}>
            O
          </p>
        </div>
        <div className="absolute -bottom-8 lg:-bottom-8 right-0 left-0 flex justify-center sm:justify-end">
          <span className="text-lg lg:text-[3.3vw] font-medium text-black dark:text-white font-[Public_Sans] pr-0 sm:pr-5 lg:pr-[6rem] leading-1">
            <TextAnimate animation="slideLeft" by="character" delay={2.4} duration={1}>
              STUDIOS
            </TextAnimate>
          </span>
        </div>
      </section>
    </>
  );
}
