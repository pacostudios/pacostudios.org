"use client";

import { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import Preloader2 from "./Preloader2";
import ProjectButton from "./ProjectButton";
import ScrollLink from "./ScrollLink";
import LiveClocks from "./LiveClocks";

const MAX_TILT_DEG = 18;
const springConfig = { stiffness: 150, damping: 15, mass: 0.4 };

export default function Hero({ cta, locations }) {
  const [loading, setLoading] = useState(true);
  const [popFinished, setPopFinished] = useState(false);
  const reduceMotion = useReducedMotion();

  const finishLoading = useCallback(() => setLoading(false), []);

  // Mark pop animations as finished 1.4 seconds after they start
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => setPopFinished(true), 1400);
    return () => clearTimeout(timer);
  }, [loading]);

  // Pointer position across the hero, from -0.5 to 0.5 on each axis
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]),
    springConfig
  );

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const letterClass = loading
    ? "opacity-0"
    : `opacity-100 ${!popFinished ? "animate-pop-letter" : ""}`;

  return (
    <>
      {loading && <Preloader2 onComplete={finishLoading} />}
      <section
        id="home"
        className="relative px-4 lg:px-16 pb-10 md:pb-16"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="relative">
          <div className="flex text-[23vw] md:text-[20vw] justify-center items-center font-semibold leading-none pt-10 md:pt-18">
            <p className={letterClass} style={{ animationDelay: "0ms" }}>
              P
            </p>
            {/* The tilt lives on a wrapper so it doesn't fight the CSS pop/wiggle animations */}
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 900 }}
              className="mx-1 md:mx-2"
            >
              <div
                className={`bg-[#EB6E00] px-4 md:px-7 lg:px-10 py-2 md:py-0 rounded-md h-[20vw] md:h-[15vw] lg:h-[25vw] flex items-center shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] lg:shadow-[10px_10px_0px_#000000] lg:dark:shadow-[10px_10px_0px_#FFFFFF] cursor-pointer ${
                  loading
                    ? "opacity-0"
                    : `opacity-100 ${!popFinished ? "animate-pop-badge" : "hover-wiggle"}`
                }`}
                style={{ animationDelay: "100ms" }}
              >
                <p className="text-white dark:text-white p-1 leading-none rotate-[3deg]">A</p>
              </div>
            </motion.div>
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
        </div>

        <div
          className={`mt-20 md:mt-24 lg:mt-28 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8 xl:gap-16 items-end transition-all duration-700 ${
            loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{ transitionDelay: loading ? "0ms" : "900ms" }}
        >
          <div className="flex flex-col gap-6">
            <p className="text-xl md:text-3xl lg:text-[40px] font-medium leading-tight tracking-tight text-black dark:text-white text-balance max-w-3xl">
              Websites, brands and 3D experiences for businesses in{" "}
              <span className="text-[#EB6E00]">Australia</span> and{" "}
              <span className="text-[#EB6E00]">India</span>.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ProjectButton title={cta.label} href={cta.href} className="bg-[#EB6E00]" />
              <ScrollLink
                href="#work"
                className="text-lg font-medium underline underline-offset-8 decoration-2 decoration-[#EB6E00] hover:text-[#EB6E00] transition-colors duration-200"
              >
                See our work
              </ScrollLink>
            </div>
          </div>

          <div className="xl:justify-self-end flex flex-col gap-3 xl:items-end">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              One team, two time zones
            </p>
            <LiveClocks locations={locations} className="text-black dark:text-white" />
          </div>
        </div>
      </section>
    </>
  );
}
