import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resEntregas, resEntregadores] =
        await Promise.all([
          api.get("/entregas"),
          api.get("/entregadores"),
        ]);

      setEntregas(resEntregas.data);
      setEntregadores(resEntregadores.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <>
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-800">
        Dashboard
      </h1>

      <p className="text-slate-500 mt-2">
        Bem-vindo ao sistema CH Entregas
      </p>
    </div>

    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3>Total de Entregas</h3>
        <h2 className="text-4xl font-bold">
          {entregas.length}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3>Pendentes</h3>
        <h2 className="text-4xl font-bold">
          {entregas.filter(
            e => e.status === "Pendente"
          ).length}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3>Em Transporte</h3>
        <h2 className="text-4xl font-bold">
          {entregas.filter(
            e => e.status === "Em Transporte"
          ).length}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3>Concluídas</h3>
        <h2 className="text-4xl font-bold">
          {entregas.filter(
            e => e.status === "Concluída"
          ).length}
        </h2>
      </div>
    </div>

    {/* restante das tabelas */}
  </>
);
}