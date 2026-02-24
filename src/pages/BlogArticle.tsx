import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: 1, date: "January 15, 2024", title: t("blogPageTitle1"), excerpt: t("blogPageExcerpt1"),
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop",
      tags: ["Tips", "Anti-aging", "Ingredients", "Organic", "Cruelty-free"],
      content: [
        t("blogPageExcerpt1"),
        "Coconut oil has been used for centuries in tropical regions as a natural moisturizer and skin protector. Its unique fatty acid composition makes it an excellent emollient that can penetrate the skin deeply, providing long-lasting hydration.",
        "The key benefits of coconut oil for skincare include its antibacterial properties, its ability to strengthen the skin barrier, and its rich content of vitamin E and lauric acid. These components work together to nourish, protect, and repair the skin.",
        "When choosing coconut oil for your skincare routine, always opt for cold-pressed, virgin coconut oil. This ensures that the oil retains all of its beneficial nutrients and hasn't been processed with chemicals that could irritate sensitive skin.",
        "To incorporate coconut oil into your routine, try using it as a nighttime moisturizer, a makeup remover, or a body oil after showering. Start with a small amount and adjust based on your skin's needs.",
      ],
    },
    {
      id: 2, date: "February 10, 2024", title: t("blogPageTitle2"), excerpt: t("blogPageExcerpt2"),
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
      tags: ["Favorites", "Eco-Friendly", "Compliment"],
      content: [
        t("blogPageExcerpt2"),
        "This year has been incredible for skincare innovation. From advanced serums to sustainable packaging, the beauty industry has truly evolved. Here are our top picks that stood out.",
        "Our Lotus Glow Serum became the most-loved product of the year, with thousands of five-star reviews praising its ability to transform dull skin into a radiant, glowing complexion.",
        "The Cherry Blossom Hydrating Cream also earned a spot on our best-of list, thanks to its lightweight formula that delivers intense moisture without feeling heavy or greasy.",
        "Looking ahead, we're excited to continue pushing boundaries with new formulations that combine cutting-edge science with the power of nature.",
      ],
    },
    {
      id: 3, date: "March 5, 2024", title: t("blogPageTitle3"), excerpt: t("blogPageExcerpt3"),
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
      tags: ["Tips", "Eco-Friendly", "Essentials"],
      content: [
        t("blogPageExcerpt3"),
        "Habit #1: Sleeping with makeup on. We've all been there, but leaving makeup on overnight clogs pores and accelerates aging. Always cleanse before bed, no matter how tired you are.",
        "Habit #2: Over-exfoliating. While exfoliation is important, doing it too often strips your skin of its natural oils and damages the protective barrier. Limit exfoliation to 2-3 times per week.",
        "Habit #3: Skipping sunscreen. UV damage is the number one cause of premature aging. Apply SPF 30 or higher every day, even on cloudy days and when staying indoors near windows.",
        "Habit #4: Using hot water on your face. Hot water strips natural oils and can cause redness and irritation. Always wash your face with lukewarm water for the best results.",
      ],
    },
    {
      id: 4, date: "March 20, 2024", title: t("blogPageTitle4"), excerpt: t("blogPageExcerpt4"),
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
      tags: ["Tips", "Ingredients", "Compliment", "Anti-aging"],
      content: [
        t("blogPageExcerpt4"),
        "Getting back to a consistent skincare routine can feel overwhelming, especially after a period of neglect. The key is to start simple and gradually build up your routine.",
        "Step 1: Begin with the basics — a gentle cleanser, a moisturizer, and sunscreen. These three products form the foundation of any good skincare routine.",
        "Step 2: Once your skin adjusts, introduce active ingredients one at a time. Start with a vitamin C serum in the morning for antioxidant protection.",
        "Step 3: Add a retinol product at night to boost cell turnover and address signs of aging. Start with a low concentration and increase gradually.",
      ],
    },
    {
      id: 5, date: "April 8, 2024", title: t("blogPageTitle1"), excerpt: t("blogPageExcerpt1"),
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop",
      tags: ["Organic", "Essentials", "Tips"],
      content: [
        t("blogPageExcerpt1"),
        "In this deep dive, we explore the science behind coconut-derived ingredients and their remarkable effects on different skin types.",
        "For oily skin, coconut-based cleansers can help dissolve excess sebum without stripping the skin. The lauric acid in coconut oil has natural antibacterial properties that help prevent breakouts.",
        "For dry skin, coconut butter and oil provide intense nourishment. Apply a thin layer before bed and wake up to softer, more supple skin.",
        "Remember, patch testing is always recommended when introducing any new product to your routine, even natural ones like coconut oil.",
      ],
    },
    {
      id: 6, date: "May 2, 2024", title: t("blogPageTitle3"), excerpt: t("blogPageExcerpt3"),
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop",
      tags: ["Anti-aging", "Favorites", "Cruelty-free"],
      content: [
        t("blogPageExcerpt3"),
        "Habit #5: Not drinking enough water. Hydration starts from within. Aim for at least 8 glasses of water daily to keep your skin plump and glowing.",
        "Habit #6: Touching your face frequently. Your hands carry bacteria and oils that can transfer to your face, leading to breakouts and irritation.",
        "Habit #7: Ignoring your neck and décolletage. These areas show signs of aging just as quickly as your face. Extend your skincare routine below the jawline.",
        "Breaking these habits takes time and consistency, but the results are worth it. Your future self will thank you for the effort you put in today.",
      ],
    },
  ];

  const id = parseInt(articleId || "1");
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Button onClick={() => navigate("/blog")}>{t("backToProducts")}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-6 gap-2">
          <ChevronLeft className="h-4 w-4" />
          {t("onTheBlog")}
        </Button>

        <article className="animate-fade-in">
          <div className="relative h-48 md:h-96 rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-primary/30 text-primary">
                # {tag}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">{post.title}</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <h3 className="text-xl font-bold text-foreground mb-4">{t("onTheBlog")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/blog/${related.id}`)}
                    className="flex gap-4 bg-card rounded-xl p-4 shadow-card hover:shadow-hover cursor-pointer transition-all"
                  >
                    <img src={related.image} alt={related.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{related.title}</h4>
                      <p className="text-xs text-muted-foreground">{related.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
