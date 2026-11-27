import type { Metadata, Viewport } from "next";
import { Lato, Noto_Sans_Devanagari, Noto_Sans_Gurmukhi, Noto_Serif_Devanagari, Noto_Serif_Gurmukhi, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], style: ["normal", "italic"], variable: "--f-serif" });
const sans = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-sans" });
const devaSerif = Noto_Serif_Devanagari({ subsets: ["devanagari"], weight: ["600"], variable: "--f-deva-serif" });
const devaSans = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "700"], variable: "--f-deva-sans" });
const guruSerif = Noto_Serif_Gurmukhi({ subsets: ["gurmukhi"], weight: ["600"], variable: "--f-guru-serif" });
const guruSans = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], weight: ["400", "700"], variable: "--f-guru-sans" });

export const metadata: Metadata = {
  title: "Sampson Grace Prints · Printing Faith, Sharing Grace!",
  description: "Christian gifts and personalized printing in Punjab: T-shirts, mugs, caps, keychains, Bible verse photo frames and Christmas gifts.",
};

export const viewport: Viewport = { themeColor: "#f8f3e8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [serif, sans, devaSerif, devaSans, guruSerif, guruSans].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <Providers>
          <Header />
          <main className="wrap">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
