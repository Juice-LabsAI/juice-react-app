import { useState } from "react";
import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Creativity from "./sections/Creativity";
import Features from "./sections/Features";
import Jam from "./sections/Jam";
import CountrySelect, { COUNTRIES } from "./components/CountrySelect";
import { supabase } from "../lib/supabase";

const ERROR_MESSAGES: Record<string, string> = {
  missing_fields: "Please fill in all the required fields.",
  invalid_code: "That discount code isn’t valid. Please check or leave it blank.",
  code_used: "This code has already been redeemed.",
};

type Status =
  | { kind: "idle" | "loading" }
  | { kind: "error"; msg: string }
  | { kind: "success"; withCode: boolean };

function formatCode(raw: string) {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  return cleaned.length > 4 ? `${cleaned.slice(0, 4)}-${cleaned.slice(4)}` : cleaned;
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-[13px] font-medium text-[#555]">
        {label}
        {optional && <span className="ml-1 font-normal text-[#aaa]">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-[#e4e0f0] bg-white px-4 font-display text-[15px] text-[#333] outline-none transition placeholder:text-neutral-400 focus:border-[#9165f5] focus:ring-2 focus:ring-[#9165f5]/30";

export default function Redeem() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // every field except the discount code is required
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !organization.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setStatus({ kind: "error", msg: "Please fill in all the required fields correctly." });
      return;
    }
    const dial = (COUNTRIES.find((c) => c.iso === country) ?? COUNTRIES.find((c) => c.iso === "IN")!).dial;
    setStatus({ kind: "loading" });
    const { data, error } = await supabase.rpc("redeem_code", {
      p_first_name: firstName,
      p_last_name: lastName,
      p_country_code: dial,
      p_phone: phone,
      p_email: email,
      p_organization: organization,
      p_code: code,
    });
    if (error) {
      setStatus({ kind: "error", msg: "Something went wrong. Please try again." });
      return;
    }
    if (data?.ok) {
      setStatus({ kind: "success", withCode: code.trim().length > 0 });
    } else {
      setStatus({ kind: "error", msg: ERROR_MESSAGES[data?.error] ?? "Couldn’t complete your registration." });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-white">
      <Nav />
      <main className="bg-[#f5f3ff]">
        <section className="container-juice flex min-h-[calc(100vh-86px)] items-center justify-center py-[120px]">
          <div className="w-full max-w-[560px]">
            {status.kind === "success" ? (
              <div className="rounded-[20px] bg-white p-8 text-center shadow-[0_10px_40px_-12px_rgba(80,40,160,0.18)] sm:p-12">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#ecffe9]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke="#22a447" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h1 className="mt-6 font-body text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.05] text-[#444]">
                  You’re in!
                </h1>
                <p className="mt-3 font-display text-[16px] leading-[1.5] text-[#666]">
                  {status.withCode ? "Your code is redeemed and you’re registered. " : "You’re registered on the Juice platform. "}
                  We’ll be in touch at <span className="font-medium text-[#444]">{email.trim()}</span> with your next
                  steps.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h1 className="font-body text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-[#444]">
                    Redeem your code
                  </h1>
                  <p className="mt-4 max-w-[440px] font-display text-[16px] leading-[1.5] text-[#666]">
                    Enter your details to register on the Juice platform.
                  </p>
                </div>

                <form
                  onSubmit={submit}
                  className="mt-8 flex flex-col gap-5 rounded-[20px] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(80,40,160,0.18)] sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="First name">
                      <input
                        className={inputClass}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        autoComplete="given-name"
                        required
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        className={inputClass}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        autoComplete="family-name"
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      className={inputClass}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@brand.com"
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field label="Phone number">
                    <div className="flex gap-2">
                      <CountrySelect value={country} onChange={setCountry} />
                      <input
                        className={`${inputClass} min-w-0 flex-1`}
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                        placeholder="98765 43210"
                        autoComplete="tel-national"
                        required
                      />
                    </div>
                  </Field>

                  <Field label="Brand / Organization">
                    <input
                      className={inputClass}
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Betty Crocker"
                      autoComplete="organization"
                      required
                    />
                  </Field>

                  <Field label="Discount code" optional>
                    <input
                      className={`${inputClass} font-mono tracking-[0.15em] uppercase`}
                      value={code}
                      onChange={(e) => setCode(formatCode(e.target.value))}
                      placeholder="XXXX-XXXX"
                      maxLength={9}
                      aria-label="Discount code"
                    />
                  </Field>

                  {status.kind === "error" && (
                    <p className="rounded-lg bg-[#fff0f0] px-4 py-3 font-display text-[14px] text-[#c0392b]">
                      {status.msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status.kind === "loading"}
                    className="mt-1 h-12 w-full rounded-full bg-[#333] font-display text-[16px] font-bold text-white transition hover:bg-[#222] disabled:opacity-60"
                  >
                    {status.kind === "loading" ? "Submitting…" : "Register"}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Creativity />
      <Features />
      <Jam />
      <Footer />
    </div>
  );
}
