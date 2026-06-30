import { Briefcase, Calendar, TrendingUp, Award, Target, CircleX, Plus, ArrowRight } from 'lucide-react';
import AddJob from "../../common/AddJob";
import { useState } from 'react';
import AddApplicationModal from "../../overlays/AddApplicationModal";

type statusType = {
  count: number | string,
  name: string,
  icon: React.ElementType,
  color: string,
  bgColor: string
}

export default function Dashboard(){
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  const status: statusType[] = [
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
          <h1 className="font-bold text-xl text-gray-800">Good morning, Gab</h1>
          <p className="text-xs text-gray-500">Here's what's happening with your job search today.</p>
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
                <h1 className={`text-2xl font-semibold ${stats.color}`}>{stats.count}</h1>
                <p className='text-[10px] text-gray-600'>{stats.name}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className='grid grid-cols-3 gap-4 items-start'>
        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <div className='flex items-center justify-between'>
            <h1 className='font-bold text-gray-900'>Upcoming Interviews</h1>
            <button className='text-indigo-600 text-xs hover:underline cursor-pointer'>View all</button>
          </div>
          <div className='flex items-center justify-between py-2 px-3 bg-gray-100 rounded-lg mt-4'>
            <div className='flex gap-2'>
              <div className='bg-black text-white px-3 rounded-xl flex items-center justify-center'>
                <span className='text-xs font-semibold'>N</span>
              </div>
              <div>
                <h4 className='text-sm font-semibold'>Notion</h4>
                <p className='text-xs text-gray-500'>Full Stack Developer</p>
              </div>
            </div>
            <div>
              <span className='text-xs text-orange-500'>Tomorrow</span>
              <p className='text-xs text-gray-500'>10:00 AM</p>
            </div>
          </div>
        </section>

        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <h1 className='font-bold text-gray-900'>Recent Activity</h1>
          <div className='mt-4'>
            <div className='flex items-center gap-2'>
              <div className='bg-black text-white px-3 py-2 rounded-xl flex items-center justify-center'>
                <span className='text-xs font-semibold'>N</span>
              </div>
              <div className='flex flex-col  text-gray-500'>
                <h3 className='text-xs'>Applied to <span className='font-semibold text-black'>Github</span></h3>
                <p className='text-xs'>2h ago</p>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <h1 className='font-bold text-gray-900'>Quick Actions</h1>
          <div className="space-y-2">
            {[
              { label: 'Add New Application', desc: 'Track a new job', color: 'bg-indigo-600' },
              { label: 'View Calendar', desc: 'See upcoming events',  color: 'bg-blue-600' },
              { label: 'Create Reminder', desc: 'Set a follow-up',  color: 'bg-amber-600' },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group">
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[#0F172A]">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </section>
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