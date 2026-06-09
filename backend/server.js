import express from "express";
import cors from "cors";
import "./database/database.js";
import clientesRoutes from "./routes/clientes.js";
import entregadoresRoutes from "./routes/entregadores.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/clientes", clientesRoutes);
app.use("/entregadores", entregadoresRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API CH Entregas Online",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});