import { useEffect, useState } from "react";
import api from "../services/api";

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

export default function Dashboard() {
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
            {entregas.filter(e => e.status === "Pendente").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3>Em Transporte</h3>
          <h2 className="text-4xl font-bold">
            {entregas.filter(e => e.status === "Em Transporte").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3>Concluídas</h3>
          <h2 className="text-4xl font-bold">
            {entregas.filter(e => e.status === "Concluída").length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Últimas Entregas
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Código</th>
                <th className="text-left py-2">Cliente</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {entregas.map((entrega) => (
                <tr key={entrega.id} className="border-b">
                  <td className="py-2">{entrega.codigo}</td>
                  <td>{entrega.cliente}</td>
                  <td>{entrega.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Entregadores Ativos
          </h2>

          {entregadores.map((entregador) => (
            <div
              key={entregador.id}
              className="border-b py-3"
            >
              <p className="font-medium">
                {entregador.nome}
              </p>

              <p className="text-slate-500 text-sm">
                {entregador.veiculo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}