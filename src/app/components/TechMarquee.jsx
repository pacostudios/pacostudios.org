import Image from "next/image";
import GoogleAdsLogo from "../assets/GoogleAdsLogo.png";
import MetaLogo from "../assets/MetaLogo.png";
import HostingerLogo from "../assets/HostingerLogo.png";
import GoogleAnalyticsLogo from "../assets/GoogleAnalyticsLogo.png";
import RazorpayLogo from "../assets/RazorpayLogo.png";
import AWSLogo from "../assets/AWSLogo.png";
import NextjsLogo from "../assets/NextjsLogo.png";

const techItems = [
  {
    name: "Meta",
    logo: MetaLogo,
  },
  {
    name: "Hostinger",
    logo: HostingerLogo,
  },
  {
    name: "Google Ads",
    logo: GoogleAdsLogo,
  },
  {
    name: "Google Analytics",
    logo: GoogleAnalyticsLogo,
  },
  {
    name: "Razorpay",
    logo: RazorpayLogo,
  },
  {
    name: "AWS",
    logo: AWSLogo,
  },
  {
    name: "Next.js",
    logo: NextjsLogo,
  },
];

const allItems = [...techItems, ...techItems];

export default function TechMarquee() {
  return (
    <div className="w-full bg-white py-18">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
        Technologies We Build And Grow On
      </h2>

      <div className="overflow-hidden relative w-full">
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        <div
          className="flex items-center"
          style={{
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {allItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mx-12 shrink-0">
              <Image
                src={item.logo}
                // className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                width={40}
                height={40}
                alt=""
                loading="lazy"
                quality={70}
              />
              <span className="text-gray-700 font-semibold text-2xl whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
