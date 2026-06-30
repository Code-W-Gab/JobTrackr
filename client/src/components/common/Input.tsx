import type { Dispatch, SetStateAction } from "react";

interface IInput {
  type: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function Input({type, placeholder, value, setValue}: IInput){
  return(
    <main>
      <input
        type={type}
        id={type}
        placeholder={placeholder}
        className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </main>
  )
}