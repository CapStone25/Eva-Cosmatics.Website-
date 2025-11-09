import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logoIcon from "@/assets/logo-icon.png";
import bagIcon from "@/assets/bag-icon.png";

const Header = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: "SHOP ALL", path: "/best-sellers" },
    { label: "BESTSELLERS", path: "/best-sellers" },
    { label: "COLLECTION", path: "/" },
    { label: "ABOUT US", path: "/" },
    { label: "BLOG", path: "/" },
  ];
  const [cartCount] = useState(3); // Mock cart count
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Eva</span>
              <span className="text-foreground"> Cosmetics</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {/* Login Dialog */}
            <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                  <DialogDescription className="text-center">
                    Sign in to your account or create a new one
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full" size="lg">Sign In</Button>
                    <button className="text-sm text-primary hover:underline w-full text-center">
                      Forgot password?
                    </button>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full" size="lg">Create Account</Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            {/* Cart with Badge */}
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 relative">
              <img src={bagIcon} alt="Shopping Bag" className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
            <img src={logoIcon} alt="Eva Cosmetics" className="h-10 w-10 hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
