"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import ProjectButton from "./ProjectButton";
import ScrollLink from "./ScrollLink";
import { useCursorTilt } from "@/lib/useCursorTilt";

// Set by the script in the layout's <head> on repeat visits this session
const subscribeNever = () => () => {};
const introSeen = () =>
  document.documentElement.hasAttribute("data-intro-seen");

// The hero doubles as the loading screen: PACO draws itself in place with
// the calm intro animations in globals.css (intro-*), then the rest rises in.
export default function Hero({ cta, locations }) {
  const tilt = useCursorTilt();
  const skipIntro = useSyncExternalStore(
    subscribeNever,
    introSeen,
    () => false,
  );

  return (
    <section
      id="home"
      className="relative px-4 lg:px-16 pb-10 md:pb-16"
      {...tilt.handlers}
    >
      <div className="relative">
        <div className="relative flex text-[23vw] md:text-[20vw] justify-center items-center font-semibold leading-none pt-10 md:pt-18">
          <p className="intro-ink" style={{ animationDelay: "0.4s" }}>
            P
          </p>
          {/* The tilt lives on a wrapper so it doesn't fight the CSS animations */}
          <motion.div style={tilt.style} className="mx-1 md:mx-2">
            <div className="intro-tile hover-wiggle bg-[#EB6E00] px-4 md:px-7 lg:px-10 py-2 md:py-0 rounded-md h-[20vw] md:h-[15vw] lg:h-[25vw] flex items-center shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] lg:shadow-[10px_10px_0px_#000000] lg:dark:shadow-[10px_10px_0px_#FFFFFF] cursor-pointer">
              <p
                className="intro-ink text-white dark:text-white p-1 leading-none rotate-[3deg]"
                style={{ animationDelay: "0.8s" }}
              >
                A
              </p>
            </div>
          </motion.div>
          <p className="intro-ink" style={{ animationDelay: "0.6s" }}>
            C
          </p>
          <p className="intro-ink" style={{ animationDelay: "0.8s" }}>
            O
          </p>
          {/* Loading line: draws under PACO, then fades away */}
          <span
            aria-hidden="true"
            className="intro-line pointer-events-none absolute -bottom-3 left-[12%] right-[12%] h-0.5 bg-black/25 dark:bg-white/25"
          />
        </div>
        <div className="absolute -bottom-8 lg:-bottom-8 right-0 left-0 flex justify-center sm:justify-end">
          <span className="text-lg lg:text-[3.3vw] font-medium text-black dark:text-white font-[Public_Sans] pr-0 sm:pr-5 lg:pr-[6rem] leading-1">
            <TextAnimate
              animation="slideLeft"
              by="character"
              delay={skipIntro ? 0 : 1.2}
              duration={1}
            >
              STUDIOS
            </TextAnimate>
          </span>
        </div>
      </div>

      <div className="intro-rise mt-20 md:mt-24 lg:mt-28 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8 xl:gap-16 items-end">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl md:text-3xl lg:text-[40px] font-medium leading-tight tracking-tight text-black dark:text-white text-balance max-w-3xl">
            Websites, brands and 3D experiences for businesses in{" "}
            <span className="text-[#EB6E00]">Australia</span> and{" "}
            <span className="text-[#EB6E00]">India</span>.
          </h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ProjectButton
              title={cta.label}
              href={cta.href}
              className="bg-[#EB6E00]"
            />
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
            One team, two countries
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-black dark:text-white">
            {locations.map((country) => (
              <div key={country} className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="relative inline-flex size-2 rounded-full bg-[#EB6E00]" />
                </span>
                <span className="text-base md:text-lg font-medium">
                  {country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
