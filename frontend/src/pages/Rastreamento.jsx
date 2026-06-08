import { useState } from "react";
import entregas from "../data/entregas";

export default function Rastreamento() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const consultarEntrega = () => {
  const entrega = entregas.find(
    (item) =>
      item.codigo.toUpperCase() ===
      codigo.toUpperCase()
  );

  if (!entrega) {
    setResultado({
      erro: true,
    });

    return;
  }

  setResultado(entrega);
};

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Rastreamento
        </h1>

        <p className="text-slate-500">
          Consulte o andamento de uma entrega
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <input
          type="text"
          placeholder="Digite o código da entrega"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 mb-4"
        />

        <button
          onClick={consultarEntrega}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Consultar
        </button>

        {resultado && !resultado.erro && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">
      Dados da Entrega
    </h2>

    <div className="bg-slate-50 p-6 rounded-lg">
      <p>
        <strong>Código:</strong>
        {" "}
        {resultado.codigo}
      </p>

      <p className="mt-2">
        <strong>Cliente:</strong>
        {" "}
        {resultado.cliente}
      </p>

      <p className="mt-2">
        <strong>Entregador:</strong>
        {" "}
        {resultado.entregador}
      </p>

      <p className="mt-2">
        <strong>Origem:</strong>
        {" "}
        {resultado.origem}
      </p>

      <p className="mt-2">
        <strong>Destino:</strong>
        {" "}
        {resultado.destino}
      </p>

      <p className="mt-2">
        <strong>Data:</strong>
        {" "}
        {resultado.data}
      </p>

      <p className="mt-4">
        <strong>Status Atual:</strong>
      </p>

      <span
        className={`
          inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium
          ${
            resultado.status === "Concluída"
              ? "bg-green-100 text-green-700"
              : resultado.status === "Em Transporte"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }
        `}
      >
        {resultado.status}
      </span>
      <div className="mt-8">
  <h3 className="font-semibold mb-4">
    Histórico da Entrega
  </h3>

  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <span>✅</span>
      <span>Entrega cadastrada</span>
    </div>

    <div className="flex items-center gap-3">
      <span>✅</span>
      <span>Documento coletado</span>
    </div>

    <div className="flex items-center gap-3">
      <span>
        {resultado.status === "Pendente"
          ? "⭕"
          : "✅"}
      </span>

      <span>Em transporte</span>
    </div>

    <div className="flex items-center gap-3">
      <span>
        {resultado.status === "Concluída"
          ? "✅"
          : "⭕"}
      </span>

      <span>Entrega concluída</span>
    </div>
  </div>
</div>
    </div>
  </div>
)}

        {resultado?.erro && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
            Código não encontrado.
          </div>
        )}
      </div>
    </div>
  );
}