import { Product } from "@/types/product";

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const simplify = (value: string) => normalize(value).replace(/[aeiou]/g, "");

export const matchesProductSearch = (
  product: Product,
  query: string,
  category?: string | null
) => {
  const trimmedQuery = query.trim();
  const normalizedCategory = (category ?? "").trim();

  if (normalizedCategory && normalizedCategory !== "all") {
    const productCategory = product.category ?? "General";
    if (normalize(productCategory) !== normalize(normalizedCategory)) {
      return false;
    }
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
  category?: string | null
) => products.filter((product) => matchesProductSearch(product, query, category));
