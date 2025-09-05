import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const [content, setContent] = useState("");
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
    return h1 || toTitle(post);
  }, [content, post]);

  // Extract subtitle/description from content
  const subtitle = useMemo(() => {
    const mdString = typeof content === "string" ? content : "";
    const lines = mdString.split('\n');
    const titleIndex = lines.findIndex(line => line.startsWith('# '));
    if (titleIndex >= 0 && titleIndex < lines.length - 1) {
      const nextLines = lines.slice(titleIndex + 1, titleIndex + 4);
      const subtitle = nextLines.find(line => line.trim() && !line.startsWith('#') && !line.startsWith('>'));
      return subtitle?.trim();
    }
    return "Empowering Intelligent Stock Screening Using AI-Powered Vector Search and Retrieval-Augmented Generation";
  }, [content]);

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

    setMeta("description", subtitle || `${toTitle(post)} article in ${toTitle(slug)}. Read in-depth insights and analysis.`);

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, [derivedTitle, slug, post, subtitle]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation/Header area */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Main article container */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Article header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif">
            {derivedTitle}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Author info */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                D
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Debojit</div>
                <div className="text-gray-500">{toTitle(slug)}</div>
              </div>
            </div>
            <span className="text-gray-300">·</span>
            <time className="text-gray-500">Aug 22, 2025</time>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gray-300 mx-auto"></div>
        </header>

        {/* Article content - ENHANCED */}
        <article className="max-w-4xl mx-auto">
          {!loaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading article…</span>
            </div>
          ) : (
            <div className="article-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Skip first H1 since it's in header
                  h1: ({ children, ...props }) => {
                    const isFirstH1 = content.indexOf(`# ${children}`) === content.indexOf('#');
                    if (isFirstH1) return null;
                    return (
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif leading-tight mt-16 mb-8 border-b border-gray-200 pb-4">
                        {children}
                      </h1>
                    );
                  },

                  // Enhanced H2 styling
                  h2: ({ children, ...props }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif leading-tight mt-14 mb-6 relative">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {children}
                      </span>
                    </h2>
                  ),

                  // Enhanced H3 styling
                  h3: ({ children, ...props }) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 font-serif leading-tight mt-12 mb-5">
                      {children}
                    </h3>
                  ),

                  // Enhanced paragraph styling
                  p: ({ children, ...props }) => (
                    <p className="text-lg leading-8 text-gray-700 mb-8 font-light tracking-wide">
                      {children}
                    </p>
                  ),

                  // Enhanced links
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      className="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors"
                      {...props}
                    >
                      {children}
                    </a>
                  ),

                  // Enhanced strong text
                  strong: ({ children, ...props }) => (
                    <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 py-0.5 rounded">
                      {children}
                    </strong>
                  ),

                  // Enhanced emphasis
                  em: ({ children, ...props }) => (
                    <em className="italic text-gray-600 font-medium">
                      {children}
                    </em>
                  ),

                  // Beautiful blockquotes
                  blockquote: ({ children, ...props }) => (
                    <div className="my-10 relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                      <blockquote className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-r-xl pl-8 pr-6 py-6 text-lg italic text-gray-700 leading-8 font-light">
                        <div className="relative">
                          <svg className="absolute -top-2 -left-2 w-8 h-8 text-blue-400 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                          {children}
                        </div>
                      </blockquote>
                    </div>
                  ),

                  // Enhanced code inline
                  code: ({ children, className, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono text-base border border-gray-200 font-medium">
                          {children}
                        </code>
                      );
                    }
                    return <code className={className} {...props}>{children}</code>;
                  },

                  // Enhanced code blocks
                  pre: ({ children, ...props }) => (
                    <div className="my-8 relative group">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded">
                          Copy
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-800 shadow-lg">
                        {children}
                      </pre>
                    </div>
                  ),

                  // Enhanced unordered lists
                  // Enhanced unordered lists
                  ul: ({ children, ...props }) => (
                    <ul className="my-6 space-y-2 pl-0">
                      {children}
                    </ul>
                  ),


                  // Enhanced ordered lists
                  ol: ({ children, ...props }) => (
                    <ol className="my-8 space-y-4 pl-0 counter-reset-[list-counter]">
                      {children}
                    </ol>
                  ),

                  // Enhanced list items
                  // Replace the existing li component with this simpler version:

                  li: ({ children, ...props }) => (
                    <li className="flex items-start gap-3 text-lg leading-8 text-gray-700 relative mb-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-3"></div>
                      <div className="flex-1 font-light">
                        {children}
                      </div>
                    </li>
                  ),


                  // Enhanced tables
                  table: ({ children, ...props }) => (
                    <div className="my-10 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                      <table className="w-full border-collapse">
                        {children}
                      </table>
                    </div>
                  ),

                  thead: ({ children, ...props }) => (
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      {children}
                    </thead>
                  ),

                  th: ({ children, ...props }) => (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {children}
                    </th>
                  ),

                  td: ({ children, ...props }) => (
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-100 leading-relaxed">
                      {children}
                    </td>
                  ),

                  // Enhanced horizontal rule
                  hr: ({ ...props }) => (
                    <div className="my-16 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  ),

                  // Enhanced images
                  img: ({ src, alt, ...props }) => (
                    <div className="my-12 text-center">
                      <img
                        src={src}
                        alt={alt}
                        className="mx-auto rounded-xl shadow-2xl max-w-full h-auto border border-gray-200"
                        {...props}
                      />
                      {alt && (
                        <p className="text-sm text-gray-500 mt-4 italic font-light">
                          {alt}
                        </p>
                      )}
                    </div>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </article>

        {/* Article footer */}
        <footer className="max-w-4xl mx-auto mt-20 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {toTitle(slug)}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BlogPost;
