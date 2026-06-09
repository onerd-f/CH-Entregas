import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(
  path.resolve(__dirname, "database.sqlite"),
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco:", err);
    } else {
      console.log("Banco SQLite conectado.");
    }
  }
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      email TEXT,
      status TEXT DEFAULT 'Ativo'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS entregadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      veiculo TEXT,
      status TEXT DEFAULT 'Ativo'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      cliente TEXT NOT NULL,
      entregador TEXT NOT NULL,
      origem TEXT,
      destino TEXT,
      data TEXT,
      status TEXT DEFAULT 'Pendente'
    )
  `);
});

export default db;