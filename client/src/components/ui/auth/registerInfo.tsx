import { Zap, Check } from "lucide-react";
import BackToMenuBtn from "../../common/BackToMenuBtn";

export default function RegisterInfo() {
  const infoItems = [
    "Track application across all platforms",
    "Get smart interview reminders",
    "Visualize your progress with analytics",
    "Land your dream job"
  ];

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
          <h1 className="text-3xl font-bold">Start your journey,</h1>
          <h1 className="text-3xl font-bold">to success today.</h1>
          <p className="text-gray-300 mt-4">Join thousands of job seekers who are organizing their search and landing jobs faster.</p>
        </div>
      </div>

      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-white text-sm">
            <div className="text-white bg-indigo-500 rounded-full flex items-center gap-2 w-max p-1">
              <Check size={12}/>
            </div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </main>
  )
}