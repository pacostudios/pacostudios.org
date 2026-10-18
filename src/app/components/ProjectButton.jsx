import { ArrowRight } from "lucide-react";
import React from "react";

// Renders as a link. In-page anchors ("#contact") scroll smoothly and focus the
// first field inside the target; any other href behaves like a normal link.
function ProjectButton({ title, className, href = "#contact", onClick }) {
  const isAnchor = href.startsWith("#");

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || !isAnchor) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.querySelector("input, select, textarea")?.focus({ preventScroll: true });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...(!isAnchor && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group relative block cursor-pointer p-2 w-75 border overflow-hidden text-black text-center ${
        className || "bg-white"
      } `}
    >
      <span className="translate-x-1 text-xl font-medium group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block">
        {title}
      </span>
      <div className="flex gap-2 text-xl text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
        <span>{title}</span>
        <ArrowRight />
      </div>
      <div className="absolute top-[40%] left-[10%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#000] group-hover:bg-[#000] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] "></div>
    </a>
  );
}

export default ProjectButton;
