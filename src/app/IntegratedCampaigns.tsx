import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Hero from "./sections/integrated-campaigns/Hero";
import Positioning from "./sections/integrated-campaigns/Positioning";
import Manifesto from "./sections/integrated-campaigns/Manifesto";
import Outcomes from "./sections/integrated-campaigns/Outcomes";
import Steps from "./sections/integrated-campaigns/Steps";
import Spread from "./sections/integrated-campaigns/Spread";
import Sparring from "./sections/integrated-campaigns/Sparring";
import Formats from "./sections/integrated-campaigns/Formats";
import WhySwitch from "./sections/integrated-campaigns/WhySwitch";
import Proof from "./sections/integrated-campaigns/Proof";
import UnderHood from "./sections/integrated-campaigns/UnderHood";
import CTA from "./sections/integrated-campaigns/CTA";

export default function IntegratedCampaigns() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Manifesto />
        <Outcomes />
        <Steps />
        <Spread />
        <Sparring />
        <Formats />
        <WhySwitch />
        <Proof />
        <UnderHood />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
