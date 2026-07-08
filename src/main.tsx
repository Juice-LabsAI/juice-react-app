
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import D2C from "./app/D2C.tsx";
  import QuickAds from "./app/QuickAds.tsx";
  import Redeem from "./app/Redeem.tsx";
  import AdminLeads from "./app/AdminLeads.tsx";
  import CMOHandbook from "./app/CMOHandbook.tsx";
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
        <Route path="/redeem" element={<Redeem />} />
        <Route path="/admin-leads" element={<AdminLeads />} />
        <Route path="/CMO-Handbook" element={<CMOHandbook />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <WaitlistPopup />
    </BrowserRouter>,
  );
