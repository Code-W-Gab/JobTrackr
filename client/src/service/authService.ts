import api from "../Api/axios.ts"

export const login = (email: string, password: string) => api.post('api/auth/login', { email, password })
export const register = (fullName: string, email: string, password: string, confirmPassword: string) => api.post('api/auth/register', { fullName, email, password, confirmPassword })