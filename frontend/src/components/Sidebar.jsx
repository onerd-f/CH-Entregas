import { NavLink } from "react-router-dom";
import logo from "../assets/logo-ch-entregas.png";

export default function Sidebar() {
  const menu = [
    { nome: "Dashboard", rota: "/" },
    { nome: "Clientes", rota: "/clientes" },
    { nome: "Entregadores", rota: "/entregadores" },
    { nome: "Entregas", rota: "/entregas" },
    { nome: "Rastreamento", rota: "/rastreamento" },
    { nome: "Relatórios", rota: "/relatorios" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6 flex flex-col">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="CH Entregas" className="w-40 mb-4"/>
          <h2 className="text-lg font-bold text-white">
            CH Entregas
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            Gestão Inteligente de Entregas
          </p>
        </div>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <NavLink to={item.rota} className={({ isActive }) => `px-4 py-3 rounded-lg transition ${
            isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-slate-800"}`}>{item.nome}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-10 text-center text-xs text-slate-500">
        CH Entregas v1.0
        <br />
        Projeto Acadêmico ADS
      </div>
    </aside>
  );
}