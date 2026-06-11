import { Routes, Route } from "react-router-dom";
import AdminRoute from "../components/AdminRoute";
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
    <AdminRoute>
      <Clientes />
    </AdminRoute>
  }
/>

<Route
  path="/entregadores"
  element={
    <AdminRoute>
      <Entregadores />
    </AdminRoute>
  }
/>

<Route
  path="/relatorios"
  element={
    <AdminRoute>
      <Relatorios />
    </AdminRoute>
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
    </Routes>
  );
}