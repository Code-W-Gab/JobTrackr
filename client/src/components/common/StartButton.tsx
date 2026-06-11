import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StartButton() {
  return(
    <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 border border-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition-colors duration-300">
      <span className="text-sm font-bold">Start Tracking Free</span>
      <MoveRight size={16} />
    </Link>
  )
}