import express from "express";
import db from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, usuario) => {
      if (!usuario) {
        return res.status(401).json({
          mensagem: "Usuário inválido"
        });
      }

      const senhaValida =
        await bcrypt.compare(
          senha,
          usuario.senha
        );

      if (!senhaValida) {
        return res.status(401).json({
          mensagem: "Senha inválida"
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          perfil: usuario.perfil,
        },
        "CH_ENTREGAS_SECRET",
        {
          expiresIn: "8h",
        }
      );

      res.json({
        token,
        usuario: {
          nome: usuario.nome,
          perfil: usuario.perfil,
        },
      });
    }
  );
});

export default router;