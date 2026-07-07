import { ChevronDown, ChevronUp, Clock, X } from "lucide-react";
import { useState } from "react";
import { useApplications } from "../../hook/useApplication";
import type { JobType, LocationType, Platform, Status } from "../../types/applicationTypes";
import { Video, Phone, MessageSquare, MapPin } from "lucide-react";

interface AddApplicationModalProps {
  onClose: () => void
}

export default function AddApplicationModal({onClose}: AddApplicationModalProps){
  const [companyName, setCompanyName] = useState<string>("")
  const [jobTitle, setJobTitle] = useState<string>("")
  const [jobURL, setJobURL] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [dateApplied, setDateApplied] = useState<string>("")
  const [salary, setSalary] = useState<string>("")
  const [platform, setPlatform] = useState<Platform>("LinkedIn")
  const [jobType, setJobType] = useState<JobType>("Full-Time")
  const [locationType, setLocationType] = useState<LocationType>("On-Site")
  const [status, setStatus] = useState<Status>("Wishlist")
  const [notes, setNotes] = useState<string>("")
  const [interviewTime, setInterviewTime] = useState<string>("Select time")
  const [formatName, setFormatName] = useState<string>("Video Call")
  const [isInterviewTimeOpen, setIsInterviewTimeOpen] = useState<boolean>(false);
  const { handleCreateApplication } = useApplications()

  const formData = {
    companyName,
    jobTitle,
    jobURL,
    location,
    dateApplied,
    salary,
    platform,
    jobType,
    locationType,
    status,
    notes
  }

  const interviewFormat = [
    { name: "Video Call", icon: Video },
    { name: "Phone", icon: Phone },
    { name: "Technical", icon: MessageSquare },
    { name: "On-site", icon: MapPin }
  ]

  const InterviewTime: string[] = ["08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"]

  return(
    <main className="bg-white w-140 rounded-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="font-semibold">Add New Application</h1>
        <button onClick={onClose} className="hover:bg-indigo-100 hover:text-gray-700 text-gray-500 p-1 rounded-full">
          <X size={18} />
        </button>
      </div>
      <form className="p-4 overflow-y-auto max-h-120" onSubmit={(e) => {
        e.preventDefault();
        handleCreateApplication(formData, onClose)
      }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700">Company Name</label>
            <input 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)} 
              type="text"  
              placeholder="e.g. Microsoft" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-xs font-medium text-gray-700">Job Title</label>
            <input 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)} 
              type="text"  
              placeholder="e.g. Junior Software Engineer" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-xs font-medium text-gray-700">Job URL</label>
            <input 
              value={jobURL}
              onChange={(e) => setJobURL(e.target.value)} 
              type="text"  
              placeholder="https://..." 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">Location</label>
            <input 
              value={location}
              onChange={(e) => setLocation(e.target.value)} 
              type="text"  
              placeholder="e.g. San Francisco, CA" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="salary" className="block text-xs font-medium text-gray-700">Salary</label>
            <input 
              value={salary}
              onChange={(e) => setSalary(e.target.value)} 
              type="text"  
              placeholder="e.g. $150,000" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="dateApplied" className="block text-xs font-medium text-gray-700">Date Applied</label>
            <input 
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)} 
              name="dateApplied" 
              id="dateApplied" 
              type="date"  
              placeholder="e.g. Junior Software Engineer" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="platform" className="block text-xs font-medium text-gray-700">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              name="platform" 
              id="platform" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="JobStreet">JobStreet</option>
              <option value="Glassdoor">Glassdoor</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="jobType" className="block text-xs font-medium text-gray-700">Job Type</label>
            <select 
              value={jobType}
              onChange={(e) => setJobType(e.target.value as JobType)} 
              name="jobType" 
              id="jobType" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="locationType" className="block text-xs font-medium text-gray-700">Location Type</label>
            <select 
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as LocationType)} 
              name="locationType" 
              id="locationType" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="On-Site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label htmlFor="Status" className="block text-xs font-medium text-gray-700">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)} 
              name="Status" 
              id="Status" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="Assessment">Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Final Interview">Final Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
        </div>
        
        {(status === "Interview" || status === "Final Interview") && (
          <div className="border border-gray-200 rounded-xl my-4">
            <div className="bg-blue-50 rounded-tl-xl rounded-tr-xl p-3 border-b border-gray-200 text-xs text-gray-500">
              <h1  className="font-semibold text-indigo-700 text-sm">{status} Details</h1>
              <p className="text-indigo-500">Add the date, time, and format for this interview</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-bl-xl rounded-br-xl ">
              <h1 className="text-sm font-semibold">Interview Format</h1>
              <div className="grid grid-cols-4 gap-3 mt-2">
                {interviewFormat.map((format, i) => {
                  return(
                    <div key={i} onClick={() => setFormatName(format.name)} className={`border ${formatName === format.name ? "border-indigo-500 bg-indigo-500 text-white" : "border-gray-300 text-gray-600"}  px-2 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer`}>
                      <format.icon size={14}/>
                      <span className="text-sm">{format.name}</span>
                    </div>
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-4 items-center mt-4">
                <div>
                  <label htmlFor="interviewDate" className="block text-xs font-medium text-gray-700">Interview Date <span className="text-red-600">*</span></label>
                  <input
                    type="date"
                    className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="relative">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Interview Time <span className="text-red-600">*</span></label>
                    <div onClick={() => setIsInterviewTimeOpen(!isInterviewTimeOpen)} className="flex items-center justify-between mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <div className="flex items-center gap-2 ">
                        <Clock size={14}/>
                        <span className="text-xs">{interviewTime}</span>
                      </div>
                      { isInterviewTimeOpen ? <ChevronUp size={16}/> :<ChevronDown size={16}/>}
                    </div>
                    { isInterviewTimeOpen && (
                      <div className="absolute bottom-[-10] bg-white border border-gray-300 mt-1 w-full grid grid-cols-3 gap-4 p-1.5 text-[11px] text-gray-500 text-center rounded-lg h-40 overflow-y-auto">
                        {InterviewTime.map((time, index) => {
                          return(
                            <div key={index} onClick={() => {
                              setInterviewTime(time)
                              setIsInterviewTimeOpen(!isInterviewTimeOpen)
                            }} className="hover:bg-indigo-100 hover:text-indigo-700 rounded-lg p-1 cursor-pointer">
                              <span>{time}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center mt-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Duration</label>
                  <select
                    className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {["15 min", "30 min", "45 min", "1 hour", "1.5 hour", "2 hour", "3 hour"].map((duration, index) => {
                      return(
                        <div key={index}>
                          <option value={duration}>{duration}</option>
                        </div>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Interviewer Name <span className="text-xs text-gray-400">(optional)</span></label>
                  <input
                    type="text"  
                    placeholder="e.g. Alex kim" 
                    className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {formatName === "Video Call" || formatName === "Technical" 
              ? <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700">Meeting Link <span className="text-xs text-gray-400">(optional)</span></label>
                  <div className="flex items-center gap-3 border border-gray-200 bg-gray-100  mt-1.5 px-3 py-1.5 rounded-xl">
                    <Video size={16} className="text-gray-500"/>
                    <input 
                      type="text" 
                      placeholder="https://meet.google.com/.."
                      className="w-full focus:outline-0 text-sm"
                    />
                  </div>
                </div>
              : formatName === "Phone" 
              ? <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700">Phone / Dial-in Number <span className="text-xs text-gray-400">(optional)</span></label>
                  <div className="flex items-center gap-3 border border-gray-200 bg-gray-100  mt-1.5 px-3 py-1.5 rounded-xl">
                    <Phone size={16} className="text-gray-500"/>
                    <input 
                      type="text" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full focus:outline-0 text-sm"
                    />
                  </div>
                </div>
              : <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700">Office Address <span className="text-xs text-gray-400">(optional)</span></label>
                  <div className="flex items-center gap-3 border border-gray-200 bg-gray-100  mt-1.5 px-3 py-1.5 rounded-xl">
                    <MapPin size={16} className="text-gray-500"/>
                    <input 
                      type="text" 
                      placeholder="e.g. 1 Market St, San Francisco, CA."
                      className="w-full focus:outline-0 text-sm"
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        )}
        <div>
          <label htmlFor="Notes" className="block text-xs font-medium text-gray-700">Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)} 
            name="Notes" 
            id="Notes" 
            rows={3} 
            placeholder="Add any additional notes about this application..." 
            className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-end mt-6 gap-4">
          <button onClick={onClose} className="w-full border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">Cancel</button>
          <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">Add Application</button>
        </div>
      </form>
    </main>
  )
}
           