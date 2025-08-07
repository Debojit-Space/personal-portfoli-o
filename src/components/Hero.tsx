import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end flex items-center justify-center px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to my
            <br />
            <span className="text-primary">digital space</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Exploring the intersections of finance, technology, and spirituality. 
            Join me on this journey of discovery and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => scrollToSection('about')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg rounded-full"
            >
              Explore My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-full"
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-accent rounded-full transition-colors duration-200 shadow-sm"
            >
              <Twitter className="w-6 h-6 text-foreground" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-accent rounded-full transition-colors duration-200 shadow-sm"
            >
              <Instagram className="w-6 h-6 text-foreground" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-accent rounded-full transition-colors duration-200 shadow-sm"
            >
              <Linkedin className="w-6 h-6 text-foreground" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-accent rounded-full transition-colors duration-200 shadow-sm"
            >
              <Github className="w-6 h-6 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;