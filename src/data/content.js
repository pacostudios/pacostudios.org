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

// Countries where we have people on the ground
export const locations = ["Australia", "India"];

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

// What we offer. `id` is also used by the contact form ("Get a quote for
// this" pre-selects the service). Projects link back to services by id.
export const services = [
  {
    id: "web",
    title: "Web Development",
    summary:
      "Fast, responsive websites that are easy to update and built to grow with your business.",
    deliverables: [
      "Business websites",
      "Content management (CMS)",
      "Online payments, incl. Razorpay & UPI",
      "SEO foundations",
      "Hosting & domains",
      "Ongoing maintenance",
    ],
  },
  {
    id: "uxui",
    title: "UX/UI Design",
    summary:
      "Clear, good-looking interfaces designed around how your customers actually use them.",
    deliverables: [
      "User flows & sitemaps",
      "Wireframes",
      "Interactive prototypes",
      "Visual design",
      "Design systems",
      "Accessibility (WCAG AA) review",
    ],
  },
  {
    id: "3d",
    title: "3D Development",
    summary:
      "Interactive 3D that lets customers explore products and spaces right in the browser.",
    deliverables: [
      "3D product viewers",
      "Interactive web scenes",
      "Animated 3D brand assets",
    ],
  },
  {
    id: "app",
    title: "App Development",
    summary:
      "Mobile apps for iOS and Android, designed and built by the same team as your website.",
    deliverables: [
      "iOS & Android apps",
      "Cross-platform builds",
      "App Store & Play Store launch",
    ],
  },
  {
    id: "chatbot",
    title: "AI Chatbots",
    summary:
      "Assistants that answer customer questions around the clock and hand over to your team when needed.",
    deliverables: [
      "Website chat assistants",
      "FAQ & support automation",
      "WhatsApp chatbots",
    ],
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
    industry: "Education nonprofit",
    country: "USA", // TODO: confirm (site says 501(c)(3), a US nonprofit status)
    services: ["web", "uxui"],
    description:
      "Nonprofit research academy helping students in grades 1–12 think like scientists.",
    highlights: ["Programs", "Mentor network", "Online registration"],
    url: "https://www.thinkgyra.org/",
    image: gyraImage,
  },
  {
    slug: "stem4girls",
    name: "STEM4Girls",
    industry: "Education nonprofit",
    country: "USA", // TODO: confirm (site says 501(c)(3), a US nonprofit status)
    services: ["web", "uxui"],
    description:
      "Nonprofit bringing STEM opportunities to underrepresented youth.",
    highlights: ["Competitions", "Project resources", "Registration & donations"],
    url: "https://www.stem4girls.org/",
    image: stem4girlsImage,
  },
  {
    slug: "lorrygo",
    name: "LorryGo",
    industry: "Logistics",
    country: "UAE",
    services: ["web", "uxui"],
    description: "Freight trucking across the UAE and GCC, based in Dubai.",
    highlights: ["Service catalogue", "Fleet overview", "Shipment enquiry form"],
    url: "https://www.lorrygopvt.com/",
    image: lorrygoImage,
  },
  {
    slug: "poornaya",
    name: "Poornaya",
    industry: "Disability & health",
    country: "Australia",
    services: ["web", "uxui"],
    description:
      "NDIS-registered positive behaviour support, based in Melbourne.",
    highlights: ["Service pages", "Referral form", "Consultation booking"],
    url: "https://www.poornaya.com/",
    image: poornayaImage,
  },
  {
    slug: "glenroy-sports",
    name: "Glenroy Sports",
    industry: "Retail",
    country: "Australia",
    services: ["web", "uxui"],
    description: "Sports gear, trophies, engraving and uniforms.",
    highlights: ["Product categories", "Online shop", "Store contact"],
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
