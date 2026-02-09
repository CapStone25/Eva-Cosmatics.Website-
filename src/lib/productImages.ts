import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

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
