/* ==========================================
   COMPONENTE: SIDEBAR
   Responsável pelo menu lateral do AgendaTech.
   Contém a logo, identificação do usuário
   e as opções de navegação.
   ========================================== */


// Importação da logo e do avatar padrão
import logo from "../assets/imagens/logo.svg";
import avatar from "../assets/imagens/avatar-default.svg";


function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo do AgendaTech */}
      <div className="sidebar-logo">
        <img src={logo} alt="AgendaTech" />
      </div>

      {/* Informações do usuário */}
      <div className="sidebar-user">
        <img
          src={avatar}
          alt="Foto de perfil do usuário"
          className="sidebar-avatar"
        />

        <div className="sidebar-user-info">
          <h3>Ana Silva</h3>
          <span>Aluno</span>
        </div>
      </div>

      {/* Menu de navegação */}
      <nav className="sidebar-navigation">
        <a href="#" className="sidebar-link active">
          Início
        </a>

        <a href="#" className="sidebar-link">
          Meu perfil
        </a>

        <a href="#" className="sidebar-link">
          Favoritos
        </a>

        <a href="#" className="sidebar-link">
          Minhas inscrições
        </a>
      </nav>

      {/* Opção de sair */}
      <div className="sidebar-footer">
        <a href="#" className="sidebar-link">
          Sair
        </a>
      </div>
    </aside>
  );
}


// Disponibiliza o componente para outras páginas
export default Sidebar;