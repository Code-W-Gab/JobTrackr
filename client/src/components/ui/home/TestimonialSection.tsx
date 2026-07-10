import Testimonials from "./Testimonials";

export default function TestimonialSection() {
  return(
    <main className="py-16 px-4 ">
      <div className="space-y-3 text-center max-w-4xl mx-auto ">
        <h2 className="font-semibold text-indigo-500 text-xs uppercase tracking-wider">TESTIMONIALS</h2>
        <h1 className="text-3xl font-bold">Loved by job seekers everywhere</h1>
      </div>
      <Testimonials/>
    </main>
  )
}