import { Star } from "lucide-react";

export default function Testimonials(){
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Software Engineer at Google",
      quote: "JobTrackr completely transformed my job search. I landed my dream role at Google after just 6 weeks of using it. The kanban board is a game changer.",
      icon: "SC",
      bgColor: "bg-indigo-500"
    },
    {
      name: "Marcus Williams",
      title: "Product Designer at Airbnb",
      quote: "I was applying to 30+ companies and losing track constantly. JobTrackr gave me clarity and I got 3 offers in one month. Absolutely worth it.",
      icon: "MW",
      bgColor: "bg-violet-500"
    },
    {
      name: "Priya Patel",
      title: "Product Designer at Airbnb",
      quote: "The analytics helped me realize which platforms were working. I stopped wasting time on Indeed and doubled down on LinkedIn. Got hired in 3 weeks.",
      icon: "PP",
      bgColor: "bg-green-500"
    }
  ]

  return(
  <main className="py-16 px-30 grid grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="space-y-4 py-4 px-5 rounded-lg bg-white border border-gray-200">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} className="fill-current"/>
            <Star size={12} className="fill-current"/>
            <Star size={12} className="fill-current"/>
            <Star size={12} className="fill-current"/>
            <Star size={12} className="fill-current"/>
          </div>
          <p className="text-xs text-gray-500">"{testimonial.quote}"</p>
          <div className="flex items-center gap-2">
            <div className={`size-8 rounded-full ${testimonial.bgColor} flex items-center justify-center text-white text-xs font-semibold`}>
              {testimonial.icon}
            </div>
            <div>
              <p className="font-semibold text-xs">{testimonial.name}</p>
              <p className="text-[11px] text-gray-500">{testimonial.title}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
}