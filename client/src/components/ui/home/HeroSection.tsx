import { Zap, MoveRight } from "lucide-react";
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return(
    <main className="max-w-4xl mx-auto py-16 px-4 text-center">
      <div className="flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-full w-max mx-auto px-4 py-1">
        <Zap size={12} className="text-indigo-500"/>
        <p className="text-xs text-indigo-500">Trusted by 1000+  active job seekers</p>
      </div>
      <div className="mt-6 space-y-2">
        <h1 className="text-6xl font-bold">Track Every Job Applications.</h1>
        <h1 className="text-6xl font-bold text-indigo-600">Land Your Dream Career.</h1>
        <h1 className="text-6xl font-bold">Faster.</h1>
      </div>
      <div className="mt-6 space-y-6 max-w-xl mx-auto">
        <p className="text-gray-500 text-lg">Organize applications, monitor interview progress, set reminders, and never lose track of opportunities again.</p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-6">
        <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 border border-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition-colors duration-300">
          <span className="text-sm font-bold">Start Tracking Free</span>
          <MoveRight size={16} />
        </Link>
        <Link to="/auth/login" className="border border-gray-300 rounded-xl px-6 py-3 text-gray-700 hover:border-gray-500 transition-colors duration-300">
          <span className="text-sm font-bold">View Demo</span>
        </Link>
      </div>
    </main>
  )
}