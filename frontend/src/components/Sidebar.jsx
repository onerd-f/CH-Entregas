import { NavLink } from "react-router-dom";
import logo from "../assets/logo-ch-entregas.png";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  console.log(usuario);

 const menu =
  usuario?.perfil === "operador"
    ? [
        { nome: "Dashboard", rota: "/" },
        { nome: "Entregas", rota: "/entregas" },
        { nome: "Rastreamento", rota: "/rastreamento" },
      ]
    : [
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
        <img
          src={logo}
          alt="CH Entregas"
          className="w-40 mb-4"
        />

        <h2 className="text-lg font-bold">
          CH Entregas
        </h2>

        <p className="text-xs text-slate-400 text-center mt-1">
          Gestão Inteligente de Entregas
        </p>

        <p className="text-xs text-blue-400 mt-2">
          Perfil: {usuario?.perfil}
        </p>
      </div>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <NavLink
            key={item.rota}
            to={item.rota}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.nome}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-800">
        <p className="font-medium">
          {usuario?.nome}
        </p>

        <p className="text-xs text-slate-400 mb-4">
          {usuario?.perfil}
        </p>

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Sair
        </button>
      </div>

    </aside>
  );
}