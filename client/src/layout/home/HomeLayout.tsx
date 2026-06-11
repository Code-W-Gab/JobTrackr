import CTASection from "../../components/ui/CTASection";
import FaqSection from "../../components/ui/FaqSection";
import FeatureSection from "../../components/ui/FeatureSection";
import HeroSection from "../../components/ui/HeroSection";
import PricingSection from "../../components/ui/PricingSection";
import StatsSection from "../../components/ui/StatsSection";
import TestimonialSection from "../../components/ui/TestimonialSection";
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