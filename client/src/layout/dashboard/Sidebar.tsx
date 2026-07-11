import { LayoutDashboard, Briefcase, FolderKanban, Calendar, ChartColumn, ChevronRight, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from '../../components/common/Logout';
import { useAuthContext } from '../../hook/useAuth';
import { getInitials } from '../../Utils/getInitial';

interface INav {
  name: string,
  to: string,
  icon: React.ElementType,
}

export default function Sidebar() {
  const { user } = useAuthContext()
  const location = useLocation();
  
  const navOption: INav[] = [
    { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { name: "Application", to: "/application", icon: Briefcase },
    { name: "Kanban Board", to: "/kanban-board", icon: FolderKanban },
    { name: "Calendar", to: "/calendar", icon: Calendar },
    { name: "Analytics", to: "/analytics", icon: ChartColumn },
    { name: "Settings", to: "/settings", icon: Settings },
  ]

  return(
    <aside className="flex h-full flex-col justify-between bg-white dark:bg-[#1E293B]">
      <nav className='py-3 px-4'>
        {navOption.map((nav, index) => {
          const active = location.pathname === nav.to;

          return(
            <Link to={nav.to} key={index} className={`flex items-center justify-between font-semibold text-gray-500 dark:text-gray-400 py-2 px-3 mb-2 hover:text-gray-800 dark:hover:text-gray-300 rounded-xl  ${active ? "bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" : ""}`}>
              <div className={`flex items-center gap-2 `}>
                <nav.icon size={14}/>
                <span className='text-[12px] '>{nav.name}</span>
              </div>
              <div>{active ? <ChevronRight size={14} className='text-indigo-800 dark:text-indigo-200'/> : ""}</div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className='border-t border-indigo-100 dark:border-gray-600 py-3 px-4'>
        <Logout/>
        <div className='flex items-center gap-2 px-1 mt-2'>
          <div className='text-white text-[13px] font-semibold bg-indigo-600 size-7 rounded-full flex items-center justify-center'>{getInitials(user?.fullName ?? "U")}</div>
          <div>
            <h3 className='text-xs font-semibold dark:text-white'>{user?.fullName}</h3>
            <p className='text-[10px] text-gray-500 dark:text-gray-400'>{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}