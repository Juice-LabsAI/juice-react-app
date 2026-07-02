import { useEffect, useRef, useState } from "react";
import logo from "../imports/juice-logo.png";
import { supabase } from "../lib/supabase";

/**
 * Brand OS Readiness — the CMO assessment.
 *
 * A faithful React port of the original "Brand OS Readiness.dc.html" (a DCLogic
 * single-file export). The source drove everything through inline CSS style
 * strings; to keep pixel-level fidelity, those strings are copied verbatim and
 * turned into React style objects by the `css()` helper below rather than being
 * hand-translated to camelCase. Behaviour (auto-advance, animated results, radar
 * chart, email capture) mirrors the original DCLogic component exactly.
 */

// ---------------------------------------------------------------------------
// Verbatim CSS string -> React style object. Copying source styles unchanged is
// the safest route to pixel accuracy; only the property name is camelCased.
// ---------------------------------------------------------------------------
function css(text: string): React.CSSProperties {
  const style: Record<string, string> = {};
  for (const decl of text.split(";")) {
    const idx = decl.indexOf(":");
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim();
    const val = decl.slice(idx + 1).trim();
    if (!prop || !val) continue;
    const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    style[camel] = val;
  }
  return style as React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Data (verbatim from the source DCLogic component)
// ---------------------------------------------------------------------------
type Dim = { name: string; short: string; blurb: string };
const DIMS: Dim[] = [
  { name: "Organizational Readiness", short: "Org", blurb: "Leadership conviction, ownership, and team fluency." },
  { name: "Change Management", short: "Change", blurb: "Adoption culture, enablement, appetite to redesign workflows." },
  { name: "Brand Infrastructure", short: "Brand", blurb: "A codified, machine-readable brand, governed at scale." },
  { name: "Creative Operations", short: "Creative", blurb: "Production model, speed, variant volume, and effectiveness." },
  { name: "Tech & Data", short: "Tech & Data", blurb: "Connected stack, learning loops, AI-ready knowledge." },
];

type Option = { label: string; score: number };
type Question = { dim: number; title: string; sub: string; options: Option[] };
const o = (label: string, score: number): Option => ({ label, score });
const QUESTIONS: Question[] = [
  // Organizational Readiness
  { dim: 0, title: "Where does AI-driven creative sit on your leadership's agenda?", sub: "Conviction at the top is what unlocks everything downstream.", options: [
    o("Not on it — it's something the agency experiments with", 0),
    o("Curiosity, no mandate — interest, but no budget reallocated", 25),
    o("A stated priority that wavers when results lag", 50),
    o("A funded mandate, with patience for the learning curve", 75),
    o("An existential bet — core to how the brand competes", 100) ] },
  { dim: 0, title: "Who owns the outcome of AI-generated creative?", sub: "Not who runs the tools — who is accountable for the results.", options: [
    o("No one — it falls between marketing, brand, and the agency", 0),
    o("Whoever's closest to the campaign, ad hoc", 25),
    o("A working group or task force, with no real authority", 50),
    o("A named leader with a dedicated budget line", 75),
    o("An exec with P&L accountability for AI creative output", 100) ] },
  // Change Management
  { dim: 1, title: "When a new creative workflow lands, how does the org react?", sub: "The reflex tells you whether change compounds or stalls.", options: [
    o("Resistance — 'this is how we've always done it'", 0),
    o("Polite pilots that quietly die", 25),
    o("Cautious adoption when leadership pushes", 50),
    o("Teams adopt willingly and share what works", 75),
    o("The org actively hunts for better ways to work", 100) ] },
  { dim: 1, title: "How far will the org go to redesign creative workflows around AI?", sub: "Bolting AI on is not the same as rebuilding for it.", options: [
    o("Not at all — AI bolts onto the old process", 0),
    o("Minor tweaks at the edges", 25),
    o("Willing to redesign a step or two", 50),
    o("Redesigning whole workflows, role by role", 75),
    o("Rebuilding the operating model around AI from the ground up", 100) ] },
  // Brand Infrastructure
  { dim: 2, title: "Could a machine apply your brand without a human translating it?", sub: "The line between a brand book and a Brand OS.", options: [
    o("Brand lives in PDFs and people's heads", 0),
    o("Guidelines exist, but as static documents", 25),
    o("Some assets and rules are digitized and searchable", 50),
    o("Brand is codified — tokens, structured rules, a real system", 75),
    o("Fully machine-readable brand an AI can generate against", 100) ] },
  { dim: 2, title: "How governed and findable are your assets across teams and markets?", sub: "Consistency at scale depends on a trustworthy source of truth.", options: [
    o("Scattered across drives, decks, and inboxes", 0),
    o("A shared folder no one fully trusts", 25),
    o("A DAM that is only half-adopted", 50),
    o("A governed DAM with versioning and permissions", 75),
    o("A single source of truth, governed and used everywhere", 100) ] },
  { dim: 2, title: "How fragmented are your content, creator, and commerce ecosystems?", sub: "Three worlds, or one connected pipeline with a shared brand truth?", options: [
    o("Three separate worlds that never talk", 0),
    o("Loosely connected by manual handoffs", 25),
    o("Shared assets, but separate systems and metrics", 50),
    o("A mostly unified pipeline with a few seams", 75),
    o("One connected system — content, creators, and commerce share a brand source of truth", 100) ] },
  // Creative Operations
  { dim: 3, title: "What's your dominant creative production model?", sub: "Where the work actually gets made shapes everything else.", options: [
    o("Agency retainer for nearly everything", 0),
    o("Agency-led, with some in-house support", 25),
    o("A balance of in-house and agency", 50),
    o("In-house studio; agencies for the big swings", 75),
    o("An in-house AI studio producing at scale", 100) ] },
  { dim: 3, title: "From brief to first usable creative, how fast are you?", sub: "Speed is the clearest external signal of operating maturity.", options: [
    o("Weeks", 0),
    o("Around a week", 25),
    o("A few days", 50),
    o("Within a day", 75),
    o("Minutes to hours, on demand", 100) ] },
  { dim: 3, title: "How many on-brand variants can you make — and do you know which ones actually work?", sub: "Volume is hollow without proven creative effectiveness.", options: [
    o("A handful, and we mostly guess what worked", 0),
    o("A dozen; effectiveness is judged by gut", 25),
    o("Dozens, with basic post-campaign reads", 50),
    o("Hundreds, tested against clear effectiveness signals", 75),
    o("Unlimited on-brand variants, continuously optimized to proven effectiveness", 100) ] },
  // Tech & Data
  { dim: 4, title: "Do performance signals flow back into the next round of creative?", sub: "Learning loops are how creative compounds instead of resetting.", options: [
    o("No — every campaign starts from a blank page", 0),
    o("We review results, but learnings rarely carry forward", 25),
    o("Some learnings inform the next brief, manually", 50),
    o("Performance data shapes the next creative systematically", 75),
    o("A closed learning loop — creative compounds on what works", 100) ] },
  { dim: 4, title: "Is your brand, audience, and performance knowledge captured as data an AI can learn from?", sub: "Organizational knowledge trapped in decks cannot be operationalized.", options: [
    o("Trapped in decks, inboxes, and memory", 0),
    o("Documented, but unstructured", 25),
    o("Partly structured across a few systems", 50),
    o("Mostly structured and accessible", 75),
    o("Structured, governed knowledge an AI can learn from continuously", 100) ] },
];

type Stage = { min: number; max: number; label: string; archetype: string; tagline: string; desc: string };
const STAGES: Stage[] = [
  { min: 0, max: 20, label: "Agency-Dependent", archetype: "The Commissioner", tagline: "You brief it; someone else builds it.",
    desc: "Your brand lives outside your own walls — in agency retainers, static PDFs, and the heads of a few key people. Creative is a series of one-off commissions, and every campaign starts from scratch. The raw material for a Brand OS exists; none of it is yet yours to operate." },
  { min: 20, max: 40, label: "Tool-Assisted", archetype: "The Experimenter", tagline: "Tools in hand, no system yet.",
    desc: "You've put AI tools in people's hands and pockets of speed are emerging. But the wins are individual, not institutional — nothing connects, learnings evaporate, and consistency slips the moment you scale. You're proving the value; now it needs an operating model behind it." },
  { min: 40, max: 60, label: "Centralizing", archetype: "The Architect", tagline: "Pulling the pieces into one place.",
    desc: "You are actively assembling the foundation — codifying the brand, governing assets, standing up in-house capability. The pipeline is taking shape but still has seams, and learning loops are manual. This is the pivotal stretch: the architecture you lay now decides how far the Brand OS can scale." },
  { min: 60, max: 80, label: "AI-Augmented", archetype: "The Conductor", tagline: "Orchestrating people and AI at scale.",
    desc: "Your brand is largely codified and your stack is connected enough that creative moves fast and stays on-brand across markets. AI augments your team rather than replacing process, and performance increasingly feeds the next round. The Brand OS is real — the work now is to close the last loops and make it the default." },
  { min: 80, max: 101, label: "AI-Native Brand OS", archetype: "The Operator", tagline: "The brand runs as a system; you run the system.",
    desc: "Your brand is fully machine-readable, your ecosystems share one source of truth, and creative compounds on a closed learning loop. You produce effective, on-brand work at near-unlimited scale. You are operating a Brand OS — the frontier from here is sharpening effectiveness and extending it across every surface the brand touches." },
];

const MOVES: string[] = [
  "Name a single owner with budget authority for AI creative — conviction and momentum follow ownership. Pair them with a fluency push so the team builds, not just watches.",
  "Stand up living playbooks and a bench of internal champions so new workflows stick instead of stalling, and treat workflow redesign as the goal rather than bolting AI onto old steps.",
  "Codify your brand into machine-readable tokens and rules under one governed source of truth — the foundation any Brand OS runs on — and connect your content, creator, and commerce ecosystems to it.",
  "Shift from project-by-project commissioning to an always-on studio that generates on-brand variants at volume and tests them against real effectiveness signals.",
  "Close the learning loop — connect the stack end to end and pipe performance back into the next round of creative so your brand knowledge accumulates as data, not decks.",
];

// ---------------------------------------------------------------------------
// Scoring helpers (verbatim logic)
// ---------------------------------------------------------------------------
function dimScores(answers: (number | null)[]): number[] {
  const sums = [0, 0, 0, 0, 0];
  const counts = [0, 0, 0, 0, 0];
  QUESTIONS.forEach((q, i) => {
    const v = answers[i] == null ? 0 : q.options[answers[i] as number].score;
    sums[q.dim] += v;
    counts[q.dim] += 1;
  });
  return sums.map((s, d) => Math.round(s / counts[d]));
}

function readLabel(v: number): string {
  if (v < 30) return "Early";
  if (v < 55) return "Forming";
  if (v < 75) return "Maturing";
  return "Advanced";
}

// ---------------------------------------------------------------------------
// Radar chart (ported from buildRadar)
// ---------------------------------------------------------------------------
function Radar({ vals }: { vals: number[] }) {
  const size = 360, c = 180, rad = 116;
  const ang = (i: number) => ((-90 + i * 72) * Math.PI) / 180;
  const pt = (i: number, r: number): [number, number] => [c + r * Math.cos(ang(i)), c + r * Math.sin(ang(i))];
  const ringPts = (f: number) => DIMS.map((_, i) => pt(i, rad * f).join(",")).join(" ");
  const dataPts = DIMS.map((_, i) => pt(i, rad * (vals[i] / 100)));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="auto" style={{ display: "block", overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((f, k) => (
        <polygon key={"r" + k} points={ringPts(f)} fill="none" stroke="#eaeaea" strokeWidth={1} />
      ))}
      {DIMS.map((_, i) => {
        const [x, y] = pt(i, rad);
        return <line key={"a" + i} x1={c} y1={c} x2={x} y2={y} stroke="#eaeaea" strokeWidth={1} />;
      })}
      <polygon
        points={dataPts.map((p) => p.join(",")).join(" ")}
        fill="rgba(254,92,43,0.15)"
        stroke="#fe5c2b"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {dataPts.map((p, i) => (
        <circle key={"d" + i} cx={p[0]} cy={p[1]} r={4.5} fill="#fe5c2b" stroke="#fff" strokeWidth={1.5} />
      ))}
      {DIMS.map((d, i) => {
        const [x, y] = pt(i, rad + 30);
        let anchor: "start" | "middle" | "end" = "middle";
        if (x > c + 6) anchor = "start";
        else if (x < c - 6) anchor = "end";
        return (
          <text key={"l" + i} x={x} y={y + 4} textAnchor={anchor} fontFamily="Manrope, sans-serif" fontSize={12.5} fontWeight={700} fill="#414651">
            {d.short}
          </text>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Hover / active styles + fonts (scoped to this page)
// ---------------------------------------------------------------------------
const SCOPED_CSS = `
.cmo-root .cmo-start:hover { background:#000 !important; }
.cmo-root .cmo-start:active { transform:scale(.98) !important; }
.cmo-root .cmo-opt:hover { border-color:#ffa47d !important; }
.cmo-root .cmo-back:hover { color:#202224 !important; }
.cmo-root .cmo-retake:hover { background:#f6f5f8 !important; }
.cmo-gate .cmo-lead-input::placeholder { color:#9a9a9a; }
.cmo-gate .cmo-lead-input:focus { border-color:#fe5c2b !important; box-shadow:0 0 0 3px rgba(254,92,43,.12); }
.cmo-gate .cmo-lead-submit:hover { background:#e54d1f !important; }
.cmo-gate .cmo-lead-submit:disabled { opacity:.65; cursor:default; }
.cmo-gate .cmo-lead-submit:disabled:hover { background:#fe5c2b !important; }
`;

function useHandbookFonts() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    const add = (attrs: Record<string, string>) => {
      const id = "cmo-font-" + attrs.href;
      if (document.getElementById(id)) return;
      const l = document.createElement("link");
      l.id = id;
      Object.entries(attrs).forEach(([k, v]) => l.setAttribute(k, v));
      document.head.appendChild(l);
      links.push(l);
    };
    add({ rel: "preconnect", href: "https://fonts.googleapis.com" });
    add({ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" });
    add({
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
    });
    return () => links.forEach((l) => l.remove());
  }, []);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
type Screen = "intro" | "quiz" | "results";

export default function CMOHandbook() {
  useHandbookFonts();

  const [screen, setScreen] = useState<Screen>("intro");
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => new Array(12).fill(null));
  const pickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (pickTimer.current) clearTimeout(pickTimer.current);
  }, []);

  const start = () => { setScreen("quiz"); setQi(0); };
  const back = () => { if (qi > 0) setQi(qi - 1); else setScreen("intro"); };
  const retake = () => {
    setScreen("intro"); setQi(0); setAnswers(new Array(12).fill(null));
  };
  const pick = (i: number) => {
    const cur = qi;
    setAnswers((prev) => { const next = prev.slice(); next[cur] = i; return next; });
    if (pickTimer.current) clearTimeout(pickTimer.current);
    pickTimer.current = setTimeout(() => {
      if (cur < 11) setQi(cur + 1);
      else setScreen("results");
    }, 360);
  };

  return (
    <div className="cmo-root" style={css("min-height:100vh;background:#fcfcfc;font-family:'Inter',sans-serif;color:#202224;-webkit-font-smoothing:antialiased;")}>
      <style>{SCOPED_CSS}</style>

      {screen === "intro" && <Intro onStart={start} />}
      {screen === "quiz" && <Quiz qi={qi} answers={answers} onPick={pick} onBack={back} />}
      {screen === "results" && (
        <Results answers={answers} onRetake={retake} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Intro screen
// ---------------------------------------------------------------------------
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={css("max-width:860px;margin:0 auto;padding:56px 32px 100px;")}>
      <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:56px;")}>
        <img src={logo} alt="juice" style={css("height:28px;display:block;")} />
        <span style={css("font:600 11px/1 'Manrope',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#717680;")}>Brand OS Readiness</span>
      </div>

      <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#fe5c2b;margin-bottom:20px;")}>CMO Assessment</div>
      <h1 style={css("font:800 52px/1.04 'Manrope',sans-serif;letter-spacing:-.025em;color:#101828;margin:0 0 24px;max-width:18ch;")}>
        Dear CMO,{" "}<div>are you ready to run your brand on a BrandOS?</div>
      </h1>
      <p style={css("font:400 18px/1.6 'Inter',sans-serif;color:#58575b;margin:0 0 44px;max-width:60ch;")}>
        Most brands still commission creative one project at a time. A Brand OS makes the brand itself the system — codified, connected, and capable of producing effective creative at scale. This assessment scores your readiness across five dimensions and maps you onto the maturity ladder.
      </p>

      <div style={css("display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:48px;")}>
        {DIMS.map((d, i) => (
          <div key={i} style={css("background:#ffffff;border:1px solid #e8e8e8;border-radius:16px;padding:20px 16px;box-shadow:0 1px 3px 0 rgba(0,0,0,.04);")}>
            <div style={css("font:800 13px/1 'Manrope',sans-serif;color:#fe5c2b;margin-bottom:14px;")}>{"0" + (i + 1)}</div>
            <div style={css("font:700 14px/1.25 'Manrope',sans-serif;color:#202224;margin-bottom:8px;")}>{d.name}</div>
            <div style={css("font:400 12px/1.45 'Inter',sans-serif;color:#717680;")}>{d.blurb}</div>
          </div>
        ))}
      </div>

      <div style={css("display:flex;align-items:center;gap:24px;flex-wrap:wrap;")}>
        <button
          className="cmo-start"
          onClick={onStart}
          style={css("display:inline-flex;align-items:center;gap:10px;background:#202224;color:#fff;border:none;border-radius:8px;padding:16px 28px;font:700 16px/1 'Manrope',sans-serif;cursor:pointer;transition:all 150ms;")}
        >
          Start the assessment
          <span style={css("font-size:18px;")}>→</span>
        </button>
        <span style={css("font:400 13px/1.4 'Inter',sans-serif;color:#888888;")}>12 questions · about 5 minutes · results stay on this device</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quiz screen
// ---------------------------------------------------------------------------
function Quiz({ qi, answers, onPick, onBack }: { qi: number; answers: (number | null)[]; onPick: (i: number) => void; onBack: () => void }) {
  const q = QUESTIONS[qi];
  const sel = answers[qi];
  const answered = answers.filter((a) => a != null).length;
  const progressPct = Math.round((answered / 12) * 100) + "%";

  return (
    <div style={css("max-width:680px;margin:0 auto;padding:40px 32px 96px;")}>
      <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;")}>
        <img src={logo} alt="juice" style={css("height:24px;display:block;")} />
        <span style={css("font:600 12px/1 'Manrope',sans-serif;color:#888888;")}>Question {qi + 1} of 12</span>
      </div>

      <div style={css("height:6px;border-radius:9999px;background:#e8e8e8;overflow:hidden;margin-bottom:36px;")}>
        <div style={{ ...css("height:100%;border-radius:9999px;background:#fe5c2b;transition:width 400ms ease;"), width: progressPct }} />
      </div>

      <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fe5c2b;margin-bottom:14px;")}>{DIMS[q.dim].name}</div>
      <h2 style={css("font:800 28px/1.25 'Manrope',sans-serif;letter-spacing:-.02em;color:#101828;margin:0 0 10px;")}>{q.title}</h2>
      <p style={css("font:400 15px/1.5 'Inter',sans-serif;color:#717680;margin:0 0 28px;")}>{q.sub}</p>

      <div style={css("display:flex;flex-direction:column;gap:10px;")}>
        {q.options.map((opt, i) => {
          const on = i === sel;
          const btnStyle =
            "display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:15px 18px;border-radius:12px;border:1.5px solid " +
            (on ? "#fe5c2b" : "#e8e8e8") + ";background:" + (on ? "#fff5f0" : "#ffffff") +
            ";cursor:pointer;font-family:Inter,sans-serif;font-size:15px;line-height:1.45;color:#202224;transition:all 150ms;box-shadow:" +
            (on ? "0 4px 16px 0 rgba(254,92,43,.10)" : "0 1px 3px 0 rgba(0,0,0,.04)") + ";";
          const outer =
            "width:22px;height:22px;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex:none;border:2px solid " +
            (on ? "#fe5c2b" : "#d0d0d0") + ";transition:all 150ms;";
          const inner =
            "width:11px;height:11px;border-radius:9999px;background:#fe5c2b;transition:all 150ms;transform:scale(" + (on ? 1 : 0) + ");";
          return (
            <button key={i} className="cmo-opt" onClick={() => onPick(i)} style={css(btnStyle)}>
              <span style={css(outer)}><span style={css(inner)} /></span>
              <span style={css("flex:1;")}>{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div style={css("margin-top:32px;")}>
        <button
          className="cmo-back"
          onClick={onBack}
          style={css("background:none;border:none;color:#717680;font:600 14px/1 'Manrope',sans-serif;cursor:pointer;padding:8px 0;display:inline-flex;align-items:center;gap:6px;")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lead-capture gate — a light popup over the masked (blurred) results. The
// results reveal only once the visitor submits their details, which are saved
// to Supabase (cmo_leads) and surfaced in /admin-leads.
// ---------------------------------------------------------------------------
function LeadGate({ score, archetype, dimensions, onRevealed }: {
  score: number;
  archetype: string;
  dimensions: Record<string, number>;
  onRevealed: () => void;
}) {
  const [name, setName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !org.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setErr("Please fill in every field with valid details.");
      return;
    }
    setBusy(true);
    setErr("");
    const { data, error } = await supabase.rpc("submit_cmo_lead", {
      p_name: name.trim(),
      p_phone: phone.trim(),
      p_email: leadEmail.trim(),
      p_organization: org.trim(),
      p_score: score,
      p_archetype: archetype,
      p_dimensions: dimensions,
    });
    setBusy(false);
    if (error || !data?.ok) {
      setErr(error ? "Something went wrong — please try again." : "Please fill in every field with valid details.");
      return;
    }
    onRevealed();
  };

  const inputCss = css(
    "width:100%;background:#fff;border:1.5px solid #e6e5e2;border-radius:11px;padding:13px 15px;color:#202224;font:400 15px/1.3 'Inter',sans-serif;outline:none;transition:border-color 150ms,box-shadow 150ms;",
  );

  return (
    <div
      className="cmo-gate"
      style={css(
        "position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(250,249,247,.55);backdrop-filter:blur(10px) saturate(1.05);-webkit-backdrop-filter:blur(10px) saturate(1.05);",
      )}
    >
      <form
        onSubmit={submit}
        style={css(
          "width:100%;max-width:452px;background:#fff;border:1px solid rgba(16,24,40,.06);border-radius:22px;box-shadow:0 30px 80px -28px rgba(22,23,28,.5);padding:36px 36px 30px;",
        )}
      >
        <div style={css("font:700 11.5px/1 'Manrope',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#fe5c2b;margin-bottom:14px;")}>Your results are ready</div>
        <h2 style={css("font:800 26px/1.15 'Manrope',sans-serif;letter-spacing:-.02em;color:#101828;margin:0 0 10px;max-width:15ch;")}>Where should we send your scorecard?</h2>
        <p style={css("font:400 14.5px/1.55 'Inter',sans-serif;color:#58575b;margin:0 0 24px;")}>Add your details to unlock your full Brand OS readiness — your score, profile, and the two moves that matter most.</p>

        <div style={css("display:flex;flex-direction:column;gap:10px;")}>
          <input className="cmo-lead-input" style={inputCss} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
          <input className="cmo-lead-input" style={inputCss} type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="Business email" autoComplete="email" />
          <input className="cmo-lead-input" style={inputCss} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s-]/g, ""))} placeholder="Contact number" autoComplete="tel" />
          <input className="cmo-lead-input" style={inputCss} value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Organization" autoComplete="organization" />
        </div>

        {err && <p style={css("font:500 13px/1.5 'Inter',sans-serif;color:#c0392b;margin:12px 0 0;")}>{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="cmo-lead-submit"
          style={css(
            "width:100%;margin-top:16px;background:#fe5c2b;color:#fff;border:none;border-radius:10px;padding:15px 20px;font:700 15px/1 'Manrope',sans-serif;cursor:pointer;transition:background 150ms;",
          )}
        >
          {busy ? "Unlocking…" : "Unlock my results"}
        </button>
        <p style={css("font:400 12px/1.5 'Inter',sans-serif;color:#9a9a9a;margin:14px 0 0;")}>We'll only use this to share your results and follow up about your Brand OS. No spam.</p>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Results screen
// ---------------------------------------------------------------------------
function Results({ answers, onRetake }: { answers: (number | null)[]; onRetake: () => void }) {
  const scores = dimScores(answers);
  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  let stageIdx = STAGES.findIndex((st) => overall >= st.min && overall < st.max);
  if (stageIdx < 0) stageIdx = STAGES.length - 1;
  const stage = STAGES[stageIdx];

  const order = scores.map((sc, i) => ({ i, sc })).sort((a, b) => a.sc - b.sc);
  const weakest = order.slice(0, 2);
  const moves = weakest.map((w, k) => ({ rank: k === 0 ? "1" : "2", name: DIMS[w.i].name, score: w.sc, move: MOVES[w.i] }));
  // Per-dimension scores, keyed by dimension name — saved with the lead.
  const dimensions = DIMS.reduce<Record<string, number>>((acc, d, i) => { acc[d.name] = scores[i]; return acc; }, {});
  const pathIntro =
    "Wherever you sit on the ladder, the destination is the same — a brand that runs as an operating system. Your two lowest dimensions are where that climb starts. Close these first and the rest of the profile lifts with them.";

  // The results stay masked behind a lead-capture gate; they reveal (and the
  // bars/radar animate in) only after the visitor submits their details.
  const [gated, setGated] = useState(true);
  const [barsIn, setBarsIn] = useState(false);
  const barsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (barsTimer.current) clearTimeout(barsTimer.current); }, []);
  useEffect(() => {
    if (!gated) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden"; // lock background scroll while gated
    return () => { html.style.overflow = prev; };
  }, [gated]);
  const reveal = () => {
    setGated(false);
    barsTimer.current = setTimeout(() => setBarsIn(true), 80);
  };

  return (
    <>
    <div style={css("max-width:1000px;margin:0 auto;padding:48px 32px 110px;")}>
      <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:40px;")}>
        <img src={logo} alt="juice" style={css("height:26px;display:block;")} />
        <button className="cmo-retake" onClick={onRetake} style={css("background:none;border:1px solid #e8e8e8;border-radius:8px;color:#58575b;font:600 13px/1 'Manrope',sans-serif;cursor:pointer;padding:10px 16px;")}>Retake</button>
      </div>

      {/* Archetype hero */}
      <div style={css("background:#202224;border-radius:24px;padding:44px 44px 40px;color:#fff;margin-bottom:24px;position:relative;overflow:hidden;")}>
        <div style={css("position:absolute;top:-70px;right:-50px;width:300px;height:300px;border-radius:9999px;background:#fe5c2b;")} />
        <div style={css("position:absolute;top:90px;right:120px;width:160px;height:160px;border-radius:9999px;background:#e54d1f;opacity:.6;")} />
        <div style={css("position:relative;display:flex;justify-content:space-between;align-items:flex-start;gap:32px;flex-wrap:wrap;")}>
          <div style={css("flex:1;min-width:300px;")}>
            <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#fe5c2b;margin-bottom:16px;")}>Stage {stageIdx + 1} of 5 · {stage.label}</div>
            <h1 style={css("font:800 44px/1.05 'Manrope',sans-serif;letter-spacing:-.025em;margin:0 0 6px;")}>{stage.archetype}</h1>
            <div style={css("font:600 17px/1.4 'Manrope',sans-serif;color:#ffc9ad;margin-bottom:20px;")}>{stage.tagline}</div>
            <p style={css("font:400 15px/1.6 'Inter',sans-serif;color:#d0d0d0;margin:0;max-width:54ch;")}>{stage.desc}</p>
          </div>
          <div style={css("text-align:center;flex:none;")}>
            <div style={css("font:800 64px/1 'Manrope',sans-serif;letter-spacing:-.03em;color:#fff;")}>{overall}</div>
            <div style={css("font:600 12px/1 'Manrope',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#888888;margin-top:8px;")}>Readiness score</div>
          </div>
        </div>
      </div>

      {/* Maturity ladder */}
      <div style={css("background:#fff;border:1px solid #e8e8e8;border-radius:20px;padding:28px 32px;margin-bottom:24px;box-shadow:0 1px 3px 0 rgba(0,0,0,.04);")}>
        <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#717680;margin-bottom:22px;")}>The Brand OS maturity ladder</div>
        <div style={css("display:flex;gap:8px;align-items:flex-end;")}>
          {STAGES.map((st, i) => {
            const active = i === stageIdx;
            const reached = i <= stageIdx;
            const h = 34 + i * 18 + "px";
            const bg = active ? "#fe5c2b" : reached ? "#ffc9ad" : "#ededed";
            const labelColor = active ? "#fe5c2b" : reached ? "#b33d18" : "#aaaaaa";
            return (
              <div key={i} style={css("flex:1;text-align:center;")}>
                <div style={{ ...css("border-radius:8px 8px 0 0;transition:all 400ms ease;"), height: h, background: bg }} />
                <div style={{ ...css("font:700 12px/1.3 'Manrope',sans-serif;margin-top:10px;"), color: labelColor }}>{st.label}</div>
                <div style={css("font:500 11px/1.2 'Inter',sans-serif;color:#aaaaaa;margin-top:3px;")}>{st.archetype}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Radar + bars */}
      <div style={css("display:grid;grid-template-columns:1fr 1.15fr;gap:24px;margin-bottom:24px;")}>
        <div style={css("background:#fff;border:1px solid #e8e8e8;border-radius:20px;padding:28px 24px;box-shadow:0 1px 3px 0 rgba(0,0,0,.04);")}>
          <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#717680;margin-bottom:16px;")}>Your readiness profile</div>
          <div style={{ ...css("transition:opacity 600ms ease;padding:8px 14px;"), opacity: barsIn ? 1 : 0 }}><Radar vals={scores} /></div>
        </div>
        <div style={css("background:#fff;border:1px solid #e8e8e8;border-radius:20px;padding:28px 28px;box-shadow:0 1px 3px 0 rgba(0,0,0,.04);")}>
          <div style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#717680;margin-bottom:20px;")}>Dimension scores</div>
          <div style={css("display:flex;flex-direction:column;gap:18px;")}>
            {DIMS.map((d, i) => (
              <div key={i}>
                <div style={css("display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px;")}>
                  <span style={css("font:700 14px/1.2 'Manrope',sans-serif;color:#202224;")}>{d.name}</span>
                  <span style={css("font:600 13px/1 'Manrope',sans-serif;color:#717680;")}><span style={css("color:#202224;")}>{scores[i]}</span> · {readLabel(scores[i])}</span>
                </div>
                <div style={css("height:8px;border-radius:9999px;background:#f0f0f0;overflow:hidden;")}>
                  <div style={{ ...css("height:100%;border-radius:9999px;background:#fe5c2b;transition:width 800ms ease;"), width: (barsIn ? scores[i] : 0) + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Path to Brand OS */}
      <div style={css("background:#fff5f0;border:1px solid #f9e4df;border-radius:20px;padding:32px 36px;margin-bottom:24px;")}>
        <div style={css("display:flex;align-items:center;gap:10px;margin-bottom:8px;")}>
          <span style={css("width:8px;height:8px;border-radius:9999px;background:#fe5c2b;display:inline-block;")} />
          <span style={css("font:700 12px/1 'Manrope',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#b33d18;")}>Your path to a Brand OS</span>
        </div>
        <p style={css("font:400 15px/1.6 'Inter',sans-serif;color:#58575b;margin:0 0 24px;max-width:62ch;")}>{pathIntro}</p>
        <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:16px;")}>
          {moves.map((mv, i) => (
            <div key={i} style={css("background:#fff;border:1px solid #f9e4df;border-radius:14px;padding:22px 22px;")}>
              <div style={css("display:flex;align-items:center;gap:10px;margin-bottom:12px;")}>
                <span style={css("font:800 13px/1 'Manrope',sans-serif;color:#fe5c2b;background:#fff0ed;border-radius:8px;padding:6px 9px;")}>{mv.rank}</span>
                <span style={css("font:700 15px/1.2 'Manrope',sans-serif;color:#202224;")}>{mv.name}</span>
                <span style={css("font:600 12px/1 'Manrope',sans-serif;color:#888888;margin-left:auto;")}>{mv.score}</span>
              </div>
              <div style={css("font:400 14px/1.55 'Inter',sans-serif;color:#58575b;")}>{mv.move}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
    {gated && (
      <LeadGate score={overall} archetype={stage.archetype} dimensions={dimensions} onRevealed={reveal} />
    )}
    </>
  );
}
