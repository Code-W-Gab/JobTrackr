import api from "../Api/axios.ts"
import type { IRegister, ILogin } from "../types/authTypes.ts";

export const login = (loginData: ILogin) => api.post('api/auth/login', loginData)
export const register = (registerData: IRegister) => api.post('api/auth/register', registerData)