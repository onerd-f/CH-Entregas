import { useState, useEffect } from "react";
import api from "../services/api";

export default function Clientes() {
  const [busca, setBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    status: "Ativo",
  });

  useEffect(() => {
  carregarClientes();
}, []);

const carregarClientes = async () => {
  try {
    const response = await api.get("/clientes");
    setClientes(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const salvarCliente = async () => {
  if (
    !novoCliente.nome ||
    !novoCliente.telefone ||
    !novoCliente.email
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    await api.post("/clientes", novoCliente);

    await carregarClientes();

    setNovoCliente({
      nome: "",
      telefone: "",
      email: "",
      status: "Ativo",
    });

    setMostrarFormulario(false);
    setClienteEditando(null);
  } catch (error) {
    console.error(error);
  }
};

const editarCliente = (cliente) => {
  setNovoCliente({
    nome: cliente.nome,
    telefone: cliente.telefone,
    email: cliente.email,
    status: cliente.status,
  });

  setClienteEditando(cliente.id);
  setMostrarFormulario(true);
};

const excluirCliente = async (id) => {
  if (!confirm("Deseja excluir este cliente?")) {
    return;
  }

  try {
    await api.delete(`/clientes/${id}`);
    carregarClientes();
  } catch (error) {
    console.error(error);
  }
};

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

        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + Novo Cliente
        </button>
      </div>

      {mostrarFormulario && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
  {clienteEditando
    ? "Editar Cliente"
    : "Novo Cliente"}
</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={(e) =>
                setNovoCliente({
                  ...novoCliente,
                  nome: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={(e) =>
                setNovoCliente({
                  ...novoCliente,
                  telefone: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="E-mail"
              value={novoCliente.email}
              onChange={(e) =>
                setNovoCliente({
                  ...novoCliente,
                  email: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <select
              value={novoCliente.status}
              onChange={(e) =>
                setNovoCliente({
                  ...novoCliente,
                  status: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            >
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={salvarCliente}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Salvar
            </button>

            <button
              onClick={() => {
  setMostrarFormulario(false);

  setClienteEditando(null);

  setNovoCliente({
    nome: "",
    telefone: "",
    email: "",
    status: "Ativo",
  });
}}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
              <th className="text-left py-3">Status</th>
              <th className="text-center py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-4">{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.status}</td>

                <td className="text-center">
                  <button
  onClick={() => editarCliente(cliente)}
  className="text-blue-600 mr-3"
>
  Editar
</button>

                  <button
  onClick={() => excluirCliente(cliente.id)}
  className="text-red-600"
>
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