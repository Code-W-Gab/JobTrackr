import Pricing from "./Pricing";

export default function PricingSection() {
  return(
    <main>
      <div className="space-y-3 max-w-4xl mx-auto text-center pb-16 px-4">
        <h2 className="font-semibold text-indigo-500 text-xs uppercase tracking-wider">PRICING</h2>
        <h1 className="text-3xl font-bold">Simple, transparent pricing</h1>
        <div className="max-w-lg mx-auto">
          <p className="text-gray-500 text-sm">Start free, upgrade when you're ready.</p>
        </div>
       </div>
       <Pricing/>
    </main>
  )
}