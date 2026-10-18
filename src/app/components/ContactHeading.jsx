"use client";

import { motion } from "framer-motion";
import { useCursorTilt } from "@/lib/useCursorTilt";

// "Got a project? Let's [talk]." with "talk" on a black tile that tilts
// toward the cursor, echoing the PACO hero.
export default function ContactHeading() {
  const tilt = useCursorTilt(16);

  return (
    <div {...tilt.handlers} className="py-4">
      <h2 className="text-black text-[13vw] md:text-[6vw] lg:text-[5.5vw] font-semibold leading-[0.95] tracking-tight">
        Got a project?
        <br />
        Let&apos;s{" "}
        <motion.span
          style={tilt.style}
          className="inline-block align-middle bg-black text-[#EB6E00] px-[0.25em] pb-[0.08em] rounded-md -rotate-3 shadow-[6px_6px_0px_#FFFFFF]"
        >
          talk.
        </motion.span>
      </h2>
    </div>
  );
}
