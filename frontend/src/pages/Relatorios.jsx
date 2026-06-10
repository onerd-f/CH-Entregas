import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../services/api";

export default function Relatorios() {
  const totalClientes = clientes.length;
  const totalEntregadores = entregadores.length;
  const totalEntregas = entregas.length;

  const concluidas = entregas.filter(
    (e) => e.status === "Concluída"
  ).length;

  const pendentes = entregas.filter(
    (e) => e.status === "Pendente"
  ).length;

  const transporte = entregas.filter(
    (e) => e.status === "Em Transporte"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Relatórios
        </h1>

        <p className="text-slate-500">
          Indicadores operacionais da empresa
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-slate-500">Clientes</h3>
          <h2 className="text-4xl font-bold mt-2">
            {totalClientes}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-slate-500">Entregadores</h3>
          <h2 className="text-4xl font-bold mt-2">
            {totalEntregadores}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-slate-500">Entregas</h3>
          <h2 className="text-4xl font-bold mt-2">
            {totalEntregas}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          Resumo das Entregas
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Indicador</th>
              <th className="text-left py-3">Quantidade</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">Concluídas</td>
              <td>{concluidas}</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Em Transporte</td>
              <td>{transporte}</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Pendentes</td>
              <td>{pendentes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const gerarRelatorioEntregas = async () => {
    try {
      const response = await api.get("/entregas");

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Relatório de Entregas", 14, 20);

      autoTable(doc, {
        startY: 30,
        head: [[
          "Código",
          "Cliente",
          "Entregador",
          "Status"
        ]],
        body: response.data.map((item) => [
          item.codigo,
          item.cliente,
          item.entregador,
          item.status
        ])
      });

      doc.save("relatorio-entregas.pdf");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Relatórios
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">

        <button
          onClick={gerarRelatorioEntregas}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Gerar PDF de Entregas
        </button>

      </div>
    </div>
  );
}