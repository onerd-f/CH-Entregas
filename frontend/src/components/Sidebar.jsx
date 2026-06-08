import { Link } from "react-router-dom";
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
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="CH Entregas" className="w-32 mb-3"/>
          <h2 className="text-lg font-bold text-white">
            CH Entregas
          </h2>
        </div>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.nome}
            to={item.rota}
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            {item.nome}
          </Link>
        ))}
      </nav>
    </aside>
  );
}