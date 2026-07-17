import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Hero from "./sections/creators/Hero";
import Positioning from "./sections/creators/Positioning";
import Chemistry from "./sections/creators/Chemistry";
import PlanBoard from "./sections/creators/PlanBoard";
import Cascade from "./sections/creators/Cascade";
import Governance from "./sections/creators/Governance";
import CreatorSignals from "./sections/creators/CreatorSignals";
import HowItWorks from "./sections/creators/HowItWorks";
import Outputs from "./sections/creators/Outputs";
import WhyNow from "./sections/creators/WhyNow";
import Engine from "./sections/creators/Engine";
import SocialProof from "./sections/creators/SocialProof";
import UnderTheHood from "./sections/creators/UnderTheHood";
import FinalCTA from "./sections/creators/FinalCTA";

export default function Creators() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Chemistry />
        <PlanBoard />
        <Cascade />
        <Governance />
        <CreatorSignals />
        <HowItWorks />
        <Outputs />
        <WhyNow />
        <Engine />
        <SocialProof />
        <UnderTheHood />
        <FinalCTA />
      </main>
      <Footer lowCan />
    </div>
  );
}
