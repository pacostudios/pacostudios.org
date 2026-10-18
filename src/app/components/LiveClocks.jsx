"use client";

import { useSyncExternalStore } from "react";

// Ticks every 15 seconds; the server renders "--:--" so hydration matches.
const subscribe = (callback) => {
  const id = setInterval(callback, 15000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 15000);
const getServerMinute = () => null;

// Time plus zone abbreviation, e.g. "9:41 am" and "AEDT" (follows daylight saving)
function formatTime(timestamp, { timeZone, locale }) {
  const parts = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).formatToParts(timestamp);
  const zone = parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  const time = parts
    .filter((part) => part.type !== "timeZoneName")
    .map((part) => part.value)
    .join("")
    .trim();
  return { time, zone };
}

export default function LiveClocks({ locations, className = "" }) {
  const tick = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {locations.map((location) => {
        const { time, zone } =
          tick === null ? { time: "--:--", zone: "" } : formatTime(tick * 15000, location);
        return (
          <div key={location.city} className="flex items-baseline gap-2">
            <span className="relative flex size-2 self-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#EB6E00] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-[#EB6E00]" />
            </span>
            <span className="text-sm md:text-base font-medium">{location.city}</span>
            <span className="text-sm md:text-base tabular-nums font-[Public_Sans]">
              {time}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
              {zone}
            </span>
          </div>
        );
      })}
    </div>
  );
}
