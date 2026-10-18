import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import AboutStatement from "./components/AboutStatement";
import Process from "./components/Process";
import { StackingCard } from "./components/StackingCard";
import ServicesGrid from "./components/ServicesGrid";
import { TextAnimate } from "@/components/magicui/text-animate";
import CurvedLoop from "./components/CurvedLoop";
import TechMarquee from "./components/TechMarquee";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import ContactHeading from "./components/ContactHeading";
import Footer from "./components/Footer";
import {
  FEATURED_PROJECT_COUNT,
  about,
  contact,
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
          data-snap
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

        <WhyChooseUs features={features} />

        <CurvedLoop
          marqueeText="Where ▩ Creativity ▩ meets ▩ strategy ▩"
          speed={3}
          curveAmount={230}
          direction="right"
          interactive={true}
          className="!fill-black dark:!fill-white"
        />

        <Testimonials testimonials={testimonials} />

        <section id="contact" data-snap className="bg-[#EB6E00] w-full px-4 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-8">
              <ContactHeading />
              <p className="text-black text-lg md:text-2xl font-[Public_Sans] max-w-xl text-pretty">
                Tell us a little about your project and we&apos;ll come back with
                a tailored quote within 24 hours.
              </p>
              <ul className="flex flex-col gap-3 text-black text-base md:text-lg">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold underline underline-offset-4 decoration-2 hover:text-white transition-colors duration-200 [overflow-wrap:anywhere]"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="font-semibold hover:text-white transition-colors duration-200"
                    >
                      {phone.display}
                    </a>
                    <span className="ml-2 text-sm opacity-70">{phone.country}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex lg:justify-end">
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
