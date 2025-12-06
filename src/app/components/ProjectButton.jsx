import { ArrowRight } from "lucide-react";
import React from "react";
function ProjectButton({ title, className }) {
  return (
    <>
      <div
        className={`group relative cursor-pointer p-2 w-75 border overflow-hidden text-black text-center ${
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
      </div>
    </>
  );
}
export default ProjectButton;
