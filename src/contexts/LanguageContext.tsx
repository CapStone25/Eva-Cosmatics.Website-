import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "ar" | "fr";

interface Translations {
  [key: string]: { en: string; ar: string; fr: string };
}

const translations: Translations = {
  // Navbar
  shopAll: { en: "SHOP ALL", ar: "تسوق الكل", fr: "TOUT ACHETER" },
  bestsellers: { en: "BESTSELLERS", ar: "الأكثر مبيعاً", fr: "MEILLEURES VENTES" },
  aboutUs: { en: "ABOUT US", ar: "من نحن", fr: "À PROPOS" },
  blog: { en: "BLOG", ar: "المدونة", fr: "BLOG" },
  dashboard: { en: "DASHBOARD", ar: "لوحة التحكم", fr: "TABLEAU DE BORD" },
  
  // Auth
  welcome: { en: "Welcome", ar: "مرحباً", fr: "Bienvenue" },
  signInOrCreate: { en: "Sign in or create an account", ar: "تسجيل الدخول أو إنشاء حساب", fr: "Connectez-vous ou créez un compte" },
  login: { en: "Login", ar: "تسجيل الدخول", fr: "Connexion" },
  signUp: { en: "Sign Up", ar: "إنشاء حساب", fr: "S'inscrire" },
  email: { en: "Email", ar: "البريد الإلكتروني", fr: "E-mail" },
  password: { en: "Password", ar: "كلمة المرور", fr: "Mot de passe" },
  fullName: { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet" },
  signingIn: { en: "Signing in...", ar: "جاري التسجيل...", fr: "Connexion..." },
  signIn: { en: "Sign In", ar: "تسجيل الدخول", fr: "Se connecter" },
  creating: { en: "Creating...", ar: "جاري الإنشاء...", fr: "Création..." },
  createAccount: { en: "Create Account", ar: "إنشاء حساب", fr: "Créer un compte" },
  orContinueWith: { en: "Or continue with", ar: "أو تابع مع", fr: "Ou continuez avec" },
  signOut: { en: "Sign Out", ar: "تسجيل الخروج", fr: "Déconnexion" },
  welcomeBack: { en: "Welcome back!", ar: "أهلاً بعودتك!", fr: "Bon retour !" },
  signedInSuccess: { en: "You have signed in successfully", ar: "تم تسجيل الدخول بنجاح", fr: "Connexion réussie" },
  accountCreated: { en: "Account created successfully", ar: "تم إنشاء الحساب بنجاح", fr: "Compte créé avec succès" },
  signedOut: { en: "Signed out", ar: "تم تسجيل الخروج", fr: "Déconnecté" },
  seeYouSoon: { en: "See you soon!", ar: "نراك قريباً!", fr: "À bientôt !" },
  
  // Profile
  myProfile: { en: "My Profile", ar: "ملفي الشخصي", fr: "Mon Profil" },
  admin: { en: "Admin", ar: "مدير", fr: "Admin" },
  member: { en: "Member", ar: "عضو", fr: "Membre" },
  profile: { en: "Profile", ar: "الملف الشخصي", fr: "Profil" },
  orders: { en: "Orders", ar: "الطلبات", fr: "Commandes" },
  settings: { en: "Settings", ar: "الإعدادات", fr: "Paramètres" },
  personalInfo: { en: "Personal Information", ar: "المعلومات الشخصية", fr: "Informations personnelles" },
  phone: { en: "Phone", ar: "الهاتف", fr: "Téléphone" },
  address: { en: "Address", ar: "العنوان", fr: "Adresse" },
  saveChanges: { en: "Save Changes", ar: "حفظ التغييرات", fr: "Enregistrer" },
  saving: { en: "Saving...", ar: "جاري الحفظ...", fr: "Enregistrement..." },
  orderHistory: { en: "Order History", ar: "سجل الطلبات", fr: "Historique des commandes" },
  noOrders: { en: "No orders yet", ar: "لا توجد طلبات بعد", fr: "Aucune commande" },
  startShopping: { en: "Start Shopping", ar: "ابدأ التسوق", fr: "Commencer les achats" },
  accountSettings: { en: "Account Settings", ar: "إعدادات الحساب", fr: "Paramètres du compte" },
  emailNotifications: { en: "Email Notifications", ar: "إشعارات البريد", fr: "Notifications e-mail" },
  receiveUpdates: { en: "Receive updates about your orders", ar: "تلقي تحديثات حول طلباتك", fr: "Recevoir des mises à jour" },
  manage: { en: "Manage", ar: "إدارة", fr: "Gérer" },
  changePassword: { en: "Change your account password", ar: "تغيير كلمة المرور", fr: "Changer le mot de passe" },
  update: { en: "Update", ar: "تحديث", fr: "Mettre à jour" },
  profilePhoto: { en: "Profile Photo", ar: "صورة الملف الشخصي", fr: "Photo de profil" },
  uploadPhoto: { en: "Upload Photo", ar: "رفع صورة", fr: "Télécharger" },
  
  // Hero / Home
  heroTitle: { en: "Discover Your Natural Beauty", ar: "اكتشفي جمالك الطبيعي", fr: "Découvrez votre beauté naturelle" },
  heroSubtitle: { en: "Premium skincare crafted with the finest natural ingredients", ar: "عناية فاخرة بالبشرة من أجود المكونات الطبيعية", fr: "Soins premium aux meilleurs ingrédients naturels" },
  shopNow: { en: "Shop Now", ar: "تسوقي الآن", fr: "Acheter maintenant" },
  newArrivals: { en: "New Arrivals", ar: "وصل حديثاً", fr: "Nouveautés" },
  bestSellersTitle: { en: "Best Sellers", ar: "الأكثر مبيعاً", fr: "Meilleures ventes" },
  addToCart: { en: "Add to Cart", ar: "أضف للسلة", fr: "Ajouter au panier" },
  
  // Footer
  quickLinks: { en: "Quick Links", ar: "روابط سريعة", fr: "Liens rapides" },
  customerService: { en: "Customer Service", ar: "خدمة العملاء", fr: "Service client" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا", fr: "Contactez-nous" },
  shippingReturns: { en: "Shipping & Returns", ar: "الشحن والإرجاع", fr: "Livraison et retours" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة", fr: "FAQ" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة", fr: "Tous droits réservés" },
  
  // Misc
  error: { en: "Error", ar: "خطأ", fr: "Erreur" },
  success: { en: "Success", ar: "نجاح", fr: "Succès" },
  profileUpdated: { en: "Profile updated successfully", ar: "تم تحديث الملف الشخصي", fr: "Profil mis à jour" },
  failedUpdate: { en: "Failed to update profile", ar: "فشل تحديث الملف الشخصي", fr: "Échec de la mise à jour" },
  invalidCredentials: { en: "Invalid email or password", ar: "بريد إلكتروني أو كلمة مرور غير صحيحة", fr: "E-mail ou mot de passe invalide" },
  accountExists: { en: "Account exists", ar: "الحساب موجود", fr: "Le compte existe" },
  pleaseLogin: { en: "Please login instead", ar: "يرجى تسجيل الدخول", fr: "Veuillez vous connecter" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app-language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
