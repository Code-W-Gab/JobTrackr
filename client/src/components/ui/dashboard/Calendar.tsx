import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar(){
  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-indigo-500"></div>
            <p className="text-xs text-gray-500">Interview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-red-500"></div>
            <p className="text-xs text-gray-500">Deadline</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-yellow-500"></div>
            <p className="text-xs text-gray-500">Reminder</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer">
              <ChevronLeft size={12} />
            </div>
            <h2 className="text-xs text-gray-800 font-bold">June 2024</h2>
            <div className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer">
              <ChevronRight size={12}/>
            </div>
          </div>
        </div>
      </header>
    </main>
  )
}