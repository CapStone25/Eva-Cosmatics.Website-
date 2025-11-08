import { Button } from "@/components/ui/button";
import skinQuizImage from "@/assets/skin-quiz.jpg";

const BlogSection = () => {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop",
      title: "Cracking the Coconut Code",
      description: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams.",
    },
    {
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
      title: "Bloom Beauty Best of 2023",
      description: "Bloom Beauty Best of 2023 products winners are here.",
      featured: true,
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
      title: "7 Skincare Habits to Break Now",
      description: "Great skincare is a long game—it doesn't happen overnight, but little steps are made nightly to get and keep your skin at its...",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-foreground/30"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              ON THE BLOG
            </h2>
            <div className="h-px w-12 bg-foreground/30"></div>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            See All
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                <Button 
                  variant={post.featured ? "default" : "outline"} 
                  className="w-full"
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Skin Quiz Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-3xl p-8 md:p-12 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative h-64 md:h-80">
            <img
              src={skinQuizImage}
              alt="Skin Quiz"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Skin Quiz
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Meet the quiz that will curate a routine just as unique as you are.
            </p>
            <Button size="lg" className="px-12">
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
