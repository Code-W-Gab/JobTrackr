import { Search, Funnel, ChevronDown, ChevronUp, Eye, Pencil, ExternalLink, Trash2  } from "lucide-react"
import { useState } from "react"
import { useApplications } from "../../../hook/useApplication";
import UpdateApplicationModal from "../../overlays/UpdateApplicationModal";
import { formatDate } from "../../../Utils/formatDate";
import DeleteModal from "../../overlays/DeleteModal";

export default function Applications(){
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const { applications, handleUpdateApplication, handleDeleteApplication } = useApplications()

  const platforms: string[] = [ "All", "LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other" ]
  const locationType: string[] = [ "All", "On-site", "Remote", "Hybrid" ]
  const jobType: string[] = [ "All", "Full-time", "Part-time", "Contract", "Internship" ]

  return(
    <main className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100 overflow-y-auto">
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

      <table className="w-full text-left text-sm text-gray-500 mt-4 rounded-lg border border-gray-200">
        <thead className="text-[11px] text-gray-500 uppercase bg-gray-100 ">
          <tr >
            <th scope="col" className="px-5 py-3">COMPANY</th>
            <th scope="col" className="px-5 py-3">PLATFORM</th>
            <th scope="col" className="px-5 py-3">POSITION</th>
            <th scope="col" className="px-5 py-3">TYPE</th>
            <th scope="col" className="px-5 py-3">LOCATION</th>
            <th scope="col" className="px-5 py-3">DATE</th>
            <th scope="col" className="px-5 py-3">SALARY</th>
            <th scope="col" className="px-5 py-3">STATUS</th>
            <th scope="col" className="px-5 py-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            return(
              <tr key={application._id} className="bg-white border-b border-gray-200 text-xs">
                <td className="px-5 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="text-white text-[13px] font-semibold bg-indigo-600 px-2 py-1 rounded-lg">
                      <p>G</p>
                    </div>
                    <span>{application.companyName}</span>
                  </div>
                </td>
                <td className="px-5 py-2">{application.platform}</td>
                <td className="px-5 py-4">{application.jobTitle}</td>
                <td className="px-5 py-4">{application.jobType}</td>
                <td className="px-5 py-4">{application.locationType}</td>
                <td className="px-5 py-4">{formatDate(application.dateApplied)}</td>
                <td className="px-5 py-4">{application.salary}</td>
                <td className="px-5 py-4">
                  <div className="px-3 py-0.5 text-center bg-blue-100 text-blue-800 text-[11px]  font-medium rounded-full">
                    <span>{application.status}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button 
                      className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md">
                        <Eye size={13}/>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(application._id)
                        setIsModalOpen(true)
                      }} 
                      className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md">
                        <Pencil size={13}/>
                    </button>
                    <div className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md">
                      <ExternalLink size={13}/>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedId(application._id)
                        setIsDeleteModalOpen(true)
                      }}
                      className="hover:bg-gray-100 hover:text-red-600 text-gray-500 p-1.5 rounded-md">
                        <Trash2 size={13}/>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <UpdateApplicationModal 
              onClose={() => setIsModalOpen(false)} 
              selectedId={selectedId}
              onUpdate={handleUpdateApplication}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <DeleteModal 
              onClose={() => setIsDeleteModalOpen(false)}
              selectedId={selectedId}
              onDelete={handleDeleteApplication}
            />
          </div>
        </div>
      )}
    </main>
  )
}
     
