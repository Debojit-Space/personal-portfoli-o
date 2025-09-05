import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  path: string;
}

// Convert slug to Title Case
const toTitle = (slug: string) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

// Simple markdown stripper
const stripMarkdown = (text: string) => {
  return text
    .replace(/#{1,6}\s?/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/>/g, '') // Remove blockquotes
    .trim();
};

const mdFiles = import.meta.glob("/src/content/**/*.md", { as: "raw" });

const BlogCategory = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  const title = toTitle(slug);

  useEffect(() => {
    const loadArticles = async () => {
      const prefix = `/src/content/${slug}/`;
      const entries = Object.entries(mdFiles).filter(([path]) => path.startsWith(prefix));
      const results: Article[] = [];

      for (const [path, loader] of entries) {
        const raw = await (loader as () => Promise<string>)();
        const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
        const firstLine = lines[0] || "";
        const matchTitle = firstLine.startsWith("#") ? firstLine.replace(/^#\s*/, "") : firstLine;
        const excerpt = stripMarkdown(lines.slice(1, 3).join(" "));
        
        results.push({
          id: path,
          title: matchTitle || "Untitled",
          excerpt: excerpt || "",
          date: new Date().toISOString(), // Replace with frontmatter date if available
          path
        });
      }

      // Sort newest first
      results.sort((a, b) => b.date.localeCompare(a.date));
      setArticles(results);
      setLoaded(true);
    };

    loadArticles();
  }, [slug]);

  // SEO updates
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

    setMeta("description", `${title} blog articles, timelines, and insights.`);
  }, [title]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation/Header area */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </nav>

      {/* Main container */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Page header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light max-w-4xl mx-auto">
            Exploring insights, analysis, and deep-dives in {title.toLowerCase()}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>{articles.length} {articles.length === 1 ? 'Article' : 'Articles'}</span>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                D
              </div>
              <span>by Debojit</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gray-300 mx-auto"></div>
        </header>

        {/* Articles list */}
        <div className="max-w-4xl mx-auto">
          {!loaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading articles…</span>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600">Articles in the {title.toLowerCase()} category will appear here.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {articles.map((post, index) => {
                const fileName = post.path.split("/").pop()?.replace(/\.md$/, "");
                
                return (
                  <article 
                    key={post.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/${slug}/${fileName}`)}
                  >
                    <div className="border-b border-gray-100 pb-12 hover:border-gray-200 transition-colors">
                      {/* Article meta */}
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <time>
                          {new Date(post.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <span className="text-gray-300">·</span>
                        <span>{Math.ceil(post.excerpt.split(' ').length / 200)} min read</span>
                        {index === 0 && (
                          <>
                            <span className="text-gray-300">·</span>
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                              Latest
                            </span>
                          </>
                        )}
                      </div>

                      {/* Article title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>

                      {/* Article excerpt */}
                      <p className="text-lg leading-relaxed text-gray-600 font-light mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group-hover:gap-3 transition-all">
                          <span>Read full article</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>

                        {/* Article actions */}
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle like
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle share
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Category footer */}
        {articles.length > 0 && (
          <footer className="max-w-4xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Get notified when new {title.toLowerCase()} articles are published
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow font-medium">
                  Subscribe
                </button>
                <button className="text-gray-600 hover:text-gray-900 px-6 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};

export default BlogCategory;
