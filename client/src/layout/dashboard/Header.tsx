import { Bell, Sun } from 'lucide-react';
import { getInitials } from "../../Utils/getInitial";
import AddJob from "../../components/common/AddJob";
import SearchBar from "../../components/common/SearchBar";
import { useAuthContext } from "../../hook/useAuth";

interface HeaderProps {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setIsModalOpen }: HeaderProps) {
  const { user } = useAuthContext();
  
  return(
    <header className="bg-white px-4 flex items-center justify-between border-l border-indigo-100">
      <SearchBar/>
      <div className="flex items-center gap-2">
        <div className="hover:bg-indigo-100 p-1.5 rounded-lg">
          <Sun size={15} className="text-gray-600 "/>
        </div>
        <div className="hover:bg-indigo-100 p-1.5 rounded-lg">
          <Bell size={16} className="text-gray-600"/>
        </div>
        <AddJob name="Add Job" onClick={() => setIsModalOpen && setIsModalOpen(true)}/>
        <div className='text-white text-[13px] font-semibold bg-indigo-600 size-7 rounded-full flex items-center justify-center'>{getInitials(user?.fullName ?? "U")}</div>
      </div>
    </header>
  )
}