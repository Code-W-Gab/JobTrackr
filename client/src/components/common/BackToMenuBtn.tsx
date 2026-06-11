import { MoveLeft } from "lucide-react";
import { Link } from 'react-router-dom';
 
export default function BackToMenuBtn(){
  return(
    <Link to='/home' className="flex items-center gap-3 text-sm text-gray-300 hover:text-gray-100 transition-colors duration-300">
      <MoveLeft size={16}/>
      Back to home
    </Link>
  )
}