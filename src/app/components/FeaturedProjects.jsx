"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, ArrowUpRight, Eye, MapPin } from "lucide-react";
import ProjectPreview, { hostname } from "./ProjectPreview";

// Pinned, scroll-driven carousel only on wide screens with motion allowed;
// everywhere else the cards sit in a swipeable row
const PINNED_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
// Extra scroll distance per card while the section is pinned
const SCROLL_PER_CARD_VH = 80;

const subscribeToQuery = (callback) => {
  const query = window.matchMedia(PINNED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

// Eases each step between cards so the carousel lingers on every card
// without snapping the page's scroll
const linger = (t) => t * t * (3 - 2 * t);

export default function FeaturedProjects({ projects, moreProjects = [], moreHref }) {
  const [selected, setSelected] = useState(null);
  const pinned = useSyncExternalStore(
    subscribeToQuery,
    () => window.matchMedia(PINNED_QUERY).matches,
    () => false
  );
  const closePreview = useCallback(() => setSelected(null), []);

  const slideCount = projects.length + (moreHref ? 1 : 0);

  return (
    <>
      {pinned ? (
        <PinnedCarousel
          projects={projects}
          moreProjects={moreProjects}
          moreHref={moreHref}
          slideCount={slideCount}
          onOpen={setSelected}
        />
      ) : (
        <SwipeRow
          projects={projects}
          moreProjects={moreProjects}
          moreHref={moreHref}
          onOpen={setSelected}
        />
      )}
      <PreviewPortal project={selected} onClose={closePreview} />
    </>
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

function Heading({ moreHref, hint }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
      <div>
        <h2 className="text-white text-[12vw] md:text-[7vw] lg:text-[5vw] font-semibold leading-[0.9] tracking-tight">
          FEATURED WORK
        </h2>
        <p className="mt-3 text-black text-lg md:text-xl font-[Public_Sans] text-pretty">{hint}</p>
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className="group inline-flex w-fit shrink-0 items-center gap-2 text-black text-lg md:text-xl font-semibold underline underline-offset-8 decoration-2 hover:text-white transition-colors duration-200"
        >
          See more projects
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function PinnedCarousel({ projects, moreProjects, moreHref, slideCount, onOpen }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lenis = useLenis();
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(0);
  const lastIndex = slideCount - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Carousel position in cards: 0 is the first card centred
  const position = useTransform(scrollYProgress, (p) => {
    const raw = Math.min(Math.max(p, 0), 1) * lastIndex;
    const index = Math.min(Math.floor(raw), lastIndex - 1);
    return index + linger(raw - index);
  });
  const x = useTransform(position, (p) => -p * step);
  const progressWidth = useTransform(position, (p) => `${(p / lastIndex) * 100}%`);

  useMotionValueEvent(position, "change", (p) => setActive(Math.round(p)));

  // Distance between card centres, kept in sync with the layout
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const [first, second] = track.children;
      if (first && second) setStep(second.offsetLeft - first.offsetLeft);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const goTo = (index) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    const y = top + (index / lastIndex) * distance;
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const labels = [...projects.map((p) => p.name), ...(moreHref ? ["More"] : [])];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#EB6E00]"
      style={{ height: `${100 + lastIndex * SCROLL_PER_CARD_VH}vh` }}
    >
      <div
        className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24 pb-6"
        style={{ "--card-w": "max(340px, min(56vw, calc((100svh - 440px) * 1.6)))" }}
      >
        <div className="px-4 lg:px-16">
          <Heading
            moreHref={moreHref}
            hint="Scroll to browse. Click a project to open the live site."
          />
        </div>

        <div className="flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x, paddingLeft: "calc(50vw - var(--card-w) / 2)" }}
            className="flex items-center gap-[5vw] will-change-transform"
          >
            {projects.map((project, index) => (
              <Slide key={project.slug} index={index} position={position}>
                <ProjectCard
                  project={project}
                  active={active === index}
                  onOpen={() => (active === index ? onOpen(project) : goTo(index))}
                />
              </Slide>
            ))}
            {moreHref && (
              <Slide index={projects.length} position={position}>
                <MoreCard href={moreHref} projects={moreProjects} />
              </Slide>
            )}
          </motion.div>
        </div>

        {/* Progress: click a name to jump to it */}
        <div className="px-4 lg:px-16">
          <div className="relative h-1 bg-black/20">
            <motion.div className="absolute inset-y-0 left-0 bg-black" style={{ width: progressWidth }} />
          </div>
          <div className="mt-3 flex justify-between gap-4 pr-16 lg:pr-20">
            {labels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => goTo(index)}
                aria-current={active === index ? "true" : undefined}
                className={`flex items-baseline gap-2 text-sm md:text-base font-semibold cursor-pointer transition-colors duration-200 ${
                  active === index ? "text-black" : "text-black/50 hover:text-white"
                }`}
              >
                <span className="font-[Public_Sans] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="hidden lg:inline uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// One carousel slot: grows and straightens as it reaches the centre, shrinks
// and tilts away on either side
function Slide({ index, position, children }) {
  const distance = useTransform(position, (p) => Math.max(-1, Math.min(1, index - p)));
  const scale = useTransform(distance, (d) => 1 - Math.abs(d) * 0.18);
  const rotate = useTransform(distance, (d) => d * 7);
  const y = useTransform(distance, (d) => Math.abs(d) * 40);

  return (
    <motion.div
      style={{ scale, rotate, y, width: "var(--card-w)" }}
      className="shrink-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function SwipeRow({ projects, moreProjects, moreHref, onOpen }) {
  return (
    <section id="work" className="bg-[#EB6E00] py-[5rem]">
      <div className="px-4">
        <Heading moreHref={moreHref} hint="Swipe to browse. Tap a project to open the live site." />
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <div key={project.slug} className="w-[85vw] max-w-[640px] shrink-0 snap-center">
            <ProjectCard project={project} active onOpen={() => onOpen(project)} />
          </div>
        ))}
        {moreHref && (
          <div className="w-[85vw] max-w-[640px] shrink-0 snap-center">
            <MoreCard href={moreHref} projects={moreProjects} />
          </div>
        )}
      </div>
    </section>
  );
}

function BrowserBar({ label }) {
  return (
    <div className="flex items-center gap-3 border-b-4 border-black bg-[#FFE9D1] px-3 py-2 md:px-4">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="size-3 rounded-full border-2 border-black bg-[#EB6E00]" />
        <span className="size-3 rounded-full border-2 border-black bg-white" />
        <span className="size-3 rounded-full border-2 border-black bg-white" />
      </span>
      <span className="flex-1 truncate rounded-full border-2 border-black bg-white px-3 py-0.5 text-xs md:text-sm font-[Public_Sans]">
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, active, onOpen }) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-md border-4 border-black bg-white text-black transition-shadow duration-300 ${
        active ? "shadow-[10px_10px_0px_#000000]" : "shadow-[6px_6px_0px_#000000]"
      }`}
    >
      <BrowserBar label={hostname(project.url)} />

      <button
        type="button"
        onClick={onOpen}
        aria-label={active ? `Open a live preview of ${project.name}` : `Show ${project.name}`}
        className="relative block aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer"
      >
        <Image
          src={project.image}
          fill
          sizes="(min-width: 768px) 56vw, 85vw"
          alt={`Screenshot of the ${project.name} website`}
          placeholder="blur"
          className="object-cover object-top transition-[transform,object-position] duration-[2500ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          className={`absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 ${
            active ? "group-hover:bg-black/25" : ""
          }`}
        >
          <span
            className={`flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2.5 font-semibold shadow-[4px_4px_0px_#EB6E00] transition-[opacity,translate] duration-300 ${
              active
                ? "max-md:opacity-100 md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                : "opacity-0"
            } max-md:absolute max-md:bottom-3 max-md:right-3 max-md:px-3 max-md:py-1.5 max-md:text-sm`}
          >
            <Eye className="size-5 max-md:size-4" />
            Live preview
          </span>
        </span>
      </button>

      <div className="flex items-end justify-between gap-4 p-4 md:p-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm uppercase tracking-[0.15em]">
            <span className="bg-black text-white px-2 py-0.5">{project.industry}</span>
            {project.country && (
              <span className="flex items-center gap-1 text-black/70">
                <MapPin className="size-3.5 text-[#EB6E00]" />
                {project.country}
              </span>
            )}
          </div>
          <h3 className="text-3xl xl:text-4xl font-semibold tracking-tight leading-none">{project.name}</h3>
          <p className="text-sm md:text-base font-[Public_Sans] text-black/75 line-clamp-2 md:line-clamp-1 text-pretty">
            {project.description}
          </p>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit the ${project.name} website`}
          className="group/visit grid shrink-0 place-items-center size-11 md:size-14 rounded-full border-2 border-black bg-[#EB6E00] text-white transition-transform duration-300 hover:-rotate-45 hover:scale-105"
        >
          <ArrowUpRight className="size-5 md:size-7 transition-transform duration-300 group-hover/visit:rotate-45" />
        </a>
      </div>
    </article>
  );
}

// Last slide: a white tile linking to the full project list, with the other
// projects' screenshots fanned behind the text
function MoreCard({ href, projects }) {
  return (
    <Link
      href={href}
      className="group relative flex h-full md:h-auto md:aspect-[16/12.5] flex-col justify-between overflow-hidden rounded-md border-4 border-black bg-white p-6 md:p-10 text-black shadow-[8px_8px_0px_#000000] transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000000]"
    >
      <div className="pointer-events-none absolute -right-6 -bottom-6 w-[60%]" aria-hidden="true">
        {projects.slice(0, 3).map((project, index) => (
          <div
            key={project.slug}
            className="absolute bottom-0 right-0 w-full aspect-[16/10] overflow-hidden rounded-md border-4 border-black bg-white shadow-[4px_4px_0px_#000000] transition-transform duration-500 ease-out"
            style={{
              transform: `rotate(${-8 + index * 7}deg) translate(${-index * 12}%, ${-index * 6}%)`,
              zIndex: projects.length - index,
            }}
          >
            <Image src={project.image} fill sizes="30vw" alt="" className="object-cover object-top" />
          </div>
        ))}
      </div>

      <span className="relative text-sm md:text-base uppercase tracking-[0.2em] text-black/60">Show more</span>
      <span className="relative flex items-end justify-between gap-4">
        <span className="text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
          See more
          <br />
          projects
        </span>
      </span>
      <span className="relative grid size-14 md:size-20 place-items-center rounded-full bg-[#EB6E00] text-white transition-transform duration-300 group-hover:-rotate-45">
        <ArrowRight className="size-7 md:size-9" />
      </span>
    </Link>
  );
}
