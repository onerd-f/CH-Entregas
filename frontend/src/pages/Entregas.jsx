import { useState, useEffect } from "react";
import api from "../services/api";

export default function Entregas() {
  const [busca, setBusca] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

const [entregas, setEntregas] = useState([]);
const [entregaEditando, setEntregaEditando] = useState(null);

const [novaEntrega, setNovaEntrega] = useState({
  cliente: "",
  entregador: "",
  origem: "",
  destino: "",
  data: "",
  status: "Pendente",
});

useEffect(() => {
  carregarEntregas();
}, []);

const carregarEntregas = async () => {
  try {
    const response = await api.get("/entregas");
    setEntregas(response.data);
  } catch (error) {
    console.error(error);
  }
};

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

  const salvarEntrega = async () => {
  if (
  !novaEntrega.cliente ||
  !novaEntrega.entregador
) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  try {
    if (entregaEditando) {
      await api.put(
        `/entregas/${entregaEditando}`,
        novaEntrega
      );
    } else {
      await api.post(
        "/entregas",
        novaEntrega
      );
    }

    await carregarEntregas();

    setNovaEntrega({
      codigo: "",
      cliente: "",
      entregador: "",
      origem: "",
      destino: "",
      data: "",
      status: "Pendente",
    });

    setEntregaEditando(null);
    setMostrarFormulario(false);
  } catch (error) {
    console.error(error);
  }
};

const editarEntrega = (entrega) => {
  setNovaEntrega({
    codigo: entrega.codigo,
    cliente: entrega.cliente,
    entregador: entrega.entregador,
    origem: entrega.origem || "",
    destino: entrega.destino || "",
    data: entrega.data || "",
    status: entrega.status,
  });

  setEntregaEditando(entrega.id);
  setMostrarFormulario(true);
};

const excluirEntrega = async (id) => {
  const confirmar = window.confirm(
    "Deseja realmente excluir esta entrega?"
  );

  if (!confirmar) return;

  try {
    await api.delete(`/entregas/${id}`);
    carregarEntregas();
  } catch (error) {
    console.error(error);
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

        <button
  onClick={() => setMostrarFormulario(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
>
  + Nova Entrega
</button>
      </div>

      {mostrarFormulario && (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">
  {entregaEditando
    ? "Editar Entrega"
    : "Nova Entrega"}
</h2>

    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Cliente"
        value={novaEntrega.cliente}
        onChange={(e) =>
          setNovaEntrega({
            ...novaEntrega,
            cliente: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Entregador"
        value={novaEntrega.entregador}
        onChange={(e) =>
          setNovaEntrega({
            ...novaEntrega,
            entregador: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Origem"
        value={novaEntrega.origem}
        onChange={(e) =>
          setNovaEntrega({
            ...novaEntrega,
            origem: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Destino"
        value={novaEntrega.destino}
        onChange={(e) =>
          setNovaEntrega({
            ...novaEntrega,
            destino: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="date"
        placeholder="Data"
        value={novaEntrega.data}
        onChange={(e) =>
          setNovaEntrega({
            ...novaEntrega,
            data: e.target.value,
          })
        }
        className="border rounded-lg p-3"
      />
    </div>

    <select
  value={novaEntrega.status}
  onChange={(e) =>
    setNovaEntrega({
      ...novaEntrega,
      status: e.target.value,
    })
  }
  className="border rounded-lg p-3"
>
  <option value="Pendente">
    Pendente
  </option>

  <option value="Em Transporte">
    Em Transporte
  </option>

  <option value="Concluída">
    Concluída
  </option>
</select>

    <div className="mt-4 flex gap-3">
      <button
        onClick={salvarEntrega}
        className="bg-green-600 text-white px-5 py-2 rounded-lg"
      >
        Salvar
      </button>

      <button
        onClick={() => {
  setMostrarFormulario(false);

  setEntregaEditando(null);

  setNovaEntrega({
    codigo: "",
    cliente: "",
    entregador: "",
    origem: "",
    destino: "",
    data: "",
    status: "Pendente",
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
                  <button
  onClick={() => editarEntrega(entrega)}
  className="text-blue-600 mr-3"
>
  Editar
</button>

<button
  onClick={() => excluirEntrega(entrega.id)}
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