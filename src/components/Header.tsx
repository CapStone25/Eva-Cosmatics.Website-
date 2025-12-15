import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";
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
import robotIcon from "@/assets/robot-icon.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import SearchDialog from "./SearchDialog";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signIn, signUp, signOut } = useAuth();
  const { totalItems } = useCart();
  const { toast } = useToast();
  
  const navItems = [
    { label: "SHOP ALL", path: "/best-sellers" },
    { label: "BESTSELLERS", path: "/best-sellers" },
    { label: "ABOUT US", path: "/about-us" },
    { label: "BLOG", path: "/blog" },
    ...(isAdmin ? [{ label: "DASHBOARD", path: "/dashboard" }] : []),
  ];
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      if (error.message.includes("Invalid login")) {
        toast({ title: "Error", description: "Invalid email or password", variant: "destructive" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Welcome back!", description: "You have signed in successfully" });
      setIsAuthOpen(false);
      resetForm();
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      if (error.message.includes("already registered")) {
        toast({ title: "Account exists", description: "Please login instead", variant: "destructive" });
        setAuthTab("login");
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Welcome!", description: "Account created successfully" });
      setIsAuthOpen(false);
      resetForm();
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "See you soon!" });
    navigate("/");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                <span className="text-primary">Eva</span>
                <span className="text-foreground"> Cosmetics</span>
              </h1>
            </Link>

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

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              
              {user ? (
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary" onClick={() => navigate("/profile")}>
                  <User className="h-5 w-5" />
                </Button>
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                      <User className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">Welcome</DialogTitle>
                      <DialogDescription className="text-center">Sign in or create an account</DialogDescription>
                    </DialogHeader>
                    <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <Button className="w-full" size="lg" onClick={handleSignIn} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
                      </TabsContent>
                      <TabsContent value="signup" className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <Button className="w-full" size="lg" onClick={handleSignUp} disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}

              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">{totalItems}</Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                <img src={robotIcon} alt="Robot Assistant" className="h-6 w-6" />
              </Button>
              <img src={logoIcon} alt="Eva Cosmetics" className="h-10 w-10 hidden md:block" />
            </div>
          </div>
        </div>
      </header>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default Header;
