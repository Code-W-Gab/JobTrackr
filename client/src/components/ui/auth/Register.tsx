import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../../../service/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields")
      return
    }
    
    register(fullName, email, password, confirmPassword)
      .then(res => {
        navigate('/auth/login')
        toast.success("Registration successful")
      }).catch(err => console.log(err))
   }

  return(
    <main className="bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-600 mt-1">Start tracking smarter, for free</p>
        </div>
        <div className="flex items-center justify-center text-sm font-semibold text-gray-600 mt-6 cursor-pointer border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="Google Logo" className="size-5 mr-2"/>
          <span>Continue with Google</span>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 text-xs">Or continue with email</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Juan Dela Cruz" 
              className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="example@gmail.com" 
              className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Create a strong password" 
              className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">Create Account</button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">Already have an account? <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign In</Link ></p>   

      </div>
    </main>
  )
}