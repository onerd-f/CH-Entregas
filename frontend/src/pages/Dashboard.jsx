import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resEntregas, resEntregadores] =
        await Promise.all([
          api.get("/entregas"),
          api.get("/entregadores"),
        ]);

      setEntregas(resEntregas.data);
      setEntregadores(resEntregadores.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* restante do dashboard */}
    </>
  );
}