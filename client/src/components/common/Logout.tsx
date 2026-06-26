import { LogOut } from "lucide-react";
import { useAuth } from "../../hook/useAuth";

export default function Logout(){
  const { handleLogout } = useAuth();

  return(
    <button onClick={handleLogout} className="flex items-center gap-2 py-2 px-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-100">
       <LogOut size={14}/>
       <span className="text-[12px]">Logout</span>
    </button>
  )
}