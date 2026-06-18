import { MoveLeft } from "lucide-react";
import { Link } from 'react-router-dom';

interface BackToMenuBtnProps {
  name: string
  to: string
}
 
export default function BackToMenuBtn({name, to}: BackToMenuBtnProps){
  return(
    <Link to={to} className="flex items-center gap-3 text-sm text-gray-300 hover:text-gray-100 transition-colors duration-300">
      <MoveLeft size={16}/>
      {name}
    </Link>
  )
}