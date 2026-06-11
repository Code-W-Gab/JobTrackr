import { Zap } from "lucide-react";
import BackToMenuBtn from "../../common/BackToMenuBtn";

export default function LoginInfo() {

  return(
    <main className="bg-indigo-700 p-10 flex flex-col justify-between">
      <div>
        <BackToMenuBtn/>
        <div className="flex items-center gap-2 my-10">
          <div className="text-white bg-indigo-500 rounded-lg p-1.5">
            <Zap size={16}/>
          </div>
          <h1 className="font-bold text-lg text-white">JobTrackr</h1>
        </div>

        <div className="text-white">
          <h1 className="text-3xl font-bold">Your career journey,</h1>
          <h1 className="text-3xl font-bold">organized beautifully.</h1>
          <p className="text-gray-300 mt-4">Track applications, schedule interviews, and land your job - all in one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="text-white p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <h1 className="text-lg font-semibold">5,000+</h1>
          <p className="text-xs text-gray-300">Application Tracked</p>
        </div>
        <div className="text-white p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <h1 className="text-lg font-semibold">1,000+</h1>
          <p className="text-xs text-gray-300">Active users</p>
        </div>
        <div className="text-white p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <h1 className="text-lg font-semibold">95%</h1>
          <p className="text-xs text-gray-300">Satisfaction Rate</p>
        </div>
        <div className="text-white p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <h1 className="text-lg font-semibold">3x</h1>
          <p className="text-xs text-gray-300">Faster Job Search</p>
        </div>
      </div>
    </main>
  )
}