"use client";
import React, { useEffect } from "react";

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    // Replace 3 seconds with your actual video length, or use the video's "ended" event.
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        overflow: "hidden",
        background: "#000"
      }}
    >
      <video
        src="/PACO_PRELOADER.mp4"
        autoPlay
        muted
        playsInline
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: "block"
        }}
        onEnded={() => {
          if (onComplete) onComplete();
        }}
      />
    </div>
  );
};

export default Preloader;
