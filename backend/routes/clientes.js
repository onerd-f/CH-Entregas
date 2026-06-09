import express from "express";
import db from "../database/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { nome, telefone, email, status } = req.body;

  db.run(
    `
      INSERT INTO clientes
      (nome, telefone, email, status)
      VALUES (?, ?, ?, ?)
    `,
    [nome, telefone, email, status],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        mensagem: "Cliente criado com sucesso",
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { nome, telefone, email, status } = req.body;
  const { id } = req.params;

  db.run(
    `
    UPDATE clientes
    SET nome = ?, telefone = ?, email = ?, status = ?
    WHERE id = ?
    `,
    [nome, telefone, email, status, id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Cliente atualizado com sucesso"
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM clientes WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Cliente removido com sucesso"
      });
    }
  );
});

export default router;