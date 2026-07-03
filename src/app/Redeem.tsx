import { useState } from "react";
import Nav from "./sections/Nav";
import Footer from "./sections/Footer";
import Creativity from "./sections/Creativity";
import Features from "./sections/Features";
import Jam from "./sections/Jam";
import CountrySelect, { COUNTRIES } from "./components/CountrySelect";
import { supabase } from "../lib/supabase";

// Server-side code errors → friendly, specific copy for the discount code field.
const CODE_ERROR: Record<string, string> = {
  invalid_code: "The discount code you entered is invalid or has already been used.",
  code_used: "This discount code has already been used.",
};

type FieldKey = "firstName" | "lastName" | "email" | "phone" | "organization" | "code";
type FieldErrors = Partial<Record<FieldKey, string>>;

type Status =
  | { kind: "idle" | "loading" }
  | { kind: "error"; msg?: string } // msg = general banner; field errors live in `errors`
  | { kind: "success"; withCode: boolean };

function formatCode(raw: string) {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  return cleaned.length > 4 ? `${cleaned.slice(0, 4)}-${cleaned.slice(4)}` : cleaned;
}

function Field({ label, optional, error, children }: { label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-[13px] font-medium text-[#555]">
        {label}
        {optional && <span className="ml-1 font-normal text-[#aaa]">(optional)</span>}
      </span>
      {children}
      {error && <span className="font-display text-[13px] leading-snug text-[#c0392b]">{error}</span>}
    </label>
  );
}

const inputBase =
  "h-12 w-full rounded-xl border bg-white px-4 font-display text-[15px] text-[#333] outline-none transition placeholder:text-neutral-400 focus:ring-2";
// Field styling flips to a red state when that specific field has an error.
const cls = (err?: string) =>
  `${inputBase} ${err ? "border-[#e0a3a3] focus:border-[#c0392b] focus:ring-[#c0392b]/25" : "border-[#e4e0f0] focus:border-[#9165f5] focus:ring-[#9165f5]/30"}`;

export default function Redeem() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  // Clear a field's error as soon as the user edits it.
  const clearErr = (k: FieldKey) => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!firstName.trim()) e.firstName = "Please enter your first name.";
    if (!lastName.trim()) e.lastName = "Please enter your last name.";
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "That doesn’t look like a valid email address.";
    if (!phone.trim()) e.phone = "Please enter your phone number.";
    if (!organization.trim()) e.organization = "Please enter your brand or organization.";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fe = validate();
    if (Object.keys(fe).length) {
      setErrors(fe);
      setStatus({ kind: "error" }); // no vague banner — each field shows its own message
      return;
    }
    setErrors({});
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
      setStatus({ kind: "error", msg: "Something went wrong on our end. Please try again." });
      return;
    }
    if (data?.ok) {
      setStatus({ kind: "success", withCode: code.trim().length > 0 });
    } else if (data?.error === "invalid_code" || data?.error === "code_used") {
      setErrors({ code: CODE_ERROR[data.error] }); // point the error at the discount code field
      setStatus({ kind: "error" });
    } else {
      setStatus({ kind: "error", msg: "We couldn’t complete your registration. Please try again." });
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
                  You’re on the list!
                </h1>
                <p className="mt-3 font-display text-[16px] leading-[1.5] text-[#666]">
                  {status.withCode
                    ? "Your discount code is saved. "
                    : "Thanks for registering. "}
                  We’re opening Juice to the public in a few days — we’ll email{" "}
                  <span className="font-medium text-[#444]">{email.trim()}</span> with the update and your next steps,
                  including when and how to sign up{status.withCode ? " and claim your extra credits" : ""}.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h1 className="font-body text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-[#444]">
                    Redeem your code
                  </h1>
                  <p className="mt-4 max-w-[460px] font-display text-[16px] leading-[1.5] text-[#666]">
                    Enter your details to receive additional credits when you sign up. We’re launching to the public in a
                    few days and will email you the moment it’s live.
                  </p>
                </div>

                <form
                  onSubmit={submit}
                  noValidate
                  className="mt-8 flex flex-col gap-5 rounded-[20px] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(80,40,160,0.18)] sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="First name" error={errors.firstName}>
                      <input
                        className={cls(errors.firstName)}
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value); clearErr("firstName"); }}
                        placeholder="Jane"
                        autoComplete="given-name"
                      />
                    </Field>
                    <Field label="Last name" error={errors.lastName}>
                      <input
                        className={cls(errors.lastName)}
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value); clearErr("lastName"); }}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </Field>
                  </div>

                  <Field label="Email" error={errors.email}>
                    <input
                      className={cls(errors.email)}
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
                      placeholder="jane@brand.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Phone number" error={errors.phone}>
                    <div className="flex gap-2">
                      <CountrySelect value={country} onChange={setCountry} />
                      <input
                        className={`${cls(errors.phone)} min-w-0 flex-1`}
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value.replace(/[^\d\s-]/g, "")); clearErr("phone"); }}
                        placeholder="98765 43210"
                        autoComplete="tel-national"
                      />
                    </div>
                  </Field>

                  <Field label="Brand / Organization" error={errors.organization}>
                    <input
                      className={cls(errors.organization)}
                      value={organization}
                      onChange={(e) => { setOrganization(e.target.value); clearErr("organization"); }}
                      placeholder="Betty Crocker"
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label="Discount code" optional error={errors.code}>
                    <input
                      className={`${cls(errors.code)} font-mono uppercase tracking-[0.15em]`}
                      value={code}
                      onChange={(e) => { setCode(formatCode(e.target.value)); clearErr("code"); }}
                      placeholder="XXXX-XXXX"
                      maxLength={9}
                      aria-label="Discount code"
                    />
                  </Field>

                  {status.kind === "error" && status.msg && (
                    <p className="rounded-lg bg-[#fff0f0] px-4 py-3 font-display text-[14px] text-[#c0392b]">{status.msg}</p>
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
