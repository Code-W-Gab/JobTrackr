import api from "../Api/axios.ts"
import type { LoginType, RegisterType } from "../types/authTypes.ts";

export const login = (
  loginData: LoginType
) => api.post('/api/auth/login', loginData)

export const register = (
  registerData: RegisterType
) => api.post('/api/auth/register', registerData)

export const getMe = (
) => api.get('/api/auth/me')

export const updateMe = (
  fullName: string
) => api.put('/api/auth/me/update', {fullName})

export const logout = (
) => api.post('/api/auth/logout')