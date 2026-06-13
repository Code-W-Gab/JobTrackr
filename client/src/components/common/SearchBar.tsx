import { Search } from 'lucide-react'; 

export default function SearchBar() {
  return (
    <div className="w-full max-w-md">
      <div className="relative flex items-center">
        <div className="absolute pointer-events-none left-3">
          <Search className="size-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search applications..."
          className="w-full py-1.5 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400"
        />    
      </div>
    </div>
  );
}
