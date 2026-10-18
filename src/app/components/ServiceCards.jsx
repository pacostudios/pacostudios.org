"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ServiceCards = ({ services }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  // Horizontal scroll only on desktop. Read the width after mount so the
  // server render and first client render match.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const startPoint = useRef(null);
  const { scrollYProgress } = useScroll({ target: startPoint });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-48.5%"]);


  return (
    <section
    ref={startPoint}
    className="relative h-full lg:h-[300vh] bg-transparent"
    id="products"
  >
      <div className='sticky top-0 flex h-full lg:h-screen items-center overflow-hidden'>
        <motion.div  style={{ x: isDesktop ? x : 0 }}  className="flex h-full">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`relative p-6 lg:p-12 cursor-pointer flex justify-center items-center w-full lg:w-[40vw] ${
                index === 0 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]' :
                index === 1 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]' :
                index === 2 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]' :
                index === 3 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#EB6E00]' :
                'p-6 lg:p-12'
              }`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div 
                className={`
                  absolute inset-0 transition-opacity duration-500 ease-out
                  ${hoveredCard === service.id ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <Image
                  src={service.image}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={`${service.title} ${service.subtitle}`}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Original Content */}
              <div className="relative z-10">
                <div className="mb-8">
                  <h2 className={`text-[120px] lg:text-[20vw] leading-none font-extralight mb-4 font-[Public_Sans] transition-colors duration-500 ease-out ${
                    hoveredCard === service.id ? 'text-white' : 'text-black dark:text-[#FFE9D1]'
                  }`}>
                    {service.number}
                  </h2>
                  <h2 className={`text-[36px] lg:text-[60px] font-medium leading-none transition-colors duration-500 ease-out ${
                    hoveredCard === service.id ? 'text-white' : 'text-black dark:text-white'
                  }`}>
                    {service.title}
                  </h2>
                  <h2 className={`text-[36px] lg:text-[60px] font-medium transition-colors duration-500 ease-out ${
                    hoveredCard === service.id ? 'text-white' : 'text-black dark:text-white'
                  }`}>
                    {service.subtitle}
                  </h2>
                </div>
                <p className={`text-base lg:text-xl font-[Public_Sans] transition-colors duration-500 ease-out ${
                  hoveredCard === service.id ? 'text-white/90' : 'text-black dark:text-white'
                }`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCards;