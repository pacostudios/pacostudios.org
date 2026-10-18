import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { TextAnimate } from "@/components/magicui/text-animate";
import { contact } from "@/data/content";
import ScrollLink from "./ScrollLink";
import CurrentYear from "./CurrentYear";

const navLinkClass =
  "text-sm lg:text-2xl text-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer";
const contactLinkClass =
  "text-sm lg:text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200";
const iconLinkClass =
  "hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer";

const navLinks = [
  { href: "#home", label: "01. Home" },
  { href: "#about", label: "02. About" },
  { href: "#work", label: "03. Work" },
];

export default function Footer() {
  const [primaryPhone, secondaryPhone] = contact.phones;

  return (
    <footer className="bg-white dark:bg-black w-full text-black dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-center text-[60px] sm:text-[80px] md:text-[120px] lg:text-[15vw] font-bold tracking-tighter">
            <TextAnimate animation="slideLeft" by="character">
              PACO
            </TextAnimate>
          </div>
        </div>

        <div className="border-l border-gray-300 grid">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className={`${
                index === navLinks.length - 1 ? "border-b-0" : "border-b"
              } border-gray-300 grid place-items-center min-h-[80px]`}
            >
              <ScrollLink href={link.href} className={navLinkClass}>
                {link.label}
              </ScrollLink>
            </div>
          ))}
        </div>

        <div className="border-l-0 border-gray-300 grid min-w-0">
          <div className="border border-gray-300 border-b-0 grid place-items-center min-h-[80px]">
            <div className="py-4 px-4 max-w-full">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></div>
                  <span className="text-sm lg:text-xl font-medium">Contact</span>
                </div>
                <div className="flex items-center space-x-4 mt-8">
                  <Mail />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm lg:text-base xl:text-lg [overflow-wrap:anywhere] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </div>
                <hr />

                <div className="flex items-center space-x-4">
                  <Phone />
                  <a href={`tel:${primaryPhone.tel}`} className={`${contactLinkClass} mt-2`}>
                    {primaryPhone.display}
                  </a>
                </div>
                <hr />
                <div className="flex items-center space-x-4">
                  <a href={`tel:${secondaryPhone.tel}`} className={`${contactLinkClass} pl-10`}>
                    {secondaryPhone.display}
                  </a>
                </div>
                <hr />

                <div className="flex items-center space-x-6 mt-8">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className={iconLinkClass}
                  >
                    <FaWhatsapp size={28} />
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={iconLinkClass}
                  >
                    <Instagram />
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={iconLinkClass}
                  >
                    <Linkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 px-6 py-3 flex justify-between items-center">
        <Link
          href="/privacy"
          className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
        >
          Privacy Policy
        </Link>
        <span className="text-sm">
          © <CurrentYear /> Paco Studios
        </span>
      </div>
    </footer>
  );
}
