import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectButton from "../components/ProjectButton";
import WorkHero from "../components/WorkHero";
import WorkGallery from "../components/WorkGallery";
import { cta, projects, services } from "@/data/content";

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
  const serviceTitles = Object.fromEntries(services.map((s) => [s.id, s.title]));

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-black">
        <WorkHero stats={stats} />
        <WorkGallery projects={projects} serviceTitles={serviceTitles} />

        <section className="bg-orange-500 px-6 md:px-16 py-16 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-[30px] md:text-[40px] lg:text-[56px] font-normal leading-tight">
              Your project could be next.
            </h2>
            <p className="text-black text-lg md:text-xl font-[Public_Sans] mt-2">
              Tell us what you need and we&apos;ll reply with a quote within 24 hours.
            </p>
          </div>
          <ProjectButton title={cta.label} href={`/${cta.href}`} />
        </section>
      </main>
      <Footer />
    </>
  );
}
