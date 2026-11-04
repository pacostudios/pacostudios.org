"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

// Glides to a section on this page, then moves keyboard focus there too.
function useScrollToSection() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  return (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { immediate: reduceMotion });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    target.focus({ preventScroll: true });
  };
}

// Project buttons for the opening, on screens too small for the side rail.
export function WorkJumpLinks({ sections }) {
  const scrollToSection = useScrollToSection();

  return (
    <nav aria-label="Jump to a project" className="mt-5 border-t border-white/15 pt-4 lg:hidden">
      <ul className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => scrollToSection(event, section.id)}
              className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-3 font-[Public_Sans] text-sm"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Dots down the left edge, shown only while a project is on screen.
export function WorkRail({ sections }) {
  const scrollToSection = useScrollToSection();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const visible = new Set();
    // A section counts as active while it crosses the middle of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId([...visible][0] ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Projects"
      className={`fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-300 lg:block ${
        activeId ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-1">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => scrollToSection(event, section.id)}
                aria-current={active ? "true" : undefined}
                tabIndex={activeId ? undefined : -1}
                className="group/dot relative grid size-8 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className={`block w-1.5 rounded-full transition-all duration-200 ${
                    active ? "h-6 bg-[#EB6E00]" : "h-1.5 bg-white/50 group-hover/dot:bg-white"
                  }`}
                />
                <span className="pointer-events-none absolute left-full ml-1 whitespace-nowrap rounded-md border border-white/20 bg-[#1E1745] px-3 py-1 text-sm font-semibold text-[#F4F1EA] opacity-0 transition-opacity duration-150 group-hover/dot:opacity-100 group-focus-visible/dot:opacity-100">
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
