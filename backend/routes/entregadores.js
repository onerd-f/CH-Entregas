import express from "express";
import db from "../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM entregadores",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const {
    nome,
    telefone,
    veiculo,
    status,
  } = req.body;

  db.run(
    `
      INSERT INTO entregadores
      (nome, telefone, veiculo, status)
      VALUES (?, ?, ?, ?)
    `,
    [nome, telefone, veiculo, status],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        mensagem: "Entregador criado",
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const {
    nome,
    telefone,
    veiculo,
    status,
  } = req.body;

  db.run(
    `
      UPDATE entregadores
      SET
      nome = ?,
      telefone = ?,
      veiculo = ?,
      status = ?
      WHERE id = ?
    `,
    [
      nome,
      telefone,
      veiculo,
      status,
      req.params.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Entregador atualizado",
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM entregadores WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Entregador removido",
      });
    }
  );
});

export default router;