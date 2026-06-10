import bcrypt from "bcrypt";
import db from "./database/database.js";

const criarUsuarios = async () => {
  const senhaAdmin = await bcrypt.hash(
    "123456",
    10
  );

  const senhaOperador = await bcrypt.hash(
    "123456",
    10
  );

  db.run(
    `
    INSERT OR IGNORE INTO usuarios
    (nome,email,senha,perfil)
    VALUES
    ('Administrador',
     'admin@ch.com',
     ?,
     'admin')
    `,
    [senhaAdmin]
  );

  db.run(
    `
    INSERT OR IGNORE INTO usuarios
    (nome,email,senha,perfil)
    VALUES
    ('Operador',
     'operador@ch.com',
     ?,
     'operador')
    `,
    [senhaOperador]
  );
};

criarUsuarios();