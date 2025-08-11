import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Utility to convert slug to Title Case
const toTitle = (slug: string) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO
}

const BlogCategory = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const title = toTitle(slug);
  const isMarket = slug === "market-analysis";

  // Mock articles per category
  const articles = useMemo<Article[]>(() => {
    const base = title || "Category";
    const now = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 5);
      return {
        id: `${slug}-${i + 1}`,
        title: `${base} Insight ${i + 1}`,
        excerpt:
          "An in-depth exploration covering key takeaways, practical frameworks, and real-world applications.",
        date: d.toISOString(),
      };
    });
  }, [slug, title]);

  // Basic SEO handling
  useEffect(() => {
    const pageTitle = `${title} – Blogs`;
    document.title = pageTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      `${title} blog articles, timelines, and insights. Explore the latest posts in ${title}.`
    );

    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="container mx-auto px-6 pt-24 pb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-accent/15 backdrop-blur-sm border border-white/15"
        >
          Back
        </Button>
        <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-2xl">
          Curated articles and insights under {title}. Browse posts on the left and see the timeline on the right.
        </p>
      </header>

      <main className="container mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles list */}
        <section className="lg:col-span-2 space-y-4">
          {articles.map((post, idx) => (
            <article key={post.id}>
              <Card className="group bg-card shadow-lg border-white/15 hover:border-white/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/5 border-white/15"
                    onClick={() => (isMarket ? navigate(`/${slug}/post${idx + 1}`) : undefined)}
                    disabled={!isMarket}
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read more
                  </Button>
                </CardContent>
              </Card>
            </article>
          ))}
        </section>

        {/* Timeline */}
        <aside className="lg:col-span-1">
          <Card className="bg-card border-white/15">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Chronological view</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-white/15 ml-3">
                {articles.map((post, idx) => (
                  <li key={post.id} className="mb-8 ml-4">
                    <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-primary" aria-hidden />
                    <time className="block text-xs text-muted-foreground mb-1">
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-sm text-foreground font-medium leading-snug">
                      {post.title}
                    </h3>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
};

export default BlogCategory;
