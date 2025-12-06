import React, { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

const ServiceCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const baseX = useMotionValue(0);

  const startPoint = useRef(null);
  const { scrollYProgress } = useScroll({ target: startPoint });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-48.5%"]);

  const services = [
    {
      id: 1,
      number: "1",
      title: "UX/UI",
      subtitle: "Design",
      description: "We craft scalable, future-ready interfaces that blend aesthetics with functionality. Every design decision is rooted in user behavior, ensuring experiences that are visually engaging, intuitive, and outcome-driven.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop&crop=center"
    },
    {
      id: 2,
      number: "2",
      title: "Web",
      subtitle: "Development",
      description: "We deliver robust, responsive, and future-ready web solutions aligned with your business goals. Our process prioritizes scalability, security, and performance, ensuring growth-ready platforms with seamless experiences across all devices",
      image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      number: "3",
      title: "3D",
      subtitle: "Development", 
      description: "We craft immersive 3D experiences that transform digital interactions. By merging cutting-edge technology with storytelling, we elevate engagement, strengthen brand perception, and deliver memorable user experiences beyond traditional interfaces.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1200&fit=crop&crop=center"
    },
    {
      id: 4,
      number: "4",
      title: "App",
      subtitle: "Development", 
      description: "We build intuitive, high-performing mobile applications that deliver seamless cross-platform experiences. By combining user-centric design, robust architecture, and the latest technologies, we craft apps that are visually engaging and efficient.",
      image: "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      number: "5",
      title: "ChatBot",
      subtitle: "Service", 
      description: " We build AI-powered chatbots that deliver personalized, human-like interactions to enhance support and engagement. With a focus on scalability and seamless integration, our solutions adapt to your business needs effortlessly.",
      image: "https://images.unsplash.com/photo-1659018966820-de07c94e0d01?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  return (
    <section
    ref={startPoint}
    className="relative h-full lg:h-[300vh] bg-transparent"
    id="products"
  >
      <div className='sticky top-0 flex h-full lg:h-screen items-center overflow-hidden'>
        <motion.div  style={{ x: typeof window !== "undefined" && window.innerWidth >= 1024 ? x : 0 }}  className="flex h-full">
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
                <img 
                  src={service.image}
                  alt={`${service.title} ${service.subtitle}`}
                  className="w-full h-full object-cover"
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