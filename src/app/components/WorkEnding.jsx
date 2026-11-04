"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollMotion } from "@/lib/useScrollMotion";
import DepthLayers, { END_DEPTH, START_DEPTH } from "./DepthLayers";
import Fox from "./Fox";
import GridFloor from "./GridFloor";
import Magnetic from "./Magnetic";
import ScrollLink from "./ScrollLink";

function Headline() {
  return (
    <>
      <span className="block">YOUR</span>
      <span className="block">PROJECT</span>
      <span className="block">COULD BE</span>
      <span className="block">NEXT!</span>
    </>
  );
}

// The big sign-off: the headline builds its depth, then PACO rises out of the
// grid floor with the fox on top.
export default function WorkEnding({ label, href }) {
  const ref = useRef(null);
  const moving = useScrollMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const depth = useTransform(scrollYProgress, [0, 0.7], [START_DEPTH, END_DEPTH]);
  const pacoY = useTransform(scrollYProgress, [0.5, 1], ["75%", "12%"]);
  const foxRotate = useTransform(scrollYProgress, [0.5, 1], [-14, 6]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-20 lg:pt-32">
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div className="relative text-[13vw] font-black leading-[0.92] tracking-tight lg:text-[9.5vw]">
          <DepthLayers depth={depth} moving={moving}>
            <Headline />
          </DepthLayers>
          <h2 className="relative text-[#F4F1EA]">
            <span className="sr-only">Your project could be next!</span>
            <span aria-hidden="true">
              <Headline />
            </span>
          </h2>
        </div>

        <p className="mt-10 max-w-xl font-[Public_Sans] text-lg text-white/85 text-pretty lg:mt-14 lg:text-2xl">
          Tell us what you need and we&apos;ll reply with a quote within 24 hours.
        </p>

        <div className="mt-8">
          <Magnetic>
            <ScrollLink
              href={href}
              className="group/quote inline-flex items-center gap-2 rounded-full bg-[#EB6E00] px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_rgba(235,110,0,0.45)] transition-transform duration-150 hover:-translate-y-0.5 lg:text-xl"
            >
              {label}
              <ArrowUpRight className="size-6 transition-transform duration-200 group-hover/quote:translate-x-0.5 group-hover/quote:-translate-y-0.5" />
            </ScrollLink>
          </Magnetic>
        </div>
      </div>

      <div className="relative mt-16 lg:mt-24">
        <GridFloor className="h-full" />
        <motion.div
          aria-hidden="true"
          style={{ y: moving ? pacoY : "12%" }}
          className="relative mx-auto w-fit will-change-transform"
        >
          <p className="bg-gradient-to-b from-[#7A66E0] to-[#2F2366] bg-clip-text text-[33vw] font-black leading-[0.8] tracking-tight text-transparent">
            PACO
          </p>
          <motion.div
            style={{ rotate: moving ? foxRotate : 6 }}
            className="absolute bottom-[86%] right-[7%] size-[15vw] origin-bottom"
          >
            <Fox className="size-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
