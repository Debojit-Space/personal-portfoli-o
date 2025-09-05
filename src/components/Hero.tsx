import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { BsSubstack } from 'react-icons/bs';

const Hero = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Video/GIF */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero_bg.mp4" type="video/mp4" />
        {/* If you use a GIF instead, use <img src="/hero-bg.gif" className="absolute ..." /> */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay (for darkening) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/5 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to my digital space
        </h1>
        <p className="mb-6">
          Exploring the intersections of finance, technology, and spirituality.<br />
          Join me on this journey of discovery and growth.
        </p>
        <div className="flex gap-4">
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
        {/* Social links (optional) */}
        <div className="mt-8 flex gap-4">
          <a href="https://github.com/Debojit-Space" aria-label="GitHub"><FaGithub size={28} /></a>
          <a href="https://www.linkedin.com/in/dkbanik/" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
          <a href="https://x.com/dkbanik" aria-label="Twitter"><FaTwitter size={28} /></a>
          <a href="https://instagram.com/dkbanik" aria-label="Instagram"><FaInstagram size={28} /></a>
          <a href="https://debojit.substack.com/" aria-label="Substack"><BsSubstack size={28} /></a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
