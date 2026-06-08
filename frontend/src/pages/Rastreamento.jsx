import { useState } from "react";

export default function Rastreamento() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const consultarEntrega = () => {
    if (codigo.toUpperCase() === "CH000001") {
      setResultado({
        codigo: "CH000001",
        status: "Em Transporte",
        historico: [
          "09:00 - Entrega cadastrada",
          "09:30 - Documento coletado",
          "10:15 - Em transporte",
        ],
      });
    } else {
      setResultado({
        erro: true,
      });
    }
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
              Resultado
            </h2>

            <div className="bg-slate-50 p-5 rounded-lg">
              <p>
                <strong>Código:</strong> {resultado.codigo}
              </p>

              <p className="mt-2">
                <strong>Status Atual:</strong>{" "}
                <span className="text-blue-600">
                  {resultado.status}
                </span>
              </p>

              <div className="mt-4">
                <strong>Histórico:</strong>

                <ul className="mt-2 list-disc list-inside">
                  {resultado.historico.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
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