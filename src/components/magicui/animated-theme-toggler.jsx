"use client";;
import { Moon, SunDim, Eclipse } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

export const AnimatedThemeToggler = ({
  className
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDarkMode(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    const toggle = () => document.documentElement.classList.toggle("dark");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      toggle();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(toggle);
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate({
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRad}px at ${x}px ${y}px)`,
      ],
    }, {
      duration: 700,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    });
  };
  return (
    (<button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
      {isDarkMode ? <SunDim /> : <Eclipse />}
    </button>)
  );
};
