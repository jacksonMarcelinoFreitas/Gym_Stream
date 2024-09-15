import { BrowserRouter } from "react-router-dom";
// import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { webSocketService } from "../Services/webSocketService";
// import { useAuth } from "../hooks/auth";

// Ativar o WebSocket Service
webSocketService.activate();

export function Routes(){
//   const { user } = useAuth();
  
  return(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

// Desativar o WebSocket quando a janela for fechada
window.addEventListener('beforeunload', () => {
  webSocketService.deactivate();
});
