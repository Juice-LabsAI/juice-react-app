import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import Logo from "./sections/Logo";
import CountrySelect, { dialForIso, isoForDial } from "./components/CountrySelect";
import { supabase } from "../lib/supabase";

type Lead = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  country_code: string;
  phone: string;
  email: string;
  organization: string;
  discount_code: string | null;
  status: string;
};

type CmoLead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  score: number | null;
  archetype: string | null;
  dimensions: Record<string, number> | null;
  status: string;
};

type WaitlistLead = {
  id: string;
  created_at: string;
  name: string;
  organization: string;
  email: string;
  message: string | null;
  status: string;
};

// Canonical order for displaying the per-dimension scores (jsonb loses key order).
const CMO_DIMENSIONS = [
  "Organizational Readiness",
  "Change Management",
  "Brand Infrastructure",
  "Creative Operations",
  "Tech & Data",
] as const;

function dimensionEntries(d: Record<string, number> | null): { name: string; score: number }[] {
  if (!d) return [];
  return CMO_DIMENSIONS.filter((n) => d[n] != null).map((n) => ({ name: n, score: d[n] }));
}

type TabKey = "redeem" | "cmo" | "waitlist";

const STATUSES = ["New", "Reached Out", "Demo Set", "Closed"] as const;
const STATUS_STYLE: Record<string, { pill: string; dot: string }> = {
  New: { pill: "bg-[#eef1ff] text-[#4055c9]", dot: "bg-[#4055c9]" },
  "Reached Out": { pill: "bg-[#fff3df] text-[#b8770f]", dot: "bg-[#e09a1e]" },
  "Demo Set": { pill: "bg-[#f1ecff] text-[#7c54d6]", dot: "bg-[#7c54d6]" },
  Closed: { pill: "bg-[#e7f8ee] text-[#1f9d52]", dot: "bg-[#22a447]" },
};

type SortKey = "created_at" | "name" | "email" | "organization" | "status";
const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "organization", label: "Organization" },
  { key: "created_at", label: "Date" },
];

type CmoSortKey = "created_at" | "name" | "email" | "organization" | "status" | "score";
const CMO_COLUMNS: { key: CmoSortKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "organization", label: "Organization" },
  { key: "score", label: "Readiness" },
  { key: "created_at", label: "Date" },
];

type WaitlistSortKey = "created_at" | "name" | "email" | "organization" | "status";
const WAITLIST_COLUMNS: { key: WaitlistSortKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "organization", label: "Organization" },
  { key: "created_at", label: "Date" },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/* ---- inline status dropdown (portal'd so the table's scroll doesn't clip it) ---- */
function StatusSelect({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const st = STATUS_STYLE[value] ?? STATUS_STYLE.New;

  const toggle = () => {
    if (open) return setOpen(false);
    const r = btnRef.current!.getBoundingClientRect();
    setPos({ top: r.bottom + 6, left: r.left });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e?: Event) => {
      if (e && (menuRef.current?.contains(e.target as Node) || btnRef.current?.contains(e.target as Node))) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", () => setOpen(false), true);
    window.addEventListener("resize", () => setOpen(false));
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[13px] font-medium ${st.pill}`}
      >
        <span className={`size-1.5 rounded-full ${st.dot}`} />
        {value}
        <svg width="9" height="6" viewBox="0 0 10 6" fill="none" className="opacity-60">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="z-50 w-[164px] rounded-xl border border-black/5 bg-white p-1 shadow-[0_16px_44px_-12px_rgba(80,40,160,0.28)]"
          >
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-display text-[13px] transition hover:bg-[#f6f4fc] ${
                  s === value ? "font-semibold text-[#333]" : "text-[#555]"
                }`}
              >
                <span className={`size-2 rounded-full ${STATUS_STYLE[s].dot}`} />
                {s}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

const mInput =
  "h-11 w-full rounded-xl border border-[#e4e0f0] bg-white px-3.5 font-display text-[14px] text-[#333] outline-none transition placeholder:text-neutral-400 focus:border-[#9165f5] focus:ring-2 focus:ring-[#9165f5]/30";

/* ---- add / edit modal (Redeem leads) ---- */
type LeadForm = {
  id?: string;
  first_name: string;
  last_name: string;
  iso: string;
  phone: string;
  email: string;
  organization: string;
  discount_code: string;
  status: string;
};

function LeadModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Lead | null;
  onClose: () => void;
  onSave: (f: LeadForm) => Promise<string | null>;
}) {
  const [f, setF] = useState<LeadForm>(() => ({
    id: initial?.id,
    first_name: initial?.first_name ?? "",
    last_name: initial?.last_name ?? "",
    iso: initial ? isoForDial(initial.country_code) : "IN",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    organization: initial?.organization ?? "",
    discount_code: initial?.discount_code ?? "",
    status: initial?.status ?? "New",
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof LeadForm, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.first_name.trim() || !f.last_name.trim() || !f.phone.trim() || !f.organization.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      setErr("Please fill in all required fields correctly.");
      return;
    }
    setBusy(true);
    const e2 = await onSave(f);
    setBusy(false);
    if (e2) setErr(e2);
    else onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4" onMouseDown={onClose}>
      <form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl sm:p-7"
      >
        <h2 className="font-body text-2xl font-extrabold text-[#444]">{initial ? "Edit lead" : "Add lead"}</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input className={mInput} placeholder="First name *" value={f.first_name} onChange={(e) => set("first_name", e.target.value)} />
          <input className={mInput} placeholder="Last name *" value={f.last_name} onChange={(e) => set("last_name", e.target.value)} />
        </div>
        <input className={`${mInput} mt-4`} type="email" placeholder="Email *" value={f.email} onChange={(e) => set("email", e.target.value)} />
        <div className="mt-4 flex gap-2">
          <CountrySelect value={f.iso} onChange={(iso) => set("iso", iso)} />
          <input className={`${mInput} min-w-0 flex-1`} placeholder="Phone *" value={f.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d\s-]/g, ""))} />
        </div>
        <input className={`${mInput} mt-4`} placeholder="Brand / Organization *" value={f.organization} onChange={(e) => set("organization", e.target.value)} />
        <input className={`${mInput} mt-4 font-mono uppercase tracking-[0.12em]`} placeholder="Discount code (optional)" value={f.discount_code} onChange={(e) => set("discount_code", e.target.value.toUpperCase())} />
        <div className="mt-5">
          <span className="font-display text-[13px] font-medium text-[#555]">Status</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("status", s)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[13px] font-medium transition ${
                  f.status === s ? STATUS_STYLE[s].pill + " ring-1 ring-current/30" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                <span className={`size-1.5 rounded-full ${f.status === s ? STATUS_STYLE[s].dot : "bg-neutral-400"}`} />
                {s}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="mt-4 rounded-lg bg-[#fff0f0] px-3 py-2 font-display text-[13px] text-[#c0392b]">{err}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-full px-5 font-display text-[14px] font-medium text-[#777] transition hover:bg-neutral-100">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="h-11 rounded-full bg-[#333] px-6 font-display text-[14px] font-bold text-white transition hover:bg-[#222] disabled:opacity-60">
            {busy ? "Saving…" : initial ? "Save changes" : "Add lead"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

/* ---- add / edit modal (CMO Handbook leads) ---- */
type CmoLeadForm = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  score: string;
  archetype: string;
  status: string;
};

function CmoLeadModal({
  initial,
  onClose,
  onSave,
}: {
  initial: CmoLead | null;
  onClose: () => void;
  onSave: (f: CmoLeadForm) => Promise<string | null>;
}) {
  const [f, setF] = useState<CmoLeadForm>(() => ({
    id: initial?.id,
    name: initial?.name ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    organization: initial?.organization ?? "",
    score: initial?.score != null ? String(initial.score) : "",
    archetype: initial?.archetype ?? "",
    status: initial?.status ?? "New",
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof CmoLeadForm, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim() || !f.organization.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      setErr("Please fill in all required fields correctly.");
      return;
    }
    setBusy(true);
    const e2 = await onSave(f);
    setBusy(false);
    if (e2) setErr(e2);
    else onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4" onMouseDown={onClose}>
      <form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl sm:p-7"
      >
        <h2 className="font-body text-2xl font-extrabold text-[#444]">{initial ? "Edit lead" : "Add lead"}</h2>
        <input className={`${mInput} mt-5`} placeholder="Full name *" value={f.name} onChange={(e) => set("name", e.target.value)} />
        <input className={`${mInput} mt-4`} type="email" placeholder="Business email *" value={f.email} onChange={(e) => set("email", e.target.value)} />
        <input className={`${mInput} mt-4`} placeholder="Contact number *" value={f.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d+\s-]/g, ""))} />
        <input className={`${mInput} mt-4`} placeholder="Organization *" value={f.organization} onChange={(e) => set("organization", e.target.value)} />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input className={mInput} inputMode="numeric" placeholder="Readiness score (0–100)" value={f.score} onChange={(e) => set("score", e.target.value.replace(/[^\d]/g, "").slice(0, 3))} />
          <input className={mInput} placeholder="Archetype (e.g. The Conductor)" value={f.archetype} onChange={(e) => set("archetype", e.target.value)} />
        </div>
        {dimensionEntries(initial?.dimensions ?? null).length > 0 && (
          <div className="mt-5">
            <span className="font-display text-[13px] font-medium text-[#555]">Dimension scores</span>
            <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {dimensionEntries(initial?.dimensions ?? null).map((e) => (
                <div key={e.name} className="flex items-center justify-between rounded-lg bg-[#f6f4fc] px-3 py-2">
                  <span className="font-display text-[13px] text-[#555]">{e.name}</span>
                  <span className="font-display text-[13px] font-semibold text-[#333]">{e.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-5">
          <span className="font-display text-[13px] font-medium text-[#555]">Status</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("status", s)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[13px] font-medium transition ${
                  f.status === s ? STATUS_STYLE[s].pill + " ring-1 ring-current/30" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                <span className={`size-1.5 rounded-full ${f.status === s ? STATUS_STYLE[s].dot : "bg-neutral-400"}`} />
                {s}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="mt-4 rounded-lg bg-[#fff0f0] px-3 py-2 font-display text-[13px] text-[#c0392b]">{err}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-full px-5 font-display text-[14px] font-medium text-[#777] transition hover:bg-neutral-100">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="h-11 rounded-full bg-[#333] px-6 font-display text-[14px] font-bold text-white transition hover:bg-[#222] disabled:opacity-60">
            {busy ? "Saving…" : initial ? "Save changes" : "Add lead"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

/* ---- add / edit modal (Waitlist leads) ---- */
type WaitlistLeadForm = {
  id?: string;
  name: string;
  organization: string;
  email: string;
  message: string;
  status: string;
};

function WaitlistLeadModal({
  initial,
  onClose,
  onSave,
}: {
  initial: WaitlistLead | null;
  onClose: () => void;
  onSave: (f: WaitlistLeadForm) => Promise<string | null>;
}) {
  const [f, setF] = useState<WaitlistLeadForm>(() => ({
    id: initial?.id,
    name: initial?.name ?? "",
    organization: initial?.organization ?? "",
    email: initial?.email ?? "",
    message: initial?.message ?? "",
    status: initial?.status ?? "New",
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k: keyof WaitlistLeadForm, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.organization.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      setErr("Please fill in all required fields correctly.");
      return;
    }
    setBusy(true);
    const e2 = await onSave(f);
    setBusy(false);
    if (e2) setErr(e2);
    else onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4" onMouseDown={onClose}>
      <form
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl sm:p-7"
      >
        <h2 className="font-body text-2xl font-extrabold text-[#444]">{initial ? "Edit lead" : "Add lead"}</h2>
        <input className={`${mInput} mt-5`} placeholder="Full name *" value={f.name} onChange={(e) => set("name", e.target.value)} />
        <input className={`${mInput} mt-4`} placeholder="Organisation *" value={f.organization} onChange={(e) => set("organization", e.target.value)} />
        <input className={`${mInput} mt-4`} type="email" placeholder="Business email *" value={f.email} onChange={(e) => set("email", e.target.value)} />
        <textarea className={`${mInput} mt-4 h-auto py-3`} rows={3} placeholder="What can Juice AI do for you? (optional)" value={f.message} onChange={(e) => set("message", e.target.value)} />
        <div className="mt-5">
          <span className="font-display text-[13px] font-medium text-[#555]">Status</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("status", s)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[13px] font-medium transition ${
                  f.status === s ? STATUS_STYLE[s].pill + " ring-1 ring-current/30" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                <span className={`size-1.5 rounded-full ${f.status === s ? STATUS_STYLE[s].dot : "bg-neutral-400"}`} />
                {s}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="mt-4 rounded-lg bg-[#fff0f0] px-3 py-2 font-display text-[13px] text-[#c0392b]">{err}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-full px-5 font-display text-[14px] font-medium text-[#777] transition hover:bg-neutral-100">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="h-11 rounded-full bg-[#333] px-6 font-display text-[14px] font-bold text-white transition hover:bg-[#222] disabled:opacity-60">
            {busy ? "Saving…" : initial ? "Save changes" : "Add lead"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

export default function AdminLeads() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tab, setTab] = useState<TabKey>("redeem");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [cmoLeads, setCmoLeads] = useState<CmoLead[]>([]);
  const [waitlistLeads, setWaitlistLeads] = useState<WaitlistLead[]>([]);

  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [cmoSortKey, setCmoSortKey] = useState<CmoSortKey>("created_at");
  const [cmoSortDir, setCmoSortDir] = useState<"asc" | "desc">("desc");
  const [waitlistSortKey, setWaitlistSortKey] = useState<WaitlistSortKey>("created_at");
  const [waitlistSortDir, setWaitlistSortDir] = useState<"asc" | "desc">("desc");
  const [modal, setModal] = useState<{ open: boolean; lead: Lead | null }>({ open: false, lead: null });
  const [cmoModal, setCmoModal] = useState<{ open: boolean; lead: CmoLead | null }>({ open: false, lead: null });
  const [waitlistModal, setWaitlistModal] = useState<{ open: boolean; lead: WaitlistLead | null }>({ open: false, lead: null });

  // Auth is intentionally kept in memory only — the password gate reappears on
  // every page reload (no sessionStorage / localStorage persistence).

  const fetchLeads = async (password: string) => {
    const { data, error: err } = await supabase.rpc("admin_list_leads", { p_pass: password });
    if (err) return err;
    setLeads((data ?? []) as Lead[]);
    return null;
  };

  const fetchCmoLeads = async (password: string) => {
    const { data, error: err } = await supabase.rpc("admin_list_cmo_leads", { p_pass: password });
    if (err) return err;
    setCmoLeads((data ?? []) as CmoLead[]);
    return null;
  };

  const fetchWaitlistLeads = async (password: string) => {
    const { data, error: err } = await supabase.rpc("admin_list_waitlist_leads", { p_pass: password });
    if (err) return err;
    setWaitlistLeads((data ?? []) as WaitlistLead[]);
    return null;
  };

  // Unlock: authenticate against the redeem list, then load the other datasets.
  const unlock = async (password: string) => {
    setLoading(true);
    setError("");
    const err = await fetchLeads(password);
    if (err) {
      setLoading(false);
      setError(/unauthor/i.test(err.message) ? "Incorrect password." : "Couldn’t load leads. Try again.");
      return;
    }
    await fetchCmoLeads(password); // errors here surface on each tab via its empty state
    await fetchWaitlistLeads(password);
    setLoading(false);
    setAuthed(true);
  };

  const refresh = async () => {
    setError("");
    const err =
      tab === "redeem" ? await fetchLeads(pass) : tab === "cmo" ? await fetchCmoLeads(pass) : await fetchWaitlistLeads(pass);
    if (err) setError("Couldn’t refresh. Try again.");
  };

  /* ---- Redeem CRUD ---- */
  const setStatus = async (id: string, status: string) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l))); // optimistic
    const { error: err } = await supabase.rpc("admin_set_status", { p_pass: pass, p_id: id, p_status: status });
    if (err) {
      setLeads(prev);
      setError("Couldn’t update status.");
    }
  };

  const saveLead = async (f: LeadForm): Promise<string | null> => {
    const args = {
      p_pass: pass,
      p_first_name: f.first_name,
      p_last_name: f.last_name,
      p_country_code: dialForIso(f.iso),
      p_phone: f.phone,
      p_email: f.email,
      p_organization: f.organization,
      p_discount_code: f.discount_code,
      p_status: f.status,
    };
    const { data, error: err } = f.id
      ? await supabase.rpc("admin_update_lead", { ...args, p_id: f.id })
      : await supabase.rpc("admin_create_lead", args);
    if (err) return /unauthor/i.test(err.message) ? "Session expired — unlock again." : "Couldn’t save the lead.";
    const row = data as Lead;
    setLeads((ls) => (f.id ? ls.map((l) => (l.id === row.id ? row : l)) : [row, ...ls]));
    return null;
  };

  const deleteLead = async (l: Lead) => {
    if (!window.confirm(`Delete ${l.first_name} ${l.last_name}? This can’t be undone.`)) return;
    const prev = leads;
    setLeads((ls) => ls.filter((x) => x.id !== l.id));
    const { error: err } = await supabase.rpc("admin_delete_lead", { p_pass: pass, p_id: l.id });
    if (err) {
      setLeads(prev);
      setError("Couldn’t delete the lead.");
    }
  };

  /* ---- CMO CRUD ---- */
  const setCmoStatus = async (id: string, status: string) => {
    const prev = cmoLeads;
    setCmoLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l))); // optimistic
    const { error: err } = await supabase.rpc("admin_set_cmo_status", { p_pass: pass, p_id: id, p_status: status });
    if (err) {
      setCmoLeads(prev);
      setError("Couldn’t update status.");
    }
  };

  const saveCmoLead = async (f: CmoLeadForm): Promise<string | null> => {
    const args = {
      p_pass: pass,
      p_name: f.name,
      p_phone: f.phone,
      p_email: f.email,
      p_organization: f.organization,
      p_score: f.score.trim() === "" ? null : Number(f.score),
      p_archetype: f.archetype,
      p_status: f.status,
    };
    const { data, error: err } = f.id
      ? await supabase.rpc("admin_update_cmo_lead", { ...args, p_id: f.id })
      : await supabase.rpc("admin_create_cmo_lead", args);
    if (err) return /unauthor/i.test(err.message) ? "Session expired — unlock again." : "Couldn’t save the lead.";
    const row = data as CmoLead;
    setCmoLeads((ls) => (f.id ? ls.map((l) => (l.id === row.id ? row : l)) : [row, ...ls]));
    return null;
  };

  const deleteCmoLead = async (l: CmoLead) => {
    if (!window.confirm(`Delete ${l.name}? This can’t be undone.`)) return;
    const prev = cmoLeads;
    setCmoLeads((ls) => ls.filter((x) => x.id !== l.id));
    const { error: err } = await supabase.rpc("admin_delete_cmo_lead", { p_pass: pass, p_id: l.id });
    if (err) {
      setCmoLeads(prev);
      setError("Couldn’t delete the lead.");
    }
  };

  /* ---- Waitlist CRUD ---- */
  const setWaitlistStatus = async (id: string, status: string) => {
    const prev = waitlistLeads;
    setWaitlistLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l))); // optimistic
    const { error: err } = await supabase.rpc("admin_set_waitlist_status", { p_pass: pass, p_id: id, p_status: status });
    if (err) {
      setWaitlistLeads(prev);
      setError("Couldn’t update status.");
    }
  };

  const saveWaitlistLead = async (f: WaitlistLeadForm): Promise<string | null> => {
    const args = {
      p_pass: pass,
      p_name: f.name,
      p_organization: f.organization,
      p_email: f.email,
      p_message: f.message,
      p_status: f.status,
    };
    const { data, error: err } = f.id
      ? await supabase.rpc("admin_update_waitlist_lead", { ...args, p_id: f.id })
      : await supabase.rpc("admin_create_waitlist_lead", args);
    if (err) return /unauthor/i.test(err.message) ? "Session expired — unlock again." : "Couldn’t save the lead.";
    const row = data as WaitlistLead;
    setWaitlistLeads((ls) => (f.id ? ls.map((l) => (l.id === row.id ? row : l)) : [row, ...ls]));
    return null;
  };

  const deleteWaitlistLead = async (l: WaitlistLead) => {
    if (!window.confirm(`Delete ${l.name}? This can’t be undone.`)) return;
    const prev = waitlistLeads;
    setWaitlistLeads((ls) => ls.filter((x) => x.id !== l.id));
    const { error: err } = await supabase.rpc("admin_delete_waitlist_lead", { p_pass: pass, p_id: l.id });
    if (err) {
      setWaitlistLeads(prev);
      setError("Couldn’t delete the lead.");
    }
  };

  /* ---- derived: Redeem rows ---- */
  const orgs = useMemo(() => Array.from(new Set(leads.map((l) => l.organization).filter(Boolean))).sort(), [leads]);
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = leads.filter((l) => {
      if (orgFilter && l.organization !== orgFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.first_name, l.last_name, l.email, l.organization, l.discount_code ?? "", `${l.country_code} ${l.phone}`]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const val = (l: Lead) =>
      sortKey === "name"
        ? `${l.first_name} ${l.last_name}`.toLowerCase()
        : sortKey === "created_at"
          ? l.created_at
          : String(l[sortKey] ?? "").toLowerCase();
    return [...out].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [leads, query, orgFilter, statusFilter, sortKey, sortDir]);

  /* ---- derived: CMO rows ---- */
  const cmoOrgs = useMemo(() => Array.from(new Set(cmoLeads.map((l) => l.organization).filter(Boolean))).sort(), [cmoLeads]);
  const cmoRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = cmoLeads.filter((l) => {
      if (orgFilter && l.organization !== orgFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.name, l.email, l.organization, l.archetype ?? "", l.phone]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    return [...out].sort((a, b) => {
      let cmp: number;
      if (cmoSortKey === "score") cmp = (a.score ?? -1) - (b.score ?? -1);
      else {
        const av = cmoSortKey === "created_at" ? a.created_at : String(a[cmoSortKey] ?? "").toLowerCase();
        const bv = cmoSortKey === "created_at" ? b.created_at : String(b[cmoSortKey] ?? "").toLowerCase();
        cmp = av < bv ? -1 : av > bv ? 1 : 0;
      }
      return cmoSortDir === "asc" ? cmp : -cmp;
    });
  }, [cmoLeads, query, orgFilter, statusFilter, cmoSortKey, cmoSortDir]);

  /* ---- derived: Waitlist rows ---- */
  const waitlistOrgs = useMemo(
    () => Array.from(new Set(waitlistLeads.map((l) => l.organization).filter(Boolean))).sort(),
    [waitlistLeads],
  );
  const waitlistRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = waitlistLeads.filter((l) => {
      if (orgFilter && l.organization !== orgFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.name, l.email, l.organization, l.message ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const val = (l: WaitlistLead) =>
      waitlistSortKey === "created_at" ? l.created_at : String(l[waitlistSortKey] ?? "").toLowerCase();
    return [...out].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return waitlistSortDir === "asc" ? cmp : -cmp;
    });
  }, [waitlistLeads, query, orgFilter, statusFilter, waitlistSortKey, waitlistSortDir]);

  const toggleWaitlistSort = (key: WaitlistSortKey) => {
    if (key === waitlistSortKey) setWaitlistSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setWaitlistSortKey(key);
      setWaitlistSortDir(key === "created_at" ? "desc" : "asc");
    }
  };

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "created_at" ? "desc" : "asc");
    }
  };
  const toggleCmoSort = (key: CmoSortKey) => {
    if (key === cmoSortKey) setCmoSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setCmoSortKey(key);
      setCmoSortDir(key === "created_at" || key === "score" ? "desc" : "asc");
    }
  };

  const switchTab = (t: TabKey) => {
    if (t === tab) return;
    setTab(t);
    setQuery("");
    setOrgFilter("");
    setStatusFilter("");
    setError("");
  };

  const activeOrgs = tab === "redeem" ? orgs : tab === "cmo" ? cmoOrgs : waitlistOrgs;
  const activeCount = tab === "redeem" ? rows.length : tab === "cmo" ? cmoRows.length : waitlistRows.length;
  const activeTotal = tab === "redeem" ? leads.length : tab === "cmo" ? cmoLeads.length : waitlistLeads.length;

  const exportCsv = () => {
    const esc = (v: string | number) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    let head: string[];
    let body: string[];
    if (tab === "redeem") {
      head = ["Status", "First name", "Last name", "Phone", "Email", "Organization", "Code", "Date"];
      body = rows.map((l) =>
        [l.status, l.first_name, l.last_name, `${l.country_code} ${l.phone}`, l.email, l.organization, l.discount_code ?? "", fmtDate(l.created_at)]
          .map(esc)
          .join(","),
      );
    } else if (tab === "waitlist") {
      head = ["Status", "Name", "Email", "Organization", "What can Juice AI do for you?", "Date"];
      body = waitlistRows.map((l) =>
        [l.status, l.name, l.email, l.organization, l.message ?? "", fmtDate(l.created_at)].map(esc).join(","),
      );
    } else {
      head = ["Status", "Name", "Phone", "Email", "Organization", "Score", "Archetype", "Dimension scores", "Date"];
      body = cmoRows.map((l) =>
        [
          l.status, l.name, l.phone, l.email, l.organization, l.score ?? "", l.archetype ?? "",
          dimensionEntries(l.dimensions).map((e) => `${e.name} ${e.score}`).join("; "),
          fmtDate(l.created_at),
        ].map(esc).join(","),
      );
    }
    const blob = new Blob([[head.join(","), ...body].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `juice-${tab}-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const logout = () => {
    setAuthed(false);
    setPass("");
    setLeads([]);
    setCmoLeads([]);
    setWaitlistLeads([]);
  };

  /* ---- password gate ---- */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f3ff] px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            unlock(pass);
          }}
          className="w-full max-w-[400px] rounded-[20px] bg-white p-8 shadow-[0_10px_40px_-12px_rgba(80,40,160,0.18)]"
        >
          <Logo className="mx-auto h-9 w-auto" />
          <h1 className="mt-6 text-center font-body text-2xl font-extrabold text-[#444]">Leads admin</h1>
          <p className="mt-2 text-center font-display text-[14px] text-[#777]">Enter the admin password to continue.</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mt-6 h-12 w-full rounded-xl border border-[#e4e0f0] bg-white px-4 font-display text-[15px] text-[#333] outline-none focus:border-[#9165f5] focus:ring-2 focus:ring-[#9165f5]/30"
          />
          {error && <p className="mt-3 font-display text-[13px] text-[#c0392b]">{error}</p>}
          <button type="submit" disabled={loading} className="mt-5 h-12 w-full rounded-full bg-[#333] font-display text-[15px] font-bold text-white transition hover:bg-[#222] disabled:opacity-60">
            {loading ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  const TABS: { key: TabKey; label: string; count: number }[] = [
    { key: "redeem", label: "Redeem leads", count: leads.length },
    { key: "cmo", label: "CMO Handbook leads", count: cmoLeads.length },
    { key: "waitlist", label: "Waitlist leads", count: waitlistLeads.length },
  ];

  /* ---- leads tables ---- */
  return (
    <div className="min-h-screen bg-[#faf9ff]">
      <div className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Juice home" className="block select-none">
            <Logo className="h-7 w-auto" />
          </Link>
          <span className="font-body text-lg font-extrabold text-[#444]">Leads</span>
          <span className="rounded-full bg-[#f0ecff] px-2.5 py-0.5 font-display text-[13px] font-medium text-[#7c54d6]">
            {activeCount}
            {activeCount !== activeTotal ? ` / ${activeTotal}` : ""}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="h-10 w-[200px] rounded-full border border-[#e4e0f0] bg-white px-4 font-display text-[14px] text-[#333] outline-none focus:border-[#9165f5] focus:ring-2 focus:ring-[#9165f5]/30"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 rounded-full border border-[#e4e0f0] bg-white px-3 font-display text-[14px] text-[#333] outline-none focus:border-[#9165f5]">
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={orgFilter} onChange={(e) => setOrgFilter(e.target.value)} className="h-10 max-w-[180px] rounded-full border border-[#e4e0f0] bg-white px-3 font-display text-[14px] text-[#333] outline-none focus:border-[#9165f5]">
            <option value="">All organizations</option>
            {activeOrgs.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <button onClick={refresh} className="h-10 rounded-full border border-[#e4e0f0] bg-white px-4 font-display text-[14px] font-medium text-[#555] transition hover:bg-neutral-50">
            Refresh
          </button>
          <button onClick={exportCsv} className="h-10 rounded-full border border-[#e4e0f0] bg-white px-4 font-display text-[14px] font-medium text-[#555] transition hover:bg-neutral-50">
            Export CSV
          </button>
          <button
            onClick={() =>
              tab === "redeem"
                ? setModal({ open: true, lead: null })
                : tab === "cmo"
                  ? setCmoModal({ open: true, lead: null })
                  : setWaitlistModal({ open: true, lead: null })
            }
            className="h-10 rounded-full bg-[#7c54d6] px-4 font-display text-[14px] font-bold text-white transition hover:bg-[#6a45c2]"
          >
            + Add lead
          </button>
          <button onClick={logout} className="h-10 rounded-full px-3 font-display text-[14px] font-medium text-[#999] transition hover:text-[#555]">
            Lock
          </button>
        </div>
      </header>

      {/* tab bar */}
      <div className="px-5 sm:px-8">
        <div className="flex gap-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => switchTab(t.key)}
              className={`-mb-px border-b-2 py-3 font-display text-[14px] font-semibold transition ${
                tab === t.key ? "border-[#7c54d6] text-[#333]" : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              {t.label}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[12px] font-medium ${
                  tab === t.key ? "bg-[#f0ecff] text-[#7c54d6]" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      </div>

      {error && (
        <p className="mx-5 mt-3 rounded-lg bg-[#fff0f0] px-4 py-2 font-display text-[13px] text-[#c0392b] sm:mx-8">{error}</p>
      )}

      <main className="px-5 py-6 sm:px-8">
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-[0_4px_24px_-12px_rgba(80,40,160,0.12)]">
          {tab === "redeem" ? (
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 bg-[#faf9ff]">
                  {COLUMNS.map((c) => (
                    <th key={c.key} className="px-5 py-3.5">
                      <button onClick={() => toggleSort(c.key)} className="flex items-center gap-1.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888] transition hover:text-[#555]">
                        {c.label}
                        <span className={`text-[10px] ${sortKey === c.key ? "text-[#7c54d6]" : "text-transparent"}`}>
                          {sortKey === c.key && sortDir === "asc" ? "▲" : "▼"}
                        </span>
                      </button>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Phone</th>
                  <th className="px-5 py-3.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Code</th>
                  <th className="px-5 py-3.5 text-right font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l) => (
                  <tr key={l.id} className="border-b border-black/[0.04] transition hover:bg-[#faf9ff]">
                    <td className="px-5 py-3">
                      <StatusSelect value={l.status} onChange={(s) => setStatus(l.id, s)} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] font-medium text-[#333]">
                      {l.first_name} {l.last_name}
                    </td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.email}</td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.organization}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] text-[#777]">{fmtDate(l.created_at)}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] text-[#555]">{l.country_code} {l.phone}</td>
                    <td className="whitespace-nowrap px-5 py-3">
                      {l.discount_code ? (
                        <span className="rounded-md bg-[#f0ecff] px-2 py-1 font-mono text-[13px] text-[#7c54d6]">{l.discount_code}</span>
                      ) : (
                        <span className="text-[13px] text-[#bbb]">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <button onClick={() => setModal({ open: true, lead: l })} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#7c54d6] transition hover:bg-[#f0ecff]">
                        Edit
                      </button>
                      <button onClick={() => deleteLead(l)} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#c0392b] transition hover:bg-[#fff0f0]">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center font-display text-[15px] text-[#999]">
                      {leads.length === 0 ? "No leads yet." : "No leads match your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : tab === "cmo" ? (
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 bg-[#faf9ff]">
                  {CMO_COLUMNS.map((c) => (
                    <th key={c.key} className="px-5 py-3.5">
                      <button onClick={() => toggleCmoSort(c.key)} className="flex items-center gap-1.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888] transition hover:text-[#555]">
                        {c.label}
                        <span className={`text-[10px] ${cmoSortKey === c.key ? "text-[#7c54d6]" : "text-transparent"}`}>
                          {cmoSortKey === c.key && cmoSortDir === "asc" ? "▲" : "▼"}
                        </span>
                      </button>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Contact</th>
                  <th className="px-5 py-3.5 text-right font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cmoRows.map((l) => (
                  <tr key={l.id} className="border-b border-black/[0.04] transition hover:bg-[#faf9ff]">
                    <td className="px-5 py-3">
                      <StatusSelect value={l.status} onChange={(s) => setCmoStatus(l.id, s)} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] font-medium text-[#333]">{l.name}</td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.email}</td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.organization}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px]">
                      {l.score != null ? (
                        <span>
                          <span className="font-semibold text-[#333]">{l.score}</span>
                          {l.archetype && <span className="ml-1.5 text-[#888]">· {l.archetype}</span>}
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#bbb]">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] text-[#777]">{fmtDate(l.created_at)}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] text-[#555]">{l.phone}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <button onClick={() => setCmoModal({ open: true, lead: l })} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#7c54d6] transition hover:bg-[#f0ecff]">
                        Edit
                      </button>
                      <button onClick={() => deleteCmoLead(l)} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#c0392b] transition hover:bg-[#fff0f0]">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {cmoRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center font-display text-[15px] text-[#999]">
                      {cmoLeads.length === 0 ? "No CMO Handbook leads yet." : "No leads match your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/5 bg-[#faf9ff]">
                  {WAITLIST_COLUMNS.map((c) => (
                    <th key={c.key} className="px-5 py-3.5">
                      <button onClick={() => toggleWaitlistSort(c.key)} className="flex items-center gap-1.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888] transition hover:text-[#555]">
                        {c.label}
                        <span className={`text-[10px] ${waitlistSortKey === c.key ? "text-[#7c54d6]" : "text-transparent"}`}>
                          {waitlistSortKey === c.key && waitlistSortDir === "asc" ? "▲" : "▼"}
                        </span>
                      </button>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">What can Juice AI do for you?</th>
                  <th className="px-5 py-3.5 text-right font-display text-[13px] font-semibold uppercase tracking-wide text-[#888]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {waitlistRows.map((l) => (
                  <tr key={l.id} className="border-b border-black/[0.04] transition hover:bg-[#faf9ff]">
                    <td className="px-5 py-3">
                      <StatusSelect value={l.status} onChange={(s) => setWaitlistStatus(l.id, s)} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] font-medium text-[#333]">{l.name}</td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.email}</td>
                    <td className="px-5 py-3 font-display text-[14px] text-[#555]">{l.organization}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-display text-[14px] text-[#777]">{fmtDate(l.created_at)}</td>
                    <td className="max-w-[280px] px-5 py-3 font-display text-[14px] text-[#555]">
                      {l.message ? (
                        <span className="line-clamp-2" title={l.message}>{l.message}</span>
                      ) : (
                        <span className="text-[13px] text-[#bbb]">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <button onClick={() => setWaitlistModal({ open: true, lead: l })} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#7c54d6] transition hover:bg-[#f0ecff]">
                        Edit
                      </button>
                      <button onClick={() => deleteWaitlistLead(l)} className="rounded-lg px-2.5 py-1.5 font-display text-[13px] font-medium text-[#c0392b] transition hover:bg-[#fff0f0]">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {waitlistRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center font-display text-[15px] text-[#999]">
                      {waitlistLeads.length === 0 ? "No waitlist leads yet." : "No leads match your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {modal.open && (
        <LeadModal initial={modal.lead} onClose={() => setModal({ open: false, lead: null })} onSave={saveLead} />
      )}
      {cmoModal.open && (
        <CmoLeadModal initial={cmoModal.lead} onClose={() => setCmoModal({ open: false, lead: null })} onSave={saveCmoLead} />
      )}
      {waitlistModal.open && (
        <WaitlistLeadModal initial={waitlistModal.lead} onClose={() => setWaitlistModal({ open: false, lead: null })} onSave={saveWaitlistLead} />
      )}
    </div>
  );
}
