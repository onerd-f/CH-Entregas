import express from "express";
import db from "../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM entregas",
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
    codigo,
    cliente,
    entregador,
    origem,
    destino,
    data,
    status,
  } = req.body;

  db.run(
    `
      INSERT INTO entregas
      (
        codigo,
        cliente,
        entregador,
        origem,
        destino,
        data,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      codigo,
      cliente,
      entregador,
      origem,
      destino,
      data,
      status,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        mensagem: "Entrega criada",
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const {
    codigo,
    cliente,
    entregador,
    origem,
    destino,
    data,
    status,
  } = req.body;

  db.run(
    `
      UPDATE entregas
      SET
        codigo = ?,
        cliente = ?,
        entregador = ?,
        origem = ?,
        destino = ?,
        data = ?,
        status = ?
      WHERE id = ?
    `,
    [
      codigo,
      cliente,
      entregador,
      origem,
      destino,
      data,
      status,
      req.params.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Entrega atualizada",
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM entregas WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Entrega removida",
      });
    }
  );
});

router.get("/rastrear/:codigo", (req, res) => {
  db.get(
    `
      SELECT * FROM entregas
      WHERE codigo = ?
    `,
    [req.params.codigo],
    (err, row) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Entrega não encontrada",
        });
      }

      res.json(row);
    }
  );
});

export default router;