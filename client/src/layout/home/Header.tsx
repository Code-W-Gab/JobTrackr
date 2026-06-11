import { Zap } from 'lucide-react';

export default function Header() {
  return(
    <header className="flex items-center justify-between py-2.5 px-35 bg-white shadow-xs border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 text-white rounded-lg p-1.5">
          <Zap size={16}/>
        </div>
        <h1 className="font-bold">JobTrackr</h1>
      </div>

      <div className="flex items-center gap-6 text-gray-600 text-sm font-medium">
        <p className="hover:text-indigo-700 cursor-pointer">Features</p>
        <p className="hover:text-indigo-700 cursor-pointer">Pricing</p>
        <p className="hover:text-indigo-700 cursor-pointer">About</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:text-indigo-700 cursor-pointer text-gray-600 text-sm font-medium">Login</button>
        <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-500">Get Started</button>
      </div>
    </header>
  )
}