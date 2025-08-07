import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import ContentSections from "@/components/ContentSections";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeatureSection />
      <ContentSections />
      <Contact />
    </div>
  );
};

export default Index;