import { ChevronDown, ChevronUp, ExternalLink, Eye, Funnel, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApplications } from "../../../hook/useApplication";
import type { filterType } from "../../../types/applicationTypes";
import { formatDate } from "../../../Utils/formatDate";
import { getAvatarColor, getInitials } from "../../../Utils/getInitial";
import { getMetricsData } from "../../common/data";
import Status from "../../common/Status";
import DeleteModal from "../../overlays/DeleteModal";
import UpdateApplicationModal from "../../overlays/UpdateApplicationModal";
import OpenApplication from "./OpenApplication";

export default function Applications(){
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filter, setFilter] = useState<filterType>({ platform: "All", locationType: "All", jobType: "All" })
  const { applications, handleUpdateApplication, handleDeleteApplication } = useApplications()
  const { statusValue } = getMetricsData(applications)
  const platforms: string[] = [ "All", "LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other" ]
  const locationType: string[] = [ "All", "On-Site", "Remote", "Hybrid" ]
  const jobType: string[] = [ "All", "Full-Time", "Part-Time", "Contract", "Internship" ]

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.companyName.toLowerCase().includes(query) ||
        application.jobTitle.toLowerCase().includes(query);

      const matchesPlatform =
        filter.platform === "All" || application.platform === filter.platform;

      const matchesLocation =
        filter.locationType === "All" || application.locationType === filter.locationType;

      const matchesJobType =
        filter.jobType === "All" || application.jobType === filter.jobType;

      return matchesSearch && matchesPlatform && matchesLocation && matchesJobType;
    });
  }, [applications, searchQuery, filter]);

  return(
    <main className="h-full overflow-y-auto p-6 bg-[#f5f7f7] border-l border-indigo-100 dark:bg-[#161f2e] dark:border-gray-700">
      <div>
        <div className={`${isOpenApplication ? "hidden" : "block"} shrink-0`}>
          <div className="space-y-1">
            <h1 className="font-bold text-xl text-gray-800 dark:text-white">Applications</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{statusValue.totalApplications} application found</p>
          </div>
          <div className="bg-white p-2.5 rounded-lg mt-8 border border-gray-200 dark:bg-[#1E293B] dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-full">
                <div className="relative flex items-center">
                  <div className="absolute pointer-events-none left-3">
                    <Search className="size-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search company, position..."
                    className="w-full py-1.5 pl-10 pr-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400 dark:bg-[#161f2e] dark:border-gray-700"
                  />    
                </div>
              </div>

              <button onClick={() => setFilterActive(!filterActive)} className="flex items-center gap-2 border border-gray-200 px-5 py-1.5 rounded-xl text-gray-600 dark:border-gray-700 dark:text-gray-300">
                <Funnel size={14}/>
                <span className="text-sm">Filters</span>
                {filterActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            <div className={`grid grid-cols-3 gap-4 mt-3 ${filterActive ? 'block' : 'hidden'}`}>
              {/* Platform */}
              <select 
                value={filter.platform} 
                onChange={(e) => setFilter({ ... filter, platform: e.target.value })}
                className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-[#161f2e] dark:border-gray-700 dark:text-gray-400"
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              {/* Location Type */}
              <select 
                value={filter.locationType}
                onChange={(e) => setFilter({ ...filter, locationType: e.target.value})}
                className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-[#161f2e] dark:border-gray-700 dark:text-gray-400"
              >
                {locationType.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {/* Job Type */}
              <select 
                value={filter.jobType}
                onChange={(e) => setFilter({ ...filter, jobType: e.target.value })}
                className="mt-1.5 w-full border border-gray-200 bg-gray-50 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-[#161f2e] dark:border-gray-700 dark:text-gray-400"
              >
                {jobType.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="overflow-x-auto w-full text-left text-sm text-gray-500 mt-4 border border-gray-200 flex-1 dark:border-gray-700">
            <thead className="text-[11px] text-gray-500 uppercase bg-gray-100 dark:bg-[#161f2e] dark:text-gray-400">
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
              {filteredApplications.map((application, index) => {
                return(
                  <tr key={application._id} className="bg-white border-b border-gray-200 text-xs dark:bg-[#1E293B] dark:border-gray-700">
                    <td className="px-5 py-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center gap-2">
                        <div className={`text-white text-[13px] font-semibold bg-indigo-600 px-2 py-1 rounded-lg ${getAvatarColor(application.companyName, index)}`}>{getInitials(application.companyName)}</div>
                        <span>{application.companyName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-2 dark:text-gray-400">{application.platform}</td>
                    <td className="px-5 py-4 dark:text-gray-400">{application.jobTitle}</td>
                    <td className="px-5 py-4 dark:text-gray-400">{application.jobType}</td>
                    <td className="px-5 py-4 dark:text-gray-400">{application.locationType}</td>
                    <td className="px-5 py-4 dark:text-gray-400">{formatDate(application.dateApplied)}</td>
                    <td className="px-5 py-4 dark:text-gray-400">{application.salary}</td>
                    <td className="px-5 py-4 dark:text-gray-400">
                    <div>
                      <Status status={application.status} className="flex w-fit items-center gap-2 rounded-xl px-2.5 py-1"/>
                    </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => {
                            setSelectedId(application._id)
                            setIsOpenApplication(true)
                            setIndex(index)
                          }}
                          className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md dark:text-gray-400 dark:hover:bg-gray-700">
                            <Eye size={13}/>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedId(application._id)
                            setIsModalOpen(true)
                          }} 
                          className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md dark:text-gray-400 dark:hover:bg-gray-700">
                            <Pencil size={13}/>
                        </button>
                        <Link to={application.jobURL} className="hover:bg-gray-100 text-gray-500 p-1.5 rounded-md dark:text-gray-400 dark:hover:bg-gray-700">
                          <ExternalLink size={13}/>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedId(application._id)
                            setIsDeleteModalOpen(true)
                          }}
                          className="hover:bg-gray-100 hover:text-red-600 text-gray-500 p-1.5 rounded-md dark:text-gray-400 dark:hover:bg-red-900 dark:hover:text-red-400">
                            <Trash2 size={13}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
            
        {/* Open Application */}
        <div className={`${isOpenApplication ? "block" : "hidden"}` }>
          <OpenApplication 
            onClose={() => setIsOpenApplication(false)}
            selectedId={selectedId}
            index={index}
          />
        </div>
      </div>

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
     