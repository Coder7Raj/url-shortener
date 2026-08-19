import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;
