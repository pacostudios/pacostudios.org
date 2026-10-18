"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const ALL = "All";

// Filterable list of projects as large alternating rows.
export default function WorkGallery({ projects, serviceTitles }) {
  const [filter, setFilter] = useState(ALL);
  const industries = [ALL, ...new Set(projects.map((project) => project.industry))];
  const visible =
    filter === ALL ? projects : projects.filter((project) => project.industry === filter);

  return (
    <section className="px-4 lg:px-16 pb-20 md:pb-32">
      <div
        role="group"
        aria-label="Filter projects by industry"
        className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12"
      >
        {industries.map((industry) => {
          const active = filter === industry;
          const count =
            industry === ALL
              ? projects.length
              : projects.filter((project) => project.industry === industry).length;
          return (
            <button
              key={industry}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(industry)}
              className={`px-4 py-2 text-sm md:text-base font-medium border-2 border-black dark:border-white transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-[#EB6E00] text-black shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5"
                  : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {industry}
              <sup className="ml-1 text-xs tabular-nums">{count}</sup>
            </button>
          );
        })}
      </div>

      <div className="border-b-2 border-black dark:border-white">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              total={projects.length}
              flip={index % 2 === 1}
              serviceTitles={serviceTitles}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectRow({ project, index, total, flip, serviceTitles }) {
  const number = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20 border-t-2 border-black dark:border-white"
    >
      <ProjectImage project={project} className={flip ? "lg:order-2" : ""} />

      <div className="flex flex-col gap-5 text-black dark:text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm md:text-base font-[Public_Sans] tabular-nums text-gray-500 dark:text-gray-400">
            {number}
          </span>
          <span className="bg-black text-white dark:bg-white dark:text-black text-xs md:text-sm uppercase tracking-[0.15em] px-3 py-1">
            {project.industry}
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.9]">
          {project.name}
        </h2>

        {project.country && (
          <p className="flex items-center gap-1.5 text-base md:text-lg font-[Public_Sans]">
            <MapPin className="size-4 md:size-5 text-[#EB6E00]" />
            {project.country}
          </p>
        )}

        <p className="text-lg md:text-2xl font-[Public_Sans] text-pretty max-w-xl">
          {project.description}
        </p>

        {project.highlights?.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
              On the site
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="border-2 border-black dark:border-white rounded-full px-3 py-1 text-sm md:text-base font-[Public_Sans]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.services?.length > 0 && (
          <p className="text-sm md:text-base font-[Public_Sans]">
            <span className="text-gray-500 dark:text-gray-400">What we did: </span>
            {project.services.map((id) => serviceTitles[id]).filter(Boolean).join(" · ")}
          </p>
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/visit mt-2 inline-flex w-fit items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-5 py-3 text-base md:text-lg font-medium shadow-[4px_4px_0px_#EB6E00] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#EB6E00]"
          >
            Visit {project.name}
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function ProjectImage({ project, className }) {
  const frame = (
    <div className="relative aspect-[16/10] border-4 border-black dark:border-white overflow-hidden bg-black -rotate-1 shadow-[10px_10px_0px_#000000] dark:shadow-[10px_10px_0px_#FFFFFF] transition-all duration-300 group-hover:rotate-0 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[14px_14px_0px_#EB6E00]">
      <Image
        src={project.image}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        alt={`Screenshot of the ${project.name} website`}
        placeholder="blur"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      {project.url && (
        <span className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <span className="flex items-center gap-1 bg-[#EB6E00] text-white px-5 py-2.5 text-lg font-medium shadow-lg">
            Visit site
            <ArrowUpRight className="size-5" />
          </span>
        </span>
      )}
    </div>
  );

  if (!project.url) return <div className={className}>{frame}</div>;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit the ${project.name} website`}
      tabIndex={-1}
      className={`group block ${className}`}
    >
      {frame}
    </a>
  );
}
