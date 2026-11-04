import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { TextAnimate } from "@/components/magicui/text-animate";
import { contact } from "@/data/content";
import ScrollLink from "./ScrollLink";
import CurrentYear from "./CurrentYear";

// Same layout everywhere; each page picks the colours that fit it.
const themes = {
  site: {
    footer: "bg-white text-black dark:bg-black dark:text-white",
    edge: "border-black dark:border-white",
    rule: "border-black/20 dark:border-white/25",
    muted: "text-black/65 dark:text-white/70",
    icon: "border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black",
  },
  indigo: {
    footer: "bg-[#100C24] text-[#F4F1EA]",
    edge: "border-[#EB6E00]",
    rule: "border-white/20",
    muted: "text-white/70",
    icon: "border-white/40 hover:border-[#EB6E00] hover:bg-[#EB6E00] hover:text-black",
  },
};

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: contact.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
  { href: contact.instagram, label: "Instagram", Icon: Instagram },
  { href: contact.linkedin, label: "LinkedIn", Icon: Linkedin },
];

// `wordmark` is off on pages that already end with a giant PACO of their own.
export default function Footer({ theme = "site", wordmark = true }) {
  const colors = themes[theme];

  return (
    <footer className={`w-full border-t-2 ${colors.edge} ${colors.footer}`}>
      {wordmark && (
        <div className={`overflow-hidden border-b ${colors.rule} text-center text-[28vw] font-bold leading-[0.95] tracking-tighter`}>
          <TextAnimate animation="slideLeft" by="character">
            PACO
          </TextAnimate>
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 px-4 py-14 md:grid-cols-[1fr_auto] md:gap-16 md:pr-28 lg:py-20 lg:pl-16">
        <div className="min-w-0">
          <p className={`text-sm uppercase tracking-[0.15em] ${colors.muted}`}>Start a conversation</p>
          <a
            href={`mailto:${contact.email}`}
            className="group/mail mt-4 inline-flex max-w-full items-start gap-2 text-[5vw] font-bold tracking-tight transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[#EB6E00] sm:text-3xl lg:text-5xl"          >
            {contact.email}
            <ArrowUpRight className="mt-1 size-6 shrink-0 transition-transform duration-200 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 lg:size-10" />
          </a>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {contact.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="inline-flex min-h-11 items-center gap-2 font-[Public_Sans] text-lg transition-colors duration-200 hover:text-[#EB6E00] lg:text-xl"
                >
                  <Phone aria-hidden="true" className="size-5" />
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid size-12 place-items-center rounded-full border transition-colors duration-200 ${colors.icon}`}
                >
                  <Icon size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className={`text-sm uppercase tracking-[0.15em] ${colors.muted}`}>Explore</p>
          <ul className="mt-4 md:min-w-64">
            {navLinks.map((link, index) => (
              <li key={link.label} className={`border-b ${colors.rule}`}>
                <ScrollLink
                  href={link.href}
                  className="group/nav flex min-h-12 items-baseline gap-4 py-2 text-xl font-semibold transition-colors duration-200 hover:text-[#EB6E00] lg:text-2xl"
                >
                  <span className={`font-[Public_Sans] text-sm font-normal tabular-nums ${colors.muted}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="transition-transform duration-200 group-hover/nav:translate-x-1">{link.label}</span>
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`flex flex-col justify-between gap-2 border-t ${colors.rule} px-4 pb-24 pt-4 text-sm sm:flex-row sm:items-center md:pb-4 md:pr-28 lg:pl-16`}>
        <Link href="/privacy" className="w-fit transition-colors duration-200 hover:text-[#EB6E00]">
          Privacy Policy
        </Link>
        <span>
          © <CurrentYear /> Paco Studios
        </span>
      </div>
    </footer>
  );
}
