type Platform = 
  | "LinkedIn" 
  | "Indeed" 
  | "JobStreet" 
  | "Glassdoor"
  | "Company Website"
  | "Referral"
  | "Other"

type JobType = 
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship"

type LocationType = 
  | "Remote"
  | "Hybrid"
  | "On-Site"

type Status = 
  | "Wishlist" 
  | "Applied" 
  | "Assessment" 
  | "Interview"
  | "Final Interview"
  | "Offer"
  | "Rejected"
  | "Accepted"

export interface IApplication {
  companyName: string,
  jobTitle: string,
  jobURL: string,
  location: string,
  dateApplied: Date,
  salary: string,
  platform: Platform,
  jobType: JobType,
  locationType: LocationType,
  status: Status,
  notes: string
}

export type createApplicationDTO = IApplication

export type updateApplicationDTO = Partial<IApplication>

export interface IdParams {
  id: string
}