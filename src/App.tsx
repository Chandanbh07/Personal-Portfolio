import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Terminal from "./pages/Terminal";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const showLoader = isLoading && location.pathname === "/";

  return (
    <>
      {showLoader && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/terminal" element={<Terminal />} />
      </Routes>
    </>
  );
}
