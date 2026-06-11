import { CircleCheckBig } from 'lucide-react';

export default function Pricing(){
  return(
    <main className="pb-16 px-50 grid grid-cols-3 items-start gap-6">
      <div className="space-y-3 py-4 px-5 rounded-xl bg-white border border-gray-200">
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-500">Starter</p>
          <h2 className="text-3xl font-bold">Free</h2>
          <p className="text-gray-500 text-xs">Perfect for getting started</p>
        </div>
        <ul className="space-y-2 mt-5">
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Track up to 5 applications</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Kanban board</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Calendar view</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Basic analytics</span>
          </li>
        </ul>
        <button className="mt-4 w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition-colors duration-300">Get Started</button>
      </div>

      <div className="space-y-3 py-4 px-5 rounded-xl bg-indigo-600 border border-indigo-200">
        <p className="text-[11px] font-medium text-gray-300">MOST POPULAR</p>
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-300">Pro</p>
          <h2 className="text-3xl font-bold text-white">$12<span className="text-lg text-gray-200">/mo</span></h2>
          <p className="text-gray-300 text-xs">For serious job seekers</p>
        </div>
        <ul className="space-y-2 mt-5">
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-200'/>
            <span className="text-xs text-gray-300">Unlimited applications</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-200'/>
            <span className="text-xs text-gray-300">Email reminders</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-200'/>
            <span className="text-xs text-gray-300">Advanced analytics</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-200'/>
            <span className="text-xs text-gray-300">CSV import/export</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-200'/>
            <span className="text-xs text-gray-300">Priority support</span>
          </li>
        </ul>
        <button className="mt-4 w-full bg-white text-indigo-600 text-sm font-semibold py-2 rounded-xl hover:bg-indigo-100 transition-colors duration-300">Start Pro Trial</button>
      </div>

      <div className="space-y-3 py-4 px-5 rounded-xl bg-white border border-gray-200">
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-500">Team</p>
          <h2 className="text-3xl font-bold">$29<span className="text-lg">/mo</span></h2>
          <p className="text-gray-500 text-xs">For career coaches & teams</p>
        </div>
        <ul className="space-y-2 mt-5">
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Everything in Pro</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">UP to 5 users</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Shared boards</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Team analytics</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={15} className='text-indigo-500'/>
            <span className="text-xs text-gray-600">Dedicated support</span>
          </li>
        </ul>
        <button className="mt-4 w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition-colors duration-300">Contact Sales</button>
      </div>

    </main>
  )
}