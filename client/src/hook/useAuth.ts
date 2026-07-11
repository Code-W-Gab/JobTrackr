import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { deleteAccount, login, logout, register, updateMe, updatePass } from "../service/authService"
import type { IUpdatePass, LoginType, RegisterType } from "../types/authTypes"
import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"

type LoginFormError = {
  fullName?: string;
  email? : string;
  password?: string
  confirmPassword?: string
  general?: string
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext()
  const [errors, setErrors] = useState<LoginFormError>({});

  // Handle Login
  const handleLoginSubmit = async (loginData: LoginType): Promise<void> => {
    const nextErrors: LoginFormError = {}

    if (!loginData.email?.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!loginData.password?.trim()) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    try {
      await login(loginData)
      await fetchUser()
      navigate('/dashboard')
      toast.success("Login successfully")
    } catch (err) {
      console.log(err)
      setErrors({ general: "Invalid email or password" })
    }
  }

  // Handle Register
  const handleRegisterSubmit = async (registerData: RegisterType): Promise<void> => {
    const nextErrors: LoginFormError = {}

    if (!registerData.fullName?.trim()) {
      nextErrors.fullName = "Name is required";
    }

    if (!registerData.email?.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!registerData.password?.trim()) {
      nextErrors.password = "Password is required";
    }

    if (!registerData.confirmPassword?.trim()) {
      nextErrors.confirmPassword = "Confirm Password is required";
    }

    if (registerData.password !== registerData.confirmPassword) {
      nextErrors.general = "Password not match"
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return


    try {
      await register(registerData)
      navigate('/auth/login')
      toast.success("Registration successful")
    } catch (err) {
      console.log(err)
      toast.error("Register Failed")
    }
  }

  // Handle Update Me
  const handleUpdateMe = async (fullName: string | undefined): Promise<void> => {
    if(!fullName){
      toast.error("Please fill all fields")
      return
    }

    try {
      await updateMe(fullName)
      fetchUser()
      toast.success("Updated successful")
    } catch (err) {
      console.log(err)
      toast.error("Update Failed")
    }
  }

  // Handle Update Password
  const handleUpdatePass = async (updateData: IUpdatePass) => {
    try {
      if(!updateData.currentPassword || !updateData.newPassword || !updateData.confirmNewPassword){
        toast.error("Please fill all fields")
        return
      }
      const res = await updatePass(updateData)
      fetchUser()
      toast.success(res.data?.message)
    } catch (err) {
      console.log(err)
      toast.error("Update Failed")
    }
  }

  // Handle Logout
  const handleLogout = async (): Promise<void> => {
    try {
      await logout()
      navigate('/home')
      toast.success('Logout successfully')
    } catch (error) {
      console.log(error)
      toast.error('Logout failed')
    }
  }

  // Handle Delete Account
  const handleDeleteAccount = async (): Promise<void> => {
    try {
      const res = await deleteAccount()
      navigate('/home')
      toast.success(res.data?.message)
    } catch (error) {
      console.log(error)
      toast.error('Delete failed')
    }
  }
  

  return { handleLoginSubmit, handleRegisterSubmit, handleUpdateMe, handleUpdatePass, handleDeleteAccount, handleLogout, errors }
}

export const useAuthContext = () => {
  // Handle Get Me
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}