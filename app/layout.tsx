import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrderDrawer } from "@/components/OrderDrawer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--f-display",
});

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--f-serif",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--f-sans",
});

export const metadata: Metadata = {
  title: "Sampson Grace Prints · Printing Faith, Sharing Grace!",
  description:
    "Heirloom Christian keepsakes and custom printing in Punjab: Bible verse photo frames, ceramic mugs, T-shirts, caps, keychains, baptism & wedding favors, and Christmas gifts.",
};

export const viewport: Viewport = {
  themeColor: "#F4EBDC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;
  return (
    <html lang="en" className={fonts}>
      <body>
        <svg className="sr-svg-defs" aria-hidden="true">
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div className="paper-grain-layer" aria-hidden="true" />
        <Providers>
          <Header />
          <OrderDrawer />
          <main className="main-shell">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
