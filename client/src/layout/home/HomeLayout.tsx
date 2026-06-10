import Feature from "../../components/ui/Feature";
import FeatureSection from "../../components/ui/FeatureSection";
import HeroSection from "../../components/ui/HeroSection";
import StatsSection from "../../components/ui/StatsSection";
import Header from "./Header";

export default function HomeLayout() {
  return(
    <main>
      <Header/>
      <div className="min-h-screen bg-gray-100 mt-10">
        <HeroSection/>
        <div className="mt-12 bg-violet-600">
          <StatsSection/>
        </div>
        <FeatureSection/>
        <Feature/>
      </div>
    </main>
  )
}