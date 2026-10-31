/* ==========================================
   PÁGINA INICIAL DO AGENDATECH

   Responsável por organizar os componentes
   que aparecem na página principal.
   ========================================== */


// Importação dos estilos
import "../styles/paginainicial.css";

// Importação dos componentes
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function PaginaInicial() {
  return (
    <div className="pagina-inicial">
      {/* Menu lateral */}
      <Sidebar />

      {/* Conteúdo principal (ao lado da sidebar) */}
      <main className="conteudo">
        <Header nome="Ana" />
      </main>
    </div>
  );
}


// Disponibiliza a página para o restante do projeto
export default PaginaInicial;