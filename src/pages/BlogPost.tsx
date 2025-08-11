import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
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
            setContent(`# ${toTitle(post)}\n\n> Content coming soon. Add a file at ${filePath} to populate this page.`);
        }
      } catch (e) {
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
    const match = content.match(/^#\s+(.+)$/m);
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
        {/* The first heading in markdown will be the H1 for accessibility */}
      </header>

      <main className="container mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <article className="prose prose-invert max-w-none lg:col-span-2">
          {!loaded ? (
            <p className="text-muted-foreground">Loading article…</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </article>

        <aside className="lg:col-span-1">
          <div className="rounded-lg border border-white/15 bg-card p-5">
            <h2 className="text-lg font-semibold mb-2">About this article</h2>
            <p className="text-sm text-muted-foreground">
              This page renders markdown from <code className="font-mono">{filePath}</code>.
              To add or edit content, create or modify that file. Use standard Markdown
              (GFM supported for tables, lists, and task items).
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPost;
