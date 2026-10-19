"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Monitor, Smartphone, X } from "lucide-react";

export const hostname = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Full-screen browser window that loads a project's real website. Desktop
// and mobile views; sites that can't be embedded show their screenshot.
// Closes on Escape, the close button or a click on the backdrop.
export default function ProjectPreview({ project, onClose }) {
  return createPortal(
    <AnimatePresence>
      {project && <PreviewWindow key={project.slug} project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

function PreviewWindow({ project, onClose }) {
  const lenis = useLenis();
  const closeRef = useRef(null);
  const [device, setDevice] = useState("desktop");
  const [loaded, setLoaded] = useState(false);
  const canEmbed = project.livePreview !== false;

  // Freeze the page behind the window, and give focus back when it closes
  useEffect(() => {
    const previousFocus = document.activeElement;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [lenis, onClose]);

  const switchDevice = (next) => {
    if (next === device) return;
    setLoaded(false);
    setDevice(next);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} website preview`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 40, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="flex h-full w-full max-w-[1500px] flex-col overflow-hidden rounded-md border-4 border-black bg-white text-black shadow-[10px_10px_0px_#EB6E00]"
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 md:gap-3 border-b-4 border-black bg-[#FFE9D1] px-3 py-2 md:px-4 md:py-3">
          <span className="hidden sm:flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full border-2 border-black bg-[#EB6E00]" />
            <span className="size-3 rounded-full border-2 border-black bg-white" />
            <span className="size-3 rounded-full border-2 border-black bg-white" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1 text-xs md:text-sm font-[Public_Sans]">
            {canEmbed && (
              <span
                className={`size-2 shrink-0 rounded-full ${loaded ? "bg-green-600" : "bg-gray-400 animate-pulse"}`}
                aria-hidden="true"
              />
            )}
            <span className="truncate">{hostname(project.url)}</span>
          </span>

          {canEmbed && (
            <div className="hidden md:flex rounded-full border-2 border-black bg-white p-0.5" role="group" aria-label="Preview size">
              {[
                ["desktop", Monitor, "Desktop view"],
                ["mobile", Smartphone, "Mobile view"],
              ].map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => switchDevice(id)}
                  aria-label={label}
                  aria-pressed={device === id}
                  className={`grid place-items-center rounded-full px-3 py-1 cursor-pointer transition-colors duration-150 ${
                    device === id ? "bg-black text-white" : "hover:bg-[#FFE9D1]"
                  }`}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          )}

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/visit inline-flex shrink-0 items-center gap-1.5 bg-black text-white px-3 py-1.5 md:px-4 text-sm font-semibold shadow-[3px_3px_0px_#EB6E00] transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#EB6E00]"
          >
            <span className="hidden sm:inline">Visit site</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="grid shrink-0 place-items-center size-8 md:size-9 rounded-full border-2 border-black bg-white cursor-pointer transition-colors duration-150 hover:bg-[#EB6E00] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB6E00]"
          >
            <X className="size-4 md:size-5" />
          </button>
        </div>

        {/* Page */}
        <div className="relative flex-1 overflow-hidden bg-[#FFE9D1]">
          {canEmbed ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="flex items-center gap-3 text-lg font-semibold">
                    <span className="size-3 rounded-full bg-[#EB6E00] animate-ping" />
                    Loading {project.name}…
                  </span>
                </div>
              )}
              <iframe
                key={device}
                src={project.url}
                title={`Live preview of the ${project.name} website`}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
                className={`absolute inset-y-0 left-1/2 h-full -translate-x-1/2 border-0 bg-white transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                } ${device === "mobile" ? "w-[390px] max-w-full border-x-4 border-black" : "w-full"}`}
              />
            </>
          ) : (
            <div className="absolute inset-0 overflow-y-auto">
              <Image
                src={project.image}
                sizes="(min-width: 1500px) 1500px, 100vw"
                alt={`Screenshot of the ${project.name} website`}
                placeholder="blur"
                className="w-full h-auto"
              />
              <p className="sticky bottom-4 mx-auto mt-4 w-fit rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold shadow-[3px_3px_0px_#000000]">
                This site can&apos;t be previewed here. Use Visit site to open it.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
