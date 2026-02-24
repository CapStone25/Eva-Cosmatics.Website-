import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Package, Settings, LogOut, Camera, Lock, Bell } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

interface Order {
  id: string;
  status: string;
  total: number;
  created_at: string;
}

const Profile = () => {
  const { user, signOut, loading, isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    avatar_url: null,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem("emailNotifications");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user?.id)
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        email: data.email || user?.email || "",
        phone: data.phone || "",
        address: data.address || "",
        avatar_url: data.avatar_url || null,
      });
    }
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) setOrders(data);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingAvatar(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: t("error"), description: uploadError.message, variant: "destructive" });
      setUploadingAvatar(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("user_id", user.id);

    setProfile((prev) => ({ ...prev, avatar_url: avatarUrl }));
    toast({ title: t("success"), description: t("profileUpdated") });
    setUploadingAvatar(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
      })
      .eq("user_id", user?.id);

    if (error) {
      toast({ title: t("error"), description: t("failedUpdate"), variant: "destructive" });
    } else {
      toast({ title: t("success"), description: t("profileUpdated") });
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: t("error"), description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: t("error"), description: "Passwords do not match", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: t("error"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("success"), description: "Password updated successfully" });
      setPasswordDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    }
    setChangingPassword(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const firstName = profile.full_name?.split(" ")[0] || "";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative group">
                <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-primary">
                  <AvatarImage src={profile.avatar_url || undefined} alt={firstName} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-base md:text-lg">
                    {firstName.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploadingAvatar}
                >
                  <Camera className="h-5 w-5 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{t("myProfile")}</h1>
                <p className="text-sm md:text-base text-muted-foreground">{isAdmin ? t("admin") : t("member")}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2 w-full sm:w-auto">
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </Button>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="profile" className="gap-1 md:gap-2 text-xs md:text-sm">
                <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {t("profile")}
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-1 md:gap-2 text-xs md:text-sm">
                <Package className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {t("orders")}
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1 md:gap-2 text-xs md:text-sm">
                <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {t("settings")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-6">{t("personalInfo")}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("fullName")}</Label>
                    <Input id="fullName" value={profile.full_name || ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input id="email" value={profile.email || ""} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input id="phone" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">{t("address")}</Label>
                    <Input id="address" value={profile.address || ""} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="mt-6" disabled={saving}>
                  {saving ? t("saving") : t("saveChanges")}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-6">{t("orderHistory")}</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t("noOrders")}</p>
                    <Button onClick={() => navigate("/best-sellers")} className="mt-4">{t("startShopping")}</Button>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between gap-3 p-3 md:p-4 bg-muted rounded-xl">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-foreground text-sm md:text-base">${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "completed" ? "bg-green-100 text-green-700"
                            : order.status === "pending" ? "bg-yellow-100 text-yellow-700"
                            : "bg-muted text-muted-foreground"
                          }`}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-card">
                <h2 className="text-lg md:text-2xl font-semibold text-foreground mb-4 md:mb-6">{t("accountSettings")}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 p-3 md:p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <Bell className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm md:text-base">{t("emailNotifications")}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{t("receiveUpdates")}</p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={(checked) => {
                        setEmailNotifications(checked);
                        localStorage.setItem("emailNotifications", JSON.stringify(checked));
                        toast({
                          title: t("success"),
                          description: checked ? "Notifications enabled" : "Notifications disabled",
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 md:p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <Lock className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm md:text-base">{t("password")}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{t("changePassword")}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setPasswordDialogOpen(true)}>{t("update")}</Button>
                  </div>
                </div>
              </div>

              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t("changePassword")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleChangePassword} className="w-full" disabled={changingPassword}>
                      {changingPassword ? "Updating..." : t("update")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
