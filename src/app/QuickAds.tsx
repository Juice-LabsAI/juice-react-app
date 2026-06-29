import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Hero from "./sections/quick-ads/Hero";
import Carousel from "./sections/quick-ads/Carousel";
import Signals from "./sections/quick-ads/Signals";
import Stats from "./sections/quick-ads/Stats";
import Formats from "./sections/quick-ads/Formats";
import Adapt from "./sections/quick-ads/Adapt";
import Compare from "./sections/quick-ads/Compare";

export default function QuickAds() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Carousel />
        <Signals />
        <Stats />
        <Formats />
        <Adapt />
        <Compare />
      </main>
      <Footer lowCan />
    </div>
  );
}
