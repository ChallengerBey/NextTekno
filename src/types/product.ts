export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice?: number | null;
  id: number;
  category?: string | null;
  color?: string | null;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  stock?: number | null;
};
