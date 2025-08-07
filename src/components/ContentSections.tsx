import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Code, Lightbulb, ExternalLink, FileText } from "lucide-react";

const ContentSections = () => {
  return (
    <div className="space-y-32 py-20">
      {/* Finance Section */}
      <section id="finance" className="px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">Finance & Investing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigating the Indian stock market with data-driven insights and proven investment strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Weekly deep dives into Indian market trends, sector analysis, and stock recommendations.
                </p>
                <Badge variant="secondary">Research</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Investment Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Long-term wealth building strategies tailored for the Indian investment landscape.
                </p>
                <Badge variant="secondary">Strategy</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Personal portfolio updates, lessons learned, and transparent investment journey.
                </p>
                <Badge variant="secondary">Personal</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section id="tech" className="px-6 bg-secondary/30">
        <div className="container mx-auto py-20">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">Technology & Innovation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring the frontiers of AI, GenAI, and cutting-edge computer science
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Science & Space</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Quantum Computing Breakthroughs</h4>
                    <p className="text-muted-foreground">Latest developments in quantum computing and their implications for the future.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Space Technology</h4>
                    <p className="text-muted-foreground">Covering ISRO missions, SpaceX innovations, and the new space economy.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">AI & Computer Science</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Generative AI Projects</h4>
                    <p className="text-muted-foreground mb-4">
                      Hands-on projects exploring LLMs, computer vision, and AI applications.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Code className="w-3 h-3 mr-1" />
                        GitHub
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Resume & Portfolio</h4>
                    <p className="text-muted-foreground mb-4">
                      Detailed technical background, project showcase, and professional experience.
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      View Resume
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spirituality Section */}
      <section id="spirituality" className="px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">Spirituality & Wisdom</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring inner growth, mindfulness, and the timeless wisdom that guides our journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Meditation & Mindfulness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Daily practices, techniques, and insights from meditation retreats and mindfulness journeys.
                </p>
                <Badge variant="secondary">Practice</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Ancient Wisdom</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Exploring timeless teachings from various traditions and their relevance in modern life.
                </p>
                <Badge variant="secondary">Philosophy</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Personal Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Reflections on personal development, consciousness expansion, and life lessons learned.
                </p>
                <Badge variant="secondary">Growth</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Spiritual Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Yoga, breathwork, and other practices that support spiritual development and well-being.
                </p>
                <Badge variant="secondary">Practice</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSections;