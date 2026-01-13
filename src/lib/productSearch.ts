import { Product } from "@/types/product";

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const simplify = (value: string) => normalize(value).replace(/[aeiou]/g, "");

export const matchesProductSearch = (
  product: Product,
  query: string,
  categories: string[] = [],
  selectedColors: string[] = [],
  priceRange: { from: number; to: number } = { from: 0, to: Infinity }
) => {
  const trimmedQuery = query.trim();

  // Category filter
  if (categories.length > 0 && !categories.includes("all")) {
    const productCategory = product.category ?? "Genel";
    const matchesCategory = categories.some(
      (cat) => normalize(cat) === normalize(productCategory)
    );
    if (!matchesCategory) {
      return false;
    }
  }

  // Color filter
  if (selectedColors.length > 0) {
    if (product.color && !selectedColors.includes(product.color.toLowerCase())) {
      return false;
    }
  }

  // Price filter
  const productPrice = product.discountedPrice ?? product.price;
  if (productPrice < priceRange.from || productPrice > priceRange.to) {
    return false;
  }

  if (!trimmedQuery) {
    return true;
  }

  const searchTarget = `${product.title} ${product.category ?? ""}`;
  return simplify(searchTarget).includes(simplify(trimmedQuery));
};

export const filterProducts = (
  products: Product[],
  query: string,
  categories: string[] = [],
  selectedColors: string[] = [],
  priceRange: { from: number; to: number } = { from: 0, to: Infinity }
) =>
  products.filter((product) =>
    matchesProductSearch(product, query, categories, selectedColors, priceRange)
  );
