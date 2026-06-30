import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";
import { SolutionsMenu, ComingSoonMenu } from "./NavMenus";

type NavLink = { label: string; href?: string; key?: string; menu?: ReactNode };

const LINKS: NavLink[] = [
  { label: "Product", key: "product", menu: <ComingSoonMenu label="Product" /> },
  { label: "Solutions", key: "solutions", menu: <SolutionsMenu /> },
  { label: "Resources", key: "resources", menu: <ComingSoonMenu label="Resources" /> },
  { label: "Pricing", href: "#twoparts" },
];

function Caret({ open }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 3 4-3" stroke="#444" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Wordmark() {
  const { pathname } = useLocation();
  // On the home page keep the smooth scroll-to-top; on every other route the
  // logo navigates back to the homepage.
  if (pathname === "/") {
    return (
      <a href="#top" className="block select-none" aria-label="Juice home">
        <Logo className="h-[50px] w-auto" />
      </a>
    );
  }
  return (
    <Link to="/" className="block select-none" aria-label="Juice home">
      <Logo className="h-[50px] w-auto" />
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [menu, setMenu] = useState<string | null>(null); // open desktop dropdown key
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // hover bridge: keep the menu open while moving between the trigger and panel
  const openMenu = (key: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };

  const active = LINKS.find((l) => l.key === menu);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open || menu
          ? "border-b border-black/5 bg-white/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-juice relative flex h-[86px] items-center justify-between">
        <Wordmark />

        {/* desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[42px] lg:flex">
          {LINKS.map((l) =>
            l.menu ? (
              <li key={l.label} onMouseEnter={() => openMenu(l.key!)} onMouseLeave={closeSoon}>
                <button
                  type="button"
                  aria-expanded={menu === l.key}
                  aria-haspopup="true"
                  onClick={() => (menu === l.key ? setMenu(null) : openMenu(l.key!))}
                  onFocus={() => openMenu(l.key!)}
                  className="flex items-center gap-2 font-display text-[16px] font-bold text-[#444] transition-opacity hover:opacity-70"
                >
                  {l.label}
                  <Caret open={menu === l.key} />
                </button>
              </li>
            ) : (
              <li key={l.label} onMouseEnter={() => setMenu(null)}>
                <a
                  href={l.href}
                  className="font-display text-[16px] font-bold text-[#444] transition-opacity hover:opacity-70"
                >
                  {l.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden rounded-full bg-[#333] px-6 py-[15px] font-display text-[16px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03] sm:inline-block"
          >
            Join the waitlist
          </a>

          {/* hamburger (mobile / tablet) */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
          >
            <div className="relative h-[14px] w-[20px]">
              <span className={`absolute left-0 block h-[2px] w-full rounded bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 block h-[2px] w-full rounded bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* desktop dropdown panel */}
      <AnimatePresence>
        {active?.menu && (
          <motion.div
            key={active.key}
            onMouseEnter={() => openMenu(active.key!)}
            onMouseLeave={closeSoon}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-[80px] hidden w-[min(1320px,calc(100vw-32px))] -translate-x-1/2 lg:block"
          >
            <div className="rounded-2xl border border-white/5 bg-[#202224] p-9 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
              {active.menu}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-md lg:hidden"
          >
            <ul className="container-juice flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href ?? "#"}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 font-body text-lg font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#waitlist"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-ink px-6 py-3 text-center font-display text-base font-bold text-white"
                >
                  Join the waitlist
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
