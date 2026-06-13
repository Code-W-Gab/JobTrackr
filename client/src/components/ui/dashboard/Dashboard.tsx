import { Briefcase, Calendar, TrendingUp, Award, Target, CircleX, icons } from 'lucide-react';
import AddJob from "../../common/AddJob";
import { useState } from 'react';
import AddApplicationModal from "../../overlays/AddApplicationModal";

export default function Dashboard(){
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  const status = [
    {
      count: 48,
      name: "Total Applications",
      icon: Briefcase,
      color: "text-indigo-700",
      bgColor: "bg-indigo-100"
    },
    {
      count: 23,
      name: "Active Applications",
      icon: TrendingUp,
      color: "text-blue-700",
      bgColor: "bg-blue-100"
    },
    {
      count: 9,
      name: "Interviews Scheduled",
      icon: Calendar,
      color: "text-orange-700",
      bgColor: "bg-orange-100"
    },
    {
      count: 3,
      name: "Offer Received",
      icon: Award,
      color: "text-green-700",
      bgColor: "bg-green-100"
    },
    {
      count: 12,
      name: "Rejected",
      icon: CircleX,
      color: "text-red-700",
      bgColor: "bg-red-100"
    },
    {
      count: "19.7%",
      name: "Success Rate",
      icon: Target,
      color: "text-violet-700",
      bgColor: "bg-violet-100"
    }
  ]
  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl text-gray-800">Good morning, Gab</h1>
          <p className="text-sm text-gray-500">Here's what's happening with your job search today.</p>
        </div>
        <AddJob name="Add Application" onClick={() => setIsModalOpen(true)} />
      </div>
      <div className='grid grid-cols-6 gap-4 mt-8'>
        {status.map((stats, index) => {
          return(
            <div key={index} className='bg-white p-4 rounded-lg border border-gray-100'>
              <div className={`${stats.bgColor} ${stats.color} p-2 rounded-full inline-flex`}>
                <stats.icon size={16}/>
              </div>
              <div className='mt-2'>
                <h1 className='text-2xl font-bold text-indigo-600'>{stats.count}</h1>
                <p className='text-[10px] text-gray-600'>{stats.name}</p>
              </div>
            </div>
          )
        })}
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