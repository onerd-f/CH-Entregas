import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Entregadores from "../pages/Entregadores";
import Entregas from "../pages/Entregas";
import Rastreamento from "../pages/Rastreamento";
import Relatorios from "../pages/Relatorios";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/entregadores" element={<Entregadores />} />
      <Route path="/entregas" element={<Entregas />} />
      <Route path="/rastreamento" element={<Rastreamento />} />
      <Route path="/relatorios" element={<Relatorios />} />
    </Routes>
  );
}