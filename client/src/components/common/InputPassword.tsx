import { type Dispatch, type SetStateAction } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IInputPassword {
  name: string
  passwordType: string;
  textType: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function InputPassword({name, passwordType, textType, placeholder, value, setValue}: IInputPassword){
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return(
    <main className="flex flex-col space-y-2">
      <label className="block text-xs font-medium text-gray-700">{name}</label>
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl ">
        <input
          type={showPassword ? textType : passwordType}
          placeholder={placeholder}
          className="block w-full py-2 px-3 focus:outline-none focus:ring-0 sm:text-sm "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          onMouseDown={(e) => e.preventDefault()}
          className="pl-1 pr-3 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} className="text-gray-500"/> : <Eye size={16} className="text-gray-500"/>}
        </button>
      </div>
    </main>
  )
}