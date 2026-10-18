import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectButton from "../components/ProjectButton";
import { projects } from "@/data/content";

export const metadata = {
  title: "Our Work | Paco Studios",
  description:
    "Websites designed and built by Paco Studios for clients in Australia, India and beyond.",
  alternates: { canonical: "https://pacostudios.org/work" },
};

function ProjectCard({ project }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-4 border-black dark:border-white bg-black">
        <Image
          src={project.image}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          alt={`Screenshot of the ${project.name} website`}
          placeholder="blur"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-4 mt-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-semibold">{project.name}</h2>
          {project.description && (
            <p className="text-base lg:text-lg font-[Public_Sans] text-gray-700 dark:text-gray-300 mt-1">
              {project.description}
            </p>
          )}
        </div>
        {project.url && (
          <span className="flex items-center gap-1 text-sm lg:text-lg font-[Public_Sans] whitespace-nowrap mt-2 group-hover:text-[#EB6E00] transition-colors duration-200">
            View site
            <ArrowUpRight className="size-5" />
          </span>
        )}
      </div>
    </>
  );

  if (!project.url) return <div>{content}</div>;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit the ${project.name} website`}
      className="group block"
    >
      {content}
    </a>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="px-4 lg:px-16 py-12 lg:py-20">
        <Link
          href="/"
          className="text-sm lg:text-base hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          ← Back to Paco Studios
        </Link>

        <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px] mt-8 mb-4">
          • ALL WORK
        </div>
        <p className="text-lg lg:text-2xl font-[Public_Sans] max-w-3xl mb-12 lg:mb-16">
          Websites we&apos;ve designed and built for clients in Australia, India
          and beyond.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <section className="bg-orange-500 px-6 md:px-16 py-16 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <h2 className="text-white text-[30px] md:text-[40px] lg:text-[56px] font-normal leading-tight">
          Your project could be next.
        </h2>
        <ProjectButton title={"Start Your Project"} href="/#contact" />
      </section>
    </main>
  );
}
