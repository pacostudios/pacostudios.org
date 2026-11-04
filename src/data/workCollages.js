import gyraHome from "@/app/assets/work/gyra-home.webp";
import gyraPrograms from "@/app/assets/work/gyra-programs.webp";
import gyraConference from "@/app/assets/work/gyra-conference.webp";
import stem4girlsHome from "@/app/assets/work/stem4girls-home.webp";
import stem4girlsCompetition from "@/app/assets/work/stem4girls-competition.webp";
import stem4girlsParticipate from "@/app/assets/work/stem4girls-participate.webp";
import lorrygoHome from "@/app/assets/work/lorrygo-home.webp";
import lorrygoServices from "@/app/assets/work/lorrygo-services.webp";
import lorrygoEnquiry from "@/app/assets/work/lorrygo-enquiry.webp";
import poornayaHome from "@/app/assets/work/poornaya-home.webp";
import poornayaPromise from "@/app/assets/work/poornaya-promise.webp";
import poornayaFooter from "@/app/assets/work/poornaya-footer.webp";
import glenroyHome from "@/app/assets/work/glenroy-home.webp";
import glenroyCategories from "@/app/assets/work/glenroy-categories.webp";
import glenroyServices from "@/app/assets/work/glenroy-services.webp";

// Three real pages from each live site, keyed by project slug. The first is
// the largest window in the collage.
export const workCollages = {
  gyra: [
    { image: gyraHome, label: "Home", alt: "GYRA home page showing children doing a science experiment" },
    { image: gyraPrograms, label: "Programs", alt: "GYRA programs page with two pathways for students" },
    { image: gyraConference, label: "Conference", alt: "GYRA section on the International Research Conference for Children" },
  ],
  stem4girls: [
    { image: stem4girlsHome, label: "Home", alt: "STEM4Girls home page with the headline Shape the Future Through STEM" },
    { image: stem4girlsCompetition, label: "Competition", alt: "STEM4Girls section announcing the STEM4Health competition" },
    { image: stem4girlsParticipate, label: "Participate", alt: "STEM4Girls section listing reasons to participate and competition categories" },
  ],
  lorrygo: [
    { image: lorrygoHome, label: "Home", alt: "LorryGo home page with a blue truck under a bright sky" },
    { image: lorrygoServices, label: "Services", alt: "LorryGo services page describing local transport" },
    { image: lorrygoEnquiry, label: "Enquiry", alt: "LorryGo shipment enquiry form" },
  ],
  poornaya: [
    { image: poornayaHome, label: "Home", alt: "Poornaya home page with a smiling child lying in a meadow" },
    { image: poornayaPromise, label: "Our promise", alt: "Poornaya section on its core promise to participants" },
    { image: poornayaFooter, label: "Contact", alt: "Poornaya footer with contact details and a large wordmark" },
  ],
  "glenroy-sports": [
    { image: glenroyHome, label: "Home", alt: "Glenroy Sports home page with a gold star trophy" },
    { image: glenroyCategories, label: "Categories", alt: "Glenroy Sports shop categories for trophies, equipment and uniforms" },
    { image: glenroyServices, label: "Services", alt: "Glenroy Sports services including custom engraving and team apparel" },
  ],
};
