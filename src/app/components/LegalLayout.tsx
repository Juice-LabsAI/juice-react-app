import { useEffect, type ReactNode } from "react";
import Nav from "../sections/Nav";
import Footer from "../sections/Footer";

/**
 * Shared layout for the long-form legal pages (Terms & Conditions, Privacy
 * Policy). Wraps the site Nav + Footer around a readable prose column. The
 * typography is handled by a scoped `.legal-prose` stylesheet so the page
 * bodies can be written as clean semantic HTML (h2/h3/p/ul/li/strong).
 */
const LEGAL_CSS = `
.legal-prose {
  color: #3f3f46;
  font-family: var(--font-body), sans-serif;
  font-size: 16px;
  line-height: 1.75;
}
.legal-prose > *:first-child { margin-top: 0; }
.legal-prose h2 {
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #1a1a1a;
  margin: 56px 0 16px;
  scroll-margin-top: 110px;
}
.legal-prose h3 {
  font-family: var(--font-display), sans-serif;
  font-weight: 600;
  font-size: clamp(17px, 1.6vw, 19px);
  line-height: 1.4;
  color: #1a1a1a;
  margin: 32px 0 10px;
}
.legal-prose p { margin: 0 0 18px; }
.legal-prose ul { margin: 0 0 18px; padding-left: 24px; list-style: disc; }
.legal-prose ul ul { margin: 10px 0 6px; list-style: circle; }
.legal-prose li { margin: 0 0 9px; padding-left: 4px; }
.legal-prose li::marker { color: #8656f4; }
.legal-prose strong { font-weight: 600; color: #1a1a1a; }
.legal-prose a { color: #601db4; text-decoration: underline; text-underline-offset: 2px; }
.legal-prose a:hover { color: #8656f4; }
`;

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  // Long pages: always open at the top rather than inheriting scroll position.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-white">
      <style>{LEGAL_CSS}</style>
      <Nav />
      <main>
        {/* Header */}
        <header className="border-b border-[#ece9f4] bg-[#faf8ff]">
          <div className="container-juice pt-[132px] pb-14 sm:pt-[160px] sm:pb-16">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#8656f4]">
              Legal
            </span>
            <h1 className="mt-4 font-display text-[clamp(34px,6vw,60px)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-[#1a1a1a]">
              {title}
            </h1>
            <p className="mt-5 font-body text-sm text-[#6b6b76]">
              Last updated: {lastUpdated}
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="container-juice py-14 sm:py-20">
          <article className="legal-prose mx-auto max-w-[820px]">{children}</article>
        </div>
      </main>
      <Footer lowCan />
    </div>
  );
}
