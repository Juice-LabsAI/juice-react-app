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

/* ---- add / edit modal ---- */
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

const mInput =
  "h-11 w-full rounded-xl border border-[#e4e0f0] bg-white px-3.5 font-display text-[14px] text-[#333] outline-none transition placeholder:text-neutral-400 focus:border-[#9165f5] focus:ring-2 focus:ring-[#9165f5]/30";

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

export default function AdminLeads() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [modal, setModal] = useState<{ open: boolean; lead: Lead | null }>({ open: false, lead: null });

  const fetchLeads = async (password: string) => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase.rpc("admin_list_leads", { p_pass: password });
    setLoading(false);
    if (err) {
      setError(/unauthor/i.test(err.message) ? "Incorrect password." : "Couldn’t load leads. Try again.");
      return false;
    }
    setLeads((data ?? []) as Lead[]);
    setAuthed(true);
    return true;
  };

  // Auth is intentionally kept in memory only — the password gate reappears on
  // every page reload (no sessionStorage / localStorage persistence).

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

  const orgs = useMemo(() => Array.from(new Set(leads.map((l) => l.organization).filter(Boolean))).sort(), [leads]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = leads.filter((l) => {
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
    out = [...out].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return out;
  }, [leads, query, orgFilter, statusFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "created_at" ? "desc" : "asc");
    }
  };

  const exportCsv = () => {
    const head = ["Status", "First name", "Last name", "Phone", "Email", "Organization", "Code", "Date"];
    const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const body = rows.map((l) =>
      [l.status, l.first_name, l.last_name, `${l.country_code} ${l.phone}`, l.email, l.organization, l.discount_code ?? "", fmtDate(l.created_at)]
        .map(esc)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...body].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `juice-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const logout = () => {
    setAuthed(false);
    setPass("");
    setLeads([]);
  };

  /* ---- password gate ---- */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f3ff] px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchLeads(pass);
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

  /* ---- leads table ---- */
  return (
    <div className="min-h-screen bg-[#faf9ff]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Juice home" className="block select-none">
            <Logo className="h-7 w-auto" />
          </Link>
          <span className="font-body text-lg font-extrabold text-[#444]">Leads</span>
          <span className="rounded-full bg-[#f0ecff] px-2.5 py-0.5 font-display text-[13px] font-medium text-[#7c54d6]">
            {rows.length}
            {rows.length !== leads.length ? ` / ${leads.length}` : ""}
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
            {orgs.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <button onClick={() => fetchLeads(pass)} className="h-10 rounded-full border border-[#e4e0f0] bg-white px-4 font-display text-[14px] font-medium text-[#555] transition hover:bg-neutral-50">
            Refresh
          </button>
          <button onClick={exportCsv} className="h-10 rounded-full border border-[#e4e0f0] bg-white px-4 font-display text-[14px] font-medium text-[#555] transition hover:bg-neutral-50">
            Export CSV
          </button>
          <button onClick={() => setModal({ open: true, lead: null })} className="h-10 rounded-full bg-[#7c54d6] px-4 font-display text-[14px] font-bold text-white transition hover:bg-[#6a45c2]">
            + Add lead
          </button>
          <button onClick={logout} className="h-10 rounded-full px-3 font-display text-[14px] font-medium text-[#999] transition hover:text-[#555]">
            Lock
          </button>
        </div>
      </header>

      {error && (
        <p className="mx-5 mt-3 rounded-lg bg-[#fff0f0] px-4 py-2 font-display text-[13px] text-[#c0392b] sm:mx-8">{error}</p>
      )}

      <main className="px-5 py-6 sm:px-8">
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-[0_4px_24px_-12px_rgba(80,40,160,0.12)]">
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
        </div>
      </main>

      {modal.open && (
        <LeadModal initial={modal.lead} onClose={() => setModal({ open: false, lead: null })} onSave={saveLead} />
      )}
    </div>
  );
}
