import { useState } from "react";
import entregas from "../data/entregas";

export default function Entregas() {
  const [busca, setBusca] = useState("");

  const entregasFiltradas = entregas.filter(
    (entrega) =>
      entrega.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      entrega.cliente.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Concluída":
        return "bg-green-100 text-green-700";

      case "Em Transporte":
        return "bg-blue-100 text-blue-700";

      case "Pendente":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Entregas
          </h1>

          <p className="text-slate-500">
            Controle e acompanhamento das entregas
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
          + Nova Entrega
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <input
          type="text"
          placeholder="Buscar por código ou cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 mb-6"
        />

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Código</th>
              <th className="text-left py-3">Cliente</th>
              <th className="text-left py-3">Entregador</th>
              <th className="text-left py-3">Status</th>
              <th className="text-center py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {entregasFiltradas.map((entrega) => (
              <tr key={entrega.id} className="border-b hover:bg-slate-50">
                <td className="py-4 font-medium">
                  {entrega.codigo}
                </td>

                <td>{entrega.cliente}</td>

                <td>{entrega.entregador}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      entrega.status
                    )}`}
                  >
                    {entrega.status}
                  </span>
                </td>

                <td className="text-center">
                  <button className="text-blue-600 mr-3">
                    Detalhes
                  </button>

                  <button className="text-green-600">
                    Atualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}