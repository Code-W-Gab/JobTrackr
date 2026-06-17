import { MapPin, Calendar } from "lucide-react";

type statusType = {
  type: string,
  count: number
}
export default function Kanban(){
  const status: statusType[] = [
    { type: "Wishlist", count: 0 },
    { type: "Applied", count: 0 },
    { type: "Assessment", count: 0 },
    { type: "Interview", count: 0 },
    { type: "Final Interview", count: 0 },
    { type: "Offer", count: 0 },
    { type: "Rejected", count: 0 },
    { type: "Accepted", count: 0 },
  ]

  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100 ">
      <div className="space-y-1">
        <h1 className="font-bold text-xl text-gray-800">kanban Board</h1>
        <p className="text-xs text-gray-500">Drag and drop to update application status</p>
      </div>
      <div className="overflow-x-auto mt-6">
        <div className="flex gap-4 min-w-max">
          {status.map((item, index) => {
            return(
              <div key={index} className="w-50 shrink-0 bg-white rounded-lg border border-t-2 border-t-indigo-500 border-gray-200">
                <div className="flex items-center justify-between p-3 text-gray-700 text-xs font-semibold border-b border-gray-200">
                  <h1>{item.type}</h1>
                  <p>{item.count}</p>
                </div>
                <div className="p-2.5 h-94 bg-gray-100 space-y-2">
                  <div className="space-y-3 p-2.5 rounded-lg bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-2">
                      <div className="text-white text-[13px] font-semibold bg-indigo-600 px-2 py-0.5 rounded-lg">
                        <p>G</p>
                      </div>
                      <span className="text-sm font-semibold">Google</span>
                    </div>
                    <p className="text-[11px] text-gray-500">UX Engineer</p>
                    <div className="flex items-center justify-between text-gray-500">
                      <div className="text-[11px] flex items-center gap-2">
                        <MapPin size={14}/>
                        <p>On-Site</p>
                      </div>
                      <div className="text-[11px] flex items-center gap-2">
                        <Calendar size={14}/>
                        <p>04-10</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 p-2.5 rounded-lg bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-2">
                      <div className="text-white text-[13px] font-semibold bg-indigo-600 px-2 py-0.5 rounded-lg">
                        <p>G</p>
                      </div>
                      <span className="text-sm font-semibold">Google</span>
                    </div>
                    <p className="text-[11px] text-gray-500">UX Engineer</p>
                    <div className="flex items-center justify-between text-gray-500">
                      <div className="text-[11px] flex items-center gap-2">
                        <MapPin size={14}/>
                        <p>On-Site</p>
                      </div>
                      <div className="text-[11px] flex items-center gap-2">
                        <Calendar size={14}/>
                        <p>04-10</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}