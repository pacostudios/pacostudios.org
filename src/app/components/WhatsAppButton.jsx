"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

// Floating WhatsApp button, bottom-right. Opens a small menu so visitors can
// message the Australian or Indian number, with a prefilled message.
export default function WhatsAppButton({ options, message }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            id="whatsapp-menu"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full right-0 mb-4 w-72 origin-bottom-right bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] p-2"
          >
            <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
              Chat on WhatsApp
            </p>
            {options.map((option) => (
              <a
                key={option.number}
                href={`https://wa.me/${option.number}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded text-black dark:text-white hover:bg-[#EB6E00] hover:text-black transition-colors duration-150"
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-sm font-[Public_Sans] tabular-nums whitespace-nowrap opacity-80">
                  {option.display}
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="whatsapp-menu"
        aria-label="Chat with us on WhatsApp"
        className="grid place-items-center size-12 md:size-14 rounded-md bg-[#25D366] text-white shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] cursor-pointer transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] dark:hover:shadow-[6px_6px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
      >
        <FaWhatsapp className="size-7 md:size-8" />
      </button>
    </div>
  );
}
