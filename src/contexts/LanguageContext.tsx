import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar" | "fr" | "es" | "tr";

interface Translations {
  [key: string]: { en: string; ar: string; fr: string; es: string; tr: string };
}

const translations: Translations = {
  // Navbar
  shopAll: { en: "SHOP ALL", ar: "تسوق الكل", fr: "TOUT ACHETER", es: "COMPRAR TODO", tr: "TÜMÜNÜ GÖR" },
  bestsellers: { en: "BESTSELLERS", ar: "الأكثر مبيعاً", fr: "MEILLEURES VENTES", es: "MÁS VENDIDOS", tr: "EN ÇOK SATANLAR" },
  aboutUs: { en: "ABOUT US", ar: "من نحن", fr: "À PROPOS", es: "SOBRE NOSOTROS", tr: "HAKKIMIZDA" },
  blog: { en: "BLOG", ar: "المدونة", fr: "BLOG", es: "BLOG", tr: "BLOG" },
  dashboard: { en: "DASHBOARD", ar: "لوحة التحكم", fr: "TABLEAU DE BORD", es: "PANEL", tr: "PANEL" },
  menu: { en: "Menu", ar: "القائمة", fr: "Menu", es: "Menú", tr: "Menü" },

  // Auth
  welcome: { en: "Welcome", ar: "مرحباً", fr: "Bienvenue", es: "Bienvenido", tr: "Hoş geldiniz" },
  signInOrCreate: { en: "Sign in or create an account", ar: "تسجيل الدخول أو إنشاء حساب", fr: "Connectez-vous ou créez un compte", es: "Inicia sesión o crea una cuenta", tr: "Giriş yapın veya hesap oluşturun" },
  login: { en: "Login", ar: "تسجيل الدخول", fr: "Connexion", es: "Iniciar sesión", tr: "Giriş" },
  signUp: { en: "Sign Up", ar: "إنشاء حساب", fr: "S'inscrire", es: "Registrarse", tr: "Kayıt ol" },
  email: { en: "Email", ar: "البريد الإلكتروني", fr: "E-mail", es: "Correo electrónico", tr: "E-posta" },
  password: { en: "Password", ar: "كلمة المرور", fr: "Mot de passe", es: "Contraseña", tr: "Şifre" },
  fullName: { en: "Full Name", ar: "الاسم الكامل", fr: "Nom complet", es: "Nombre completo", tr: "Ad Soyad" },
  signingIn: { en: "Signing in...", ar: "جاري التسجيل...", fr: "Connexion...", es: "Iniciando sesión...", tr: "Giriş yapılıyor..." },
  signIn: { en: "Sign In", ar: "تسجيل الدخول", fr: "Se connecter", es: "Iniciar sesión", tr: "Giriş yap" },
  creating: { en: "Creating...", ar: "جاري الإنشاء...", fr: "Création...", es: "Creando...", tr: "Oluşturuluyor..." },
  createAccount: { en: "Create Account", ar: "إنشاء حساب", fr: "Créer un compte", es: "Crear cuenta", tr: "Hesap oluştur" },
  orContinueWith: { en: "Or continue with", ar: "أو تابع مع", fr: "Ou continuez avec", es: "O continúa con", tr: "Veya ile devam edin" },
  signOut: { en: "Sign Out", ar: "تسجيل الخروج", fr: "Déconnexion", es: "Cerrar sesión", tr: "Çıkış yap" },
  welcomeBack: { en: "Welcome back!", ar: "أهلاً بعودتك!", fr: "Bon retour !", es: "¡Bienvenido de nuevo!", tr: "Tekrar hoş geldiniz!" },
  signedInSuccess: { en: "You have signed in successfully", ar: "تم تسجيل الدخول بنجاح", fr: "Connexion réussie", es: "Inicio de sesión exitoso", tr: "Başarıyla giriş yaptınız" },
  accountCreated: { en: "Account created successfully", ar: "تم إنشاء الحساب بنجاح", fr: "Compte créé avec succès", es: "Cuenta creada exitosamente", tr: "Hesap başarıyla oluşturuldu" },
  signedOut: { en: "Signed out", ar: "تم تسجيل الخروج", fr: "Déconnecté", es: "Sesión cerrada", tr: "Çıkış yapıldı" },
  seeYouSoon: { en: "See you soon!", ar: "نراك قريباً!", fr: "À bientôt !", es: "¡Hasta pronto!", tr: "Yakında görüşürüz!" },
  pleaseLogin: { en: "Please login", ar: "يرجى تسجيل الدخول", fr: "Veuillez vous connecter", es: "Por favor inicie sesión", tr: "Lütfen giriş yapın" },

  // Profile
  myProfile: { en: "My Profile", ar: "ملفي الشخصي", fr: "Mon Profil", es: "Mi Perfil", tr: "Profilim" },
  admin: { en: "Admin", ar: "مدير", fr: "Admin", es: "Admin", tr: "Yönetici" },
  member: { en: "Member", ar: "عضو", fr: "Membre", es: "Miembro", tr: "Üye" },
  profile: { en: "Profile", ar: "الملف الشخصي", fr: "Profil", es: "Perfil", tr: "Profil" },
  orders: { en: "Orders", ar: "الطلبات", fr: "Commandes", es: "Pedidos", tr: "Siparişler" },
  settings: { en: "Settings", ar: "الإعدادات", fr: "Paramètres", es: "Configuración", tr: "Ayarlar" },
  personalInfo: { en: "Personal Information", ar: "المعلومات الشخصية", fr: "Informations personnelles", es: "Información personal", tr: "Kişisel Bilgiler" },
  phone: { en: "Phone", ar: "الهاتف", fr: "Téléphone", es: "Teléfono", tr: "Telefon" },
  address: { en: "Address", ar: "العنوان", fr: "Adresse", es: "Dirección", tr: "Adres" },
  saveChanges: { en: "Save Changes", ar: "حفظ التغييرات", fr: "Enregistrer", es: "Guardar cambios", tr: "Değişiklikleri kaydet" },
  saving: { en: "Saving...", ar: "جاري الحفظ...", fr: "Enregistrement...", es: "Guardando...", tr: "Kaydediliyor..." },
  orderHistory: { en: "Order History", ar: "سجل الطلبات", fr: "Historique des commandes", es: "Historial de pedidos", tr: "Sipariş Geçmişi" },
  noOrders: { en: "No orders yet", ar: "لا توجد طلبات بعد", fr: "Aucune commande", es: "Sin pedidos aún", tr: "Henüz sipariş yok" },
  startShopping: { en: "Start Shopping", ar: "ابدأ التسوق", fr: "Commencer les achats", es: "Empezar a comprar", tr: "Alışverişe başla" },
  accountSettings: { en: "Account Settings", ar: "إعدادات الحساب", fr: "Paramètres du compte", es: "Configuración de la cuenta", tr: "Hesap Ayarları" },
  emailNotifications: { en: "Email Notifications", ar: "إشعارات البريد", fr: "Notifications e-mail", es: "Notificaciones por correo", tr: "E-posta Bildirimleri" },
  receiveUpdates: { en: "Receive updates about your orders", ar: "تلقي تحديثات حول طلباتك", fr: "Recevoir des mises à jour", es: "Recibir actualizaciones sobre tus pedidos", tr: "Siparişleriniz hakkında güncellemeler alın" },
  manage: { en: "Manage", ar: "إدارة", fr: "Gérer", es: "Gestionar", tr: "Yönet" },
  changePassword: { en: "Change your account password", ar: "تغيير كلمة المرور", fr: "Changer le mot de passe", es: "Cambiar la contraseña", tr: "Hesap şifrenizi değiştirin" },
  update: { en: "Update", ar: "تحديث", fr: "Mettre à jour", es: "Actualizar", tr: "Güncelle" },
  profilePhoto: { en: "Profile Photo", ar: "صورة الملف الشخصي", fr: "Photo de profil", es: "Foto de perfil", tr: "Profil fotoğrafı" },
  uploadPhoto: { en: "Upload Photo", ar: "رفع صورة", fr: "Télécharger", es: "Subir foto", tr: "Fotoğraf yükle" },

  // Hero
  heroTitle: { en: "DISCOVER YOUR INNER BEAUTY", ar: "اكتشفي جمالك الداخلي", fr: "DÉCOUVREZ VOTRE BEAUTÉ INTÉRIEURE", es: "DESCUBRE TU BELLEZA INTERIOR", tr: "İÇ GÜZELLİĞİNİZİ KEŞFEDİN" },
  heroSubtitle: { en: "WITH BLOSSOM GLOW KIT", ar: "مع مجموعة بلوسوم جلو", fr: "AVEC LE KIT BLOSSOM GLOW", es: "CON EL KIT BLOSSOM GLOW", tr: "BLOSSOM GLOW KİTİ İLE" },
  heroDesc: { en: "Great gift for yourself and loved ones", ar: "هدية رائعة لك ولأحبائك", fr: "Un cadeau idéal pour vous et vos proches", es: "Un gran regalo para ti y tus seres queridos", tr: "Kendiniz ve sevdikleriniz için harika bir hediye" },
  shopNow: { en: "Shop Now", ar: "تسوقي الآن", fr: "Acheter maintenant", es: "Comprar ahora", tr: "Şimdi alışveriş yap" },
  
  // Sections
  newArrivals: { en: "NEW ARRIVALS", ar: "وصل حديثاً", fr: "NOUVEAUTÉS", es: "NOVEDADES", tr: "YENİ GELENLER" },
  bestSellersTitle: { en: "BEST SELLERS", ar: "الأكثر مبيعاً", fr: "MEILLEURES VENTES", es: "MÁS VENDIDOS", tr: "EN ÇOK SATANLAR" },
  seeAll: { en: "See All", ar: "عرض الكل", fr: "Tout voir", es: "Ver todo", tr: "Tümünü gör" },
  
  // Product Card
  addToBag: { en: "Add To Bag", ar: "أضف للسلة", fr: "Ajouter au panier", es: "Añadir al carrito", tr: "Sepete ekle" },
  addToCart: { en: "Add to Cart", ar: "أضف للسلة", fr: "Ajouter au panier", es: "Añadir al carrito", tr: "Sepete ekle" },
  addedToCart: { en: "Added to cart", ar: "تمت الإضافة للسلة", fr: "Ajouté au panier", es: "Añadido al carrito", tr: "Sepete eklendi" },
  addedToCartDesc: { en: "has been added to your bag", ar: "تمت إضافته إلى حقيبتك", fr: "a été ajouté à votre panier", es: "ha sido añadido a tu bolsa", tr: "çantanıza eklendi" },
  quickView: { en: "Quick View", ar: "عرض سريع", fr: "Aperçu rapide", es: "Vista rápida", tr: "Hızlı bakış" },
  hot: { en: "Hot", ar: "رائج", fr: "Tendance", es: "Popular", tr: "Popüler" },

  // Product Showcase
  showcaseTitle1: { en: "Blossom Glow Kit", ar: "مجموعة بلوسوم جلو", fr: "Kit Blossom Glow", es: "Kit Blossom Glow", tr: "Blossom Glow Seti" },
  showcaseDesc1: { en: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams with lotus extract provide deep hydration and rejuvenation. Suitable for all skin types. Vegan, cruelty-free, eco-friendly.", ar: "اكتشفي توهج بشرتك الطبيعي مع مجموعة لوتس جلو. كريمات مغذية للجسم والوجه بخلاصة اللوتس توفر ترطيباً عميقاً وتجديداً. مناسبة لجميع أنواع البشرة.", fr: "Révélez l'éclat naturel de votre peau avec notre Kit Lotus Glow. Des crèmes nourrissantes pour le corps et le visage à l'extrait de lotus.", es: "Revela el brillo natural de tu piel con nuestro Kit Lotus Glow. Cremas nutritivas para cuerpo y rostro con extracto de loto.", tr: "Lotus Glow Kit ile cildinizin doğal parıltısını ortaya çıkarın. Lotus özüyle zenginleştirilmiş besleyici vücut ve yüz kremleri." },
  showcaseTitle2: { en: "Floral Essence Masks Sets", ar: "مجموعات أقنعة الزهور الأساسية", fr: "Ensemble de masques Floral Essence", es: "Set de mascarillas Floral Essence", tr: "Floral Essence Maske Seti" },
  showcaseDesc2: { en: "Indulge in the beauty of nature with our Floral Essence Masks set. Each mask features a unique blend of flower extracts to hydrate and nourish your skin.", ar: "استمتعي بجمال الطبيعة مع مجموعة أقنعة الزهور الأساسية. يتميز كل قناع بمزيج فريد من خلاصات الزهور لترطيب وتغذية بشرتك.", fr: "Plongez dans la beauté de la nature avec notre ensemble de masques Floral Essence.", es: "Disfruta de la belleza de la naturaleza con nuestro set de mascarillas Floral Essence.", tr: "Floral Essence Maske setimizle doğanın güzelliğinin tadını çıkarın." },
  exploreMore: { en: "Explore More", ar: "اكتشفي المزيد", fr: "Explorer plus", es: "Explorar más", tr: "Daha fazlasını keşfet" },

  // Blog Section
  onTheBlog: { en: "ON THE BLOG", ar: "في المدونة", fr: "SUR LE BLOG", es: "EN EL BLOG", tr: "BLOGDA" },
  readMore: { en: "Read More", ar: "اقرأ المزيد", fr: "Lire la suite", es: "Leer más", tr: "Devamını oku" },
  blogTitle1: { en: "Cracking the Coconut Code", ar: "فك شفرة جوز الهند", fr: "Décrypter le code du coco", es: "Descifrando el código del coco", tr: "Hindistancevizi Şifresini Çözmek" },
  blogDesc1: { en: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams.", ar: "اكتشفي توهج بشرتك الطبيعي مع مجموعة لوتس جلو. كريمات مغذية للجسم والوجه.", fr: "Révélez l'éclat naturel de votre peau avec notre Kit Lotus Glow.", es: "Revela el brillo natural de tu piel con nuestro Kit Lotus Glow.", tr: "Lotus Glow Kit ile cildinizin doğal parıltısını ortaya çıkarın." },
  blogTitle2: { en: "Bloom Beauty Best of 2023", ar: "أفضل منتجات بلوم بيوتي 2023", fr: "Le meilleur de Bloom Beauty 2023", es: "Lo mejor de Bloom Beauty 2023", tr: "Bloom Beauty 2023'ün En İyileri" },
  blogDesc2: { en: "Bloom Beauty Best of 2023 products winners are here.", ar: "الفائزون بأفضل منتجات بلوم بيوتي 2023 هنا.", fr: "Les gagnants des meilleurs produits Bloom Beauty 2023 sont là.", es: "Los ganadores de los mejores productos Bloom Beauty 2023 están aquí.", tr: "Bloom Beauty 2023 en iyi ürün kazananları burada." },
  blogTitle3: { en: "7 Skincare Habits to Break Now", ar: "7 عادات للعناية بالبشرة يجب التخلص منها الآن", fr: "7 habitudes de soins à abandonner maintenant", es: "7 hábitos de cuidado de la piel que debes dejar ahora", tr: "Şimdi Bırakmanız Gereken 7 Cilt Bakım Alışkanlığı" },
  blogDesc3: { en: "Great skincare is a long game—it doesn't happen overnight.", ar: "العناية الرائعة بالبشرة لعبة طويلة - لا تحدث بين عشية وضحاها.", fr: "Les bons soins de la peau sont un jeu de longue haleine.", es: "El buen cuidado de la piel es un juego a largo plazo.", tr: "Harika cilt bakımı uzun vadeli bir iştir." },
  skinQuizTitle: { en: "The Skin Quiz", ar: "اختبار البشرة", fr: "Le Quiz Peau", es: "El Quiz de Piel", tr: "Cilt Testi" },
  skinQuizDesc: { en: "Meet the quiz that will curate a routine just as unique as you are.", ar: "اكتشفي الاختبار الذي سينسق روتيناً فريداً مثلك تماماً.", fr: "Découvrez le quiz qui créera une routine aussi unique que vous.", es: "Descubre el quiz que creará una rutina tan única como tú.", tr: "Size özel bir rutin oluşturacak testi keşfedin." },

  // Instagram
  instagramTitle: { en: "SHARE HOW YOU BLOSSOMED WITH", ar: "شاركي كيف تألقتِ مع", fr: "PARTAGEZ COMMENT VOUS AVEZ FLEURI AVEC", es: "COMPARTE CÓMO FLORECISTE CON", tr: "NASIL ÇİÇEK AÇTIĞINIZI PAYLAŞIN" },
  instagramHashtag: { en: "#BLOOMBEAUTY", ar: "#بلوم_بيوتي", fr: "#BLOOMBEAUTY", es: "#BLOOMBEAUTY", tr: "#BLOOMBEAUTY" },
  viewOnInstagram: { en: "View on Instagram", ar: "عرض على إنستجرام", fr: "Voir sur Instagram", es: "Ver en Instagram", tr: "Instagram'da görüntüle" },
  followUs: { en: "Follow Us", ar: "تابعينا", fr: "Suivez-nous", es: "Síguenos", tr: "Bizi takip edin" },
  buyNow: { en: "Buy Now", ar: "اشتري الآن", fr: "Acheter maintenant", es: "Comprar ahora", tr: "Şimdi satın al" },
  seeInAt: { en: "See in @", ar: "شاهدي في @", fr: "Voir sur @", es: "Ver en @", tr: "@ da gör" },

  // Footer
  help: { en: "HELP", ar: "المساعدة", fr: "AIDE", es: "AYUDA", tr: "YARDIM" },
  contactUs: { en: "Contact us", ar: "اتصل بنا", fr: "Contactez-nous", es: "Contáctenos", tr: "Bize ulaşın" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة", fr: "FAQ", es: "Preguntas frecuentes", tr: "SSS" },
  shippingReturns: { en: "Shipping & Returns", ar: "الشحن والإرجاع", fr: "Livraison et retours", es: "Envío y devoluciones", tr: "Kargo ve İade" },
  myAccount: { en: "MY ACCOUNT", ar: "حسابي", fr: "MON COMPTE", es: "MI CUENTA", tr: "HESABIM" },
  addresses: { en: "Addresses", ar: "العناوين", fr: "Adresses", es: "Direcciones", tr: "Adresler" },
  orderStatus: { en: "Order Status", ar: "حالة الطلب", fr: "Statut de commande", es: "Estado del pedido", tr: "Sipariş durumu" },
  wishlist: { en: "Wishlist", ar: "قائمة الأمنيات", fr: "Liste de souhaits", es: "Lista de deseos", tr: "İstek listesi" },
  customerCare: { en: "CUSTOMER CARE", ar: "خدمة العملاء", fr: "SERVICE CLIENT", es: "ATENCIÓN AL CLIENTE", tr: "MÜŞTERİ HİZMETLERİ" },
  signUpEmails: { en: "SIGN UP FOR EMAILS", ar: "اشتركي في النشرة البريدية", fr: "INSCRIVEZ-VOUS AUX E-MAILS", es: "SUSCRÍBETE A LOS CORREOS", tr: "E-POSTALARA ABONE OLUN" },
  newsletterDesc: { en: "Stay informed, subscribe to our newsletter now!", ar: "ابقي على اطلاع، اشتركي في نشرتنا الآن!", fr: "Restez informé, abonnez-vous à notre newsletter !", es: "¡Mantente informado, suscríbete a nuestro boletín!", tr: "Haberdar olun, bültenimize şimdi abone olun!" },
  footerDesc: { en: "Discover nature's beauty with our natural care products", ar: "اكتشفي جمال الطبيعة مع منتجات العناية الطبيعية لدينا", fr: "Découvrez la beauté de la nature avec nos produits de soins naturels", es: "Descubre la belleza de la naturaleza con nuestros productos de cuidado natural", tr: "Doğal bakım ürünlerimizle doğanın güzelliğini keşfedin" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية", fr: "Politique de confidentialité", es: "Política de privacidad", tr: "Gizlilik Politikası" },
  termsConditions: { en: "Terms And Conditions", ar: "الشروط والأحكام", fr: "Conditions générales", es: "Términos y condiciones", tr: "Şartlar ve Koşullar" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة", fr: "Tous droits réservés", es: "Todos los derechos reservados", tr: "Tüm hakları saklıdır" },

  // Cart
  yourCart: { en: "Your Cart", ar: "سلتك", fr: "Votre panier", es: "Tu carrito", tr: "Sepetiniz" },
  cartEmpty: { en: "Your cart is empty", ar: "سلتك فارغة", fr: "Votre panier est vide", es: "Tu carrito está vacío", tr: "Sepetiniz boş" },
  total: { en: "Total", ar: "المجموع", fr: "Total", es: "Total", tr: "Toplam" },
  checkout: { en: "Checkout", ar: "إتمام الشراء", fr: "Passer la commande", es: "Finalizar compra", tr: "Ödeme yap" },
  processing: { en: "Processing...", ar: "جاري المعالجة...", fr: "Traitement...", es: "Procesando...", tr: "İşleniyor..." },
  pleaseSignIn: { en: "Please sign in", ar: "يرجى تسجيل الدخول", fr: "Veuillez vous connecter", es: "Por favor inicia sesión", tr: "Lütfen giriş yapın" },
  signInToOrder: { en: "You need to sign in to place an order", ar: "تحتاج لتسجيل الدخول لإتمام الطلب", fr: "Vous devez vous connecter pour passer une commande", es: "Necesitas iniciar sesión para hacer un pedido", tr: "Sipariş vermek için giriş yapmalısınız" },
  cartIsEmpty: { en: "Cart is empty", ar: "السلة فارغة", fr: "Le panier est vide", es: "El carrito está vacío", tr: "Sepet boş" },
  addProductsFirst: { en: "Add some products to your cart first", ar: "أضف بعض المنتجات إلى سلتك أولاً", fr: "Ajoutez d'abord des produits à votre panier", es: "Añade algunos productos primero", tr: "Önce sepetinize ürün ekleyin" },
  orderPlaced: { en: "Order placed!", ar: "تم تقديم الطلب!", fr: "Commande passée !", es: "¡Pedido realizado!", tr: "Sipariş verildi!" },
  orderSuccess: { en: "Your order has been submitted successfully", ar: "تم تقديم طلبك بنجاح", fr: "Votre commande a été soumise avec succès", es: "Tu pedido ha sido enviado exitosamente", tr: "Siparişiniz başarıyla gönderildi" },

  // Search
  searchProducts: { en: "Search Products", ar: "بحث المنتجات", fr: "Rechercher des produits", es: "Buscar productos", tr: "Ürün ara" },
  searchPlaceholder: { en: "Search for products...", ar: "ابحثي عن منتجات...", fr: "Rechercher des produits...", es: "Buscar productos...", tr: "Ürün ara..." },
  noProductsFound: { en: "No products found", ar: "لم يتم العثور على منتجات", fr: "Aucun produit trouvé", es: "No se encontraron productos", tr: "Ürün bulunamadı" },

  // Product Detail
  productNotFound: { en: "Product not found", ar: "المنتج غير موجود", fr: "Produit introuvable", es: "Producto no encontrado", tr: "Ürün bulunamadı" },
  backToProducts: { en: "Back to Products", ar: "العودة للمنتجات", fr: "Retour aux produits", es: "Volver a productos", tr: "Ürünlere dön" },
  size: { en: "Size: 50 ml", ar: "الحجم: 50 مل", fr: "Taille : 50 ml", es: "Tamaño: 50 ml", tr: "Boyut: 50 ml" },
  recommendedFor: { en: "RECOMMENDED FOR", ar: "موصى به لـ", fr: "RECOMMANDÉ POUR", es: "RECOMENDADO PARA", tr: "ÖNERİLEN" },
  allSkinTypes: { en: "All Skin Types", ar: "جميع أنواع البشرة", fr: "Tous types de peau", es: "Todos los tipos de piel", tr: "Tüm cilt tipleri" },
  whatMakesItGood: { en: "WHAT MAKES IT GOOD", ar: "ما الذي يجعله جيداً", fr: "CE QUI LE REND BON", es: "QUÉ LO HACE BUENO", tr: "İYİ YAPAN NE" },
  ingredients: { en: "INGREDIENTS", ar: "المكونات", fr: "INGRÉDIENTS", es: "INGREDIENTES", tr: "İÇERİKLER" },
  howToUse: { en: "HOW TO USE", ar: "طريقة الاستخدام", fr: "MODE D'EMPLOI", es: "CÓMO USAR", tr: "NASIL KULLANILIR" },
  howToUseDesc: { en: "Apply an appropriate amount to clean face and neck. Gently pat until fully absorbed. Use morning and evening.", ar: "ضعي كمية مناسبة على الوجه والرقبة النظيفين. ربتي بلطف حتى الامتصاص الكامل. استخدميه صباحاً ومساءً.", fr: "Appliquez une quantité appropriée sur le visage et le cou propres. Tapotez doucement jusqu'à absorption complète.", es: "Aplique una cantidad apropiada en el rostro y cuello limpios. Golpee suavemente hasta la absorción completa.", tr: "Temiz yüz ve boyuna uygun miktarda uygulayın. Tamamen emilene kadar hafifçe vurun." },
  ingredientsList: { en: "Water, Glycerin, Niacinamide, Butylene Glycol, Cherry Blossom Extract, Betaine, Sodium Hyaluronate, Panthenol, Allantoin...", ar: "ماء، جلسرين، نياسيناميد، بوتيلين جلايكول، خلاصة زهر الكرز، بيتاين، هيالورونات الصوديوم، بانثينول، ألانتوين...", fr: "Eau, Glycérine, Niacinamide, Butylène Glycol, Extrait de fleur de cerisier...", es: "Agua, Glicerina, Niacinamida, Butileno Glicol, Extracto de flor de cerezo...", tr: "Su, Gliserin, Niasinamid, Butilen Glikol, Kiraz Çiçeği Özü..." },
  customerReviews: { en: "Customer Reviews", ar: "تقييمات العملاء", fr: "Avis clients", es: "Opiniones de clientes", tr: "Müşteri Yorumları" },
  writeReview: { en: "Write a Review", ar: "اكتب تقييماً", fr: "Écrire un avis", es: "Escribir una reseña", tr: "Yorum yaz" },
  noReviewsYet: { en: "No reviews yet. Be the first to review this product!", ar: "لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!", fr: "Pas encore d'avis. Soyez le premier !", es: "Sin reseñas aún. ¡Sé el primero!", tr: "Henüz yorum yok. İlk yorumu siz yapın!" },
  rating: { en: "Rating", ar: "التقييم", fr: "Note", es: "Calificación", tr: "Puan" },
  title: { en: "Title", ar: "العنوان", fr: "Titre", es: "Título", tr: "Başlık" },
  review: { en: "Review", ar: "التقييم", fr: "Avis", es: "Reseña", tr: "Yorum" },
  reviewPlaceholder: { en: "Write your review...", ar: "اكتب تقييمك...", fr: "Écrivez votre avis...", es: "Escribe tu reseña...", tr: "Yorumunuzu yazın..." },
  reviewTitlePlaceholder: { en: "Review title", ar: "عنوان التقييم", fr: "Titre de l'avis", es: "Título de la reseña", tr: "Yorum başlığı" },
  submitReview: { en: "Submit Review", ar: "إرسال التقييم", fr: "Soumettre l'avis", es: "Enviar reseña", tr: "Yorumu gönder" },
  loginToReview: { en: "You need to be logged in to write a review", ar: "تحتاج لتسجيل الدخول لكتابة تقييم", fr: "Vous devez être connecté pour écrire un avis", es: "Necesitas iniciar sesión para escribir una reseña", tr: "Yorum yazmak için giriş yapmalısınız" },
  reviewRequired: { en: "Review required", ar: "التقييم مطلوب", fr: "Avis requis", es: "Reseña requerida", tr: "Yorum gerekli" },
  pleaseWriteReview: { en: "Please write your review", ar: "يرجى كتابة تقييمك", fr: "Veuillez écrire votre avis", es: "Por favor escribe tu reseña", tr: "Lütfen yorumunuzu yazın" },
  reviewSubmitted: { en: "Review submitted", ar: "تم إرسال التقييم", fr: "Avis soumis", es: "Reseña enviada", tr: "Yorum gönderildi" },
  thankYouReview: { en: "Thank you for your review!", ar: "شكراً لتقييمك!", fr: "Merci pour votre avis !", es: "¡Gracias por tu reseña!", tr: "Yorumunuz için teşekkürler!" },
  verified: { en: "Verified", ar: "موثّق", fr: "Vérifié", es: "Verificado", tr: "Doğrulanmış" },

  // Best Sellers Page
  products: { en: "PRODUCTS", ar: "المنتجات", fr: "PRODUITS", es: "PRODUCTOS", tr: "ÜRÜNLER" },
  product: { en: "PRODUCT", ar: "منتج", fr: "PRODUIT", es: "PRODUCTO", tr: "ÜRÜN" },
  filters: { en: "FILTERS", ar: "تصفية", fr: "FILTRES", es: "FILTROS", tr: "FİLTRELER" },
  productType: { en: "Product Type", ar: "نوع المنتج", fr: "Type de produit", es: "Tipo de producto", tr: "Ürün tipi" },
  ingredientType: { en: "Ingredient Type", ar: "نوع المكون", fr: "Type d'ingrédient", es: "Tipo de ingrediente", tr: "İçerik tipi" },
  skinType: { en: "Skin Type", ar: "نوع البشرة", fr: "Type de peau", es: "Tipo de piel", tr: "Cilt tipi" },
  priceRange: { en: "Price Range", ar: "نطاق السعر", fr: "Gamme de prix", es: "Rango de precio", tr: "Fiyat aralığı" },
  clearFilters: { en: "Clear Filters", ar: "مسح التصفية", fr: "Effacer les filtres", es: "Limpiar filtros", tr: "Filtreleri temizle" },
  sortBy: { en: "SORT BY:", ar: "ترتيب حسب:", fr: "TRIER PAR :", es: "ORDENAR POR:", tr: "SIRALA:" },
  relevance: { en: "Relevance", ar: "الصلة", fr: "Pertinence", es: "Relevancia", tr: "Alaka" },
  priceLowHigh: { en: "Price: Low to High", ar: "السعر: من الأقل إلى الأعلى", fr: "Prix : croissant", es: "Precio: menor a mayor", tr: "Fiyat: Düşükten yükseğe" },
  priceHighLow: { en: "Price: High to Low", ar: "السعر: من الأعلى إلى الأقل", fr: "Prix : décroissant", es: "Precio: mayor a menor", tr: "Fiyat: Yüksekten düşüğe" },
  newest: { en: "Newest", ar: "الأحدث", fr: "Plus récent", es: "Más reciente", tr: "En yeni" },
  all: { en: "All", ar: "الكل", fr: "Tout", es: "Todo", tr: "Hepsi" },
  combinationOily: { en: "Combination/Oily", ar: "مختلطة/دهنية", fr: "Mixte/Grasse", es: "Mixta/Grasa", tr: "Karma/Yağlı" },
  dry: { en: "Dry", ar: "جافة", fr: "Sèche", es: "Seca", tr: "Kuru" },
  normal: { en: "Normal", ar: "عادية", fr: "Normale", es: "Normal", tr: "Normal" },
  sensitive: { en: "Sensitive", ar: "حساسة", fr: "Sensible", es: "Sensible", tr: "Hassas" },
  doubleCleanse: { en: "Double-Cleanse", ar: "تنظيف مزدوج", fr: "Double nettoyage", es: "Doble limpieza", tr: "Çift temizlik" },
  cleansingBalms: { en: "Cleansing Balms", ar: "بلسم التنظيف", fr: "Baumes nettoyants", es: "Bálsamos limpiadores", tr: "Temizleme balsamları" },
  oilCleansers: { en: "Oil Cleansers", ar: "منظفات زيتية", fr: "Nettoyants huileux", es: "Limpiadores de aceite", tr: "Yağ temizleyiciler" },
  waterCleansers: { en: "Water Cleansers", ar: "منظفات مائية", fr: "Nettoyants à l'eau", es: "Limpiadores de agua", tr: "Su temizleyiciler" },

  // About Us
  aboutUsTitle: { en: "About Eva Cosmetics", ar: "عن إيفا كوزماتيكس", fr: "À propos d'Eva Cosmetics", es: "Acerca de Eva Cosmetics", tr: "Eva Cosmetics Hakkında" },
  aboutUsDesc1: { en: "Eva Cosmetics was born from a passion for natural beauty and sustainable skincare.", ar: "وُلدت إيفا كوزماتيكس من شغف بالجمال الطبيعي والعناية المستدامة بالبشرة.", fr: "Eva Cosmetics est née d'une passion pour la beauté naturelle et les soins durables.", es: "Eva Cosmetics nació de una pasión por la belleza natural y el cuidado sostenible de la piel.", tr: "Eva Cosmetics, doğal güzellik ve sürdürülebilir cilt bakımı tutkusundan doğdu." },
  aboutUsDesc2: { en: "We carefully source our ingredients from trusted suppliers who share our commitment to sustainability.", ar: "نحرص على اختيار مكوناتنا من موردين موثوقين يشاركوننا التزامنا بالاستدامة.", fr: "Nous sélectionnons soigneusement nos ingrédients auprès de fournisseurs de confiance.", es: "Seleccionamos cuidadosamente nuestros ingredientes de proveedores de confianza.", tr: "İçeriklerimizi sürdürülebilirlik taahhüdümüzü paylaşan güvenilir tedarikçilerden özenle seçiyoruz." },
  ourMission: { en: "Our Mission", ar: "مهمتنا", fr: "Notre Mission", es: "Nuestra Misión", tr: "Misyonumuz" },
  ourMissionDesc: { en: "To provide luxurious, effective skincare solutions that are gentle on your skin and kind to our planet.", ar: "تقديم حلول فاخرة وفعالة للعناية بالبشرة لطيفة على بشرتك ورفيقة بكوكبنا.", fr: "Offrir des solutions de soins luxueuses et efficaces.", es: "Ofrecer soluciones de cuidado lujosas y efectivas.", tr: "Cildinize nazik ve gezegenimize duyarlı lüks, etkili cilt bakım çözümleri sunmak." },
  shipping: { en: "SHIPPING", ar: "الشحن", fr: "LIVRAISON", es: "ENVÍO", tr: "KARGO" },
  returns: { en: "RETURNS", ar: "الإرجاع", fr: "RETOURS", es: "DEVOLUCIONES", tr: "İADE" },
  domesticShipping: { en: "Domestic Shipping", ar: "الشحن المحلي", fr: "Livraison nationale", es: "Envío nacional", tr: "Yurtiçi kargo" },
  internationalShipping: { en: "International Shipping", ar: "الشحن الدولي", fr: "Livraison internationale", es: "Envío internacional", tr: "Uluslararası kargo" },
  shippingRestriction: { en: "Shipping Restriction", ar: "قيود الشحن", fr: "Restrictions de livraison", es: "Restricciones de envío", tr: "Kargo kısıtlamaları" },
  returnPolicy: { en: "Return Policy", ar: "سياسة الإرجاع", fr: "Politique de retour", es: "Política de devolución", tr: "İade politikası" },
  howToReturn: { en: "How To Return", ar: "كيفية الإرجاع", fr: "Comment retourner", es: "Cómo devolver", tr: "Nasıl iade edilir" },
  refunds: { en: "Refunds", ar: "المبالغ المستردة", fr: "Remboursements", es: "Reembolsos", tr: "Geri ödemeler" },
  faqs: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة", fr: "Questions fréquentes", es: "Preguntas frecuentes", tr: "Sıkça Sorulan Sorular" },
  businessHours: { en: "Business Hours", ar: "ساعات العمل", fr: "Heures d'ouverture", es: "Horario de atención", tr: "Çalışma saatleri" },
  aboutSideAbout: { en: "About Us", ar: "من نحن", fr: "À propos", es: "Sobre nosotros", tr: "Hakkımızda" },
  aboutSideShipping: { en: "Shipping & Returns", ar: "الشحن والإرجاع", fr: "Livraison et retours", es: "Envío y devoluciones", tr: "Kargo ve İade" },
  aboutSideContact: { en: "Contact Us", ar: "اتصل بنا", fr: "Contactez-nous", es: "Contáctenos", tr: "Bize ulaşın" },
  aboutSideFaqs: { en: "FAQs", ar: "الأسئلة الشائعة", fr: "FAQ", es: "Preguntas frecuentes", tr: "SSS" },

  // Blog Page
  ourBlog: { en: "Our Blog", ar: "مدونتنا", fr: "Notre Blog", es: "Nuestro Blog", tr: "Blogumuz" },
  ourBlogDesc: { en: "Discover skincare tips, beauty trends, and expert advice.", ar: "اكتشفي نصائح العناية بالبشرة واتجاهات الجمال ونصائح الخبراء.", fr: "Découvrez des conseils de soins et des tendances beauté.", es: "Descubre consejos de cuidado de la piel y tendencias de belleza.", tr: "Cilt bakım ipuçlarını, güzellik trendlerini ve uzman tavsiyelerini keşfedin." },
  showMore: { en: "Show More ↓", ar: "عرض المزيد ↓", fr: "Voir plus ↓", es: "Ver más ↓", tr: "Daha fazla ↓" },
  blogPageTitle1: { en: "Cracking the Coconut Code", ar: "فك شفرة جوز الهند", fr: "Décrypter le code du coco", es: "Descifrando el código del coco", tr: "Hindistancevizi Şifresini Çözmek" },
  blogPageExcerpt1: { en: "Two ingredients have been explored so much in recent years as coconut oil...", ar: "تم استكشاف مكونين كثيراً في السنوات الأخيرة مثل زيت جوز الهند...", fr: "Deux ingrédients ont été tellement explorés ces dernières années comme l'huile de coco...", es: "Dos ingredientes han sido explorados tanto en los últimos años como el aceite de coco...", tr: "Son yıllarda hindistancevizi yağı kadar çok keşfedilen iki bileşen..." },
  blogPageTitle2: { en: "Bloom Beauty Best of 2023", ar: "أفضل منتجات بلوم بيوتي 2023", fr: "Le meilleur de Bloom Beauty 2023", es: "Lo mejor de Bloom Beauty 2023", tr: "Bloom Beauty 2023'ün En İyileri" },
  blogPageExcerpt2: { en: "Can you believe we're here? Another year is wrapping up...", ar: "هل تصدقون أننا هنا؟ سنة أخرى تنتهي...", fr: "Pouvez-vous croire que nous sommes là ? Une autre année se termine...", es: "¿Puedes creer que estamos aquí? Otro año llega a su fin...", tr: "Burada olduğumuza inanabiliyor musunuz? Bir yıl daha sona eriyor..." },
  blogPageTitle3: { en: "7 Skincare Habits to Break Now", ar: "7 عادات للعناية بالبشرة يجب التخلص منها الآن", fr: "7 habitudes de soins à abandonner maintenant", es: "7 hábitos de cuidado de la piel que debes dejar", tr: "Şimdi Bırakmanız Gereken 7 Cilt Bakım Alışkanlığı" },
  blogPageExcerpt3: { en: "Great skincare is a long game—it doesn't happen overnight...", ar: "العناية الرائعة بالبشرة لعبة طويلة - لا تحدث بين عشية وضحاها...", fr: "Les bons soins de la peau sont un jeu de longue haleine...", es: "El buen cuidado de la piel es un juego a largo plazo...", tr: "Harika cilt bakımı uzun vadeli bir iştir..." },
  blogPageTitle4: { en: "Getting Your Skin Care Back on Track", ar: "استعادة روتين العناية ببشرتك", fr: "Remettre vos soins de peau sur les rails", es: "Recuperando tu rutina de cuidado de la piel", tr: "Cilt Bakımınızı Yoluna Koymak" },
  blogPageExcerpt4: { en: "With so many recent and ever-changing concerns occupying precious brain space...", ar: "مع وجود العديد من المخاوف المتغيرة باستمرار...", fr: "Avec tant de préoccupations récentes et en constante évolution...", es: "Con tantas preocupaciones recientes y cambiantes...", tr: "Günlük olarak değerli beyin alanını işgal eden birçok değişen endişeyle..." },

  // About Us - Shipping Content
  domesticShippingDesc1: { en: "We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days.", ar: "نقدم شحن مجاني قياسي لجميع الطلبات التي تزيد عن 50 دولاراً. يستغرق الشحن القياسي عادة 3-5 أيام عمل.", fr: "Nous offrons la livraison standard gratuite pour toute commande supérieure à 50 $. La livraison standard prend généralement 3 à 5 jours ouvrables.", es: "Ofrecemos envío estándar gratuito en todos los pedidos superiores a $50. El envío estándar suele tardar de 3 a 5 días hábiles.", tr: "50$'ın üzerindeki tüm siparişlerde ücretsiz standart kargo sunuyoruz. Standart kargo genellikle 3-5 iş günü sürer." },
  domesticShippingDesc2: { en: "Express shipping is available for an additional fee and delivers within 1-2 business days.", ar: "الشحن السريع متاح برسوم إضافية ويتم التوصيل خلال 1-2 يوم عمل.", fr: "La livraison express est disponible moyennant des frais supplémentaires et livre sous 1 à 2 jours ouvrables.", es: "El envío exprés está disponible por un cargo adicional y entrega en 1-2 días hábiles.", tr: "Ekspres kargo ek ücret karşılığında mevcuttur ve 1-2 iş günü içinde teslim edilir." },
  internationalShippingDesc: { en: "We're pleased to offer international shipping via BorderGuru. International shipping and import fees including customs duties, taxes and fees are calculated at check-out.", ar: "يسعدنا تقديم الشحن الدولي عبر BorderGuru. يتم حساب رسوم الشحن والاستيراد الدولية بما في ذلك الرسوم الجمركية والضرائب عند الدفع.", fr: "Nous sommes heureux de proposer la livraison internationale via BorderGuru. Les frais d'expédition et d'importation internationaux sont calculés lors du paiement.", es: "Nos complace ofrecer envío internacional a través de BorderGuru. Los gastos de envío e importación se calculan en el momento del pago.", tr: "BorderGuru aracılığıyla uluslararası kargo sunmaktan mutluluk duyuyoruz. Gümrük vergileri dahil uluslararası kargo ve ithalat ücretleri ödeme sırasında hesaplanır." },
  shippingRestrictionDesc: { en: "Some products may have shipping restrictions due to their ingredients or size.", ar: "قد تخضع بعض المنتجات لقيود شحن بسبب مكوناتها أو حجمها.", fr: "Certains produits peuvent avoir des restrictions de livraison en raison de leurs ingrédients ou de leur taille.", es: "Algunos productos pueden tener restricciones de envío debido a sus ingredientes o tamaño.", tr: "Bazı ürünler içerikleri veya boyutları nedeniyle kargo kısıtlamalarına tabi olabilir." },
  returnPolicyDesc: { en: "We accept returns within 30 days of purchase for unused, unopened products in their original packaging.", ar: "نقبل الإرجاع خلال 30 يوماً من الشراء للمنتجات غير المستخدمة وغير المفتوحة في عبوتها الأصلية.", fr: "Nous acceptons les retours dans les 30 jours suivant l'achat pour les produits non utilisés et non ouverts dans leur emballage d'origine.", es: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra para productos sin usar y sin abrir en su embalaje original.", tr: "Orijinal ambalajında açılmamış ve kullanılmamış ürünler için satın alma tarihinden itibaren 30 gün içinde iade kabul ediyoruz." },
  howToReturnDesc: { en: "To initiate a return, please contact our customer service team with your order number.", ar: "لبدء عملية الإرجاع، يرجى التواصل مع فريق خدمة العملاء لدينا مع رقم طلبك.", fr: "Pour initier un retour, veuillez contacter notre service client avec votre numéro de commande.", es: "Para iniciar una devolución, comuníquese con nuestro equipo de servicio al cliente con su número de pedido.", tr: "İade başlatmak için lütfen sipariş numaranızla müşteri hizmetleri ekibimizle iletişime geçin." },
  refundsDesc: { en: "Once we receive your return, we will process your refund within 5-7 business days.", ar: "بمجرد استلامنا للمرتجع، سنقوم بمعالجة استرداد المبلغ خلال 5-7 أيام عمل.", fr: "Une fois votre retour reçu, nous traiterons votre remboursement sous 5 à 7 jours ouvrables.", es: "Una vez que recibamos su devolución, procesaremos su reembolso dentro de 5-7 días hábiles.", tr: "İadenizi aldığımızda, geri ödemenizi 5-7 iş günü içinde işleme alacağız." },

  // About Us - Business Hours
  businessHoursWeekday: { en: "Monday - Friday: 9:00 AM - 6:00 PM PST", ar: "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً", fr: "Lundi - Vendredi : 9h00 - 18h00", es: "Lunes - Viernes: 9:00 AM - 6:00 PM", tr: "Pazartesi - Cuma: 09:00 - 18:00" },
  businessHoursSaturday: { en: "Saturday: 10:00 AM - 4:00 PM PST", ar: "السبت: 10:00 صباحاً - 4:00 مساءً", fr: "Samedi : 10h00 - 16h00", es: "Sábado: 10:00 AM - 4:00 PM", tr: "Cumartesi: 10:00 - 16:00" },
  businessHoursSunday: { en: "Sunday: Closed", ar: "الأحد: مغلق", fr: "Dimanche : Fermé", es: "Domingo: Cerrado", tr: "Pazar: Kapalı" },

  // About Us - FAQs
  faqQ1: { en: "Are your products cruelty-free?", ar: "هل منتجاتكم خالية من القسوة على الحيوانات؟", fr: "Vos produits sont-ils cruelty-free ?", es: "¿Sus productos son libres de crueldad animal?", tr: "Ürünleriniz hayvan deneyi yapılmadan mı üretiliyor?" },
  faqA1: { en: "Yes! All Eva Cosmetics products are 100% cruelty-free.", ar: "نعم! جميع منتجات إيفا كوزماتيكس خالية 100% من القسوة على الحيوانات.", fr: "Oui ! Tous les produits Eva Cosmetics sont 100% cruelty-free.", es: "¡Sí! Todos los productos de Eva Cosmetics son 100% libres de crueldad animal.", tr: "Evet! Tüm Eva Cosmetics ürünleri %100 hayvan deneyi yapılmadan üretilmektedir." },
  faqQ2: { en: "What is your return policy?", ar: "ما هي سياسة الإرجاع الخاصة بكم؟", fr: "Quelle est votre politique de retour ?", es: "¿Cuál es su política de devolución?", tr: "İade politikanız nedir?" },
  faqA2: { en: "We offer a 30-day return policy for unused, unopened products.", ar: "نقدم سياسة إرجاع لمدة 30 يوماً للمنتجات غير المستخدمة وغير المفتوحة.", fr: "Nous offrons une politique de retour de 30 jours pour les produits non utilisés et non ouverts.", es: "Ofrecemos una política de devolución de 30 días para productos sin usar y sin abrir.", tr: "Kullanılmamış ve açılmamış ürünler için 30 günlük iade politikası sunuyoruz." },
  faqQ3: { en: "How long does shipping take?", ar: "كم يستغرق الشحن؟", fr: "Combien de temps prend la livraison ?", es: "¿Cuánto tarda el envío?", tr: "Kargo ne kadar sürer?" },
  faqA3: { en: "Domestic orders typically arrive within 3-5 business days.", ar: "تصل الطلبات المحلية عادة خلال 3-5 أيام عمل.", fr: "Les commandes nationales arrivent généralement sous 3 à 5 jours ouvrables.", es: "Los pedidos nacionales generalmente llegan en 3-5 días hábiles.", tr: "Yurtiçi siparişler genellikle 3-5 iş günü içinde teslim edilir." },
  faqQ4: { en: "Do you offer samples?", ar: "هل تقدمون عينات؟", fr: "Offrez-vous des échantillons ?", es: "¿Ofrecen muestras?", tr: "Numune sunuyor musunuz?" },
  faqA4: { en: "Yes! We include free samples with every order.", ar: "نعم! نضيف عينات مجانية مع كل طلب.", fr: "Oui ! Nous incluons des échantillons gratuits avec chaque commande.", es: "¡Sí! Incluimos muestras gratuitas con cada pedido.", tr: "Evet! Her siparişe ücretsiz numuneler ekliyoruz." },
  faqQ5: { en: "How do I track my order?", ar: "كيف أتتبع طلبي؟", fr: "Comment suivre ma commande ?", es: "¿Cómo rastreo mi pedido?", tr: "Siparişimi nasıl takip ederim?" },
  faqA5: { en: "Once your order ships, you'll receive an email with tracking information.", ar: "بمجرد شحن طلبك، ستتلقى بريداً إلكترونياً يحتوي على معلومات التتبع.", fr: "Une fois votre commande expédiée, vous recevrez un e-mail avec les informations de suivi.", es: "Una vez que se envíe tu pedido, recibirás un correo electrónico con la información de seguimiento.", tr: "Siparişiniz kargoya verildiğinde, takip bilgilerini içeren bir e-posta alacaksınız." },

  // Misc
  error: { en: "Error", ar: "خطأ", fr: "Erreur", es: "Error", tr: "Hata" },
  success: { en: "Success", ar: "نجاح", fr: "Succès", es: "Éxito", tr: "Başarılı" },
  profileUpdated: { en: "Profile updated successfully", ar: "تم تحديث الملف الشخصي", fr: "Profil mis à jour", es: "Perfil actualizado exitosamente", tr: "Profil başarıyla güncellendi" },
  failedUpdate: { en: "Failed to update profile", ar: "فشل تحديث الملف الشخصي", fr: "Échec de la mise à jour", es: "Error al actualizar el perfil", tr: "Profil güncellenemedi" },
  invalidCredentials: { en: "Invalid email or password", ar: "بريد إلكتروني أو كلمة مرور غير صحيحة", fr: "E-mail ou mot de passe invalide", es: "Correo o contraseña inválidos", tr: "Geçersiz e-posta veya şifre" },
  accountExists: { en: "Account exists", ar: "الحساب موجود", fr: "Le compte existe", es: "La cuenta existe", tr: "Hesap mevcut" },
  failedSubmitReview: { en: "Failed to submit review", ar: "فشل إرسال التقييم", fr: "Échec de la soumission de l'avis", es: "Error al enviar la reseña", tr: "Yorum gönderilemedi" },
  close: { en: "Close", ar: "إغلاق", fr: "Fermer", es: "Cerrar", tr: "Kapat" },
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
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, []);

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
