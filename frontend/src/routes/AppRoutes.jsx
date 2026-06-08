import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Entregadores from "../pages/Entregadores";
import Entregas from "../pages/Entregas";
import Rastreamento from "../pages/Rastreamento";
import Relatorios from "../pages/Relatorios";
import Login from "../pages/Login";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Clientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/entregadores"
        element={
          <ProtectedRoute>
            <Entregadores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/entregas"
        element={
          <ProtectedRoute>
            <Entregas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rastreamento"
        element={
          <ProtectedRoute>
            <Rastreamento />
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <Relatorios />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}