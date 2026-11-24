require("dotenv").config();
const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(process.env.DB_PATH || path.join(__dirname, "turismo-das-araras.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    papel      TEXT NOT NULL DEFAULT 'cidadao' CHECK (papel IN ('cidadao','moderador')),
    criado_em  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );

  CREATE TABLE IF NOT EXISTS denuncias (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    protocolo  TEXT NOT NULL UNIQUE,
    tipo       TEXT NOT NULL,
    local      TEXT NOT NULL,
    bairro     TEXT NOT NULL DEFAULT '',
    descricao  TEXT NOT NULL,
    lat        REAL,
    lng        REAL,
    foto       TEXT,
    status     TEXT NOT NULL DEFAULT 'Recebida',
    resposta   TEXT NOT NULL DEFAULT '',
    apoios     INTEGER NOT NULL DEFAULT 0,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    criado_em  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );

  CREATE TABLE IF NOT EXISTS apoios (
    denuncia_id INTEGER NOT NULL REFERENCES denuncias(id) ON DELETE CASCADE,
    chave       TEXT NOT NULL,
    PRIMARY KEY (denuncia_id, chave)
  );

  CREATE TABLE IF NOT EXISTS contatos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    email     TEXT NOT NULL,
    assunto   TEXT NOT NULL,
    mensagem  TEXT NOT NULL,
    lido      INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );

  CREATE INDEX IF NOT EXISTS idx_denuncias_criado ON denuncias(criado_em DESC);
  CREATE INDEX IF NOT EXISTS idx_contatos_criado ON contatos(criado_em DESC);
`);

module.exports = db;
