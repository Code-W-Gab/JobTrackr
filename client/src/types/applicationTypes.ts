export type Platform = 
  | "LinkedIn" 
  | "Indeed" 
  | "JobStreet" 
  | "Glassdoor"
  | "Company Website"
  | "Referral"
  | "Other"

export type JobType = 
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship"

export type LocationType = 
  | "Remote"
  | "Hybrid"
  | "On-Site"

export type Status = 
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
