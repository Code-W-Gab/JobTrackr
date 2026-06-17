import { Zap } from 'lucide-react';

export default function Footer(){
  const prod: string[] = ["Features", "Pricing", "Changelog", "Roadmap"];
  const company: string[] = ["About", "Careers", "Press", "Blog"];
  const legal: string[] = ["Privacy", "Terms", "Security", "Cookies"];

  return(
    <footer className="bg-[#0F172A] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-center gap-12 max-w-6xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5">
              <Zap size={12}/>
            </div>
            <h1 className=" text-xs font-bold">JobTrackr</h1>
          </div>
          <p className="text-gray-500 text-sm w-70">The smarter way to track your job applications and land your dream career.</p>
        </div>
        <div className="grid grid-cols-3 items-start gap-50">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Product</h3>
            <ul className="space-y-1">
              {prod.map((item, index) => (
                <li key={index} className="text-gray-500 text-sm hover:text-indigo-700 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Company</h3>
            <ul className="space-y-1">
              {company.map((item, index) => (
                <li key={index} className="text-gray-500 text-sm hover:text-indigo-700 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Legal</h3>
            <ul className="space-y-1">
              {legal.map((item, index) => (
                <li key={index} className="text-gray-500 text-sm hover:text-indigo-700 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-b bg-gray-300 w-full my-6 max-w-5xl mx-auto"></div>

      <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-gray-500">
        <p>&copy; 2024 JobTrackr. All rights reserved.</p>
        <p>SOC 2 Type II Certified</p>
      </div>
    </footer>
  )
}