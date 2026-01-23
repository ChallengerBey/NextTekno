export type Product = {
  title: string;
  description?: string | null;
  reviews: number;
  rating?: number;
  price: number;
  discountedPrice?: number | null;
  id: number;
  category?: string | null;
  subcategory?: string | null;
  brand?: string | null;
  model?: string | null;
  color?: string | null;
  stock?: number | null;
  sku?: string | null;
  tags?: string[];
  specifications?: { key: string; value: string }[];
  features?: string[];
  warranty?: string | null;
  shippingWeight?: number | null;
  dimensions?: {
    width?: number | null;
    height?: number | null;
    depth?: number | null;
  } | null;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  seller_id?: string;
  created_at?: string;
  updated_at?: string;
};
