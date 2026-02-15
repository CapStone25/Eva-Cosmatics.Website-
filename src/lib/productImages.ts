import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import type { Language } from "@/contexts/LanguageContext";

export const productImageMap: Record<string, string> = {
  "product-serum.png": productSerum,
  "product-recipe.png": productRecipe,
  "product-conditioner.png": productConditioner,
  "product-lotion.png": productLotion,
  "product-1.jpg": product1,
  "product-2.jpg": product2,
  "product-3.jpg": product3,
  "product-4.jpg": product4,
};

export const productImageOptions = [
  { value: "product-serum.png", label: "Serum" },
  { value: "product-recipe.png", label: "Recipe / Shampoo" },
  { value: "product-conditioner.png", label: "Conditioner" },
  { value: "product-lotion.png", label: "Lotion" },
  { value: "product-1.jpg", label: "Product 1" },
  { value: "product-2.jpg", label: "Product 2" },
  { value: "product-3.jpg", label: "Product 3" },
  { value: "product-4.jpg", label: "Product 4" },
];

export const defaultProductImage = productSerum;

export function resolveProductImage(imageKey: string | null): string {
  if (!imageKey) return defaultProductImage;
  return productImageMap[imageKey] || defaultProductImage;
}

// ──────────────────────────────────────────────
// Product Name & Description Translation Map
// Key = English product name (as stored in the DB)
// ──────────────────────────────────────────────

interface ProductTranslation {
  name: { ar: string; fr: string; es: string; tr: string };
  description: { ar: string; fr: string; es: string; tr: string };
}

const productTranslations: Record<string, ProductTranslation> = {
  "Clarifying Emulsion": {
    name: { ar: "مستحلب توضيحي", fr: "Émulsion Clarifiante", es: "Emulsión Clarificante", tr: "Berraklaştırıcı Emülsiyon" },
    description: { ar: "مستحلب خفيف ينقي ويوازن البشرة. مثالي للبشرة الحساسة.", fr: "Une émulsion légère qui clarifie et équilibre la peau. Parfaite pour les peaux sensibles.", es: "Una emulsión ligera que clarifica y equilibra la piel. Perfecta para pieles sensibles.", tr: "Cildi arındıran ve dengeleyen hafif bir emülsiyon. Hassas ciltler için ideal." },
  },
  "Dewy Glow Jelly Cream": {
    name: { ar: "كريم جل التوهج الندي", fr: "Crème Gelée Éclat Rosé", es: "Crema Gel Brillo Rocío", tr: "Işıltılı Jel Krem" },
    description: { ar: "كريم جل شفاف بزهر الكرز والنياسيناميد يمنح ترطيباً وتوهجاً مكثفاً.", fr: "Une crème-gelée transparente avec fleur de cerisier et niacinamide pour hydratation et éclat.", es: "Una crema gel con flor de cerezo y niacinamida que brinda hidratación y brillo.", tr: "Kiraz çiçeği ve niasinamid içeren, yoğun nem ve parlaklık veren jel krem." },
  },
  "Fermented Soybean Bio Cellulose Mask": {
    name: { ar: "قناع السليلوز الحيوي بفول الصويا المخمر", fr: "Masque Bio Cellulose Soja Fermenté", es: "Mascarilla Bio Celulosa de Soja Fermentada", tr: "Fermente Soya Bio Selüloz Maske" },
    description: { ar: "قناع سليلوز حيوي فاخر بخلاصة فول الصويا المخمر لتغذية عميقة وتجديد البشرة.", fr: "Un masque bio cellulose premium infusé d'extrait de soja fermenté pour une nutrition profonde.", es: "Una mascarilla premium de bio celulosa con extracto de soja fermentada para nutrición profunda.", tr: "Derin beslenme ve cilt yenilenmesi için fermente soya özüyle zenginleştirilmiş premium bio selüloz maske." },
  },
  "Pore Clearing Clay Mask 2X": {
    name: { ar: "قناع الطين لتنظيف المسام 2X", fr: "Masque Argile Pores 2X", es: "Mascarilla de Arcilla Limpiaporos 2X", tr: "Gözenek Temizleyici Kil Maske 2X" },
    description: { ar: "قناع طين قوي ينظف المسام بعمق ويزيل الشوائب لبشرة أكثر صفاءً ونعومة.", fr: "Un masque d'argile puissant qui nettoie les pores en profondeur et élimine les impuretés.", es: "Una potente mascarilla de arcilla que limpia profundamente los poros y elimina impurezas.", tr: "Gözenekleri derinlemesine temizleyen ve kirlilikleri gideren güçlü bir kil maske." },
  },
  "Matte Priming UV Shield Sunscreen SPF 37": {
    name: { ar: "واقي شمس مات SPF 37", fr: "Écran Solaire Mat SPF 37", es: "Protector Solar Mate SPF 37", tr: "Mat Güneş Koruyucu SPF 37" },
    description: { ar: "واقي شمس بلمسة نهائية مات يمهد البشرة للمكياج مع حماية ممتازة من الأشعة فوق البنفسجية.", fr: "Un écran solaire au fini mat qui prépare la peau au maquillage avec une excellente protection UV.", es: "Un protector solar de acabado mate que prepara la piel para el maquillaje con excelente protección UV.", tr: "Makyaj öncesi cilde mat bir baz oluştururken mükemmel UV koruması sağlayan güneş kremi." },
  },
  "Soft Finish Sun Milk SPF50+/PA+++": {
    name: { ar: "حليب الشمس الناعم SPF50+", fr: "Lait Solaire Doux SPF50+", es: "Leche Solar Suave SPF50+", tr: "Yumuşak Güneş Sütü SPF50+" },
    description: { ar: "حليب شمس خفيف بأعلى حماية من الأشعة فوق البنفسجية يترك البشرة ناعمة وحريرية.", fr: "Un lait solaire léger avec la plus haute protection UV pour une peau douce et soyeuse.", es: "Una leche solar ligera con la más alta protección UV que deja la piel suave y sedosa.", tr: "Cildi yumuşak ve pürüzsüz bırakan en yüksek UV korumalı hafif güneş sütü." },
  },
  "Skin Reinforcement Get Type Cream": {
    name: { ar: "كريم تعزيز البشرة", fr: "Crème Renforcement Cutané", es: "Crema Refuerzo Cutáneo", tr: "Cilt Güçlendirici Krem" },
    description: { ar: "كريم معزز يقوي حاجز البشرة ويحسن مرونتها.", fr: "Une crème qui renforce la barrière cutanée et améliore la résilience de la peau.", es: "Una crema que fortalece la barrera cutánea y mejora la resistencia de la piel.", tr: "Cilt bariyerini güçlendiren ve cilt dayanıklılığını artıran krem." },
  },
  "Lychee Soda Bubble Cleanser": {
    name: { ar: "منظف فقاعات الليتشي", fr: "Nettoyant Mousse Litchi", es: "Limpiador de Burbujas de Lichi", tr: "Lychee Soda Köpük Temizleyici" },
    description: { ar: "منظف فقاعي ممتع بخلاصة الليتشي يزيل المكياج والشوائب بلطف.", fr: "Un nettoyant effervescent au litchi qui retire doucement le maquillage et les impuretés.", es: "Un limpiador efervescente con lichi que elimina suavemente el maquillaje y las impurezas.", tr: "Lychee özlü, makyaj ve kirlilikleri nazikçe temizleyen eğlenceli köpük temizleyici." },
  },
  "Rice Sheet Mask": {
    name: { ar: "قناع الأرز الورقي", fr: "Masque Tissu au Riz", es: "Mascarilla de Arroz en Lámina", tr: "Pirinç Kağıt Maske" },
    description: { ar: "قناع ورقي مغذي بخلاصة الأرز لبشرة أكثر إشراقاً ونضارة.", fr: "Un masque tissu nourrissant infusé d'extrait de riz pour une peau plus lumineuse.", es: "Una mascarilla de arroz nutritiva para una piel más luminosa y radiante.", tr: "Daha parlak, daha aydınlık bir cilt için pirinç özüyle zenginleştirilmiş besleyici kağıt maske." },
  },
  "Gentle Exfoliating Toner": {
    name: { ar: "تونر تقشير لطيف", fr: "Tonique Exfoliant Doux", es: "Tónico Exfoliante Suave", tr: "Nazik Peeling Tonik" },
    description: { ar: "تونر لطيف بخصائص تقشير خفيفة ينقي ملمس البشرة.", fr: "Un tonique doux avec de légères propriétés exfoliantes qui affine la texture de la peau.", es: "Un tónico suave con propiedades exfoliantes leves que refina la textura de la piel.", tr: "Cilt dokusunu inceltici hafif peeling özellikleri olan nazik bir tonik." },
  },
  "Anti-Ageing Hyaluronic Acid Face Serum": {
    name: { ar: "سيروم حمض الهيالورونيك لمكافحة الشيخوخة", fr: "Sérum Anti-Âge Acide Hyaluronique", es: "Sérum Anti-Edad Ácido Hialurónico", tr: "Yaşlanma Karşıtı Hyalüronik Asit Serum" },
    description: { ar: "سيروم قوي لمكافحة الشيخوخة بحمض الهيالورونيك لبشرة ممتلئة وشابة.", fr: "Un sérum anti-âge puissant à l'acide hyaluronique pour une peau repulpée et jeune.", es: "Un poderoso sérum antiedad con ácido hialurónico para una piel tersa y juvenil.", tr: "Dolgun, genç bir cilt için hyalüronik asitli güçlü yaşlanma karşıtı serum." },
  },
  "Aromatica Recipe Shampoo": {
    name: { ar: "شامبو أروماتيكا", fr: "Shampooing Aromatica Recipe", es: "Champú Aromatica Recipe", tr: "Aromatica Recipe Şampuan" },
    description: { ar: "شامبو بخلاصات نباتية عطرية لشعر صحي ولامع.", fr: "Un shampooing aux extraits botaniques aromatiques pour des cheveux sains et brillants.", es: "Un champú con extractos botánicos aromáticos para un cabello saludable y brillante.", tr: "Sağlıklı, parlak saçlar için aromatik bitkisel özlerle hazırlanmış doğal şampuan." },
  },
  "Advanced Care Clinic Conditioner": {
    name: { ar: "بلسم العناية المتقدمة", fr: "Après-Shampooing Soin Avancé", es: "Acondicionador Cuidado Avanzado", tr: "Gelişmiş Bakım Saç Kremi" },
    description: { ar: "بلسم علاجي متقدم لاستعادة الشعر التالف والجاف.", fr: "Un soin après-shampooing avancé pour restaurer les cheveux abîmés et secs.", es: "Un acondicionador avanzado para restaurar el cabello dañado y seco.", tr: "Hasarlı ve kuru saçların onarımı için gelişmiş bakım kremi." },
  },
  "Aromatica Recipe Body Lotion": {
    name: { ar: "لوشن الجسم أروماتيكا", fr: "Lotion Corporelle Aromatica Recipe", es: "Loción Corporal Aromatica Recipe", tr: "Aromatica Recipe Vücut Losyonu" },
    description: { ar: "لوشن جسم مغذي بخلاصات نباتية عطرية لبشرة ناعمة ومرطبة.", fr: "Une lotion corporelle nourrissante aux extraits botaniques aromatiques pour une peau douce.", es: "Una loción corporal nutritiva con extractos botánicos aromáticos para una piel suave e hidratada.", tr: "Yumuşak, nemli bir cilt için aromatik bitkisel özlerle zenginleştirilmiş besleyici vücut losyonu." },
  },
  "All-Around Safe Block Essence Sun SPF45+": {
    name: { ar: "واقي شمس إيسنس SPF45+", fr: "Protection Solaire Essence SPF45+", es: "Protección Solar Esencia SPF45+", tr: "Güneş Koruma Esans SPF45+" },
    description: { ar: "مرطب جل بخلاصة زهر الكرز والنياسيناميد والبيتاين من بنجر السكر لتعزيز الإشراق.", fr: "Un gel hydratant avec extraits de fleur de cerisier, niacinamide et bétaïne pour un éclat visible.", es: "Un gel hidratante con extractos de flor de cerezo, niacinamida y betaína para un brillo visible.", tr: "Kiraz çiçeği özü, niasinamid ve şeker pancarından betain içeren parlaklık artırıcı jel nemlendirici." },
  },
  "Super Aqua  Cream": {
    name: { ar: "كريم سوبر أكوا", fr: "Crème Super Aqua", es: "Crema Super Aqua", tr: "Süper Aqua Krem" },
    description: { ar: "كريم مرطب بعمق بموسين الحلزون لبشرة ناعمة ونضرة. تركيبة فاخرة تتغلغل في طبقات البشرة.", fr: "Une crème profondément hydratante à la mucine d'escargot pour une peau lisse et souple.", es: "Una crema profundamente hidratante con mucina de caracol para una piel suave y flexible.", tr: "Pürüzsüz, esnek bir cilt için salyangoz müsini içeren yoğun nemlendirici krem." },
  },
};

/**
 * Returns the translated product name for the current language.
 * Falls back to the original English name if no translation exists.
 */
export function translateProductName(englishName: string, language: Language): string {
  if (language === "en") return englishName;
  return productTranslations[englishName]?.name[language] || englishName;
}

/**
 * Returns the translated product description for the current language.
 * Falls back to the original English description if no translation exists.
 */
export function translateProductDescription(englishDescription: string | null, englishName: string, language: Language): string {
  if (!englishDescription) return "";
  if (language === "en") return englishDescription;
  return productTranslations[englishName]?.description[language] || englishDescription;
}
