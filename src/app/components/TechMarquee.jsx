import Image from "next/image";
import GoogleAdsLogo from "../assets/GoogleAdsLogo.png";
import MetaLogo from "../assets/MetaLogo.png";
import HostingerLogo from "../assets/HostingerLogo.png";
import GoogleAnalyticsLogo from "../assets/GoogleAnalyticsLogo.png";
import RazorpayLogo from "../assets/RazorpayLogo.png";
import AWSLogo from "../assets/AWSLogo.png";
import NextjsLogo from "../assets/NextjsLogo.png";

const techItems = [
  { name: "Meta", logo: MetaLogo },
  { name: "Hostinger", logo: HostingerLogo },
  { name: "Google Ads", logo: GoogleAdsLogo },
  { name: "Google Analytics", logo: GoogleAnalyticsLogo },
  { name: "Razorpay", logo: RazorpayLogo },
  { name: "AWS", logo: AWSLogo },
  { name: "Next.js", logo: NextjsLogo },
];

const rows = [
  { items: techItems, reverse: false },
  { items: [...techItems].reverse(), reverse: true },
];

// Two rows of logo pills scrolling in opposite directions; hovering a row
// pauses it, hovering a pill brings its logo into full colour.
export default function TechMarquee() {
  return (
    <section id="tech" data-snap className="w-full py-16 md:py-24">
      <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-10 md:mb-14 px-4">
        Technologies we build and grow on
      </h2>

      <div className="flex flex-col gap-4 md:gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="group/row overflow-hidden py-2">
            <div
              className="marquee-track flex w-max items-center group-hover/row:[animation-play-state:paused]"
              style={{
                animation: `marquee ${rowIndex === 0 ? 32 : 38}s linear infinite`,
                animationDirection: row.reverse ? "reverse" : "normal",
              }}
            >
              {[...row.items, ...row.items].map((item, index) => (
                <div
                  key={index}
                  aria-hidden={index >= row.items.length ? "true" : undefined}
                  className="group/pill flex items-center gap-3 shrink-0 mr-4 md:mr-6 rounded-full border-2 border-black dark:border-white bg-white px-5 py-3 md:px-7 md:py-4 shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#FFFFFF] transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#EB6E00]"
                >
                  <Image
                    src={item.logo}
                    width={32}
                    height={32}
                    alt=""
                    loading="lazy"
                    className="size-7 md:size-8 object-contain grayscale transition-[filter] duration-300 group-hover/pill:grayscale-0"
                  />
                  <span className="text-black font-semibold text-lg md:text-2xl whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
