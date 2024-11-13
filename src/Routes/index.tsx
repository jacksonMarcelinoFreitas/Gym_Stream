import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AdminRoutes } from "./admin.routes";
import { useAuth } from "../Hooks/auth";

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
        <AuthRoutes />
      )}
    </BrowserRouter>
  )
}