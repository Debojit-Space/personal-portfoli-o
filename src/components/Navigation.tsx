import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isOnHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (!isOnHomePage) {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };
  const handleProjectsClick = () => {
    navigate('/projects');
    setIsMobileMenuOpen(false);
  };

  const handleConnectClick = () => {
    scrollToSection('contact');
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl border-b border-white/15 shadow-lg shadow-black/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-primary/25 cursor-pointer hover:bg-primary/90 transition-colors duration-200"
              onClick={handleHomeClick}
            >
              <span className="text-primary-foreground text-sm font-bold">D</span>
            </div>
            <span
              className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
              onClick={handleHomeClick}
            >
              Debojit
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 hover:bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 hover:bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              Tech
            </button>
            <button
              onClick={() => scrollToSection('finance')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 hover:bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              Finance
            </button>

            <button
              onClick={() => scrollToSection('spirituality')}
              className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 hover:bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              Spirituality
            </button>

            <Button
              onClick={handleProjectsClick}
              variant="outline"
              className="text-nav-text hover:text-nav-text-hover border-white/25 hover:border-white/40 bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all duration-300 shadow-lg"
            >
              View My Projects
            </Button>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-white/15 backdrop-blur-sm border border-white/15"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleConnectClick}
              className="bg-primary/80 text-primary-foreground hover:bg-primary/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg shadow-primary/25 transition-all duration-300"
            >
              Connect
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/15 bg-background/60 backdrop-blur-xl rounded-lg">
            <div className="flex flex-col space-y-4 pt-4 px-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 text-left py-2 px-3 rounded-lg hover:bg-white/15 backdrop-blur-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('tech')}
                className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 text-left py-2 px-3 rounded-lg hover:bg-white/15 backdrop-blur-sm"
              >
                Tech
              </button>
              <button
                onClick={() => scrollToSection('finance')}
                className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 text-left py-2 px-3 rounded-lg hover:bg-white/15 backdrop-blur-sm"
              >
                Finance
              </button>
              <button
                onClick={() => scrollToSection('spirituality')}
                className="text-nav-text hover:text-nav-text-hover transition-colors duration-200 text-left py-2 px-3 rounded-lg hover:bg-white/15 backdrop-blur-sm"
              >
                Spirituality
              </button>
              {!isOnProjectsPage && (
                <Button
                  onClick={handleProjectsClick}
                  variant="outline"
                  className="text-nav-text hover:text-nav-text-hover border-white/25 hover:border-white/40 bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all duration-300 w-full justify-start"
                >
                  View My Projects
                </Button>
              )}
              <Button
                onClick={handleConnectClick}
                className="bg-primary/80 text-primary-foreground hover:bg-primary/90 backdrop-blur-sm px-6 py-2 rounded-full w-full shadow-lg shadow-primary/25 transition-all duration-300"
              >
                Connect
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;