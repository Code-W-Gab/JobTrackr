import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";
import Input from "../../common/Input";
import InputPassword from "../../common/InputPassword";

export default function Login(){
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { handleLoginSubmit } = useAuth();

  const loginData = {
    email,
    password
  };

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
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email address</label>
           <Input type="email" placeholder="example@gmail.com" value={email} setValue={setEmail}/>
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
            <InputPassword passwordType="password" textType="text" placeholder="••••••••" value={password} setValue={setPassword}/>
          </div>
          <div className="flex justify-end">
            <div className="text-xs text-indigo-600 text-right mt-1">
              <Link to="/auth/forgot-password" className="text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</Link >
            </div>
          </div>
          <button onClick={(e) => {
            e.preventDefault();
            handleLoginSubmit(loginData);
          }}
            className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300">
              Sign In
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">Don't have an account? <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</Link ></p>   

      </div>
    </main>
  )
}