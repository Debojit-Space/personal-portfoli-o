import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Navigation from "@/components/Navigation";
import { slugify } from "@/lib/slug";

interface Project {
  id: string;
  title: string;
  description: string;
  route: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

const Projects = () => {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: "project1",
      title: "Prompt Craft",
      description: "An interactive game designed to teach effective AI prompting techniques, where players craft prompts to generate precise target outputs. ",
      route: "https://promptcraft-1th.pages.dev/",
      githubUrl: "https://github.com/Debojit-Space/PromptCraft",
      technologies: ["cloudfare", "openai", "vite", "wrangler"]
    },
    {
      id: "project2",
      title: "Personal Assistance Chatbot",
      description: "An intuitive chatbot assistant that delivers accurate, context-aware responses based on the content of my website.",
      route: "https:chat.debojitbanik.com",
      githubUrl: "https://github.com/Debojit-Space/PortfolioChatApp",
      technologies: ["cloudfare", "llama", "workers ai", "RAG"]
    },
    {
      id: "project3",
      title: "Screener Query Assistant",
      description: "A smart chatbot assistant that converts everyday natural language questions into accurate Screener queries, empowering users to effortlessly explore and analyze financial data without learning intricate syntax.",
      route: "https://screener-spark.lovable.app/",
      githubUrl: "https://github.com/Debojit-Space/screener-spark",
      technologies: ["n8n", "lovable", "openai", "pinecone", "llama index"]
    }
  ];

  const handleProjectClick = (project: Project) => {
    window.open(project.route, "_blank", "noopener,noreferrer");
  };
  

  /*const handleProjectClick = (project: Project) => {
    navigate(project.route);
  };*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background/80">
      <Navigation />
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-4 hover:bg-accent/15 backdrop-blur-sm border border-white/15"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">My Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Here's a collection of projects I have built.

          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-white/15 hover:border-white/35 bg-white/3 hover:bg-white/8 backdrop-blur-md shadow-lg hover:shadow-white/10"
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader className="backdrop-blur-sm">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-300">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="backdrop-blur-sm">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white/8 text-foreground/90 text-xs rounded-full border border-white/15 backdrop-blur-sm group-hover:bg-white/15 group-hover:border-white/25 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                      className="flex-1 bg-white/8 border-white/20 text-foreground hover:bg-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}

                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, '_blank');
                      }}
                      className="flex-1 bg-white/8 border-white/20 text-foreground hover:bg-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  )}

                  {!project.githubUrl && !project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-white/8 border-white/20 text-foreground/50 backdrop-blur-sm"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
