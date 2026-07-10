import { AppWindow, ChartColumnIncreasing, Calendar, ChartLine, Mail, BellRing } from 'lucide-react';
import type React from 'react';

interface IFeature {
  title: string,
  description: string,
  bgColor: string,
  color: string,
  icon: React.ElementType
}

export default function Feature(){
  const features: IFeature[] = [
    { title: "Job Application Tracker", description: "Manage all your applications in one beautiful, organized place. Never lose track of a single opportunity.", bgColor: "bg-blue-100", color: "text-blue-600", icon: AppWindow },
    { title: "Kanban Board", description: "Visualize your pipeline with an intuitive drag-and-drop board. Move cards through stages effortlessly.", bgColor: "bg-green-100", color: "text-green-600", icon: ChartColumnIncreasing },
    { title: "Calendar View", description: "See all your interviews, deadlines, and follow-ups in a visual calendar. Stay on schedule, always.", bgColor: "bg-purple-100", color: "text-purple-600", icon: Calendar },
    { title: "Analytics Dashboard", description: "Gain insights into your job search with powerful charts and metrics. Know what works.", bgColor: "bg-yellow-100", color: "text-yellow-600", icon: ChartLine },
    { title: "Email Reminders", description: "Never forget to follow up. Set smart reminders and let JobTrackr keep you on point.", bgColor: "bg-pink-100", color: "text-pink-600", icon: Mail },
    { title: "Smart Notifications", description: "Get timely alerts for interviews, deadlines, and status updates right when you need them.", bgColor: "bg-indigo-100", color: "text-indigo-600", icon: BellRing },
  ]
  return(
    <main className="pb-16 px-30 grid grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="space-y-3 bg-white rounded-xl py-4 px-5 border border-gray-200 transition-transform duration-300 ease-out hover:-translate-y-1">
          <div className={`${feature.bgColor} rounded-lg p-2 inline-flex`}>
            <feature.icon size={18} className={feature.color} />
          </div>
          <h3 className="text-md font-semibold">{feature.title}</h3>
          <p className="text-gray-500 text-xs tracking-wide leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </main>
  )
}