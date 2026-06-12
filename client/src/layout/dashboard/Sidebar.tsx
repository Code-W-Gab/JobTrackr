import { LayoutDashboard, Briefcase, FolderKanban, Calendar, ChartColumn } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Sidebar(){
  const location = useLocation();
  const navs = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Application", icon: Briefcase },
    { name: "Kanban Board", icon: FolderKanban },
    { name: "Calendar", icon: Calendar },
    { name: "Analytics", icon: ChartColumn },
    
  ]
  return(
    <aside className="w-55 px-3 py-4 bg-white border-r border-indigo-100 space-y-2">
      {navs.map((nav, index) => {
        const active = location.pathname === `/${nav.name.toLowerCase().replace(/\s/g, '-')}`;

        return(
          <div key={index} className={`flex items-center gap-2 text-gray-600 py-2 px-3 hover:bg-indigo-50 rounded-xl ${active ? "bg-indigo-50 text-indigo-800" : ""}`}>
            <nav.icon size={14}/>
            <span className='text-[12px] '>{nav.name}</span>
          </div>
        )
      })}
    </aside>
  )
}