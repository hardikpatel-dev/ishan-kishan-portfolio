import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Stats } from "@/components/sections/Stats";
import { Moments } from "@/components/sections/Moments";
import { Teams } from "@/components/sections/Teams";
import { Gallery } from "@/components/sections/Gallery";
import { News } from "@/components/sections/News";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Journey />
        <Stats />
        <Moments />
        <Teams />
        <Gallery />
        <News />
      </main>
      <Footer />
    </>
  );
}
