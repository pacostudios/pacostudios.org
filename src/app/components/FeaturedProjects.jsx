"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Eye, MapPin } from "lucide-react";
import ProjectPreview, { hostname } from "./ProjectPreview";

// Side-by-side panels from this width up; stacked panels below it
const WIDE_QUERY = "(min-width: 768px)";
// Flex weight of the open panel against 1 for each closed one
const OPEN_GROW = 8;
// Panels alternate orange and white; the section background takes the
// opposite colour so the open panel always stands out
const THEMES = [
  { panel: "bg-[#EB6E00] text-white", section: "#FFE9D1", heading: "text-black" },
  { panel: "bg-white text-black", section: "#EB6E00", heading: "text-white" },
];
const EASE = [0.65, 0, 0.35, 1];

const subscribeToQuery = (callback) => {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

// Home page projects as an expanding accordion: hovering (or tapping) a
// panel opens it to show the site, and its name swings from vertical to
// horizontal. Clicking an open panel loads the live site in a preview window.
export default function FeaturedProjects({ projects, moreProjects = [], moreHref }) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const wide = useSyncExternalStore(
    subscribeToQuery,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true
  );
  const closePreview = useCallback(() => setSelected(null), []);

  const panels = [
    ...projects.map((project) => ({ type: "project", key: project.slug, project })),
    ...(moreHref ? [{ type: "more", key: "more" }] : []),
  ];
  const theme = THEMES[active % THEMES.length];

  return (
    <section
      id="work"
      className="px-4 lg:px-16 py-[5rem] lg:py-[7rem] transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: theme.section }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
        <div>
          <h2
            className={`text-[12vw] md:text-[7vw] lg:text-[5vw] font-semibold leading-[0.9] tracking-tight transition-colors duration-700 ${theme.heading}`}
          >
            FEATURED WORK
          </h2>
          <p className="mt-3 text-black text-lg md:text-xl font-[Public_Sans] text-pretty">
            {wide
              ? "Hover a project to open it. Click to see the live site."
              : "Tap a project to open it, then tap again to see the live site."}
          </p>
        </div>
        {moreHref && (
          <Link
            href={moreHref}
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-black text-lg md:text-xl font-semibold underline underline-offset-8 decoration-2 hover:opacity-70 transition-opacity duration-200"
          >
            See more projects
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:h-[min(70vh,640px)] md:min-h-[480px]">
        {panels.map((panel, index) => (
          <Panel
            key={panel.key}
            index={index}
            open={active === index}
            wide={wide}
            themeClass={THEMES[index % THEMES.length].panel}
            onActivate={() => setActive(index)}
          >
            {panel.type === "project" ? (
              <ProjectContent
                project={panel.project}
                index={index}
                open={active === index}
                wide={wide}
                onOpen={() => setSelected(panel.project)}
              />
            ) : (
              <MoreContent
                href={moreHref}
                projects={moreProjects}
                open={active === index}
                wide={wide}
              />
            )}
          </Panel>
        ))}
      </div>

      <PreviewPortal project={selected} onClose={closePreview} />
    </section>
  );
}

// The preview renders into document.body, so wait until the page is mounted
function PreviewPortal(props) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  return mounted ? <ProjectPreview {...props} /> : null;
}

// One accordion panel. Wide screens share the row by flex weight; narrow
// screens stack the panels and the open one grows taller.
function Panel({ index, open, wide, themeClass, onActivate, children }) {
  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
      onFocusCapture={onActivate}
      className={`group relative overflow-hidden rounded-md border-4 border-black ${themeClass} transition-[flex-grow,height,box-shadow] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
        open ? "shadow-[10px_10px_0px_#000000]" : "shadow-[6px_6px_0px_#000000]"
      } ${wide ? "min-w-0 basis-0" : open ? "h-[calc(56vw+220px)]" : "h-20 shrink-0"}`}
      style={wide ? { flexGrow: open ? OPEN_GROW : 1 } : undefined}
    >
      {/* Closed panels are one big button that opens them */}
      {!open && (
        <button
          type="button"
          onClick={onActivate}
          aria-label={`Show project ${index + 1}`}
          className="absolute inset-0 z-20 cursor-pointer"
        />
      )}
      {children}
    </div>
  );
}

// Name that sits vertically in a closed panel and swings round to
// horizontal as the panel opens
function SwingTitle({ open, wide, children, className = "" }) {
  return (
    <motion.span
      layout="position"
      initial={false}
      animate={{ rotate: open || !wide ? 0 : -90, scale: open ? 1 : wide ? 0.42 : 0.5 }}
      transition={{ duration: 0.7, ease: EASE, layout: { duration: 0.7, ease: EASE } }}
      className={`block whitespace-nowrap font-semibold leading-none tracking-tight ${
        open || wide ? "origin-center" : "origin-left"
      } ${className}`}
    >
      {children}
    </motion.span>
  );
}

function ProjectContent({ project, index, open, wide, onOpen }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <>
      {/* Screenshot, shown once the panel is open */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          open ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center border-b-4 border-black bg-[#FFE9D1] py-2 pl-14 pr-3 md:pl-16 md:pr-4 text-black">
            <span className="flex-1 truncate rounded-full border-2 border-black bg-white px-3 py-0.5 text-xs md:text-sm font-[Public_Sans]">
              {hostname(project.url)}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpen}
            tabIndex={open ? 0 : -1}
            aria-label={`Open a live preview of ${project.name}`}
            className="group/shot relative flex-1 cursor-pointer overflow-hidden bg-black"
          >
            <Image
              src={project.image}
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              alt={`Screenshot of the ${project.name} website`}
              placeholder="blur"
              className="object-cover object-top transition-transform duration-[2000ms] ease-out group-hover/shot:scale-[1.04]"
            />
            {/* Keeps the name readable over any screenshot */}
            <span className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <span className="absolute right-4 top-4 md:right-6 md:top-6 flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm md:text-base font-semibold text-black shadow-[4px_4px_0px_#EB6E00] transition-transform duration-200 group-hover/shot:-translate-y-0.5">
              <Eye className="size-4 md:size-5" />
              Live preview
            </span>
          </button>
        </div>
      </div>

      {/* Number badge, always visible */}
      <span className="absolute left-3 top-2 md:left-4 z-10 grid size-8 md:size-9 place-items-center rounded-full border-2 border-black bg-white text-xs md:text-sm font-semibold text-black font-[Public_Sans]">
        {number}
      </span>

      {/* Name: centred and vertical when closed, bottom-left when open */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex ${
          open
            ? "flex-col items-start justify-end p-5 pr-20 md:p-8 md:pr-28 text-white"
            : wide
              ? "items-center justify-center"
              : "items-center justify-start pl-16"
        }`}
      >
        <SwingTitle open={open} wide={wide} className="text-5xl md:text-6xl xl:text-7xl">
          {project.name}
        </SwingTitle>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-3 flex max-w-xl flex-col gap-2"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm uppercase tracking-[0.15em]">
              <span className="bg-[#EB6E00] text-white px-2 py-0.5">{project.industry}</span>
              {project.country && (
                <span className="flex items-center gap-1 text-white/85">
                  <MapPin className="size-3.5 text-[#EB6E00]" />
                  {project.country}
                </span>
              )}
            </div>
            <p className="hidden sm:block text-base md:text-lg font-[Public_Sans] text-white/90 text-pretty">
              {project.description}
            </p>
          </motion.div>
        )}
      </div>

      {open && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the ${project.name} website`}
          className="group/visit absolute bottom-5 right-5 md:bottom-8 md:right-8 z-10 grid size-12 md:size-16 place-items-center rounded-full border-2 border-black bg-[#EB6E00] text-white transition-transform duration-300 hover:-rotate-45 hover:scale-105"
        >
          <ArrowUpRight className="size-6 md:size-8 transition-transform duration-300 group-hover/visit:rotate-45" />
        </a>
      )}
    </>
  );
}

// Last panel: link to the full project list, with the other projects'
// screenshots fanned in the corner once it's open
function MoreContent({ href, projects, open, wide }) {
  return (
    <>
      <div
        className={`pointer-events-none absolute -right-6 -bottom-6 w-[55%] transition-opacity duration-500 ${
          open ? "opacity-100 delay-200" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {projects.slice(0, 3).map((project, index) => (
          <div
            key={project.slug}
            className="absolute bottom-0 right-0 w-full aspect-[16/10] overflow-hidden rounded-md border-4 border-black bg-white shadow-[4px_4px_0px_#000000]"
            style={{
              transform: `rotate(${-8 + index * 7}deg) translate(${-index * 12}%, ${-index * 6}%)`,
              zIndex: projects.length - index,
            }}
          >
            <Image src={project.image} fill sizes="30vw" alt="" className="object-cover object-top" />
          </div>
        ))}
      </div>

      <div
        className={`absolute inset-0 z-10 flex ${
          open
            ? "flex-col items-start justify-between p-6 md:p-10"
            : wide
              ? "items-center justify-center"
              : "items-center justify-start pl-6"
        }`}
      >
        {open && (
          <span className="text-sm md:text-base uppercase tracking-[0.2em] opacity-60">Show more</span>
        )}
        <SwingTitle open={open} wide={wide} className="text-5xl md:text-6xl xl:text-7xl">
          {open ? (
            <>
              See more
              <br />
              projects
            </>
          ) : (
            "SEE MORE"
          )}
        </SwingTitle>
        {open && (
          <Link
            href={href}
            className="grid size-14 md:size-20 place-items-center rounded-full border-2 border-black bg-[#EB6E00] text-white transition-transform duration-300 hover:-rotate-45"
            aria-label="See more projects"
          >
            <ArrowRight className="size-7 md:size-9" />
          </Link>
        )}
      </div>
    </>
  );
}
