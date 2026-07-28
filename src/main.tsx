
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router";
  import App from "./app/App.tsx";
  import D2C from "./app/D2C.tsx";
  import QuickAds from "./app/QuickAds.tsx";
  import Creators from "./app/Creators.tsx";
  import Redeem from "./app/Redeem.tsx";
  import AdminLeads from "./app/AdminLeads.tsx";
  import CMOHandbook from "./app/CMOHandbook.tsx";
  import PovGenzIndia from "./app/PovGenzIndia.tsx";
  import TermsConditions from "./app/TermsConditions.tsx";
  import PrivacyPolicy from "./app/PrivacyPolicy.tsx";
  import WaitlistPopup from "./app/sections/WaitlistPopup.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/d2c" element={<D2C />} />
        <Route path="/quick-ads" element={<QuickAds />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/admin-leads" element={<AdminLeads />} />

        {/* POV — long-form points of view. /pov has no landing page yet, so it
            (and any unknown child) sends visitors home. Route matching is
            case-insensitive, so /pov/cmo-handbook resolves too. */}
        <Route path="/pov/CMO-Handbook" element={<CMOHandbook />} />
        <Route path="/pov/genz-india" element={<PovGenzIndia />} />
        <Route path="/pov" element={<Navigate to="/" replace />} />
        <Route path="/pov/*" element={<Navigate to="/" replace />} />

        {/* Legacy URL — the handbook shipped here before it moved under /pov.
            Kept as a redirect so links already in the wild keep working.
            (Also mirrored as a server-side 301 in vercel.json / netlify.toml.) */}
        <Route path="/CMO-Handbook" element={<Navigate to="/pov/CMO-Handbook" replace />} />

        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <WaitlistPopup />
    </BrowserRouter>,
  );
