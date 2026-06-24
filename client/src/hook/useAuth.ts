import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { login, register } from "../service/authService"
import type { LoginType, RegisterType } from "../types/authTypes"

export const useAuth = () => {
  const navigate = useNavigate();

  // Handle Login
  const handleLoginSubmit = async (loginData: LoginType): Promise<void> => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields")
      return
    }

    try {
      await login(loginData)
      navigate('/dashboard')
      toast.success("Login successfully")
    } catch (err) {
      console.log(err)
      toast.error("Login Failed")
    }
  }

  // Handle Register
  const handleRegisterSubmit = async (registerData: RegisterType): Promise<void> => {
    if (!registerData.fullName || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error("Please fill all fields")
      return
    }

    try {
      await register(registerData)
      navigate('/auth/login')
      toast.success("Registration successful")
    } catch (err) {
      console.log(err)
      toast.error("Register Failed")
    }
  }

  return { handleLoginSubmit, handleRegisterSubmit }
}