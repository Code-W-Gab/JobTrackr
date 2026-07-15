import { Menu, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menu, setMenu] = useState<boolean>(false);

  return(
    <main>
      {/* Laptop-Desktop Size */}
      <header className="hidden lg:flex items-center justify-between py-2.5 lg:py-3 xl:py-4 px-35 bg-white shadow-xs border-b border-gray-200 ">
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
          <Link to="/auth/login" className="hover:text-indigo-700 cursor-pointer text-gray-600 text-sm font-medium">Login</Link>
          <Link to="/auth/register" className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-500">Get Started</Link>
        </div>
      </header>

      {/* Mobile-Tablet Size */}
      <header className='lg:hidden px-4 py-3 md:py-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5">
              <Zap size={14}/>
            </div>
            <h1 className="font-bold text-sm">JobTrackr</h1>
          </div>
          <Menu size={18} onClick={() => setMenu(!menu)}/>
        </div>
        { menu && (
          <div>
            <div className='border-b border-gray-200 my-4'></div>
            <div className="flex flex-col gap-4 text-gray-600 text-sm font-medium px-2">
              <p className="hover:text-indigo-700 cursor-pointer">Features</p>
              <p className="hover:text-indigo-700 cursor-pointer">Pricing</p>
              <p className="hover:text-indigo-700 cursor-pointer">About</p>
            </div>
            <div className="grid grid-cols-2 items-center text-center gap-4 mt-6">
              <Link to="/auth/login" className="hover:text-indigo-700 cursor-pointer text-gray-600 text-sm font-medium border border-gray-200 rounded-lg  px4 py-1.5">Login</Link>
              <Link to="/auth/register" className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-500">Get Started</Link>
            </div>
          </div>
        )}
      </header>
    </main>
  )
}