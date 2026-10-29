/* ==========================================
   COMPONENTE PRINCIPAL: App
   Ele decide qual página aparece na tela.
   Por enquanto só tenho a de login, mas depois
   vou colocar as outras páginas aqui.
   ========================================== */

// Importei a página de login que eu criei
import Login from "./pages/Login";

function App() {
  // Aqui eu uso a página como se fosse uma tag HTML
  return <Login />;
}

// Exporto o App para o main.jsx conseguir usar
export default App;