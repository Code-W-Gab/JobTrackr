import { Bell, House, ChevronRight } from 'lucide-react';
import { getInitials } from "../../Utils/getInitial";
import AddJob from "../../components/common/AddJob";
import { useAuthContext } from "../../hook/useAuth";
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/common/ThemeToggle';
import { useTheme } from '../../hook/useTheme';

interface HeaderProps {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setIsModalOpen }: HeaderProps) {
  const { user } = useAuthContext();
  const location = useLocation();
  const routeMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/application": "Application",
    "/kanban-board": "Kanban Board",
    "/calendar": "Calendar",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  return(
    <header className="bg-white dark:bg-[#1E293B] px-4 flex items-center justify-between border-l border-indigo-100 dark:border-gray-600">
      <div className='flex items-center gap-2'>
        <House size={16} className='text-gray-500'/>
        <ChevronRight size={16} className='text-gray-500'/>
        <span className='text-sm font-semibold text-slate-600 dark:text-white'>{routeMap[location.pathname]}</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle/>
        <div className="hover:bg-indigo-100 p-1.5 rounded-lg">
          <Bell size={16} className="text-gray-400"/>
        </div>
        <AddJob name="Add Job" onClick={() => setIsModalOpen && setIsModalOpen(true)}/>
        <div className='text-white text-[13px] font-semibold bg-indigo-600 size-7 rounded-full flex items-center justify-center'>{getInitials(user?.fullName ?? "U")}</div>
      </div>
    </header>
  )
}