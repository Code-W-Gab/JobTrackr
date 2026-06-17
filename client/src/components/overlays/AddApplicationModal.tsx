import { X } from "lucide-react"
import { useState } from "react"
import { createApplication } from "../../service/applicationService";

interface AddApplicationModalProps {
  onClose?: () => void
}

export default function AddApplicationModal({onClose}: AddApplicationModalProps){
  const [companyName, setCompanyName] = useState<string>("")
  const [jobTitle, setJobTitle] = useState<string>("")
  const [jobURL, setJobURL] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [dateApplied, setDateApplied] = useState<Date | "">("")
  const [salary, setSalary] = useState<string>("")
  const [platform, setPlatform] = useState<string>("LinkedIn")
  const [jobType, setJobType] = useState<string>("Full-time")
  const [locationType, setLocationType] = useState<string>("On-site")
  const [status, setStatus] = useState<string>("Wishlist")
  const [notes, setNotes] = useState<string>("")
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    createApplication(
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
    )
    .then(res => {
      if(res.data.success){
        alert("Application created successfully!")
      }
    })
    .catch(err => {
      console.error(err)
      alert("Failed to create application. Please try again.")
    })

  }



  return(
    <main className="bg-white w-140 rounded-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="font-semibold">Add New Application</h1>
        <button onClick={onClose} className="hover:bg-indigo-100 hover:text-gray-700 text-gray-500 p-1 rounded-full">
          <X size={18} />
        </button>
      </div>
      <form className="p-4 overflow-y-auto max-h-120" onSubmit={handleSubmit}>
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
              type="date"  
              placeholder="e.g. Junior Software Engineer" 
              className="mt-1.5 block w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="platform" className="block text-xs font-medium text-gray-700">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)} 
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
              onChange={(e) => setJobType(e.target.value)} 
              name="jobType" 
              id="jobType" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label htmlFor="locationType" className="block text-xs font-medium text-gray-700">Location Type</label>
            <select 
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)} 
              name="locationType" 
              id="locationType" 
              className="mt-1.5 w-full border border-gray-200 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label htmlFor="Status" className="block text-xs font-medium text-gray-700">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)} 
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
           