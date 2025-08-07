import { Button } from "@/components/ui/button";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">P</span>
            </div>
            <span className="font-semibold text-foreground">Portfolio</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('finance')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200"
            >
              Finance
            </button>
            <button 
              onClick={() => scrollToSection('tech')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200"
            >
              Tech
            </button>
            <button 
              onClick={() => scrollToSection('spirituality')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200"
            >
              Spirituality
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full"
          >
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;