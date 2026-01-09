"use client";
import project1 from "@/app/assets/project1.jpg";
import project2 from "@/app/assets/project2.jpg";
import project3 from "@/app/assets/poornaya_img.jpg";
import project4 from "@/app/assets/project4.jpg";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const StackingCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      id: 1,
      image: project1,
      title: "Project 1",
      description: "Click to view Project 1",
      link: "https://arabianskyme.com/",
      transform: "rotate-4",
    },
    {
      id: 2,
      image: project2,
      title: "Project 2",
      description: "Click to view Project 2",
      link: "https://www.lorrygopvt.com/",
      transform: "-rotate-4 scale-95",
    },
    {
      id: 3,
      image: project3,
      title: "Project 3",
      description: "Click to view Project 3",
      link: "https://www.poornaya.com/",
      transform: "rotate-4 scale-96 translate-x-4 translate-y-2",
    },
    // {
    //   id: 4,
    //   image: project4,
    //   title: "Project 4",
    //   description: "Click to view Project 3",
    //   link: "/project3", // Replace with your actual links
    //   transform: "-rotate-4 scale-95",
    // },
  ];

  const handleCardClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section className="text-white w-full">
      <div className="flex justify-center items-center">
        <div className="">
          {projects.map((project, index) => (
            <figure
              key={project.id}
              className="sticky top-0 h-screen grid place-content-center"
            >
              <article
                className={`w-[85vw] h-[50vh] md:h-[80vh] md:w-[70vw] lg:h-[80vh] lg:w-[70vw] bg-black transform ${project.transform} border-8 border-white overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl relative group`}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(project.link)}
              >
                <Image
                  src={project.image.src}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  width={1200}
                  height={1200}
                  alt={project.title}
                  loading="lazy"
                  quality={70}
                />

                {/* Hover overlay */}
                <div
                  className={`absolute left-10 bottom-10 bg-opacity-50 flex flex-col justify-center items-center transition-opacity duration-300 ${
                    hoveredCard === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className=" p-2 bg-orange-500   hover:bg-white hover:text-black transition-colors duration-200 rounded-full">
                    <ArrowUpRight strokeWidth={0.5} className="size-[6vw]" />
                  </div>
                </div>
              </article>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
