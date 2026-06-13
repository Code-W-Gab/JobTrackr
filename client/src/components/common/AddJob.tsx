import { Plus } from 'lucide-react';


interface nameProps {
  name: string
  onClick?: () => void
}
export default function AddJob({name, onClick}: nameProps){

  return(
    <button onClick={onClick} className='bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-1.5 text-sm rounded-xl'>
      <Plus size={14}/>
      {name}
    </button>
  )
}