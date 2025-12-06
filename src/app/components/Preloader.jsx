"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSlices, setShowSlices] = useState(false);

  const loadingWords = ["CREATING", "DESIGNING", "CRAFTING", "BUILDING", "DELIVERING"];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsComplete(true);
            setShowSlices(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % loadingWords.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
    };
  }, []);

  useEffect(() => {
    if (showSlices && onComplete) {
      setTimeout(() => onComplete(), 2200);
    }
  }, [showSlices, onComplete]);

  const slicePanels = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="fixed bg-[#EB6E00] inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Loader content */}
      <div
        className={`relative z-10 text-center transition-opacity duration-500 ${
          isComplete ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-8 h-12">
          <p className="text-2xl lg:text-3xl text-white font-medium">
            <span className="animate-pulse">{loadingWords[currentWord]}</span>
            <span className="text-white animate-bounce ml-2">EXPERIENCES</span>
          </p>
        </div>

        <div className="w-80 h-1 bg-white rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-black rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Unique diagonal slice reveal */}
      {showSlices && (
        <div className="absolute inset-0 z-20">
          {slicePanels.map((index) => (
            <motion.div
              key={index}
              className="absolute bg-[#EB6E00]"
              style={{
                top: `${(index * 100) / slicePanels.length}%`,
                width: "100%",
                height: `${100 / slicePanels.length}%`,
                transformOrigin: "left center",
                clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)", // diagonal slice
              }}
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1],
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Preloader;
