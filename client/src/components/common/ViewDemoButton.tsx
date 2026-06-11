import { Link } from 'react-router-dom';

export default function ViewDemoButton() {
  return(
    <Link to="/auth/login" className="border border-gray-300 rounded-xl px-6 py-3 text-gray-700 hover:border-gray-500 transition-colors duration-300">
      <span className="text-sm font-bold">View Demo</span>
    </Link>
  )
}