"use client";

import { useSyncExternalStore } from "react";

// Ticks every 15 seconds; the server renders "--:--" so hydration matches.
const subscribe = (callback) => {
  const id = setInterval(callback, 15000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 15000);
const getServerMinute = () => null;

export default function LiveClocks({ locations, className = "" }) {
  const tick = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {locations.map((location) => (
        <div key={location.city} className="flex items-baseline gap-2">
          <span className="relative flex size-2 self-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#EB6E00] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-[#EB6E00]" />
          </span>
          <span className="text-sm md:text-base font-medium">{location.city}</span>
          <span className="text-sm md:text-base tabular-nums font-[Public_Sans]">
            {tick === null
              ? "--:--"
              : new Intl.DateTimeFormat("en-AU", {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZone: location.timeZone,
                }).format(tick * 15000)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
            {location.label}
          </span>
        </div>
      ))}
    </div>
  );
}
