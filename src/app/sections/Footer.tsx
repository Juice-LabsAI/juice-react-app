import Logo from "./Logo";
import can from "../../imports/5Jun/can.png";

const BUTTONS = ["Join the Waitlist", "About us", "Get a Demo"];

export default function Footer({ lowCan = false }: { lowCan?: boolean }) {
  return (
    <footer id="waitlist" className="relative bg-white">
      {/* COLD PRESSED CLARITY can — far right. By default it overlaps up into the
          section above; `lowCan` keeps it tucked at the footer corner for pages
          whose preceding section has content near its bottom edge. */}
      <img
        src={can}
        alt="Juice — Cold Pressed Clarity can"
        className={`pointer-events-none absolute right-[2%] z-20 w-[clamp(210px,28vw,440px)] rotate-[13deg] select-none lg:right-[4%] ${
          lowCan ? "-top-[clamp(60px,7vw,150px)]" : "-top-[clamp(180px,25vw,440px)]"
        }`}
        draggable={false}
      />

      <div className="relative overflow-hidden rounded-t-[32px] bg-[#601db4] px-6 pt-16 pb-10 sm:px-12 lg:min-h-[600px] lg:px-[88px] lg:pt-[90px]">
        {/* GOT JUICE watermark, bottom-left, behind */}
        <span
          aria-hidden
          style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.01em" }}
          className="pointer-events-none absolute -bottom-3 left-0 z-0 w-full select-none whitespace-nowrap text-center text-[clamp(56px,16vw,240px)] uppercase leading-[0.8] text-[#8948de] sm:left-[56px] sm:text-left"
        >
          got juice?
        </span>

        {/* logo + description, top-left */}
        <div className="relative z-10 max-w-[540px]">
          <Logo fill="#F296AF" className="h-[52px] w-auto sm:h-[64px]" />
          <p className="mt-7 font-display text-xl leading-[1.5] text-white sm:text-2xl lg:text-[32px]">
            We are team that brings deep AI expertise, coupled with the craft of building
            products that elevate the experience.
          </p>
        </div>

        {/* buttons + links + copyright, bottom-right */}
        <div className="relative z-10 mt-16 flex flex-col gap-5 lg:mt-28 lg:items-end">
          <div className="flex flex-wrap gap-4">
            {BUTTONS.map((b) => (
              <a
                key={b}
                href="#waitlist"
                className="rounded-full bg-[#bba0ff] px-6 py-3.5 font-display text-sm font-bold leading-none text-[#444] transition-transform duration-200 hover:scale-[1.04]"
              >
                {b}
              </a>
            ))}
          </div>
          <div className="flex gap-8 font-display text-base text-white/80">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
          <div className="flex flex-col gap-1 font-display text-[13px] text-white/50 lg:items-end">
            <span>juicelabs.ai 2025 @ All Rights Reserved.</span>
            <span>
              Designed by{" "}
              <a href="https://www.humanx.io/" target="_blank" rel="noreferrer" className="hover:text-white">
                HumanX
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
