"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { requestQuote } from "@/lib/quote";
import ScrollLink from "./ScrollLink";

const PREVIEW_CYCLE_MS = 1100;
const followSpring = { stiffness: 350, damping: 30, mass: 0.5 };

// Big numbered rows. Hovering a row fills it orange and, where we have real
// work for that service, shows a screenshot that follows the cursor. Clicking
// opens the row with deliverables, related projects and a quote button.
export default function ServicesIndex({ services, projects }) {
  const [openId, setOpenId] = useState(services[0]?.id ?? null);
  const [hover, setHover] = useState({ id: null, index: 0 });
  const reduceMotion = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const previewX = useSpring(cursorX, followSpring);
  const previewY = useSpring(cursorY, followSpring);

  const projectsFor = (serviceId) =>
    projects.filter((project) => project.services?.includes(serviceId));
  const hoverProjects = hover.id ? projectsFor(hover.id) : [];
  const previewProject = hoverProjects[hover.index % (hoverProjects.length || 1)];

  // Cycle through the matching projects while a row is hovered
  useEffect(() => {
    if (!hover.id || reduceMotion) return;
    const timer = setInterval(
      () => setHover((current) => ({ ...current, index: current.index + 1 })),
      PREVIEW_CYCLE_MS
    );
    return () => clearInterval(timer);
  }, [hover.id, reduceMotion]);

  const handlePointerEnter = (e, serviceId) => {
    if (e.pointerType !== "mouse") return;
    cursorX.jump(e.clientX);
    cursorY.jump(e.clientY);
    previewX.jump(e.clientX);
    previewY.jump(e.clientY);
    setHover({ id: serviceId, index: 0 });
  };

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  return (
    <section id="services" className="px-4 lg:px-16 py-[5rem] lg:py-[8rem]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-16">
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

      <div className="border-b-2 border-black dark:border-white">
        {services.map((service, index) => {
          const isOpen = openId === service.id;
          const related = projectsFor(service.id);
          const panelId = `service-panel-${service.id}`;

          return (
            <div key={service.id} className="border-t-2 border-black dark:border-white">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : service.id)}
                onPointerEnter={(e) => handlePointerEnter(e, service.id)}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setHover({ id: null, index: 0 })}
                className="group relative w-full flex items-center gap-4 md:gap-10 py-6 md:py-8 px-2 md:px-6 text-left overflow-hidden cursor-pointer text-black dark:text-white hover:text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#EB6E00] focus-visible:ring-inset"
              >
                {/* Orange fill that rises from the bottom on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#EB6E00] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                />
                <span className="relative text-sm md:text-xl font-[Public_Sans] tabular-nums w-8 md:w-12 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative flex-1 text-3xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-none transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
                  {service.title}
                </span>
                {related.length > 0 && (
                  <span className="relative hidden md:block text-base font-[Public_Sans] whitespace-nowrap">
                    {related.length} project{related.length === 1 ? "" : "s"}
                  </span>
                )}
                <Plus
                  aria-hidden="true"
                  className={`relative size-8 md:size-12 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 md:gap-16 pb-10 md:pb-14 pt-2 px-2 md:pl-[5.5rem] md:pr-6 text-black dark:text-white">
                      <div className="flex flex-col gap-6 items-start">
                        <p className="text-lg md:text-2xl font-[Public_Sans] text-pretty max-w-xl">
                          {service.summary}
                        </p>
                        <ScrollLink
                          href="#contact-form"
                          onClick={() => requestQuote(service.id)}
                          className="group/cta inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-5 py-3 text-base md:text-lg font-medium shadow-[4px_4px_0px_#EB6E00] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#EB6E00]"
                        >
                          Get a quote for {service.title}
                          <ArrowRight className="size-5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                        </ScrollLink>
                      </div>

                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">
                            What you get
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="border-2 border-black dark:border-white rounded-full px-4 py-1.5 text-sm md:text-base font-[Public_Sans]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {related.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">
                              Seen in
                            </p>
                            <ul className="flex flex-wrap gap-x-5 gap-y-2">
                              {related.map((project) => (
                                <li key={project.slug}>
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-base md:text-lg font-medium underline underline-offset-4 decoration-2 decoration-[#EB6E00] hover:text-[#EB6E00] transition-colors duration-200"
                                  >
                                    {project.name}
                                    <ArrowUpRight className="size-4" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Cursor-following preview of real work for the hovered service */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            key="preview"
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
            style={{ x: previewX, y: previewY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-[115%] w-72 lg:w-80 aspect-[16/10] border-4 border-black bg-black rotate-3 shadow-[8px_8px_0px_#000000] overflow-hidden">
              <Image
                key={previewProject.slug}
                src={previewProject.image}
                fill
                sizes="320px"
                alt=""
                className="object-cover object-top"
              />
              <span className="absolute left-2 bottom-2 bg-white text-black text-xs font-semibold px-2 py-1">
                {previewProject.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
