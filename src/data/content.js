// Site content lives here so it can be edited without touching the components.
// Never add made-up testimonials, client names, metrics or logos. Where real
// content is still missing, leave a clearly marked "TODO: real data" entry.

import lorrygoImage from "@/app/assets/project2.webp";
import poornayaImage from "@/app/assets/poornaya_img.webp";
import glenroyImage from "@/app/assets/glenroy.webp";
import gyraImage from "@/app/assets/thinkgyra.png";
import stem4girlsImage from "@/app/assets/stem4girls.png";

// The main call to action, repeated across the site
export const cta = {
  label: "Get a quote in 24 hours",
  href: "#contact",
};

export const locations = [
  { city: "Melbourne", timeZone: "Australia/Melbourne", label: "AEST" },
  { city: "Kerala", timeZone: "Asia/Kolkata", label: "IST" },
];

export const contact = {
  email: "pacostudios.work@gmail.com",
  phones: [
    { display: "+61 470541254", tel: "+61470541254", country: "AU" },
    { display: "+91 7012399476", tel: "+917012399476", country: "IN" },
  ],
  whatsapp: "https://wa.me/61470541254",
  instagram: "https://www.instagram.com/org_paco?igsh=bTVhcXNjYmdlcTAz",
  linkedin: "https://www.linkedin.com/company/pacostudios/",
};

export const features = [
  {
    title: "Innovation-Led Approach",
    description: "We Don't Just Build — We Innovate. Always.",
  },
  {
    title: "Stakeholder-Focused",
    description:
      "We Treat Your Vision Like It's Ours. Every Pixel, Every Line Of Code.",
  },
  {
    title: "Multi-Disciplinary Team",
    description:
      "Designers, Developers, Thinkers, And Problem Solvers Under One Roof",
  },
];

export const services = [
  {
    id: 1,
    number: "1",
    title: "UX/UI",
    subtitle: "Design",
    description:
      "We craft scalable, future-ready interfaces that blend aesthetics with functionality. Every design decision is rooted in user behavior, ensuring experiences that are visually engaging, intuitive, and outcome-driven.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop&crop=center",
  },
  {
    id: 2,
    number: "2",
    title: "Web",
    subtitle: "Development",
    description:
      "We deliver robust, responsive, and future-ready web solutions aligned with your business goals. Our process prioritizes scalability, security, and performance, ensuring growth-ready platforms with seamless experiences across all devices",
    image:
      "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    number: "3",
    title: "3D",
    subtitle: "Development",
    description:
      "We craft immersive 3D experiences that transform digital interactions. By merging cutting-edge technology with storytelling, we elevate engagement, strengthen brand perception, and deliver memorable user experiences beyond traditional interfaces.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1200&fit=crop&crop=center",
  },
  {
    id: 4,
    number: "4",
    title: "App",
    subtitle: "Development",
    description:
      "We build intuitive, high-performing mobile applications that deliver seamless cross-platform experiences. By combining user-centric design, robust architecture, and the latest technologies, we craft apps that are visually engaging and efficient.",
    image:
      "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    number: "5",
    title: "ChatBot",
    subtitle: "Service",
    description:
      "We build AI-powered chatbots that deliver personalized, human-like interactions to enhance support and engagement. With a focus on scalability and seamless integration, our solutions adapt to your business needs effortlessly.",
    image:
      "https://images.unsplash.com/photo-1659018966820-de07c94e0d01?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Order matters: the first three are featured on the home page, and the
// /work page lists them all in this order.
// Arabian Sky (arabianskyme.com) is left out for now; its screenshot is
// still at src/app/assets/project1.webp.
export const projects = [
  {
    slug: "gyra",
    name: "GYRA",
    description:
      "Nonprofit research academy helping students in grades 1–12 think like scientists.",
    url: "https://www.thinkgyra.org/",
    image: gyraImage,
  },
  {
    slug: "stem4girls",
    name: "STEM4Girls",
    description:
      "Nonprofit bringing STEM opportunities to underrepresented youth.",
    url: "https://www.stem4girls.org/",
    image: stem4girlsImage,
  },
  {
    slug: "lorrygo",
    name: "LorryGo",
    description: "Freight trucking across the UAE and GCC, based in Dubai.",
    url: "https://www.lorrygopvt.com/",
    image: lorrygoImage,
  },
  {
    slug: "poornaya",
    name: "Poornaya",
    description:
      "NDIS-registered positive behaviour support, based in Melbourne.",
    url: "https://www.poornaya.com/",
    image: poornayaImage,
  },
  {
    slug: "glenroy-sports",
    name: "Glenroy Sports",
    description: "Sports gear, trophies, engraving and uniforms.",
    url: "https://www.glenroysports.com.au/",
    image: glenroyImage,
  },
];

export const FEATURED_PROJECT_COUNT = 3;

export const testimonials = [
  {
    name: "LorryGo",
    title: "Co-Founder",
    company: "",
    testimonial:
      "The team did an excellent job designing our website. It looks modern, easy to navigate, and perfectly represents our brand. The whole process was smooth and professional.",
  },
  {
    name: "Arabian Sky Transport",
    title: "Co-Founder",
    company: "",
    testimonial:
      "We are very happy with our new website. It’s clean, responsive, and user-friendly. The service was fast, reliable, and exceeded our expectations.",
  },
  {
    name: "Ever Rising Transport",
    title: "Co-Founder",
    company: "",
    testimonial:
      "Our new website has given us a strong online presence. The design is professional, mobile-friendly, and highlights our services clearly. We appreciate the timely delivery and great support.",
  },
];
