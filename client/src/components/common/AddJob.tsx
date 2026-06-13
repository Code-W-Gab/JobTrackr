import { Plus } from 'lucide-react';

interface nameProps {
  name: string
}
export default function AddJob({name}: nameProps){
  return(
    <button className='bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-1 text-sm rounded-lg'>
      <Plus size={14}/>
      {name}
    </button>
  )
}