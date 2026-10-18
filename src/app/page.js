import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import AboutStatement from "./components/AboutStatement";
import Process from "./components/Process";
import { StackingCard } from "./components/StackingCard";
import ServicesGrid from "./components/ServicesGrid";
import { TextAnimate } from "@/components/magicui/text-animate";
import CurvedLoop from "./components/CurvedLoop";
import ProjectButton from "./components/ProjectButton";
import TechMarquee from "./components/TechMarquee";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import {
  FEATURED_PROJECT_COUNT,
  about,
  cta,
  processSteps,
  locations,
  features,
  projects,
  services,
  testimonials,
} from "@/data/content";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero cta={cta} locations={locations} />

        <AboutStatement statement={about.statement} mission={about.mission} />

        <ServicesGrid services={services} projects={projects} />

        <section
          id="work"
          className="bg-orange-500 flex flex-col items-center justify-center p-8 relative overflow-x-clip"
        >
          <div className="pt-[5rem]">
            <h2 className="text-white text-[8vw] md:text-[5vw] font-semibold">
              <TextAnimate animation="slideLeft" by="character">
                FEATURED WORKS
              </TextAnimate>
            </h2>
          </div>

          <StackingCard
            projects={projects.slice(0, FEATURED_PROJECT_COUNT)}
            moreHref="/work"
          />
        </section>

        <Process steps={processSteps} cta={cta} />

        <TechMarquee />

        <div className="px-4 lg:px-16">
          <div className="pb-[5rem] lg:pb-[10rem]">
            <div className="mb-8 md:mb-12">
              <div className="bg-orange-500 text-black px-4 py-2 md:px-6 md:py-3 inline-flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-2 md:mr-3"></div>
                <span className="font-bold text-3xl md:text-3xl lg:text-[42px]">
                  <TextAnimate animation="slideLeft" by="character">
                    WHY CHOOSE US?
                  </TextAnimate>
                </span>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              {features.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-4 md:pb-6 ${index !== features.length - 1
                    ? "border-b border-gray-300"
                    : ""
                    }`}
                >
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-[48px] font-regular text-black dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl lg:text-[32px] font-light text-black dark:text-white">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CurvedLoop
          marqueeText="Where ▩ Creativity ▩ meets ▩ strategy ▩"
          speed={3}
          curveAmount={230}
          direction="right"
          interactive={true}
          className="!fill-black dark:!fill-white"
        />

        <Testimonials testimonials={testimonials} />

        <section id="contact" className="bg-orange-500 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-96">
            <div className="flex flex-col items-center justify-center gap-8 px-6 md:pl-16 md:pr-8 py-8">
              <h2 className="text-white text-[30px]  md:text-[40px] lg:text-[65px] font-normal leading-tight">
                Transforming your
                <br />
                vision into reality.
              </h2>
              <ProjectButton title={"Start Your Project"} href="#contact-form" />
            </div>

            <div className="flex flex-col justify-end md:justify-center px-6 md:pl-12 md:pr-16 border-t md:border-t-0 md:border-l border-white border-opacity-30 py-8">
              <p className="text-white text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] mb-6 font-[Public_Sans]">
                Reach out today for a strategic consultation and a quote
                tailored specifically to your project needs.
              </p>
              <ContactForm
                services={services.map(({ id, title }) => ({ id, title }))}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
