import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Instrument_Sans, Martian_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import "./home.css";

/* Display, body and mono: the three voices of the v2 design. Self-hosted by
   next/font, so the server-rendered HTML ships with the font already resolved. */
const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dynamic notch",
    "dynamic island for windows",
    "windows 11 notch",
    "desktop overlay",
    "clipboard manager",
    "app launcher",
    "quick notes",
    "notification centre",
    "system monitor",
    "multi monitor",
    "Tauri",
    "Crest",
  ],
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${familjen.variable} ${instrument.variable} ${martian.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
