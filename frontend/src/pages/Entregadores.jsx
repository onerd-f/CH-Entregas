import { useState } from "react";
import entregadores from "../data/entregadores";

export default function Entregadores() {
  const [busca, setBusca] = useState("");

  const filtrados = entregadores.filter((entregador) =>
    entregador.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Entregadores
          </h1>

          <p className="text-slate-500">
            Gerenciamento de entregadores
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
          + Novo Entregador
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <input
          type="text"
          placeholder="Buscar entregador..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 mb-6"
        />

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Nome</th>
              <th className="text-left py-3">Telefone</th>
              <th className="text-left py-3">Veículo</th>
              <th className="text-left py-3">Status</th>
              <th className="text-center py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((entregador) => (
              <tr key={entregador.id} className="border-b hover:bg-slate-50">
                <td className="py-4">{entregador.nome}</td>
                <td>{entregador.telefone}</td>
                <td>{entregador.veiculo}</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {entregador.status}
                  </span>
                </td>

                <td className="text-center">
                  <button className="text-blue-600 mr-3">
                    Editar
                  </button>

                  <button className="text-red-600">
                    Excluir
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