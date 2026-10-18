import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Each card gets a slight tilt so the stack looks hand-placed
const transforms = [
  "-rotate-4 scale-95",
  "rotate-4 scale-96 translate-x-4 translate-y-2",
  "-rotate-4 scale-95",
  "rotate-3 scale-95 -translate-x-2",
];

const cardClass =
  "block w-[85vw] h-[50vh] md:h-[80vh] md:w-[70vw] lg:h-[80vh] lg:w-[70vw] transform border-8 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl relative group";

function CardWrapper({ url, label, className, children }) {
  if (!url) return <div className={className}>{children}</div>;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}

// projects: the cards to stack. moreHref: adds a final "Show more" card
// linking to the full list of projects.
export const StackingCard = ({ projects, moreHref }) => {
  return (
    <section className="text-white w-full">
      <div className="flex justify-center items-center">
        <div>
          {projects.map((project, index) => (
            <figure
              key={project.slug}
              className="sticky top-0 h-screen grid place-content-center"
            >
              <CardWrapper
                url={project.url}
                label={`Visit the ${project.name} website`}
                className={`${cardClass} bg-black border-white ${
                  transforms[index % transforms.length]
                } ${project.url ? "cursor-pointer" : ""}`}
              >
                <Image
                  src={project.image}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  sizes="(min-width: 768px) 70vw, 85vw"
                  alt={`Screenshot of the ${project.name} website`}
                  placeholder="blur"
                />

                {/* Name and summary, always visible so it works on touch screens too */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16 md:pt-24 px-4 pb-4 md:px-10 md:pb-8 flex flex-col items-center text-center gap-3 md:gap-5">
                  <div>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-sm md:text-lg font-[Public_Sans] text-white/85 mt-1 md:mt-2 max-w-xl mx-auto">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Visit button in the middle of the card */}
                {project.url && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 text-base md:text-xl font-medium shadow-lg transition-colors duration-200 group-hover:bg-white group-hover:text-black">
                      Visit site
                      <ArrowUpRight className="size-5 md:size-6" />
                    </span>
                  </div>
                )}
              </CardWrapper>
            </figure>
          ))}

          {moreHref && (
            <figure className="sticky top-0 h-screen grid place-content-center">
              <Link
                href={moreHref}
                aria-label="Show all projects"
                className={`${cardClass} bg-white border-black text-black ${
                  transforms[projects.length % transforms.length]
                } cursor-pointer`}
              >
                <div className="h-full flex flex-col items-center justify-center gap-4 md:gap-6 text-center px-6">
                  <span className="text-[12vw] md:text-[7vw] font-semibold leading-none">
                    SHOW MORE
                  </span>
                  <span className="text-base md:text-2xl font-[Public_Sans]">
                    See more projects
                  </span>
                  <span className="p-2 bg-orange-500 text-white rounded-full transition-colors duration-200 group-hover:bg-black">
                    <ArrowUpRight strokeWidth={0.75} className="size-14 md:size-[5vw]" />
                  </span>
                </div>
              </Link>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
};
