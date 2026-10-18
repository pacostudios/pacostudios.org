"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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

const inputClass =
  "w-full px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-500 border-none outline-none text-sm";

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

  // "Get a quote for …" buttons elsewhere on the page pre-select a service
  useEffect(() => {
    const handleQuote = (e) => {
      const id = e.detail?.service;
      if (!id) return;
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
    <>
      <form id="contact-form" onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
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
            className="px-3 py-3 text-black bg-[#FFE9D1] border-none outline-none text-sm min-w-[100px]"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code} className="uppercase">
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            aria-label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="flex-1 px-4 py-3 text-black bg-[#FFE9D1] placeholder-gray-500 border-none outline-none text-sm"
            required
            maxLength={15}
          />
        </div>
        {services.length > 0 && (
          <fieldset>
            <legend className="text-sm text-white mb-2">What do you need? (optional)</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => {
                const selected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service.id)}
                    className={`px-3 py-1.5 text-sm border-2 border-black transition-colors duration-150 cursor-pointer ${
                      selected ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/10"
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
        <p className="text-black font-medium mt-2">
          {submissionError || "Something went wrong. Please try again."}
        </p>
      )}
    </>
  );
}
