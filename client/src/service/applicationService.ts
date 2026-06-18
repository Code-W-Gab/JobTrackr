import api from "../Api/axios.ts"
import type { IApplication, createApplicationDTO, updateApplicationDTO, ApiResponse } from "../types/applicationTypes.ts"

export const createApplication = (
  formData: createApplicationDTO
) => api.post('/api/application/create', formData);

export const getApplications = (
) => api.get<ApiResponse<IApplication[]>>('/api/application/getAll')

export const getApplicationById = (
  id: string
) => api.get<ApiResponse<IApplication>>(`/api/application/${id}`)

export const updateApplication = (
  id: string, formData: updateApplicationDTO
) => api.put(`/api/application/${id}`, formData)