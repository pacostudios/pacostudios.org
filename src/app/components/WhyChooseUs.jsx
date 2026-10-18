import { ArrowUpRight } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";

// Big rows, all content always visible. Hover sweeps orange across the row,
// nudges the title and brings in an arrow.
export default function WhyChooseUs({ features }) {
  return (
    <section id="why" className="px-4 lg:px-16 py-[5rem] lg:py-[8rem]">
      <div className="bg-[#EB6E00] w-fit px-5 py-2.5 md:px-6 md:py-3 font-bold text-2xl sm:text-3xl lg:text-[42px] text-black whitespace-nowrap mb-10 md:mb-14">
        <TextAnimate animation="slideLeft" by="character">
          • WHY PACO?
        </TextAnimate>
      </div>

      <ul className="border-b-2 border-black dark:border-white">
        {features.map((item, index) => (
          <li
            key={item.title}
            className="group relative overflow-hidden border-t-2 border-black dark:border-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#EB6E00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            />
            <div className="relative grid grid-cols-[auto_1fr] md:grid-cols-[4rem_1fr_1.2fr_auto] gap-x-4 md:gap-x-10 gap-y-2 items-center py-7 md:py-10 px-2 md:px-6 text-black dark:text-white group-hover:text-black transition-colors duration-300">
              <span className="text-sm md:text-xl font-[Public_Sans] tabular-nums self-start md:self-center pt-2 md:pt-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3">
                {item.title}
              </h3>
              <p className="col-start-2 md:col-start-auto text-base md:text-xl font-[Public_Sans] text-pretty">
                {item.description}
              </p>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="hidden md:block size-10 lg:size-12 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-hover:rotate-45"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
