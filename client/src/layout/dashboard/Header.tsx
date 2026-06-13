import AddJob from "../../components/common/AddJob";
import Profile from "../../components/common/Profile";
import SearchBar from "../../components/common/SearchBar";
import { Sun, Bell } from 'lucide-react';

export default function Header() {
  return(
    <header className="bg-white w-full p-3 flex items-center justify-between border-l border-indigo-100">
      <SearchBar/>
      <div className="flex items-center gap-2">
        <div className="hover:bg-indigo-100 p-1.5 rounded-lg">
          <Sun size={15} className="text-gray-600 "/>
        </div>
        <div className="hover:bg-indigo-100 p-1.5 rounded-lg">
          <Bell size={16} className="text-gray-600"/>
        </div>
        <AddJob name="Add Job"/>
        <Profile initials="GC"/>
      </div>
    </header>
  )
}