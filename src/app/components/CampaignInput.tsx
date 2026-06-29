import { useState } from "react";

/* Shared campaign prompt box — used on the home page (Campaign) and on the
   QuickAds page (Carousel) so they look and behave identically. */

/* Where the campaign tool / login lives, and the key both sides agree on. */
const CREATIVE_URL = "https://creative.juicelabs.ai/";
const HANDOFF_KEY = "juice_prompt";

/* Hand the typed prompt off to the tool across the subdomain + login boundary.
   We write it two ways so it survives an OAuth redirect that may strip the URL:
   (1) a cookie scoped to the shared parent domain `.juicelabs.ai`, and
   (2) a query param on the redirect URL. The tool reads either after sign-in. */
function handoffToTool(prompt: string) {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      `${HANDOFF_KEY}=${encodeURIComponent(prompt)}` +
      `; domain=.juicelabs.ai; path=/; max-age=1800; SameSite=Lax${secure}`;
  } catch {
    /* domain cookie is rejected off *.juicelabs.ai (e.g. localhost) — query param still carries it */
  }
  window.location.href = `${CREATIVE_URL}?${HANDOFF_KEY}=${encodeURIComponent(prompt)}`;
}

/* real campaign input with focus ring + submit state */
export function CampaignInput() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    const prompt = value.trim();
    if (!prompt) return;
    setSent(true);
    handoffToTool(prompt);
  };

  return (
    <div className="mx-auto w-full max-w-[756px] rounded-2xl bg-white p-5 shadow-[0_4px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-[#9165f5] sm:p-6">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        aria-label="Describe your campaign"
        placeholder="Create a campaign for Betty Crocker’s new product line"
        className="block w-full resize-none border-0 bg-transparent font-display text-[16px] text-[#333] outline-none placeholder:text-neutral-400 sm:text-[18px]"
      />
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Attach"
          className="grid size-8 shrink-0 place-items-center rounded-full border border-[#e8e8e8] text-neutral-500 transition hover:bg-neutral-50"
        >
          <PlusIcon />
        </button>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-[10px] border border-[#e8e8e8] px-3 font-display text-[14px] font-medium text-[#333] transition hover:bg-neutral-50"
          >
            Select a Brand
            <ChevronIcon />
          </button>
          <button
            type="button"
            aria-label="Voice"
            className="hidden size-8 shrink-0 place-items-center rounded-full border border-[#e8e8e8] text-neutral-500 transition hover:bg-neutral-50 sm:grid"
          >
            <MicIcon />
          </button>
          <button
            type="button"
            onClick={submit}
            aria-label={sent ? "Sent" : "Send"}
            className={`grid size-8 shrink-0 place-items-center rounded-full text-white transition ${
              sent ? "bg-green-600" : "bg-[#333] hover:scale-105"
            }`}
          >
            {sent ? <CheckIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- inline icons (exported so siblings can reuse the chevron) --- */
export function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function ChevronIcon({ className = "size-3", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 12 8" fill="none" aria-hidden className={className}>
      <path d="M1 1.5L6 6l5-4.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="6" y="2" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 8a4 4 0 008 0M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
