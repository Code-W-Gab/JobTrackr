import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { TrendingUp, Briefcase, MessageSquare, Award } from 'lucide-react';

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

const PLATFORM_DATA = [
  { platform: 'LinkedIn', count: 42 },
  { platform: 'Company Site', count: 28 },
  { platform: 'Indeed', count: 18 },
  { platform: 'Glassdoor', count: 9 },
  { platform: 'JobStreet', count: 3 },
];

const CONVERSION_DATA = [
  { stage: 'Applied', count: 80, color: '#3B82F6' },
  { stage: 'Screened', count: 52, color: '#6366F1' },
  { stage: 'Interview', count: 28, color: '#F59E0B' },
  { stage: 'Final', count: 12, color: '#F97316' },
  { stage: 'Offer', count: 6, color: '#10B981' },
  { stage: 'Accepted', count: 3, color: '#22C55E' },
];

const RESPONSE_DATA = [
  { month: 'Jan', rate: 15 },
  { month: 'Feb', rate: 22 },
  { month: 'Mar', rate: 31 },
  { month: 'Apr', rate: 28 },
  { month: 'May', rate: 38 },
  { month: 'Jun', rate: 42 },
];

const METRICS = [
  { label: 'Applications Sent', value: '80', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { label: 'Interviews', value: '28', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Offers', value: '6', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Acceptance Rate', value: '50%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
];

const TOOLTIP_STYLE = { background: '#1E293B', border: 'none', borderRadius: 12, color: '#F1F5F9', fontSize: 12 };

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 border-l border-indigo-100">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Insights into your job search performance</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className={`text-3xl font-bold ${m.color}`}>{m.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Applications Per Month</h3>
          <p className="text-xs text-slate-400 mb-6">Monthly application volume</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="applications" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Applications" />
              <Bar dataKey="interviews" fill="#10B981" radius={[6, 6, 0, 0]} name="Interviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Application Status Breakdown</h3>
          <p className="text-xs text-slate-400 mb-6">Current pipeline distribution</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={STATUS_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {STATUS_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {STATUS_DISTRIBUTION.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Interview Conversion Funnel</h3>
          <p className="text-xs text-slate-400 mb-6">Progression through hiring stages</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CONVERSION_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Candidates">
                {CONVERSION_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Top Platforms</h3>
          <p className="text-xs text-slate-400 mb-6">Where you apply most</p>
          <div className="space-y-3">
            {PLATFORM_DATA.map((item, i) => {
              const max = PLATFORM_DATA[0].count;
              const pct = Math.round((item.count / max) * 100);
              const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];
              return (
                <div key={item.platform}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#0F172A] dark:text-slate-300">{item.platform}</span>
                    <span className="text-sm font-semibold text-[#0F172A] dark:text-white">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[i]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Response rate */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Response Rate Over Time</h3>
        <p className="text-xs text-slate-400 mb-6">Percentage of applications receiving responses</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={RESPONSE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="responseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`, 'Response Rate']} />
            <Area type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2.5} fill="url(#responseGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}