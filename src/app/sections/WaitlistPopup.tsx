import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { onOpenWaitlist } from "../../lib/waitlist";
import { supabase } from "../../lib/supabase";
import lemonStack from "../../imports/waitlist/lemon-stack.png";

// Task 1 — "Join the waitlist" popup (Figma node 1123-1136) with its success
// state (node 1123-1121). Mounted once at the app root (main.tsx); opened from
// the navbar / footer via openWaitlist(). Submissions land in public.waitlist_leads
// (see the waitlist_leads migration) and surface in the admin "Waitlist leads" tab.

type FieldKey = "name" | "organization" | "email";
type FieldErrors = Partial<Record<FieldKey, string>>;

const ARCHIVO_BLACK = "'Archivo Black', system-ui, sans-serif";

// Flowing yellow ribbons (the exact Figma export was a single self-crossing path
// that looped messily through the heading; these clean curves frame the text).
function Ribbons() {
  return (
    <svg
      viewBox="0 0 400 440"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <g stroke="#FFD950" fill="none" strokeLinecap="round">
        {/* sweep across the top */}
        <path d="M -60 96 C 120 22, 300 70, 500 -30" strokeWidth="40" opacity="0.9" />
        {/* ribbon curving down the right side */}
        <path d="M 250 -40 C 330 150, 250 300, 360 500" strokeWidth="40" opacity="0.85" />
      </g>
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const labelCss = "font-display text-[15px] font-medium text-[#111112]/80";
const inputCss =
  "h-12 w-full rounded-full border-2 bg-white px-5 font-display text-[15px] text-[#212121] outline-none transition placeholder:text-[#212121]/30";
const cls = (err?: string) =>
  `${inputCss} ${err ? "border-[#f46c6c] focus:border-[#e0483f]" : "border-[#212121]/10 focus:border-[#212121]/35"}`;

export default function WaitlistPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Open when any "Join the waitlist" trigger fires.
  useEffect(() => onOpenWaitlist(() => setOpen(true)), []);

  const close = () => setOpen(false);

  // Reset the form a moment after closing so a reopened popup is fresh (but the
  // success/exit isn't visibly wiped mid-fade).
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => {
        document.body.style.overflow = "";
      };
    }
    const t = setTimeout(() => {
      setDone(false);
      setName("");
      setOrganization("");
      setEmail("");
      setMessage("");
      setErrors({});
      setBanner("");
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const clearErr = (k: FieldKey) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!organization.trim()) e.organization = "Please enter your organisation.";
    if (!email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "That doesn’t look like a valid email.";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fe = validate();
    if (Object.keys(fe).length) {
      setErrors(fe);
      return;
    }
    setErrors({});
    setBanner("");
    setBusy(true);
    const { data, error } = await supabase.rpc("submit_waitlist_lead", {
      p_name: name,
      p_organization: organization,
      p_email: email,
      p_message: message,
    });
    setBusy(false);
    if (error || !data?.ok) {
      setBanner("Something went wrong — please try again.");
      return;
    }
    setDone(true);
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onMouseDown={close}
      role="dialog"
      aria-modal="true"
      aria-label="Join the waitlist"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-[1000px] overflow-hidden rounded-[32px] bg-white shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)]"
      >
        {/* close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={`absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full transition ${
            done ? "text-[#111112]/60 hover:bg-black/10" : "text-[#111112]/50 hover:bg-black/5"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {done ? (
          /* ---------------- success state (node 1123-1121) ---------------- */
          <div className="relative min-h-[380px] overflow-hidden bg-[#FFE94D] px-6 py-16 text-center sm:px-10">
            {/* lemon slices framing the corners */}
            <img src={lemonStack} alt="" aria-hidden className="pointer-events-none absolute -left-16 -top-10 w-[190px] -rotate-[18deg] select-none sm:-left-10 sm:w-[220px]" draggable={false} />
            <img src={lemonStack} alt="" aria-hidden className="pointer-events-none absolute -right-16 -top-8 w-[180px] rotate-[150deg] select-none sm:-right-8 sm:w-[210px]" draggable={false} />
            <img src={lemonStack} alt="" aria-hidden className="pointer-events-none absolute -bottom-14 -left-12 w-[180px] rotate-[24deg] select-none sm:-bottom-16 sm:w-[210px]" draggable={false} />
            <img src={lemonStack} alt="" aria-hidden className="pointer-events-none absolute -bottom-12 -right-14 w-[190px] -rotate-[150deg] select-none sm:-right-6 sm:w-[220px]" draggable={false} />

            <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center py-6">
              <h2
                style={{ fontFamily: ARCHIVO_BLACK }}
                className="text-[clamp(1.9rem,5.5vw,3.25rem)] uppercase leading-[0.98] tracking-[-0.02em] text-[#1a1a1a]"
              >
                You’re officially on the juice list!
              </h2>
              <p className="mt-4 font-display text-[16px] leading-[1.5] text-[#33312a] sm:text-[17px]">
                Thanks for dropping by. We’ll make sure you’re the first to hear from us.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-7 flex items-center gap-2 rounded-full border border-[#111112] py-1.5 pl-5 pr-1.5 transition hover:bg-black/5"
              >
                <span className="font-display text-[15px] font-bold text-[#111112]">Explore more about Juice</span>
                <span className="grid size-8 place-items-center rounded-full bg-[#111112] text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* ---------------- form state (node 1123-1136) ---------------- */
          <div className="flex flex-col lg:flex-row">
            {/* coral panel with ribbons + heading. On narrow screens it's a top
                banner (fixed min-height so the ribbon keeps a sane aspect); on lg it
                becomes the left column and stretches to the form's height. */}
            <div className="relative flex min-h-[168px] shrink-0 items-center overflow-hidden bg-[#f46c6c] px-7 py-8 sm:min-h-[200px] lg:min-h-0 lg:w-[40%] lg:rounded-r-[44px] lg:px-10 lg:py-14">
              <Ribbons />
              <h2
                style={{ fontFamily: ARCHIVO_BLACK }}
                className="relative z-10 text-[clamp(1.9rem,6vw,3.4rem)] uppercase leading-[0.95] tracking-[-0.02em] text-white"
              >
                Get ahead of the curve
              </h2>
            </div>

            {/* form */}
            <form onSubmit={submit} noValidate className="flex-1 px-6 py-8 sm:px-9 sm:py-10 lg:px-11">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="wl-name" className={labelCss}>Name</label>
                  <input
                    id="wl-name"
                    ref={firstFieldRef}
                    className={cls(errors.name)}
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearErr("name"); }}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {errors.name && <span className="font-display text-[13px] text-[#e0483f]">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="wl-org" className={labelCss}>Organisation</label>
                  <input
                    id="wl-org"
                    className={cls(errors.organization)}
                    value={organization}
                    onChange={(e) => { setOrganization(e.target.value); clearErr("organization"); }}
                    placeholder="Enter your organisation’s name"
                    autoComplete="organization"
                  />
                  {errors.organization && <span className="font-display text-[13px] text-[#e0483f]">{errors.organization}</span>}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:max-w-[calc(50%-12px)]">
                <label htmlFor="wl-email" className={labelCss}>Email</label>
                <input
                  id="wl-email"
                  type="email"
                  className={cls(errors.email)}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                  placeholder="Enter your business email"
                  autoComplete="email"
                />
                {errors.email && <span className="font-display text-[13px] text-[#e0483f]">{errors.email}</span>}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="wl-msg" className={labelCss}>What can Juice AI do for you?</label>
                <input
                  id="wl-msg"
                  className={cls()}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="insights / ideas / creative generation / anything else?"
                />
              </div>

              {banner && (
                <p className="mt-4 rounded-lg bg-[#fff0f0] px-4 py-2.5 font-display text-[13px] text-[#c0392b]">{banner}</p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-7 flex items-center gap-2 rounded-full border border-[#111112] py-1.5 pl-5 pr-1.5 transition hover:bg-black/5 disabled:opacity-60"
              >
                <span className="font-display text-[15px] font-bold text-[#111112]">{busy ? "Submitting…" : "Submit"}</span>
                <span className="grid size-8 place-items-center rounded-full bg-[#111112] text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
