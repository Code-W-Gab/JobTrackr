export default function StatsSection() {
  return(
    <main className="max-w-4xl mx-auto py-14 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-3xl font-bold text-center text-white">5,000+</h2>
        <p className="text-gray-300 text-center text-xs mt-1">Applications Tracked</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center text-white">1, 000+</h2>
        <p className="text-gray-300 text-center text-xs mt-1">Active Users</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center text-white">95%</h2>
        <p className="text-gray-300 text-center text-xs mt-1">User Satisfaction</p>
      </div>
    </main>
  )
}