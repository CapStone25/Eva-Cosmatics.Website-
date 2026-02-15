import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

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
  ];

  const pages = [1, 2, 7];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("ourBlog")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("ourBlogDesc")}</p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <article key={post.id} className={`bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mb-6 line-clamp-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"># {tag}</Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground">{t("readMore")}</Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" className="text-primary hover:text-primary/80">{t("showMore")}</Button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors" />
          {pages.map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${currentPage === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>
              {page}
            </button>
          ))}
          <button className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
