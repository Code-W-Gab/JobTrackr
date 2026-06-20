import { MapPin, Calendar } from "lucide-react";
import { useApplications } from "../../../hook/useApplication";

type statusType = {
  type: string,
  count: number
}

export default function Kanban(){
  const { applications } = useApplications()

  const status: statusType[] = [
    { type: "Wishlist", count: applications.filter(app => app.status === "Wishlist").length },
    { type: "Applied", count: applications.filter(app => app.status === "Applied").length },
    { type: "Assessment", count: applications.filter(app => app.status === "Assessment").length },
    { type: "Interview", count: applications.filter(app => app.status === "Interview").length },
    { type: "Final Interview", count: applications.filter(app => app.status === "Final Interview").length },
    { type: "Offer", count: applications.filter(app => app.status === "Offer").length },
    { type: "Rejected", count: applications.filter(app => app.status === "Rejected").length },
    { type: "Accepted", count: applications.filter(app => app.status === "Accepted").length },
  ]

  const getApplicationsByStatus = (statusType: string) => {
    return applications.filter(app => app.status === statusType)
  }

  return(
    <main className="h-full w-full flex flex-col p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <div className="space-y-1">
        <h1 className="font-bold text-xl text-gray-800">Kanban Board</h1>
        <p className="text-xs text-gray-500">Drag and drop to update application status</p>
      </div>
      
      <div className="mt-6 flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 h-full w-100">
          {status.map((item, index) => {
            const columnApplications = getApplicationsByStatus(item.type)

            return(
              <div key={index} className="w-60 shrink-0 h-full bg-white rounded-lg border border-t-4 border-t-indigo-500 border-gray-200 flex flex-col">
                <div className="flex items-center justify-between p-3 text-gray-700 text-xs font-semibold border-b border-gray-200">
                  <h1>{item.type}</h1>
                  <p className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">{item.count}</p>
                </div>
                <div className="flex-1 p-2.5 bg-gray-100 space-y-2 overflow-y-auto">
                  {columnApplications.length > 0 ? (
                    columnApplications.map((app) => (
                      <div 
                        key={app._id}
                        className="space-y-3 p-2.5 rounded-lg bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-white text-[13px] font-semibold bg-indigo-600 px-2 py-0.5 rounded-lg">
                            <p>{app.companyName.charAt(0).toUpperCase()}</p>
                          </div>
                          <span className="text-sm font-semibold truncate">{app.companyName}</span>
                        </div>
                        <p className="text-[11px] text-gray-500">{app.jobTitle}</p>
                        <div className="flex items-center justify-between text-gray-500 gap-2">
                          <div className="text-[11px] flex items-center gap-1">
                            <MapPin size={14}/>
                            <p className="truncate">{app.locationType}</p>
                          </div>
                          <div className="text-[11px] flex items-center gap-1">
                            <Calendar size={14}/>
                            <p>{new Date(app.dateApplied).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-400 text-xs">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}