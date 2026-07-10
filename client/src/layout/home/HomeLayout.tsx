import CTASection from "../../components/ui/home/CTASection";
import FaqSection from "../../components/ui/home/FaqSection";
import FeatureSection from "../../components/ui/home/FeatureSection";
import HeroSection from "../../components/ui/home/HeroSection";
import PricingSection from "../../components/ui/home/PricingSection";
import StatsSection from "../../components/ui/home/StatsSection";
import TestimonialSection from "../../components/ui/home/TestimonialSection";
import Footer from "./Footer";
import Header from "./Header";

export default function HomeLayout() {
  return(
    <main>
      <Header/>
      <div className="min-h-screen bg-gray-100 mt-10">
        <HeroSection/>
        <div className="mt-12 bg-indigo-600">
          <StatsSection/>
        </div>
        <FeatureSection/>
        <TestimonialSection/>
        <PricingSection/>
        <FaqSection/>
        <CTASection/>
      </div>
      <Footer/>
    </main>
  )
}