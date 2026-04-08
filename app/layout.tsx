import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo-black", display: "swap" });

export const metadata: Metadata = {
  title: "Ishan Kishan — The Southpaw Storm",
  description: "Personal portfolio of Ishan Kishan, left-hand batsman and wicketkeeper.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${archivoBlack.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to content
        </a>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
