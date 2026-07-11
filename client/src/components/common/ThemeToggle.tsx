import { useTheme } from "../../hook/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle(){
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className="hover:bg-indigo-100 p-1.5 rounded-lg">
      {theme === "light" ? <Sun size={15} className="text-gray-500 "/> : <Moon size={15} className="text-gray-400"/>}
    </button>
  )
}