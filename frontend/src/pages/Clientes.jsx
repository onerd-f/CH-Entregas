import { useState } from "react";
import clientes from "../data/clientes";

export default function Clientes() {
  const [busca, setBusca] = useState("");

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Clientes
          </h1>
          <p className="text-slate-500">
            Gerenciamento de clientes cadastrados
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium">
          + Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 mb-6"
        />

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Nome</th>
              <th className="text-left py-3">Telefone</th>
              <th className="text-left py-3">E-mail</th>
              <th className="text-center py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-slate-50">
                <td className="py-4">{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>

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