import { LayoutDashboard, Briefcase, FolderKanban, Calendar, ChartColumn, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  const location = useLocation();
  const navs = [
    { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { name: "Application", to: "/application", icon: Briefcase },
    { name: "Kanban Board", to: "/kanban-board", icon: FolderKanban },
    { name: "Calendar", to: "/calendar", icon: Calendar },
    { name: "Analytics", to: "/analytics", icon: ChartColumn },
    
  ]
  return(
    <aside className="w-55 px-3 py-4 bg-white border-r border-indigo-100">
      {navs.map((nav, index) => {
        const active = location.pathname === nav.to;

        return(
          <Link to={nav.to} key={index} className={`flex items-center justify-between text-gray-500 py-2 px-3 mb-2 hover:bg-indigo-50 rounded-xl  ${active ? "bg-indigo-50 text-indigo-800" : ""}`}>
            <div className={`flex items-center gap-2 `}>
              <nav.icon size={14}/>
              <span className='text-[12px] '>{nav.name}</span>
            </div>
            <div>{active ? <ChevronRight size={14} className='text-indigo-800'/> : ""}</div>
          </Link>
        )
      })}
    </aside>
  )
}