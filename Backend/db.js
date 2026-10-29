/* ==========================================
   CONEXÃO COM O BANCO DE DADOS
   Esse arquivo liga o servidor ao MySQL.
   ========================================== */

// Lê as variáveis que estão no arquivo .env
require("dotenv").config();

// Importa a biblioteca que conversa com o MySQL
const mysql = require("mysql2/promise");

// Cria a conexão usando os dados do .env
const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Exporta a conexão para o index.js conseguir usar
module.exports = conexao;