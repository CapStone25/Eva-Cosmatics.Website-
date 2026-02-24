import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const POSTS_PER_PAGE = 3;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1, date: "January 15, 2024", title: t("blogPageTitle1"), excerpt: t("blogPageExcerpt1"),
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop",
      tags: ["Tips", "Anti-aging", "Ingredients", "Organic", "Cruelty-free"], featured: false,
    },
    {
      id: 2, date: "February 10, 2024", title: t("blogPageTitle2"), excerpt: t("blogPageExcerpt2"),
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
      tags: ["Favorites", "Eco-Friendly", "Compliment"], featured: true,
    },
    {
      id: 3, date: "March 5, 2024", title: t("blogPageTitle3"), excerpt: t("blogPageExcerpt3"),
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
      tags: ["Tips", "Eco-Friendly", "Essentials"], featured: false,
    },
    {
      id: 4, date: "March 20, 2024", title: t("blogPageTitle4"), excerpt: t("blogPageExcerpt4"),
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
      tags: ["Tips", "Ingredients", "Compliment", "Anti-aging"], featured: false,
    },
    {
      id: 5, date: "April 8, 2024", title: t("blogPageTitle1"), excerpt: t("blogPageExcerpt1"),
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop",
      tags: ["Organic", "Essentials", "Tips"], featured: false,
    },
    {
      id: 6, date: "May 2, 2024", title: t("blogPageTitle3"), excerpt: t("blogPageExcerpt3"),
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop",
      tags: ["Anti-aging", "Favorites", "Cruelty-free"], featured: false,
    },
  ];

  // All unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // Filter by active tag
  const filteredPosts = useMemo(() => {
    if (!activeTag) return blogPosts;
    return blogPosts.filter((p) => p.tags.includes(activeTag));
  }, [activeTag, blogPosts]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t("ourBlog")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("ourBlogDesc")}</p>
        </div>

        {/* Tag filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Badge
            variant={activeTag === null ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-1.5 transition-all"
            onClick={() => { setActiveTag(null); setCurrentPage(1); }}
          >
            {t("all")}
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer text-sm px-4 py-1.5 border-primary/30 hover:bg-primary/10 transition-all"
              onClick={() => handleTagClick(tag)}
            >
              # {tag}
            </Badge>
          ))}
        </div>

        {paginatedPosts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16 text-lg">{t("noProductsFound")}</p>
        ) : (
          <div className="space-y-8">
            {paginatedPosts.map((post, index) => (
              <article key={post.id} onClick={() => navigate(`/blog/${post.id}`)} className={`bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in cursor-pointer ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:w-3/5 p-4 md:p-8 flex flex-col justify-center">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">{post.date}</p>
                  <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground mb-6 line-clamp-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={activeTag === tag ? "default" : "outline"}
                        className="text-xs border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}
                      >
                        # {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post.id}`); }}>{t("readMore")}</Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Functional pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${currentPage === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
            >
              ›
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
