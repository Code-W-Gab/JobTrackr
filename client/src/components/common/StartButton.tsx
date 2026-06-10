import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StartButton() {
  return(
    <Link to="/home" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 border border-violet-600 px-6 py-3 text-white hover:bg-violet-700 transition-colors duration-300">
      <span className="text-sm font-bold">Start Tracking Free</span>
      <MoveRight size={16} />
    </Link>
  )
}