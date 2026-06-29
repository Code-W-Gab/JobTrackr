import { Zap } from 'lucide-react';

export default function Brand() {
  return(
    <main className='bg-white py-3'>
      <div className="flex items-center gap-2 px-4">
        <div className="bg-indigo-600 text-white rounded-lg p-1.5">
          <Zap size={16}/>
        </div>
        <h1 className="font-bold text-gray-800">JobTrackr</h1>
      </div>
    </main>
  )
}