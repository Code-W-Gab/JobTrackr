import AddJob from "../../common/AddJob";
import { useState } from 'react';
import AddApplicationModal from "../../overlays/AddApplicationModal";

export default function Dashboard(){
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl text-gray-800">Good morning, Gab</h1>
          <p className="text-sm text-gray-500">Here's what's happening with your job search today.</p>
        </div>
        <AddJob name="Add Application" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <AddApplicationModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </main>
  )
}