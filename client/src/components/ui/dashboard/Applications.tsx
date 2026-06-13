import { Search, Funnel, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function Applications(){
  const [filterActive, setFilterActive] = useState<boolean>(false);
  
  const platforms = [ "All", "LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other" ]
  const locationType = [ "All", "On-site", "Remote", "Hybrid" ]
  const jobType = [ "All", "Full-time", "Part-time", "Contract", "Internship" ]

  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100">
      <div className="space-y-1">
        <h1 className="font-bold text-xl text-gray-800">Applications</h1>
        <p className="text-xs text-gray-500">10 application found</p>
      </div>
      <div className="bg-white p-2.5 rounded-lg mt-8">
        <div className="flex items-center gap-3">
          <div className="w-full">
            <div className="relative flex items-center">
              <div className="absolute pointer-events-none left-3">
                <Search className="size-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search company, position..."
                className="w-full py-1.5 pl-10 pr-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400"
              />    
            </div>
          </div>

          <button onClick={() => setFilterActive(!filterActive)} className="flex items-center gap-2 border border-gray-200 px-5 py-1.5 rounded-xl text-gray-600">
            <Funnel size={14}/>
            <span className="text-sm">Filters</span>
            {filterActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className={`grid grid-cols-3 gap-4 mt-3 ${filterActive ? 'block' : 'hidden'}`}>
          {/* Platform */}
          <select className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {/* Location Type */}
          <select className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {locationType.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {/* Job Type */}
          <select className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {jobType.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  )
}