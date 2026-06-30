import { useEffect, useMemo, useRef, useState } from "react";
import { FLAGS } from "./flags";

export type Country = { iso: string; name: string; dial: string };

/* Comprehensive dial-code list, alphabetical by country name. */
export const COUNTRIES: Country[] = [
  { iso: "AF", name: "Afghanistan", dial: "+93" },
  { iso: "AL", name: "Albania", dial: "+355" },
  { iso: "DZ", name: "Algeria", dial: "+213" },
  { iso: "AD", name: "Andorra", dial: "+376" },
  { iso: "AO", name: "Angola", dial: "+244" },
  { iso: "AG", name: "Antigua and Barbuda", dial: "+1" },
  { iso: "AR", name: "Argentina", dial: "+54" },
  { iso: "AM", name: "Armenia", dial: "+374" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "AT", name: "Austria", dial: "+43" },
  { iso: "AZ", name: "Azerbaijan", dial: "+994" },
  { iso: "BS", name: "Bahamas", dial: "+1" },
  { iso: "BH", name: "Bahrain", dial: "+973" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "BB", name: "Barbados", dial: "+1" },
  { iso: "BY", name: "Belarus", dial: "+375" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "BZ", name: "Belize", dial: "+501" },
  { iso: "BJ", name: "Benin", dial: "+229" },
  { iso: "BT", name: "Bhutan", dial: "+975" },
  { iso: "BO", name: "Bolivia", dial: "+591" },
  { iso: "BA", name: "Bosnia and Herzegovina", dial: "+387" },
  { iso: "BW", name: "Botswana", dial: "+267" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "BN", name: "Brunei", dial: "+673" },
  { iso: "BG", name: "Bulgaria", dial: "+359" },
  { iso: "BF", name: "Burkina Faso", dial: "+226" },
  { iso: "BI", name: "Burundi", dial: "+257" },
  { iso: "KH", name: "Cambodia", dial: "+855" },
  { iso: "CM", name: "Cameroon", dial: "+237" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "CV", name: "Cape Verde", dial: "+238" },
  { iso: "CF", name: "Central African Republic", dial: "+236" },
  { iso: "TD", name: "Chad", dial: "+235" },
  { iso: "CL", name: "Chile", dial: "+56" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "CO", name: "Colombia", dial: "+57" },
  { iso: "KM", name: "Comoros", dial: "+269" },
  { iso: "CG", name: "Congo (Republic)", dial: "+242" },
  { iso: "CD", name: "Congo (DRC)", dial: "+243" },
  { iso: "CR", name: "Costa Rica", dial: "+506" },
  { iso: "CI", name: "Côte d’Ivoire", dial: "+225" },
  { iso: "HR", name: "Croatia", dial: "+385" },
  { iso: "CU", name: "Cuba", dial: "+53" },
  { iso: "CY", name: "Cyprus", dial: "+357" },
  { iso: "CZ", name: "Czechia", dial: "+420" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "DJ", name: "Djibouti", dial: "+253" },
  { iso: "DM", name: "Dominica", dial: "+1" },
  { iso: "DO", name: "Dominican Republic", dial: "+1" },
  { iso: "EC", name: "Ecuador", dial: "+593" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "SV", name: "El Salvador", dial: "+503" },
  { iso: "GQ", name: "Equatorial Guinea", dial: "+240" },
  { iso: "ER", name: "Eritrea", dial: "+291" },
  { iso: "EE", name: "Estonia", dial: "+372" },
  { iso: "SZ", name: "Eswatini", dial: "+268" },
  { iso: "ET", name: "Ethiopia", dial: "+251" },
  { iso: "FJ", name: "Fiji", dial: "+679" },
  { iso: "FI", name: "Finland", dial: "+358" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "GA", name: "Gabon", dial: "+241" },
  { iso: "GM", name: "Gambia", dial: "+220" },
  { iso: "GE", name: "Georgia", dial: "+995" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "GH", name: "Ghana", dial: "+233" },
  { iso: "GR", name: "Greece", dial: "+30" },
  { iso: "GD", name: "Grenada", dial: "+1" },
  { iso: "GT", name: "Guatemala", dial: "+502" },
  { iso: "GN", name: "Guinea", dial: "+224" },
  { iso: "GW", name: "Guinea-Bissau", dial: "+245" },
  { iso: "GY", name: "Guyana", dial: "+592" },
  { iso: "HT", name: "Haiti", dial: "+509" },
  { iso: "HN", name: "Honduras", dial: "+504" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "HU", name: "Hungary", dial: "+36" },
  { iso: "IS", name: "Iceland", dial: "+354" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "IR", name: "Iran", dial: "+98" },
  { iso: "IQ", name: "Iraq", dial: "+964" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "IL", name: "Israel", dial: "+972" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "JM", name: "Jamaica", dial: "+1" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "JO", name: "Jordan", dial: "+962" },
  { iso: "KZ", name: "Kazakhstan", dial: "+7" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "KI", name: "Kiribati", dial: "+686" },
  { iso: "XK", name: "Kosovo", dial: "+383" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "KG", name: "Kyrgyzstan", dial: "+996" },
  { iso: "LA", name: "Laos", dial: "+856" },
  { iso: "LV", name: "Latvia", dial: "+371" },
  { iso: "LB", name: "Lebanon", dial: "+961" },
  { iso: "LS", name: "Lesotho", dial: "+266" },
  { iso: "LR", name: "Liberia", dial: "+231" },
  { iso: "LY", name: "Libya", dial: "+218" },
  { iso: "LI", name: "Liechtenstein", dial: "+423" },
  { iso: "LT", name: "Lithuania", dial: "+370" },
  { iso: "LU", name: "Luxembourg", dial: "+352" },
  { iso: "MO", name: "Macau", dial: "+853" },
  { iso: "MG", name: "Madagascar", dial: "+261" },
  { iso: "MW", name: "Malawi", dial: "+265" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "MV", name: "Maldives", dial: "+960" },
  { iso: "ML", name: "Mali", dial: "+223" },
  { iso: "MT", name: "Malta", dial: "+356" },
  { iso: "MH", name: "Marshall Islands", dial: "+692" },
  { iso: "MR", name: "Mauritania", dial: "+222" },
  { iso: "MU", name: "Mauritius", dial: "+230" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "FM", name: "Micronesia", dial: "+691" },
  { iso: "MD", name: "Moldova", dial: "+373" },
  { iso: "MC", name: "Monaco", dial: "+377" },
  { iso: "MN", name: "Mongolia", dial: "+976" },
  { iso: "ME", name: "Montenegro", dial: "+382" },
  { iso: "MA", name: "Morocco", dial: "+212" },
  { iso: "MZ", name: "Mozambique", dial: "+258" },
  { iso: "MM", name: "Myanmar", dial: "+95" },
  { iso: "NA", name: "Namibia", dial: "+264" },
  { iso: "NR", name: "Nauru", dial: "+674" },
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "NI", name: "Nicaragua", dial: "+505" },
  { iso: "NE", name: "Niger", dial: "+227" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "KP", name: "North Korea", dial: "+850" },
  { iso: "MK", name: "North Macedonia", dial: "+389" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "PW", name: "Palau", dial: "+680" },
  { iso: "PS", name: "Palestine", dial: "+970" },
  { iso: "PA", name: "Panama", dial: "+507" },
  { iso: "PG", name: "Papua New Guinea", dial: "+675" },
  { iso: "PY", name: "Paraguay", dial: "+595" },
  { iso: "PE", name: "Peru", dial: "+51" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "RO", name: "Romania", dial: "+40" },
  { iso: "RU", name: "Russia", dial: "+7" },
  { iso: "RW", name: "Rwanda", dial: "+250" },
  { iso: "KN", name: "Saint Kitts and Nevis", dial: "+1" },
  { iso: "LC", name: "Saint Lucia", dial: "+1" },
  { iso: "VC", name: "Saint Vincent and the Grenadines", dial: "+1" },
  { iso: "WS", name: "Samoa", dial: "+685" },
  { iso: "SM", name: "San Marino", dial: "+378" },
  { iso: "ST", name: "São Tomé and Príncipe", dial: "+239" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "SN", name: "Senegal", dial: "+221" },
  { iso: "RS", name: "Serbia", dial: "+381" },
  { iso: "SC", name: "Seychelles", dial: "+248" },
  { iso: "SL", name: "Sierra Leone", dial: "+232" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "SK", name: "Slovakia", dial: "+421" },
  { iso: "SI", name: "Slovenia", dial: "+386" },
  { iso: "SB", name: "Solomon Islands", dial: "+677" },
  { iso: "SO", name: "Somalia", dial: "+252" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "SS", name: "South Sudan", dial: "+211" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "SD", name: "Sudan", dial: "+249" },
  { iso: "SR", name: "Suriname", dial: "+597" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "SY", name: "Syria", dial: "+963" },
  { iso: "TW", name: "Taiwan", dial: "+886" },
  { iso: "TJ", name: "Tajikistan", dial: "+992" },
  { iso: "TZ", name: "Tanzania", dial: "+255" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "TL", name: "Timor-Leste", dial: "+670" },
  { iso: "TG", name: "Togo", dial: "+228" },
  { iso: "TO", name: "Tonga", dial: "+676" },
  { iso: "TT", name: "Trinidad and Tobago", dial: "+1" },
  { iso: "TN", name: "Tunisia", dial: "+216" },
  { iso: "TR", name: "Türkiye", dial: "+90" },
  { iso: "TM", name: "Turkmenistan", dial: "+993" },
  { iso: "TV", name: "Tuvalu", dial: "+688" },
  { iso: "UG", name: "Uganda", dial: "+256" },
  { iso: "UA", name: "Ukraine", dial: "+380" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "UY", name: "Uruguay", dial: "+598" },
  { iso: "UZ", name: "Uzbekistan", dial: "+998" },
  { iso: "VU", name: "Vanuatu", dial: "+678" },
  { iso: "VA", name: "Vatican City", dial: "+39" },
  { iso: "VE", name: "Venezuela", dial: "+58" },
  { iso: "VN", name: "Vietnam", dial: "+84" },
  { iso: "YE", name: "Yemen", dial: "+967" },
  { iso: "ZM", name: "Zambia", dial: "+260" },
  { iso: "ZW", name: "Zimbabwe", dial: "+263" },
];

/* Best-effort ISO for a stored dial code (several countries share a dial). */
export function isoForDial(dial: string) {
  return COUNTRIES.find((c) => c.dial === dial)?.iso ?? "IN";
}

export function dialForIso(iso: string) {
  return (COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES.find((c) => c.iso === "IN")!).dial;
}

/* SVG flag (flag-icons) — renders consistently across all platforms */
export function Flag({ iso, className = "" }: { iso: string; className?: string }) {
  return (
    <img
      src={FLAGS[iso]}
      alt=""
      aria-hidden
      draggable={false}
      className={`h-4 w-[22px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/[0.08] ${className}`}
    />
  );
}

export default function CountrySelect({
  value,
  onChange,
}: {
  value: string; // iso
  onChange: (iso: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.iso === value) ?? COUNTRIES.find((c) => c.iso === "IN")!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.iso.toLowerCase() === q,
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    setTimeout(() => searchRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-12 items-center gap-2 rounded-xl border bg-white pl-3 pr-2.5 outline-none transition ${
          open ? "border-[#9165f5] ring-2 ring-[#9165f5]/30" : "border-[#e4e0f0] hover:border-[#cdbff2]"
        }`}
      >
        <Flag iso={selected.iso} />
        <span className="font-display text-[15px] font-medium text-[#333]">{selected.dial}</span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          className={`text-[#999] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5L5.5 6l4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[300px] overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_16px_44px_-12px_rgba(80,40,160,0.28)]">
          <div className="border-b border-black/5 p-2">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="h-9 w-full rounded-lg bg-[#f6f4fc] px-3 font-display text-[14px] text-[#333] outline-none placeholder:text-neutral-400"
            />
          </div>
          <ul role="listbox" className="max-h-[280px] overflow-y-auto py-1">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.iso === selected.iso}
                  onClick={() => {
                    onChange(c.iso);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-[#f6f4fc] ${
                    c.iso === selected.iso ? "bg-[#f0ecff]" : ""
                  }`}
                >
                  <Flag iso={c.iso} />
                  <span className="flex-1 truncate font-display text-[14px] text-[#333]">{c.name}</span>
                  <span className="font-display text-[13px] tabular-nums text-[#888]">{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center font-display text-[13px] text-[#999]">No match</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
