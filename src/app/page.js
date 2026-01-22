"use client";

import { Navbar } from "./components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { FeedbackCard } from "./components/FeedbackCard";
import { StackingCard } from "./components/StackingCard";
import ServiceCards from "./components/ServiceCards";
import { TextAnimate } from "@/components/magicui/text-animate";
import CurvedLoop from "./components/CurvedLoop";
import homeimage1 from "@/app/assets/homeimage1.jpg";
import Image from "next/image";
import Preloader from "./components/Preloader";
import PreloaderNew from "./components/PreloaderNew";
import ProjectButton from "./components/ProjectButton";
import { FaWhatsapp } from "react-icons/fa6";
import Preloader2 from "./components/Preloader2";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Popular country codes
  const countryCodes = [
    { code: "+1", country: "US/CA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+49", country: "DE", flag: "🇩🇪" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
    { code: "+81", country: "JP", flag: "🇯🇵" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    { code: "+55", country: "BR", flag: "🇧🇷" },
    { code: "+7", country: "RU", flag: "🇷🇺" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+966", country: "SA", flag: "🇸🇦" },
  ];

  useEffect(() => {
    // Hide preloader after 6 seconds (or when your actual content loads)
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `${countryCode}${phone}`,
          email,
          name,
        }),
      });

      if (res.ok) {
        setSubmissionStatus("success");
        setPhone("");
        setCountryCode("+1");
        setEmail("");
        setName("");
      } else {
        setSubmissionStatus("error");
      }

      console.log(res);
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  const features = [
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

  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
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
        "We are very happy with our new website. It’s clean, responsive, and user-friendly. The service was fast, reliable, and exceeded our expectations.",
    },
    {
      name: "Ever Rising Transport",
      title: "Co-Founder",
      company: "",
      testimonial:
        "Our new website has given us a strong online presence. The design is professional, mobile-friendly, and highlights our services clearly. We appreciate the timely delivery and great support.",
    },
    // {
    //   name: "Ana Espinoza",
    //   title: "Co-Founder",
    //   company: "Browntez",
    //   testimonial:
    //     "Nara @ PACO has been an exceptional designer to work with, developing our branding materials with creativity and precision. Her attention to detail and ability to understand our vision has had a very positive impact on our brand. We couldn't be happier with the results!",
    // },
    // {
    //   name: "Ana Espinoza",
    //   title: "Co-Founder",
    //   company: "Browntez",
    //   testimonial:
    //     "Nara @ PACO has been an exceptional designer to work with, developing our branding materials with creativity and precision. Her attention to detail and ability to understand our vision has had a very positive impact on our brand. We couldn't be happier with the results!",
    // },
    // {
    //   name: "Ana Espinoza",
    //   title: "Co-Founder",
    //   company: "Browntez",
    //   testimonial:
    //     "Nara @ PACO has been an exceptional designer to work with, developing our branding materials with creativity and precision. Her attention to detail and ability to understand our vision has had a very positive impact on our brand. We couldn't be happier with the results!",
    // },
    // {
    //   name: "Ana Espinoza",
    //   title: "Co-Founder",
    //   company: "Browntez",
    //   testimonial:
    //     "Nara @ PACO has been an exceptional designer to work with, developing our branding materials with creativity and precision. Her attention to detail and ability to understand our vision has had a very positive impact on our brand. We couldn't be happier with the results!",
    // },
    // {
    //   name: "Ana Espinoza",
    //   title: "Co-Founder",
    //   company: "Browntez",
    //   testimonial:
    //     "Nara @ PACO has been an exceptional designer to work with, developing our branding materials with creativity and precision. Her attention to detail and ability to understand our vision has had a very positive impact on our brand. We couldn't be happier with the results!",
    // },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
      setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1));
    }
  };
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {loading && <Preloader2 onComplete={() => setLoading(false)} />}
      <Navbar />
      <div className=" relative">
        <section id="home">
          <div className="flex items-center justify-center mt-4 sm:mt-6">
            <div className="relative">
              {/* <div className="flex items-baseline">
                <span className="font-black text-black text-5xl sm:text-[100px] md:text-[120px] lg:text-[200px] xl:text-[360px] 2xl:text-[485px]">
                  P
                </span>
                <span className="font-black text-orange-500 text-5xl sm:text-[100px] md:text-[120px] lg:text-[200px] xl:text-[360px] 2xl:text-[485px]">
                  A
                </span>
                <span className="font-black text-black text-5xl sm:text-[100px] md:text-[120px] lg:text-[200px] xl:text-[360px] 2xl:text-[485px]">
                  C
                </span>
                <span className="font-black text-black text-5xl sm:text-[100px] md:text-[120px] lg:text-[200px] xl:text-[360px] 2xl:text-[485px]">
                  O
                </span>
              </div> */}

              <h1 className="font-bold uppercase text-[35vw] leading-[0.80] tracking-tighter text-black dark:text-[#FFE9D1]">
                p<span className="text-[#EB6E00]">a</span>co
              </h1>
              <div className="absolute -bottom-6 lg:-bottom-8 right-0 left-0 flex justify-end sm:justify-end">
                <span className="text-lg lg:text-[3.3vw] font-medium text-black dark:text-white font-[Public_Sans] pr-5 lg:pr-[6rem] leading-1">
                  <TextAnimate animation="slideLeft" by="character">
                    STUDIOS
                  </TextAnimate>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-4 lg:gap-0 mt-20 lg:mt-40  mb-10 px-4 lg:px-16">
          <div className="inline-flex flex-col justify-start items-start gap-4 sm:gap-6">
            <h1 className="self-stretch justify-start text-black dark:text-white text-xl lg:text-5xl lg:text-[58px] font-medium">
              We Build the Digital Future.
            </h1>
            <p className="justify-start text-black dark:text-white text-sm lg:text-2xl lg:text-[28px] font-normal max-w-full lg:max-w-[720px]">
              From pixel-perfect websites to immersive 3D experiences — Paco
              Studios is your modern development partner.
            </p>
            <ProjectButton
              title={"Start Your Project"}
              className="bg-[#EB6E00]"
            />
          </div>
          <div className="overflow-hidden w-full h-full lg:w-[45vw] lg:h-[45vh]">
            <Image
              src={homeimage1.src}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              width={500}
              height={500}
              alt="Modern workspace with a laptop displaying code"
              loading="lazy"
              quality={70}
            />
          </div>
        </div>

        <section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-12 py-[5rem] lg:py-[10rem] px-4 lg:px-16"
        >
          <div>
            <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px]">
              <TextAnimate animation="slideLeft" by="character">
                • ABOUT PACO
              </TextAnimate>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-[#EB6E00] text-xl lg:text-[28px] font-semibold mb-4">
                Who We Are
              </h2>
              <p className="text-black dark:text-white text-lg lg:text-[26px] font-[Public_Sans]">
                At Paco Studios, we blend creativity with technology to craft
                digital experiences that make businesses stand out. With roots
                in web development and 3D innovation, we&apos;re not just coders
                — we&apos;re creators with purpose.
              </p>
            </div>

            <div>
              <h2 className="text-[#EB6E00] text-xl lg:text-[28px] font-semibold mb-4">
                Our mission
              </h2>
              <p className="text-black dark:text-white text-lg lg:text-[26px] font-[Public_Sans]">
                To deliver scalable, modern, and meaningful digital products
                that drive results and delight users.
              </p>
            </div>
          </div>
        </section>

        <div className="">
          {/* <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
              <div className="p-6 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]">
                <div className="mb-8">
                  <h2 className="text-[120px] lg:text-[20vw] leading-none font-extralight text-black mb-4 font-[Public_Sans]">
                    1
                  </h2>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black leading-none">
                    UX/UI
                  </h3>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black">
                    Design
                  </h3>
                </div>
                <p className="text-gray-700 text-[18px] lg:text-[26px] font-[Public_Sans]">
                  We craft scalable, modern interfaces that not only deliver
                  results but elevate user satisfaction.
                </p>
              </div>

              <div className="p-6 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]">
                <div className="mb-8">
                  <h2 className="text-[120px] lg:text-[20vw] leading-none font-extralight text-black mb-4 font-[Public_Sans]">
                    2
                  </h2>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black leading-none">
                    Web
                  </h3>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black">
                    Development
                  </h3>
                </div>
                <p className="text-gray-700 text-[18px] lg:text-[26px] font-[Public_Sans]">
                  Robust, responsive, and future-ready web solutions tailored to
                  your business goals.
                </p>
              </div>

              <div className="p-6 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-[120px] lg:text-[20vw] leading-none font-extralight text-black mb-4 font-[Public_Sans]">
                    3
                  </h2>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black  leading-none">
                    3D
                  </h3>
                  <h3 className="text-[36px] lg:text-[60px] font-medium text-black ">
                    Development
                  </h3>
                </div>
                <p className="text-gray-700 text-[18px] lg:text-[26px] font-[Public_Sans]">
                  Creating immersive 3D experiences that elevate interaction,
                  engagement, and brand storytelling.
                </p>
              </div>
            </div>
          </div> */}
          <ServiceCards />
        </div>

        <section
          id="work"
          className=" bg-orange-500 flex flex-col items-center justify-center p-8 relative"
        >
          <div className="pt-[5rem]">
            <h2 className="text-white text-[8vw] md:text-[5vw] font-semibold">
              <TextAnimate animation="slideLeft" by="character">
                FEATURED WORKS
              </TextAnimate>
            </h2>
          </div>

          <StackingCard />
        </section>

        <div className="px-4 lg:px-16">
          <div className="py-[5rem] lg:py-[10rem]">
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
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-4 md:pb-6 ${
                    index !== features.length - 1
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

        <div className="px-4 lg:px-16 pb-[5rem] md:pb-[10rem]">
          <div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start mb-12">
              <div className="bg-orange-500 text-black px-6 py-3 inline-flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <span className="font-bold text-2xl md:text-3xl lg:text-[42px]">
                  <TextAnimate animation="slideLeft" by="character">
                    CLIENT FEEDBACK
                  </TextAnimate>
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 transition-colors duration-200"
                  disabled={currentIndex === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M24.5 14C24.5 14.2321 24.4078 14.4546 24.2437 14.6187C24.0796 14.7828 23.857 14.875 23.625 14.875H6.48699L12.869 21.2559C12.9503 21.3372 13.0148 21.4337 13.0588 21.54C13.1028 21.6462 13.1254 21.76 13.1254 21.875C13.1254 21.99 13.1028 22.1038 13.0588 22.21C13.0148 22.3162 12.9503 22.4128 12.869 22.4941C12.7877 22.5754 12.6912 22.6398 12.585 22.6838C12.4788 22.7278 12.3649 22.7505 12.25 22.7505C12.135 22.7505 12.0211 22.7278 11.9149 22.6838C11.8087 22.6398 11.7122 22.5754 11.6309 22.4941L3.75589 14.6191C3.67454 14.5378 3.61 14.4413 3.56597 14.3351C3.52193 14.2288 3.49927 14.115 3.49927 14C3.49927 13.885 3.52193 13.7711 3.56597 13.6649C3.61 13.5587 3.67454 13.4622 3.75589 13.3809L11.6309 5.50594C11.7951 5.34175 12.0178 5.24951 12.25 5.24951C12.4822 5.24951 12.7048 5.34175 12.869 5.50594C13.0332 5.67012 13.1254 5.8928 13.1254 6.125C13.1254 6.35719 13.0332 6.57987 12.869 6.74406L6.48699 13.125H23.625C23.857 13.125 24.0796 13.2172 24.2437 13.3813C24.4078 13.5454 24.5 13.7679 24.5 14Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 transition-colors duration-200"
                  disabled={currentIndex === testimonials.length - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M24.2441 14.6191L16.3691 22.4941C16.2049 22.6582 15.9822 22.7505 15.75 22.7505C15.5178 22.7505 15.2951 22.6582 15.1309 22.4941C14.9668 22.3299 14.8745 22.1072 14.8745 21.875C14.8745 21.6428 14.9668 21.4201 15.1309 21.2559L21.513 14.875H4.375C4.14294 14.875 3.92038 14.7828 3.75628 14.6187C3.59219 14.4546 3.5 14.2321 3.5 14C3.5 13.7679 3.59219 13.5454 3.75628 13.3813C3.92038 13.2172 4.14294 13.125 4.375 13.125H21.513L15.1309 6.74406C14.9668 6.57987 14.8745 6.35719 14.8745 6.125C14.8745 5.8928 14.9668 5.67012 15.1309 5.50594C15.2951 5.34175 15.5178 5.24951 15.75 5.24951C15.9822 5.24951 16.2049 5.34175 16.3691 5.50594L24.2441 13.3809C24.3254 13.4622 24.39 13.5587 24.434 13.6649C24.478 13.7711 24.5007 13.885 24.5007 14C24.5007 14.115 24.478 14.2288 24.434 14.3351C24.39 14.4413 24.3254 14.5378 24.2441 14.6191Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((testimonial, index) => (
                <FeedbackCard
                  key={index}
                  name={testimonial?.name}
                  title={testimonial?.title}
                  company={testimonial?.company}
                  testimonial={testimonial?.testimonial}
                  isActive={index === currentIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <section id="contact" className="bg-orange-500 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-96">
            <div className="flex flex-col items-center justify-center gap-8 px-6 md:pl-16 md:pr-8 py-8">
              <h2 className="text-white text-[30px]  md:text-[40px] lg:text-[65px] font-normal leading-tight">
                Transforming your
                <br />
                vision into reality.
              </h2>
              <ProjectButton title={"Start Your Project"} />
            </div>

            <div className="flex flex-col justify-end md:justify-center px-6 md:pl-12 md:pr-16 border-t md:border-t-0 md:border-l border-white border-opacity-30 py-8">
              <p className="text-white text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] mb-6 font-[Public_Sans]">
                Reach out today for a strategic consultation and a quote
                tailored specifically to your project needs.
              </p>

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-500 border-none outline-none text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-500 border-none outline-none text-sm"
                  required
                />
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 text-black bg-[#FFE9D1] border-none outline-none text-sm min-w-[100px]"
                  >
                    {countryCodes.map((country) => (
                      <option
                        key={country.code}
                        value={country.code}
                        className="uppercase"
                      >
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="flex-1 px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-500 border-none outline-none text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submissionStatus === "sending"}
                  className="w-full bg-black text-white px-4 py-3 font-medium text-sm hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400"
                >
                  {submissionStatus === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
              {submissionStatus === "success" && (
                <p className="text-white mt-2">
                  Thank you for your interest! We will get back to you soon.
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="text-red-400 mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="bg-white dark:bg-black w-full text-black dark:text-white">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="text-center text-[60px] sm:text-[80px] md:text-[120px] lg:text-[15vw] font-bold tracking-tighter">
                <TextAnimate animation="slideLeft" by="character">
                  PACO
                </TextAnimate>
              </div>
            </div>

            <div className="border-l border-gray-300 grid">
              <div className="border-b border-gray-300 grid place-items-center min-h-[80px]">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm lg:text-2xl text-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  01. Home
                </button>
              </div>
              <div className="border-b border-gray-300 grid place-items-center min-h-[80px]">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm lg:text-2xl text-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  02. About
                </button>
              </div>
              <div className="border-b-0 border-gray-300 grid place-items-center min-h-[80px]">
                <button
                  onClick={() => scrollToSection("work")}
                  className="text-sm lg:text-2xl text-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  03. Work
                </button>
              </div>
            </div>

            <div className="border-l-0 border-gray-300 grid">
              <div className="border border-gray-300 border-b-0 grid place-items-center min-h-[80px]">
                <div className="py-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></div>
                      <span className="text-sm lg:text-xl font-medium">
                        Contact
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                      <Mail />
                      <a
                        href="mailto:info@pacostudio.com"
                        className="text-sm lg:text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        info@pacostudios.org
                      </a>
                    </div>
                    <hr />

                    <div className="flex items-center space-x-4">
                      <Phone />
                      <p className="text-sm lg:text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 mt-2">
                        +61 470541254
                      </p>
                    </div>
                    <hr />
                    <div className="flex items-center space-x-4">
                      {/* <Phone /> */}

                      <p className="text-sm lg:text-2xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 pl-10">
                        +91 7012399476
                      </p>
                    </div>
                    <hr />

                    <div className="flex items-center space-x-6 mt-8">
                      <a
                        href="https://wa.me/+61470541254"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                      >
                        <FaWhatsapp size={28} />
                      </a>

                      <a
                        href="https://www.instagram.com/org_paco?igsh=bTVhcXNjYmdlcTAz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                      >
                        <Instagram />
                      </a>

                      <a
                        href="https://www.linkedin.com/company/pacostudios/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                      >
                        <Linkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="border border-gray-300 border-b-0 grid place-items-center min-h-[80px]">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-3"></div>
                    <span className="text-sm lg:text-xl font-medium">
                      Connect
                    </span>
                  </div>
                  <div className="flex space-x-6 text-sm lg:text-2xl">
                    <a
                      href="https://linkedin.com/company/pacostudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/pacostudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="border-t border-gray-300 px-6 py-3 flex justify-between items-center">
            <div>
              <button
                onClick={() => scrollToSection("privacy")}
                className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
            <div>
              <span className="text-sm">2025 Made In Paco Studio</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
