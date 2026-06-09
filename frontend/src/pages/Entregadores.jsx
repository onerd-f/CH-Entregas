import { useState, useEffect } from "react";
import api from "../services/api";

export default function Entregadores() {
  const [busca, setBusca] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [entregadores, setEntregadores] =  useState([]);
  const [entregadorEditando, setEntregadorEditando] = useState(null);

  const [novoEntregador, setNovoEntregador] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    status: "Ativo",
  });

  useEffect(() => {
  carregarEntregadores();
}, []);

const carregarEntregadores = async () => {
  try {
    const response = await api.get(
      "/entregadores"
    );

    setEntregadores(response.data);
  } catch (error) {
    console.error(error);
  }
};

  const filtrados = entregadores.filter((entregador) =>
    entregador.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const salvarEntregador = async () => {
  if (
    !novoEntregador.nome ||
    !novoEntregador.telefone ||
    !novoEntregador.veiculo
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  if (entregadorEditando) {
    try {
  await api.post(
    "/entregadores",
    novoEntregador
  );

  carregarEntregadores();

  setNovoEntregador({
    nome: "",
    telefone: "",
    veiculo: "",
    status: "Ativo",
  });

  setMostrarFormulario(false);
} catch (error) {
  console.error(error);
}
  } else {
    const entregador = {
      id: Date.now(),
      ...novoEntregador,
    };

    setEntregadores([...entregadores, entregador]);
  }

  setNovoEntregador({
    nome: "",
    telefone: "",
    veiculo: "",
    status: "Ativo",
  });

  setEntregadorEditando(null);
  setMostrarFormulario(false);
};

const editarEntregador = (entregador) => {
  setNovoEntregador({
    nome: entregador.nome,
    telefone: entregador.telefone,
    veiculo: entregador.veiculo,
    status: entregador.status,
  });

  setEntregadorEditando(entregador.id);
  setMostrarFormulario(true);
};

const excluirEntregador = (id) => {
  const confirmar = window.confirm(
    "Deseja realmente excluir este entregador?"
  );

  if (!confirmar) return;

  setEntregadores(
    entregadores.filter(
      (entregador) => entregador.id !== id
    )
  );
};

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

        <button onClick={() => setMostrarFormulario(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
          + Novo Entregador
        </button>
      </div>

      {mostrarFormulario && (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">
  {entregadorEditando
    ? "Editar Entregador"
    : "Novo Entregador"}
</h2>

    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Nome"
        value={novoEntregador.nome}
        onChange={(e) =>
          setNovoEntregador({
            ...novoEntregador,
            nome: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Telefone"
        value={novoEntregador.telefone}
        onChange={(e) =>
          setNovoEntregador({
            ...novoEntregador,
            telefone: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Veículo"
        value={novoEntregador.veiculo}
        onChange={(e) =>
          setNovoEntregador({
            ...novoEntregador,
            veiculo: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <select
        value={novoEntregador.status}
        onChange={(e) =>
          setNovoEntregador({
            ...novoEntregador,
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
        onClick={salvarEntregador}
        className="bg-green-600 text-white px-5 py-2 rounded-lg"
      >
        Salvar
      </button>

      <button
        onClick={() => {
  setMostrarFormulario(false);

  setEntregadorEditando(null);

  setNovoEntregador({
    nome: "",
    telefone: "",
    veiculo: "",
    status: "Ativo",
  });
}}
        className="bg-gray-500 text-white px-5 py-2 rounded-lg"
      >
        Cancelar
      </button>
    </div>
  </div>
)}

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
                  <button
  onClick={() => editarEntregador(entregador)}
  className="text-blue-600 mr-3"
>
  Editar
</button>

                  <button
  onClick={() => excluirEntregador(entregador.id)}
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