import Feature from "./Feature";

export default function FeatureSection() {
  return(
    <main>
      <div className="space-y-3 max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="font-semibold text-indigo-500 text-xs uppercase tracking-wider">FEATURES</h2>
        <h1 className="text-3xl font-bold">Everything you need to land the job</h1>
        <div className="max-w-lg mx-auto">
          <p className="text-gray-500 text-sm">A complete toolkit for modern job seekers. Powerful, intuitive, and designed to help you succeed.</p>
        </div>
      </div>
      <Feature/>
    </main>
  )
}