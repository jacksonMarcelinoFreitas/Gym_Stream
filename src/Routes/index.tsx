import { webSocketService } from "../Services/webSocketService";
import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AdminRoutes } from "./admin.routes";
import { useAuth } from "../Hooks/auth";

// Ativar o WebSocket Service
// webSocketService.activate();

export function Routes(){
  const { user } = useAuth();
  return(
    <BrowserRouter>
      {!user ? (
        <AuthRoutes />
      ) : user.role.includes('USER') ? (
        <AppRoutes />
      ) : user.role.includes('ADMIN') ? (
        <AdminRoutes />
      ) : (
        <AuthRoutes /> // Caso o usuário tenha uma role diferente ou não esteja autorizado.
      )}
    </BrowserRouter>
  )
}

// Desativar o WebSocket quando a janela for fechada
// window.addEventListener('beforeunload', () => {
//   webSocketService.deactivate();
// });
