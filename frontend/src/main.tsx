import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import RoutesScreen from "./ui/screens/RoutesScreen";
import CompareScreen from "./ui/screens/CompareScreen";
import BankingScreen from "./ui/screens/BankingScreen";
import PoolingScreen from "./ui/screens/PoolingScreen";




createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
<Routes>
  <Route path="/" element={<Navigate to="/routes" />} />
  <Route path="/routes" element={<RoutesScreen />} />
  <Route path="/compare" element={<CompareScreen />} />   {/* ✅ Add this */}
  <Route path="/banking" element={<BankingScreen />} />
  <Route path="/pooling" element={<PoolingScreen />} />
</Routes>

  </BrowserRouter>
);
