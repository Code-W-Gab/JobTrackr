import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useApplications } from '../../../hook/useApplication';
import { useAuthContext } from '../../../hook/useAuth';
import { formatDate, formatDateForInput, formatRelativeTime } from '../../../Utils/formatDate';
import { getAvatarColor, getInitials } from '../../../Utils/getInitial';
import AddJob from "../../common/AddJob";
import { getMetricsData, getMonthlyData, getRecentActivity, getRecentApplications, getUpcomingInterviews } from '../../common/data';
import OnNavigate from "../../common/OnNavigate";
import Status from '../../common/Status';
import AddApplicationModal from "../../overlays/AddApplicationModal";

export default function Dashboard(){
  const { user } = useAuthContext()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { applications } = useApplications()
  const { status, STATUS_DISTRIBUTION } = getMetricsData(applications)
  const recentApplications = getRecentApplications(applications)
  const upcomingInterviews = getUpcomingInterviews(applications)
  const recentActivity = getRecentActivity(applications)
  const monthlyData = getMonthlyData(applications)

  const ActivityStatus: Record<string, string> = {
    Applied: "Applied to",
    Assessment: "Assessment for",
    Interview: "Interview for",
    "Final Interview": "Final Interview for",
    Offer: "Offer received from",
    Rejected: "Rejected by",
    Accepted: "Accepted offer from",
    Wishlist: "Added to wishlist"
  }

  return(
    <main className="h-full w-full overflow-y-auto p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-xl text-gray-800">Good morning, {user?.fullName}</h1>
          <p className="text-xs text-gray-500">Here's what's happening with your job search today.</p>
        </div>
        <AddJob name="Add Application" onClick={() => setIsModalOpen(true)} />
      </div>
      <div className='grid grid-cols-6 gap-4 mt-8'>
        {status.map((stats, index) => {
          return(
            <div key={index} className='bg-white p-4 rounded-lg border border-slate-100'>
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
          <div className='mb-6'>
            <h3 className="font-semibold text-[#0F172A]">Applications Over Time</h3>
            <p className="text-xs text-slate-400 mt-0.5">Monthly application activity</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
        <section className='bg-white p-4 mt-4 rounded-xl border border-slate-100'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-[#0F172A] '>Upcoming Interviews</h1>
            <OnNavigate to="/calendar">
              <button className='text-indigo-600 text-xs hover:underline cursor-pointer'>
                View all
              </button>
            </OnNavigate>
          </div>
          <div>
            {upcomingInterviews.length === 0 ? (
              <p className='text-xs text-slate-400 mt-2'>No upcoming interviews</p>
            ) : (
              <div className='space-y-2 mt-4'>
                {upcomingInterviews.map((interview, index) => {
                  return(
                    <div key={interview._id} className='flex items-center justify-between py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg'>
                      <div className='flex gap-2'>
                        <div className={`text-white size-9 rounded-xl flex items-center justify-center ${getAvatarColor(interview.companyName, index)}`}>
                          <span className='text-xs font-semibold'>{getInitials(interview.companyName)}</span>
                        </div>
                        <div>
                          <h4 className='text-sm font-medium text-[#0F172A]'>{interview.companyName}</h4>
                          <p className='text-xs text-slate-500'>{interview.jobType}</p>
                        </div>
                      </div>
                      <div className='flex flex-col items-end'>
                        <span className='text-xs text-amber-600'>{formatDate(interview.interviewDate ?? "")}</span>
                        <p className='text-xs text-slate-400'>{interview.interviewTime}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <section className='bg-white p-4 mt-4 rounded-xl border border-slate-100'>
          <h1 className='font-semibold text-[#0F172A] '>Recent Activity</h1>
          <div className='mt-4'>
            {recentActivity.length === 0 ? (
              <p className='text-xs text-slate-400'>No recent activity</p>
            ) : (
              <div className='space-y-4'>
                {recentActivity.map((activity, index) => {
                  return(
                    <div key={activity._id} className='flex items-center gap-2'>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(activity.companyName, index)}`}>{getInitials(activity.companyName)}</div>
                      <div className='flex flex-col'>
                        <h3 className='text-sm text-slate-500'>{ActivityStatus[activity.status] || "Updated"} <span className='font-medium text-black'>{activity.companyName}</span></h3>
                        <p className='text-xs text-slate-400'>{formatRelativeTime(activity.updatedAt || activity.dateApplied)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Quick Action */}
        <section className='bg-white p-4 mt-4 rounded-xl border border-slate-100'>
          <h1 className='font-semibold text-[#0F172A] '>Quick Actions</h1>
          <div className="space-y-2 mt-4">
            {[
              { label: 'Add New Application', desc: 'Track a new job', color: 'bg-indigo-600', action: () => setIsModalOpen(true) },
              { label: 'View Calendar', desc: 'See upcoming events',  color: 'bg-blue-600', action: () => {}, navigate: "/calendar" }
            ].map(item => (
              <OnNavigate to={item.navigate} key={item.label} onClick={item.action} className='w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group'>
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[#0F172A]">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </OnNavigate>
            ))}
          </div>
        </section>
      </div>
      
      {/* Recent Application */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mt-4">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-semibold text-[#0F172A] ">Recent Applications</h3>
          <OnNavigate to='/application'>
            <button className="flex items-center gap-1 text-xs text-indigo-600  hover:underline">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </OnNavigate>
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
              {recentApplications.map((application, index) => {
                return(
                  <tr className="hover:bg-slate-50/50 transition-colors" key={application._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(application.companyName, index)}`}>{getInitials(application.companyName)}</div>
                        <span className="text-sm font-medium text-[#0F172A]">{application.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 ">{application.jobType}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{formatDateForInput(application.dateApplied)}</td>
                    <td className='px-6 py-4'>
                      <Status className='flex w-fit items-center gap-2 rounded-xl px-2.5 py-1' status={application.status}/>
                    </td>
                  </tr>
                )
              })}
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