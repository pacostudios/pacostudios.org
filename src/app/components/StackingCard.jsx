import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Each card gets a slight tilt so the stack looks hand-placed
const transforms = [
  "-rotate-4 scale-95",
  "rotate-4 scale-96 translate-x-4 translate-y-2",
  "-rotate-4 scale-95",
];

export const StackingCard = ({ projects }) => {
  return (
    <section className="text-white w-full">
      <div className="flex justify-center items-center">
        <div>
          {projects.map((project, index) => (
            <figure
              key={project.slug}
              className="sticky top-0 h-screen grid place-content-center"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the ${project.name} website`}
                className={`block w-[85vw] h-[50vh] md:h-[80vh] md:w-[70vw] lg:h-[80vh] lg:w-[70vw] bg-black transform ${
                  transforms[index % transforms.length]
                } border-8 border-white overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl relative group`}
              >
                <Image
                  src={project.image}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  sizes="(min-width: 768px) 70vw, 85vw"
                  alt={`Screenshot of the ${project.name} website`}
                  placeholder="blur"
                />

                {/* Hover overlay */}
                <div className="absolute left-10 bottom-10 flex flex-col justify-center items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <div className="p-2 bg-orange-500 hover:bg-white hover:text-black transition-colors duration-200 rounded-full">
                    <ArrowUpRight strokeWidth={0.5} className="size-[6vw]" />
                  </div>
                </div>
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
