import mongoose from "mongoose";
import { IApplication } from "../types/applicationTypes";

const applicationSchema = new mongoose.Schema<IApplication>({
  companyName: {
    type: String
  },
  jobTitle: {
    type: String
  },
  jobURL: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: String
  },
  dateApplied: {
    type: Date
  },
  platform: {
    type: String,
    enum: ["LinkedIn", "Indeed", "JobStreet", "Glassdoor", "Company Website", "Referral", "Other"]
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"]
  },
  locationType: {
    type: String,
    enum: ["Remote", "Hybrid", "On-Site"]
  },
  status: {
    type: String,
    enum: ["Wishlist", "Applied", "Assessment", "Interview", "Final Interview", "Offer", "Rejected", "Accepted"]
  },
  notes: {
    type: String
  }
})

export default mongoose.model("Application", applicationSchema)