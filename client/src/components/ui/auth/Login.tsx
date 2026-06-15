import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../service/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login(){
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call login API here
    
    login(email, password)
      .then(res => {
        console.log('Login successful:', res.data);
        navigate('/dashboard')
        toast.success("Login successfully")
      })
      .catch(err => {
        console.log(err)
        toast.error("Login Failed")
      })
  }
  
  return(
    <main className="bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in to your JobTrackr account</p>
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
              placeholder="••••••••" 
              className="mt-1.5 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" className="size-3 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"/>
              Remember me
            </label>
            <div className="text-xs text-indigo-600 text-right mt-1">
              <Link to="/auth/forgot-password" className="text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</Link >
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">Sign In</button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">Don't have an account? <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</Link ></p>   

      </div>
    </main>
  )
}