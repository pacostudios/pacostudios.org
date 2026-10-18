"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Box, Code2, MessageSquareText, PenTool, Smartphone } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { requestQuote } from "@/lib/quote";
import { useCursorTilt } from "@/lib/useCursorTilt";
import ScrollLink from "./ScrollLink";

const icons = {
  web: Code2,
  uxui: PenTool,
  "3d": Box,
  app: Smartphone,
  chatbot: MessageSquareText,
};

const orange = {
  card: "bg-[#EB6E00] text-black",
  tag: "border-black",
  iconBg: "bg-white",
  link: "text-black",
  glow: "rgba(255, 255, 255, 0.45)",
};
const white = {
  card: "bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white",
  tag: "border-black dark:border-white",
  iconBg: "bg-[#EB6E00]",
  link: "text-[#EB6E00]",
  glow: "rgba(235, 110, 0, 0.22)",
};
// Alternates so neighbouring cards never share a colour:
// row 1 = Web (orange, wide) + UX/UI (white); row 2 = 3D, App, Chatbots
const themes = [orange, white, white, orange, white];

const MAX_TAGS = 4;

// All services visible at once as a grid of cards. The first card
// (Web Development) is larger and shows real project screenshots.
export default function ServicesGrid({ services, projects }) {
  return (
    <section id="services" className="px-4 lg:px-16 py-[5rem] lg:py-[8rem]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-14">
        <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px] text-black">
          <TextAnimate animation="slideLeft" by="character">
            • WHAT WE DO
          </TextAnimate>
        </div>
        <p className="text-lg lg:text-2xl font-[Public_Sans] max-w-xl text-black dark:text-white text-pretty">
          From first sketch to launch and beyond. Pick what you need, or let us
          put the whole thing together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
        {services.map((service, index) => {
          const featured = index === 0;
          return (
            <ServiceCard
              key={service.id}
              service={service}
              number={index + 1}
              theme={themes[index % themes.length]}
              featured={featured}
              related={
                featured
                  ? projects.filter((project) => project.services?.includes(service.id))
                  : []
              }
              className={featured ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2"}
            />
          );
        })}
      </div>
    </section>
  );
}

function ServiceCard({ service, number, theme, featured, related, className }) {
  const Icon = icons[service.id] ?? Code2;
  const tags = service.deliverables.slice(0, MAX_TAGS);
  const tilt = useCursorTilt(featured ? 4 : 7);
  const cardRef = useRef(null);

  // Spotlight follows the cursor via CSS variables (no React re-render)
  const handlePointerMove = (e) => {
    tilt.handlers.onPointerMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    cardRef.current?.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    cardRef.current?.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: (number - 1) * 0.06 }}
        style={{ rotateX: tilt.style.rotateX, rotateY: tilt.style.rotateY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={tilt.handlers.onPointerLeave}
        className={`group relative flex h-full flex-col overflow-hidden rounded-md p-6 md:p-8 min-h-[22rem] shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000000] dark:hover:shadow-[12px_12px_0px_#FFFFFF] ${theme.card}`}
      >
        {/* Cursor spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${theme.glow}, transparent 70%)`,
          }}
        />

        {/* Oversized outline number that slides in on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-2 text-[9rem] md:text-[11rem] font-bold leading-none tabular-nums text-transparent [-webkit-text-stroke:2px_currentColor] opacity-[0.08] translate-y-6 group-hover:translate-y-0 group-hover:opacity-[0.16] transition-all duration-500"
        >
          {String(number).padStart(2, "0")}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          <span className="text-sm md:text-base font-[Public_Sans] tabular-nums opacity-70">
            {String(number).padStart(2, "0")}
          </span>
          <span className="relative grid place-items-center size-16 md:size-20">
            {/* Disc that pops in behind the icon */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme.iconBg}`}
            />
            <Icon
              aria-hidden="true"
              strokeWidth={1.25}
              className="relative size-10 md:size-12 transition-transform duration-500 group-hover:rotate-[-12deg]"
            />
          </span>
        </div>

        <div className={`relative mt-6 flex flex-col gap-4 ${featured ? "lg:max-w-[55%]" : ""}`}>
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]">
            {service.title}
          </h3>
          <p className="text-base md:text-lg font-[Public_Sans] text-pretty opacity-90">
            {service.summary}
          </p>
          <ul className="flex flex-wrap gap-2">
            {tags.map((item, i) => (
              <li
                key={item}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={`border-2 ${theme.tag} rounded-full px-3 py-1 text-xs md:text-sm font-[Public_Sans] transition-transform duration-300 group-hover:-translate-y-1`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Fan of real project screenshots on the featured card */}
        {related.length > 0 && (
          <div
            aria-hidden="true"
            className="hidden lg:block absolute right-8 top-24 w-[38%] h-[60%] pointer-events-none"
          >
            {related.slice(0, 3).map((project, i) => (
              <div
                key={project.slug}
                className={`absolute w-full aspect-[16/10] border-4 border-black bg-black overflow-hidden shadow-[6px_6px_0px_#000000] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  [
                    "top-0 right-0 rotate-6 group-hover:rotate-[12deg] group-hover:translate-x-6 group-hover:-translate-y-2",
                    "top-[18%] right-[6%] -rotate-3 group-hover:-rotate-6 group-hover:-translate-y-1",
                    "top-[36%] right-[12%] rotate-1 group-hover:-translate-x-6 group-hover:translate-y-2 group-hover:rotate-[-4deg]",
                  ][i]
                }`}
              >
                <Image
                  src={project.image}
                  fill
                  sizes="(min-width: 1024px) 25vw, 0px"
                  alt=""
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        )}

        <div className="relative mt-auto pt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ScrollLink
            href="#contact-form"
            onClick={() => requestQuote(service.id)}
            className={`group/cta inline-flex items-center gap-2 text-base md:text-lg font-semibold underline underline-offset-4 decoration-2 ${theme.link}`}
          >
            Get a quote
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover/cta:translate-x-2" />
          </ScrollLink>
          {related.length > 0 && (
            <span className="text-sm md:text-base font-[Public_Sans] opacity-80">
              {related.length} sites delivered
            </span>
          )}
        </div>
      </motion.article>
    </div>
  );
}
