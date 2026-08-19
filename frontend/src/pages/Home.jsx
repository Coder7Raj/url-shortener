import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";
import AnalyticsShowcase from "../components/home/AnalyticsShowcase.jsx";
import HowItWorksSection from "../components/home/HowItWorksSection.jsx";
import QrShowcase from "../components/home/QrShowcase";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AnalyticsShowcase />
        <QrShowcase />
      </main>
    </div>
  );
};

export default Home;
