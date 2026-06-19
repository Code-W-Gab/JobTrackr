// import BackToMenuBtn from "../../common/BackToMenuBtn";
import { MoveLeft, MapPin, Briefcase, Globe, Calendar, ExternalLink, CircleCheckBig } from "lucide-react";

interface OpenApplicationProps {
  onClose: () => void
}

type status = 
  | "completed"
  | "current"
  | "pending"

interface timelineStages {
  id: number,
  label: string,
  status: status
  description?: string
}

export default function OpenApplication({onClose}: OpenApplicationProps){

  const timelineStages: timelineStages[] = [
    { id: 1, label: 'Wishlist', status: 'completed' },
    { id: 2, label: 'Applied', status: 'current', description: 'Current stage' },
    { id: 3, label: 'Assessment', status: 'pending' },
    { id: 4, label: 'Interview', status: 'pending' },
    { id: 5, label: 'Final Interview', status: 'pending' },
    { id: 6, label: 'Offer', status: 'pending' },
    { id: 7, label: 'Accepted', status: 'pending' },
  ];

  return(
    <main className="overflow-y-auto h-[calc(100vh-100px)] px-10">
      <button onClick={onClose} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-300">
        <MoveLeft size={14}/>
        Back to Applications
      </button>
      <div className="bg-white p-6 rounded-xl border border-gray-200 mt-4">
        <div className="flex gap-3 items-start">
          <div className="bg-black text-white py-3 px-5 rounded-xl">
            <span className="text-xl font-bold ">G</span>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">GitHub</h1>
              <div className="px-6 py-1 text-center bg-blue-100 text-blue-800 text-[11px]  font-medium rounded-full">
                <span>Applied</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-1 mb-3">Senior Engineer</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin size={14}/>
                <span className="text-sm">Remote</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Briefcase size={14}/>
                <span className="text-sm">Full-Time</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Globe size={14}/>
                <span className="text-sm">Remote</span>
              </div>
              <p className="text-gray-500 text-sm">$1500,000</p>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar size={14}/>
                <span className="text-sm">Applied 2024-05-12</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-indigo-500 cursor-pointer hover:underline">
          <ExternalLink size={14}/>
          <span className="text-xs">View Job Posting</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <div className="bg-white w-full rounded-xl border border-gray-200 mt-4 p-6">
            <h1 className="font-bold mb-6">Application Timeline</h1>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-5 w-0.5 bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-3">
                {timelineStages.map((stage) => (
                  <div key={stage.id} className="flex items-start gap-6 relative">
                    {/* Circle indicator */}
                    <div className={`shrink-0 size-8 rounded-full flex items-center justify-center border-2 z-10 ${
                      stage.status === 'completed' 
                        ? 'bg-green-500 border-green-500' 
                        : stage.status === 'current' 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}>
                      {stage.status === 'completed' && (
                        <CircleCheckBig size={16} className="text-white" />
                      )}
                      {stage.status === 'current' && (
                        <CircleCheckBig size={16} className="text-white" />
                      )}
                    </div>
                    
                    {/* Text content */}
                    <div className="pt-1.5">
                      <p className={`font-medium text-sm ${
                        stage.status === 'pending' ? 'text-gray-300' : stage.status  === "current" ? 'text-indigo-500' : 'text-gray-700'
                      }`}>
                        {stage.label}
                      </p>
                      {stage.description && (
                        <p className="text-xs text-gray-400">{stage.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-xl border border-gray-200 mt-4 p-6 space-y-3">
            <h1 className="font-bold">Notes</h1>
            <p className="text-sm text-gray-500">Applied via referral asdasdsad.</p>
          </div>
        </div>

        <div>
          <div className="bg-white w-60 rounded-xl border border-gray-200 mt-4 p-6 space-y-4">
            <h1 className="font-bold">Application Info</h1>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">Platform</p>
              <p className="text-sm text-gray-800">Company Website</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="text-sm text-gray-800">Full-Time</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">Location Type</p>
              <p className="text-sm text-gray-800">Remote</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-sm text-gray-800">$150,000</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">Date Applied</p>
              <p className="text-sm text-gray-800">2024-05-12</p>
            </div>
          </div>
          
          <div className="bg-white w-60 rounded-xl border border-gray-200 mt-4 p-6 space-y-4">
            <h1 className="font-bold">Quick Actions</h1>
            <div className="space-y-4 text-gray-700">
              <p className="text-sm font-semibold cursor-pointer hover:text-indigo-600">Schedule Interview</p>
              <p className="text-sm font-semibold cursor-pointer hover:text-indigo-600">Update Status</p>
              <p className="text-sm font-semibold cursor-pointer hover:text-indigo-600">Set Reminder</p>
              <p className="text-sm font-semibold cursor-pointer hover:text-indigo-600">Send Follow-up</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}