import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Hero from "./sections/d2c/Hero";
import Steps from "./sections/d2c/Steps";
import InAction from "./sections/d2c/InAction";
import CTA from "./sections/d2c/CTA";

export default function D2C() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Steps />
        <InAction />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
