/* ==========================================
   SERVIDOR DO PIEVENTOS
   Aqui ficam as rotas que o React vai chamar.
   ========================================== */

require("dotenv").config();

// Importa as bibliotecas
const express = require("express");
const cors = require("cors");

// Importa a conexão com o banco (o arquivo db.js)
const conexao = require("./db");

// Cria o servidor
const app = express();

// Libera o React para conversar com o servidor
app.use(cors());
// Permite o servidor entender dados enviados em formato JSON
app.use(express.json());

// ROTA DE TESTE: lista os usuários do banco
app.get("/teste-banco", async (req, res) => {
  try {
    // Faz a consulta no MySQL (sem pegar a senha)
    const [linhas] = await conexao.query(
      "SELECT id, nome, tipo FROM usuarios"
    );
    // Devolve o resultado para quem chamou a rota
    res.json(linhas);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: "Não consegui falar com o banco" });
  }
});

// ROTA DE LOGIN: confere o RA e a senha no banco
app.post("/login", async (req, res) => {
  // Pega o RA e a senha que o React enviou
  const { ra, senha } = req.body;

  // Se faltar algum dos dois, avisa
  if (!ra || !senha) {
    return res.status(400).json({ mensagem: "Preencha o RA e a senha." });
  }

  try {
    // Procura no banco um usuário com esse RA e essa senha
    const [linhas] = await conexao.query(
      "SELECT id, nome, tipo FROM usuarios WHERE ra = ? AND senha = ?",
      [ra, senha]
    );

    // Se não achou ninguém, o login está errado
    if (linhas.length === 0) {
      return res.status(401).json({ mensagem: "RA ou senha incorretos." });
    }

    // Se achou, devolve os dados dentro de "usuario" (sem a senha)
    res.json({ usuario: linhas[0] });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ mensagem: "Não consegui falar com o banco." });
  }
});

// Liga o servidor na porta do .env (3001)
const PORTA = process.env.PORT || 3001;
app.listen(PORTA, () => {
  console.log("Servidor rodando na porta " + PORTA);
});