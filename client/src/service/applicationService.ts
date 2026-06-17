import api from "../Api/axios.ts"
import type { IApplication, ApiResponse } from "../types/applicationTypes.ts"

export const createApplication = (formData: IApplication) => api.post<ApiResponse<IApplication>>('api/application/create', formData);

export const getApplications = () => api.get<ApiResponse<IApplication[]>>('api/application/all')