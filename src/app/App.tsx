import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import TrustedLogos from "./sections/TrustedLogos";
import Campaign from "./sections/Campaign";
import Creatives from "./sections/Creatives";
import Creativity from "./sections/Creativity";
import Features from "./sections/Features";
import AgenticTeam from "./sections/AgenticTeam";
import TwoParts from "./sections/TwoParts";
import FAQ from "./sections/FAQ";
import Jam from "./sections/Jam";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <TrustedLogos />
        <Campaign />
        <Creatives />
        <Creativity />
        <Features />
        <AgenticTeam />
        <TwoParts />
        <FAQ />
        <Jam />
      </main>
      <Footer />
    </div>
  );
}
