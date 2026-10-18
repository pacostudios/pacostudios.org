"use client";
import React, { useEffect, useRef } from 'react';

const PRELOADER_DURATION_MS = 1000;
const SEEN_KEY = 'paco-preloader-seen';

function hasSeenPreloader() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function Preloader2({ onComplete }) {
  const containerRef = useRef(null);

  // This effect ensures proper viewport sizing on iOS Safari devices.
  useEffect(() => {
    function setVhUnit() {
      // Get the viewport height and set --vh custom property
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      // Also set the element's height if present
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    }
    setVhUnit();
    window.addEventListener('resize', setVhUnit);
    return () => window.removeEventListener('resize', setVhUnit);
  }, []);

  // The parent decides when to unmount; we just say when we're done.
  // Finish right away on repeat visits in the same session, and with reduced
  // motion (the preloader is hidden by CSS then).
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const skip = reduceMotion || hasSeenPreloader();
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      onComplete?.();
    }, skip ? 0 : PRELOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <style>
        {`
          .preloader2-center-container {
            background: #fff;
            position: fixed;
            inset: 0;
            width: 100vw;
            /* 
              Prefer using 100dvh for new browsers, fallback to 
              100vh (which is buggy on iOS Safari), and finally use the custom --vh variable set above.
              This ensures maximum compatibility and full screen coverage on all mobile browsers, including Safari on iOS.
            */
            height: 100dvh;
            height: 100vh;
            height: calc(var(--vh, 1vh) * 100);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Skip the preloader for people who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .preloader2-center-container {
              display: none;
            }
          }
          .loader {
            width: 150px;
            height: 150px;
            background-color: #EB6E00;
            border-radius: 50%;
            position: relative;
            box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.5) inset,
                        0 5px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }

          .loader:before,
          .loader:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 45%;
            top: -40%;
            background-color: #fff;
            animation: wave 5s linear infinite;
          }

          .loader:before {
            border-radius: 30%;
            background: rgba(255, 255, 255, 0.4);
            animation: wave 5s linear infinite;
          }

          @keyframes wave {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="preloader2-center-container" ref={containerRef}>
        <div className="loader"></div>
      </div>
    </>
  );
}

export default Preloader2;