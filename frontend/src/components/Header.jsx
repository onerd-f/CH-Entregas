import logo from "../assets/logo-ch-entregas.png";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm rounded-xl p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="CH Entregas"
          className="w-12"
        />

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Sistema de Gestão de Entregas
          </h2>

          <p className="text-slate-500 text-sm">
            CH Entregas
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-800">
            {usuario?.nome}
          </p>

          <p className="text-slate-500 text-sm">
            {usuario?.perfil}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </div>
    </header>
  );
}