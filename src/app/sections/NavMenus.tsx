import juice from "../../imports/5Jun/dbd1458dc39ff3481e390cd69297b0f6327995c8.png";
import shot from "../../imports/5Jun/hero-dashboard.png";

type Item = { title: string; desc: string };

const STRATEGY: Item[] = [
  { title: "New brand strategy", desc: "Save and share creative inspiration" },
  { title: "Product launch plan", desc: "Coordinate marketing efforts for impact" },
  { title: "User experience improvement", desc: "Enhance navigation and usability" },
  { title: "Market analysis", desc: "Identify trends and consumer preferences" },
  { title: "Product launch plan", desc: "Outline steps for successful rollout" },
];

const CREATIVES: Item[] = [
  { title: "User experience research", desc: "Understand user needs and behaviors" },
  { title: "Design system overhaul", desc: "Streamline components for consistency" },
  { title: "Market analysis report", desc: "Identify key trends and opportunities" },
  { title: "User experience testing", desc: "Gather feedback for product improvement" },
  { title: "Social media campaign launch", desc: "Engage audience with targeted content" },
  { title: "Design sprint workshop", desc: "Collaborate on innovative solutions" },
  { title: "Product launch campaign", desc: "Engage customers with interactive content" },
  { title: "Website redesign project", desc: "Improve user experience and visual appeal" },
  { title: "Social media strategy", desc: "Increase brand awareness and engagement" },
  { title: "User experience redesign", desc: "Enhance usability and accessibility" },
];

const INSIGHTS: Item[] = [
  { title: "Marketing campaign launch", desc: "Engage audience through social media" },
  { title: "Product launch plan", desc: "Coordinate marketing and sales efforts" },
  { title: "User research findings", desc: "Analyze customer feedback for design" },
];

const PREFLIGHT: Item[] = [
  { title: "Product feature update", desc: "User experience with new functionalities" },
  { title: "User feedback collection", desc: "Gather insights through surveys" },
  { title: "Sales strategy meeting", desc: "Align team goals for upcoming quarter" },
];

const COMMERCE: Item[] = [
  { title: "Performance improvement", desc: "Faster load times and reduced latency" },
];

function Column({ label, items }: { label: string; items: Item[] }) {
  return (
    <div className="min-w-0">
      <p className="font-body text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#b389e9]">{label}</p>
      <ul className="mt-5 flex flex-col gap-5">
        {items.map((it, i) => (
          <li key={it.title + i}>
            <a href="#" className="group block">
              <p className="font-display text-[10px] font-bold uppercase leading-none tracking-[0.04em] text-white transition-colors group-hover:text-[#b389e9]">
                {it.title}
              </p>
              <p className="mt-2 font-body text-[13px] leading-tight text-[#cacaca]">{it.desc}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return <div className="w-px shrink-0 self-stretch bg-[#4e4f50]" />;
}

export function SolutionsMenu() {
  return (
    <div className="flex gap-8">
      <div className="w-[230px] shrink-0">
        <Column label="STRATEGY" items={STRATEGY} />
      </div>
      <Divider />
      <div className="w-[250px] shrink-0">
        <Column label="CREATIVES" items={CREATIVES} />
      </div>
      <Divider />
      <div className="flex flex-1 flex-col gap-7">
        <div className="flex gap-8">
          <div className="w-[230px] shrink-0">
            <Column label="INSIGHTS" items={INSIGHTS} />
          </div>
          <div className="flex w-[230px] shrink-0 flex-col gap-7">
            <Column label="PRE-FLIGHT" items={PREFLIGHT} />
            <Column label="COMMERCE" items={COMMERCE} />
          </div>
        </div>

        {/* What is JuiceAI? card */}
        <div className="relative mt-1 flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-[#333537] pl-6">
          <img
            src={juice}
            alt=""
            className="pointer-events-none absolute -left-6 -bottom-4 h-[120px] w-auto opacity-90"
            draggable={false}
          />
          <p className="relative z-10 ml-[150px] font-body text-2xl font-medium text-white">What is JuiceAI?</p>
          <img src={shot} alt="" className="h-[110px] w-auto rounded-l-lg object-cover" draggable={false} />
        </div>
      </div>
    </div>
  );
}

/* Placeholder for nav items whose menus aren't designed yet. */
export function ComingSoonMenu({ label }: { label: string }) {
  return (
    <div className="flex min-h-[120px] flex-col items-start justify-center">
      <p className="font-body text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#b389e9]">{label}</p>
      <p className="mt-3 font-body text-lg text-white">Coming soon</p>
      <p className="mt-1 font-body text-[13px] text-[#cacaca]">
        This menu is still being designed — check back shortly.
      </p>
    </div>
  );
}
