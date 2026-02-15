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

  // Hero
  heroTitle: { en: "DISCOVER YOUR INNER BEAUTY", ar: "اكتشفي جمالك الداخلي", fr: "DÉCOUVREZ VOTRE BEAUTÉ INTÉRIEURE" },
  heroSubtitle: { en: "WITH BLOSSOM GLOW KIT", ar: "مع مجموعة بلوسوم جلو", fr: "AVEC LE KIT BLOSSOM GLOW" },
  heroDesc: { en: "Great gift for yourself and loved ones", ar: "هدية رائعة لك ولأحبائك", fr: "Un cadeau idéal pour vous et vos proches" },
  shopNow: { en: "Shop Now", ar: "تسوقي الآن", fr: "Acheter maintenant" },
  
  // Sections
  newArrivals: { en: "NEW ARRIVALS", ar: "وصل حديثاً", fr: "NOUVEAUTÉS" },
  bestSellersTitle: { en: "BEST SELLERS", ar: "الأكثر مبيعاً", fr: "MEILLEURES VENTES" },
  seeAll: { en: "See All", ar: "عرض الكل", fr: "Tout voir" },
  
  // Product Card
  addToBag: { en: "Add To Bag", ar: "أضف للسلة", fr: "Ajouter au panier" },
  addToCart: { en: "Add to Cart", ar: "أضف للسلة", fr: "Ajouter au panier" },
  addedToCart: { en: "Added to cart", ar: "تمت الإضافة للسلة", fr: "Ajouté au panier" },
  addedToCartDesc: { en: "has been added to your bag", ar: "تمت إضافته إلى حقيبتك", fr: "a été ajouté à votre panier" },
  quickView: { en: "Quick View", ar: "عرض سريع", fr: "Aperçu rapide" },
  hot: { en: "Hot", ar: "رائج", fr: "Tendance" },

  // Product Showcase
  showcaseTitle1: { en: "Blossom Glow Kit", ar: "مجموعة بلوسوم جلو", fr: "Kit Blossom Glow" },
  showcaseDesc1: { en: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams with lotus extract provide deep hydration and rejuvenation. Suitable for all skin types. Vegan, cruelty-free, eco-friendly.", ar: "اكتشفي توهج بشرتك الطبيعي مع مجموعة لوتس جلو. كريمات مغذية للجسم والوجه بخلاصة اللوتس توفر ترطيباً عميقاً وتجديداً. مناسبة لجميع أنواع البشرة. نباتية، خالية من القسوة، صديقة للبيئة.", fr: "Révélez l'éclat naturel de votre peau avec notre Kit Lotus Glow. Des crèmes nourrissantes pour le corps et le visage à l'extrait de lotus offrent une hydratation profonde et un rajeunissement. Convient à tous les types de peau. Végétalien, sans cruauté, écologique." },
  showcaseTitle2: { en: "Floral Essence Masks Sets", ar: "مجموعات أقنعة الزهور الأساسية", fr: "Ensemble de masques Floral Essence" },
  showcaseDesc2: { en: "Indulge in the beauty of nature with our Floral Essence Masks set. Each mask features a unique blend of flower extracts to hydrate and nourish your skin. Experience the essence of flowers in your skincare routine.", ar: "استمتعي بجمال الطبيعة مع مجموعة أقنعة الزهور الأساسية. يتميز كل قناع بمزيج فريد من خلاصات الزهور لترطيب وتغذية بشرتك. اختبري جوهر الزهور في روتين العناية ببشرتك.", fr: "Plongez dans la beauté de la nature avec notre ensemble de masques Floral Essence. Chaque masque présente un mélange unique d'extraits de fleurs pour hydrater et nourrir votre peau. Découvrez l'essence des fleurs dans votre routine de soins." },
  exploreMore: { en: "Explore More", ar: "اكتشفي المزيد", fr: "Explorer plus" },

  // Blog Section
  onTheBlog: { en: "ON THE BLOG", ar: "في المدونة", fr: "SUR LE BLOG" },
  readMore: { en: "Read More", ar: "اقرأ المزيد", fr: "Lire la suite" },
  blogTitle1: { en: "Cracking the Coconut Code", ar: "فك شفرة جوز الهند", fr: "Décrypter le code du coco" },
  blogDesc1: { en: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams.", ar: "اكتشفي توهج بشرتك الطبيعي مع مجموعة لوتس جلو. كريمات مغذية للجسم والوجه.", fr: "Révélez l'éclat naturel de votre peau avec notre Kit Lotus Glow. Crèmes nourrissantes pour le corps et le visage." },
  blogTitle2: { en: "Bloom Beauty Best of 2023", ar: "أفضل منتجات بلوم بيوتي 2023", fr: "Le meilleur de Bloom Beauty 2023" },
  blogDesc2: { en: "Bloom Beauty Best of 2023 products winners are here.", ar: "الفائزون بأفضل منتجات بلوم بيوتي 2023 هنا.", fr: "Les gagnants des meilleurs produits Bloom Beauty 2023 sont là." },
  blogTitle3: { en: "7 Skincare Habits to Break Now", ar: "7 عادات للعناية بالبشرة يجب التخلص منها الآن", fr: "7 habitudes de soins à abandonner maintenant" },
  blogDesc3: { en: "Great skincare is a long game—it doesn't happen overnight, but little steps are made nightly to get and keep your skin at its...", ar: "العناية الرائعة بالبشرة لعبة طويلة - لا تحدث بين عشية وضحاها، لكن خطوات صغيرة تُتخذ كل ليلة للحصول على بشرة...", fr: "Les bons soins de la peau sont un jeu de longue haleine — cela ne se fait pas du jour au lendemain, mais de petits gestes sont faits chaque soir..." },
  skinQuizTitle: { en: "The Skin Quiz", ar: "اختبار البشرة", fr: "Le Quiz Peau" },
  skinQuizDesc: { en: "Meet the quiz that will curate a routine just as unique as you are.", ar: "اكتشفي الاختبار الذي سينسق روتيناً فريداً مثلك تماماً.", fr: "Découvrez le quiz qui créera une routine aussi unique que vous." },

  // Instagram
  instagramTitle: { en: "SHARE HOW YOU BLOSSOMED WITH", ar: "شاركي كيف تألقتِ مع", fr: "PARTAGEZ COMMENT VOUS AVEZ FLEURI AVEC" },
  instagramHashtag: { en: "#BLOOMBEAUTY", ar: "#بلوم_بيوتي", fr: "#BLOOMBEAUTY" },
  viewOnInstagram: { en: "View on Instagram", ar: "عرض على إنستجرام", fr: "Voir sur Instagram" },
  followUs: { en: "Follow Us", ar: "تابعينا", fr: "Suivez-nous" },
  buyNow: { en: "Buy Now", ar: "اشتري الآن", fr: "Acheter maintenant" },
  seeInAt: { en: "See in @", ar: "شاهدي في @", fr: "Voir sur @" },

  // Footer
  help: { en: "HELP", ar: "المساعدة", fr: "AIDE" },
  contactUs: { en: "Contact us", ar: "اتصل بنا", fr: "Contactez-nous" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة", fr: "FAQ" },
  shippingReturns: { en: "Shipping & Returns", ar: "الشحن والإرجاع", fr: "Livraison et retours" },
  myAccount: { en: "MY ACCOUNT", ar: "حسابي", fr: "MON COMPTE" },
  addresses: { en: "Addresses", ar: "العناوين", fr: "Adresses" },
  orderStatus: { en: "Order Status", ar: "حالة الطلب", fr: "Statut de commande" },
  wishlist: { en: "Wishlist", ar: "قائمة الأمنيات", fr: "Liste de souhaits" },
  customerCare: { en: "CUSTOMER CARE", ar: "خدمة العملاء", fr: "SERVICE CLIENT" },
  signUpEmails: { en: "SIGN UP FOR EMAILS", ar: "اشتركي في النشرة البريدية", fr: "INSCRIVEZ-VOUS AUX E-MAILS" },
  newsletterDesc: { en: "Stay informed, subscribe to our newsletter now!", ar: "ابقي على اطلاع، اشتركي في نشرتنا الآن!", fr: "Restez informé, abonnez-vous à notre newsletter !" },
  footerDesc: { en: "Discover nature's beauty with our natural care products", ar: "اكتشفي جمال الطبيعة مع منتجات العناية الطبيعية لدينا", fr: "Découvrez la beauté de la nature avec nos produits de soins naturels" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية", fr: "Politique de confidentialité" },
  termsConditions: { en: "Terms And Conditions", ar: "الشروط والأحكام", fr: "Conditions générales" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة", fr: "Tous droits réservés" },

  // Cart
  yourCart: { en: "Your Cart", ar: "سلتك", fr: "Votre panier" },
  cartEmpty: { en: "Your cart is empty", ar: "سلتك فارغة", fr: "Votre panier est vide" },
  total: { en: "Total", ar: "المجموع", fr: "Total" },
  checkout: { en: "Checkout", ar: "إتمام الشراء", fr: "Passer la commande" },
  processing: { en: "Processing...", ar: "جاري المعالجة...", fr: "Traitement..." },
  pleaseSignIn: { en: "Please sign in", ar: "يرجى تسجيل الدخول", fr: "Veuillez vous connecter" },
  signInToOrder: { en: "You need to sign in to place an order", ar: "تحتاج لتسجيل الدخول لإتمام الطلب", fr: "Vous devez vous connecter pour passer une commande" },
  cartIsEmpty: { en: "Cart is empty", ar: "السلة فارغة", fr: "Le panier est vide" },
  addProductsFirst: { en: "Add some products to your cart first", ar: "أضف بعض المنتجات إلى سلتك أولاً", fr: "Ajoutez d'abord des produits à votre panier" },
  orderPlaced: { en: "Order placed!", ar: "تم تقديم الطلب!", fr: "Commande passée !" },
  orderSuccess: { en: "Your order has been submitted successfully", ar: "تم تقديم طلبك بنجاح", fr: "Votre commande a été soumise avec succès" },

  // Search
  searchProducts: { en: "Search Products", ar: "بحث المنتجات", fr: "Rechercher des produits" },
  searchPlaceholder: { en: "Search for products...", ar: "ابحثي عن منتجات...", fr: "Rechercher des produits..." },
  noProductsFound: { en: "No products found", ar: "لم يتم العثور على منتجات", fr: "Aucun produit trouvé" },

  // Product Detail
  productNotFound: { en: "Product not found", ar: "المنتج غير موجود", fr: "Produit introuvable" },
  backToProducts: { en: "Back to Products", ar: "العودة للمنتجات", fr: "Retour aux produits" },
  size: { en: "Size: 50 ml", ar: "الحجم: 50 مل", fr: "Taille : 50 ml" },
  recommendedFor: { en: "RECOMMENDED FOR", ar: "موصى به لـ", fr: "RECOMMANDÉ POUR" },
  allSkinTypes: { en: "All Skin Types", ar: "جميع أنواع البشرة", fr: "Tous types de peau" },
  whatMakesItGood: { en: "WHAT MAKES IT GOOD", ar: "ما الذي يجعله جيداً", fr: "CE QUI LE REND BON" },
  ingredients: { en: "INGREDIENTS", ar: "المكونات", fr: "INGRÉDIENTS" },
  howToUse: { en: "HOW TO USE", ar: "طريقة الاستخدام", fr: "MODE D'EMPLOI" },
  howToUseDesc: { en: "Apply an appropriate amount to clean face and neck. Gently pat until fully absorbed. Use morning and evening.", ar: "ضعي كمية مناسبة على الوجه والرقبة النظيفين. ربتي بلطف حتى الامتصاص الكامل. استخدميه صباحاً ومساءً.", fr: "Appliquez une quantité appropriée sur le visage et le cou propres. Tapotez doucement jusqu'à absorption complète. Utilisez matin et soir." },
  ingredientsList: { en: "Water, Glycerin, Niacinamide, Butylene Glycol, Cherry Blossom Extract, Betaine, Sodium Hyaluronate, Panthenol, Allantoin...", ar: "ماء، جلسرين، نياسيناميد، بوتيلين جلايكول، خلاصة زهر الكرز، بيتاين، هيالورونات الصوديوم، بانثينول، ألانتوين...", fr: "Eau, Glycérine, Niacinamide, Butylène Glycol, Extrait de fleur de cerisier, Bétaïne, Hyaluronate de sodium, Panthénol, Allantoïne..." },
  customerReviews: { en: "Customer Reviews", ar: "تقييمات العملاء", fr: "Avis clients" },
  writeReview: { en: "Write a Review", ar: "اكتب تقييماً", fr: "Écrire un avis" },
  noReviewsYet: { en: "No reviews yet. Be the first to review this product!", ar: "لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!", fr: "Pas encore d'avis. Soyez le premier à donner votre avis !" },
  rating: { en: "Rating", ar: "التقييم", fr: "Note" },
  title: { en: "Title", ar: "العنوان", fr: "Titre" },
  review: { en: "Review", ar: "التقييم", fr: "Avis" },
  reviewPlaceholder: { en: "Write your review...", ar: "اكتب تقييمك...", fr: "Écrivez votre avis..." },
  reviewTitlePlaceholder: { en: "Review title", ar: "عنوان التقييم", fr: "Titre de l'avis" },
  submitReview: { en: "Submit Review", ar: "إرسال التقييم", fr: "Soumettre l'avis" },
  pleaseLogin: { en: "Please login", ar: "يرجى تسجيل الدخول", fr: "Veuillez vous connecter" },
  loginToReview: { en: "You need to be logged in to write a review", ar: "تحتاج لتسجيل الدخول لكتابة تقييم", fr: "Vous devez être connecté pour écrire un avis" },
  reviewRequired: { en: "Review required", ar: "التقييم مطلوب", fr: "Avis requis" },
  pleaseWriteReview: { en: "Please write your review", ar: "يرجى كتابة تقييمك", fr: "Veuillez écrire votre avis" },
  reviewSubmitted: { en: "Review submitted", ar: "تم إرسال التقييم", fr: "Avis soumis" },
  thankYouReview: { en: "Thank you for your review!", ar: "شكراً لتقييمك!", fr: "Merci pour votre avis !" },
  verified: { en: "Verified", ar: "موثّق", fr: "Vérifié" },

  // Best Sellers Page
  products: { en: "PRODUCTS", ar: "المنتجات", fr: "PRODUITS" },
  product: { en: "PRODUCT", ar: "منتج", fr: "PRODUIT" },
  filters: { en: "FILTERS", ar: "تصفية", fr: "FILTRES" },
  productType: { en: "Product Type", ar: "نوع المنتج", fr: "Type de produit" },
  ingredientType: { en: "Ingredient Type", ar: "نوع المكون", fr: "Type d'ingrédient" },
  skinType: { en: "Skin Type", ar: "نوع البشرة", fr: "Type de peau" },
  priceRange: { en: "Price Range", ar: "نطاق السعر", fr: "Gamme de prix" },
  clearFilters: { en: "Clear Filters", ar: "مسح التصفية", fr: "Effacer les filtres" },
  sortBy: { en: "SORT BY:", ar: "ترتيب حسب:", fr: "TRIER PAR :" },
  relevance: { en: "Relevance", ar: "الصلة", fr: "Pertinence" },
  priceLowHigh: { en: "Price: Low to High", ar: "السعر: من الأقل إلى الأعلى", fr: "Prix : croissant" },
  priceHighLow: { en: "Price: High to Low", ar: "السعر: من الأعلى إلى الأقل", fr: "Prix : décroissant" },
  newest: { en: "Newest", ar: "الأحدث", fr: "Plus récent" },
  all: { en: "All", ar: "الكل", fr: "Tout" },
  combinationOily: { en: "Combination/Oily", ar: "مختلطة/دهنية", fr: "Mixte/Grasse" },
  dry: { en: "Dry", ar: "جافة", fr: "Sèche" },
  normal: { en: "Normal", ar: "عادية", fr: "Normale" },
  sensitive: { en: "Sensitive", ar: "حساسة", fr: "Sensible" },
  doubleCleanse: { en: "Double-Cleanse", ar: "تنظيف مزدوج", fr: "Double nettoyage" },
  cleansingBalms: { en: "Cleansing Balms", ar: "بلسم التنظيف", fr: "Baumes nettoyants" },
  oilCleansers: { en: "Oil Cleansers", ar: "منظفات زيتية", fr: "Nettoyants huileux" },
  waterCleansers: { en: "Water Cleansers", ar: "منظفات مائية", fr: "Nettoyants à l'eau" },

  // About Us
  aboutUsTitle: { en: "About Eva Cosmetics", ar: "عن إيفا كوزماتيكس", fr: "À propos d'Eva Cosmetics" },
  aboutUsDesc1: { en: "Eva Cosmetics was born from a passion for natural beauty and sustainable skincare. Our journey began with a simple belief: everyone deserves access to high-quality, ethical beauty products that enhance their natural radiance.", ar: "وُلدت إيفا كوزماتيكس من شغف بالجمال الطبيعي والعناية المستدامة بالبشرة. بدأت رحلتنا بإيمان بسيط: الجميع يستحق الوصول إلى منتجات تجميل عالية الجودة وأخلاقية تعزز إشراقتهم الطبيعية.", fr: "Eva Cosmetics est née d'une passion pour la beauté naturelle et les soins durables. Notre voyage a commencé avec une croyance simple : tout le monde mérite d'accéder à des produits de beauté éthiques et de haute qualité qui rehaussent leur éclat naturel." },
  aboutUsDesc2: { en: "We carefully source our ingredients from trusted suppliers who share our commitment to sustainability and ethical practices. Each product is formulated with love and expertise, ensuring that you receive only the best for your skin.", ar: "نحرص على اختيار مكوناتنا من موردين موثوقين يشاركوننا التزامنا بالاستدامة والممارسات الأخلاقية. يتم تصنيع كل منتج بحب وخبرة، لضمان حصولك على الأفضل لبشرتك.", fr: "Nous sélectionnons soigneusement nos ingrédients auprès de fournisseurs de confiance qui partagent notre engagement envers la durabilité et les pratiques éthiques. Chaque produit est formulé avec amour et expertise, vous garantissant le meilleur pour votre peau." },
  ourMission: { en: "Our Mission", ar: "مهمتنا", fr: "Notre Mission" },
  ourMissionDesc: { en: "To provide luxurious, effective skincare solutions that are gentle on your skin and kind to our planet. We believe in transparency, quality, and the transformative power of self-care.", ar: "تقديم حلول فاخرة وفعالة للعناية بالبشرة لطيفة على بشرتك ورفيقة بكوكبنا. نؤمن بالشفافية والجودة والقوة التحويلية للعناية الذاتية.", fr: "Offrir des solutions de soins luxueuses et efficaces, douces pour votre peau et respectueuses de notre planète. Nous croyons en la transparence, la qualité et le pouvoir transformateur du soin de soi." },
  shipping: { en: "SHIPPING", ar: "الشحن", fr: "LIVRAISON" },
  returns: { en: "RETURNS", ar: "الإرجاع", fr: "RETOURS" },
  domesticShipping: { en: "Domestic Shipping", ar: "الشحن المحلي", fr: "Livraison nationale" },
  internationalShipping: { en: "International Shipping", ar: "الشحن الدولي", fr: "Livraison internationale" },
  shippingRestriction: { en: "Shipping Restriction", ar: "قيود الشحن", fr: "Restrictions de livraison" },
  returnPolicy: { en: "Return Policy", ar: "سياسة الإرجاع", fr: "Politique de retour" },
  howToReturn: { en: "How To Return", ar: "كيفية الإرجاع", fr: "Comment retourner" },
  refunds: { en: "Refunds", ar: "المبالغ المستردة", fr: "Remboursements" },
  faqs: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", fr: "Questions fréquentes" },
  businessHours: { en: "Business Hours", ar: "ساعات العمل", fr: "Heures d'ouverture" },

  // About sidebar
  aboutSideAbout: { en: "About Us", ar: "من نحن", fr: "À propos" },
  aboutSideShipping: { en: "Shipping & Returns", ar: "الشحن والإرجاع", fr: "Livraison et retours" },
  aboutSideContact: { en: "Contact Us", ar: "اتصل بنا", fr: "Contactez-nous" },
  aboutSideFaqs: { en: "FAQs", ar: "الأسئلة الشائعة", fr: "FAQ" },

  // Blog Page
  ourBlog: { en: "Our Blog", ar: "مدونتنا", fr: "Notre Blog" },
  ourBlogDesc: { en: "Discover skincare tips, beauty trends, and expert advice to help you achieve your best skin yet.", ar: "اكتشفي نصائح العناية بالبشرة واتجاهات الجمال ونصائح الخبراء لمساعدتك في الحصول على أفضل بشرة.", fr: "Découvrez des conseils de soins, des tendances beauté et des conseils d'experts pour vous aider à obtenir la meilleure peau possible." },
  showMore: { en: "Show More ↓", ar: "عرض المزيد ↓", fr: "Voir plus ↓" },
  blogPageTitle1: { en: "Cracking the Coconut Code", ar: "فك شفرة جوز الهند", fr: "Décrypter le code du coco" },
  blogPageExcerpt1: { en: "Two ingredients have been explored so much in recent years as coconut oil. It is a new life wonder product? Certainly when it's in skin care. One of our newest skincare, Coconut Body Butter, and continue of all the rest, as we wanted to give you the facts to decide how your specific skin type can really map to recovery. Keep reading below as we take a deep dive into the 'nut...", ar: "تم استكشاف مكونين كثيراً في السنوات الأخيرة مثل زيت جوز الهند. هل هو منتج عجيب جديد للحياة؟ بالتأكيد عندما يكون في العناية بالبشرة. أحد أحدث منتجاتنا للعناية بالبشرة، زبدة الجسم بجوز الهند...", fr: "Deux ingrédients ont été tellement explorés ces dernières années comme l'huile de coco. Est-ce un nouveau produit miracle ? Certainement quand il s'agit de soins de la peau. L'un de nos plus récents soins, le Beurre Corporel à la Noix de Coco..." },
  blogPageTitle2: { en: "Bloom Beauty Best of 2023", ar: "أفضل منتجات بلوم بيوتي 2023", fr: "Le meilleur de Bloom Beauty 2023" },
  blogPageExcerpt2: { en: "Can you believe we're here? Another year is wrapping up and we're feeling celebratory: wanting to share our list for the best products of 2023. There are so many ways you can celebrate what is already a collection of our favorite trends...", ar: "هل تصدقون أننا هنا؟ سنة أخرى تنتهي ونشعر بالاحتفال: نريد مشاركة قائمتنا لأفضل منتجات 2023. هناك العديد من الطرق للاحتفال بما هو بالفعل مجموعة من اتجاهاتنا المفضلة...", fr: "Pouvez-vous croire que nous sommes là ? Une autre année se termine et nous nous sentons festifs : nous voulons partager notre liste des meilleurs produits de 2023..." },
  blogPageTitle3: { en: "7 Skincare Habits to Break Now", ar: "7 عادات للعناية بالبشرة يجب التخلص منها الآن", fr: "7 habitudes de soins à abandonner maintenant" },
  blogPageExcerpt3: { en: "Great skincare is a long game—it doesn't happen overnight, but little steps are made nightly to get and keep your skin at its most radiant state. Today, we are uncovering some of our not so smart but powerful habits that can make a world of difference with your skin...", ar: "العناية الرائعة بالبشرة لعبة طويلة - لا تحدث بين عشية وضحاها، لكن خطوات صغيرة تُتخذ كل ليلة للحصول على بشرتك في أكثر حالاتها إشراقاً. اليوم، نكشف عن بعض عاداتنا القوية التي يمكن أن تحدث فرقاً كبيراً...", fr: "Les bons soins de la peau sont un jeu de longue haleine — cela ne se fait pas du jour au lendemain. Aujourd'hui, nous découvrons certaines de nos habitudes puissantes qui peuvent faire toute la différence..." },
  blogPageTitle4: { en: "Getting Your Skin Care Back on Track", ar: "استعادة روتين العناية ببشرتك", fr: "Remettre vos soins de peau sur les rails" },
  blogPageExcerpt4: { en: "With so many recent and ever-changing concerns occupying precious brain space daily, you're forgiven if maintaining a multi-step skincare routine hasn't been at the top of your list, and that's OK...", ar: "مع وجود العديد من المخاوف المتغيرة باستمرار التي تشغل مساحة ثمينة في الدماغ يومياً، يُغفر لك إذا لم يكن الحفاظ على روتين متعدد الخطوات للعناية بالبشرة على رأس قائمتك...", fr: "Avec tant de préoccupations récentes et en constante évolution qui occupent un espace précieux dans votre cerveau chaque jour, on vous pardonne si le maintien d'une routine de soins en plusieurs étapes n'a pas été en haut de votre liste..." },

  // Misc
  error: { en: "Error", ar: "خطأ", fr: "Erreur" },
  success: { en: "Success", ar: "نجاح", fr: "Succès" },
  profileUpdated: { en: "Profile updated successfully", ar: "تم تحديث الملف الشخصي", fr: "Profil mis à jour" },
  failedUpdate: { en: "Failed to update profile", ar: "فشل تحديث الملف الشخصي", fr: "Échec de la mise à jour" },
  invalidCredentials: { en: "Invalid email or password", ar: "بريد إلكتروني أو كلمة مرور غير صحيحة", fr: "E-mail ou mot de passe invalide" },
  accountExists: { en: "Account exists", ar: "الحساب موجود", fr: "Le compte existe" },
  failedSubmitReview: { en: "Failed to submit review", ar: "فشل إرسال التقييم", fr: "Échec de la soumission de l'avis" },
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

  // Set initial dir on mount
  useState(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  });

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
