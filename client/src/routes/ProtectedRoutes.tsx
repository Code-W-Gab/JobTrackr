import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/useAuth";

export default function ProtectedRoute(){
  const { user, loading } = useAuthContext();

  if(loading){
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />
  }

  return <Outlet/>
}