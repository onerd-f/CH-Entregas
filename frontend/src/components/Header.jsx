import logo from "../assets/logo-ch-entregas.png";

export default function Header() {
  return (
    <header className="bg-white shadow-sm rounded-xl p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={logo} alt="CH Entregas" className="w-12"/>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Sistema de Gestão de Entregas
            </h2>
            <p className="text-slate-500 text-sm">
              CH Entregas
            </p>
          </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-slate-800">
          Carlos Henrique
        </p>

        <p className="text-slate-500 text-sm">
          Administrador
        </p>
      </div>
    </header>
  );
}