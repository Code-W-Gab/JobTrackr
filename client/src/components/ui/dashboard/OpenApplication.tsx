import {
  Briefcase,
  Calendar,
  CircleCheckBig,
  ExternalLink,
  Globe,
  MapPin,
  MoveLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getApplicationById } from "../../../service/applicationService";
import type { IApplication } from "../../../types/applicationTypes";
import { formatDateForInput } from "../../../Utils/formatDate";
import { getAvatarColor, getInitials } from "../../../Utils/getInitial";
import { Link } from "react-router-dom";
import Status from "../../common/Status";

interface OpenApplicationProps {
  onClose: () => void
  selectedId: string | null
  index: number | null
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

export default function OpenApplication({onClose, selectedId, index}: OpenApplicationProps){
  const [selectedApplication, setSelectedApplication] = useState<IApplication | null>(null);

  // Helper function to generate timeline stages based on application status
  const getTimelineStages = (applicationStatus: string | undefined): timelineStages[] => {
    const stages: timelineStages[] = [
      { id: 1, label: 'Wishlist', status: 'pending' },
      { id: 2, label: 'Applied', status: 'pending' },
      { id: 3, label: 'Assessment', status: 'pending' },
      { id: 4, label: 'Interview', status: 'pending' },
      { id: 5, label: 'Final Interview', status: 'pending' },
      { id: 6, label: 'Offer', status: 'pending' },
      { id: 7, label: 'Accepted', status: 'pending' },
    ]

    // Map application status to timeline positions
    const statusMap: { [key: string]: number } = {
      'Wishlist': 0,
      'Applied': 1,
      'Assessment': 2,
      'Interview': 3,
      'Final Interview': 4,
      'Offer': 5,
      'Accepted': 6,
      'Rejected': 6
    }

    const currentIndex = statusMap[applicationStatus || ''] ?? -1

    // Mark stages as completed, current, or pending
    return stages.map((stage, index) => ({
      ...stage,
      status: index < currentIndex 
        ? 'completed' 
        : index === currentIndex 
        ? 'current' 
        : 'pending',
      description: index === currentIndex ? 'Current stage' : undefined
    }))
  }

  const timelineStages = getTimelineStages(selectedApplication?.status)

  useEffect(() => {
    if (!selectedId) return
    const fetchApplicationById = async (): Promise<void> => {
      try {
        const res = await getApplicationById(selectedId)
        const data = res.data?.data || null
        setSelectedApplication(data)
      } catch (error) {
        toast.error("Failed to fetch application")
        onClose()
        console.log(error)
      }
    }

    fetchApplicationById()
  }, [selectedId, onClose])

  return(
    <main className="overflow-y-auto h-[calc(100vh-100px)] px-10">
      <button onClick={onClose} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors duration-300 dark:text-gray-400">
        <MoveLeft size={14}/>
        Back to Applications
      </button>
      <div className="bg-white p-6 rounded-xl border border-gray-200 mt-4 dark:bg-[#1E293B] dark:border-gray-700">
        <div className="flex gap-3 items-start">
          <div className={`text-white py-3 px-5 rounded-xl text-xl font-bold bg-black ${getAvatarColor(selectedApplication?.companyName ?? "", index ?? 0)}`}>{getInitials(selectedApplication?.companyName ?? "")}</div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold dark:text-white">{selectedApplication?.companyName}</h1>
              <Status status={selectedApplication?.status ?? ""} className="flex w-fit items-center gap-2 rounded-xl px-2.5 py-1"/>
            </div>
            <p className="text-gray-500 text-sm mt-1 mb-3 dark:text-gray-400">{selectedApplication?.jobTitle}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <MapPin size={14}/>
                <span className="text-sm">{selectedApplication?.location}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Briefcase size={14}/>
                <span className="text-sm">{selectedApplication?.jobType}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Globe size={14}/>
                <span className="text-sm">{selectedApplication?.locationType}</span>
              </div>
              <p className="text-gray-500 text-sm">{selectedApplication?.salary}</p>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Calendar size={14}/>
                <span className="text-sm">Applied {formatDateForInput(selectedApplication?.dateApplied ?? "")}</span>
              </div>
            </div>
          </div>
        </div>
        <Link to={selectedApplication?.jobURL ?? ""} className="mt-3 flex items-center gap-2 text-indigo-500 cursor-pointer hover:underline dark:text-indigo-400">
          <ExternalLink size={14}/>
          <span className="text-xs">View Job Posting</span>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <div className="bg-white w-full rounded-xl border border-gray-200 mt-4 p-6 dark:bg-[#1E293B] dark:border-gray-700">
            <h1 className="font-bold mb-6 dark:text-white">Application Timeline</h1>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-5 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
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
                        : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700'
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
                        stage.status === 'pending' ? 'text-gray-300 dark:text-gray-700' : stage.status === "current" ? 'text-indigo-500' : 'text-gray-700 dark:text-white'
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

          <div className="bg-white w-full rounded-xl border border-gray-200 mt-4 p-6 space-y-3 dark:bg-[#1E293B] dark:border-gray-700">
            <h1 className="font-bold dark:text-white">Notes</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedApplication?.notes || "No notes added"}</p>
          </div>
        </div>

        <div>
          <div className="bg-white w-60 rounded-xl border border-gray-200 mt-4 p-6 space-y-4 dark:bg-[#1E293B] dark:border-gray-700">
            <h1 className="font-bold dark:text-white">Application Info</h1>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Platform</p>
              <p className="text-sm text-gray-800 dark:text-white">{selectedApplication?.platform || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Job Type</p>
              <p className="text-sm text-gray-800 dark:text-white">{selectedApplication?.jobType || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Location Type</p>
              <p className="text-sm text-gray-800 dark:text-white">{selectedApplication?.locationType || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Salary</p>
              <p className="text-sm text-gray-800 dark:text-white">{selectedApplication?.salary || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Date Applied</p>
              <p className="text-sm text-gray-800 dark:text-white">{formatDateForInput(selectedApplication?.dateApplied ?? "")}</p>
            </div>
          </div>
          
          <div className="bg-white w-60 rounded-xl border border-gray-200 mt-4 p-6 space-y-4 dark:bg-[#1E293B] dark:border-gray-700">
            <h1 className="font-bold dark:text-white">Quick Actions</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-400">
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