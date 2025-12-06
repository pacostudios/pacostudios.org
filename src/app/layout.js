import { Geist, Geist_Mono, Montserrat, Public_Sans } from "next/font/google";
import { ReactLenis } from "lenis/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const publicsans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paco Studios | Web Design, Branding & UX/UI in Melbourne",
  description:
    " We build websites, brands, and 3D experiences for startups and businesses in Melbourne and beyond. Paco Studios makes digital simple.",
  keywords: [
    "web development",
    "3D development",
    "website design",
    "UI/UX",
    "digital experiences",
    "Paco Studios",
    "Paco Studio",
    "Paco",
    "studios",
    "web",
    "development",
    "3D",
    "design",
    "UI/UX",
    "digital",
    "experiences",
    "modern",
    "partner",
    "pixel-perfect",
    "immersive",
    "websites",
  ],
  openGraph: {
    title: "Paco Studios | Web Design, Branding & UX/UI in Melbourne",
    description:
      "From pixel-perfect websites to immersive 3D experiences — Paco Studios is your modern development partner.",
    url: "https://pacostudios.org",
    siteName: "Paco Studios",
    images: [
      {
        url: "https://pacostudios.org/paco.png",
        width: 800,
        height: 600,
        alt: "Paco Studios Logo",
      },
    ],
    locale: "en_US",
    alternateLocale: ["en_IN", "en_AU"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paco Studios | Web Design, Branding & UX/UI in Melbourne",
    description:
      "From pixel-perfect websites to immersive 3D experiences — Paco Studios is your modern development partner.",
    images: ["https://pacostudios.org/paco.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [{ rel: "mask-icon", url: "/paco.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <ReactLenis root>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/favicon-16x16.png"
            type="image/png"
            sizes="16x16"
          />
          <link
            rel="icon"
            href="/favicon-32x32.png"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body
          className={`${montserrat.variable} ${publicsans.variable} antialiased`}
        >
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Paco Studios",
                url: "https://pacostudios.org/",
                logo: "https://pacostudios.org/paco.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "‪+61-0470541254‬",
                  contactType: "customer service",
                },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: "https://pacostudios.org/",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://pacostudios.org/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
        </body>
      </html>
    </ReactLenis>
  );
}
