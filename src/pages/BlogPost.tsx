import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Convert slug to Title Case
const toTitle = (slug: string) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const mdFiles = import.meta.glob("/src/content/**/*.md", { as: "raw" });

const BlogPost = () => {
  const { slug = "", post = "" } = useParams();
  const navigate = useNavigate();

  const filePath = useMemo(() => `/src/content/${slug}/${post}.md`, [slug, post]);
  const [content, setContent] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        if (mdFiles[filePath]) {
          const raw = await (mdFiles[filePath] as () => Promise<string>)();
          if (!cancelled) setContent(raw);
        } else {
          if (!cancelled)
            setContent(
              `# ${toTitle(post)}\n\n> Content coming soon. Add a file at ${filePath} to populate this page.`
            );
        }
      } catch {
        if (!cancelled)
          setContent(`# ${toTitle(post)}\n\nThere was an error loading this article.`);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [filePath, post]);

  // Extract first H1 as title for SEO when available
  const derivedTitle = useMemo(() => {
    const mdString = typeof content === "string" ? content : "";
    const match = mdString.match(/^#\s+(.+)$/m);
    const h1 = match?.[1]?.trim();
    const humanCat = toTitle(slug);
    return h1 ? `${h1} – ${humanCat}` : `${toTitle(post)} – ${humanCat}`;
  }, [content, slug, post]);

  useEffect(() => {
    document.title = derivedTitle;

    const setMeta = (name: string, value: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta(
      "description",
      `${toTitle(post)} article in ${toTitle(slug)}. Read in-depth insights and analysis.`
    );

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, [derivedTitle, slug, post]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="container mx-auto px-6 pt-24 pb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-accent/15 backdrop-blur-sm border border-white/15"
        >
          Back
        </Button>
      </header>

      {/* Single column + centered card */}
      <main className="container mx-auto px-6 pb-16">
        <section className="w-full max-w-3xl mx-auto">
          <Card className="bg-card border-white/15 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">
                {derivedTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!loaded ? (
                <p className="text-muted-foreground">Loading article…</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  // Force proper list styling + keep the nice prose defaults
                  components={{
                    ul: ({node, ...props}) => (
                      <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
                    ),
                    ol: ({node, ...props}) => (
                      <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
                    ),
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  }}
                  className="prose prose-invert max-w-none
                    prose-headings:mb-4
                    prose-p:leading-relaxed
                    prose-a:text-primary hover:prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                    prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg overflow-x-auto
                    prose-table:border prose-table:border-muted prose-th:bg-muted/30 prose-th:p-2 prose-td:p-2"
                >
                  {content}
                </ReactMarkdown>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;
