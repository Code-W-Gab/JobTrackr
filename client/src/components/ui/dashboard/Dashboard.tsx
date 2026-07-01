import { Briefcase, Calendar, TrendingUp, Award, Target, CircleX, Plus, ArrowRight } from 'lucide-react';
import AddJob from "../../common/AddJob";
import { useState } from 'react';
import AddApplicationModal from "../../overlays/AddApplicationModal";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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

  const MONTHLY_DATA = [
    { month: 'Jan', applications: 4, interviews: 1 },
    { month: 'Feb', applications: 7, interviews: 2 },
    { month: 'Mar', applications: 12, interviews: 4 },
    { month: 'Apr', applications: 18, interviews: 6 },
    { month: 'May', applications: 24, interviews: 9 },
    { month: 'Jun', applications: 15, interviews: 5 },
  ];
  
  const STATUS_DISTRIBUTION = [
    { name: 'Applied', value: 28, color: '#3B82F6' },
    { name: 'Interview', value: 18, color: '#F59E0B' },
    { name: 'Offer', value: 8, color: '#10B981' },
    { name: 'Rejected', value: 22, color: '#EF4444' },
    { name: 'Accepted', value: 5, color: '#22C55E' },
    { name: 'Wishlist', value: 19, color: '#94A3B8' },
  ];

  return(
    <main className="h-full w-full overflow-y-auto p-6 bg-[#f5f7f7] border-l border-indigo-100">
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

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Area chart */}
        <div className="lg:col-span-2 bg-white  rounded-2xl p-6 border border-slate-100 ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#0F172A]">Applications Over Time</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly application activity</p>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+24% this month</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: 12, color: '#F1F5F9', fontSize: 12 }} />
              <Area type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={2.5} fill="url(#appGrad)" name="Applications" />
              <Area type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2.5} fill="url(#intGrad)" name="Interviews" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600" /><span className="text-xs text-slate-500">Applications</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-500">Interviews</span></div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white  rounded-2xl p-6 border border-slate-100">
          <div className="mb-6">
            <h3 className="font-semibold text-[#0F172A]">Status Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Application pipeline breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={STATUS_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {STATUS_DISTRIBUTION.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: 12, color: '#F1F5F9', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {STATUS_DISTRIBUTION.slice(0, 4).map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-slate-600 ">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-[#0F172A]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {/* Upcoming Interviews */}
        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-[#0F172A] '>Upcoming Interviews</h1>
            <button className='text-indigo-600 text-xs hover:underline cursor-pointer'>View all</button>
          </div>
          <div className='flex items-center justify-between py-2 px-3 bg-gray-100 rounded-lg mt-4'>
            <div className='flex gap-2'>
              <div className='bg-black text-white size-9 rounded-xl flex items-center justify-center'>
                <span className='text-xs font-semibold'>N</span>
              </div>
              <div>
                <h4 className='text-sm font-medium text-[#0F172A]'>Notion</h4>
                <p className='text-xs text-slate-500'>Full Stack Developer</p>
              </div>
            </div>
            <div>
              <span className='text-xs text-amber-600'>Tomorrow</span>
              <p className='text-xs text-slate-400'>10:00 AM</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <h1 className='font-semibold text-[#0F172A] '>Recent Activity</h1>
          <div className='mt-4'>
            <div className='flex items-center gap-2'>
              <div className='bg-black text-white px-3 py-2 rounded-xl flex items-center justify-center'>
                <span className='text-xs font-semibold'>N</span>
              </div>
              <div className='flex flex-col'>
                <h3 className='text-sm text-slate-500'>Applied to <span className='font-medium text-black'>Github</span></h3>
                <p className='text-xs text-slate-400'>2h ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action */}
        <section className='bg-white p-4 mt-4 rounded-xl border border-gray-200'>
          <h1 className='font-semibold text-[#0F172A] '>Quick Actions</h1>
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
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </section>
      </div>
      
      {/* Recent Application */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mt-4">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-semibold text-[#0F172A] ">Recent Applications</h3>
          <button className="flex items-center gap-1 text-xs text-indigo-600  hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['Company', 'Position', 'Date', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 ">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">V</div>
                    <span className="text-sm font-medium text-[#0F172A]">Vercel</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 ">Senior Frontend Engineer</td>
                <td className="px-6 py-4 text-sm text-slate-500">2024-05-10</td>
                <td className="px-6 py-4">Interview</td>
              </tr>
            </tbody>
          </table>
        </div>
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