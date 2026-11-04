import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import WorkOpening from "../components/WorkOpening";
import WorkCollage from "../components/WorkCollage";
import WorkEnding from "../components/WorkEnding";
import { WorkRail } from "../components/WorkIndex";
import { cta, projects } from "@/data/content";
import { workCollages } from "@/data/workCollages";

export const metadata = {
  title: "Our Work | Paco Studios",
  description:
    "Websites designed and built by Paco Studios for nonprofits, logistics, health and retail businesses in Australia, the UAE and the USA.",
  alternates: { canonical: "https://pacostudios.org/work" },
};

export default function WorkPage() {
  // Stats come straight from the project data, so they stay accurate
  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Countries", value: new Set(projects.map((p) => p.country).filter(Boolean)).size },
    { label: "Industries", value: new Set(projects.map((p) => p.industry)).size },
  ];
  const total = String(projects.length).padStart(2, "0");
  const sections = projects.map((p) => ({ id: p.slug, label: p.name }));

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-[#100C24]">
        <WorkRail sections={sections} />
        <WorkOpening stats={stats} sections={sections} />
        {projects.map((project, index) => (
          <WorkCollage
            key={project.slug}
            project={project}
            index={index}
            number={`${String(index + 1).padStart(2, "0")} / ${total}`}
            windows={workCollages[project.slug]}
          />
        ))}
        <WorkEnding label={cta.label} href={`/${cta.href}`} />
      </main>
      <Footer theme="indigo" wordmark={false} />
    </>
  );
}
