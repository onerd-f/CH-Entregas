import express from "express";
import cors from "cors";
import "./database/database.js";
import clientesRoutes from "./routes/clientes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/clientes", clientesRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "API CH Entregas Online",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});