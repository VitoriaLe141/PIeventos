/* ==========================================
   PÁGINA: Login
   Tela de entrada do PIeventos.
   O RA precisa ter exatamente 13 números.
   Agora ela envia os dados para o servidor,
   que confere no banco de dados MySQL.
   ========================================== */

import { useState } from "react";
import CampoTexto from "../components/CampoTexto";
import "../styles/login.css";

// Tamanho do RA
const TAMANHO_RA = 13;

// Endereço do meu servidor. Se um dia mudar, altero só aqui
const URL_SERVIDOR = "http://localhost:3001";

function Login() {
  /* ---------- VARIÁVEIS DE ESTADO ---------- */
  const [ra, setRa] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState(""); // mensagem de sucesso
  const [erroLogin, setErroLogin] = useState(""); // erro vindo do servidor
  const [carregando, setCarregando] = useState(false); // true enquanto espera o servidor

  /* ---------- CAMPO RA: só aceita números ---------- */
  function aoMudarRa(evento) {
    const somenteNumeros = evento.target.value.replace(/\D/g, "");
    setRa(somenteNumeros);
  }

  /* ---------- VALIDAÇÃO ---------- */
  function validar() {
    const novosErros = {};

    if (ra === "") {
      novosErros.ra = "Informe o seu RA.";
    } else if (ra.length !== TAMANHO_RA) {
      novosErros.ra = `O RA deve ter exatamente ${TAMANHO_RA} números.`;
    }

    if (senha === "") {
      novosErros.senha = "Informe a sua senha.";
    }

    return novosErros;
  }

  /* ---------- ENVIO DO FORMULÁRIO ----------
     Agora a função é "async" porque ela precisa ESPERAR
     a resposta do servidor (isso leva um tempinho) */
  async function aoEnviar(evento) {
    evento.preventDefault();
    setMensagem("");
    setErroLogin("");

    // 1) Valido os campos aqui na tela primeiro
    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    // 2) Se está tudo certo, mando para o servidor
    setCarregando(true); // desabilita o botão enquanto espera

    try {
      // fetch faz o pedido ao servidor. O await espera a resposta chegar
      const resposta = await fetch(`${URL_SERVIDOR}/login`, {
        method: "POST", // envio dados, então uso POST
        headers: { "Content-Type": "application/json" },
        // JSON.stringify transforma o objeto em texto para viajar pela internet
        body: JSON.stringify({ ra, senha }),
      });

      // Transformo a resposta do servidor de volta em objeto
      const dados = await resposta.json();

      // resposta.ok é true quando deu certo (códigos 200 a 299)
      if (!resposta.ok) {
        setErroLogin(dados.mensagem); // mostra "RA ou senha incorretos."
        return;
      }

      // Deu certo! O servidor devolveu os dados do usuário
      setMensagem(`Bem-vindo(a), ${dados.usuario.nome}! Perfil: ${dados.usuario.tipo}`);
        } catch (erro) {
      // Mostra o erro verdadeiro no Console (F12)
      console.log("Erro no login:", erro);
      setErroLogin("Não consegui falar com o servidor. Ele está ligado?");
    } finally {
      // O finally roda sempre, dando certo ou errado: reabilita o botão
      setCarregando(false);
    }
  }

  /* ---------- O QUE APARECE NA TELA ---------- */
  return (
    <div className="login-fundo">
      <div className="login-painel">
        <div className="login-topo">
          <div className="logo">PI</div>
          <h1>AgendaTech</h1>
          <p>Conectando você aos eventos da Fatec</p>
        </div>

        <form onSubmit={aoEnviar} noValidate>
          <CampoTexto
            id="ra"
            rotulo="RA"
            tipo="text"
            valor={ra}
            aoMudar={aoMudarRa}
            placeholder="Digite seu RA"
            erro={erros.ra}
            tamanhoMaximo={TAMANHO_RA}
            modoTeclado="numeric"
          />

          <div className="campo-senha">
            <CampoTexto
              id="senha"
              rotulo="Senha"
              tipo={mostrarSenha ? "text" : "password"}
              valor={senha}
              aoMudar={(e) => setSenha(e.target.value)}
              placeholder="Digite a sua senha"
              erro={erros.senha}
            />

            <button
              type="button"
              className="btn-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >


              {mostrarSenha ? (
              /* Olho riscado: a senha está aparecendo */
               <svg
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
               <line x1="1" y1="1" x2="23" y2="23" />
               </svg>

               ) : (

               /* Olho aberto: a senha está escondida */
               <svg
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
               <circle cx="12" cy="12" r="3" />
               </svg>
              )}

        </button>
          </div>

          {/* disabled={carregando} impede clicar várias vezes enquanto espera.
              O texto também muda para o usuário saber que está carregando */}
          <button type="submit" className="btn-principal" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          {/* Erro vindo do servidor (RA ou senha incorretos) */}
          {erroLogin && <p className="msg-erro-login">{erroLogin}</p>}

          {/* Mensagem de sucesso */}
          {mensagem && <p className="msg-sucesso">{mensagem}</p>}
        </form>

        <footer className="login-rodape">AgendaTech © 2026</footer>
      </div>
    </div>
  );
}

export default Login;