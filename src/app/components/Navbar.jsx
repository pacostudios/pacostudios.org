"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "../../app/assets/paco.png";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Hide when scrolling down, show when scrolling up or near the top. The last
  // position lives in a ref and work is batched per frame, so scrolling
  // doesn't re-render the navbar (React skips same-value updates).
  useEffect(() => {
    let frame = 0;
    const controlNavbar = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < 10 || currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      // Not on the home page: go there and jump to the section
      window.location.assign(`/#${sectionId}`);
    }
    // Close mobile menu after clicking
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 w-full z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-auto bg-white dark:bg-black border-b border-gray-300 px-4 py-1 lg:px-0 lg:py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8  h-full">
            <div className="border-r px-6 h-full">
              <Image
                className="w-10 h-10 md:w-14 md:h-14 rounded-full cursor-pointer"
                src={Logo}
                width={56}
                height={56}
                priority
                alt="Paco Studios logo"
                onClick={() => scrollToSection('home')}
              />
            </div>
            <p className="text-black dark:text-white text-sm lg:text-xl font-semibold font-[Montserrat] hidden md:block">
              A creative studio delivering unforgettable digital journeys.
            </p>
          </div>

          <div className="hidden lg:flex">
            <div className="border-l px-8 py-6 m-0">
              <AnimatedThemeToggler />
            </div>

            <div className="border-l px-8 py-6 text-black dark:text-white">
              <button
                onClick={() => scrollToSection('about')}
                className="text-lg lg:text-xl font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                ABOUT US
              </button>
            </div>
            <div className="border-l px-8 py-6">
              <button
                onClick={() => scrollToSection('work')}
                className="text-black dark:text-white text-lg lg:text-xl font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                WORK
              </button>
            </div>
            <div className="border-l px-8 py-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="text-black dark:text-white text-lg lg:text-xl font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                CONTACT
              </button>
            </div>
          </div>

          <div className="lg:hidden">
           <div className="flex items-center">
           <div className="border- px-8 m-0">
              <AnimatedThemeToggler />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-black dark:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
           </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col mt-4 pb-4 space-y-4 lg:hidden">
            <button
              onClick={() => scrollToSection('about')}
              className="text-black dark:text-white text-base font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-left"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-black dark:text-white text-base font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-left"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-black dark:text-white text-base font-semibold font-[Montserrat] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 text-left"
            >
              CONTACT
            </button>
          </div>
        )}
      </nav>
    </nav>
  );
};