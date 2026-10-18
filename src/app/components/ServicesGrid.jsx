"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Box, Code2, MessageSquareText, PenTool, Smartphone } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { requestQuote } from "@/lib/quote";
import ScrollLink from "./ScrollLink";

const icons = {
  web: Code2,
  uxui: PenTool,
  "3d": Box,
  app: Smartphone,
  chatbot: MessageSquareText,
};

// Each card has its own colour so services are easy to tell apart at a glance
const themes = [
  { card: "bg-[#EB6E00] text-black", tag: "border-black", link: "text-black" },
  {
    card: "bg-black text-white dark:bg-white dark:text-black",
    tag: "border-white dark:border-black",
    link: "text-[#EB6E00]",
  },
  { card: "bg-[#FFE9D1] text-black", tag: "border-black", link: "text-black" },
  {
    card: "bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white",
    tag: "border-black dark:border-white",
    link: "text-[#EB6E00]",
  },
  {
    card: "bg-black text-white dark:bg-white dark:text-black",
    tag: "border-white dark:border-black",
    link: "text-[#EB6E00]",
  },
];

const MAX_TAGS = 4;

// All services visible at once as a grid of distinct cards. The first card
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
          const theme = themes[index % themes.length];
          const featured = index === 0;
          const related = projects.filter((project) => project.services?.includes(service.id));
          return (
            <ServiceCard
              key={service.id}
              service={service}
              number={index + 1}
              theme={theme}
              featured={featured}
              related={featured ? related : []}
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: (number - 1) * 0.06 }}
      className={`group relative flex flex-col overflow-hidden rounded-md p-6 md:p-8 min-h-[22rem] shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_#FFFFFF] transition-[transform,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000000] dark:hover:shadow-[10px_10px_0px_#FFFFFF] ${theme.card} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm md:text-base font-[Public_Sans] tabular-nums opacity-70">
          {String(number).padStart(2, "0")}
        </span>
        <Icon
          aria-hidden="true"
          strokeWidth={1.25}
          className="size-14 md:size-16 shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
        />
      </div>

      <div className={`mt-6 flex flex-col gap-4 ${featured ? "lg:max-w-[55%]" : ""}`}>
        <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]">
          {service.title}
        </h3>
        <p className="text-base md:text-lg font-[Public_Sans] text-pretty opacity-90">
          {service.summary}
        </p>
        <ul className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <li
              key={item}
              className={`border-2 ${theme.tag} rounded-full px-3 py-1 text-xs md:text-sm font-[Public_Sans]`}
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
                  "top-0 right-0 rotate-6 group-hover:rotate-[10deg] group-hover:translate-x-4",
                  "top-[18%] right-[6%] -rotate-3 group-hover:-rotate-6",
                  "top-[36%] right-[12%] rotate-1 group-hover:-translate-x-4 group-hover:rotate-[-2deg]",
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

      <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ScrollLink
          href="#contact-form"
          onClick={() => requestQuote(service.id)}
          className={`group/cta inline-flex items-center gap-2 text-base md:text-lg font-semibold underline underline-offset-4 decoration-2 ${theme.link}`}
        >
          Get a quote
          <ArrowRight className="size-5 transition-transform duration-200 group-hover/cta:translate-x-1" />
        </ScrollLink>
        {related.length > 0 && (
          <span className="text-sm md:text-base font-[Public_Sans] opacity-80">
            {related.length} sites delivered
          </span>
        )}
      </div>
    </motion.article>
  );
}
