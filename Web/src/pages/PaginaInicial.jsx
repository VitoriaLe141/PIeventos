/* ==========================================
   PÁGINA INICIAL DO AGENDATECH

   Responsável por organizar os componentes
   que aparecem na página principal.
   ========================================== */

// Importação dos estilos
import "../styles/paginaInicial.css";

// Importação do menu lateral
import Sidebar from "../components/Sidebar";

function PaginaInicial() {
  return (
    <div className="pagina-inicial">

      {/* Menu lateral */}
      <Sidebar />

    </div>
  );
}

// Disponibiliza a página para o restante do projeto
export default PaginaInicial;