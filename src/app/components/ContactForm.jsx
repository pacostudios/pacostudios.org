"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { QUOTE_SERVICE_EVENT } from "@/lib/quote";

// Popular country codes, with our two markets first
const countryCodes = [
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
];

// Visitors in India get +91 by default, everyone else +61. The server always
// renders +61; the browser swaps in its own value after hydration.
const subscribeNoop = () => () => {};
const getDefaultCountryCode = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta" ? "+91" : "+61";
};
const getServerCountryCode = () => "+61";

const fieldClass =
  "px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-600 rounded border-2 border-transparent outline-none text-sm md:text-base transition-colors duration-150 focus:border-black";
const inputClass = `w-full ${fieldClass}`;

export default function ContactForm({ services = [] }) {
  const [phone, setPhone] = useState("");
  const defaultCountryCode = useSyncExternalStore(
    subscribeNoop,
    getDefaultCountryCode,
    getServerCountryCode
  );
  const [selectedCountryCode, setCountryCode] = useState(null);
  const countryCode = selectedCountryCode ?? defaultCountryCode;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionError, setSubmissionError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  // "Get a quote for …" buttons elsewhere on the page pre-select a service
  useEffect(() => {
    const handleQuote = (e) => {
      const id = e.detail?.service;
      if (!id) return;
      setSubmissionStatus((status) => (status === "success" ? null : status));
      setSelectedServices((current) => (current.includes(id) ? current : [...current, id]));
    };
    window.addEventListener(QUOTE_SERVICE_EVENT, handleQuote);
    return () => window.removeEventListener(QUOTE_SERVICE_EVENT, handleQuote);
  }, []);

  const toggleService = (id) =>
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("sending");
    setSubmissionError("");

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
          services: services
            .filter((service) => selectedServices.includes(service.id))
            .map((service) => service.title),
          website: honeypot,
        }),
      });

      if (res.ok) {
        setSubmittedName(name.trim().split(" ")[0]);
        setSubmissionStatus("success");
        setPhone("");
        setCountryCode(null);
        setEmail("");
        setName("");
        setSelectedServices([]);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmissionError(data.error || "");
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div
      id="contact-form"
      className="w-full max-w-lg bg-white text-black rounded-md border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000000]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {submissionStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-start gap-5 py-6"
            role="status"
          >
            <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                fill="#EB6E00"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <motion.path
                d="M19 33 l9 9 l17 -19"
                fill="none"
                stroke="#000"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              />
            </svg>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Thanks{submittedName ? `, ${submittedName}` : ""}!
            </h3>
            <p className="text-base md:text-lg font-[Public_Sans] text-pretty">
              Your message is on its way. We&apos;ll reply with a quote within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmissionStatus(null)}
              className="text-base font-semibold underline underline-offset-4 decoration-2 decoration-[#EB6E00] hover:text-[#EB6E00] cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Name"
              aria-label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
              maxLength={254}
            />
            {/* Honeypot: hidden from people, bots fill it in */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country code"
                className={`${fieldClass} px-3 min-w-[100px]`}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code} className="uppercase">
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                aria-label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className={`flex-1 min-w-0 ${fieldClass}`}
                required
                maxLength={15}
              />
            </div>
            {services.length > 0 && (
              <fieldset>
                <legend className="text-sm text-black/70 mb-2">What do you need? (optional)</legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => {
                    const selected = selectedServices.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(service.id)}
                        className={`px-3 py-1.5 text-sm rounded-full border-2 border-black transition-colors duration-150 cursor-pointer ${
                          selected ? "bg-[#EB6E00] text-black" : "bg-transparent text-black hover:bg-black/5"
                        }`}
                      >
                        {service.title}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}
            <button
              type="submit"
              disabled={submissionStatus === "sending"}
              className="group/send w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-3.5 font-semibold text-base rounded shadow-[4px_4px_0px_#EB6E00] transition-[translate,box-shadow,background-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#EB6E00] disabled:bg-gray-500 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 cursor-pointer"
            >
              {submissionStatus === "sending" ? "Sending..." : "Send"}
              {submissionStatus !== "sending" && (
                <ArrowRight className="size-5 transition-transform duration-200 group-hover/send:translate-x-1" />
              )}
            </button>
            {submissionStatus === "error" && (
              <p className="text-red-700 font-medium" role="alert">
                {submissionError || "Something went wrong. Please try again."}
              </p>
            )}
            <p className="text-sm text-black/60 font-[Public_Sans]">
              We reply with a quote within 24 hours.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
