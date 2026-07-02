import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

interface BackToMenuBtnProps {
  name: string
  to: string
  color: string
  hoverColor: string
}
 
export default function BackToMenuBtn({name, to, color, hoverColor}: BackToMenuBtnProps){
  return(
    <Link to={to} className={`flex items-center gap-2 text-xs ${color} hover:${hoverColor} transition-colors duration-300`}>
      <ArrowLeft size={14}/>
      {name}
    </Link>
  )
}