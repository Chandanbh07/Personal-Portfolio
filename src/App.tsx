import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Terminal from "./pages/Terminal";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/terminal" element={<Terminal />} />
    </Routes>
  );
}
