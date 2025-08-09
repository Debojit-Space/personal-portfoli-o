import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import ContentSections from "@/components/ContentSections";
import Contact from "@/components/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling to specific section when navigating back from Projects page
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is fully rendered
    }
  }, [location.state]);

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