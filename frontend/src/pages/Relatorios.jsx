import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../services/api";

export default function Relatorios() {

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