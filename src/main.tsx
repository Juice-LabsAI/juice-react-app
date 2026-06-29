
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import App from "./app/App.tsx";
  import D2C from "./app/D2C.tsx";
  import QuickAds from "./app/QuickAds.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/d2c" element={<D2C />} />
        <Route path="/quick-ads" element={<QuickAds />} />
      </Routes>
    </BrowserRouter>,
  );
