"use client";

import { useRef } from "react";
import Image from "next/image";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollMotion } from "@/lib/useScrollMotion";

const DESKTOP = "(min-width: 1024px)";

// Each piece starts `from` pixels below its place and rises into it at its own
// speed, settles as the collage reaches the middle of the screen, then drifts
// up by `to` pixels on the way out. Bigger numbers move faster.
const SETTLED_AT = 0.3;
const WINDOW_SPEEDS = [
  { from: 160, to: -40 },
  { from: 420, to: -140 },
  { from: 300, to: -90 },
];
const CARD_SPEED = { from: 560, to: -160 };
const linear = (t) => t;

function useEntrance(progress, { from, to }) {
  return useTransform(progress, [0, SETTLED_AT, 1], [from, 0, to], { ease: [easeOut, linear] });
}

// Odd chapters are a mirror image of even ones.
const layouts = [
  {
    windows: [
      "lg:left-0 lg:top-[3%] lg:w-[52%]",
      "lg:right-[2%] lg:top-0 lg:w-[34%]",
      "lg:left-[12%] lg:top-[58%] lg:w-[40%]",
    ],
    card: "lg:right-0",
    header: "",
    route: "",
  },
  {
    windows: [
      "lg:right-0 lg:top-[3%] lg:w-[52%]",
      "lg:left-[2%] lg:top-0 lg:w-[34%]",
      "lg:right-[12%] lg:top-[58%] lg:w-[40%]",
    ],
    card: "lg:left-0",
    header: "lg:text-right",
    route: "-scale-x-100",
  },
];

// One stretch of the delivery route, drawn in as you scroll. It ends where the
// mirrored stretch starts, so the line runs on from chapter to chapter.
const ROUTE =
  "M1010 0 C1010 120 1290 200 1290 380 C1290 560 860 520 800 660 C740 800 300 720 230 900 C180 1040 430 1130 430 1300";

export default function WorkCollage({ project, number, windows, index }) {
  const ref = useRef(null);
  const moving = useScrollMotion(DESKTOP);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const routeLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const collageRef = useRef(null);
  const { scrollYProgress: collageProgress } = useScroll({ target: collageRef, offset: ["start end", "end start"] });
  const cardY = useEntrance(collageProgress, CARD_SPEED);
  const layout = layouts[index % layouts.length];

  return (
    <section ref={ref} id={project.slug} tabIndex={-1} className="relative px-4 py-16 outline-none lg:px-16 lg:py-28">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 1300"
        preserveAspectRatio="none"
        fill="none"
        className={`pointer-events-none absolute inset-0 hidden size-full lg:block ${layout.route}`}
      >
        <path d={ROUTE} stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" />
        <motion.path
          d={ROUTE}
          stroke="#EB6E00"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: moving ? routeLength : 1 }}
        />
      </svg>

      <header className={`relative z-10 text-[#F4F1EA] ${layout.header}`}>
        <p className="font-[Public_Sans] text-base tabular-nums text-white/75 lg:text-xl">
          {number} · {[project.industry, project.country].filter(Boolean).join(", ")}
        </p>
        <h2
          className="mt-2 text-[14vw] font-black leading-none tracking-tight lg:text-[9vw]"
          style={{ textShadow: "0.02em 0.02em 0 #EB6E00, 0.04em 0.04em 0 #3C2D80" }}
        >
          {project.name}
        </h2>
      </header>

      <div ref={collageRef} className="relative mt-10 flex flex-col gap-6 lg:mt-14 lg:block lg:h-[61vw]">
        {windows.map((item, windowIndex) => (
          <BrowserWindow
            key={item.label}
            {...item}
            speed={WINDOW_SPEEDS[windowIndex]}
            className={`lg:absolute ${layout.windows[windowIndex]}`}
            url={project.url}
            progress={collageProgress}
            moving={moving}
          />
        ))}

        <motion.div
          style={{ y: moving ? cardY : 0 }}
          className={`relative z-20 rounded-2xl border border-white/20 bg-[#1E1745]/95 p-6 text-[#F4F1EA] shadow-[8px_8px_0px_#EB6E00] lg:absolute lg:top-[50%] lg:w-[38%] lg:p-8 ${layout.card}`}
        >
          <p className="font-[Public_Sans] text-lg text-pretty lg:text-2xl">{project.description}</p>
          {project.highlights?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/40 px-3 py-1 font-[Public_Sans] text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/visit mt-6 inline-flex items-center gap-2 rounded-full bg-[#EB6E00] px-6 py-3 text-base font-bold text-black transition-transform duration-150 hover:-translate-y-0.5"
            >
              Visit {project.name}
              <ArrowUpRight className="size-5 transition-transform duration-200 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function BrowserWindow({ image, label, alt, speed, className, url, progress, moving }) {
  const y = useEntrance(progress, speed);
  const host = new URL(url).hostname.replace(/^www\./, "");

  return (
    <motion.figure
      style={{ y: moving ? y : 0 }}
      className={`relative z-10 overflow-hidden rounded-xl border border-white/25 bg-[#1E1745] shadow-[0_24px_60px_rgba(0,0,0,0.5)] will-change-transform ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-[#EB6E00]" />
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="ml-2 truncate font-[Public_Sans] text-xs text-white/70">
          {host} · {label}
        </span>
      </div>
      <Image
        src={image}
        alt={alt}
        sizes="(min-width: 1024px) 52vw, 100vw"
        placeholder="blur"
        className="h-auto w-full"
      />
    </motion.figure>
  );
}
