import api from "../Api/axios.ts"
import type { IApplication, ApiResponse } from "../types/applicationTypes.ts"

export const createApplication = (formData: IApplication) => api.post('/api/application/create', formData);

export const getApplications = () => api.get<ApiResponse<IApplication[]>>('/api/application/getAll')