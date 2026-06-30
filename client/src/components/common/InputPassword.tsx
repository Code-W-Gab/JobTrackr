import { type Dispatch, type SetStateAction } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface IInputPassword {
  passwordType: string;
  textType: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function InputPassword({passwordType, textType, placeholder, value, setValue}: IInputPassword){
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return(
    <main className="flex items-center gap-2 border border-gray-200 rounded-xl ">
      <input
        type={showPassword ? textType : passwordType}
        placeholder={placeholder}
        className="block w-full py-2 px-3 focus:outline-none focus:ring-0 sm:text-sm"
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
        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </main>
  )
}