import AnalyticsShowcase from "../components/home/AnalyticsShowcase.jsx";
import FeaturesSection from "../components/home/FeaturesSection.jsx";
import FinalCtaSection from "../components/home/FinalCtaSection";
import Footer from "../components/home/Footer.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import HowItWorksSection from "../components/home/HowItWorksSection.jsx";
import Navbar from "../components/home/Navbar.jsx";
import QrShowcase from "../components/home/QrShowcase.jsx";
import SecuritySection from "../components/home/SecuritySection.jsx";

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
        <SecuritySection />
        <FinalCtaSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
