import api from "../Api/axios.ts"
import type { IApplication, ApiResponse } from "../types/applicationTypes.ts"

export const createApplication = (
  companyName: string,
  jobTitle: string,
  jobURL: string,
  location: string,
  dateApplied: Date | "",
  salary: string,
  platform: string,
  jobType: string,
  locationType: string,
  status: string,
  notes: string
) => api.post<ApiResponse<IApplication>>('api/application/create', {
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
});

export const getApplications = () => api.get<ApiResponse<IApplication[]>>('api/application/all')