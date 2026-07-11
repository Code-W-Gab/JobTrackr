import type { Dispatch, SetStateAction } from "react";

interface IInput {
  name: string
  type: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string | undefined
}

export default function Input({name, type, placeholder, value, setValue, error}: IInput){
  return(
    <main className="flex flex-col">
      <label className="block text-xs font-medium text-gray-700">{name}</label>
      <input
        type={type}
        id={type}
        placeholder={placeholder}
        className={`mt-1.5 block w-full border rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? "border-red-500" : "border-gray-200"}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <label className="text-xs text-red-400 px-1 mt-1">{error}</label>}
    </main>
  )
}